const router = require("express").Router();

const { createFile,saveFile,getFiles,updateStatus,uploadReportAndSendEmails, migrateAttachments} = require("../controllers/Attachments.controllers");

router.post("/", createFile);
router.post("/saveToDb",saveFile);
router.post('/uploadReportAndSendEmails',uploadReportAndSendEmails);
router.get('/migrateAttachments', migrateAttachments);
router.get("/getFiles/:id",getFiles)
router.put("/updateStatus/:id",updateStatus);

module.exports = router;
