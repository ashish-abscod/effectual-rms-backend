const { createAssignedUser } = require("../controllers/AssignedUsers");

const router = require("express").Router();

router.post("/", createAssignedUser);

module.exports = router;
