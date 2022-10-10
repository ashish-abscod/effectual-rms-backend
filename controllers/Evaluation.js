const EvaluationModel = require("../models/Evaluation.model");

exports.createEvaluation = async (req, res) => {
  try {
    // console.log(req.body)
    let add = new EvaluationModel(req.body);
    let result = await add.save();
    // console.log(result);
    res.json({ result, msg: "Successfully evaluated!", status: "success" })
  } catch (error) {
    res.json({ error, msg: "Something went wrong.", status: "failed" });
  }
};

exports.getEvaluation = async (req, resp) => {
  console.log(req.body)
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
  try {
    console.log(req.body)

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
    console.log(result);
    res.json({ result, msg: "Successfully updated evaluation!", status: "success" });
  } catch (error) {
    res.json({ error, msg: "Something went wrong.", status: "failed" });
  }
};
