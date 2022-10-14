const router = require("express").Router();

const { createFile,saveFile,getFiles} = require("../controllers/Attachments.controllers");

router.post("/", createFile);
router.post("/saveToDb",saveFile)
router.get("/getFiles/:id",getFiles)


module.exports = router;
