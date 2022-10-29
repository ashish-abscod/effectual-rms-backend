const router = require("express").Router();

const { createFile,saveFile,getFiles,uploadRepoertFiles,updateStatus,uploadReportAndSendEmails} = require("../controllers/Attachments.controllers");

router.post("/", createFile);
router.post("/saveToDb",saveFile);
router.get("/getFiles/:id",getFiles)
router.put("/updateStatus/:id",updateStatus);
router.post('/uploadReportAndSendEmails',uploadReportAndSendEmails);

module.exports = router;
