var express = require('express');
var router = express.Router();

const upload = require(__path_configs + 'uploadMiddleware');
const controllerName = 'galleries';
const galleryController = require(__path_controllers + controllerName);

router.get('/', galleryController.getAllGalleries);
router.get('/:id', galleryController.getGallery);
router.post('/', upload.array('img', 10), galleryController.addGallery);
router.put('/:id', upload.array('img', 10), galleryController.editGallery);
router.delete('/:id', galleryController.deleteGallery);

module.exports = router;