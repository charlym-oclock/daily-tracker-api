const CoreDatamapper = require('./core.mapper');

module.exports = class DayModelMapper extends CoreDatamapper {

  constructor(client) {
    super(client);
    this.tableName = "day_model"; // Default table name for day_model
  }

  // CRUD for day_model table

  // Create
  async insertDayModel(name, description) {
    const preparedQuery = {
      text: `
        INSERT INTO "day_model" (name, description)
        VALUES ($1, $2)
        RETURNING *`,
      values: [name, description]
    };
    return this._handleResponse(await this.client.query(preparedQuery));
  }

  // Read
  async getDayModelById(modelId) {
    const preparedQuery = {
      text: `
        SELECT * FROM "day_model" WHERE id = $1`,
      values: [modelId]
    };
    return this._handleResponse(await this.client.query(preparedQuery));
  }

  // Update
  async updateDayModel(modelId, name, description) {
    const preparedQuery = {
      text: `
        UPDATE "day_model" 
        SET name = $2, description = $3
        WHERE id = $1
        RETURNING *`,
      values: [modelId, name, description]
    };
    return this._handleResponse(await this.client.query(preparedQuery));
  }

  // Delete
  async deleteDayModel(modelId) {
    try {
      // Begin transaction
      await this.beginTransaction();
  
      // Delete all tasks associated with the day_model
      await this.deleteTasksFromDayModel(modelId);
  
      // Delete the day_model itself
      const preparedQuery = {
        text: `
          DELETE FROM "day_model" WHERE id = $1`,
        values: [modelId]
      };
      await this.client.query(preparedQuery);
  
      // Commit transaction
      await this.commitTransaction();
    } catch (error) {
      // Rollback any changes in case of an error
      await this.rollbackTransaction();
      throw error; // Propagate the error to be handled elsewhere
    }
  }

  // CRUD for day_model_task table

  // Create
  async insertDayModelTask(modelId, taskId) {
    const preparedQuery = {
      text: `
        INSERT INTO "day_model_task" (model_id, task_id)
        VALUES ($1, $2)
        RETURNING *`,
      values: [modelId, taskId]
    };
    return this._handleResponse(await this.client.query(preparedQuery));
  }

  // Read
  async getTasksForDayModel(modelId) {
    const preparedQuery = {
      text: `
        SELECT * FROM "day_model_task" WHERE model_id = $1`,
      values: [modelId]
    };
    return this._handleResponse(await this.client.query(preparedQuery));
  }

  // Delete specific task from a model
  async deleteTaskFromDayModel(modelId, taskId) {
    const preparedQuery = {
      text: `
        DELETE FROM "day_model_task" 
        WHERE model_id = $1 AND task_id = $2`,
      values: [modelId, taskId]
    };
    await this.client.query(preparedQuery);
  }

  // Delete all tasks associated with a model
  async deleteTasksFromDayModel(modelId) {
    const preparedQuery = {
      text: `
        DELETE FROM "day_model_task" WHERE model_id = $1`,
      values: [modelId]
    };
    await this.client.query(preparedQuery);
  }

  // Note: No update method is provided for the day_model_task table since it's often just a linking table.
};

