import React, { useState } from 'react';
import Notes from './Notes.jsx';
import Inputs from './Inputs.jsx';
import Dropdown from './Dropdown.jsx';
import Buttons from './Buttons.jsx';
import axios from 'axios';

export default function AddWorkout({ setWorkouts }) {
  const [formData, setFormData] = useState({
    exercise: '',
    sets: '',
    reps: '',
    weight: '',
    total_weight: '',
    workout_date: '',
    workout_type: '',
    notes: '',
  });

  const TotalWeight = (sets, reps, weight) => {
    return sets * reps * weight;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const calculatedTotalWeight = TotalWeight(
      formData.sets,
      formData.reps,
      formData.weight,
    ); // Calculate total_weight

    try {
      // Make the POST and GET requests asynchronously in parallel
      await Promise.all([
        axios.post('/addworkouts', {
          ...formData,
          total_weight: calculatedTotalWeight,
        }),
        axios.get('/getworkouts')
      ]).then(([, updatedWorkouts]) => {
        // Update the workouts list after both operations complete
        setWorkouts(updatedWorkouts.data);

        // Reset form data
        setFormData({
          exercise: '',
          sets: '',
          reps: '',
          weight: '',
          total_weight: '',
          workout_date: '',
          workout_type: '',
          notes: '',
        });

        alert('Workout added and list updated successfully!');
      });
    } catch (error) {
      console.error('Error submitting form:', error);
    }
  };


  const workoutType = [
    { value: '', label: 'Select Type' },
    { value: 'Strength', label: 'Strength' },
    { value: 'Agility', label: 'Agility' },
    { value: 'Endurance', label: 'Endurance' },
    { value: 'Cardiovascular', label: 'Cardiovascular' },
  ];

  return (
    <form onSubmit={handleSubmit}>
      <div className="grid grid-cols-1 md:grid-cols-4 md:grid-rows-2 gap-3">
        <Inputs
          type="text"
          placeholder="Exercise"
          value={formData.exercise}
          onChange={(e) =>
            setFormData({ ...formData, exercise: e.target.value })
          }
        />
        <Inputs
          type="number"
          placeholder="Sets"
          min="0"
          value={formData.sets}
          onChange={(e) => setFormData({ ...formData, sets: e.target.value })}
        />
        <Inputs
          type="number"
          placeholder="Reps"
          min="0"
          value={formData.reps}
          onChange={(e) => setFormData({ ...formData, reps: e.target.value })}
        />
        <Inputs
          type="number"
          placeholder="Weight"
          min="0"
          value={formData.weight}
          onChange={(e) => setFormData({ ...formData, weight: e.target.value })}
        />
        <Inputs
          type="date"
          value={formData.workout_date}
          onChange={(e) =>
            setFormData({ ...formData, workout_date: e.target.value })
          }
        />
        <Dropdown
          options={workoutType}
          value={formData.workout_type}
          onChange={(e) =>
            setFormData({ ...formData, workout_type: e.target.value })
          }
        />
        <Notes
          value={formData.notes}
          onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
        />
      </div>
      <div className="flex gap-3 mt-5">
        <Buttons
          type="submit"
          label="➕Add Workout"
          className="w-50 bg-green-600 hover:bg-green-500"
        />
        <Buttons
          type="button"
          label="❌ Cancel"
          className="w-50 bg-red-700 hover:bg-red-600 hidden"
        />
      </div>
    </form>
  );
}
