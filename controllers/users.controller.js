const UsersModel = require("../models/users.model");

exports.createUser = async (req, res) => {   
    const data = UsersModel({
        password : req.body.password,
        name : req.body.name,
        email : req.body.email,
        role : req.body.role,
        status : req.body.status,
    })

  try {
    const savedUser = await data.save();
    res.json({ message: "User was registered successfully!" });
    res.send(data);
  } catch (error) {}
};


exports.getUsers = async (req, res) => {
  let item = await UsersModel.find();
  if (item.length > 0) {
    res.send(item);
  } else {
    res.send({ result: "data not found" });
  }
};

exports.deleteUser = async (req, res) => {
  const result = await UsersModel.updateOne(
    { _id: req.params.id },

    { $set: { status: "Inactive" } }
  );
  res.send(result);
};
