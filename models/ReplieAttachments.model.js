const mongoose = require("mongoose"); // Erase if already required

// Declare the Schema of the Mongo model
const replieAttachmentSchema = new mongoose.Schema({
  projectId:{
    type: String,
  },
  replieId: {
    type: String,
  },
  role: {
    type: String,
    role:"Manager"||"Patent Expert" || "Searcher" || "Client Admin" || "Effectual Admin" || "Technical Expert"
    
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
