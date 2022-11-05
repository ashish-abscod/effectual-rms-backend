const { sendEmail } = require("../utils/SendEmail");

exports.contactUs = async (req, res) => {
    try {
        const message = `
        <h2>Dear user,</h2>
        <h4>${req.body?.name} trying to contact you, with email: <a href="mailto:${req.body?.email}">${req.body?.email}</a></h4>
        <h4>Their message:</h4>
        <p>${req.body?.message}</p>`
    
        const result = await sendEmail("ashish.sharma@abscod.com", req.body?.subject, message);
        if(result === true) res.json({msg:"Email has been successully sent. Thank You.", status:"success"});
        else res.json({msg:"Sorry, Email has not sent. Try again after some time.", status:"failed"});
    } catch (error) {
        res.json({msg:"Something went wrong. Email has not sent.", status:"failed"})
    }

}