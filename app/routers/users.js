var express = require('express');
var router = express.Router();

const upload = require(__path_configs + 'uploadMiddleware');
const controllerName = 'users';
const userController = require(__path_controllers + controllerName);

router.get('/', userController.getAllUsers);
router.get('/:id', userController.getUser);
router.post('/', upload.single('img'), userController.addUser);
router.put('/:id', upload.single('img'), userController.editUser);
router.delete('/:id', userController.deleteUser);

module.exports = router;