const { signIn } = require("../controllers/SignIn.controller");

const router = require("express").Router();

router.post("/", signIn);

module.exports = router;
