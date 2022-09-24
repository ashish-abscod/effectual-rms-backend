const jwt = require("jsonwebtoken");
const { User } = require("../models/users.model");
require("dotenv").config({ path: "../.env" });

exports.signIn = async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    if (!user)
      return res.status(400).json({ Message: "Invalid User", code: 404 });

    if (user.password !== req.body.password)
      return res.status(400).json({ Message: "Invalid Password", code: 404 });

    const token = await jwt.sign(
      { _id: user._id.toString() }, //payload
      process.env.SUPER_SECRET_KEY
    );

    user.password = undefined;
    res.json({ Message: "Login Successfully!", user, token, code: 200 });
  } catch (error) {
    console.log("Error:", error);
    res.json({ Message: "Something went wrong", code: 500 });
  }
};
