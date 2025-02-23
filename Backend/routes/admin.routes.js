const express = require("express");
const {
  registerAdmin,
  loginAdmin,
  markAttendance,
  getAttendeeByEmail,
  updateTeamStatus,
} = require("../controllers/admin.controllers.js");
const { default: authMiddleware } = require("../middleware/auth.middleware.js");

const router = express.Router();

// router.post("/register", registerAdmin);
router.post("/login", loginAdmin);
router.post("/mark-attendance", authMiddleware, markAttendance);
router.post("/get-attendee", authMiddleware, getAttendeeByEmail);
router.post("/update-status", authMiddleware, updateTeamStatus);

module.exports = router;
