const express = require("express");
const {
  registerAdmin,
  loginAdmin,
  markAttendance
} = require("../controllers/admin.controllers.js");
const { default: authMiddleware } = require("../middleware/auth.middleware.js");

const router = express.Router();

// router.post("/register", registerAdmin);
router.post("/login", loginAdmin);
router.post("/mark-attendance",authMiddleware, markAttendance);

module.exports = router;
