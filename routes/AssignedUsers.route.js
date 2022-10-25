const {
  createAssignedUser,
  getAssignedUser,
  removeAssignedUser,
  updateAssignedUser,
  assignedUserGetById,
  getAssignedUserToProject
} = require("../controllers/AssignedUsers.controller");

const router = require("express").Router();

router.post("/createUser", createAssignedUser);
router.get("/getUser", getAssignedUser);
router.get("/getAssignedUserToProject/:projectId/:userId", getAssignedUserToProject);
router.get("/getUserById/:id", assignedUserGetById);
router.put("/deleteUser/:id/:userId", removeAssignedUser);
router.post("/updateUser/:id/", updateAssignedUser);

module.exports = router;
