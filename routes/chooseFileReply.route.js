const router = require("express").Router();

const { createFile,saveFile,getFiles } = require("../controllers/chooseFileReply.controller");

router.post("/", createFile);
router.post("/saveToDb",saveFile);
router.get("/getFiles/:id",getFiles);

module.exports = router;
