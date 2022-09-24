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



app.use(bodyParser.json({limit: '50mb'}));
app.use(bodyParser.urlencoded({limit: '50mb', extended: true}));
app.use(express.json());

app.use("/projects", projects);
app.use("/users", users);
app.use("/feedback", feedback);
app.use("/signin", signIn);
app.use("/comment", comment);
app.use("/replie", replie);
app.use("/discussion", discussion);
app.use("/assigned", assignedUsers);
app.use("/evaluation", evaluation);

const Port = process.env.port;
app.listen(Port, () => {
  console.log(`Server is listening on port ${Port}`);
});
