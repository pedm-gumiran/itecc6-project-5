// Imports
const express = require('express');
const app = express();
const cors = require('cors'); // Import the CORS middleware for handling cross-origin requests
const bodyParser = require('body-parser'); // Import the body-parser middleware for parsing request bodies
const erroHandler = require('./middleware/errorHandler'); // Import the error handler middleware
app.use(express.json()); // Middleware to parse JSON request bodies
app.use(cors()); // Enable CORS for all routes
app.use(bodyParser.urlencoded({ extended: true })); // Middleware to parse URL-encoded request bodies
app.use(bodyParser.json()); // Middleware to parse JSON request bodies
app.use(erroHandler); // Use the error handler middleware

module.exports = app;
