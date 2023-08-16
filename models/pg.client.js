const pg = require('pg');
const logger = require('../utils/logger');

const { Client } = pg;

const client = new Client({
    host: process.env.DB_HOST,
    database: process.env.DB_NAME,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD
});

try {
    client.connect();
    logger.log('Successfully connected to Database')
} catch (error) {
    logger.log('Error trying to connect to Database', error)
}

module.export = client;