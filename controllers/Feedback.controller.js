const feedbackModel = require("../models/Feedbacks.model");

exports.createFeedback = async (req, res) => {
  let add = new feedbackModel(req.body);
  let result = await add.save();
  res.send(result);
};
