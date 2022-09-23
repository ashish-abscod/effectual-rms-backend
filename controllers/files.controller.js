const cloudinary = require('cloudinary').v2;
const  multer = require("multer");
 
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_API_CLOUD,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
    secure: true,
})



module.exports = {cloudinary}