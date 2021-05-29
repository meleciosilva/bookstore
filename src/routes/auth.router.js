const router = require("express").Router();
const controller = require("./../controllers/auth.controller");

router.route("/sign-up").post(controller.registerNewUser);
router.route("/log-in").post(controller.loginUser);

module.exports = router;