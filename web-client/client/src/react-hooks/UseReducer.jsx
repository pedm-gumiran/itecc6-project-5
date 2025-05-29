import React, { useReducer } from 'react';
import Button from '../Components/Button';
import { BiReset } from 'react-icons/bi';
const reducer = (state, action) => {
  switch (action.type) {
    case 'increment':
      return { ...state, count: state.count + 1, showText: state.showText };
    case 'toggleText':
      return { ...state, count: state.count, showText: !state.showText };
    case 'decrement':
      return { ...state, count: state.count - 1, showText: state.showText };
    case 'reset':
      return { ...state, count: 0, showText: state.showText };
    default:
      return state;
  }
};

export default function UseReducer() {
  const [state, dispatch] = useReducer(reducer, { count: 0, showText: true });

  return (
    <div className="flex flex-col items-center justify-center mt-10 ">
      <h1 className="text-2xl font-semibold">Alternate Counting App using useReducer()</h1>
      <h2 className={`text-4xl font-semibold  m-3 ${state.count===0 ? 'text-red-500':state.count>0 ?'text-blue-500':'text-green-500'}`}>{state.count}</h2>
      <div className="flex gap-4">
        <Button
          label={'Increment'}
          onClick={() => {
            dispatch({ type: 'increment' });
            dispatch({ type: 'toggleText' });
          }}
        />
        <Button
          className={'bg-white border-none hover:bg-red-100'}
          icon={<BiReset size={35} color="red" />}
          onClick={() => {
            dispatch({ type: 'reset' });
            dispatch({ type: 'toggleText' });
          }}
        />

        <Button
          label={'Decrement'}
          className={'bg-red-500 hover:bg-red-400'}
          onClick={() => {
            dispatch({ type: 'decrement' });
            dispatch({ type: 'toggleText' });
          }}
        />
      </div>
      <div className="flex flex-col">
        {state.showText && (
          <p className="text-3xl">
            Previous Count:
            <span className="text-red-500 text-3xl ">{state.count - 1}</span>
          </p>
        )}
      </div>
    </div>
  );
}
