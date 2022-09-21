const commentModel = require('../models/Comments.model');

exports.getDiscussion = async (req, res) => {
    try {
        const data = await commentModel.find({projectId : req.params.projectId}).populate({
          path: "myReplies",
        });
        res.json(data);
      } catch (e) {
        res.send("Error - " + e);
      }
}