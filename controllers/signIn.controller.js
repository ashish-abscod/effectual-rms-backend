const jwt = require("jsonwebtoken");
const usersModel = require("../models/users.model");
require("dotenv").config({ path: "../.env" });

exports.signIn = async (req, res) => {
  try {
    const user = await usersModel.findOne({ email: req.body.email });
    if (!user)
      return res.status(400).json({ msg: "Invalid user email", status : "failed"});

    if (user.password !== req.body.password)
      return res.status(400).json({ msg: "Invalid Password", status :"failed" });

    const token = await jwt.sign(
      { _id: user._id.toString() }, //payload
      process.env.SUPER_SECRET_KEY
    );

    user.password = undefined;
    res.json({ msg: "Successfully login!", user, token, status : "success"});
  } catch (error) {
    console.log("Error:", error);
    res.json({ msg: "Something went wrong", status :"failed" });
  }
};
