const { User, validate } = require("../models/users.model");
const express = require("express");
const Token = require("../models/Token.model");
const {sendEmail,forgotPassword,resetPassword} = require("../controllers/nodemailer.controller");
const crypto = require("crypto");
const Joi = require("joi");
const router = express.Router();

router.post("/", async (req, res) => {
    try {
        const { error } = validate(req.body);
        if (error) return res.status(400).send(error.details[0].message);

        const user = await new User(req.body).save();

        res.send(user);
    } catch (error) {
        res.send("An error occured");
        console.log(error);
    }
});

router.put("/create_password",forgotPassword)
router.post("/reset_password/:userId/:token",resetPassword)



module.exports = router;