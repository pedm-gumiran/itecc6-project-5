import React, { useEffect, useState } from 'react';
import Buttons from './Buttons';
import axios from 'axios';

export default function WorkoutList() {
  const [workoutList, setWorkoutList] = useState([]);

  const fetchWorkouts = async () => {
    try {
      const res = await axios('/getworkouts'); // axios returns response with `data`
      setWorkoutList(res.data); // Use res.data directly
    } catch (error) {
      console.error('Error fetching workoutLists:', error);
    }
  };
  useEffect(() => {
    fetchWorkouts();
  }, []);

  if (!workoutList || workoutList.length === 0) {
    return <h1>No workouts logged yet. Add your first workout above!</h1>;
  } else {
    return (
      <div>
        {workoutList.map((workout, i) => (
          <div
            className="border-b-1 border-b-gray-400 grid sm:grid-cols-2"
            key={i}
          >
            <div>
              <h1 className="text-[20px] font-semibold">{workout.exercise}</h1>
              <div className="text-[12px]">
                {workout.sets}x{workout.reps}|{workout.weight}kg|
                {workout.total_weight}kg Total
              </div>
              <small className="text-12">
                {workout.workout_date}|{workout.workout_type}|{workout.notes}
              </small>
            </div>
            <div className="flex gap-3 my-3  justify-end">
              <Buttons
                icon={'✏️'}
                label={'Edit'}
                className={' bg-green-600 hover:bg-green-500 w-20  h-2'}
              />
              <Buttons
                icon={'🗑️'}
                label={'Delete'}
                className={' bg-red-500 hover:bg-red-600 h-2'}
              />
            </div>
          </div>
        ))}
      </div>
    );
  }
}
