'use client';

import React, { useEffect, useState } from 'react';
import { ThemeEntity } from '@/domain/entities/Theme';

interface Star {
  id: number;
  x: number;
  y: number;
  size: number;
  duration: number;
}

interface StarFieldProps {
  theme: ThemeEntity;
}

export default function StarField({ theme }: StarFieldProps) {
  const [stars, setStars] = useState<Star[]>([]);

  useEffect(() => {
    const newStars = Array.from({ length: 50 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 2 + 1,
      duration: Math.random() * 3 + 2
    }));
    setStars(newStars);
  }, [theme]);

  return (
    <>
      {stars.map((star) => (
        <div
          key={star.id}
          className="absolute rounded-full bg-white opacity-70"
          style={{
            left: `${star.x}%`,
            top: `${star.y}%`,
            width: `${star.size}px`,
            height: `${star.size}px`,
            animation: `twinkle ${star.duration}s ease-in-out infinite`
          }}
        />
      ))}
      
      <style jsx>{`
        @keyframes twinkle {
          0%, 100% { opacity: 0.3; transform: scale(1); }
          50% { opacity: 1; transform: scale(1.2); }
        }
      `}</style>
    </>
  );
}