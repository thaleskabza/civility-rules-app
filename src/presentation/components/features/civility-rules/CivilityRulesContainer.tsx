'use client';

import React from 'react';
import { useRules } from '@/presentation/hooks/useRules';
import { useTimer } from '@/presentation/hooks/useTimer';
import { useTheme } from '@/presentation/hooks/useTheme';
import { useProgress } from '@/presentation/hooks/useProgress';
import { usePopup } from '@/presentation/hooks/usePopup';
import RuleDisplay from './RuleDisplay';
import RulePopup from './RulePopup';
import ProgressDashboard from './ProgressDashboard';
import ControlPanel from './ControlPanel';
import ProgressBar from '../../ui/ProgressBar';
import StarField from '../../ui/StarField';
import Header from '../../layout/Header';

export default function CivilityRulesContainer() {
  const { currentRule, currentIndex, nextRule, resetRules, totalRules, loading } = useRules();
  const [interval, setInterval] = React.useState(60);
  const { currentTheme, setThemeIndex, themeIndex, loading: themeLoading } = useTheme();
  const { rulesCompleted, markAsCompleted, resetProgress, completedCount } = useProgress(totalRules);
  const { showPopup, openPopup, closePopup } = usePopup();

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

  if (loading || themeLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-900 via-pink-900 to-blue-900">
        <div className="text-white text-2xl">Loading Civility Protocol...</div>
      </div>
    );
  }

  const progress = ((currentIndex + 1) / totalRules) * 100;

  return (
    <div className={`min-h-screen bg-gradient-to-br ${currentTheme.gradient} relative overflow-hidden transition-all duration-1000`}>
      <StarField theme={currentTheme} />
      
      <div className="relative z-10 max-w-6xl mx-auto p-8">
        <Header />
        
        <ProgressDashboard
          currentRuleId={currentRule?.id || 1}
          progress={progress}
          rulesCompleted={completedCount}
        />

        <div className="mb-8">
          <ProgressBar progress={progress} accentClass={currentTheme.accent} />
        </div>

        <ControlPanel
          isActive={isActive}
          onToggle={toggle}
          onReset={handleReset}
          interval={interval}
          onIntervalChange={setInterval}
          currentTheme={currentTheme}
          themeIndex={themeIndex}
          onThemeChange={setThemeIndex}
        />

        <RuleDisplay rule={currentRule} theme={currentTheme} />
      </div>

      {showPopup && currentRule && (
        <RulePopup
          rule={currentRule}
          onDismiss={handleDismiss}
          theme={currentTheme}
          interval={interval}
          isLast={currentIndex === totalRules - 1}
        />
      )}
    </div>
  );
}