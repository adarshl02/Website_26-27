const express = require("express");
const multer = require("multer");
const { artCommunity } = require("../controllers/art.controllers.js");

const router = express.Router();

const upload = multer({ storage: multer.memoryStorage() });

router.post("/art-community", upload.single("image"), artCommunity);

module.exports = router;
