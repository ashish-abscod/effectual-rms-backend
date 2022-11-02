const { cloudinary } = require("./Files.controller");
const commentAttachmentModel = require("../models/CommentAttachments.model");
const attachmentModel = require("../models/Attachments.model")
const replyAttachmentModel = require("../models/ReplieAttachments.model")

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
    let url = uploadResponse.secure_url;
    //this below code will add a cloudinary flag=> fl_attachement for download the file instead of opening in web.
    const index =  parseInt(url.indexOf('/upload/')) + 8;
    url = url.slice(0, index) + 'fl_attachment/' + url.slice(index);
    
    res.json({ url, msg: "File has been uploaded successfully", status: "success" });
  } catch (error) {
    res.json({ error, code: 500, msg: "Sorry, File uploadation is failed!", status: "failed" });
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

exports.getFilesOfEffectual = async (req, res) => {
  try {

    const commentEffectualAdmin = await commentAttachmentModel.
      find({ projectId: req.params.projectId, role: { $in: ["Manager", "Effectual Admin"] } })
    const effectualAdmin = await attachmentModel.
      find({ projectId: req.params.projectId, role: { $in: ["Manager", "Effectual Admin"] } })
    const replyEffectualAdmin = await replyAttachmentModel.
      find({ projectId: req.params.projectId, role: { $in: ["Manager", "Effectual Admin"] } })
    const result = [].concat(commentEffectualAdmin, effectualAdmin, replyEffectualAdmin)
    res.json({ result })
  }
  catch (error) {
    res.send(error);
  }
};

exports.getFilesOfClient = async (req, res) => {
  try {
    const commentEffectualClient = await commentAttachmentModel.
      find({ projectId: req.params.projectId, role: { $in: ["Patent Expert", "Searcher", "Client Admin", "Technical Expert"] } })
    const effectualClient = await attachmentModel.
      find({ projectId: req.params.projectId, role: { $in: ["Patent Expert", "Searcher", "Client Admin", "Technical Expert"] } })
    const replyEffectualClient = await replyAttachmentModel.
      find({ projectId: req.params.projectId, role: { $in: ["Patent Expert", "Searcher", "Client Admin", "Technical Expert"] } })
    const result = [].concat(commentEffectualClient, effectualClient, replyEffectualClient)
    res.json({ result })
  } catch (error) {
    res.send(error);
  }
};





