import express from "express";
import {
  registerRecruitment,
  verifyRecruitmentPayment,
} from "../controllers/recruitments.controllers.js";
import { verifyToken } from "../utils/verifyUser.js";

const router = express.Router();

router.post("/recruitment/register", registerRecruitment);
router.post("/recruitment/payment-verify", verifyToken, verifyRecruitmentPayment);

export default router;