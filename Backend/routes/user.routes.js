import { Router } from "express";
import {
  changeEnrollment,
  countUsers,
  getMember,
  giveFeedback
} from "../controllers/user.controllers.js";
import { verifyToken } from "../utils/verifyUser.js";

const router = Router();

router.route("/change-enrollment").post(verifyToken, changeEnrollment);
router.route("/count-users").get(countUsers);
router.route("/give-feedback").post(verifyToken, giveFeedback);
router.route("/get/member").get(verifyToken, getMember);

export default router;
