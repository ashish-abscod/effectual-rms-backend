const router = require("express").Router();
const { createFeedback } = require("../controllers/feedback.controller");

router.post("/", createFeedback);

module.exports = router;
