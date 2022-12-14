const { cloudinary } = require("./Files.controller");
const commentAttachmentModel = require("../models/CommentAttachments.model");
const attachmentModel = require("../models/Attachments.model")
const replyAttachmentModel = require("../models/ReplieAttachments.model")
const commentAttachments = require('./comment_attachments.json');
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
    
    res.json({ url, msg: "File has been uploaded successfully", status: "success" });
  } catch (error) {
    res.json({ error, code: 500, msg: "Sorry, File uploadation is failed!", status: "failed" });
  }
};

exports.saveFile = async (req, res) => {
  try {
    const now = new Date();
    let add = new commentAttachmentModel({...req.body, createdAt: date.format(now, "YYYY-MM-DD HH:mm:ss")});
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
      find({ projectId: req.params.projectId,})
    const effectualAdmin = await attachmentModel.
      find({ projectId: req.params.projectId,})
    const replyEffectualAdmin = await replyAttachmentModel.
      find({ projectId: req.params.projectId,})
    const result = [].concat(commentEffectualAdmin, effectualAdmin, replyEffectualAdmin)
    res.json({ result })
  }
  catch (error) {
    res.send(error);
  }
};

// exports.getFilesOfEffectual = async (req, res) => {
//   try {

//     const commentEffectualAdmin = await commentAttachmentModel.
//       find({ projectId: req.params.projectId, role: { $in: ["Manager","Searcher","Effectual Admin"] } })
//     const effectualAdmin = await attachmentModel.
//       find({ projectId: req.params.projectId, role: { $in: ["Manager","Searcher","Effectual Admin"] } })
//     const replyEffectualAdmin = await replyAttachmentModel.
//       find({ projectId: req.params.projectId, role: { $in: ["Manager","Searcher","Effectual Admin"] } })
//     const result = [].concat(commentEffectualAdmin, effectualAdmin, replyEffectualAdmin)
//     res.json({ result })
//   }
//   catch (error) {
//     res.send(error);
//   }
// };

exports.getFilesOfClient = async (req, res) => {
  try {
    const commentEffectualClient = await commentAttachmentModel.
      find({ projectId: req.params.projectId, role: { $in: ["Patent Expert", "Client Admin", "Technical Expert"] } })
    const effectualClient = await attachmentModel.
      find({ projectId: req.params.projectId, role: { $in: ["Patent Expert", "Client Admin", "Technical Expert"] } })
    const replyEffectualClient = await replyAttachmentModel.
      find({ projectId: req.params.projectId, role: { $in: ["Patent Expert", "Client Admin", "Technical Expert"] } })
    const result = [].concat(commentEffectualClient, effectualClient, replyEffectualClient);
    res.json({ result })
  } catch (error) {
    res.send(error);
  }
};


exports.migrateCommentAttachments = async (req, res) =>{
  try {
    const resultAttachments = commentAttachments.map( async (data)=>{
  
      const res = await commentAttachmentModel.findOneAndUpdate(
        { projectId: data?.projectId},
        { $push: { files: {url:data?.path, filename: data?.label} }, projectId: data?.projectId, uploadedBy : data?.username, createdAt:data?.uploaddate, commentId: data?.commentid},
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