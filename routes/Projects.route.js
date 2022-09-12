const router = require('express').Router();
const { createProject, getProjects } = require('../controllers/projects.controller');

router.get('/', getProjects)

router.post('/',createProject)

module.exports = router;