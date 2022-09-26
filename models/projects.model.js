const mongoose = require("mongoose"); // Erase if already required

// Declare the Schema of the Mongo model
const projectSchema = new mongoose.Schema({
  projectId: {
    type: String,
    // required: true,
    // unique: true,
  },
  searchObject: {
    type: String,
    // required: true,
    // unique: true,
  },
  claims: {
    type: String,
  },
  reqDelivery: {
    type: String,
  },
  projectName: {
    type: String,
    default: "Invalidity Search",
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
    default: "Amit Goel",
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
});

//pass third argument as schema name if exactly what you want
module.exports = mongoose.model("Projects", projectSchema, "Projects");
