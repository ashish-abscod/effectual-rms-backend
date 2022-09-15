require("dotenv").config({ path: "../.env" });
const users = require("../models/users.model");
const jwt = require("jsonwebtoken");

//authentication for protected routes

const authentication = async (req, res, next) => {
  try {
    const Token = req.header("Authorization");
    const token = Token?.slice(7);

    if (!token) {
      res.json({ Message : "No Token Provided" , code: 403 });
    }

    try {
      await jwt.verify(token, process.env.SUPER_SECRET_KEY);
      next();
    } catch (e) {
      res.json({ Message: "Unauthorized Token Provided", code : 401 })
    }
  }
  catch (error) {
    console.log("error: ", error);
    res.json({ Message: "Something went wrong", code: 404 });
  }
};

module.exports = authentication;