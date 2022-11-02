const mongoose = require("mongoose"); // Erase if already required

// Declare the Schema of the Mongo model
const assignedSchema = new mongoose.Schema({
  userId: {
    type: [],
    required: true,
  },
  projectId: {
    type: String,
    required : true
  },
  assignedBy: {
    type: String,
    required: true,
  },
});

//Export the model
module.exports = mongoose.model(
  "AssignedUsers",
  assignedSchema,
  "AssignedUsers"
);
