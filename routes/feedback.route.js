const router = require("express").Router();
const { createFeedback } = require("../controllers/Feedback.controller");

router.post("/", createFeedback);

module.exports = router;
