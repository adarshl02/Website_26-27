import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import db from "../config/db/index.js";
import errorHandler from "../utils/errorHandler.js";
import nodemailer from "nodemailer";
import "dotenv/config";
import { response } from "express";

const generateOTP = () =>
  Math.floor(1000 + Math.random() * 9000).toString();

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "teampratibimb.sgsits@gmail.com",
    pass: process.env.NODEMAILER_ADMIN,
  },
});

const sendOtp = async (req, res) => {
  try {
    const { name } = req.body;
    const existingUser = await db("active_admins").where({ name }).first();
    if (existingUser) {
      return res.status(404).json({ message: "Admin Already Exists" });
    }

    const otp = generateOTP();
    const expiresAt = new Date(Date.now() + 10 * 60 * 1000); // 10 mins expiry

    await db("access_otp_log").insert({ name, otp, expires_at: expiresAt });

    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: "teampratibimb.sgsits@gmail.com",
      subject: "Your OTP for Login",
      text: `Your OTP is: ${otp}. It will expire in 10 minutes.OTP is requested by ${name}`,
    });

    res.status(200).json({ message: "OTP sent successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to send OTP" });
  }
};
const verifyOtp = async (req, res) => {
  try {
    const { name, otp } = req.body;

    const otpData = await db("access_otp_log").where({ name }).first();

    if (!otpData) {
      return res.status(400).json({ message: "Invalid OTP request" });
    }

    if (otpData.otp != otp) {
      return res
        .status(400)
        .send(errorHandler(400, "Bad Request", "Invalid OTP"));
    }

    if (new Date() > new Date(otpData.expires_at)) {
      return res.status(400).json({ message: "OTP expired" });
    }

    if (otpData.is_verified) {
      return res
        .status(400)
        .send(errorHandler(400, "Bad Request", "OTP is already verified"));
    }

    const [user] = await db("active_admins")
      .insert({ name })
      .returning(["id", "name", "email", "avatar", "batch", "branch", "is_member", "is_artist"]);

    await db("access_otp_log")
      .update({ is_verified: true })
      .where({ otp, name });

    const token = jwt.sign(
      { id: user.id, name: user.name },
      process.env.JWT_SECRET
    );

    let rest = user;

    res.status(200).send({
      response: {
        data: { rest, token },
        title: "Login Successful",
        message: "Logged In Successfully. Redirecting to the Home Page",
      },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to verify OTP" });
  }
};


const getAllAdmins = async (req, res) => {
  try {
     const admins = await db("active_admins").select("id","name", "created_at");
    if (!admins) {
      return res
        .status(400)
        .send(errorHandler(400, "Not Found", "No Admins Found"));
    }

    return res.status(200).send({
      response: {
        data: { admins },
        title: "Admins Fetched",
        message: "Admins Fetched Successfully",
      },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to fetch admins" });
  }
};

const logoutAdmin = async (req, res) => {
  try {
    const { name } = req.body;

    // Check if admin exists in active_admins
    let search = await db("active_admins").where({ name }).first(); // `.first()` ensures a single object instead of an array

    if (!search) {
      return res.status(404).json({
        error: "Not Found",
        message: `Admin not found with name ${name}`,
      });
    }

    // Delete the admin from active_admins
    let deletion1 = await db("active_admins").where({ name }).del();
    let deletion2 = await db("access_otp_log").where({ name }).del();

    if (deletion1 && deletion2) {
      return res.status(200).json({
        response: {
          title: "Logout Successful",
          message: `Logout successful for user ${name}`,
        },
      });
    } else {
      return res.status(500).json({
        error: "Logout Failed",
        message: "Failed to remove admin from active list",
      });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

const markAttendance = async (req, res) => {
  try {
    const { qrCodeData } = req.params;

    const razorpay_order_id = qrCodeData;
    const attendee = await db("attendees")
      .select("*") // Select all fields of the attendee
      .where({
        order_id: razorpay_order_id,
      })
      .first();

    if (!attendee) {
      return res
        .status(400)
        .send(errorHandler(400, "Not Found", "Attendee Not Found"));
    }

    if (attendee.is_attended == true) {
      return res.status(200).json({
        message: "Attendee already marked",
        attendee,
      });
    }

    await db("attendees")
      .where({ order_id: razorpay_order_id })
      .update({ is_attended: true });

    res.status(200).json({
      message: "Attendance marked successfully",
      attendee,
    });
  } catch (error) {
    console.error("Attendance marking error:", error);
    return res
      .status(500)
      .send(errorHandler(500, "Server Error", "Internal Server Error"));
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

const getAttendeeCount = async (req, res) => {
  try {
    const countResult = await db("attendees").count("attendee_id as total");

    const totalAttendees = countResult[0].total;

    res.status(200).json({
      success: true,
      message: "Total attendees fetched successfully",
      totalAttendees,
    });
  } catch (error) {
    console.error("Error fetching attendees count:", error);
    res.status(500).json({
      success: false,
      message: "Error fetching attendees count",
      error: error.message,
    });
  }
};

const getAttendeeDetails = async (req, res) => {
  try {
    let attendee = await db("attendees").select("*");

    if (!attendee) {
      return res
        .status(400)
        .send(
          errorHandler(
            404,
            "Not Found",
            "Attendee Not Found With Provided Email"
          )
        );
    }
    return res.status(200).send({
      response: {
        data: { attendee },
        title: "Successfully Fetched",
        message: "Attendee Successfully Fetched",
      },
    });
  } catch (error) {
    return res
      .status(500)
      .send(
        errorHandler(
          500,
          "Server Error",
          "Internal Server Error While Fetching An Attendee"
        )
      );
  }
};

const updateTeamStatus = async (req, res) => {
  try {
    const { team_leader_email, team_status } = req.body;

    if (!team_leader_email || !team_status) {
      return res
        .status(400)
        .send(
          errorHandler(
            400,
            "Invalid Request",
            "Please Provide Both Email and Status"
          )
        );
    }

    const validStatuses = ["REJECTED", "APPROVED", "PENDING"];
    if (!validStatuses.includes(team_status)) {
      return res
        .status(400)
        .send(
          errorHandler(
            400,
            "Invalid Status",
            "Status must be PENDING, REJECTED, or APPROVED"
          )
        );
    }

    const attendee = await db("attendees").where({ team_leader_email }).first();

    if (!attendee) {
      return res
        .status(404)
        .send(
          errorHandler(404, "Not Found", "Team With The Given Email Not Found")
        );
    }

    await db("attendees").where({ team_leader_email }).update({ team_status });

    return res.status(200).send({
      response: {
        title: "Success",
        message: `Team status updated to ${team_status}`,
      },
    });
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .send(
        errorHandler(
          500,
          "Internal Server Error",
          "Server Error While Updating Team Status"
        )
      );
  }
};

const loginAdmin = async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res
      .status(400)
      .json({ error: "Username and password are required" });
  }

  try {
    const admin = await db("admins").where({ username }).first();
    if (!admin) {
      return res.status(204).json({ error: "Invalid credentials" });
    }

    const isPasswordValid = await bcrypt.compare(password, admin.password);
    if (!isPasswordValid) {
      return res.status(204).json({ message: "Invalid credentials" });
    }

    const token = jwt.sign(
      { id: admin.id, username: admin.username },
      process.env.JWT_SECRET,
      {
        expiresIn: "5d",
      }
    );
    const { username: _, password: __, ...rest } = admin;

    return res.status(200).send({
      response: {
        data: { rest, token },
        title: "Login Successful",
        message: "Logged In Successfully. Redirecting to the Home Page",
      },
    });
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};


export {
  sendOtp,
  verifyOtp,
  markAttendance,
  updateTeamStatus,
  getAttendeeDetails,
  getAttendeeCount,
  getAllAdmins,
  logoutAdmin,
  scanQr,
  loginAdmin
};
