import React from 'react'

export default function Inputs({placeholder,type,value, onChange,min,className}) {
  return (
 <input className={`p-6 text-xl border-1 h-5 border-gray-300 max-w-full  rounded-[6px]  focus:outline-green-500 focus:outline-2 ${className}` }type={type} placeholder={placeholder} value={value} onChange={onChange} min={min} />
  )
}
