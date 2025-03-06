import { Router } from "express";
import { applyForVolunteering } from "../controllers/volunteers.controllers.js";
import { verifyToken } from "../utils/verifyUser.js";

const router = Router();

router.route("/register/volunteer").post(verifyToken, applyForVolunteering);

export default router;
