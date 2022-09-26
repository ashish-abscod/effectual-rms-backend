const {
  createAssignedUser,
  getAssignedUser,
  removeAssignedUser,
  updateAssignedUser,
} = require("../controllers/AssignedUsers");

const router = require("express").Router();

router.post("/createUser", createAssignedUser);
router.get("/getUser", getAssignedUser);
router.put("/deleteUser/:id/:userId", removeAssignedUser);
router.put("/updateUser/:id/", updateAssignedUser);

module.exports = router;
