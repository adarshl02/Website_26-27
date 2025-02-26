import { Router } from "express";
import {
  getEvents,
  registerEvents,
  paymentVerification,
  getEventTicket,
  getAttendee,
} from "../controllers/event.controllers.js";
import {
  registerForFinalRound,
  verifyFinalPayment,
  scanQr,
  markAttendance,
} from "../controllers/final-round.js";
import { verifyToken } from "../utils/verifyUser.js";

const router = Router();

router.route("/get/events").get(verifyToken, getEvents);
router.route("/register/").post(verifyToken, registerEvents);
router.route("/payment/verify").post(verifyToken, paymentVerification);
router.route("/get/event-ticket").get(verifyToken, getEventTicket);
router.route("/get/attendee").get(verifyToken, getAttendee);
router.route("/register-final-round").post(registerForFinalRound);
router.route("/verify-final-round").post(verifyFinalPayment);
router.route("/get-team-details").get(scanQr);
router.route("/mark-attendance").post(markAttendance);

export default router;
