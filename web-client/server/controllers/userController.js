const userModel = require('../models/userModel'); // Import the workout model to interact with the database
const asyncHandler = require('express-async-handler'); // Import the express-async-handler package to handle asynchronous requests
const bcrypt = require('bcryptjs');
//desc Get user username and password
//route POST /usercredentials
//access Public
const fetchUserCredentials = asyncHandler((req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res
      .status(400)
      .json({ message: 'Username and password are required' });
  }

  userModel.fetchUserCredentials(username, async (err, results) => {
    if (err) return res.status(500).json({ error: err });

    if (results.length > 0) {
      const user = results[0];

      const isMatch = await bcrypt.compare(password, user.Password); // compare plaintext with hashed

      if (isMatch) {
        // Generate token here if needed
        return res.status(200).json({ success: true, user }); // or include token
      } else {
        return res
          .status(401)
          .json({ success: false, message: 'Invalid credentials' });
      }
    } else {
      return res
        .status(401)
        .json({ success: false, message: 'User not found' });
    }
  });
});

//desc Create a new workout
//route POST /createworkouts
//access Public
const createNewUser = asyncHandler((req, res) => {
  const { fullname, email, username, password } = req.body;

  if (!username || !password)
    return res
      .status(400)
      .json({ message: 'Username and password are required' });

  // Hash password
  const hashedPassword = bcrypt.hashSync(password, 10); // 10 = salt rounds

  userModel.createNewUser(
    fullname,
    email,
    username,
    hashedPassword,
    (err, result) => {
      if (err) return res.status(500).json({ error: err });
      res
        .status(201)
        .json({ success: true, message: 'User created successfully' });
    },
  );
});

module.exports = {
  fetchUserCredentials,
  createNewUser,
}; // Export the functions for use in other files
