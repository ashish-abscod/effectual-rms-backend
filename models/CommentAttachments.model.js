const mongoose = require("mongoose"); // Erase if already required

// Declare the Schema of the Mongo model
const CommentAttachmentSchema = new mongoose.Schema({
  projectId:{
    type: String,
  },
  commentId: {
    type: String,
  },
  files: {
    type: Array,
  },
  fileNames:{
   type:Array
  },
  uploadedBy:{
    type:String
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

//Export the model
module.exports = mongoose.model("commentAttachments", CommentAttachmentSchema, "commentAttachments");
