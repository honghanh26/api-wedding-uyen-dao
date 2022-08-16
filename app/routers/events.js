var express = require('express');
var router = express.Router();

const upload = require(__path_configs + 'uploadMiddleware');
const controllerName = 'events';
const eventsController = require(__path_controllers + controllerName);

router.get('/', eventsController.getAllEvents);
router.get('/:id', eventsController.getEvent);
router.post('/', upload.single('img'), eventsController.addEvent);
router.put('/:id', upload.single('img'), eventsController.editEvent);
router.post('/mail', eventsController.sendMail);

module.exports = router;