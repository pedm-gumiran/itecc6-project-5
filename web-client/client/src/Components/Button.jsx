import React from 'react';
import { Link } from 'react-router-dom';

export default function Button({ label, icon, onClick, className, to, state }) {
  const design = `flex justify-center items-center  p-5 rounded-lg shadow   gap-2 ${className}`;
  if (to) {
    return (
      <Link to={to} state={state} className={design}>
        {icon} {label}
      </Link>
    );
  }
  return (
    <button onClick={onClick} className={design}>
      {icon}
      {label}
    </button>
  );
}
