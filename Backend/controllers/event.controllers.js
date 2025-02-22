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
      .send(
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
    const {
      team_name,
      team_size,
      team_leader_name,
      team_leader_phone,
      team_leader_email,
      team_leader_batch,
      team_leader_branch,
      sec_participant,
      third_participant,
      fourth_participant,
      fifth_participant,
      sixth_participant,
      seventh_participant,
      eight_participant,
    } = req.body;

    if (!event_id) {
      return res
        .status(400)
        .send(errorHandler(400, "Invalid Request", "Please Enter The Event"));
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

    if (
      !team_name ||
      !team_size ||
      !team_leader_name ||
      !team_leader_phone ||
      !team_leader_email ||
      !team_leader_batch ||
      !team_leader_branch
    ) {
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

    const existingAttendee = await db("attendees")
      .where({ event_id, team_leader_email: email })
      .first();
    if (existingAttendee) {
      if (existingAttendee.payment_status === "APPROVED") {
        return res
          .status(400)
          .send(
            errorHandler(
              400,
              "Already Registered",
              "User has already registered and paid for this event."
            )
          );
      }
    }

    const amount = 5 * 100;

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
      team_size,
      team_leader_name,
      team_leader_phone,
      team_leader_email,
      team_leader_batch,
      team_leader_branch,
      sec_participant,
      third_participant,
      fourth_participant,
      fifth_participant,
      sixth_participant,
      seventh_participant,
      eight_participant,
      order_id:order.id,
      payment_status:"PENDING"
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
      return res
        .status(400)
        .send(
          errorHandler(
            400,
            "Request Failed",
            "Payment Verification Request Failed"
          )
        );
    }

    const attendee = await db("attendees")
      .select("team_leader_email", "team_leader_name", "team_name", "event_id")
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

    // const qrCodeData = `Order id is : ${razorpay_order_id}`;
    // const qrCodeBuffer = await QRCode.toDataURL(qrCodeData);

    // const uploadedResponse = await cloudinary.uploader.upload(qrCodeBuffer, {
    //   folder: "qr_codes",
    //   public_id: `qr_${razorpay_order_id}`,
    //   overwrite: true,
    // });

    // if (!uploadedResponse.secure_url) {
    //   return res.status(500).json({ message: "QR code upload failed" });
    // }

    // await db("attendees")
    //   .where({ order_id: razorpay_order_id })
    //   .update({ qr_code: uploadedResponse.secure_url });

    const event_date = new Date(event.start_date).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });

    await sendEmail(
      attendee.team_leader_email,
      attendee.team_leader_name,
      attendee.team_name,
      event_date,
      event.event_name,
      event.location,
      // uploadedResponse.secure_url
    );

    res.status(200).json({
      message: "Payment verified successfully",
      razorpay_payment_id,
      razorpay_order_id,
      // qr_code_url: uploadedResponse.secure_url,
    });
  } catch (error) {
    console.error("Payment verification error:", error);
    res.status(500).json({ message: "Internal Server Error", error });
  }
};

const getEventTicket = async (req, res) => {
  try {
    const { email } = req.query;
    if (!email) {
      return res
        .status(400)
        .send(errorHandler(400, "Invalid Request", "Please enter the email"));
    }
    let selection = await db("attendees").select("*").where({
      team_leader_email: email,
      payment_status: "APPROVED",
    });

    if (selection.length == 0) {
      return res.status(204).json({ message: "Not Registered for the event." });
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

const getAttendee = async (req, res) => {
  try {
    const { team_leader_email } = req.body;

    if (!team_leader_email) {
      return res.status(400).send(errorHandler(400, "Invalid Request", "Please Enter The Team Leader Email"));
    }

    const attendee = await db("attendees").where({ team_leader_email }).first();

    if (!attendee) {
      return res.status(404).send(errorHandler(404, "Not Found", "Team With The Following Credentials Not Found"));
    }

    const statusMessages = {
      PENDING: { title: "Status Is Pending", message: "Please Wait, Your Artwork Is Under Review" },
      REJECTED: { title: "Status Is Rejected", message: "Oh ho, Sorry Your Artwork Has Been Rejected By Our Experts" },
      APPROVED: { title: "Status Is Approved", message: "Woho! Your Artwork Has Been Approved By Our Experts" },
    };

    return res.status(200).send({ response: statusMessages[attendee.team_status] });

  } catch (error) {
    console.error(error);
    return res.status(500).send(errorHandler(500, "Internal Server Error", "Server Error While Fetching Attendees"));
  }
};



module.exports = {
  getEvents,
  registerEvents,
  paymentVerification,
  getEventTicket,
  getAttendee
};
