const mongoose = require("mongoose"); // Erase if already required

// Declare the Schema of the Mongo model
const attachmentSchema = new mongoose.Schema({
  files: {
    type: Array
  },
  projectId:{
    type:String
  },
  role: {
    type: String,
    role:"Manager"||"Patent Expert" || "Searcher" || "Client Admin" || "Effectual Admin" || "Technical Expert" 
  },
  uploadedBy:{
    type:String
  },

  createdAt: {
    type: Date,
    default: Date.now,
  }
});

//Export the model
module.exports = mongoose.model("Attachments", attachmentSchema, "Attachments");