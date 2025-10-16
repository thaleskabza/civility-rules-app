'use client';

import { useState, useEffect, useMemo } from 'react';
import { ThemeEntity } from '@/domain/entities/Theme';
import { ThemeService } from '@/application/services/ThemeService';
import { JsonThemeRepository } from '@/infrastructure/repositories/JsonThemeRepository';

export const useTheme = () => {
  const [themes, setThemes] = useState<ThemeEntity[]>([]);
  const [themeIndex, setThemeIndex] = useState(0);
  const [loading, setLoading] = useState(true);

  const themeService = useMemo(() => new ThemeService(new JsonThemeRepository()), []);

  useEffect(() => {
    const fetchThemes = async () => {
      try {
        const fetchedThemes = await themeService.getAllThemes();
        setThemes(fetchedThemes);
      } catch (error) {
        console.error('Error fetching themes:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchThemes();
  }, [themeService]);

  const currentTheme = themes[themeIndex] || themes[0];

  const nextTheme = () => {
    setThemeIndex((prev) => (prev + 1) % themes.length);
  };

  const previousTheme = () => {
    setThemeIndex((prev) => (prev - 1 + themes.length) % themes.length);
  };

  return {
    themes,
    currentTheme,
    themeIndex,
    setThemeIndex,
    nextTheme,
    previousTheme,
    loading
  };
};
