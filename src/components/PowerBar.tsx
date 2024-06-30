import React from 'react'

const PowerBar = ({ value }: { value: number }) => {
  return (
    <div className="relative h-[20px] w-64 rounded-full border bg-slate-50">
        <div className="bg-slate-600 h-full rounded-full" style={{ width: `${value}%` }}></div>
    </div>
  )
}

export default PowerBar