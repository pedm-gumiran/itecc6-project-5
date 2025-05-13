import React from 'react';
import Button from './Button';

export default function Cards({
  id,
  exercise,
  date,
  weight,
  sets,
  reps,
  startTime,
  endTime,
  duration,
  notes,
}) {
  return (
    <div className="w-full bg-[#06060696] text-white p-4 rounded-[10px] border border-gray-400 shadow-md">
      <div className="flex flex-wrap gap-2 mb-2">
        <h2 className="font-bold text-lg md:text-xl lg:text-2xl">Exercise:</h2>
        <p className="text-lg md:text-xl lg:text-2xl">{exercise}</p>
      </div>
      <div className="flex flex-wrap gap-2 mb-2">
        <h2 className="font-bold text-lg md:text-xl lg:text-2xl">Date:</h2>
        <p className="text-lg md:text-xl lg:text-2xl">{date}</p>
      </div>
      <div className="flex flex-wrap gap-2 mb-4">
        <h2 className="font-bold text-lg md:text-xl lg:text-2xl">Weight:</h2>
        <p className="text-lg md:text-xl lg:text-2xl">{weight}</p>
      </div>

      <Button
        to={`/workoutdetails/${id}`}
        state={{
          exercise,
          date,
          weight,
          sets,
          reps,
          startTime,
          endTime,
          duration,
          notes,
        }}
        className="w-full h-10 bg-[#F3F5FA] text-base   font-bold hover:bg-[#abadb3] text-black"
        label={'View Details'}
      />
    </div>
  );
}
