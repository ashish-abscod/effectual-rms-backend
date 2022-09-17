const router = require("express").Router();
const {createUser,getUsers,deleteUser,SearchUser} = require("../controllers/users.controller");


router.post("/", createUser);
router.get("/", getUsers);
router.put("/:id", deleteUser);
router.get("/search/:key", SearchUser);

module.exports = router;