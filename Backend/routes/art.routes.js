const express = require("express");
const multer = require("multer");
const { artCommunity } = require("../controllers/art.controllers.js");
const { verifyToken } = require("../utils/verifyUser.js");
const { verify } = require("crypto");

const router = express.Router();

const upload = multer({ storage: multer.memoryStorage() });

router.post(
  "/art-community",
  verifyToken,
  upload.single("image"),
  artCommunity
);

module.exports = router;
