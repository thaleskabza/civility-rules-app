'use client';

import { useState, useCallback } from 'react';

export const useProgress = (totalRules: number) => {
  const [rulesCompleted, setRulesCompleted] = useState<number[]>([]);

  const markAsCompleted = useCallback((ruleIndex: number) => {
    setRulesCompleted(prev => {
      if (!prev.includes(ruleIndex)) {
        return [...prev, ruleIndex];
      }
      return prev;
    });
  }, []);

  const resetProgress = useCallback(() => {
    setRulesCompleted([]);
  }, []);

  const getProgress = useCallback(() => {
    if (totalRules === 0) return 0;
    return (rulesCompleted.length / totalRules) * 100;
  }, [rulesCompleted.length, totalRules]);

  const isCompleted = useCallback((ruleIndex: number) => {
    return rulesCompleted.includes(ruleIndex);
  }, [rulesCompleted]);

  return {
    rulesCompleted,
    markAsCompleted,
    resetProgress,
    getProgress,
    isCompleted,
    completedCount: rulesCompleted.length
  };
};