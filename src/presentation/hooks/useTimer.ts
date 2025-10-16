'use client';

import { useState, useEffect, useCallback, useRef } from 'react';

export const useTimer = (interval: number, onTick: () => void) => {
  const [isActive, setIsActive] = useState(false);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (isActive) {
      intervalRef.current = setInterval(() => {
        onTick();
      }, interval * 1000);
    } else {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [isActive, interval, onTick]);

  const start = useCallback(() => setIsActive(true), []);
  const stop = useCallback(() => setIsActive(false), []);
  const toggle = useCallback(() => setIsActive(prev => !prev), []);

  return { isActive, start, stop, toggle };
};