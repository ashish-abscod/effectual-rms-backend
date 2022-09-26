const router = require("express").Router();
const { createReplie } = require("../controllers/Replies.controller");

router.post("/", createReplie);

module.exports = router;
