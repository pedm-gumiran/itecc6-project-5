import React from 'react';

export default function Header({ className }) {
  return (
    <div className={` flex flex-col gap-0 my-3  ${className}`}>
      <h1 className={`text-[#4CAF50] text-3xl text-center my-5 font-bold `}>
        🏋️ Fitness Workout Log
      </h1>
      <span className="text-sm font-semibold text-amber-900 text-center mt-[-20px]">
        "Log your Progress, Unlock your Potentials."
      </span>
    </div>
  );
}
