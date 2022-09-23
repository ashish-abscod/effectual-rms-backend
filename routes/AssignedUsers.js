const {
  createAssignedUser,
  getAssignedUser,
  removeAssignedUser,
} = require("../controllers/AssignedUsers");

const router = require("express").Router();

router.post("/createUser", createAssignedUser);
router.get("/getUser", getAssignedUser);
router.delete("/deleteUser/:id", removeAssignedUser);

module.exports = router;
