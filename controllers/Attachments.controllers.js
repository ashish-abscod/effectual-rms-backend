const { cloudinary } = require("./Files.controller");
const AttachmentModel = require("../models/Attachments.model");

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

