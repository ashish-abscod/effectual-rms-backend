const commentModel = require('../models/Comments.model');
require('../models/Replies.model');

exports.getDiscussion = async (req, res) => {
  try {
    const data = await commentModel.find({ projectId: req.params.projectId }).populate({
      path: "replies",
      //deep population for replie attachments
      populate: {
        path: "attachments",
      },
    }).populate(
      {
        //populating comment attachments
        path: "attachments"
      }
    );
    res.json(data);
  } catch (e) {
    res.send("Error - " + e);
  }
}
// exports.getDiscussion = async (req, res) => {
//     try {
//         const data = await RepliesModel.find({projectId : req.params.projectId})
//         res.json(data);
//       } catch (e) {
//         res.send("Error - " + e);
//       }
// }
