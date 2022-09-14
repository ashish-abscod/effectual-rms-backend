const cloudinary = require('cloudinary');
 
cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.API_ID,
    api_secret: process.env.API_SECRET
})


exports.uploadProfile = async (req, res) => {
    try {
        if (!req.file)
            return res.status(400).json({ message: "We need the profile image!" });
        console.log(req.file);
        try {
              uploadedFile = await cloudinary.v2.uploader.upload ( req.file.path , {
              folder : "assets" ,
              resource_type : "auto" ,
            } ) ;
          } catch ( error ) {
            console.log ( error.message ) ;
            return res.status ( 400 ) .json ({message : "Cloudinary Error for Profile. " } ) ;
        }
    }
    catch (error) {
        console.log(error.message);
        res.status(500).json({ message: "Server Error :(" });
    }
}
