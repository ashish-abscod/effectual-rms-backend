const router = require("express").Router();
const {
  getEvaluation,
  evaluationUpdate,
} = require("../controllers/Evaluation");

router.get("/getById/:id", getEvaluation);
router.post("/:projectId", evaluationUpdate);
module.exports = router;
