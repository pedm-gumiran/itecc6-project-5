// Imports
const mysql= require('mysql2'); // Import the MySQL library for database interaction
const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '.env') });
// Establish the connection to the database ensuring the server can interact with the database effectively
const db = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  port: process.env.DB_PORT,
});

module.exports = db;
