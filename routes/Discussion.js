const { getDiscussion,getFilesByRole } = require("../controllers/Discussion");

const router = require("express").Router();

router.get("/:projectId", getDiscussion);
// router.get("/:projectId/:role",getFilesByRole);

module.exports = router;
