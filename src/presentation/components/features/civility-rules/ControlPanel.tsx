'use client';

import React, { useState } from 'react';
import { Play, Pause, RotateCcw, Settings } from 'lucide-react';
import { ThemeEntity } from '@/domain/entities/Theme';
import Button from '../../ui/Button';
import SettingsPanel from './SettingsPanel';

interface ControlPanelProps {
  isActive: boolean;
  onToggle: () => void;
  onReset: () => void;
  interval: number;
  onIntervalChange: (interval: number) => void;
  currentTheme: ThemeEntity;
  themeIndex: number;
  onThemeChange: (index: number) => void;
}

export default function ControlPanel({
  isActive,
  onToggle,
  onReset,
  interval,
  onIntervalChange,
  currentTheme,
  themeIndex,
  onThemeChange
}: ControlPanelProps) {
  const [showSettings, setShowSettings] = useState(false);

  return (
    <div className="bg-black bg-opacity-50 backdrop-blur-xl rounded-3xl p-8 border border-white border-opacity-20 mb-8">
      <div className="flex items-center justify-center gap-4 mb-6">
        <button
          onClick={onToggle}
          className={`px-8 py-4 rounded-2xl font-bold text-lg transition-all duration-300 transform hover:scale-105 flex items-center gap-3 ${
            isActive 
              ? 'bg-red-500 hover:bg-red-600 text-white' 
              : `${currentTheme.accent} text-white`
          }`}
        >
          {isActive ? <Pause size={24} /> : <Play size={24} />}
          {isActive ? 'PAUSE' : 'ACTIVATE'}
        </button>
        
        <Button onClick={onReset} icon={RotateCcw} variant="secondary">
          RESET
        </Button>
        
        <Button 
          onClick={() => setShowSettings(!showSettings)} 
          icon={Settings} 
          variant="secondary"
        >
          SETTINGS
        </Button>
      </div>

      {showSettings && (
        <SettingsPanel
          interval={interval}
          onIntervalChange={onIntervalChange}
          themeIndex={themeIndex}
          onThemeChange={onThemeChange}
          isActive={isActive}
        />
      )}
    </div>
  );
}