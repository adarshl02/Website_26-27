import express from "express";
import {
  registerAdmin,
  loginAdmin,
  markAttendance,
  // getAttendeeByEmail,
  updateTeamStatus,
  getAttendeeCount,
} from "../controllers/admin.controllers.js";
import authMiddleware from "../middleware/auth.middleware.js";

const router = express.Router();




// router.post("/register", registerAdmin);
router.post("/login", loginAdmin);
router.post("/mark-attendance", authMiddleware, markAttendance);
// router.get("/get-attendee", authMiddleware, getAttendeeByEmail);
router.post("/update-status", authMiddleware, updateTeamStatus);
router.get("/count-attendee", authMiddleware, getAttendeeCount);

export default router
