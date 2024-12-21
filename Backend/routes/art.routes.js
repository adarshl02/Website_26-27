const express = require("express");
const multer = require("multer");
const {
  artCommunity,
  imAnArtist,
  getUserAndArtCommunityDetails,
} = require("../controllers/art.controllers.js");
const { verifyToken } = require("../utils/verifyUser.js");

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

module.exports = router;
