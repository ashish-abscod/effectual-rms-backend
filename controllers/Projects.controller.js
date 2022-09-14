const projects = require("../models/projects.model");

exports.getProjects = async (req, res) => {
  try {
    const data = await projects.find();
    res.json(data);
  } catch (e) {
    res.send("Error - " + e);
  }
};

exports.createProject = async (req, res) => {
  let add = new projects(req.body);
  let result = await add.save();
  res.send(result);
};
exports.updateProject = async (req, res) => {
  const result = await projects.updateOne(
    { _id: req.params.id },

    { $set: req.body }
  );
  res.send(result);
  console.log(req.params.id);
};
