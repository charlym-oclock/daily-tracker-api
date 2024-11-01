const express = require('express');

const router = express.Router();

const userRouter = require('./user.router');
const taskRouter = require('./task.router');

router.use('/users', userRouter);
router.use('/tasks', taskRouter);

module.exports = router;