const { cloudinary } = require("./Files.controller");
const replyAttachmentModel = require("../models/ReplieAttachments.model");

exports.createFile = async (req, res) => {
  try {
    const uploadResponse = await cloudinary.uploader.upload(req.body.file, {
      resource_type: "raw",
      upload_preset: "attachments",
    });
    const url = uploadResponse.secure_url;
    res.json({ data: url, err: null, code: 200,message:"Successfully uploaded file!",status:"success"});
  } catch (error) {
    console.log("error: ", error);
    res.json({ error: error, data: null, code: 500,message:"file uploadation unsuccessful!",status:"unsuccessfull" });
  }
};


exports.saveFile = async (req,res) => {
  try {
  let add = new replyAttachmentModel(req.body);
  let result = await add.save();
  res.send(result);
  }
  catch(error){
   console.log(error)
  }
}


exports.getFiles = async(req,res) => {
  try {
    const data = await replyAttachmentModel.find({ commentId: req.params.id});
    res.json(data);
  } catch (error) {
    res.send(error);
  }
}