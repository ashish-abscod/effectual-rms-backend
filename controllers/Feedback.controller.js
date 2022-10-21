const feedbackModel = require("../models/Feedbacks.model");

exports.createFeedback = async (req, res) => {
  try{
  let add = new feedbackModel(req.body);
  let result = await add.save();
  if(result) return res.json({msg:"Feedback Sent Successfully!", status:"success"});
  else return res.json({msg:"Sorry, Sending feedback is failed!", status:"failed"});
  }catch{
    return res.json({msg:"Sorry, Sending feedback is failed!", status:"failed"});
  }
};
