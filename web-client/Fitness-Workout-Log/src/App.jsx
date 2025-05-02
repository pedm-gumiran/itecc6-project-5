import React, { useState } from 'react';
import Inputs from './Components/Inputs.jsx';
import Dropdown from './Components/Dropdown.jsx';
import Buttons from './Components/Buttons.jsx';
import Cards from './Components/Cards.jsx';
import WorkoutList from './Components/WorkoutList.jsx';
import Header from './Components/Header.jsx';
import ProgressBar from './Components/ProgressBar.jsx';
import AddWorkout from './Components/AddWorkout.jsx';

export default function App() {
  const [workouts, setWorkouts] = useState([]);
  // This is for declaration of the variables
  const filterType = [
    { value: 'All Types', label: 'All Types' },
    { value: 'Strength', label: 'Strength' },
    { value: 'Agility', label: 'Agility' },
    { value: 'Endurance', label: 'Endurance' },
    { value: 'Cardiovascular', label: 'Cardiovascular' },
  ];

  // This is for the Actions Functions
  function handleFilter() {
    alert('Filtering........');
  }
  return (
    <div className="max-w-[95%] mx-auto bg-[var(--card-bg)] p-[25px] rounded-[10px] shadow-[0_2px_15px_rgba(0,0,0,0.1)]">
      <ProgressBar />
      <Header
        className={
          'sticky top-0 sm:top-0 bg-white h-30 sm:h-20 shadow-gray-700 '
        }
      />
      <AddWorkout setWorkouts={setWorkouts} />

      {/* Statistics */}
      <div className="grid gap-3 mt-5 grid-cols-2 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-3 bg-gray-200 p-3 rounded-[6px]">
        <Cards title={'Total Workout'} data={'10'} />
        <Cards title={'Total Volume(kg)'} data={'200'} />
        <Cards title={'Total Volume(kg)'} data={'200'} />
      </div>
      <h1>This is where the Chart will be placed</h1>
      <div className="  mt-5 bg-gray-200 p-4 rounded-[8px] ">
        <h3 className="text-[#4CAF50] text-2xl text-center mb-5 font-bold">
          🔍 Filter Workouts
        </h3>

        <div className="my-3 grid sm:grid-cols-1 md:grid-cols-3 gap-3">
          <div className="flex flex-col gap-2">
            <label className="text-xl" htmlFor="startDate">
              From:
            </label>
            <Inputs type={'date'} className={'bg-white'} />
          </div>
          <div className="flex flex-col gap-2">
            <label className="text-xl" htmlFor="endDate">
              To:
            </label>
            <Inputs type={'date'} className={'bg-white'} />
          </div>
          <div className="flex flex-col gap-2">
            <label className="text-xl">Type:</label>
            <Dropdown
              options={filterType}
              className={'bg-white  w-60 sm:w-100 md:w-50 lg:w-70 '}
            />
          </div>
        </div>
        <div className=" flex flex-col sm:flex-row gap-3 mt-5">
          <Buttons
            label={'Apply Filter'}
            className={'max-w-100 bg-green-600 hover:bg-green-500 sm:max-w-50'}
            onClick={() => handleFilter()}
          />
          <Buttons
            label={'Clear Filter'}
            className={'max-w-100 bg-red-500 hover:bg-red-600 sm:max-w-50'}
          />
        </div>
      </div>
      <div>
        <h3 className="text-[#4CAF50] text-2xl mt-5 font-bold">
          📋 Workout History
        </h3>
        <div className="my-2">
          <WorkoutList workouts={workouts} />
        </div>
        <div className=" flex flex-col sm:flex-row gap-3 mt-5">
          <Buttons
            label={'  📤 Export Data'}
            className={'max-w-120 bg-gray-600 hover:bg-gray-500 sm:w-60'}
          />
          <Buttons
            label={'🗑️ Clear All Data'}
            className={'max-w-120 bg-red-500 hover:bg-red-600 sm:w-60'}
          />
        </div>
      </div>
    </div>
  );
}
