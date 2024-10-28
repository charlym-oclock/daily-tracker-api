const express = require('express');
const TaskController = require('../controllers/taskController');

const router = express.Router();
const taskController = new TaskController();

// Route for creating a task
router.post('/', taskController.createTask);

// Route for retrieving a task by ID
router.get('/:taskId', taskController.getTaskById);

// Route for retrieving all tasks by user ID
router.get('/user/:userId', taskController.getTasksByUserId);

// Route for updating a task
router.put('/:taskId', taskController.updateTask);

// Route for deleting a task
router.delete('/:taskId', taskController.deleteTask);

module.exports = router;