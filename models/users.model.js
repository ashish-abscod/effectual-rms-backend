const mongoose = require("mongoose"); // Erase if already required
const Joi = require("Joi")
var Schema = mongoose.Schema;
mongoose.Promise = global.Promise;

// Declare the Schema of the Mongo model
const userSchema = new Schema({
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
const User = mongoose.models['Users'] || mongoose.model("Users", userSchema, "Users");

const validate = (Users) => {
  const Schema = Joi.object({
      email: Joi.string().email().required(),
      password: Joi.string().required(),
  });
  return Schema.validate(Users);
};

module.exports = { User, validate };