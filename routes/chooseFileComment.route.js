const router = require("express").Router();

const { createFile } = require("../controllers/chooseFileComment.controller");

router.post("/", createFile);

module.exports = router;
