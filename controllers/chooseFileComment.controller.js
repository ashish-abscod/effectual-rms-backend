const { cloudinary } = require("./Files.controller");
const commentAttachmentModel = require("../models/chooseFile.comment");

exports.createFile = async (req, res) => {
  try {
    const uploadResponse = await cloudinary.uploader.upload(req.body.file, {
      resource_type: "raw",
      upload_preset: "attachments",
    });
    const url = uploadResponse.secure_url;
    res.json({ data: url, err: null, code: 200 });
  } catch (error) {
    console.log("error: ", error);
    res.json({ error: error, data: null, code: 500 });
  }
};



exports.saveFile = async (req,res) => {
  try {
    let add = new commentAttachmentModel(req.body);
  let result = await add.save();
  res.send(result);
  }
  catch(error){
   console.log(error)
  }
}


exports.getFiles = async(req,res) => {
  try {
    const data = await commentAttachmentModel.findOne({ commentId: req.params.id});
    res.json(data);
  } catch (error) {
    res.send(error);
  }
}