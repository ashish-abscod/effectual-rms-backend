const express = require("express"); //imported express
const app = express(); //created an express app
const mongoose = require("mongoose"); //mongoose for connection
require("dotenv/config"); //config file
const bodyParser = require("body-parser"); //used to parse the requested data body
app.use(bodyParser.json()); //this will parse the body recieved from req object in json format.
const projects = require("./routes/projects.route");
const users = require("./routes/users.route");
const feedback = require("./routes/feedback.route");
const cors = require("cors");

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

app.use("/projects", projects);
app.use("/users", users);
app.use("/feedback", feedback);

const Port = process.env.port;
app.listen(Port, () => {
  console.log(`Server is listening on port ${Port}`);
});
