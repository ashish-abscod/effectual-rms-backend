const router = require('express').Router();
const { CreateProject } = require('../controllers/CreateProject.controller');

router.post('/createProject', CreateProject )

module.exports = router;