const express = require("express");
const app = express();
const mongoose = require("mongoose");
require("dotenv/config");
const cors = require("cors");
const bodyParser = require("body-parser");
const projects = require("./routes/projects.route");
const users = require("./routes/users.route");
const feedback = require("./routes/feedback.route");
const signIn = require("./routes/signIn.route");
const comment = require("./routes/comments.route");
const replie = require("./routes/Replies.route");
const attachment = require("./routes/ChooseFile.routes");
const forgotPassword = require("./routes/nodemailer.routes");
// const authentication = require("./middlewares/auth.mw");
const discussion = require("./routes/Discussion");
const assignedUsers = require("./routes/AssignedUsers");
const evaluation = require("./routes/Evaluation");
// const nodemailer = require("nodemailer");

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

// nodemailer
// const transporter = nodemailer.createTransport({
//   host: "smtpout.secureserver.net",
//   port: 465,
//   secure: true, // use SSL

//   debug: true,
//   auth: {
//     user: "faiz@globallegalassociation.org",
//     pass: "f@iz#3904eFs",
//   },
//   tls: {
//     rejectUnauthorized: false,
//   },
// });

// let mailOptions = {
//   from: "faiz@globallegalassociation.org",
//   to: "tamannab931@gmail.com",
//   subject: "Reset Your Password",
//   text: "Please Reset Your PassWord.",
// };
// transporter.sendMail(mailOptions, function (error, info) {
//   if (error) {
//     console.log(error);
//   } else {
//     console.log("email has been send", info.response);
//   }
// });

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
app.use("/users", users);
app.use("/feedback", feedback);
app.use("/signin", signIn);
app.use("/comment", comment);
app.use("/replie", replie);
app.use("/discussion", discussion);
app.use("/assigned", assignedUsers);
app.use("/forgotPassword", forgotPassword);
app.use("/evaluation", evaluation);

const Port = process.env.port;
app.listen(Port, () => {
  console.log(`Server is listening on port ${Port}`);
});
