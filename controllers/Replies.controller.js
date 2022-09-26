const ReplieModel = require("../models/Replies.model")

exports.createReplie = async(req,res) => {
    const data = new ReplieModel({
        commentId : req.body.commentId,
        projectId : req.body.projectId,
        replie: req.body.content,
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
