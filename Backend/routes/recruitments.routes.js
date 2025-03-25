import express from "express";
import {
  registerRecruitment,
  razorpayWebhook,
} from "../controllers/recruitments.controllers.js";
import { verifyToken } from "../utils/verifyUser.js";

const router = express.Router();

router.post("/register-recruitments", registerRecruitment);
router.post("/verify-payment-recuitments", verifyToken, razorpayWebhook);

export default router;
