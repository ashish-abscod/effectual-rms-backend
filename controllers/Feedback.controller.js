const feedback = require("../models/feedback.model");

exports.createFeedback = async (req, res) => {
  let add = new feedback(req.body);
  let result = await add.save();
  res.send(result);
};
