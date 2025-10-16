'use client';

import React from 'react';
import { useTheme } from '@/presentation/hooks/useTheme';

interface SettingsPanelProps {
  interval: number;
  onIntervalChange: (interval: number) => void;
  themeIndex: number;
  onThemeChange: (index: number) => void;
  isActive: boolean;
}

export default function SettingsPanel({
  interval,
  onIntervalChange,
  themeIndex,
  onThemeChange,
  isActive
}: SettingsPanelProps) {
  const { themes } = useTheme();

  return (
    <div className="bg-white bg-opacity-10 rounded-2xl p-6 space-y-4 slide-in">
      <div>
        <label className="text-white text-sm mb-2 block">INTERVAL (SECONDS)</label>
        <input
          type="range"
          min="10"
          max="300"
          value={interval}
          onChange={(e) => onIntervalChange(Number(e.target.value))}
          className="w-full"
          disabled={isActive}
        />
        <div className="text-center text-2xl font-bold text-white mt-2">{interval}s</div>
      </div>
      
      <div>
        <label className="text-white text-sm mb-2 block">VISUAL THEME</label>
        <div className="grid grid-cols-4 gap-2">
          {themes.map((theme, idx) => (
            <button
              key={idx}
              onClick={() => onThemeChange(idx)}
              className={`p-3 rounded-xl font-semibold text-xs transition ${
                idx === themeIndex ? 'ring-4 ring-white' : ''
              } bg-gradient-to-br ${theme.gradient}`}
            >
              {theme.name}
            </button>
          ))}
        </div>
      </div>

      <style jsx>{`
        .slide-in {
          animation: slideIn 0.5s ease-out;
        }
        @keyframes slideIn {
          from { transform: translateY(-20px); opacity: 0; }
          to { transform: translateY(0); opacity: 1; }
        }
      `}</style>
    </div>
  );
}