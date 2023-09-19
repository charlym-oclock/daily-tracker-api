const CoreDatamapper = require('./core.mapper');

module.exports = class CalendarMapper extends CoreDatamapper {

  // Retrieves a day by date
  async getDayByDate(date) {
    // Ensure date is of type Date
    if (!(date instanceof Date)) {
      throw new Error("Invalid date provided. Expected a JavaScript Date object.");
    }
    const preparedQuery = {
      text: `
        SELECT * FROM "day" WHERE date = $1`,
      values: [date]
    };
    return this._handleResponse(await this.client.query(preparedQuery));
  }

  // Operations on DAY table
  async insertDay(date) {
    // Ensure date is of type Date
    if (!(date instanceof Date)) {
      throw new Error("Invalid date provided. Expected a JavaScript Date object.");
    }

    const weekDay = dateUtils.getWeekDayFromDate(date);
    const weekNum = dateUtils.getWeekIdFromDate(date); // This returns the week number, not the week's DB ID

    // Determine the week's ID from the week number
    // Assume there's a function to retrieve the week's DB ID using the week number
    const weekId = await this.getWeekIdByWeekNumberAndYear(weekNum, date.getFullYear());

    // Check if the day exists
    const existingDay = await this.getDayByDate(date);
    if (!existingDay) {
      // Check if the week exists
      const week = await this.getWeekById(weekId);
      if (!week) {
        // Insert the week and year if necessary
        await this.insertWeekAndYearIfNeeded(weekId, date.getFullYear());
      }

      const preparedQuery = {
        text: `
        INSERT INTO "day" (date, week_day, week_id)
        VALUES ($1, $2, $3)
        RETURNING *`,
        values: [date, weekDay, weekId]
      };
      return this._handleResponse(await this.client.query(preparedQuery));
    }
    return existingDay;
  }

  // Retrieves a week's ID by week number and year
  async getWeekIdByWeekNumberAndYear(weekNum, year) {
    const preparedQuery = {
      text: `
          SELECT id FROM "week" WHERE week_num = $1 AND year = $2 LIMIT 1`,
      values: [weekNum, year]
    };
    const response = await this.client.query(preparedQuery);
    return this._handleResponse(response).id;
  }

  // Operations on WEEK table
  async getWeekById(weekId) {
    const preparedQuery = {
      text: `SELECT * FROM "week" WHERE id = $1`,
      values: [weekId]
    };
    return this._handleResponse(await this.client.query(preparedQuery));
  }

  async insertWeek(weekNum, year) {
    const preparedQuery = {
      text: `
              INSERT INTO "week" (week_num, year)
              VALUES ($1, $2)
              RETURNING *`,
      values: [weekNum, year]
    };
    return this._handleResponse(await this.client.query(preparedQuery));
  }

  // Operations on YEAR table
  async getYear(yearValue) {
    const preparedQuery = {
      text: `SELECT * FROM "year" WHERE year = $1`,
      values: [yearValue]
    };
    return this._handleResponse(await this.client.query(preparedQuery));
  }

  async insertYear(yearValue) {
    const preparedQuery = {
      text: `
              INSERT INTO "year" (year)
              VALUES ($1)
              RETURNING *`,
      values: [yearValue]
    };
    return this._handleResponse(await this.client.query(preparedQuery));
  }

  // Helper function to insert week and year if they don't exist
  async insertWeekAndYearIfNeeded(weekId, yearValue) {
    // Check if the year exists
    const year = await this.getYear(yearValue);
    if (!year) {
      await this.insertYear(yearValue);
    }

    // At this point, the year should exist, so we can safely insert the week
    await this.insertWeek(weekId, yearValue);
  }

}