const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

// Routing for HTML VIEW
// router.get('/', userController.getAllUsers);
// router.get('/create', userController.getCreateUserForm);
// router.post('/create', userController.createUser);
// router.get('/:id/edit', userController.getEditUserForm);
// router.post('/:id/edit', userController.updateUser);
// router.post('/:id/delete', userController.deleteUser);

// USERS ROUTE API
router.get('/', userController.getAllUsers);
router.get('/:id', userController.getUserById);
router.post('/', userController.createUser);
router.put('/:id', userController.updateUser);
router.delete('/:id', userController.deleteUser);
router.post('/register', userController.register);
router.post('/login', userController.login);

module.exports = router;