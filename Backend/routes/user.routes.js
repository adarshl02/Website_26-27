import { Router } from "express";
import {
  changeEnrollment,
  countUsers,
  giveFeedback
} from "../controllers/user.controllers.js";
import { verifyToken } from "../utils/verifyUser.js";

const router = Router();

router.route("/change-enrollment").post(verifyToken, changeEnrollment);
router.route("/count-users").get(verifyToken, countUsers);
router.route("/give-feedback").post(verifyToken, giveFeedback);

export default router;
