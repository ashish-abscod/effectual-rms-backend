const router = require("express").Router();
const {
  getEvaluation,
  evaluationUpdate,
} = require("../controllers/Evaluation.controller");

router.get("/getById/:id", getEvaluation);
router.post("/:projectId", evaluationUpdate);
module.exports = router;
