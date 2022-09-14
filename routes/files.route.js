const router = require('express').Router();
const multer = require('multer');
const { uploadProfile } = require('../controllers/files.controller');


const storage = multer.diskStorage({})

let upload = multer({
    storage
})

router.post("/profile", upload.single("myImage"), uploadProfile);

module.exports = router;