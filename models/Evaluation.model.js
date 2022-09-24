const mongoose = require("mongoose"); // Erase if already required

// Declare the Schema of the Mongo model
const evaluationSchema = new mongoose.Schema({
  projectId: {
    type: String,
  },
  modification: {
    type: String,
  },
  searchscore: {
    type: Number,
  },
  claimscore: {
    type: Number,
  },
  historyscore: {
    type: Number,
  },
  datacoverage: {
    type: Number,
  },
  sum: {
    type: Number,
  },
  category: {
    type: String,
  },
  comment: {
    type: String,
  },
  appSerachResult: {
    type: String,
  },
  editedby: {
    type: String,
  },
});

//pass third argument as schema name if exactly what you want
module.exports = mongoose.model("Evaluations", evaluationSchema, "Evaluations");
