import React from 'react';

export default function Button({ label, icon, onClick, className }) {
  return (
    <button
      onClick={onClick}
      className={`flex justify-center items-center  bg-blue-600 hover:bg-blue-400 p-6 rounded-lg shadow text-lg font-semibold text-white gap-2 h-3 ${className}`}
    >
      {icon}
      {label}
    </button>
  );
}
