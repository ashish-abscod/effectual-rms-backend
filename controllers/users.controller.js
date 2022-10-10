const usersModel = require("../models/users.model");

exports.createUser = async (req, res) => {
  try {
    const data = usersModel({
      password: req.body.password,
      name: req.body.name,
      email: req.body.email,
      role: req.body.role,
      status: req.body.status,
    });
    await data.save();
    res.json({msg: "Successfully registered user", status: "success" });
  }
  catch (error) {
    console.log("error: ", error);
    res.json({ error, msg: "Sorry, User was not regiestered. Something went wrong. ", status: "failed" });
  }
};

exports.getUsers = async (req, res) => {
  let item = await usersModel.find();
  if (item.length > 0) {
    res.send(item);
  } else {
    res.send({ result: "Data not found!" });
  }
};

exports.getUsersById = async (req, res) => {
  const result = await usersModel.findOne({ _id: req.params.id });
  if (result) {
    res.send(result);
  } else {
    res.send({ result: "Data not found!" });
  }
};

exports.deleteUser = async (req, res) => {
  try {
    await usersModel.updateOne(
      { _id: req.params.id },

      { $set: { status: false } }
    );
    res.json({ msg: "Successfully deleted user!", status: "success" });
  } catch {
    res.json({ msg: "Sorry, User was not deleted!", status: "failed" });
  }
};

exports.SearchUser = async (req, res) => {
  let result = await usersModel.find({
    $or: [{ name: { $regex: req.params.key ,$options: "i"}}],
  },{password:0,status:0});
  res.send(result);
};


exports.updateUser = async (req, res) => {
  try {
    console.log(req.body);
    console.log(req.params.id)

    const _id = req.params.id;

    const userData = {
      name : req.body.name,
      email : req.body.email,
      password : req.body.password
    };
    const option = { new: true }
    // const result = await usersModel.findByIdAndUpdate(_id, userData, option);
    // console.log(result);
    res.json({ result, msg: "Successfully updated profile!", status: "success" });
  } catch (error) {
    res.status(400).json({ msg : "Sorry, profile was not updated.", status: "failed" });
  }
};
