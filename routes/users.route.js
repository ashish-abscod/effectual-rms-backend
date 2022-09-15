const {
  createUser,
  getUsers,
  deleteUser,
} = require("../controllers/users.controller");
const router = require("express").Router();

router.post("/", createUser);
router.get("/", getUsers);
router.put("/:id", deleteUser);

module.exports = router;