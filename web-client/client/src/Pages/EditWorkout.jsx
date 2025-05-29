import React, { useEffect, useState } from 'react';
import Header from '../Components/Header';
import Inputs from '../Components/Inputs';
import Button from '../Components/Button';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';

export default function EditWorkout() {
  const { state } = useLocation();
  const { id } = useParams();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    exercise: '',
    date: '',
    sets: '',
    reps: '',
    weight: '',
    startTime: '',
    endTime: '',
    duration: '',
    notes: '',
  });

  // Load workout data
  useEffect(() => {
    if (state) {
      setFormData(state);
    } else {
      // Fallback: fetch if no state passed
      axios
        .get(`/api/workouts/${id}`)
        .then((res) => setFormData(res.data))
        .catch(() => toast.error('Failed to load workout.'));
    }
  }, [id, state]);

  const handleChange = (e, fieldName) => {
    const { value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [fieldName]: value,
    }));
  };

  const handleUpdate = () => {
    axios
      .put(`/api/workouts/${id}`, formData)

      .then(() => {
        toast.success('Workout updated!');
        console.log('Updating workout with:', formData);
        navigate(`/workoutdetails/${id}`, { state: formData });
      })
      .catch(() => toast.error('Update failed.'));
  };

  const fields = [
    { label: 'Exercise', name: 'exercise' },
    { label: 'Date', name: 'date' },
    { label: 'Sets', name: 'sets' },
    { label: 'Reps', name: 'reps' },
    { label: 'Weight', name: 'weight' },
    { label: 'Start Time', name: 'startTime' },
    { label: 'End Time', name: 'endTime' },
    { label: 'Duration', name: 'duration' },
    { label: 'Notes', name: 'notes' },
  ];

  return (
    <div className="p-10">
      <Header title={'Edit Workout'} />
      <div className="w-full bg-[#06060696] text-white p-6 rounded-[10px] border border-gray-400 shadow-md space-y-4">
        {fields.map((field, i) => (
          <div
            key={i}
            className="flex flex-col md:flex-row md:items-center gap-2"
          >
            <label className="w-full md:w-40 font-bold text-lg md:text-xl lg:text-2xl">
              {field.label}:
            </label>
            <Inputs
              value={formData[field.name]}
              onChange={(e) => handleChange(e, field.name)}
              placeholder={field.label}
              className="flex p-2 md:flex-1 text-black rounded"
            />
          </div>
        ))}

        <div className="flex flex-col md:flex-row gap-4 pt-4">
          <Button
            onClick={handleUpdate}
            className="w-full h-10 bg-[#F3F5FA] text-base md:text-lg font-bold hover:bg-[#abadb3] text-black"
            label={'Update'}
          />
          <Button
            to="/dashboard"
            className="w-full h-10 bg-[#F3F5FA] text-base md:text-lg font-bold hover:bg-[#abadb3] text-black"
            label={'Cancel'}
          />
        </div>
      </div>
    </div>
  );
}
