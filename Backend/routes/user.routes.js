const { Router } = require("express");
const { changeEnrollment } = require("../controllers/user.controllers.js");
const { verifyToken } = require("../utils/verifyUser.js");

const router = Router();

router.route("/change-enrollment").post(verifyToken,changeEnrollment);

module.exports = router;
