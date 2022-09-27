const CommentsModel = require("../models/Comments.model");

exports.createComment = async(req,res) => {
    const data = new CommentsModel({
        projectId : req.body.projectId,
        comment: req.body.content,
        time : req.body.time,
        userName : req.body.userName,
        userRole : req.body.userRole
    })
    
    try {
        const result = await data.save();
        res.status(200).json(result)
    }
    catch (error) {
        res.status(400).json({message: error.message})
    }

}