const jwt = require("jsonwebtoken");
const usersModel = require("../models/User.model");
const bcrypt = require("bcryptjs")
require("dotenv").config({ path: "../.env" });

exports.signIn = async (req, res) => {
  try {
    const user = await usersModel.findOne({ email: req.body.email });
    if (!user)
      return res.status(400).json({ msg: "Invalid user email", status : "failed"});

      const comparePassword = await bcrypt.compare(
        req.body.password,
        user.password
      );
      if (!comparePassword)
      return res
        .status(400)
        .json({ error: "invalid password", data: null, code: 404 });


    const token = await jwt.sign(
      { _id: user._id.toString() }, //payload
      process.env.SUPER_SECRET_KEY
    );

    user.password = undefined;
    res.json({ msg: "You have logged in successfully!", user, token, status : "success"});
  } catch (error) {
    console.log("Error:", error);
    res.json({ msg: "Sorry, You can not logged in to this account,please check your credentials", status :"failed" });
  }
};
