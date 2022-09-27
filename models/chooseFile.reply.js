const mongoose = require("mongoose"); // Erase if already required

// Declare the Schema of the Mongo model
const replieAttachmentSchema = new mongoose.Schema({
  replieId: {
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
module.exports = mongoose.model("replieAttachments", replieAttachmentSchema, "replieAttachments");
