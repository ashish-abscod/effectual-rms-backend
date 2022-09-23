const router = require("express").Router();

const { createFile } = require("../controllers/ChooseFile.controllers");

router.post("/", createFile);

module.exports = router;
