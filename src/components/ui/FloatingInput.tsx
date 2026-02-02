'use client';

import React, { useState } from 'react';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

interface FloatingInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
}

export default function FloatingInput({
  label,
  className,
  value,
  onChange,
  ...props
}: FloatingInputProps) {
  const [isFocused, setIsFocused] = useState(false);
  const hasValue = value && value.toString().length > 0;

  return (
    <div className="relative w-full group">
      <input
        className={cn(
          "peer w-full h-14 px-4 pt-5 pb-2 text-primary bg-gray-50/50 border border-gray-200 rounded-lg outline-none transition-all focus:bg-white focus:border-secondary focus:ring-1 focus:ring-secondary/20",
          className
        )}
        value={value}
        onChange={onChange}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        placeholder=" "
        {...props}
      />
      <label
        className={cn(
          "absolute left-4 top-4 text-gray-400 text-base transition-all duration-200 pointer-events-none origin-left",
          (isFocused || hasValue) && "transform -translate-y-2.5 scale-75 text-secondary"
        )}
      >
        {label}
      </label>
    </div>
  );
}
