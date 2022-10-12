const feedbackModel = require("../models/Feedbacks.model");

exports.createFeedback = async (req, res) => {
  try{
  let add = new feedbackModel(req.body);
  let result = await add.save();
  if(result) return res.json({msg:"Successfully sent feedback.", status:"success"});
  else return res.json({msg:"Sory, feedback not sent.", status:"failed"});
  }catch{
    return res.json({msg:"Something went Wrong", status:"failed"});
  }
};
