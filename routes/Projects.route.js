const router = require('express').Router();
const { createProject, getProjects,bcryptPassword } = require('../controllers/projects.controller');

router.get('/', getProjects)

router.put('/bcryptPassword', bcryptPassword)

router.post('/',createProject)

module.exports = router;