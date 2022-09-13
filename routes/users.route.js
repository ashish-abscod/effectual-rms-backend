const { createUser } = require('../controllers/users.controller');
const router = require('express').Router();

router.post('/', createUser);

module.exports = router;