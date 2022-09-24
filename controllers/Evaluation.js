const EvaluationModel = require("../models/Evaluation.model");

exports.createEvaluation = async (req, res) => {
  let add = new EvaluationModel(req.body);
  let result = await add.save();
  res.send(result);
};
