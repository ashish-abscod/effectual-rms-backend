const router = require("express").Router();
const {forgotPassword,resetPassword} = require("../controllers/ForgotPassword.controller");


router.post("/reset_request",forgotPassword);
router.post("/reset/:userId/:token",resetPassword);

module.exports = router;