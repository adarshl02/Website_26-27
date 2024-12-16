const { Router } = require("express");
const {
  getEvents,
  registerEvents,
  paymentVerification,
  getEventTicket,
} = require("../controllers/event.controllers.js");

const router = Router();

router.route("/get/events").get(getEvents);
router.route("/register/").post(registerEvents);
router.route("/payment/verify").post(paymentVerification);
router.route("/get/event-ticket").get(getEventTicket);

module.exports = router;
