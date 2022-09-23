// const usersModel = require('../models/Users.model');
// const bcrypt = require('bcryptjs');

// const router = require('express').Router();

// router.get('/', async (req, res)=> {
//     try {
//         const data = await usersModel.find({},{password : 1,_id:1});

//         try{
//         data.map(async (item)=> {
//             let newPassword = await bcrypt.hashSync(item.password, 10);
//                 await usersModel.findByIdAndUpdate(item._id, {password : newPassword},function (err,docs) {
//                 if (err){
//                     console.log(err)
//                 }
//                 else{
//                     console.log("Updated Password for  : ", docs);
//                 }} )
//         })
//         res.json("Successfully updated passwords.");
//         return;
//     }catch(err){
//         res.json(err);
//     }

//     } catch (error) {
//         console.log({message : error})
//     }
// })

// module.exports = router;
