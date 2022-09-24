const router = require("express").Router();
const {
  createProject,
  getProjects,
  updateProject,
  getOneProject,
} = require("../controllers/Projects.controller");

router.get("/", getProjects);
router.post("/create", createProject);
router.put("/update/:id", updateProject);
router.get("/:id", getOneProject);
module.exports = router;
