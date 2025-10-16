'use client';

import React from 'react';
import { LucideIcon } from 'lucide-react';

interface ButtonProps {
  onClick: () => void;
  children: React.ReactNode;
  icon?: LucideIcon;
  variant?: 'primary' | 'secondary' | 'danger';
  className?: string;
  disabled?: boolean;
}

export default function Button({ 
  onClick, 
  children, 
  icon: Icon, 
  variant = 'secondary',
  className = '',
  disabled = false
}: ButtonProps) {
  const variantClasses = {
    primary: 'bg-gradient-to-r from-cyan-400 to-pink-500',
    secondary: 'bg-gray-700 hover:bg-gray-600',
    danger: 'bg-red-500 hover:bg-red-600'
    
  };

  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`px-8 py-4 ${variantClasses[variant]} text-white rounded-2xl font-bold text-lg transition-all duration-300 transform hover:scale-105 flex items-center gap-3 ${className} ${disabled ? 'opacity-50 cursor-not-allowed' : ''}`}
    >
      {Icon && <Icon size={24} />}
      {children}
    </button>
  );
}