const CommentsModel = require("../models/Comments.model");

exports.createComment = async (req, res) => {
  const data = new CommentsModel({
    comment: req.body
  });

  try {
    const dataToSave = await data.save();
    res.status(200).json(dataToSave);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
