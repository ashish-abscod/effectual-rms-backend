const CommentsModel = require("../models/Comments.model");
const ObjectID = require("bson-objectid");

exports.createComment = async(req,res) => {
    const data = new CommentsModel({
        commentId : ObjectID(),
        projectId : req.body.projectId,
        comment: req.body.content,
        time : req.body.time,
        userName : req.body.userName,
        userRole : req.body.userRole
    })
    
    try {
        const result = await data.save();
        res.json({result, msg: "Successfully posted comment.", status: "success"})
    }
    catch (error) {
        res.status(400).json({msg : "Sorry, something went wrong. Comment posting failed!" , status: "failed" })
    }

}
