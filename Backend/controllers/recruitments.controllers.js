import db from "../config/db/index.js";
import Razorpay from "razorpay";
import crypto from "crypto";
import errorHandler from "../utils/errorHandler.js";
import { sendEmailForRecruitments } from "../utils/emailFunctions.js";
import cloudinary from "../config/cloudinary/index.js";
import dotenv from "dotenv";
import QRCode from "qrcode";

dotenv.config();

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});

const registerRecruitment = async (req, res) => {
  try {

    const { name, phone, email, branch, batch, domain, experience, otherClubMembership } = req.body;

    if (!name || !phone || !email || !branch || !batch || !domain || !experience || !otherClubMembership) {
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

    const existingApplicant = await db("applicants")
      .where({ email })
      .andWhere("payment_status", "APPROVED")
      .first();

    if (existingApplicant) {
      return res.status(400).send(
        errorHandler(400, "Already Registered", "User has already registered and paid.")
      );
    }


    const amount = 99 * 100;

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
      experience,
      otherClubMembership,
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
        data: { order_id: order.id, amount },
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

const verifyRecruitmentPayment = async (req, res) => {
  try {

    const { razorpay_order_id, razorpay_payment_id, razorpay_signature, email } =
      req.body;

    const secret = process.env.RAZORPAY_KEY_SECRET;
    const hash = crypto
      .createHmac("sha256", secret)
      .update(razorpay_order_id + "|" + razorpay_payment_id)
      .digest("hex");

    if (hash !== razorpay_signature) {
      return res
        .status(400)
        .send(
          errorHandler(400, "Verification Failed", "Invalid Payment Signature")
        );
    }


    const registeredRecruitment = await db("applicants")
      .where({ order_id: razorpay_order_id, payment_status: "PENDING" })
      .first();

    if (!registeredRecruitment) {
      return res.status(404).json({ message: "Attendee not found" });
    }

    await db("users")
      .where({ email })
      .update({
        is_member: true,
      });


    await db("applicants")
      .where({ order_id: razorpay_order_id })
      .update({
        payment_status: "APPROVED",
      });

      const applicant = await db("applicants").select("*").where({
        order_id: razorpay_order_id,
      });
      
      if (applicant.length === 0) {
        return res.status(404).json({ message: "Applicant not found" });
      }
      
      const qrCodeData = `${applicant[0].order_id}`;
      const qrCodeImage = await QRCode.toDataURL(qrCodeData);
      
      const uploadResponse = await cloudinary.uploader.upload(qrCodeImage, {
        folder: "qr_codes",
        public_id: `qr_${razorpay_order_id}`,
        overwrite: true,
      });
      
      const qr_code_link = uploadResponse.secure_url;
      
      if (!qr_code_link) {
        return res.status(500).json({ message: "QR Code upload failed" });
      }
      
      sendEmailForRecruitments(
        email,
        applicant[0].order_id,
        applicant[0].name,
        applicant[0].batch,
        applicant[0].branch,
        qr_code_link
      );

    return res.status(200).json({
      message: "Payment verified successfully",
      status: "VerifiedPayment"
    });
  } catch (error) {
    console.error("Final Payment Verification Error:", error);
    return res.status(500).json({ message: "Internal Server Error", error });
  }
};

export { registerRecruitment, verifyRecruitmentPayment };