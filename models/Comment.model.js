const mongoose = require("mongoose");   //Erase if already required

const commentSchema = new mongoose.Schema({

commentId : {
    type : String
},
projectId : {
    type : String
},
comment : {
    type : String
},
time : {
    type : String
},
userName : {
    type : String
},
userRole : {
    type : String
},
userRole : {
    type : String
}

})

//pass third argument as schema name if exactly what you want
module.exports = mongoose.model("Comments", commentSchema, "Comments");