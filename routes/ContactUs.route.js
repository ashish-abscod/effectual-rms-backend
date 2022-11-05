const { contactUs } = require('../controllers/ContactUs.controller');

const router = require('express').Router();

router.post('/', contactUs);


module.exports = router;