const CommentsModel = require("../models/Comments.model");

exports.createComment = async(req,res) => {
    try {
        const data = new CommentsModel(req.body)
        const result = await data.save();
        res.status(200).json(result)
    }
    catch (error) {
        res.status(400).json({message: error.message})
    }

}
