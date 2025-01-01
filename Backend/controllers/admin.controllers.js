const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const db = require("../config/db/index.js");
const { errorHandler } = require("../utils/errorHandler");
require("dotenv").config();

const registerAdmin = async (req, res) => {
  try {
    const { username, password } = req.body;

    if (!username || !password) {
      return res.status(404).send(
        errorHandler(
          404,
          "Invalid Request",
          "Please Enter Username And Password"
        )
      );
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const defaultName = 'Admin';
    const defaultEmail = `${username}@admin.com`; // Assuming you generate email based on username
    const defaultAvatar = "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png";
    const defaultBatch = '2025';
    const defaultBranch = 'ADMIN';

    await db("admins").insert({
      username,
      password: hashedPassword,
      name: defaultName,
      email: defaultEmail,
      avatar: defaultAvatar,
      batch: defaultBatch,
      branch: defaultBranch,
      is_member: false,
      is_artist: false,
    });

    res.status(201).json({ message: "Admin registered successfully" });
  } catch (error) {
    if (error.code === "23505") {
      return res.status(404).send(
        errorHandler(404, "Already Exists", "Username or Email Already Exists")
      );
    } else {
      return res.status(500).json(
        errorHandler(
          500,
          "Internal Server Error",
          "Server Error While Creating Admin"
        )
      );
    }
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
        expiresIn: "1h",
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

const markAttendance = async (req, res) => {
  try {
    
    const { qrCodeData } = req.body;

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
      attendee, // Send the entire attendee object
    });
  } catch (error) {
    console.error("Attendance marking error:", error);
    return res
      .status(500)
      .send(errorHandler(500, "Server Error", "Internal Server Error"));
  }
};


module.exports = {
  registerAdmin,
  loginAdmin,
  markAttendance,
};
