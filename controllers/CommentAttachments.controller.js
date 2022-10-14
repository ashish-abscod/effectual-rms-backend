const { cloudinary } = require("./Files.controller");
const commentAttachmentModel = require("../models/CommentAttachments.model");

exports.createFile = async (req, res) => {
  try {
    const uploadResponse = await cloudinary.uploader.upload(req.body.file, {
      use_filename :true,
      resource_type: "raw",
      upload_preset: "attachments",
    });
    const url = uploadResponse.secure_url;
    res.json({ url, msg:"Successfully uploaded file!",status:"success" });
  } catch (error) {
    res.json({ error, code: 500, msg:"Sorry, File uploadation failed!",status:"failed"});
  }
};

exports.saveFile = async (req, res) => {
  try {
    let add = new commentAttachmentModel(req.body);
    let result = await add.save();
    res.send(result);
  } catch (error) {
    console.log(error);
  }
};

exports.getFiles = async (req, res) => {
  try {
    const data = await commentAttachmentModel.find({
      projectId: req.params.id,
    });
    res.json(data);
  } catch (error) {
    res.send(error);
  }
};




