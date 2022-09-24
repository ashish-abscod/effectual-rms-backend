const AssignedModel = require("../models/AssignedUsers");

exports.createAssignedUser = async (req, res) => {
  let add = new AssignedModel(req.body);
  let result = await add.save();
  res.send(result);
};

exports.getAssignedUser = async (req, res) => {
  let item = await AssignedModel.find();
  if (item.length > 0) {
    res.send(item);
  } else {
    res.send({ result: "data not found" });
  }
};

exports.removeAssignedUser = async (req, resp) => {
  let result = await AssignedModel.deleteOne({ _id: req.params.id });
  resp.send(result);
};
