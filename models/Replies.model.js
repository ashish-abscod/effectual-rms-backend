const mongoose = require("mongoose");   //Erase if already required

const replieSchema = new mongoose.Schema({

    commentId: {
        type: String
    },
    replie: {
        type: String
    },
    time: {
        type: String
    },
    userName: {
        type: String
    },
    userRole: {
        type: String
    }
},
    {
        toJSON: { virtuals: true },
        toObject: { virtuals: true }
    });

//pass third argument as schema name if exactly what you want
module.exports = mongoose.model("Replies", replieSchema, "Replies");