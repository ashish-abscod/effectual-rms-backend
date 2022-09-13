const bcrypt = require('bcryptjs');
const UsersModel = require("../models/users.model")

exports.createUser = async (req, res) => {
    const data = UsersModel({
        username : req.body.username,
        password : bcrypt.hashSync(req.body.password, 10),
        name : req.body.name,
        email : req.body.email,
        role : req.body.role,
        status : req.body.status
    })

    try {
        const savedUser = await data.save();
        res.json({ message: "User was registered successfully!" });
    } catch (error) {
        
    }
}