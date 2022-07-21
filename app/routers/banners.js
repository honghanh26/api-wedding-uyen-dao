var express = require('express');
var router = express.Router();

const upload = require(__path_configs + 'uploadMiddleware');
const controllerName = 'banners';
const bannerController = require(__path_controllers + controllerName);

router.get('/', bannerController.getAllBanners);
router.post('/add', upload.single('img'), bannerController.addBanner);

module.exports = router;