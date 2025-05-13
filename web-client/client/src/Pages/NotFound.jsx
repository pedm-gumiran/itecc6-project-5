import React from 'react';
import { Link } from 'react-router-dom';
import monkey from '../assets/monkey404.png';
import Button from '../Components/Button';
import { IoMdArrowRoundBack } from 'react-icons/io';

export default function NotFound() {
  return (
    <div className="flex flex-col justify-center items-center min-h-screen font-sans p-4 text-center bg-[#1E1E1E]">
      <div className="flex flex-col justify-center items-center">
        <h1 className="text-[100px] text-red-500 underline sm:text-[200px] ">
          404
        </h1>
        <h2 className="text-[25px] text-white font-bold lg:text-[40px]">
          Oooops! The page you are looking for is not found{' '}
        </h2>
        <img src={monkey} alt="404" className="  w-[10rem] h-[10rem] mt-2" />
      </div>
      <Link to={'/'}>
        <Button className={'bg-white font-bold '} label={'Go Back'}  icon={<IoMdArrowRoundBack size={20}/>} />
      </Link>
    </div>
  );
}
