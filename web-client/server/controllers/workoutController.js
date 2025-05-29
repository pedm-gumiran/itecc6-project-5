const workoutModel = require('../models/workoutModel'); // Import the workout model to interact with the database
const asyncHandler = require('express-async-handler'); // Import the express-async-handler package to handle asynchronous requests

//desc Get all workouts
//route GET /workouts
//access Public
const getAllWorkouts = asyncHandler((req, res) => {
  workoutModel.getAll((err, results) => {
    if (err) return res.status(500).json({ error: err });
    res.status(200).json(results);
  });
});

//desc Create a new workout
//route POST /createworkouts
//access Public
const createNewWorkout = asyncHandler((req, res) => {
  const {
    exercise,
    date,
    sets,
    reps,
    weight,
    startTime,
    endTime,
    duration,
    notes,
  } = req.body; // Destructure the request body

  // Call the model function, passing workoutData and the callback
  workoutModel.createNewWorkout(
    { exercise, date, sets, reps, weight, startTime, endTime, duration, notes },
    (err, result) => {
      if (err) {
        // Properly handle errors
        console.error(err);
        return res.status(500).json({ error: err.message });
      }
      // Successfully created a workout
      res.status(201).json({ message: 'Workout created successfully' });
    },
  );
});

//desc Update workout by Id
//route  PUT /updateWorkouts/:id
//access Public
const updateWorkoutById = asyncHandler((req, res) => {
  const { id } = req.params;
  let { date } = req.body; // Extract the date from request body

  // Validate workout ID
  if (!id) {
    return res.status(400).json({ error: 'Workout ID is required.' });
  }

  // If the date is in MM/DD/YYYY format, convert to YYYY-MM-DD for MySQL compatibility
  if (date && date.includes('/')) {
    const [month, day, year] = date.split('/');
    date = `${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')}`;
  }

  // Update the workout data with the formatted date
  const workout = {
    ...req.body, // Include the rest of the workout data
    date, // Set the formatted date
  };

  // Call the model to update workout in the database
  workoutModel.updateWorkoutById(id, workout, (err, result) => {
    if (err) {
      console.error('Error updating workout:', err);
      return res.status(500).json({ error: 'Failed to update workout.' });
    }

    // If no rows were affected, the workout with the given ID wasn't found
    if (result.affectedRows === 0) {
      return res.status(404).json({ message: 'Workout not found.' });
    }

    // Send success response if the workout is updated
    res.status(200).json({ message: 'Workout updated successfully.' });
  });
});

//desc Delete workout by Id
//route DELETE /deleteWorkouts/:id
//access Public
const deleteWorkoutById = asyncHandler((req, res) => {
  const { id } = req.params;

  // Delete workout from the database
  workoutModel.deleteWorkoutById(id, (err, result) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    if (result.affectedRows === 0) {
      return res.status(404).json({ message: 'Workout not found' });
    }
    res.status(200).json({ message: 'Workout deleted successfully' });
  });
});

module.exports = {
  getAllWorkouts,
  deleteWorkoutById,
  createNewWorkout,
  updateWorkoutById,
}; // Export the functions for use in other files
