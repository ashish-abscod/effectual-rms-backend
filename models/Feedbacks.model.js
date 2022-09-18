const mongoose = require("mongoose"); // Erase if already required

// Declare the Schema of the Mongo model
const feedbackSchema = new mongoose.Schema({
  feedback: {
    type: String,
  },
  projectId: {
    type: String,
  },
  UserEmail: {
    type: String,
  },
});

//pass third argument as schema name if exactly what you want
module.exports = mongoose.model("Feedbacks", feedbackSchema, "Feedbacks");
