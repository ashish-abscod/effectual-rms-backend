const EvaluationModel = require("../models/Evaluation.model");
const date = require('date-and-time');

exports.getEvaluation = async (req, resp) => {
  let result = await EvaluationModel.findOne({
    projectId: req.params.id,
  });
  if (result) {
    resp.json({ result });
  } else {
    resp.send({ msg: "No record found" });
  }
};


exports.evaluationUpdate = async (req, res) => {
  const now = new Date();
  try {
    let result = await EvaluationModel.findOneAndUpdate(
      { projectId: req.params.projectId },
      {
        $set: { ...req?.body, modification: date.format(now, "YYYY-MM-DD"),projectId : req.params.projectId },
      },
      {
        upsert: true,
        new: true,
        setDefaultsOnInsert: true,
      }
    );
    res.json({ result, msg: "Evaluation updated successfully!", status: "success" });
  } catch (error) {
    res.json({ error, msg: "Evaluation updation is failed!", status: "failed" });
  }
};
