import express from "express";
import db from "../config/db/index.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import { sendWelcomeEmail } from "../utils/emailFunctions.js";
import { verifyToken } from "../utils/verifyUser.js";

const router = express.Router();

router.post("/auth/google/signup", async (req, res, next) => {
  try {
    const { name, email, avatar, uid } = req.body;

    if (!name || !email || !uid || !avatar) {
      return res.status(400).json({ message: "All fields are required." });
    }

    const existingUser = await db("users").where({ email }).first();
    if (existingUser) {
      return res
        .status(400)
        .json({ message: "Email already exists. Please login." });
    }

    const hashedUid = await bcrypt.hash(uid, 10);
    console.log(name,email,hashedUid,avatar);
    

    const newUser = {
      name,
      email,
      uid: hashedUid,
      avatar,
      batch: "batch",
      branch: "branch",
      enrollment: "enrollment",
    };

    const [insertedUser] = await db("users").insert(newUser).returning("*");

    if (insertedUser) {
      try {
        await sendWelcomeEmail(email, name);

        const token = jwt.sign(
          { id: insertedUser.hashedUid },
          process.env.JWT_SECRET
        );
        const { uid: hasheduid, ...rest } = insertedUser;
        return res.status(200).send({
          response: {
            data: { rest, token },
            title: "Account Created Successfully",
            message:
              "Account Created Successfully Redirecting To The Login Page",
          },
        });
      } catch (error) {
        console.error("Error creating account:", error);
        return res.status(500).json({ message: "Internal server error." });
      }
    }
  } catch (error) {
    console.error("Signup error:", error.message);
    return res.status(500).json({ message: "Internal server error." });
  }
});

router.post("/auth/google/signin", async (req, res, next) => {
  try {
    const { email, uid } = req.body;

    if (!email || !uid) {
      return res.status(400).json({ message: "Email and UID are required." });
    }

    const user = await db("users").where({ email }).first();
    if (!user) {
      return res
        .status(404)
        .json({ message: "Email not registered. Please signup." });
    }

    const isMatch = bcrypt.compareSync(uid, user.uid);
    if (!isMatch) {
      return res.status(401).json({ message: "Wrong credentials." });
    }

    const token = jwt.sign({ id: user.uid }, process.env.JWT_SECRET);
    const { uid: hasheduid, ...rest } = user;
    return res.status(200).send({
      response: {
        data: { rest, token },
        title: "Login Successful",
        message: "Logged In Successfully Redirecting To The Home Page",
      },
    });
  } catch (error) {
    console.error("Error during Google Auth:", error);
    next(error);
  }
});

router.get("/auth/signout", (req, res, next) => {
  try {
    res.clearCookie("access_token");
    res.status(200).json("Sign out successfully");
  } catch (error) {
    next(error);
  }
});

router.delete("/auth/delete-account", verifyToken, async (req, res,next) => {
  try {
    const { email } = req.body;

    if (!email) {
      return res.status(400).json({ success: false, message: "Email is required." });
    }

    const deleted = await db("users").where({ email }).del();

    if (deleted === 0) {
      return res.status(404).json({ success: false, message: "User not found." });
    }

    res.status(200).json({ success: true, message: "Account deleted successfully." });
  } catch (error) {
    console.error("Error deleting account:", error);
   next(error);
  }
});


export default router;
