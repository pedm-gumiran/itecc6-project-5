import React from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from 'recharts';

export default function DurationChart({ exercise, duration }) {
  const data = [
    {
      name: exercise,
      duration: parseInt(duration) || 0,
    },
  ];

  return (
    <div className="w-full h-[300px] bg-white p-4 rounded shadow-md my-4">
      <h2 className="text-center font-bold mb-4 text-lg">
        Workout Duration (mins)
      </h2>
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis
            label={{ value: 'Minutes', angle: -90, position: 'insideLeft' }}
          />
          <Tooltip />
          <Bar dataKey="duration" fill="#82ca9d" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
