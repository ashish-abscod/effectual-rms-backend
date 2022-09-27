const router = require("express").Router();

const { createFile } = require("../controllers/chooseFileReply.controller");

router.post("/", createFile);

module.exports = router;
