const app = require('./app'); // Import the Express app from app.json
const db = require('./dbconfig/db');
const PORT = process.env.PORT || 5000; // Set the port to the value in the environment variable or default to 5000

db.connect((err) => {
  if (err) {
    console.error('Database connection failed:', err);
    process.exit(1); // Exit the process if the connection fails
  }
  console.log('Connected to the database');
});

app.get('/', (req, res) => {
  res.send('Server is Ready!'); // Send a simple response for the root route
});
app.use('/api', require('./routes/workoutRoutes')); // Use the workout routes for API requests

app.use('/user', require('./routes/userRoutes')); // Use the user routes for API requests

app.listen(PORT, () => {
  console.log(`Server is listening at http://localhost:${PORT}}`); // Log a message indicating the server is running
});
