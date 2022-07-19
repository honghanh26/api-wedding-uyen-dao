var express = require('express');
var router = express.Router();

router.use('/users', require('./users'));
router.use('/banners', require('./banners'));

module.exports = router;