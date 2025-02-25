import db from "../config/db/index.js";
import Razorpay from "razorpay";
import crypto from "crypto";
import errorHandler from "../utils/errorHandler.js";
import dotenv from "dotenv";
dotenv.config();

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});

const registerForFinalRound = async (req, res) => {
  try {
    const { event_id } = req.query;
    const { team_leader_email, phoneNumbers, driveLinks } = req.body;

    if (!event_id || !team_leader_email) {
      return res
        .status(400)
        .send(
          errorHandler(
            400,
            "Invalid Request",
            "Event ID and Team Leader Email are required"
          )
        );
    }
    const attendee = await db("attendees")
      .where({ event_id, team_leader_email, team_status: "PENDING" })
      .first();

    if (!attendee) {
      return res
        .status(400)
        .send(
          errorHandler(
            400,
            "Not Eligible",
            "You are not approved for the final round"
          )
        );
    }

    const amount = 699 * 100;
    const options = {
      amount: amount,
      currency: "INR",
      receipt: `final_order_${Date.now()}`,
    };

    const order = await razorpay.orders.create(options);
    if (!order) {
      return res
        .status(500)
        .send(
          errorHandler(500, "Payment Error", "Failed to create Razorpay order")
        );
    }

    await db("attendees")
      .where({ attendee_id: attendee.attendee_id })
      .update({ order_id: order.id, payment_status: "PENDING" });

    await db("attendee_documents").insert({
      attendee_id: attendee.attendee_id,
      team_leader_name: attendee.team_leader_name,
      team_leader_email,
      team_leader_phone: phoneNumbers.team_leader,
      sec_participant_phone: phoneNumbers.sec_participant,
      third_participant_phone: phoneNumbers.third_participant,
      fourth_participant_phone: phoneNumbers.fourth_participant,
      fifth_participant_phone: phoneNumbers.fifth_participant,
      sixth_participant_phone: phoneNumbers.sixth_participant,
      seventh_participant_phone: phoneNumbers.seventh_participant,
      eighth_participant_phone: phoneNumbers.eighth_participant,
      team_leader_drive_link: driveLinks.team_leader,
      sec_participant_drive_link: driveLinks.sec_participant,
      third_participant_drive_link: driveLinks.third_participant,
      fourth_participant_drive_link: driveLinks.fourth_participant,
      fifth_participant_drive_link: driveLinks.fifth_participant,
      sixth_participant_drive_link: driveLinks.sixth_participant,
      seventh_participant_drive_link: driveLinks.seventh_participant,
      eighth_participant_drive_link: driveLinks.eighth_participant,
      order_id: order.id,
      payment_status: "PENDING",
    });

    return res.status(200).send({
      response: {
        data: { order_id: order.id, amount },
        title: "Final Round Registration",
        message: "Proceed to payment for the final round",
      },
    });
  } catch (error) {
    console.error("Final Round Registration Error:", error);
    return res
      .status(500)
      .send(
        errorHandler(
          500,
          "Server Error",
          "Error processing final round registration"
        )
      );
  }
};

const verifyFinalPayment = async (req, res) => {
  try {
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature } =
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

    const attendee = await db("attendees")
      .where({ order_id: razorpay_order_id, payment_status: "PENDING" })
      .first();

    if (!attendee) {
      return res.status(404).json({ message: "Attendee not found" });
    }

    const qrCodeData = `Order ID: ${attendee.order_id}, Team Leader: ${attendee.team_leader_name}`;
    const qrCodeImage = await QRCode.toDataURL(qrCodeData);

    await db("attendees")
      .where({ order_id: razorpay_order_id })
      .update({ payment_status: "APPROVED", qr_code: qrCodeImage });

    return res.status(200).json({
      message: "Payment verified successfully",
      qr_code: qrCodeImage,
      razorpay_payment_id,
      razorpay_order_id,
    });
  } catch (error) {
    console.error("Final Payment Verification Error:", error);
    return res.status(500).json({ message: "Internal Server Error", error });
  }
};

const scanQr = async (req, res) => {
  try {
    const { order_id } = req.query;
    if (!order_id) {
      return res
        .status(400)
        .send(
          errorHandler(400, "Invalid Request", "Please Provide The Order ID")
        );
    }
    const attendee = await db("attendee_documents")
      .where({
        order_id,
        payment_status: "APPROVED",
      })
      .first();
    if (!attendee) {
      return res
        .status(404)
        .send(errorHandler(404, "Not Found", "Attendee Not Found"));
    } else {
      let attendee_data = await db("attendee_documents").select("*").where({
        order_id,
      });
      return res.status(200).send({
        response: {
          data: { attendee_data },
          title: "Data Fetched",
          message: `Team Details With ${order_id} successfully fetched`,
        },
      });
    }
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .send(
        errorHandler(
          500,
          "Internal Server Error",
          "Internal Server Error While Fetching Team Details"
        )
      );
  }
};

export { registerForFinalRound, verifyFinalPayment, scanQr };
