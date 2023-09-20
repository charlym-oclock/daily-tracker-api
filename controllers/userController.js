const { UserMapper } = require('../models/index.mapper');

class UserController {

  async createUser(req, res, next) {
    try {
      const userData = req.body; // assuming you're using a middleware like bodyParser to parse JSON requests
      const newUser = await UserMapper.createUser(userData);
      res.status(201).json(newUser); // Return the newly created user object with a 201 (Created) status code
    } catch (error) {
      if (error.message === 'Email already in use') {
        return res.status(400).json({ message: "Email already in use" });
      }
      next(error);
    }
  }

  async getUserById(req, res, next) {
    try {
      const { userId } = req.params; // assuming you have a route like '/users/:userId'
      const user = await UserMapper.getUserById(userId);

      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }

      res.status(200).json(user);
    } catch (error) {
      next(error);
    }
  }

  async getUserByEmail(req, res, next) {
    try {
      const { email } = req.query; // assuming you'll fetch by query parameter like '/users?email=some@email.com'
      const user = await UserMapper.getUserByEmail(email);

      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }

      res.status(200).json(user);
    } catch (error) {
      next(error);
    }
  }

  async updateUser(req, res, next) {
    try {
      const { userId } = req.params;
      const userData = req.body;

      const updatedUser = await UserMapper.updateUser(userId, userData);

      if (!updatedUser) {
        return res.status(404).json({ message: "User not found" });
      }

      res.status(200).json(updatedUser);
    } catch (error) {
      next(error);
    }
  }

  async deleteUser(req, res, next) {
    try {
      const { userId } = req.params;

      await UserMapper.deleteUser(userId);
      res.status(204).send(); // 204 No Content, indicating the resource was deleted successfully
    } catch (error) {
      next(error);
    }
  }
}

module.exports = UserController;