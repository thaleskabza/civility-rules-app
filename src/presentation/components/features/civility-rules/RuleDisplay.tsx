'use client';

import React from 'react';
import { Star } from 'lucide-react';
import { RuleEntity } from '@/domain/entities/Rule';
import { ThemeEntity } from '@/domain/entities/Theme';

interface RuleDisplayProps {
  rule: RuleEntity | null;
  theme: ThemeEntity;
}

export default function RuleDisplay({ rule, theme }: RuleDisplayProps) {
  if (!rule) {
    return null;
  }

  return (
    <div className="bg-black bg-opacity-50 backdrop-blur-xl rounded-3xl p-10 border border-white border-opacity-20">
      <div className="flex items-center justify-center gap-3 mb-6">
        <Star className="text-yellow-400" size={32} />
        <h2 className="text-3xl font-bold text-white">RULE #{rule.id}</h2>
        <Star className="text-yellow-400" size={32} />
      </div>
      <p className="text-xl text-gray-200 leading-relaxed text-center font-light">
        {rule.text}
      </p>
    </div>
  );
}