import React from 'react';

export default function Notes({ className,onChange }) {
  return (
    <textarea
      className={` p-1 text-xl border-1  h-12 border-gray-300 w-full  rounded-[6px]  focus:outline-green-500 focus:outline-2 ${className}`}
      placeholder="Note"
      rows={3}
     required
     onChange={onChange}></textarea>
  );
}
