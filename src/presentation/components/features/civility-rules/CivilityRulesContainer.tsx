// src/presentation/components/features/civility-rules/CivilityRulesContainer.tsx
'use client';

import React from 'react';
import {
  Crown,
  Sparkles,
  Star,
  X,
  Play,
  Pause,
  Settings,
  RotateCcw,
  Zap
} from 'lucide-react';

import { useRules } from '@/presentation/hooks/useRules';
import { useTimer } from '@/presentation/hooks/useTimer';
import { useTheme } from '@/presentation/hooks/useTheme';
import { useProgress } from '@/presentation/hooks/useProgress';
import { usePopup } from '@/presentation/hooks/usePopup';

type StarDot = { id: number; x: number; y: number; size: number; duration: number };

export default function CivilityRulesContainer() {
  const { currentRule, currentIndex, nextRule, resetRules, totalRules, loading } = useRules();
  const [interval, setIntervalValue] = React.useState<number>(15);
  const [showSettings, setShowSettings] = React.useState<boolean>(false);

  const { currentTheme, setThemeIndex, themeIndex, themes, loading: themeLoading } = useTheme();
  const { rulesCompleted, markAsCompleted, resetProgress, completedCount } = useProgress(totalRules);
  const { showPopup, openPopup, closePopup } = usePopup();

  // reduced motion
  const [prefersReducedMotion, setPrefersReducedMotion] = React.useState<boolean>(false);
  React.useEffect(() => {
    if (typeof window === 'undefined' || !window.matchMedia) return;
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    const update = () => setPrefersReducedMotion(!!mq.matches);
    update();
    mq.addEventListener?.('change', update);
    return () => mq.removeEventListener?.('change', update);
  }, []);

  // soft background bubbles
  const [stars, setStars] = React.useState<StarDot[]>([]);
  React.useEffect(() => {
    const COUNT = prefersReducedMotion ? 0 : 18;
    const newStars: StarDot[] = Array.from({ length: COUNT }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 80 + 60,
      duration: Math.random() * 8 + 12
    }));
    setStars(newStars);
  }, [prefersReducedMotion, themeIndex]);

  // tick -> popup + next
  const handleTick = React.useCallback(() => {
    openPopup();
    nextRule();
  }, [openPopup, nextRule]);

  const { isActive, toggle, stop } = useTimer(interval, handleTick);

  const handleDismiss = React.useCallback(() => {
    closePopup();
    if (currentRule && !rulesCompleted.includes(currentIndex)) {
      markAsCompleted(currentIndex);
    }
  }, [closePopup, currentRule, currentIndex, markAsCompleted, rulesCompleted]);

  const handleReset = React.useCallback(() => {
    resetRules();
    stop();
    closePopup();
    resetProgress();
  }, [resetRules, stop, closePopup, resetProgress]);

  // pause when popup opens
  React.useEffect(() => {
    if (showPopup && isActive) toggle();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [showPopup]);

  if (loading || themeLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#051127]">
        <div className="text-[#E8F1FF] text-2xl animate-pulse">Loading Civility Protocol…</div>
      </div>
    );
  }

  const safeTotal = Math.max(1, totalRules || 0);
  const progress = ((currentIndex + 1) / safeTotal) * 100;

  // Palette to mimic the CT Marathon profile
  const navy = '#071737';
  const navy2 = '#0A1E46';
  const cyan = '#36C2E3';
  const neonYellow = '#FFD21E';
  const softText = '#B7C7E6';
  const white = '#F2F6FF';

  return (
    <div
      className="min-h-screen relative overflow-hidden"
      style={{
        background: `radial-gradient(1200px 600px at 80% 100%, rgba(7,23,55,.55), transparent 70%),
                     radial-gradient(1000px 500px at 10% 0%, rgba(10,30,70,.55), transparent 60%),
                     ${navy}`
      }}
      role="application"
      aria-label="Civility Protocol"
    >
      {/* background bubbles behind everything */}
      <div className="absolute inset-0 -z-10 pointer-events-none">
        {!prefersReducedMotion &&
          stars.map((b) => (
            <div
              key={b.id}
              className="absolute rounded-full pointer-events-none blur-3xl opacity-20"
              style={{
                left: `${b.x}%`,
                top: `${b.y}%`,
                width: `${b.size}px`,
                height: `${b.size}px`,
                background: 'linear-gradient(145deg, rgba(54,194,227,.8), rgba(255,210,30,.6))',
                animation: `floaty ${b.duration}s ease-in-out infinite`
              }}
              aria-hidden="true"
            />
          ))}
      </div>

      {/* page container: centers content, adds margins */}
      <div className="relative z-10 w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10 md:py-16">
        {/* header strip */}
        <div className="mb-8 md:mb-10 flex items-center justify-center gap-3 text-[12px] tracking-wider text-[#7FA1D9]">
          <span className="inline-flex items-center gap-2">
            <Crown size={16} className="text-[color:var(--accent-yellow)] opacity-80" />
            CIVILITY PROTOCOL
          </span>
          <span className="opacity-50">/</span>
          <span className="inline-flex items-center gap-1">
            <Sparkles size={14} className="opacity-70" />
            GEORGE WASHINGTON’S 110 RULES
          </span>
        </div>

        {/* centered card */}
        <div
          className="relative rounded-[28px] md:rounded-[36px] shadow-2xl overflow-hidden mx-auto"
          style={{ maxWidth: '1100px', background: `linear-gradient(180deg, rgba(13,31,73,.92), rgba(7,23,55,.92))`, boxShadow: '0 30px 80px rgba(0,0,0,.45)' }}
        >
          {/* outline glow */}
          <div
            className="pointer-events-none absolute inset-0 rounded-[28px] md:rounded-[36px]"
            style={{ boxShadow: `inset 0 0 0 1px rgba(54,194,227,.25), 0 0 60px rgba(54,194,227,.08)` }}
            aria-hidden="true"
          />

          {/* header band */}
          <div className="px-6 sm:px-10 pt-8 pb-6">
            <div className="flex items-center gap-3">
              <div className="h-12 w-12 rounded-full grid place-items-center text-[#071737]" style={{ background: neonYellow }}>
                <Star size={22} />
              </div>
              <div>
                <h1 className="text-3xl sm:text-4xl font-extrabold" style={{ color: white, letterSpacing: '.02em' }}>
                  CIVILITY RULES
                </h1>
                <p className="text-xs sm:text-sm" style={{ color: softText }}>
                  Self-discipline • Respect • Mastery
                </p>
              </div>
            </div>

            {/* cyan separator */}
            <div
              className="mt-6"
              style={{
                height: 1,
                backgroundImage:
                  'linear-gradient(90deg, rgba(54,194,227,0) 0%, rgba(54,194,227,.8) 15%, rgba(54,194,227,.8) 85%, rgba(54,194,227,0) 100%)'
              }}
            />
          </div>

          {/* grid layout: fixed narrow left column + flexible right */}
          <div
            className="px-6 sm:px-10 pb-10 grid grid-cols-1 md:grid-cols-[280px_minmax(0,1fr)] gap-6 md:gap-8"
          >
            {/* left tiles */}
            <div className="md:col-[1] space-y-3 w-full">
              <Tile label="CURRENT RULE" value={`${currentRule?.id ?? 1}`} color={white} neon={neonYellow} />
              <Tile label="PROGRESS" value={`${Math.round(progress)}%`} color={white} neon={neonYellow} />
              <Tile label="MASTERED" value={`${completedCount}`} color={white} neon={neonYellow} />
            </div>

            {/* right: main content */}
            <div className="md:col-[2]">
              <div className="rounded-2xl p-6 md:p-8 lg:p-10 relative" style={{ background: `linear-gradient(180deg, ${navy2}, ${navy})` }}>
                <div className="flex items-center gap-2 text-[11px] tracking-widest" style={{ color: softText }}>
                  <span>RULE</span>
                  <span className="opacity-60">/</span>
                  <span style={{ color: cyan }}>#{currentRule?.id ?? 1}</span>
                </div>

                <div className="mt-2 md:mt-3 flex items-end gap-3">
                  <span
                    className="font-black leading-none"
                    style={{ fontSize: '56px', color: neonYellow, textShadow: '0 0 20px rgba(255,210,30,.25)' }}
                  >
                    #{currentRule?.id ?? 1}
                  </span>
                  <span className="uppercase tracking-widest text-[11px]" style={{ color: softText }}>
                    Civility Principle
                  </span>
                </div>

                <p className="mt-4 md:mt-6 text-lg md:text-2xl leading-relaxed max-w-3xl" style={{ color: white }}>
                  {currentRule?.text ?? 'Loading…'}
                </p>

                {/* divider */}
                <div
                  className="mt-6"
                  style={{
                    height: 1,
                    backgroundImage:
                      'linear-gradient(90deg, rgba(54,194,227,0) 0%, rgba(54,194,227,.6) 15%, rgba(54,194,227,.6) 85%, rgba(54,194,227,0) 100%)'
                  }}
                />

                {/* controls */}
                <div className="mt-6 flex flex-wrap items-center gap-3 md:gap-4">
                  <ActionButton
                    onClick={toggle}
                    activeBg={isActive ? '#D73B3E' : neonYellow}
                    icon={isActive ? <Pause size={18} /> : <Play size={18} />}
                    label={isActive ? 'PAUSE' : 'ACTIVATE'}
                    darkText={!isActive}
                    className="shrink-0"
                  />
                  <ActionButton
                    onClick={handleReset}
                    activeBg="#253A6A"
                    icon={<RotateCcw size={18} />}
                    label="RESET"
                    outline
                    className="shrink-0"
                  />
                  <ActionButton
                    onClick={() => setShowSettings((s) => !s)}
                    activeBg="#253A6A"
                    icon={<Settings size={18} />}
                    label="SETTINGS"
                    outline
                    className="shrink-0"
                  />
                </div>

                {/* settings */}
                {showSettings && (
                  <div className="mt-6 rounded-xl p-4 md:p-5" style={{ background: '#102a62' }}>
                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs tracking-widest mb-2" style={{ color: softText }}>
                          INTERVAL (SECONDS)
                        </label>
                        <div className="flex items-center gap-3">
                          <input
                            type="range"
                            min={10}
                            max={300}
                            value={interval}
                            onChange={(e) => setIntervalValue(Number(e.target.value))}
                            className="w-full accent-[#36C2E3]"
                          />
                          <input
                            type="number"
                            min={10}
                            max={300}
                            value={interval}
                            onChange={(e) => setIntervalValue(Number(e.target.value))}
                            className="w-20 bg-[#0c224f] border border-white/10 rounded-md px-2 py-1 text-[#E8F1FF]"
                          />
                        </div>
                        <div className="text-center text-xl font-bold mt-2" style={{ color: white }}>
                          {interval}s
                        </div>
                      </div>

                      <div>
                        <label className="block text-xs tracking-widest mb-2" style={{ color: softText }}>
                          VISUAL THEME
                        </label>
                        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                          {themes.map((theme, idx) => (
                            <button
                              key={theme?.name ?? `theme-${idx}`}
                              onClick={() => setThemeIndex(idx)}
                              className={`p-3 rounded-xl font-semibold text-[11px] tracking-wide transition ${
                                idx === themeIndex ? 'ring-2 ring-[#36C2E3]' : 'ring-1 ring-white/10'
                              } bg-gradient-to-br ${theme.gradient}`}
                              style={{ color: '#0c1b3c' }}
                            >
                              {theme?.name ?? `Theme ${idx + 1}`}
                            </button>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* bottom progress strip, centered with card width */}
          <div className="px-6 sm:px-10 pb-8" style={{ maxWidth: '1100px', margin: '0 auto' }}>
            <div
              className="h-2 rounded-full overflow-hidden"
              style={{ background: 'rgba(255,255,255,.06)', boxShadow: 'inset 0 0 0 1px rgba(255,255,255,.06)' }}
              role="progressbar"
              aria-valuenow={Math.round(progress)}
              aria-valuemin={0}
              aria-valuemax={100}
            >
              <div
                className="h-full"
                style={{
                  width: `${progress}%`,
                  background: `linear-gradient(90deg, ${neonYellow}, #fff3a8)`,
                  boxShadow: '0 0 20px rgba(255,210,30,.35)'
                }}
              />
            </div>
          </div>
        </div>
      </div>

      {/* popup */}
      {showPopup && currentRule && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          style={{ background: 'rgba(4, 10, 24, .72)', backdropFilter: 'blur(4px)' }}
          role="dialog"
          aria-modal="true"
        >
          <div
            className="relative max-w-3xl w-full rounded-3xl p-8 md:p-12"
            style={{
              background: `linear-gradient(180deg, #0F275B, #071737)`,
              boxShadow: '0 40px 120px rgba(0,0,0,.6), inset 0 0 0 1px rgba(54,194,227,.25)'
            }}
          >
            <button
              onClick={handleDismiss}
              className="absolute top-5 right-5 grid place-items-center rounded-full h-10 w-10"
              style={{ background: 'rgba(255,255,255,.06)', color: white }}
              aria-label="Close"
            >
              <X />
            </button>

            <div className="text-center">
              <div className="inline-flex items-center gap-3">
                <Zap className="text-[#FFD21E]" size={30} />
                <span className="font-black" style={{ fontSize: '64px', color: neonYellow, textShadow: '0 0 24px rgba(255,210,30,.35)' }}>
                  #{currentRule.id}
                </span>
                <Zap className="text-[#FFD21E]" size={30} />
              </div>

              <div className="mt-6 rounded-2xl p-6 md:p-8 text-left" style={{ background: 'rgba(255,255,255,.04)', color: white }}>
                <p className="text-xl md:text-2xl leading-relaxed">{currentRule.text}</p>
              </div>

              <button
                onClick={handleDismiss}
                className="mt-6 px-10 py-4 rounded-2xl font-bold tracking-wide"
                style={{ background: neonYellow, color: '#071737', boxShadow: '0 10px 30px rgba(255,210,30,.35)' }}
              >
                ACKNOWLEDGED ✓
              </button>

              <div className="mt-4 text-sm" style={{ color: softText }}>
                {currentIndex < safeTotal - 1 ? (
                  <p>Next rule in {interval} seconds…</p>
                ) : (
                  <p className="text-base font-semibold" style={{ color: neonYellow }}>
                    🎉 Journey Complete! All 110 Rules Mastered! 🎉
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* animations */}
      <style jsx global>{`
        @keyframes floaty {
          0%, 100% { transform: translateY(0px) translateX(0px); opacity: .18; }
          50% { transform: translateY(-12px) translateX(6px); opacity: .28; }
        }
      `}</style>
    </div>
  );
}

/** Stat tile */
function Tile({
  label,
  value,
  color,
  neon
}: {
  label: string;
  value: string;
  color: string;
  neon: string;
}) {
  return (
    <div
      className="rounded-2xl px-5 py-4 w-full"
      style={{
        background: 'linear-gradient(180deg, rgba(16,42,98,.9), rgba(10,30,70,.9))',
        boxShadow: 'inset 0 0 0 1px rgba(255,255,255,.06)'
      }}
    >
      <div className="text-[11px] tracking-widest opacity-80" style={{ color }}>
        {label}
      </div>
      <div
        className="mt-1 font-extrabold"
        style={{ color: neon, fontSize: '34px', textShadow: '0 0 18px rgba(255,210,30,.25)' }}
      >
        {value}
      </div>
    </div>
  );
}

/** CTA button */
function ActionButton({
  onClick,
  icon,
  label,
  activeBg,
  outline,
  darkText,
  className
}: {
  onClick: () => void;
  icon: React.ReactNode;
  label: string;
  activeBg: string;
  outline?: boolean;
  darkText?: boolean;
  className?: string;
}) {
  return (
    <button
      onClick={onClick}
      className={`px-5 py-3 rounded-xl font-bold tracking-wide flex items-center gap-2 transition-transform hover:scale-[1.03] ${className ?? ''}`}
      style={
        outline
          ? {
              background: 'rgba(255,255,255,.06)',
              color: '#E8F1FF',
              border: '1px solid rgba(255,255,255,.12)'
            }
          : {
              background: activeBg,
              color: darkText ? '#071737' : '#0A1E46',
              boxShadow: '0 10px 24px rgba(0,0,0,.25)'
            }
      }
    >
      {icon}
      {label}
    </button>
  );
}
