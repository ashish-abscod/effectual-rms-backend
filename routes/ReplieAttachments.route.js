const router = require("express").Router();

const { createFile,saveFile,getFiles ,getFilesByRole} = require("../controllers/ReplieAttachments.controller");

router.post("/", createFile);
router.post("/saveToDb",saveFile);
router.get("/getFiles/:id",getFiles);
router.get("/:projectId/:role",getFilesByRole);

module.exports = router;
