const { string } = require("joi");
const mongoose = require("mongoose"); //Erase if already required

const commentSchema = new mongoose.Schema(
  {
    commentId: {
      type:String,
      unique : true
    },
    projectId: {
      type: String,
    },
    comment: {
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

//virtual population for replie
commentSchema.virtual('replies', {
    ref : 'Replies',
    foreignField : 'commentId',
    localField : 'commentId'
});

//virtual population for comment attachments
commentSchema.virtual('attachments', {
    ref : 'CommentAttachments',
    foreignField : 'commentId',
    localField : 'commentId'
});

//pass third argument as schema name if exactly what you want
module.exports = mongoose.model("Comments", commentSchema, "Comments");
