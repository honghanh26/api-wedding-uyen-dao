var express = require('express');
var router = express.Router();

const controllerName = 'users';
const userController = require(__path_controllers + controllerName);

router.get('/', userController.getAllUsers);
router.get('/:id', userController.getUser);
router.post('/add', userController.addUser);
router.put('/edit/:id', userController.editUser);
router.delete('/delete/:id', userController.deleteUser);

module.exports = router;