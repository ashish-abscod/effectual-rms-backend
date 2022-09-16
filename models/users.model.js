const mongoose = require("mongoose"); // Erase if already required

// Declare the Schema of the Mongo model
var userSchema = new mongoose.Schema({
  password: {
    type: String,
    required: true,
  },
  name: {
    type: String,
  },
  email: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    required: true,
  },

  status: {
    type: String,
    default: "Active",
  },
});

//Export the model
module.exports = mongoose.model("Users", userSchema, "Users");
