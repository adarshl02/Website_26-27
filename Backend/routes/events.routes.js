const { Router } = require("express");
const {
  getEvents,
  registerEvents,
  paymentVerification,
  getEventTicket,
} = require("../controllers/event.controllers.js");
const { verifyToken } = require("../utils/verifyUser.js");

const router = Router();

router.route("/get/events").get(verifyToken,getEvents);
router.route("/register/").post(verifyToken,registerEvents);
router.route("/payment/verify").post(verifyToken,paymentVerification);
router.route("/get/event-ticket").get(verifyToken,getEventTicket);

module.exports = router;
