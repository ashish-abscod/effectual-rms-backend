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
var nodemailer = require('nodemailer');


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
let transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com',
  post: 587,
  secure: false,
  requireTLS: true,
  auth:{
    user:'tamanna.bajaj@abscod.com',
    pass:""
  }

})
let mailOptions ={
  from :'tamanna.bajaj@abscod.com',
  to :'mayank.chaturvedi@abscod.com',
  subject :"mail tester",
  Text:"hello yooooo "
}
transporter.sendMail(mailOptions,function(err,info){
  if(err){
    console.log(err);
  }else{
    console.log("email has been sent successfully",info.response);
  }
})



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
