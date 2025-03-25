import db from "../config/db/index.js";
import Razorpay from "razorpay";
import crypto from "crypto";
import errorHandler from "../utils/errorHandler.js";
import { sendEmailForArtWork } from "../utils/emailFunctions.js";
import dotenv from "dotenv";

dotenv.config();

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});

const registerRecruitment = async (req, res) => {
  try {
    const { name, phone, email, branch, batch, domain } = req.body;

    if (!name || !phone || !email || !branch || !batch || !domain) {
      return res
        .status(400)
        .send(
          errorHandler(
            400,
            "Invalid Request",
            "Please fill all required fields"
          )
        );
    }

    const existingApplicant = await db("applicants").where({ email }).first();
    if (existingApplicant && existingApplicant.payment_status === "APPROVED") {
      return res
        .status(400)
        .send(
          errorHandler(
            400,
            "Already Registered",
            "User has already registered and paid."
          )
        );
    }

    const amount = 150 * 100;

    const order = await razorpay.orders.create({
      amount: amount,
      currency: "INR",
      receipt: `receipt_order_${Date.now()}`,
    });

    if (!order) {
      return res
        .status(500)
        .send(
          errorHandler(500, "Order Error", "Failed to create Razorpay order")
        );
    }

    let data = {
      name,
      phone,
      email,
      branch,
      batch,
      domain,
      order_id: order.id,
      payment_status: "PENDING",
    };

    let insertion = await db("applicants").insert(data).returning("*");

    if (!insertion) {
      return res
        .status(400)
        .send(errorHandler(400, "Error Occurred", "Error while registering"));
    }

    return res.status(200).send({
      response: {
        data: { insertion, amount },
        title: "Inserted Applicant",
        message: "Registration successful but payment verification required",
      },
    });
  } catch (error) {
    console.error("Error while registering applicant:", error);
    return res
      .status(500)
      .send(
        errorHandler(500, "Internal Server Error", "Error in registration")
      );
  }
};

const razorpayWebhook = async (req, res) => {
  try {
    const webhookSecret = process.env.RAZORPAY_KEY_ID;
    const receivedSignature = req.headers["x-razorpay-signature"];

    const expectedSignature = crypto
      .createHmac("sha256", webhookSecret)
      .update(JSON.stringify(req.body))
      .digest("hex");

    if (receivedSignature !== expectedSignature) {
      return res.status(400).json({ message: "Invalid webhook signature" });
    }

    const event = req.body.event;
    const payload = req.body.payload.payment.entity;

    if (event === "payment.captured") {
      await db("applicants")
        .where({ order_id: payload.order_id })
        .update({ payment_status: "APPROVED" });

      return res.status(200).json({ message: "Payment verified successfully" });
    }

    return res.status(200).json({ message: "Webhook received" });
  } catch (error) {
    console.error("Webhook error:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

export { registerRecruitment, razorpayWebhook };
