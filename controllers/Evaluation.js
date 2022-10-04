const EvaluationModel = require("../models/Evaluation.model");

exports.createEvaluation = async (req, res) => {
  let add = new EvaluationModel(req.body);
  let result = await add.save();
  res.send(result);
};
exports.getEvaluation = async (req, resp) => {
  let result = await EvaluationModel.findOne({
    projectId: req.params.id,
  });
  if (result) {
    resp.send(result);
  } else {
    resp.send({ result: "no record found" });
  }
};
exports.evaluationUpdate = async (req, resp) => {
  let result = await EvaluationModel.findOneAndUpdate(
    { projectId: req.params.projectId },
    {
      $set: req.body,
    },
    {
      upsert: true,
      new: true,
      setDefaultsOnInsert: true,
    }
  );
  resp.send(result);
};
