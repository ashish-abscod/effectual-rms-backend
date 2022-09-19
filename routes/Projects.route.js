const router = require("express").Router();
const {
  createProject,
  getProjects,
  updateProject,
} = require("../controllers/Projects.controller");

router.get("/", getProjects);

router.post("/create", createProject);
router.put("/update/:id", updateProject);

module.exports = router;
