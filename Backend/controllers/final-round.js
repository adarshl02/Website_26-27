import db from "../config/db/index.js";
import cloudinary from "../config/cloudinary/index.js";
import Razorpay from "razorpay";
import crypto from "crypto";
import errorHandler from "../utils/errorHandler.js";
// import { sendEmail } from "../utils/emailFunctions.js";
import dotenv from "dotenv";
import QRCode from "qrcode";
dotenv.config();

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});

const registerForFinalRound = async (req, res) => {
  try {
    const { event_id } = req.query;
    const { team_leader_email, phoneNumbers, driveLinks, teamDetails } =
      req.body;

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
      .where({ event_id, team_leader_email, team_status: "APPROVED" })
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
    const existingAttendee = await db("attendee_documents").where({team_leader_email,payment_status:"APPROVED" }).first();
    console.log(existingAttendee);
    
    if (existingAttendee) {
      return res.status(400).send(errorHandler(400, "Already Registered", "User has already registered and paid for this event."));
    }

    await db("attendees").where({ attendee_id: attendee.attendee_id }).update({
      team_name: teamDetails.team_name,
      team_leader_name: teamDetails.team_leader_name,
      team_leader_phone: teamDetails.team_leader_phone,
      team_leader_batch: teamDetails.team_leader_batch,
      team_leader_branch: teamDetails.team_leader_branch,
      sec_participant: teamDetails.sec_participant,
      third_participant: teamDetails.third_participant,
      fourth_participant: teamDetails.fourth_participant,
      fifth_participant: teamDetails.fifth_participant,
      sixth_participant: teamDetails.sixth_participant,
      seventh_participant: teamDetails.seventh_participant,
      eight_participant: teamDetails.eighth_participant,
    });

    const amount = 700 * 100;
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

    // await db("attendees")
    //   .where({ attendee_id: attendee.attendee_id })
    //   .update({ order_id: order.id, payment_status: "PENDING" });

    await db("attendee_documents").insert({
      attendee_id: attendee.attendee_id,
      team_name: teamDetails.team_name,
      team_leader_name: teamDetails.team_leader_name,
      sec_participant_name: teamDetails.sec_participant,
      third_participant_name: teamDetails.third_participant,
      fourth_participant_name: teamDetails.fourth_participant,
      fifth_participant_name: teamDetails.fifth_participant,
      sixth_participant_name: teamDetails.sixth_participant,
      seventh_participant_name: teamDetails.seventh_participant,
      eighth_participant_name: teamDetails.eighth_participant,
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
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature,email } =
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

    const attendee = await db("attendee_documents")
      .where({ order_id: razorpay_order_id, payment_status: "PENDING" })
      .first();

    if (!attendee) {
      return res.status(404).json({ message: "Attendee not found" });
    }

    const qrCodeData = `${attendee.order_id}`;
    const qrCodeImage = await QRCode.toDataURL(qrCodeData);

    const uploadResponse = await cloudinary.uploader.upload(qrCodeImage, {
      folder: "qr_codes",
      public_id: `qr_${razorpay_order_id}`,
      overwrite: true,
    });

    const qr_code_link = uploadResponse.secure_url;

    if (!uploadResponse.secure_url) {
      return res.status(500).json({ message: "QR Code upload failed" });
    }

    await db("attendee_documents")
      .where({ order_id: razorpay_order_id })
      .update({
        payment_status: "APPROVED",
        qr_code_link: uploadResponse.secure_url,
      });

    let data = {
      event_date: "08/03/2025 - 09/03/2025",
      event_name: "GRAFFATHON",
      event_location: "Director Office Rd,SGSITS,Indore(M.P.)",
    };

    await sendEmail(
      email,
      attendee.team_leader_name,
      attendee.team_name,
      data.event_date,
      data.event_name,
      data.event_location,
      qr_code_link
    );

    return res.status(200).json({
      message: "Payment verified successfully",
      qr_code: uploadResponse.secure_url,
      razorpay_payment_id,
      razorpay_order_id,
    });
  } catch (error) {
    console.error("Final Payment Verification Error:", error);
    return res.status(500).json({ message: "Internal Server Error", error });
  }
};



const markAttendance = async (req, res) => {
  try {
    const { order_id, participant_phone } = req.body;

    if (!order_id || !participant_phone) {
      return res.status(400).send({
        message: "Please provide order_id and participant phone number",
      });
    }

    const order = await db("attendee_documents").where({ order_id }).first();

    if (!order) {
      return res.status(404).send({ message: "Order not found" });
    }

    const participantFields = {
      [order.team_leader_phone]: "team_leader",
      [order.sec_participant_phone]: "sec_participant",
      [order.third_participant_phone]: "third_participant",
      [order.fourth_participant_phone]: "fourth_participant",
      [order.fifth_participant_phone]: "fifth_participant",
      [order.sixth_participant_phone]: "sixth_participant",
      [order.seventh_participant_phone]: "seventh_participant",
      [order.eighth_participant_phone]: "eighth_participant",
    };

    const participantKey = participantFields[participant_phone];

    if (!participantKey) {
      return res
        .status(400)
        .json({ message: "Participant not found in this order" });
    }

    const attended_1_field = `${participantKey}_attended_1`;
    const attended_2_field = `${participantKey}_attended_2`;
    const attended_1_time_field = `${participantKey}_attended_1_at`;
    const attended_2_time_field = `${participantKey}_attended_2_at`;

    const currentTime = new Date();

    if (!order[attended_1_field]) {
      await db("attendee_documents")
        .where({ order_id })
        .update({
          [attended_1_field]: true,
          [attended_1_time_field]: currentTime,
        });

      return res.json({
        message: "Attendance 1 marked successfully",
        participant_phone,
      });
    }

    const attended_1_time = new Date(order[attended_1_time_field]);
    const fourHoursLater = new Date(
      attended_1_time.getTime() + 4 * 60 * 60 * 1000
    );

    if (currentTime < fourHoursLater) {
      return res.status(400).json({
        message: `You can mark attendance 2 only after ${fourHoursLater.toLocaleTimeString()}`,
      });
    }

    if (!order[attended_2_field]) {
      await db("attendee_documents")
        .where({ order_id })
        .update({
          [attended_2_field]: true,
          [attended_2_time_field]: currentTime,
        });

      return res.json({
        message: "Attendance 2 marked successfully",
        participant_phone,
      });
    }

    return res.status(400).json({ message: "Attendance already marked" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

export { registerForFinalRound, verifyFinalPayment, markAttendance };
