const mongoose = require("mongoose"); // Erase if already required

// Declare the Schema of the Mongo model
var ProjectSchema = new mongoose.Schema({
  refId: {
    type: String,
    required: true,
    unique: true,
  },
  searchObject: {
    type: String,
    required: true,
    unique: true,
  },
  claims: {
    type: String,
  },
  reqDelivery: {
    type: String,
  },
  projectName: {
    type: String,
  },
  requesterName: {
    type: String,
  },
  deliveryDate: {
    type: String,
  },
  priorArtDate: {
    type: String,
  },
  emailContent: {
    type: String,
  },
  info: {
    type: String,
  },
  status: {
    type: String,
  },
  projectManager: {
    type: String,
    required: true,
  },
  requestedDate: {
    type: String,
  },
  patentNumber: {
    type: String,
  },
  createdById: {
    type: String,
  },
  completedDate: {
    type: String,
  },
  jurisdiction: {
    type: String,
  },
  include: {
    type: String,
  },
  technicalField: {
    type: String,
  },
  standard: {
    type: String,
  },
  sso: {
    type: String,
  },
  usipr: {
    type: String,
  },
  impClaim: {
    type: String,
  },
  nonImpClaim: {
    type: String,
  },
  attachment: {
    type: String,
  },
});

//pass third argument as schema name if exactly what you want
module.exports = mongoose.model("Projects", ProjectSchema, "Projects");
