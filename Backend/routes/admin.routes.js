import express from "express";
import {
  sendOtp,
  verifyOtp,
  markAttendance,
  updateTeamStatus,
  getAttendeeDetails,
  getAttendeeCount,
  getAllAdmins
} from "../controllers/admin.controllers.js";
import authMiddleware from "../middleware/auth.middleware.js";

const router = express.Router();

router.post("/send-otp", sendOtp);
router.post("/verify-otp", verifyOtp);
router.post("/mark-attendance", authMiddleware, markAttendance);
router.post("/update-status", authMiddleware, updateTeamStatus);
router.post("/get-attendee", authMiddleware, getAttendeeDetails);
router.get("/count-attendee", authMiddleware, getAttendeeCount);
router.get("/get-admins", authMiddleware, getAllAdmins);

export default router;
