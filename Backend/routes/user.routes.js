const { Router } = require("express");
const {
  changeEnrollment,
  countUsers,
} = require("../controllers/user.controllers.js");
const { verifyToken } = require("../utils/verifyUser.js");

const router = Router();

router.route("/change-enrollment").post(verifyToken, changeEnrollment);
router.route("/count-users").get(verifyToken, countUsers);

module.exports = router;
