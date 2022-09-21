const {
  createUser,
  getUsers,
  deleteUser,
  SearchUser,
  getUserName,
  // updateUser,
} = require("../controllers/Users.controller");
const router = require("express").Router();

router.post("/", createUser);
router.get("/", getUsers);
router.get("/name", getUserName);
router.put("/:id", deleteUser);
router.get("/search/:key", SearchUser);
// router.put("/update/:id", updateUser);

module.exports = router;
