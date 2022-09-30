const router = require("express").Router();
const {
  createEvaluation,
  getEvaluation,
  evaluationUpdate,
} = require("../controllers/Evaluation");

router.post("/", createEvaluation);
router.get("/getById/:id", getEvaluation);
router.post("/:projectId", evaluationUpdate);
module.exports = router;
