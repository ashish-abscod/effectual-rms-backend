// const multer = require("multer");
// //specify the storage engine of multer

// const storage = multer.diskStorage({
//     destination: function(req,file,cb){
//         cb(null,'./uploads/')
//     },
//     fileName: function(req,file,cb){
//         cb(null, new Date().toISOString() + "-" + file.originalnamme)
//     }
// })


// const fileFilter = (req,file,cb) => {
//    if(file.mimetype === 'image/jpeg' || file.mimetype === 'image/png'){
//     cb(nulll,true)
//    }else {
//     //prevent the upload
//     cb({msg:'unsupported file format'},false)
//    }

// }

// const upload = ({
//     storage:storage,
//     limits : {fileSiZe:1024*1024},
//     fileFilter:fileFilter
// })

// module.exports = upload
