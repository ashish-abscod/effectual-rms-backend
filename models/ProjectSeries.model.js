const mongoose = require("mongoose"); // Erase if already required

// Declare the Schema of the Mongo model
const projectIdSchema = new mongoose.Schema({
  series: {
    type: Number,
    required : true
  }
});

//pass third argument as schema name if exactly what you want
module.exports = mongoose.model("ProjectIdSeries", projectIdSchema, "ProjectIdSeries");
