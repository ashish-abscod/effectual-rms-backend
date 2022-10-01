const nodemailer = require("nodemailer");
const jwt = require("jsonwebtoken");
const { User, validate } = require("../models/users.model");
const express = require("express");
const Token = require("../models/Token.model");
const crypto = require("crypto");
const Joi = require("joi");
require("dotenv").config({ path: "../.env" });

const sendEmail = async (email, subject, text) => {
  try {
    const transporter = nodemailer.createTransport({
      host: process.env.HOST,
      port: 465,
      maxConnections: 1000,
      secure: true,
      auth: {
        user: process.env.USER,
        pass: process.env.PASS,
      },
      tls: {
        rejectUnauthorized: false,
      },
    });

    await transporter.sendMail({
      from: process.env.USER,
      to: "faiz@globallegalassociation.org",
      subject: "Get this otp",
      text: "please reset your password",
    });

    console.log("email sent sucessfully");
  } catch (error) {
    console.log(error, "email not sent");
  }
};

exports.forgotPassword = async (req, res) => {
  try {
    Joi.object({ email: Joi.string().email().required() });
    const { error } = validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    const user = await User.findOne({ email: req.body.email });
    if (!user)
      return res.status(400).send("user with given email doesn't exist");

    let token = await Token.findOne({ userId: user._id });
    if (!token) {
      const token = await jwt.sign(
        { _id: user._id.toString() }, //payload
        process.env.SUPER_SECRET_KEY
      );
      res.json({ Message: "token generated Successfully!", token, code: 200 });
      console.log(token);
      user.password = undefined;
    }

    try {
      const max = 100;
      const min = 1000;
      const otp = Math.floor(Math.random() * (max - min) + min);
      await sendEmail(user.email, "Password reset", otp);
      res.send("password reset otp sent to your email account");
    } catch (error) {
      console.log(error);
    }
  } catch (error) {
    res.send("An error occured");
    console.log(error);
  }
};

exports.resetPassword = async (req, res) => {
  try {
    Joi.object({ password: Joi.string().required() });
    const { error } = validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    const user = await User.findById(req.params.userId);
    if (!user) return res.status(400).send("invalid otp or expired");

    const token = await Token.findOne({
      userId: user._id,
      token: req.params.token,
    });
    if (!token) return res.status(400).send("Invalid otp or expired");

    user.password = req.body.password;
    await user.save();
    await token.delete();

    res.send("password reset sucessfully.");
  } catch (error) {
    res.send("An error occured");
    console.log(error);
  }
};
