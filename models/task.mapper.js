const CoreDatamapper = require('./core.mapper');

module.exports = class TaskMapper extends CoreDatamapper {
  tableName = 'task';

  // Inserts a new task into the database
  async createTask(taskData) {
    const { title, description, type = "one-time", icon, owner_id } = taskData;
    const preparedQuery = {
      text: `
        INSERT INTO "${this.tableName}" (title, description, type, icon, owner_id)
        VALUES ($1, $2, $3, $4, $5)
        RETURNING *`,
      values: [title, description, type, icon, owner_id]
    };
    const result = await this.client.query(preparedQuery);
    return this._handleResponse(result);
  }

  // Retrieves a task by ID
  async getTaskByID(taskId) {
    const preparedQuery = {
      text: `
        SELECT * FROM "${this.tableName}" WHERE id = $1`,
      values: [taskId]
    };
    const result = await this.client.query(preparedQuery);
    return this._handleResponse(result);
  }

  // Updates a task
  async updateTask(taskId, taskData) {
    const updates = [];
    const values = [];
    Object.entries(taskData).forEach(([key, value], index) => {
      updates.push(`${key} = $${index + 1}`);
      values.push(value);
    });
    values.push(taskId);
    const preparedQuery = {
      text: `
        UPDATE "${this.tableName}" 
        SET ${updates.join(', ')}, updated_at = NOW() 
        WHERE id = $${values.length}`,
      values: values
    };
    const result = await this.client.query(preparedQuery);
    return this._handleResponse(result);
  }

  // Deletes a task
  async deleteTask(taskId) {
    // Start a transaction
    await this.beginTransaction();

    try {
        // Delete references from the day_task table
        const dayTaskQuery = {
            text: `
                DELETE FROM "day_task" WHERE task_id = $1`,
            values: [taskId]
        };
        await this.client.query(dayTaskQuery);

        // Delete references from the day_model_task table
        const dayModelTaskQuery = {
            text: `
                DELETE FROM "day_model_task" WHERE task_id = $1`,
            values: [taskId]
        };
        await this.client.query(dayModelTaskQuery);

        // Delete the task itself
        const taskQuery = {
            text: `
                DELETE FROM "${this.tableName}" WHERE id = $1`,
            values: [taskId]
        };
        await this.client.query(taskQuery);

        // Commit the transaction
        await this.commitTransaction();

        return { success: true, message: 'Task and associated references deleted successfully.' };
    } catch (error) {
        // If an error occurs, roll back the transaction
        await this.rollbackTransaction();
        throw error;
    }
  }

  // Retrieves all tasks created by a particular user
  async getAllTasksByUserID(userId) {
    const preparedQuery = {
      text: `
        SELECT * FROM "${this.tableName}" WHERE owner_id = $1`,
      values: [userId]
    };
    const result = await this.client.query(preparedQuery);
    return this._handleResponse(result);
  }
}