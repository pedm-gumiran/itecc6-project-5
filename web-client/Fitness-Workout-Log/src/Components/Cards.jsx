import React from 'react';

export default function Cards({title,data}) {
  return (
    <div className="text-center p-[5px] bg-white rounded-[10px] border-1 border-gray-200 w-full shadow-gray-500">
      <h1 className="text-[40px] font-bold text-green-600">{data}</h1>
      <h2 className='text-[18px]'>{title}</h2>
    </div>
  );
}
