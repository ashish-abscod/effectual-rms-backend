const { cloudinary } = require("./Files.controller");
const replyAttachmentModel = require("../models/ReplieAttachments.model");
const replyAttachments = require('./reply_attachments.json');
const date = require('date-and-time');

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
    
    res.json({ url, msg: "File has been uploaded successfully!", status: "success" });
  } catch (error) {
    res.json({ error, msg: "Sorry, File uploadation is failed!", status: "failed" });
  }
};

exports.saveFile = async (req, res) => {
  try {
    const now = new Date();
    let add = new replyAttachmentModel({...req.body, createdAt: date.format(now, "YYYY-MM-DD HH:mm:ss")});
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


exports.migrateReplyAttachments = async (req, res) =>{
  try {
    const resultAttachments = replyAttachments.map( async (data)=>{
  
      const res = await replyAttachmentModel.findOneAndUpdate(
        { projectId: data?.projectId},
        { $push: { files: {url:data?.path, filename: data?.label} }, projectId: data?.projectId, uploadedBy : data?.username, createdAt:data?.uploaddate, replieId: data?.replyid},
        {
          upsert: true,
          new: true,
          setDefaultsOnInsert: true,
        });
  
      return res;
    })
    
    // let promiseArray;
    const main = async () => {
      const promiseArray = await Promise.all(resultAttachments);
      res.json(promiseArray);
    };
    main();

  } catch (error) {
    res.send(error);
  }
}
