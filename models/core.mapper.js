module.exports = class CoreDatamapper {

  constructor(client) {
    this.client = client;
  }

  // method to return the result
  _handleResponse(result) {
    if (!result.rows[0]) {
      return null;
    }
    return result.rows.length === 1 ? result.rows[0] : result.rows;
  }

  // Helper method to begin a transaction
  async beginTransaction() {
    await this.client.query('BEGIN');
  }

  // Helper method to commit a transaction
  async commitTransaction() {
    await this.client.query('COMMIT');
  }

  // Helper method to rollback a transaction in case of an error
  async rollbackTransaction() {
    await this.client.query('ROLLBACK');
  }

}