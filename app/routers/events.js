var express = require('express');
var router = express.Router();

const upload = require(__path_configs + 'uploadMiddleware');
const controllerName = 'events';
const eventsController = require(__path_controllers + controllerName);

router.get('/', eventsController.getAllEvents);
router.get('/:id', eventsController.getEvent);
router.post('/add', upload.single('img'), eventsController.addEvent);
router.put('/edit/:id', upload.single('img'), eventsController.editEvent);

module.exports = router;