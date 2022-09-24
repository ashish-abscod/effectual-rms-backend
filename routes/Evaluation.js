const router = require("express").Router();
const { createEvaluation } = require("../controllers/Evaluation");

router.post("/", createEvaluation);

module.exports = router;
