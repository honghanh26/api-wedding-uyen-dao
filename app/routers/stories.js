var express = require('express');
var router = express.Router();

const controllerName = 'stories';
const storyController = require(__path_controllers + controllerName);

router.get('/', storyController.getAllStories);
router.get('/:id', storyController.getStory);
router.post('/', storyController.addStory);
router.put('/:id', storyController.editStory);

module.exports = router;