import React from 'react';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
}

export default function Button({
  className,
  variant = 'primary',
  size = 'md',
  ...props
}: ButtonProps) {
  const baseStyles = 'inline-flex items-center justify-center rounded-md font-medium transition-all focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none';

  const variants = {
    primary: 'bg-primary text-white hover:bg-primary/90 hover:scale-[1.02] active:scale-[0.98] transition-all duration-200',
    secondary: 'bg-transparent border-2 border-primary text-primary hover:bg-primary hover:text-white hover:scale-[1.02] active:scale-[0.98] transition-all duration-200',
    outline: 'border-2 border-primary text-primary hover:bg-primary/5 hover:scale-[1.02] active:scale-[0.98] transition-all duration-200',
    ghost: 'text-primary hover:bg-primary/5 hover:scale-[1.02] active:scale-[0.98] transition-all duration-200',
  };

  const sizes = {
    sm: 'h-9 px-4 text-xs',
    md: 'h-11 px-6 text-sm',
    lg: 'h-14 px-8 text-base',
  };

  return (
    <button
      className={cn(baseStyles, variants[variant], sizes[size], className)}
      {...props}
    />
  );
}
