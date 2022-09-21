const AssignedModel = require("../models/AssignedUsers");

exports.createAssignedUser = async (req, res) => {
  let add = new AssignedModel(req.body);
  let result = await add.save();
  res.send(result);
};
