const { cloudinary } = require("./Files.controller");
const replyAttachmentModel = require("../models/ReplieAttachments.model");

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
  }
};

exports.saveFile = async (req, res) => {
  try {
    let add = new replyAttachmentModel(req.body);
    let result = await add.save();
    res.json({ result, status: "success" });
  }
  catch (error) {
    res.json({ error, status: "failed" });
  }
}


exports.getFiles = async (req, res) => {
  try {
    const data = await replyAttachmentModel.find({ commentId: req.params.id });
    res.json(data);
  } catch (error) {
    res.send(error);
  }
}

