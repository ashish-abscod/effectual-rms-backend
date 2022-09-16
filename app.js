const express = require("express");
const app = express();
const mongoose = require("mongoose");
require("dotenv/config");
const cors = require("cors");
const bodyParser = require("body-parser");
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
const projects = require("./routes/projects.route");
const users = require("./routes/users.route");
const feedback = require("./routes/feedback.route");
const signIn = require("./routes/signIn.route");
const authentication = require("./middlewares/auth.mw");
const { MongoClient } = require("mongodb");
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
app.use("/signin", signIn);

const Port = process.env.port;
app.listen(Port, () => {
  console.log(`Server is listening on port ${Port}`);
});

// node mailer
// const nodemailer = require("nodemailer");
// let transporter = nodemailer.createTransport({
//   host: "smtpout.secureserver.net",
//   port: 465,
//   auth: {
//     user: "xxmohak@gmail.com",
//     pass: "mohak@000",
//   },
//   tls: {
//     rejectUnauthorized: false,
//   },
// });
// app.post("/email", async (req, resp) => {
//   const uri = "mongodb://0.0.0.0:27017/effectual_rms";
//   const client = new MongoClient(uri);
//   client.connect((err) => {
//     console.log(err);
//   });
//   const collection = client.db("effectual_rms").collection("Users");
//   collection.insertOne(req.body);
//   transporter.sendMail({
//     from: "xxmohak@gmail.com",
//     to: "bandanasatpathy435@gmail.com",
//     subject: ` wants to contact with you`,
//     text: `Here below are the details

//     `,
//   });
// });

// app.post("/email", async (req, resp) => {
//   // const collection = users.insertOne(req.body);
//   transporter.sendMail({
//     from: "bandanasatpathy435@gmail.com",
//     to: "tamannab931@gmail.com",
//     subject: ` wants to contact with you`,
//     text: `Here below are the details `,
//   });
//   resp.send("mail send");
// });
