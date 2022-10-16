const {
  createAssignedUser,
  getAssignedUser,
  removeAssignedUser,
  updateAssignedUser,
  assignedUserGetById,
} = require("../controllers/AssignedUsers");

const router = require("express").Router();

router.post("/createUser", createAssignedUser);
router.get("/getUser", getAssignedUser);
router.get("/getUserById/:id", assignedUserGetById);
router.put("/deleteUser/:id/:userId", removeAssignedUser);
router.post("/updateUser/:id/", updateAssignedUser);

module.exports = router;
