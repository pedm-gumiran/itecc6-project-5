const connection = require('../dbconfig/db');

//Get usercredentials
// Get user by username only (not password)
exports.fetchUserCredentials = (username, callback) => {
  connection.query(
    'SELECT * FROM users WHERE Username = ?',
    [username],
    callback,
  );
};

//Create a new workouts
// models/userModel.js
exports.createNewUser = (
  fullname,
  email,
  username,
  hashedPassword,
  callback,
) => {
  connection.query(
    'INSERT INTO users (Fullname,Email,Username, Password) VALUES (? , ? , ? , ?)',
    [fullname, email, username, hashedPassword],
    callback,
  );
};
