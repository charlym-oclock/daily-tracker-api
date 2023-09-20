const CoreDatamapper = require('./core.mapper');
const CalendarMapper = require('./calendar.mapper');

module.exports = class DayTaskMapper extends CoreDatamapper {
  calendarMapper = new CalendarMapper();

  // Operations on DAY_TASK table
  async assignTaskToDay(date, taskId, userId, hour) {
    // Ensure day exists in the 'day' table or create it
    const day = await this.calendarMapper.getDayByDate(date);
    if (!day) {
      await this.calendarMapper.insertDay(date);
    }

    // Check and/or create user_day entry
    const userDayEntry = await this.getUserDay(date, userId);
    if (!userDayEntry) {
      await this.insertUserDay(date, userId);
    }

    // Insert day_task entry
    const preparedQuery = {
      text: `
        INSERT INTO "day_task" (date, task_id, user_id, hour)
        VALUES ($1, $2, $3, $4)
        RETURNING *`,
      values: [date, taskId, userId, hour]
    };
    return this._handleResponse(await this.client.query(preparedQuery));
  }

  async removeTaskFromDay(date, taskId, userId) {
    const preparedQuery = {
      text: `
        DELETE FROM "day_task" 
        WHERE date = $1 AND task_id = $2 AND user_id = $3`,
      values: [date, taskId, userId]
    };
    return this._handleResponse(await this.client.query(preparedQuery));
  }

  async updateTaskCompletion(date, taskId, userId, isDone) {
    const preparedQuery = {
      text: `
        UPDATE "day_task" 
        SET is_done = $4 
        WHERE date = $1 AND task_id = $2 AND user_id = $3`,
      values: [date, taskId, userId, isDone]
    };
    return this._handleResponse(await this.client.query(preparedQuery));
  }

  async getTasksForDay(date, userId) {
    const preparedQuery = {
      text: `
        SELECT t.*, dt.is_done, dt.hour 
        FROM "task" t
        JOIN "day_task" dt ON t.id = dt.task_id
        WHERE dt.date = $1 AND dt.user_id = $2`,
      values: [date, userId]
    };
    return this._handleResponse(await this.client.query(preparedQuery));
  }

  // Operations on USER_DAY table

  async getUserDay(date, userId) {
    const preparedQuery = {
      text: `
        SELECT * 
        FROM "user_day"
        WHERE date = $1 AND user_id = $2`,
      values: [date, userId]
    };
    return this._handleResponse(await this.client.query(preparedQuery));
  }

  async insertUserDay(date, userId) {
    // Check if a user_day entry already exists for the given date and user
    const existingUserDay = await this.getUserDay(date, userId);
  
    if (!existingUserDay) {
      const preparedQuery = {
        text: `
          INSERT INTO "user_day" (date, user_id)
          VALUES ($1, $2)
          RETURNING *`,
        values: [date, userId]
      };
      return this._handleResponse(await this.client.query(preparedQuery));
    }
    return existingUserDay;
  }

  async updateDayCompletion(date, userId, percentDone) {
    const preparedQuery = {
      text: `
        UPDATE "user_day" 
        SET percent_done = $3 
        WHERE date = $1 AND user_id = $2`,
      values: [date, userId, percentDone]
    };
    return this._handleResponse(await this.client.query(preparedQuery));
  }
}