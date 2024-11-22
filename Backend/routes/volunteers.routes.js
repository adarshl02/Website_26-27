const { Router } = require("express");
const {
  applyForVolunteering,
} = require("../controllers/volunteers.controllers.js");

const router = Router();

router.route("/register/volunteer").post(applyForVolunteering);

module.exports = router;
