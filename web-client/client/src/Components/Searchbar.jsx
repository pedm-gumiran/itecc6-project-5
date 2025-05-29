import React from 'react';
import Inputs from './Inputs';
import { IoIosSearch } from 'react-icons/io';

export default function Searchbar({ onChange }) {
  return (
    <div className="sticky top-[9rem] z-40 bg-[#1E1E1E] px-4 py-2">
      <div className="flex items-center gap-3 flex-wrap">
        <IoIosSearch className="text-white text-3xl md:text-4xl" />
        <Inputs
          placeholder="Filter workouts by date and exercise name"
          className="flex-1 min-w-[200px] md:min-w-[300px] lg:min-w-[400px] text-black p-2 rounded "
          onChange={onChange}
        />
      </div>
    </div>
  );
}
