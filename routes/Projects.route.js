const router = require('express').Router();
const { createProject, getProjects } = require('../controllers/Projects.controller');

router.get('/', getProjects)

router.post('/',createProject)

module.exports = router;