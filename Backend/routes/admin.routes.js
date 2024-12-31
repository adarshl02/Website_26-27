const express = require("express");
const {
  registerAdmin,
  loginAdmin,
  markAttendance
} = require("../controllers/admin.controllers.js");

const router = express.Router();

router.post("/register", registerAdmin);
router.post("/login", loginAdmin);
router.post("/mark-attendance", markAttendance);

module.exports = router;
