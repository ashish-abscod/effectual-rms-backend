const CommentsModel = require("../models/Comments.model");
const ObjectID = require("bson-objectid");
const date = require('date-and-time');

exports.createComment = async(req,res) => {
    const now = new Date();
    const data = new CommentsModel({
        commentId : ObjectID(),
        projectId : req.body.projectId,
        comment: req.body.content,
        time : date.format(now, "YYYY-MM-DD HH:mm:ss"),
        userName : req.body.userName,
        userRole : req.body.userRole
    })
    
    try {
        const result = await data.save();
        res.json({...result._doc, msg: "Successfully posted comment.", status: "success"})
    }
    catch (error) {
        res.status(400).json({msg : "Sorry, something went wrong. Comment posting failed!" , status: "failed" })
    }

}
