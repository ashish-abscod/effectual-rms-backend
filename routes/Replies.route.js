const router = require("express").Router();
const { createReplie } = require("../controllers/Rplies.controller");

router.post("/", createReplie);

module.exports = router;
