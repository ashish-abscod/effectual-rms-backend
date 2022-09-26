const {
  createAssignedUser,
  getAssignedUser,
  removeAssignedUser,
} = require("../controllers/AssignedUsers");

const router = require("express").Router();

router.post("/createUser", createAssignedUser);
router.get("/getUser", getAssignedUser);
router.put("/deleteUser/:id/:userId", removeAssignedUser);

module.exports = router;
