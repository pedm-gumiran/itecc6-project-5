const express = require('express');
const router = express.Router(); // Create a new router instance
const controller = require('../controllers/userController'); // Import the getAllWorkouts function from the controller


// Post user username and password to authenticate
router.post('/userlogin', controller.fetchUserCredentials);

// Create a new workout
router.post('/createuser', controller.createNewUser);



module.exports = router; // Export the router for use in other files
