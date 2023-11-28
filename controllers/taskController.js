const { TaskMapper } = require('../models/index.mapper');

class TaskController {

  async createTask(req, res, next) {
    try {
      const taskData = req.body;
      const newTask = await TaskMapper.createTask(taskData);
      res.status(201).json(newTask); 
    } catch (error) {
      next(error);
    }
  }

  async getTaskById(req, res, next) {
    try {
      const { taskId } = req.params;
      const task = await TaskMapper.getTaskByID(taskId);

      if (!task) {
        return res.status(404).json({ message: "Task not found" });
      }

      res.status(200).json(task);
    } catch (error) {
      next(error);
    }
  }

  async getTasksByUserId(req, res, next) {
    try {
      const { userId } = req.params; 
      const tasks = await TaskMapper.getAllTasksByUserID(userId);

      if (!tasks || tasks.length === 0) {
        return res.status(404).json({ message: "No tasks found for this user" });
      }

      res.status(200).json(tasks);
    } catch (error) {
      next(error);
    }
  }

  async updateTask(req, res, next) {
    try {
      const { taskId } = req.params;
      const taskData = req.body;

      const updatedTask = await TaskMapper.updateTask(taskId, taskData);

      if (!updatedTask) {
        return res.status(404).json({ message: "Task not found" });
      }

      res.status(200).json(updatedTask);
    } catch (error) {
      next(error);
    }
  }

  async deleteTask(req, res, next) {
    try {
      const { taskId } = req.params;

      const result = await TaskMapper.deleteTask(taskId);

      if (!result || !result.success) {
        return res.status(404).json({ message: "Task not found" });
      }

      res.status(204).send(); 
    } catch (error) {
      next(error);
    }
  }
}

module.exports = TaskController;
