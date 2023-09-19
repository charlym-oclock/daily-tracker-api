const CoreDatamapper = require('./core.mapper');

module.exports = class UserMapper extends CoreDatamapper {
  tableName = 'user';

  // Inserts a new user into the database
  async createUser(userData) {
    const { username, email, password, profile_picture } = userData;
    const preparedQuery = {
      text: `
        INSERT INTO "${this.tableName}" (username, email, password, profile_picture)
        VALUES ($1, $2, $3, $4)
        RETURNING *`,
      values: [username, email, password, profile_picture]
    };
    const result = await this.client.query(preparedQuery);
    return this._handleResponse(result);
  }

  // Retrieves a user by ID
  async getUserByID(userId) {
    const preparedQuery = {
      text: `
        SELECT * FROM "${this.tableName}" WHERE id = $1`,
      values: [userId]
    };
    const result = await this.client.query(preparedQuery);
    return this._handleResponse(result);
  }

  // Retrieves a user by email
  async getUserByEmail(email) {
    const preparedQuery = {
      text: `
        SELECT * FROM "${this.tableName}" WHERE email = $1`,
      values: [email]
    };
    const result = await this.client.query(preparedQuery);
    return this._handleResponse(result);
  }

  // Updates user information
  async updateUser(userId, userData) {
    const updates = [];
    const values = [];
    Object.entries(userData).forEach(([key, value], index) => {
      updates.push(`${key} = $${index + 1}`);
      values.push(value);
    });
    values.push(userId);
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

  // Removes a user and associated data
  async deleteUser(userId) {
    const preparedQuery = {
      text: `
        DELETE FROM "${this.tableName}" WHERE id = $1`,
      values: [userId]
    };
    const result = await this.client.query(preparedQuery);
    return this._handleResponse(result);
  }

}