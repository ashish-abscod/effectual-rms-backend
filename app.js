const express = require("express");
const app = express(); 
const mongoose = require("mongoose");
require("dotenv/config");
const cors = require('cors');
const bodyParser = require("body-parser");
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
const projects = require("./routes/projects.route");
const users = require("./routes/users.route");
const feedback = require("./routes/feedback.route");
const signIn = require("./routes/signIn.route");
const authentication = require('./middlewares/auth.mw')

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
    origin: "http://localhost:3000",
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    optionsSuccessStatus: 204,
  })
);

app.use('/projects', projects);
app.use('/users', authentication, users);
app.use("/feedback", feedback);
app.use("/signin", signIn);


const Port = process.env.port;
app.listen(Port, () => {
  console.log(`Server is listening on port ${Port}`);
});
