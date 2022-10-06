const mongoose = require("mongoose"); //Erase if already required

const replieSchema = new mongoose.Schema({
  replieId : {
    type : String,
    unique : true
  },
  projectId: {
    type: String
  },
  commentId: {
    type: String,
  },
  replie: {
    type: String,
  },
  time: {
    type: String,
  },
  userName: {
    type: String,
  },
  userRole: {
    type: String,
  },
},
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

//virtual population for replie attachments
replieSchema.virtual('attachments', {
  ref : 'ReplieAttachments',
  foreignField : 'replieId',
  localField : 'replieId'
});

//pass third argument as schema name if exactly what you want
module.exports = mongoose.model("Replies", replieSchema, "Replies");
