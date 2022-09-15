const router = require("express").Router();
const {createUser,getUsers,deleteUser} = require("../controllers/users.controller");


router.post("/", createUser);
router.get("/", getUsers);
router.put("/:id", deleteUser);

module.exports = router;