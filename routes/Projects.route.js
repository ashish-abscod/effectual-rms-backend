const router = require("express").Router();
const {
  createProject,
  getProjects,
  updateProject,
  getOneProject,
  findSearchObject
} = require("../controllers/Projects.controller");

router.get("/", getProjects);
router.post('/findSearchObject',findSearchObject)
router.post("/:create", createProject);
router.put("/update/:id", updateProject);
router.get("/:id", getOneProject);
module.exports = router;
