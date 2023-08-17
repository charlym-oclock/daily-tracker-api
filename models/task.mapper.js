const CoreDatamapper = require('./core.mapper');

module.exports = class Task extends CoreDatamapper {
  tableName = 'task';

  async findAllUserDayTasks(userId, date) {
    const preparedQuery = {
      text: `
        SELECT t.*, ud.percent_done, dt.is_done 
        FROM "task" t
        JOIN "day_task" dt ON t.id = dt.task_id
        JOIN "user_day" ud ON ud.date = dt.date AND ud.user_id = t.owner_id
        WHERE t.owner_id = $1 AND ud.date = $2;`,
      values: [userId, date],
    };

    const result = await this.client.query(preparedQuery);
    return this._handleResponse(result);
  }
}