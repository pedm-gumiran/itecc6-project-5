// Import the needed imports
const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');
const path = require('path');
require('dotenv').config({ path: '.env' }); // Load environment variables from .env file

// Instatiate the application
const app = express();

// Implement cors or Cross origin resource sharing for managing and controlling web security
app.use(cors());

// Pass json data from incoming http request essential for processing data sent from a client
app.use(express.json());

const port = process.env.APP_PORT || 5000; // Set the port for the server to listen on, defaulting to 5000 if not specified in .env

// Establish the connection to the database ensuring the server can interact with the database effectively
const db = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  port: process.env.DB_PORT,
});

// for error handling in connecting the database
db.connect((err) => {
  if (err) {
    console.error('Database connection failed:', err);
    return;
  }
  console.log('Connected to the database');
});

// Setup midlleware function to serve static file crucial in handling client server assets like css and js
app.use(express.static(path.join(__dirname, 'public')));
// For serving the frontend files, ensuring that the server can serve static files from the public directory
app.get('/api/users', (req, res) => {
  const sql = 'SELECT * FROM tbladmin';

  db.query(sql, (err, results) => {
    if (err) {
      console.error('Error fetching data from tbluser:', err);
      res.status(500).json({ error: 'Database query failed' });
    } else {
      res.json(results); // Sends the array of user objects to frontend
    }
  });
});

// Handle login requests for admin
app.post("/loginadmin", (req, res) => {// Handle login requests from the client
  const { username, password } = req.body; // Extract email and password from the request body
  db.query(
    "SELECT * FROM tbladmin WHERE Username = ? AND Password = ?",// // Query the database to check if the user exists with the provided email and password
    [username, password],  // Use parameterized queries to prevent SQL injection attacks
    (err, results) => {
      if (err) return res.status(500).send(err);// Handle any errors that occur during the query
      if (results.length > 0) {// If a user is found, send a success response with the user data
        res.json({ success: true, user: results[0] });
      } else {// If no user is found, send a failure response
        res.json({ success: false });
      }
    }
  );
});

// Handle login requests for teacher
app.post("/loginteacher", (req, res) => {// Handle login requests from the client
  const { username, password } = req.body; // Extract email and password from the request body
  db.query(
    "SELECT * FROM tblteachers WHERE Username = ? AND Password = ?",// // Query the database to check if the user exists with the provided email and password
    [username, password],  // Use parameterized queries to prevent SQL injection attacks
    (err, results) => {
      if (err) return res.status(500).send(err);// Handle any errors that occur during the query
      if (results.length > 0) {// If a user is found, send a success response with the user data
        res.json({ success: true, user: results[0] });
      } else {// If no user is found, send a failure response
        res.json({ success: false });
      }
    }
  );
});



// Start the server making it ready to respond for incoming request and serves as the backbone of the full stack application
console.log('Starting server...');

app.listen(port, () => {
  console.log(`Server is listening on http://localhost:${port}`);
});
