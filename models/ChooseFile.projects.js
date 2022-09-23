const mongoose = require("mongoose"); // Erase if already required

// Declare the Schema of the Mongo model
const attachmentSchema = new mongoose.Schema({
  file: {
    type: String,
  },
});

//Export the model
module.exports = mongoose.model("Attachments", attachmentSchema, "Attachments");
