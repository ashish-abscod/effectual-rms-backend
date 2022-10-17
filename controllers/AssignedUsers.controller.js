const AssignedModel = require("../models/AssignedUsers.model");

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

exports.assignedUserGetById = async (req, resp) => {
  let result = await AssignedModel.findOne({ projectId: req.params.id });
  if (result) {
    resp.send(result);
  } else {
    resp.send({ result: "no record found" });
  }
};

exports.removeAssignedUser = async (req, resp) => {
  let result = await AssignedModel.findByIdAndUpdate(
    { _id: req.params.id },
    { $pull: { userId: { _id: req.params.userId } } }
  );
  resp.send(result);
};

exports.updateAssignedUser = async (req, res) => {
  console.log(req.body)
console.log(req.params.id)
  const result = await AssignedModel.findOneAndUpdate(
    { projectId: req.params.id },

    { $push: { userId: {$each : req.body } }}
  );
  console.log(result)
  res.send(result);
};
