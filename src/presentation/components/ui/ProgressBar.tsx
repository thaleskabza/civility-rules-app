'use client';

import React from 'react';

interface ProgressBarProps {
  progress: number;
  accentClass: string;
}

export default function ProgressBar({ progress, accentClass }: ProgressBarProps) {
  return (
    <div className="h-4 bg-black bg-opacity-40 rounded-full overflow-hidden border border-white border-opacity-20">
      <div 
        className={`h-full ${accentClass} transition-all duration-500`}
        style={{ width: `${progress}%` }}
      />
    </div>
  );
}