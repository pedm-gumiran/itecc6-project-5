import React, { useEffect, useState } from 'react';
import Header from '../Components/Header';
import Cards from '../Components/Cards';
import Searchbar from '../Components/SearchBAR.JSX';
import axios from 'axios';

export default function Dashboard() {
  const [workouts, setWorkouts] = useState([]);
  const [filteredWorkouts, setFilteredWorkouts] = useState([]);

  useEffect(() => {
    axios
      .get('/api/workouts')
      .then((res) => {
        const convert = res.data.map((item) => ({
          id: item.Id,
          exercise: item.Exercise,
          date: new Date(item.Date).toLocaleDateString(), // e.g. "5/13/2025"
          sets: item.Sets,
          reps: item.Reps,
          weight: item.Weight,
          startTime: item.StartTime,
          endTime: item.EndTime,
          duration: item.Duration,
          notes: item.Notes,
        }));
        setWorkouts(convert);
        setFilteredWorkouts(convert);
      })
      .catch((err) => console.error(err));
  }, []);

  const handleSearch = (value) => {
    const search = value.trim().toLowerCase();

    const filtered = workouts.filter(
      (workout) =>
        workout.date.toLowerCase().includes(search) ||
        workout.exercise.toLowerCase().includes(search),
    );
    setFilteredWorkouts(filtered);
  };

  return (
    <div className="p-10">
      <Header title={'Dashboard'} />
      <Searchbar onChange={(e) => handleSearch(e.target.value)} />

      {workouts.length === 0 ? (
        <p className="text-center mt-20 text-2xl font-semibold text-red-500">
          No workouts created yet
        </p>
      ) : filteredWorkouts.length === 0 ? (
        <p className="text-center mt-20 text-2xl font-semibold text-red-500">
          No workout found related to the search key
        </p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-6">
          {filteredWorkouts.map((workout) => (
            <Cards
              key={workout.id}
              id={workout.id}
              exercise={workout.exercise}
              date={workout.date}
              weight={workout.weight}
              sets={workout.sets}
              reps={workout.reps}
              startTime={workout.startTime}
              endTime={workout.endTime}
              duration={workout.duration}
              notes={workout.notes}
            />
          ))}
        </div>
      )}
    </div>
  );
}
