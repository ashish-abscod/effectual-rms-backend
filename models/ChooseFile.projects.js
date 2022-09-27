const mongoose = require("mongoose"); // Erase if already required

// Declare the Schema of the Mongo model
const attachmentSchema = new mongoose.Schema({
  projectId: {
    type: String,
  },
  file: {
    type: String,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

//Export the model
module.exports = mongoose.model("Attachments", attachmentSchema, "Attachments");
