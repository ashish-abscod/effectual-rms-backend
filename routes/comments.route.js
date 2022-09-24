const router = require("express").Router();
const { createComment } = require("../controllers/Comments.controller");

router.post("/", createComment);

module.exports = router;
