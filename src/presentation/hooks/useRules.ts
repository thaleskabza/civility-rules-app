'use client';

import { useState, useEffect, useMemo } from 'react';
import { RuleEntity } from '@/domain/entities/Rule';
import { RuleService } from '@/application/services/RuleService';
import { JsonRuleRepository } from '@/infrastructure/repositories/JsonRuleRepository';

export const useRules = () => {
  const [rules, setRules] = useState<RuleEntity[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const ruleService = useMemo(() => new RuleService(new JsonRuleRepository()), []);

  useEffect(() => {
    const fetchRules = async () => {
      try {
        const fetchedRules = await ruleService.getAllRules();
        setRules(fetchedRules);
      } catch (err) {
        setError('Failed to load rules');
        console.error('Error fetching rules:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchRules();
  }, [ruleService]);

  const getCurrentRule = (): RuleEntity | null => {
    return rules[currentIndex] || null;
  };
  
  const nextRule = () => {
    setCurrentIndex((prev) => (prev + 1) % rules.length);
  };

  const previousRule = () => {
    setCurrentIndex((prev) => (prev - 1 + rules.length) % rules.length);
  };

  const goToRule = (index: number) => {
    if (index >= 0 && index < rules.length) {
      setCurrentIndex(index);
    }
  };

  const resetRules = () => {
    setCurrentIndex(0);
  };

  return {
    rules,
    currentRule: getCurrentRule(),
    currentIndex,
    nextRule,
    previousRule,
    goToRule,
    resetRules,
    loading,
    error,
    totalRules: rules.length
  };
};
