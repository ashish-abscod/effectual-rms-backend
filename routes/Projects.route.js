const router = require("express").Router();
const {
  createProject,
  getProjects,
  updateProject,
} = require("../controllers/projects.controller");

router.get("/", getProjects);

router.post("/create", createProject);
router.put("/updates/:id", updateProject);

module.exports = router;
