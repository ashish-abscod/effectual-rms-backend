const express = require("express");
const app = express(); 
const mongoose = require("mongoose");
require("dotenv/config");
const cors = require('cors');
const bodyParser = require("body-parser");
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
const projects = require("./routes/projects.route");
const users = require("./routes/users.route")
const feedback = require("./routes/feedback.route");
// const files = require("./routes/files.route");
const signIn = require("./routes/signIn.route");
const nodemailer = require('nodemailer');

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

// node-mailer
// let transport = nodemailer.createTransport({
//   host: 'smtp.mailtrap.io',
//   port: 2525,
//   auth: {
//     user: "bandanasatpathy435@gmail.com",
//     pass: 'badili123'
//   }
// });

// const mailOptions = {
//   from: 'tamannabajaj80@gmail.com', // Sender address
//   to: 'bandanasatpathy435@gmail.com', // List of recipients
//   subject: 'Node Mailer', // Subject line
//   text: 'Hello People!, Welcome to Bacancy!', // Plain text body
// };

// transport.sendMail(mailOptions, function(err, info) {
//  if (err) {
//    console.log(err)
//  } else {
//    console.log(info)
// ;
//  }
// });



app.use(bodyParser.urlencoded({ limit: "50mb", extended: true, parameterLimit: 50000 }))
app.use(bodyParser.urlencoded({ extended:false }))
app.use(bodyParser.json())

app.use('/projects', projects);
app.use('/users', users);
// app.use('/uploads', files)
app.use("/feedback", feedback);
app.use("/signin", signIn);



const Port = process.env.port;
app.listen(Port, () => {
  console.log(`Server is listening on port ${Port}`);
});
