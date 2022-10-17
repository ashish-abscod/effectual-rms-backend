const { getDiscussion,getFilesByRole } = require("../controllers/Discussion.controller");

const router = require("express").Router();

router.get("/:projectId", getDiscussion);


module.exports = router;
