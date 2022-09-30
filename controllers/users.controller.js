const bcrypt = require("bcryptjs");
const { User } = require("../models/users.model");
// const { cloudinary } = require("./Files.controller");
const jwt = require("jsonwebtoken");

exports.createUser = async (req, res) => {
  try {
    // const uploadResponse = await cloudinary.uploader.upload(req.body.picture, {
    //   upload_preset: "attachments",
    // });

    const data = User({
      password: req.body.password,
      name: req.body.name,
      email: req.body.email,
      role: req.body.role,
      status: req.body.status,
      // picture: uploadResponse.secure_url,
    });
    try {
      await data.save();
      res.json({ data: data, err: null, code: 200 });
    } catch (error) {
      console.log("error: ", error);
      res.json({ error: error, data: null, code: 403 });
    }
  } catch (error) {
    console.log("error: ", error);
    res.json({ error: error, data: null, code: 500 });
  }
};

exports.getUsers = async (req, res) => {
  let item = await User.find();
  if (item.length > 0) {
    res.send(item);
  } else {
    res.send({ result: "data not found" });
  }
};

exports.getUsersById = async (req, res) => {
  const result = await User.findOne({ _id: req.params.id });
  if (result) {
    res.send(result);
  } else {
    res.send({ result: "data not found" });
  }
};

exports.deleteUser = async (req, res) => {
  const result = await User.updateOne(
    { _id: req.params.id },

    { $set: { status: false } }
  );
  res.send(result);
};

exports.SearchUser = async (req, res) => {
  let result = await User.find({
    $or: [{ name: { $regex: req.params.key }}],
  },{password:0,status:0});
  res.send(result);
};
exports.updateUser = async (req, res) => {
  try {
    const _id = req.params.id;
    const updatedData = req.body;
    const result = await User.findByIdAndUpdate(_id, updatedData);

    res.send(result);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
