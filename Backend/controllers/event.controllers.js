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
    const  event_id =3;
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
      return res.status(400).send(errorHandler(400, "Invalid Request", "Please enter the event"));
    }

    const eventExists = await db("events").where({ event_id }).first();
    if (!eventExists) {
      return res.status(404).send(errorHandler(404, "Not Found", "Event not found in the database"));
    }
    
    const { event_name, start_date, location: event_location } = eventExists;
    const event_date = new Date(start_date).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });

    if (!team_name || !team_size || !team_leader_name || !team_leader_phone || !team_leader_email || !team_leader_batch || !team_leader_branch) {
      return res.status(400).send(errorHandler(400, "Invalid Request", "Please fill all required fields"));
    }

    const existingAttendee = await db("attendees").where({ event_id, team_leader_email }).first();
    if (existingAttendee && existingAttendee.payment_status === "APPROVED") {
      return res.status(400).send(errorHandler(400, "Already Registered", "User has already registered and paid for this event."));
    }

    const amount = 99 * 100;

    const order = await razorpay.orders.create({
      amount: amount,
      currency: "INR",
      receipt: `receipt_order_${Date.now()}`,
    });

    if (!order) {
      return res.status(500).send(errorHandler(500, "Order Error", "Failed to create Razorpay order"));
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
      order_id: order.id,
      payment_status: "PENDING",
    };

    let insertion = await db("attendees").insert(data).returning("*");

    if (!insertion) {
      return res.status(400).send(errorHandler(400, "Error Occurred", "Error while making booking"));
    }

    return res.status(200).send({
      response: {
        data: { insertion, amount },
        title: "Inserted Attendee",
        message: "Inserted Attendee but payment verification required",
      },
    });
  } catch (error) {
    console.error("Error while making booking:", error);
    return res.status(500).send(errorHandler(500, "Internal Server Error", "Error in booking the ticket"));
  }
};

// Razorpay Webhook for Payment Verification
const getEventTicket = async (req, res) => {
  try {
    const { email } = req.query;
    if (!email) {
      return res
        .status(400)
        .send(errorHandler(400, "Invalid Request", "Please enter the email"));
    }
    let selection = await db("attendee_documents").select("*").where({
      team_leader_email: email,
      payment_status: "APPROVED",
    });

    if (selection.length == 0) {
      return res.status(204).json({ message: "Not Registered for the event." });
    }
    return res.status(200).send({
      response: {
        // data: { selection },
        status:"Attended",
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
    const { team_leader_email } = req.query;

    if (!team_leader_email) {
      return res
        .status(400)
        .send(
          errorHandler(
            400,
            "Invalid Request",
            "Please Enter The Team Leader Email"
          )
        );
    }

    const attendee = await db("attendees")
      .where({ team_leader_email, payment_status: "APPROVED" })
      .first();

    if (!attendee) {
      return res.status(204).send();
    }

    const statusMessages = {
      PENDING: {
        status: "PENDING",
        title: "Status Is Pending",
        message: "Please Wait, Your Artwork Is Under Review",
      },
      REJECTED: {
        status: "REJECTED",
        title: "Status Is Rejected",
        message: "Oh ho, Sorry Your Artwork Has Been Rejected By Our Experts",
      },
      APPROVED: {
        status: "APPROVED",
        title: "Status Is Approved",
        message: "Woho! Your Artwork Has Been Approved By Our Experts",
      },
    };

    return res.status(200).send({
      response: statusMessages[attendee.team_status] || {},
      attendee, 
    });
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .send(
        errorHandler(
          500,
          "Internal Server Error",
          "Server Error While Fetching Attendees"
        )
      );
  }
};

export {
  getEvents,
  registerEvents,
  // paymentVerification,
  getEventTicket,
  getAttendee,
};
