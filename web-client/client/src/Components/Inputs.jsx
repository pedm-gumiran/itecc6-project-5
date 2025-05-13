import React from 'react';

export default function Inputs({
  placeholder,
  type,
  value,
  onChange,
  min,
  max,
  className,
  name
}) {
  const formatValue = () => {
    if (type === 'date' && value) {
      const date = new Date(value);
      return date.toISOString().split('T')[0];
    }
    return value;
  };
  return (
    <input
      className={`p-6 text-xl border-1 h-1   bg-[#cdc7c7e9] border-gray-300 max-w-full  rounded-[4px]  focus:outline-blue-700 focus:outline-3 ${className}`}
      type={type}
      placeholder={placeholder}
      value={formatValue()}
      onChange={onChange}
      min={min}
      max={max}
      name={name}
      required
    />
  );
}
