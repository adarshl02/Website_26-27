import express from "express"
import multer from "multer"
import {
  artCommunity,
  imAnArtist,
  getUserAndArtCommunityDetails,
  countArtist
} from "../controllers/art.controllers.js"
import { verifyToken } from "../utils/verifyUser.js";

const router = express.Router();

const upload = multer({ storage: multer.memoryStorage() });

router.post(
  "/art-community",
  verifyToken,
  upload.single("image"),
  artCommunity
);
router.post("/enroll-artist", verifyToken, imAnArtist);
router.get("/user-art-details", verifyToken, getUserAndArtCommunityDetails);
router.get("/get-artists", verifyToken, countArtist);

export default router;
