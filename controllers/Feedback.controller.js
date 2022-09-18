const feedbackModel = require("../models/Feedback.model");

exports.createFeedback = async (req, res) => {
  let add = new feedbackModel(req.body);
  let result = await add.save();
  res.send(result);
};
