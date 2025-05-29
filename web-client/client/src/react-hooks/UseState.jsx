//This is state that is used to manage the state of the counter app and the input field
//This is to change the vale of the input field and the counter app

import React, { useState } from 'react';
import Button from '../Components/Button';
import Inputs from '../Components/Inputs';
import { MdClear } from 'react-icons/md';

export default function UseState() {
  const [count, setCount] = useState(0);
  const [value, setValue] = useState('');

  //This is the functions for counter app
  const increment = () => {
    setCount(count + 1);
  };

  const decrement = () => {
    if (count > 0) {
      setCount(count - 1);
    }
  };
  const reset = () => {
    setCount(0);
  };

  const clearValue = () => {
    setValue('');
  };

  //This is the function for changing the input
  const handleChange = (e) => {
    setValue(e.target.value);
  };

  return (
    <div>
      {/* A counter app that changes the count color to red if it is 0  */}
      <div className="flex flex-col items-center justify-center ">
        <h1 className="text-2xl font-semibold">Counter App using useState()</h1>
        <p
          className={`text-4xl font-bold text-blue-500  ${
            count === 0 ? 'text-red-500 ' : 'text-blue-500'
          }`}
        >
          {count}
        </p>
        <div className="flex gap-4 mt-4">
          <Button label={'Increment'} onClick={increment} />
          <Button
            label={'Reset'}
            className={'bg-red-500 hover:bg-red-400'}
            onClick={reset}
          />
          <Button label={'Decrement'} onClick={decrement} />
        </div>
      </div>

      <div className="flex flex-col items-center justify-center mt-10">
        <div className="flex gap-2">
          <Inputs
            value={value}
            onChange={handleChange}
            className={'border-gray-500'}
            placeholder={'Enter Something.............'}
          />
          <Button
            className={
              'bg-white border-1 border-gray-300 w-19 hover:bg-red-100 '
            }
            icon={<MdClear size={40} color="red" />}
            onClick={clearValue}
          />
        </div>
        <p className="text-2xl">{value}</p>
      </div>
    </div>
  );
}
