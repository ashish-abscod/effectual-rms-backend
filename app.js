const express = require("express");
const app = express();
const mongoose = require("mongoose");
require("dotenv/config");
const cors = require("cors");
const bodyParser = require("body-parser");
const projects = require("./routes/Projects.route.js");
const users = require("./routes/User.route.js");
const feedback = require("./routes/Feedback.route");
const signIn = require("./routes/SignIn.route");
const comment = require("./routes/Comments.route");
const replie = require("./routes/Replies.route");
const attachment = require("./routes/Attachments.routes");
const forgotPassword = require("./routes/ForgotPassword.routes");
const commentAttachment = require("./routes/CommentAttachments.route");
const replyAttachment = require("./routes/ReplieAttachments.route");;
// const authentication = require("./middlewares/auth.mw");
const discussion = require("./routes/Discussion");
const assignedUsers = require("./routes/AssignedUsers");
const evaluation = require("./routes/Evaluation");
//---------------Mongodb Connection -----------------
mongoose.Promise = global.Promise;
mongoose.connect(
  process.env.DB_Connection,
  {
    useNewUrlParser: true,
  },
  (err) => {
    if (!err) {
      console.log("MongoDB Connection Succeeded.");
    } else {
      console.log("Error in DB connection: " + err);
    }
  }
);

app.get("/", (req, res) => {
  res.send("Hello Express.js");
});

// ----------------------middleware cors---------------
app.use(
  cors({
    origin: "*",
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    optionsSuccessStatus: 204,
  })
);

app.use(bodyParser.json({ limit: "50mb" }));
app.use(bodyParser.urlencoded({ limit: "50mb", extended: true }));
app.use(express.json());

app.use("/projects", projects);
app.use("/files", attachment);
app.use("/commentFiles", commentAttachment);
app.use("/replyFiles", replyAttachment);
app.use("/users", users);
app.use("/feedback", feedback);
app.use("/signin", signIn);
app.use("/comment", comment);
app.use("/replie", replie);
app.use("/discussion", discussion);
app.use("/assigned", assignedUsers);
app.use("/evaluation",evaluation);
app.use("/password",forgotPassword);

const Port = process.env.port || 8080;
app.listen(Port, (err) => {
  if(err) throw err;
  console.log(`Server is listening on port ${Port}`);
})