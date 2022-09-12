const mongoose = require('mongoose'); // Erase if already required

// Declare the Schema of the Mongo model
var userSchema = new mongoose.Schema({
    id:{
        type:Number,
        required:true,
        unique:true
    },
    username:{
        type:String,
        required:true,
        default : "demo"
    },
    password:{
        type:String,
        required:true,
    },
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    role:{
        type:String,
        required:true,
    },
    status:{
        type: Number,
        default : 0
    },
    groupId:{
        type:Number,
        required:true,
    },
    roleName:{
        type:String
    },
});

//Export the model
module.exports = mongoose.model('Users', userSchema, 'Users');