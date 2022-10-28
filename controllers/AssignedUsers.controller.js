const AssignedModel = require("../models/AssignedUsers.model");

exports.createAssignedUser = async (req, res) => {
  try {
    let newUser = new AssignedModel({
      userId: req.body.userId,
      projectId: req.body.projectId,
      assignedBy: req.body.assignedBy
    });
    let result = await newUser.save();
    res.json({ result, msg: "user is assigned to the project", status: "success" });
  } catch (error) {
    res.json({ error, msg: "Sorry,user is not assigned to the project", status: "failed" });
  }

};

exports.getAssignedUser = async (req, res) => {
  let item = await AssignedModel.find();
  if (item.length > 0) {
    res.send(item);
  } else {
    res.send({ result: "data not found" });
  }
};

exports.getAssignedUserToProject = async (req, res) => {
  let item = await AssignedModel.find({ 
    projectId: req.params.projectId,
    $or: [{ userId: { _id: req.params.id } }],
    role: { $in: ["Patent Expert", "Technical Expert"] } });
    console.log(item);
  if (item.length > 0) {
    res.json({item:true});
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
  const result = await AssignedModel.findOneAndUpdate(
    { projectId: req.params.id },

    { $push: { userId: { $each: req.body } } }
  );
  res.send(result);
};
