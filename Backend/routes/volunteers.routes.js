const { Router } = require("express");
const {
  applyForVolunteering,
} = require("../controllers/volunteers.controllers.js");
const { verifyToken } = require("../utils/verifyUser.js");

const router = Router();

router.route("/register/volunteer").post(verifyToken,applyForVolunteering);

module.exports = router;