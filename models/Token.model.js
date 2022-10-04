const mongoose = require("mongoose"); 
const { Schema, model } = mongoose;

// Declare the Schema of the Mongo model
const tokenSchema = new Schema({
    userId: {
        type:Schema.Types.ObjectId,
        required: true,
    },
    createdAt: {
        type: Date,
        default : Date.now,
        index : {expires : 3600}
    },
    token:{
        type : String ,
        required: true
    },
});

module.exports= mongoose.model("Tokens", tokenSchema,"Tokens");