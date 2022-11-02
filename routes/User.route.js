const {
  createUser,
  getUsers,
  deleteUser,
  updateUser,
  getUsersById,
  SearchUser,
  getEffectualUsers,
  getHuaweiUsers
 
} = require("../controllers/User.controller");
const router = require("express").Router();

router.post("/", createUser);
router.get("/", getUsers);
router.get("/effectualUsers",getEffectualUsers);
router.get("/getHuaweiUsers",getHuaweiUsers)
router.get("/:id", getUsersById);
router.put("/delete/:id", deleteUser);
router.put("/update/:id", updateUser);
router.get("/search/:key", SearchUser);
module.exports = router;