const mongoose = require("mongoose"); 
const { Schema, model } = mongoose;
// Erase if already required

// Declare the Schema of the Mongo model
const tokenSchema = new Schema({
    userId: {
        type:Schema.Types.ObjectId,
        required: true,
        ref: "Users",
    },
    token: {
        type: String,
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
        expires: 3600,
    },
});

const Token = mongoose.model("token", tokenSchema,"token");
module.exports = Token