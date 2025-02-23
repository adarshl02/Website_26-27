const express = require("express");
const {
  registerAdmin,
  loginAdmin,
  markAttendance,
  getAttendeeByEmail,
  updateTeamStatus,
  getAttendeeCount,
} = require("../controllers/admin.controllers.js");
const { default: authMiddleware } = require("../middleware/auth.middleware.js");

const router = express.Router();

// router.post("/register", registerAdmin);
router.post("/login", loginAdmin);
router.post("/mark-attendance", authMiddleware, markAttendance);
router.get("/get-attendee", authMiddleware, getAttendeeByEmail);
router.post("/update-status", authMiddleware, updateTeamStatus);
router.get("/count-attendee", authMiddleware, getAttendeeCount);

module.exports = router;
