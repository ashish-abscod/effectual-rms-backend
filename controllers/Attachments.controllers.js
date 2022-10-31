const { cloudinary } = require("./Files.controller");
const AttachmentModel = require("../models/Attachments.model");
const { sendMultipleEmail } = require('../utils/SendEmail');
const usersModel = require("../models/User.model");
const projectModel = require("../models/Projects.model")
const assignedUserModel = require("../models/AssignedUsers.model")

exports.createFile = async (req, res) => {
  try {
    const uniqueNumber = Math.floor(Date.now() * Math.random());
    const uniqueFileName = `${uniqueNumber}_${req.body.filename}`;
    const uploadResponse = await cloudinary.uploader.upload(req.body.file, {
      public_id: uniqueFileName,
      use_filename: true,
      unique_filename: true,
      overwrite: false,
      resource_type: "auto",
      upload_preset: "attachments",
    });
    const url = uploadResponse.secure_url;
    res.json({ url, msg: "File has been uploaded successfully!", status: "success" });
  } catch (error) {
    res.json({ error, msg: "Sorry, File uploadation is failed!", status: "failed" });
    console.log(error)
  }
};

exports.saveFile = async (req, res) => {
  try {
    let add = new AttachmentModel(req.body);
    let result = await add.save();
    res.send(result);
  }
  catch (error) {
    console.log(error)
  }
}

exports.getFiles = async (req, res) => {
  try {
    const data = await AttachmentModel.findOne({ projectId: req.params.id });
    res.json(data);
  } catch (error) {
    res.send(error);
  }
}


exports.updateStatus = async (req, res) => {
  try {
    const result = await projectModel.findOneAndUpdate(
      { projectId: req.params.id },
      {
        status: req.body.status,
      }, {
      new: true
    }
    );
    res.json({msg: "Report status has been successfully updated!", status: "success" });
  } catch (error) {
    res.json({ error, msg: "Sorry, report updation is failed!", status: "failed" });
    console.log(error)
  }
}



exports.uploadReportAndSendEmails = async (req, res) => {
  try {
    const uniqueNumber = Math.floor(Date.now() * Math.random());
    const uniqueFileName = `${uniqueNumber}_${req.body.filename}`;
    const uploadResponse = await cloudinary.uploader.upload(req.body.file, {
      public_id: uniqueFileName,
      use_filename: true,
      unique_filename: true,
      overwrite: false,
      resource_type: "auto",
      upload_preset: "attachments",
    });
    const url = uploadResponse.secure_url;
    let add = new AttachmentModel({
      files: url,
      role : req.body.role,
      uploadedBy : req.body.uploadedBy,
      projectId : req.body.projectId
    });
    await add.save();

    //finding effecutal user email ids for sending mail
    const effectualUser = await usersModel.find({ role: { $in: ["Effectual Admin"] } }, { email: 1, _id: 0 });
    const effectualUserEmails = effectualUser.map(item => item.email);
    
    //finding all user assigned in the project
    const assignedUser = await assignedUserModel.find({ projectId: req.body.projectId }, { userId: 1, _id: 0 });
    //extracting email ids of client users
    const clientEmails = assignedUser[0]?.userId.map(item => (item.email));
    
    //finding all projectdetails with the projectId
    let projectDetails = await projectModel.find({ projectId: req.body.projectId });
    projectDetails = projectDetails[0];

    if (!effectualUserEmails && !clientEmails)
      return res.json({ mssg: "There are no users to send mail!", status: "failed" });
      
    const subject = "Effectual RMS - New Project has been created!"
    const text = `
        <h3 style="text-align:center;color:blue">New Project has been created with following details: </h3>
        <p>Project information : ${projectDetails?.projectName} </p>
        <p>Search Object : ${projectDetails?.searchObject} </p>
        <p>Technical field : ${projectDetails?.technicalField} </p>
        <p>Claims to be searched : ${projectDetails?.claims} </p>
        <p>Requirement for delivery : ${projectDetails?.deliveryDate} </p>
        <p>Prior Art Cut-off-date : ${projectDetails?.priorArtDate} </p>
        <p>Standard related  : ${projectDetails?.standard} </p>
        <p>SSO needed: ${projectDetails?.sso} </p>
        <p>US IPR special:${projectDetails?.usipr} </p>
        <p>Useful information for search : ${projectDetails?.info} </p>
        <p>Attachments :<a href='${url}' style="font-size:12px;">${req.body.filename}</a></p><br>
        <p>${req?.body?.emailContent}</p><br>
        <p>The details can be accessed using the following link. The details can be accessed using the following link <br><br>
        <a href='https://effectual_rms.com' style="font-size:12px;"> Effectual RMS</a>
        </p><br><br> 
        <h4>Thanks</h4><br><h4>Effectual Team</h4>`

    const recipients = effectualUserEmails.concat(clientEmails);
    // const result = await sendMultipleEmail(recipients, subject, text);
    const result = true;
    if(result) return res.json({msg: "Email has been sent successfully!", status: "success" });
    return res.json({result});
  } catch (error) {
    res.json({ msg: "Server Error, Could not upload report.", status: "failed" , error});
  }
}
