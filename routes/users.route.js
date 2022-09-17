const {
  createUser,
  getUsers,
  deleteUser,
  SearchUser,
  getUserName,
} = require("../controllers/users.controller");
const router = require("express").Router();

router.post("/", createUser);
router.get("/", getUsers);
router.get("/name", getUserName);
router.put("/:id", deleteUser);
router.get("/search/:key", SearchUser);

module.exports = router;
