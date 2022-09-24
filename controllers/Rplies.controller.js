const ReplieModel = require("../models/Replies.model");

exports.createReplie = async (req, res) => {
  const data = new ReplieModel({
    replie: req.body
  });

  try {
    const dataToSave = await data.save();
    res.status(200).json(dataToSave);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
