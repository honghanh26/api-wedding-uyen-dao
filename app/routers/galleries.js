var express = require('express');
var router = express.Router();

const upload = require(__path_configs + 'uploadMiddleware');
const controllerName = 'galleries';
const galleryController = require(__path_controllers + controllerName);

router.get('/', galleryController.getAllGalleries);
router.get('/:id', galleryController.getGallery);
router.post('/add', upload.array('img', 10), galleryController.addGallery);
router.put('/edit/:id', upload.array('img', 10), galleryController.editGallery);

module.exports = router;