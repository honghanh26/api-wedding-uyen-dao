var express = require('express');
var router = express.Router();

const upload = require(__path_configs + 'uploadMiddleware');
const controllerName = 'users';
const userController = require(__path_controllers + controllerName);

router.get('/', userController.getAllUsers);
router.get('/:id', userController.getUser);
router.post('/add', upload.single('img'), userController.addUser);
router.put('/edit/:id', upload.single('img'), userController.editUser);
router.delete('/delete/:id', userController.deleteUser);

module.exports = router;