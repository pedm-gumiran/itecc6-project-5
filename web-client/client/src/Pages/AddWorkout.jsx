import { useState } from 'react';
import Header from '../Components/Header';
import Inputs from '../Components/Inputs';
import Button from '../Components/Button';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

export default function AddWorkout() {
  const today = new Date().toISOString().split('T')[0];
  const navigate = useNavigate();

  const [form, setForm] = useState({
    exercise: '',
    date: today,
    sets: '',
    reps: '',
    weight: '',
    startTime: '',
    endTime: '',
    duration: '',
    notes: '',
  });
  const resetFields = () => {
    setForm({
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
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    // Auto-calculate duration when time fields are updated
    const updatedForm = { ...form, [name]: value };

    if (name === 'startTime' || name === 'endTime') {
      const { startTime, endTime } = updatedForm;

      if (startTime && endTime) {
        const start = new Date(`1970-01-01T${startTime}`);
        const end = new Date(`1970-01-01T${endTime}`);

        if (end > start) {
          const diffMs = end - start;
          const durationMinutes = Math.floor(diffMs / 60000);
          updatedForm.duration = `${durationMinutes} mins`;
        } else {
          updatedForm.duration = 'Invalid time';
        }
      }
    }

    setForm(updatedForm);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post('/api/createworkout', form);

      // Check the message property from the response
      if (res.data.message === 'Workout created successfully') {
        toast.success('Workout created successfully!');
        resetFields();
        navigate('/dashboard');
      } else {
        toast.error('Workout creation failed.');
      }
    } catch (err) {
      console.error(err);
    }
  };

  const fields = [
    {
      label: 'Exercise',
      name: 'exercise',
      placeholder: 'Enter exercise name',
      type: 'text',
    },
    {
      label: 'Sets',
      name: 'sets',
      placeholder: 'e.g., 3',
      type: 'number',
      min: 0,
      max: 100,
    },
    {
      label: 'Reps',
      name: 'reps',
      placeholder: 'e.g., 12',
      type: 'number',
      min: 0,
      max: 100,
    },
    {
      label: 'Weight',
      name: 'weight',
      placeholder: 'e.g., 50kg',
      type: 'number',
    },
    {
      label: 'Start Time',
      name: 'startTime',
      placeholder: 'Start',
      type: 'time',
    },
    { label: 'End Time', name: 'endTime', placeholder: 'End', type: 'time' },
    {
      label: 'Duration',
      name: 'duration',
      placeholder: 'Auto-calculated',
      type: 'text',
      readOnly: true,
    },
    {
      label: 'Notes',
      name: 'notes',
      placeholder: 'Your notes here...',
      type: 'text',
    },
  ];

  return (
    <div className="p-10">
      <Header title={'Add Workout'} />
      <form
        onSubmit={handleSubmit}
        className="w-full bg-[#06060696] text-white p-6 rounded-[10px] border border-gray-400 shadow-md space-y-4"
      >
        {fields.map((field, id) => (
          <div
            key={id}
            className="flex flex-col md:flex-row md:items-center gap-2"
          >
            <label className="w-full md:w-40 font-bold text-lg md:text-xl lg:text-2xl">
              {field.label}:
            </label>
            <Inputs
              name={field.name}
              placeholder={field.placeholder}
              type={field.type}
              min={field.min}
              max={field.max}
              readOnly={field.readOnly}
              value={form[field.name]}
              onChange={handleChange}
              className="flex p-2 md:flex-1 text-black rounded"
            />
          </div>
        ))}

        <div className="flex flex-col md:flex-row gap-4 pt-4">
          <Button
            type="submit"
            className="w-full h-10 bg-[#F3F5FA] text-base md:text-lg font-bold hover:bg-[#abadb3] text-black"
            label={'Add'}
          />
          <Button
            to="/dashboard"
            className="w-full h-10 bg-[#F3F5FA] text-base md:text-lg font-bold hover:bg-[#abadb3] text-black"
            label={'Go Back'}
          />
        </div>
      </form>
    </div>
  );
}
