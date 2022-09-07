var express = require('express');
var router = express.Router();

const upload = require(__path_configs + 'uploadMiddleware');
const controllerName = 'banners';
const bannerController = require(__path_controllers + controllerName);

router.get('/', bannerController.getAllBanners);
router.get('/:id', bannerController.getBanner);
router.post('/', upload.single('img'), bannerController.addBanner);
router.put('/:id', upload.single('img'), bannerController.editBanner);
router.delete('/:id', bannerController.deleteBanner);

module.exports = router;