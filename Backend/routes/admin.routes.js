import express from "express";
import {
  sendOtp,
  verifyOtp,
  markAttendance,
  updateTeamStatus,
  getAttendeeDetails,
  getAttendeeCount,
  loginAdmin,
  getAllAdmins,
  logoutAdmin,
  scanQr,
} from "../controllers/admin.controllers.js";
import authMiddleware from "../middleware/auth.middleware.js";

const router = express.Router();

router.post("/send-otp", sendOtp);
router.post("/login", loginAdmin);
router.post("/verify-otp", verifyOtp);
router.post("/mark-attendance", authMiddleware, markAttendance);
router.post("/update-status", authMiddleware, updateTeamStatus);
router.get("/get-attendee", authMiddleware, getAttendeeDetails);
router.get("/count-attendee", authMiddleware, getAttendeeCount);
router.get("/get-team-details",authMiddleware,scanQr);
router.get("/get-admins", authMiddleware, getAllAdmins);
router.post("/logout-admin", authMiddleware, logoutAdmin);


export default router;
