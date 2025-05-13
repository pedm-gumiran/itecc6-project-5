const express = require('express');
const router = express.Router(); // Create a new router instance
const controller = require('../controllers/workoutController'); // Import the getAllWorkouts function from the controller

// Get all workouts
router.get('/workouts', controller.getAllWorkouts);

// Create a new workout
router.post('/createworkout', controller.createNewWorkout);

// Update Workout by Id
router.put('/workouts/:id', controller.updateWorkoutById);

//Delete workout by Id
router.delete('/workouts/:id', controller.deleteWorkoutById);

module.exports = router; // Export the router for use in other files
