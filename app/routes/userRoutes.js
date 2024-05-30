const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

router.get('/', userController.getAllUsers);
router.get('/create', userController.getCreateUserForm);
router.post('/create', userController.createUser);
router.get('/:id/edit', userController.getEditUserForm);
router.post('/:id/edit', userController.updateUser);
router.post('/:id/delete', userController.deleteUser);

module.exports = router;