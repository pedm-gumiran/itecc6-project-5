const mysql = require('mysql2');
require('dotenv').config({  path: __dirname + '/.env' }); // Load environment variables from .env file
// Establish the connection to the database ensuring the server can interact with the database effectively
const db = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  port: process.env.DB_PORT,
});
module.exports = db; // Export the database connection for use in other modules
