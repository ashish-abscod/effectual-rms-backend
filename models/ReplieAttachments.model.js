const mongoose = require("mongoose"); // Erase if already required

// Declare the Schema of the Mongo model
const replieAttachmentSchema = new mongoose.Schema({
  projectId:{
    type: String,
  },
  replieId: {
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
module.exports = mongoose.model("ReplieAttachments", replieAttachmentSchema, "ReplieAttachments");
