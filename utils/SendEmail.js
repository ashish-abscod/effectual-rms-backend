const nodemailer = require("nodemailer");


exports.sendEmail = async (userEmail, subject, text) => {
    try {
        const transporter = nodemailer.createTransport({
            host: process.env.HOST,
            port: 465,
            secure: true,
            service: "gmail",
            auth: {
                user: process.env.USER,
                pass: process.env.PASS,
            },
            tls: {
                rejectUnauthorized: false,
            }
        });
        
        await transporter.sendMail({
            from: process.env.USER,
            to: userEmail,
            subject: subject,
            html: text
        });
        return true;
    } catch (error) {
        return ({mssg :"email not sent", status:"failed", detail: error});
    }
};