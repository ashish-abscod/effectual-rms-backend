const usersModel = require("../models/User.model");
const {validateUser } = require("../utils/ValidateUser.utils");
const bcrypt = require("bcryptjs")

exports.createUser = async (req, res) => {
  try {

    const isExist = await usersModel.findOne({ email: req.body.email });
    if (isExist) {
      return res.status(400).json({
        error: "user already exist",
        data: null,
        code: 400,
      });
    }

    const newUser = usersModel({
      password: req.body.password,
      name: req.body.name,
      email: req.body.email,
      role: req.body.role,
      status: req.body.status,
    });
    const salt = await bcrypt.genSalt();
    const hashedPssword = await bcrypt.hash(newUser.password, salt);
    newUser.password = hashedPssword;
    await newUser.save();
    newUser.password = undefined;
    res.json({ newUser, msg: "User has been created successfully", status: "success" });
  }
  catch (error) {
    res.json({ error, msg: "Sorry, user creation is failed ", status: "failed" });
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
    res.json({ msg: "User has been removed successfully!", status: "success" });
  } catch {
    res.json({ msg: "Sorry, We could not removed the user. Try Again!", status: "failed" });
  }
};

exports.SearchUser = async (req, res) => {
  let result = await usersModel.find({
    $or: [{ name: { $regex: req.params.key, $options: "i" } }],
  }, { password: 0, status: 0 });
  res.send(result);
};


exports.updateUser = async (req, res) => {
  try {
    const { error } = validateUser(req.body);
    if (error) return res.json({msg:error.details[0].message, status:"failed"});

    const _id = req.params.id;
    const option = { new: true}
    let result = await usersModel.findByIdAndUpdate(_id, req.body, option);
    result.password = null;
    res.json({ result, msg: "Profile updated successfully!", status: "success" });
  } catch (error) {
    res.json({ msg : "Sorry, we could not update your profile!", status: "failed" });
  }
};
