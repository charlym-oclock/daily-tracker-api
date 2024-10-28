const CoreDatamapper = require('./core.mapper');

module.exports = class UserMapper extends CoreDatamapper {
  tableName = 'user';

  // Inserts a new user into the database
  async createUser(userData) {
    const { username, email, password, profile_picture } = userData;

    // Check if email already exists
    try {
      const existingUser = await this.getUserByEmail(email);
      if (existingUser) {
        throw new Error('Email already in use');
      }
    } catch (err) {
      if (err.message !== 'User not found') { // if the error is not about the user being absent, we re-throw it
        throw err;
      }
      // If the error is "User not found", it's fine and we continue to create the user.
    }

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
  async getUserById(userId) {
    const preparedQuery = {
      text: `
        SELECT * FROM "${this.tableName}" WHERE id = $1`,
      values: [userId]
    };
    const result = await this.client.query(preparedQuery);
    const user = this._handleResponse(result);
    //if no user is found, we throw an error
    if (!user) {
      throw new Error('User not found');
    }
    return user
  }

  // Retrieves a user by email
  async getUserByEmail(email) {
    const preparedQuery = {
      text: `
        SELECT * FROM "${this.tableName}" WHERE email = $1`,
      values: [email]
    };
    const result = await this.client.query(preparedQuery);
    const user = this._handleResponse(result);
    //if no user is found, we throw an error
    if (!user) {
      throw new Error('User not found');
    }
    return user
  }

  // Updates user information
  async updateUser(userId, userData) {
    // First, check if the user exists
    await this.getUserById(userId); // This will throw an error if the user doesn't exist

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
        WHERE id = $${values.length}
        RETURNING *`,
      values: values
    };
    const result = await this.client.query(preparedQuery);
    console.log(result.rows);
    return this._handleResponse(result);
  }

  // Removes a user and associated data
  async deleteUser(userId) {
    // First, check if the user exists
    await this.getUserById(userId); // This will throw an error if the user doesn't exist
    const preparedQuery = {
      text: `
        DELETE FROM "${this.tableName}" WHERE id = $1`,
      values: [userId]
    };
    const result = await this.client.query(preparedQuery);
    return this._handleResponse(result);
  }

}