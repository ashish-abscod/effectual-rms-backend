const {
  createUser,
  getUsers,
  deleteUser,
  updateUser,
  getUsersById,
  SearchUser,
  // updatePassword
} = require("../controllers/Users.controller");
const router = require("express").Router();

router.post("/", createUser);
router.get("/", getUsers);
router.get("/:id", getUsersById);
router.put("/delete/:id", deleteUser);
router.put("/update/:id", updateUser);
// router.put("/updatePassword/:id", updatePassword);
router.get("/search/:key", SearchUser);
module.exports = router;
