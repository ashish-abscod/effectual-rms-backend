const router = require("express").Router();
const {
  createProject,
  getProjects,
  updateProject,
  getOneProject,
  findSearchObject,
  getProjectsAssignedToUser,
  terminateProjectStatus
} = require("../controllers/Projects.controller.js");

router.get("/", getProjects);
router.post('/findSearchObject',findSearchObject)
router.post("/create", createProject);
router.put("/update/:id", updateProject);
router.get("/:id", getOneProject);
router.get("/getProjectsAssignedToUser/:userId", getProjectsAssignedToUser);
router.put("/terminateProjectStatus/:projectId",terminateProjectStatus);
module.exports = router;
