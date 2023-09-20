const express = require('express');
const UserController = require('../controllers/userController');

const router = express.Router();
const userController = new UserController();

// Create a new user
router.post('/', (req, res, next) => userController.createUser(req, res, next));

// Get a user by ID
router.get('/:userId', (req, res, next) => userController.getUserById(req, res, next));

// Get a user by email (through query parameters)
router.get('/', (req, res, next) => userController.getUserByEmail(req, res, next));

// Update a user by ID
router.put('/:userId', (req, res, next) => userController.updateUser(req, res, next));

// Delete a user by ID
router.delete('/:userId', (req, res, next) => userController.deleteUser(req, res, next));

module.exports = router;