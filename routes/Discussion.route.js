const { getDiscussion,getFilesByRole } = require("../controllers/Discussion.controller");

const router = require("express").Router();

router.get("/:projectId", getDiscussion);
// router.get("/:projectId/:role",getFilesByRole);

module.exports = router;
