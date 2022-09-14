const {
  createUser,
  getUser,
  deleteUser,
} = require("../controllers/users.controller");
const router = require("express").Router();

router.post("/", createUser);
router.get("/", getUser);
router.put("/:id", deleteUser);
module.exports = router;
