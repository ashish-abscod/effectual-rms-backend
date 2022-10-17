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
        $set: { ...req?.body, modification: date.format(now, "YYYY-MM-DD") },
      },
      {
        upsert: true,
        new: true,
        setDefaultsOnInsert: true,
      }
    );
    res.json({ result, msg: "Successfully updated evaluation!", status: "success" });
  } catch (error) {
    res.json({ error, msg: "Something went wrong.", status: "failed" });
  }
};
