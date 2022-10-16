const mongoose = require("mongoose");

// Declare the Schema of the Mongo model
const userSchema = new mongoose.Schema({
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
    unique:true
  },

  role: {
    type: String,
    // required: true,
  },
  status: {
    type: Boolean,
    default: true,
  },
  picture: {
    type: String,
  },
});

//Export the model
module.exports = mongoose.model("Users", userSchema, "Users");