const bcrypt = require("bcryptjs");
const usersModel = require("../models/Users.model");
const { cloudinary } = require("./Files.controller");
const jwt = require("jsonwebtoken");

exports.createUser = async (req, res) => {
  try {
    const uploadResponse = await cloudinary.uploader.upload(req.body.picture, {
      upload_preset: "attachments",
    });

    const data = usersModel({
      password: req.body.password,
      name: req.body.name,
      email: req.body.email,
      role: req.body.role,
      status: req.body.status,
      picture: uploadResponse.secure_url,
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
  let item = await usersModel.find();
  if (item.length > 0) {
    res.send(item);
  } else {
    res.send({ result: "data not found" });
  }
};

exports.deleteUser = async (req, res) => {
  const result = await usersModel.updateOne(
    { _id: req.params.id },

    { $set: { status: "Inactive" } }
  );
  res.send(result);
  console.log(req.params.id);
};

exports.SearchUser = async (req, res) => {
  let result = await usersModel.find({
    $or: [{ name: { $regex: req.params.key } }],
  });
  res.send(result);
};

exports.getUserName = async (req, res) => {
  let item = await usersModel.find({}, { name: 1, _id: 0 });
  if (item.length > 0) {
    res.send(item);
  } else {
    res.send({ result: "data not found" });
  }
};

exports.updateUser = async (req, res) => {
  let result = await usersModel.updateOne(
    { _id: req.params.id },
    { $set: req.body }
  );
  res.send(result);
};

exports.getForgotPassWord = async (req, res) => {};

exports.postCreatePassWord = async (req, res) => {
  const { email } = req.body;

  if (email !== usersModel.email) {
  }
};

exports.getCreatedPassword = async (req, res) => {};

exports.postResetPassWord = async (req, res) => {};
