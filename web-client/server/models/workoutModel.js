const connection = require('../dbconfig/db');

//Get all workouts
exports.getAll = (callback) => {
  connection.query('SELECT * FROM workouts', callback);
};

//Create a new workouts
exports.createNewWorkout = (workoutData, callback) => {
  
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
  } = workoutData;

  // Insert the new workout into the database
  connection.query(
    'INSERT INTO workouts (Exercise, Date, Sets, Reps, Weight, StartTime, EndTime, Duration, Notes) VALUES (?,?,?,?,?,?,?,?,?)',
    [exercise, date, sets, reps, weight, startTime, endTime, duration, notes],
    (err, result) => {
      if (err) {
        console.error('Error inserting workout:', err);
        return callback(err, null);
      }

      callback(null, result);
    },
  );
};

exports.updateWorkoutById = (id, workout, callback) => {
  const query = `
    UPDATE workouts
    SET exercise = ?, date = ?, sets = ?, reps = ?, weight = ?, startTime = ?, endTime = ?, duration = ?, notes = ?
    WHERE Id = ?`;

  const values = [
    workout.exercise,
    workout.date,
    workout.sets,
    workout.reps,
    workout.weight,
    workout.startTime,
    workout.endTime,
    workout.duration,
    workout.notes,
    id,
  ];

  connection.query(query, values, callback);
};

//Delete a workout by ID
exports.deleteWorkoutById = (id, callback) => {
  connection.query('DELETE FROM workouts WHERE Id=?', [id], callback);
};
