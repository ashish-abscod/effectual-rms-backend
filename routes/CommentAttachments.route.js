const router = require("express").Router();

const { createFile,saveFile,getFiles,getFilesOfEffectual,getFilesOfClient, migrateCommentAttachments} = require("../controllers/CommentAttachments.controller");

router.post("/", createFile);
router.post("/saveToDb",saveFile);
router.get("/migrateCommentAttachments", migrateCommentAttachments);
router.get("/client/:projectId",getFilesOfClient)
router.get("/:projectId",getFilesOfEffectual);
router.get("/getFiles/:id",getFiles);

module.exports = router;
