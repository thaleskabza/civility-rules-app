'use client';

import React from 'react';
import StatCard from '../../ui/StatCard';

interface ProgressDashboardProps {
  currentRuleId: number;
  progress: number;
  rulesCompleted: number;
}

export default function ProgressDashboard({ 
  currentRuleId, 
  progress, 
  rulesCompleted 
}: ProgressDashboardProps) {
  return (
    <div className="grid grid-cols-3 gap-4 mb-8">
      <StatCard label="CURRENT RULE" value={currentRuleId} />
      <StatCard label="PROGRESS" value={`${Math.round(progress)}%`} />
      <StatCard label="MASTERED" value={rulesCompleted} />
    </div>
  );
}