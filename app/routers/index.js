var express = require('express');
var router = express.Router();

router.use('/users', require('./users'));
router.use('/banners', require('./banners'));
router.use('/events', require('./events'));
router.use('/stories', require('./stories'));
router.use('/galleries', require('./galleries'));

module.exports = router;