const QRCode = require("qrcode");
const db = require("../config/db/index.js");
const cloudinary = require("../config/cloudinary");
const Razorpay = require("razorpay");
const crypto = require("crypto");
const { errorHandler } = require("../utils/errorHandler");
const { sendEmail } = require("../utils/emailFunctions.js");

require("dotenv").config();

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});

const getEvents = async (req, res) => {
  try {
    const { status } = req.query;
    const events = await db("events")
      .select("*")
      .where("status", status)
      .orderBy("start_date", "desc");

    if (events.length === 0) {
      return res
        .status(404)
        .send(
          errorHandler(
            404,
            "Not Found",
            "No events found with the specified status"
          )
        );
    } else {
      return res.status(200).send({
        response: {
          data: events,
          title: "Events Fetched",
          message: "Events fetched successfully",
          status: 200,
        },
      });
    }
  } catch (error) {
    console.log("Error in fetching events", "---------------->", error);
    return res
      .status(500)
      .json(
        errorHandler(
          500,
          "Internal Server Error",
          "Error in fetching events. Please try again later."
        )
      );
  }
};

const registerEvents = async (req, res) => {
  try {
    const { event_id } = req.query;
    const { team_name, team_members, name, email, phone } = req.body;

    if (!event_id) {
      r;
      return res
        .status(400)
        .send(errorHandler(400, "Not Found", "Mentioned Event not found"));
    }

    const eventExists = await db("events").where({ event_id }).first();
    if (!eventExists) {
      return res
        .status(404)
        .send(
          errorHandler(404, "Not Found", "Event not found in the database")
        );
    }
    const { event_name, start_date, location: event_location } = eventExists;
    const event_date = new Date(start_date).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });

    if (!team_name || !team_members || !name || !email || !phone) {
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

    const amount = 10 * 100;

    const options = {
      amount: amount,
      currency: "INR",
      receipt: `receipt_order_${Date.now()}`,
    };
    const order = await razorpay.orders.create(options);
    if (!order) {
      return res
        .status(500)
        .send(
          errorHandler(500, "Order Error", "Failed to create Razorpay order")
        );
    }

    let data = {
      event_id,
      team_name,
      team_members,
      attendee_name: name,
      attendee_phone: phone,
      attendee_email: email,
      order_id: order.id,
      payment_status: "PENDING",
    };

    let insertion = await db("attendees").insert(data).returning("*");

    if (!insertion) {
      return res
        .status(400)
        .send(
          errorHandler(400, "Error Occurred", "Error while making booking")
        );
    }

    return res.status(200).send({
      response: {
        data: { insertion, amount },
        title: "Booking Successful",
        message: "Booking Successful for the event",
      },
    });
  } catch (error) {
    console.error("Error while making booking:", error);
    return res
      .status(500)
      .send(
        errorHandler(
          500,
          "Internal Server Error",
          "Error in booking the ticket"
        )
      );
  }
};

const paymentVerification = async (req, res) => {
  try {
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature } =
      req.body;

    const secret = process.env.RAZORPAY_KEY_SECRET;
    const hash = crypto
      .createHmac("sha256", secret)
      .update(razorpay_order_id + "|" + razorpay_payment_id)
      .digest("hex");

    if (hash !== razorpay_signature) {
      return res.status(400).json({ message: "Payment verification failed" });
    }

    const attendee = await db("attendees")
      .select("attendee_email", "attendee_name", "team_name", "event_id")
      .where({
        order_id: razorpay_order_id,
        payment_status: "PENDING",
      })
      .first();

    if (!attendee) {
      return res.status(404).json({ message: "Attendee not found" });
    }

    const event = await db("events")
      .select("event_name", "start_date", "location")
      .where({ event_id: attendee.event_id })
      .first();

    if (!event) {
      return res.status(404).json({ message: "Event not found" });
    }
    await db("attendees")
      .where({ order_id: razorpay_order_id })
      .update({ payment_status: "APPROVED" });

    const qrCodeData = `Payment was successful for the event: ${event.event_name}`;
    const qrCodeBuffer = await QRCode.toDataURL(qrCodeData);

    const uploadedResponse = await cloudinary.uploader.upload(qrCodeBuffer, {
      folder: "qr_codes",
      public_id: `qr_${razorpay_order_id}`,
      overwrite: true,
    });

    if (!uploadedResponse.secure_url) {
      return res.status(500).json({ message: "QR code upload failed" });
    }

    // Save QR code URL in the database
    await db("attendees")
      .where({ order_id: razorpay_order_id })
      .update({ qr_code: uploadedResponse.secure_url });

    // Send email with event details and QR code
    const event_date = new Date(event.start_date).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });

    await sendEmail(
      attendee.attendee_email,
      attendee.attendee_name,
      attendee.team_name,
      event_date,
      event.event_name,
      event.location,
      uploadedResponse.secure_url
    );

    // Return success response
    res.status(200).json({
      message: "Payment verified successfully",
      razorpay_payment_id,
      razorpay_order_id,
      qr_code_url: uploadedResponse.secure_url, // Return QR code URL
    });
  } catch (error) {
    console.error("Payment verification error:", error);
    res.status(500).json({ message: "Internal Server Error", error });
  }
};

const getEventTicket = async (req, res) => {
  try {
    const { email } = req.body;
    if (!email) {
      return res
        .status(500)
        .send(errorHandler(400, "Invalid Request", "Please enter the email"));
    }
    let selection = await db("attendees").select("*").where({
      attendee_email: email,
    });
    if (selection.length == 0) {
      return res
        .status(400)
        .send(
          errorHandler(400, "Not Registered", "Not Registered For The Event")
        );
    }
    return res.status(200).send({
      response: {
        data: { selection },
        title: "Successfully Fetched",
        message: "Event Ticket Successfully Fetched",
      },
    });
  } catch (error) {
    console.error("Event Ticket Error", error);
    res.status(500).json({ message: "Internal Server Error", error });
  }
};

module.exports = {
  getEvents,
  registerEvents,
  paymentVerification,
  getEventTicket,
};
