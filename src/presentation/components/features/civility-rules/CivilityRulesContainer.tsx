'use client';

import React from 'react';
import { Crown, Sparkles, Star, X, Play, Pause, Settings, RotateCcw, Zap } from 'lucide-react';
import { useRules } from '@/presentation/hooks/useRules';
import { useTimer } from '@/presentation/hooks/useTimer';
import { useTheme } from '@/presentation/hooks/useTheme';
import { useProgress } from '@/presentation/hooks/useProgress';
import { usePopup } from '@/presentation/hooks/usePopup';

export default function CivilityRulesContainer() {
  const { currentRule, currentIndex, nextRule, resetRules, totalRules, loading } = useRules();
  const [interval, setIntervalValue] = React.useState(60);
  const [showSettings, setShowSettings] = React.useState(false);
  const { currentTheme, setThemeIndex, themeIndex, themes, loading: themeLoading } = useTheme();
  const { rulesCompleted, markAsCompleted, resetProgress, completedCount } = useProgress(totalRules);
  const { showPopup, openPopup, closePopup } = usePopup();
  const [stars, setStars] = React.useState<Array<{ id: number; x: number; y: number; size: number; duration: number }>>([]);

  // Generate random stars for background
  React.useEffect(() => {
    const newStars = Array.from({ length: 50 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 2 + 1,
      duration: Math.random() * 3 + 2
    }));
    setStars(newStars);
  }, [themeIndex]);

  const handleTick = React.useCallback(() => {
    openPopup();
    nextRule();
  }, [openPopup, nextRule]);

  const { isActive, toggle, stop } = useTimer(interval, handleTick);

  const handleDismiss = () => {
    closePopup();
    if (currentRule && !rulesCompleted.includes(currentIndex)) {
      markAsCompleted(currentIndex);
    }
  };

  const handleReset = () => {
    resetRules();
    stop();
    closePopup();
    resetProgress();
  };

  if (loading || themeLoading || !currentTheme) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-900 via-pink-900 to-blue-900">
        <div className="text-white text-2xl animate-pulse">Loading Civility Protocol...</div>
      </div>
    );
  }

  const progress = ((currentIndex + 1) / totalRules) * 100;

  return (
    <div className={`min-h-screen bg-gradient-to-br ${currentTheme.gradient} relative overflow-hidden transition-all duration-1000`}>
      {/* Animated star field */}
      {stars.map((star) => (
        <div
          key={star.id}
          className="absolute rounded-full bg-white opacity-70 pointer-events-none"
          style={{
            left: `${star.x}%`,
            top: `${star.y}%`,
            width: `${star.size}px`,
            height: `${star.size}px`,
            animation: `twinkle ${star.duration}s ease-in-out infinite`
          }}
        />
      ))}

      <div className="relative z-10 max-w-6xl mx-auto p-4 sm:p-8">
        {/* Header */}
        <div className="text-center mb-8 slide-in">
          <div className="flex items-center justify-center gap-3 mb-4">
            <Crown className="text-yellow-400 animate-pulse" size={40} />
            <h1 className="text-3xl sm:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-yellow-200 via-pink-200 to-purple-200">
              CIVILITY PROTOCOL
            </h1>
            <Sparkles className="text-pink-400 animate-pulse" size={40} />
          </div>
          <p className="text-lg sm:text-xl text-gray-300 font-light tracking-wider">
            George Washington's 110 Rules • Reimagined for 2025
          </p>
        </div>

        {/* Stats Dashboard */}
        <div className="grid grid-cols-3 gap-2 sm:gap-4 mb-6 sm:mb-8">
          <div className="bg-black bg-opacity-40 backdrop-blur-md rounded-xl sm:rounded-2xl p-4 sm:p-6 border border-white border-opacity-20 glow-border">
            <div className="text-gray-400 text-xs sm:text-sm mb-1">CURRENT RULE</div>
            <div className="text-2xl sm:text-4xl font-bold text-white">{currentRule?.id || 1}</div>
          </div>
          <div className="bg-black bg-opacity-40 backdrop-blur-md rounded-xl sm:rounded-2xl p-4 sm:p-6 border border-white border-opacity-20 glow-border">
            <div className="text-gray-400 text-xs sm:text-sm mb-1">PROGRESS</div>
            <div className="text-2xl sm:text-4xl font-bold text-white">{Math.round(progress)}%</div>
          </div>
          <div className="bg-black bg-opacity-40 backdrop-blur-md rounded-xl sm:rounded-2xl p-4 sm:p-6 border border-white border-opacity-20 glow-border">
            <div className="text-gray-400 text-xs sm:text-sm mb-1">MASTERED</div>
            <div className="text-2xl sm:text-4xl font-bold text-white">{completedCount}</div>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="mb-6 sm:mb-8">
          <div className="h-3 sm:h-4 bg-black bg-opacity-40 rounded-full overflow-hidden border border-white border-opacity-20">
            <div 
              className={`h-full ${currentTheme.accent} transition-all duration-500`}
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        {/* Control Panel */}
        <div className="bg-black bg-opacity-50 backdrop-blur-xl rounded-2xl sm:rounded-3xl p-4 sm:p-8 border border-white border-opacity-20 mb-6 sm:mb-8">
          <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-4 mb-4 sm:mb-6">
            <button
              onClick={toggle}
              className={`px-4 sm:px-8 py-3 sm:py-4 rounded-xl sm:rounded-2xl font-bold text-sm sm:text-lg transition-all duration-300 transform hover:scale-105 flex items-center gap-2 sm:gap-3 ${
                isActive 
                  ? 'bg-red-500 hover:bg-red-600 text-white' 
                  : `${currentTheme.accent} text-white`
              }`}
            >
              {isActive ? <Pause size={20} /> : <Play size={20} />}
              {isActive ? 'PAUSE' : 'ACTIVATE'}
            </button>
            
            <button
              onClick={handleReset}
              className="px-4 sm:px-8 py-3 sm:py-4 bg-gray-700 hover:bg-gray-600 text-white rounded-xl sm:rounded-2xl font-bold text-sm sm:text-lg transition-all duration-300 transform hover:scale-105 flex items-center gap-2 sm:gap-3"
            >
              <RotateCcw size={20} />
              RESET
            </button>
            
            <button
              onClick={() => setShowSettings(!showSettings)}
              className="px-4 sm:px-8 py-3 sm:py-4 bg-gray-700 hover:bg-gray-600 text-white rounded-xl sm:rounded-2xl font-bold text-sm sm:text-lg transition-all duration-300 transform hover:scale-105 flex items-center gap-2 sm:gap-3"
            >
              <Settings size={20} />
              SETTINGS
            </button>
          </div>

          {showSettings && (
            <div className="bg-white bg-opacity-10 rounded-xl sm:rounded-2xl p-4 sm:p-6 space-y-4 slide-in">
              <div>
                <label className="text-white text-xs sm:text-sm mb-2 block">INTERVAL (SECONDS)</label>
                <input
                  type="range"
                  min="10"
                  max="300"
                  value={interval}
                  onChange={(e) => setIntervalValue(Number(e.target.value))}
                  className="w-full accent-purple-500"
                  disabled={isActive}
                />
                <div className="text-center text-xl sm:text-2xl font-bold text-white mt-2">{interval}s</div>
              </div>
              
              <div>
                <label className="text-white text-xs sm:text-sm mb-2 block">VISUAL THEME</label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                  {themes.map((theme, idx) => (
                    <button
                      key={idx}
                      onClick={() => setThemeIndex(idx)}
                      className={`p-3 rounded-xl font-semibold text-xs transition ${
                        idx === themeIndex ? 'ring-4 ring-white' : ''
                      } bg-gradient-to-br ${theme.gradient}`}
                    >
                      {theme.name}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Current Rule Display */}
        <div className="bg-black bg-opacity-50 backdrop-blur-xl rounded-2xl sm:rounded-3xl p-6 sm:p-10 border border-white border-opacity-20">
          <div className="flex items-center justify-center gap-3 mb-4 sm:mb-6">
            <Star className="text-yellow-400" size={28} />
            <h2 className="text-2xl sm:text-3xl font-bold text-white">RULE #{currentRule?.id || 1}</h2>
            <Star className="text-yellow-400" size={28} />
          </div>
          <p className="text-lg sm:text-2xl text-gray-200 leading-relaxed text-center font-light">
            {currentRule?.text || 'Loading...'}
          </p>
        </div>
      </div>

      {/* Futuristic Popup */}
      {showPopup && currentRule && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-70 backdrop-blur-sm">
          <div className="bg-gradient-to-br from-purple-900 via-pink-900 to-blue-900 rounded-2xl sm:rounded-3xl shadow-2xl max-w-3xl w-full p-8 sm:p-12 relative border-4 border-white border-opacity-30 slide-in glow-border">
            <button
              onClick={handleDismiss}
              className="absolute top-4 right-4 sm:top-6 sm:right-6 text-white hover:text-gray-300 transition bg-black bg-opacity-50 rounded-full p-2 sm:p-3 hover:scale-110 transform"
            >
              <X size={24} />
            </button>
            
            <div className="text-center">
              <div className="flex items-center justify-center gap-3 sm:gap-4 mb-4 sm:mb-6">
                <Zap className="text-yellow-400 animate-pulse" size={36} />
                <div className="text-6xl sm:text-8xl font-black text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 via-pink-400 to-purple-400">
                  #{currentRule.id}
                </div>
                <Zap className="text-yellow-400 animate-pulse" size={36} />
              </div>
              
              <div className="bg-black bg-opacity-40 rounded-xl sm:rounded-2xl p-6 sm:p-8 mb-6 sm:mb-8">
                <p className="text-xl sm:text-3xl text-white leading-relaxed font-light">
                  {currentRule.text}
                </p>
              </div>
              
              <button
                onClick={handleDismiss}
                className={`px-8 sm:px-12 py-4 sm:py-5 ${currentTheme.accent} text-white rounded-xl sm:rounded-2xl font-bold text-xl sm:text-2xl transition-all duration-300 transform hover:scale-110 shadow-2xl`}
              >
                ACKNOWLEDGED ✓
              </button>
              
              <div className="mt-4 sm:mt-6 text-gray-300 text-xs sm:text-sm">
                {currentIndex < totalRules - 1 ? (
                  <p>Next rule in {interval} seconds...</p>
                ) : (
                  <p className="text-lg sm:text-xl font-bold text-yellow-400">🎉 Journey Complete! All 110 Rules Mastered! 🎉</p>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
