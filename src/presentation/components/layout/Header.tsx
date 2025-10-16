'use client';

import React from 'react';
import { Crown, Sparkles } from 'lucide-react';

export default function Header() {
  return (
    <div className="text-center mb-8 slide-in">
      <div className="flex items-center justify-center gap-3 mb-4">
        <Crown className="text-yellow-400 animate-pulse" size={40} />
        <h1 className="text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-yellow-200 via-pink-200 to-purple-200">
          CIVILITY PROTOCOL
        </h1>
        <Sparkles className="text-pink-400 animate-pulse" size={40} />
      </div>
      <p className="text-xl text-gray-300 font-light tracking-wider">
        George Washington&apos;s 110 Rules • Reimagined for 2025
      </p>
    </div>
  );
}
