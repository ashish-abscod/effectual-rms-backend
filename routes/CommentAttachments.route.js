const router = require("express").Router();

const { createFile,saveFile,getFiles,getFilesOfEffectual,getFilesOfClient} = require("../controllers/CommentAttachments.controller");

router.post("/", createFile);
router.post("/saveToDb",saveFile);
router.get("/getFiles/:id",getFiles);
router.get("/client/:projectId",getFilesOfClient)
router.get("/:projectId",getFilesOfEffectual);


module.exports = router;
