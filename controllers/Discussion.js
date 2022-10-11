const commentModel = require("../models/Comments.model");
require("../models/Replies.model");

exports.getDiscussion = async (req, res) => {
  try {
    const data = await commentModel.find({ projectId: req.params.projectId })
      .sort({"time":"desc"})
      .populate({
        path: "replies",
        //deep population for replie attachments
        populate: {
          path: "attachments",
        }
      })
      .populate({
        //populating comment attachments
        path: "attachments",
      });
    res.json(data);
  } catch (e) {
    res.send("Error - " + e);
  }
};

exports.getFilesByRole = async (req, res) => {
 
  try {
      const effectualAdmin = await commentAttachmentModel.find({projectId: req.params.id})
      res.json(effectualAdmin);
      res.json({error})
    } catch (error) {
    res.send(error);
  }
};

// exports.getDiscussion = async (req, res) => {
//     try {
//         const data = await RepliesModel.find({projectId : req.params.projectId})
//         res.json(data);
//       } catch (e) {
//         res.send("Error - " + e);
//       }
// }
