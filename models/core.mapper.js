module.exports = class CoreDatamapper {

  constructor(client) {
    this.client = client;
  }

  _handleResponse(result) {
    if (!result.rows[0]) {
      return null;
    }
    return result.rows.length === 1 ? result.rows[0] : result.rows;
  }

  async findAll() {
    const preparedQuery = `SELECT * FROM "${this.tableName}"`;
    const result = await this.client.query(preparedQuery);
    return this._handleResponse(result);
  }

  async findByPk(id) {
    const preparedQuery = {
      text: `SELECT * FROM "${this.tableName}" WHERE id = $1`,
      values: [id],
    };
    const result = await this.client.query(preparedQuery);
    return this._handleResponse(result);
  }

  async findAllByColumn(colName) {
    // Make sure to validate colName or use a whitelist approach
    const preparedQuery = `SELECT "${colName}" FROM "${this.tableName}"`;
    const result = await this.client.query(preparedQuery);
    return this._handleResponse(result);
  }

  async findOneByColumn(colName, colValue) {
    // Make sure to validate colName or use a whitelist approach
    const preparedQuery = {
      text: `SELECT * FROM "${this.tableName}" WHERE "${colName}" = $1`,
      values: [colValue]
    };
    const result = await this.client.query(preparedQuery);
    return this._handleResponse(result);
  }
}