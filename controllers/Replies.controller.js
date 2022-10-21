const ReplieModel = require("../models/Replies.model")
const ObjectID = require("bson-objectid");
const date = require('date-and-time');

exports.createReplie = async(req,res) => {
    const now = new Date();
    const data = new ReplieModel({
        replieId : ObjectID(),
        commentId : req.body.commentId,
        projectId : req.body.projectId,
        replie: req.body.content,
        time : date.format(now, "YYYY-MM-DD HH:mm:ss"),
        userName : req.body.userName,
        userRole : req.body.userRole
    })

    try {
        const result = await data.save();
        res.status(200).json({...result._doc, msg:"Reply Posted Successfully!", status:"success"})
    }
    catch (error) {
        res.status(400).json({error, msg:"Sorry, Reply Failed to Post!", status:"failed"})
    }

}
