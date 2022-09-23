const mongoose = require("mongoose"); // Erase if already required

// Declare the Schema of the Mongo model
const assignedSchema = new mongoose.Schema({
  userId: {
    type: [],
  },
  ProjectId: {
    type: String,
  },
  assignedBy: {
    type: String,
  },
});

//Export the model
module.exports = mongoose.model(
  "AssignedUsers",
  assignedSchema,
  "AssignedUsers"
);
