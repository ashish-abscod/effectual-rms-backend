const mongoose = require("mongoose"); // Erase if already required

// Declare the Schema of the Mongo model
const assignedSchema = new mongoose.Schema({
  userId: {
    type: [],
    required: true,
  },
  ProjectId: {
    type: String,
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
