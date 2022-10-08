const ReplieModel = require("../models/Replies.model")
const ObjectID = require("bson-objectid");

exports.createReplie = async(req,res) => {
    const data = new ReplieModel({
        replieId : ObjectID(),
        commentId : req.body.commentId,
        projectId : req.body.projectId,
        replie: req.body.content,
        time : req.body.time,
        userName : req.body.userName,
        userRole : req.body.userRole
    })

    try {
        const result = await data.save();
        res.status(200).json({result, msg:"Successfully posted replie!", status:"success"})
    }
    catch (error) {
        res.status(400).json({error, msg:"Sorry, Something went wrong. Replie posting failed.", status:"failed"})
    }

}
