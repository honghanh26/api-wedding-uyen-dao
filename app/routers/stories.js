var express = require('express');
var router = express.Router();

const controllerName = 'stories';
const storyController = require(__path_controllers + controllerName);

router.get('/', storyController.getAllStories);
router.get('/:id', storyController.getStory);
router.post('/add', storyController.addStory);
router.put('/edit/:id', storyController.editStory);

module.exports = router;