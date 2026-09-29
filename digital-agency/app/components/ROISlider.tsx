"use client";

import React, { useState } from "react";

export function ROISlider({ label, min, max, prefix = "", suffix = "" }: { label: string, min: number, max: number, prefix?: string, suffix?: string }) {
  const [val, setVal] = useState(min + (max - min) / 2);
  
  return (
    <div className="flex flex-col gap-4">
      <div className="flex justify-between items-center text-xl font-bold">
        <span>{label}</span>
        <span className="text-[var(--accent-2)]">{prefix}{val}{suffix}</span>
      </div>
      <input 
        type="range" 
        min={min} 
        max={max} 
        value={val} 
        onChange={(e) => setVal(Number(e.target.value))}
        className="w-full appearance-none bg-[var(--surface-2)] h-2 rounded-full outline-none focus-visible:ring-2 focus-visible:ring-[var(--fg)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--bg)] [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-6 [&::-webkit-slider-thumb]:h-6 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-[var(--accent)] [&::-webkit-slider-thumb]:cursor-pointer [&::-moz-range-thumb]:w-6 [&::-moz-range-thumb]:h-6 [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:bg-[var(--accent)] [&::-moz-range-thumb]:border-none [&::-moz-range-thumb]:cursor-pointer"
        aria-label={label}
      />
    </div>
  );
}
