// Import the needed imports
const express = require('express');
const cors = require('cors');
const path = require('path');
const app = express();
const db = require('./config/database'); // Import the database connection


// Implement cors or Cross origin resource sharing for managing and controlling web security
app.use(cors());

// Pass json data from incoming http request essential for processing data sent from a client
app.use(express.json());

const port = process.env.PORT || 5000; // Set the port for the server to listen on, defaulting to 3000 if not specified
// for error handling in connecting the database
db.connect((err) => {
  if (err) {
    console.error('Database connection failed:', err);
    return;
  }
  console.log('Connected to the database');
});

app.get('/', (req, res) => {
  res.send('Server is Ready!'); // Send a simple response for the root route
});


// This is where you add routes for your API endpoints
app.get('/getworkouts', (req, res) => {
  const sql='SELECT * FROM workouts '; // SQL query to select all users from the database
  db.query(sql, (err, result) => { // Execute the SQL query
     if (err) {
       console.error('Error fetching workoutLists:', err); // Log any errors that occur during the query
       res.status(500).send('Error fetching workoutLists'); // Send a 500 error response if an error occurs
       return;
     }
     res.json(result); // Send the result as a JSON response
   });

 } );
app.post('/addworkouts', (req, res) => {
  const { exercise, sets, reps, weight, total_weight, workout_date, workout_type, notes } = req.body; // Destructure the request body to get the workout data
  const sql = 'INSERT INTO workouts (exercise, sets, reps, weight, total_weight, workout_date, workout_type, notes) VALUES (?, ?, ?, ?, ?, ?, ?, ?)'; // SQL query to insert a new user into the database
  db.query(sql, [exercise, sets, reps, weight, total_weight, workout_date, workout_type, notes], (err) => { // Execute the SQL query
    if (err) {
      console.error('Error adding new workout:', err); // Log any errors that occur during the query
      res.status(500).send('Error adding new workout'); // Send a 500 error response if an error occurs
      return;
    }
    res.status(201).send('Workout added successfully'); // Send a success response if the query is successful
  });
});



// Import the routes from the routes directory, which contains the API endpoints for the application

// Setup midlleware function to serve static file crucial in handling client server assets like css and js
app.use(express.static(path.join(__dirname, 'public')));
// For serving the frontend files, ensuring that the server can serve static files from the public directory
// Start the server making it ready to respond for incoming request and serves as the backbone of the full stack application
console.log('Starting server...');

app.listen(port, () => {
  console.log(`Server is listening on http://localhost:${port}`);
});
