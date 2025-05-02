import React from 'react';

export default function Dropdown({options,className}) {
  return (
    <select
      className={`p-2 text-xl border-1 h-12 border-gray-300 w-full rounded-[6px]  focus:outline-green-400 focus:outline-2 ${className}`}
    >
     {options.map((option)=>(
      <option key={option.value} value={option.value}>{option.label}</option>
     ))}
    </select>
  );
}
