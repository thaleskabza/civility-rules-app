'use client';

import React from 'react';

interface StatCardProps {
  label: string;
  value: string | number;
}

export default function StatCard({ label, value }: StatCardProps) {
  return (
    <div className="bg-black bg-opacity-40 backdrop-blur-md rounded-2xl p-6 border border-white border-opacity-20 glow-border">
      <div className="text-gray-400 text-sm mb-1">{label}</div>
      <div className="text-4xl font-bold text-white">{value}</div>
      
      <style jsx>{`
        .glow-border {
          animation: glow 2s ease-in-out infinite;
        }
        @keyframes glow {
          0%, 100% { box-shadow: 0 0 20px rgba(255, 255, 255, 0.5); }
          50% { box-shadow: 0 0 40px rgba(255, 255, 255, 0.8); }
        }
      `}</style>
    </div>
  );
}