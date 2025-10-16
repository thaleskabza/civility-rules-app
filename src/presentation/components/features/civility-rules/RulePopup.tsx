'use client';

import React from 'react';
import { X, Zap } from 'lucide-react';
import { RuleEntity } from '@/domain/entities/Rule';
import { ThemeEntity } from '@/domain/entities/Theme';

interface RulePopupProps {
  rule: RuleEntity;
  onDismiss: () => void;
  theme: ThemeEntity;
  interval: number;
  isLast: boolean;
}

export default function RulePopup({ 
  rule, 
  onDismiss, 
  theme, 
  interval, 
  isLast 
}: RulePopupProps) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-70 backdrop-blur-sm">
      <div className="bg-gradient-to-br from-purple-900 via-pink-900 to-blue-900 rounded-3xl shadow-2xl max-w-3xl w-full p-12 relative border-4 border-white border-opacity-30 slide-in glow-border">
        <button
          onClick={onDismiss}
          className="absolute top-6 right-6 text-white hover:text-gray-300 transition bg-black bg-opacity-50 rounded-full p-3 hover:scale-110 transform"
        >
          <X size={32} />
        </button>
        
        <div className="text-center">
          <div className="flex items-center justify-center gap-4 mb-6">
            <Zap className="text-yellow-400 animate-pulse" size={48} />
            <div className="text-8xl font-black text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 via-pink-400 to-purple-400">
              #{rule.id}
            </div>
            <Zap className="text-yellow-400 animate-pulse" size={48} />
          </div>
          
          <div className="bg-black bg-opacity-40 rounded-2xl p-8 mb-8">
            <p className="text-2xl text-white leading-relaxed font-light">
              {rule.text}
            </p>
          </div>
          
          <button
            onClick={onDismiss}
            className={`px-12 py-5 ${theme.accent} text-white rounded-2xl font-bold text-2xl transition-all duration-300 transform hover:scale-110 shadow-2xl`}
          >
            ACKNOWLEDGED ✓
          </button>
          
          <div className="mt-6 text-gray-300 text-sm">
            {!isLast ? (
              <p>Next rule in {interval} seconds...</p>
            ) : (
              <p className="text-xl font-bold text-yellow-400">
                🎉 Journey Complete! All 110 Rules Mastered! 🎉
              </p>
            )}
          </div>
        </div>
      </div>

      <style jsx>{`
        .slide-in {
          animation: slideIn 0.5s ease-out;
        }
        .glow-border {
          animation: glow 2s ease-in-out infinite;
        }
        @keyframes slideIn {
          from { transform: translateY(-100%) scale(0.8); opacity: 0; }
          to { transform: translateY(0) scale(1); opacity: 1; }
        }
        @keyframes glow {
          0%, 100% { box-shadow: 0 0 20px rgba(255, 255, 255, 0.5); }
          50% { box-shadow: 0 0 40px rgba(255, 255, 255, 0.8); }
        }
      `}</style>
    </div>
  );
}