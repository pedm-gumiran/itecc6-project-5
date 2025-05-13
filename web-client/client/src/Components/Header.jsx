import React from 'react';
import Logo from '../assets/Logo.png';

export default function Header({ title }) {
  return (
    <div className="sticky top-0 bg-[#1E1E1E] z-50 p-2">
      <div className="flex justify-end">
        <img
          src={Logo}
          alt="This is the logo"
          className="rounded-[1rem] w-20 h-20"
        />
      </div>
      <hr className="border-white border w-full" />
      <h1 className="text-center p-1 text-[30px] text-white">{title}</h1>
    </div>
  );
}
