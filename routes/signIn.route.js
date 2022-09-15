const { signIn } = require("../controllers/signIn.controller");

const router = require("express").Router();

router.post("/", signIn);

module.exports = router;