require("dotenv").config({ path: "../.env" });
const bcrypt = require('bcrypt');
const randomString = require("randomstring");
const usersModel = require("../models/User.model");
const tokenModel = require("../models/Token.model");
const { validateEmail, validatePassword } = require('../utils/ValidateUser.utils');
const { sendEmail } = require('../utils/SendEmail');
const mongoose = require("mongoose");

exports.forgotPassword = async (req, res) => {
    try {
        const { error } = validateEmail(req.body);
        if (error) return res.json({ mssg: error.details[0].msg, status: "failed" });

        const user = await usersModel.findOne({ email: req.body.email }, { password: 0 });
        if (!user)
            return res.json({ mssg: "User with given email doesn't exist", status: "failed" });

        //delete tokens if already existed for the requested user.
        let token = await tokenModel.findOne({ userId: user._id });
        if (token) await tokenModel.deleteMany();

        //generating a token and saving hash of it in db however passing plain resettoken in email
        let resetToken = randomString.generate({ length: 32, charset: 'alphanumeric' });
        const tokenHash = await bcrypt.hash(resetToken, 10);
        await tokenModel({ userId: user?._id, token: tokenHash }).save(function (err) {
            if (err) {
                return res.json({ mssg: "Token not saved error.", status: "failed" });
            }
        });

        const link = `${process.env.CLIENT_URL}/passwordReset/${resetToken}/${user._id}`;
        const subject = "Password reset request for Effectual RMS ."
        const text = `<h3 style="text-align:center;color:blue">Effectual RMS Team</h3>
        <h6>Dear ${user?.name}</h6>
        <a href='${link}' style="font-size:20px;">Reset Password</a><br><br> 
        <p>We have got a password reset request for your Effectual RMS account.If you have not requested please ignore this email,
        otherwise click on above link to reset your password. If you are not able to click on it please copy below link and paste it in your browser. </p>
        ${link} <br><br>
        <b>Thank you.</b><br><b>Team RMS</b>`

        const mssg = await sendEmail(user?.email, subject, text);
        if (mssg)
            return res.json({ mssg: "Successfully Sent Email. Kindly check your email inbox or spam folder to reset your password.", status: "success" });
        else
            return res.json({ mssg: "Sorry, Email not sent due to server error.", status: "failed" });
    }
    catch (error) {
        res.json({ mssg: "Something went wrong.", status: "failed" });
    }
}


exports.resetPassword = async (req, res) => {
    try {
        const { error } = validatePassword(req.body);
        if (error) return res.json(error.details[0].msg);

        // return true if userId is valid mongoose objectId else false
        if (mongoose.isValidObjectId(req.params.userId)) {
            const passwordResetToken = await tokenModel.findOne({ userId: req.params.userId });
            if (!passwordResetToken) return res.json({ mssg: "Invalid or expired password reset token", status: "failed" });

            //comparing token we got with its hash in db.
            const isValid = await bcrypt.compare(req.params.token, passwordResetToken.token);
            if (!isValid) return res.json({ mssg: "Invalid or expired password reset token", status: "failed" });

            await usersModel.findByIdAndUpdate(req.params.userId, { $set: { password: req.body.password } });
            await tokenModel.findOneAndDelete({ userId: req.params.userId });
            return res.json({ mssg: "Password Reset Sucessfully.", status: "success" });
        }else{
            return res.json({mssg: "Bad Request" , status : "failed"});
        }
    } catch (error) {
        console.log(error);
        return res.json({ mssg: "Something went wrong.", status: "failed" });
    }
}