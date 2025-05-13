import React, { useEffect, useState } from 'react';
import Header from '../Components/Header';
import Button from '../Components/Button';
import DurationChart from '../Components/DurationChart';
import { exportToCSV } from '../utilities/ExporttoCSV';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';

export default function WorkoutDetails() {
  const { state } = useLocation();
  const navigate = useNavigate();
  const { id } = useParams();

  const [workout, setWorkout] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!state) {
      // Fetch from API using id in URL
      axios
        .get(`/api/workouts/${id}`)
        .then((res) => {
          setWorkout(res.data);
        })
        .catch((err) => {
          console.error('Failed to fetch workout:', err);
          toast.error('Workout not found');
          navigate('/dashboard');
        })
        .finally(() => setLoading(false));
    } else {
      setWorkout(state);
      setLoading(false);
    }
  }, [id, state, navigate]);

  const details = [
    { label: 'Exercise:', value: workout?.exercise },
    { label: 'Date:', value: workout?.date },
    { label: 'Sets:', value: workout?.sets },
    { label: 'Reps:', value: workout?.reps },
    { label: 'Weight:', value: workout?.weight },
    { label: 'Start Time:', value: workout?.startTime },
    { label: 'End Time:', value: workout?.endTime },
    { label: 'Duration:', value: workout?.duration },
    { label: 'Notes:', value: workout?.notes },
  ];

  const handleDelete = () => {
    toast(
      ({ closeToast }) => (
        <div>
          <p>Are you sure you want to delete this workout?</p>
          <div className="flex justify-end gap-4 mt-2">
            <button
              onClick={() => {
                axios
                  .delete(`/api/workouts/${id}`)
                  .then(() => {
                    closeToast();
                    toast.success('Workout deleted successfully!');
                    navigate('/dashboard');
                  })
                  .catch((err) => {
                    closeToast();
                    toast.error('Failed to delete workout.');
                    console.error(err);
                  });
              }}
              className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
            >
              Yes
            </button>
            <button
              onClick={closeToast}
              className="bg-gray-300 text-black px-3 py-1 rounded hover:bg-gray-400"
            >
              No
            </button>
          </div>
        </div>
      ),
      {
        autoClose: false,
        closeOnClick: false,
        draggable: false,
        closeButton: false,
      },
    );
  };

  const handleExport = () => {
    const formattedData = details.map((item) => ({
      Field: item.label,
      Value: item.value,
    }));

    exportToCSV('workout-details.csv', formattedData);
  };

  if (loading) {
    return <div className="text-white p-4">Loading workout details...</div>;
  }

  return (
    <div className="p-10">
      <Header title={'Workout Details'} />
      <div className="w-full bg-[#06060696] text-white p-4 rounded-[10px] border border-gray-400 shadow-md">
        <div>
          {details.map((detail, index) => (
            <div key={index} className="flex flex-wrap gap-2 mb-2">
              <h2 className="font-bold text-lg md:text-xl lg:text-2xl">
                {detail.label}
              </h2>
              <p className="text-lg md:text-xl lg:text-2xl">{detail.value}</p>
            </div>
          ))}
        </div>
        <DurationChart
          exercise={workout?.exercise}
          duration={workout?.duration}
        />
        <div className="flex  flex-col sm:flex-row md:flex-row  lg:flex-row xl:flex-row gap-2 mt-10">
          <Button
            onClick={handleExport}
            className="w-full h-10 bg-[#F3F5FA] text-base md:text-lg font-bold hover:bg-[#abadb3] text-black"
            label={'Export'}
          />
          <Button
            to={`/editworkout/${id}`}
            state={workout}
            className="w-full h-10 bg-[#F3F5FA] text-base md:text-lg font-bold hover:bg-[#abadb3] text-black"
            label={'Edit'}
          />
          <Button
            onClick={handleDelete}
            className="w-full h-10 bg-[#F3F5FA] text-base md:text-lg font-bold hover:bg-[#abadb3] text-black"
            label={'Delete'}
          />
          <Button
            to="/dashboard"
            className="w-full h-10 bg-[#F3F5FA] text-base md:text-lg font-bold hover:bg-[#abadb3] text-black"
            label={'Go Back'}
          />
        </div>
      </div>
    </div>
  );
}
