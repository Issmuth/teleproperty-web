'use client';

import { createContext, useContext, useState, useEffect, ReactNode, useCallback, useMemo } from 'react';
import { en, Translation } from './locales/en';
import { am } from './locales/am';
import { om } from './locales/om';
import { ti } from './locales/ti';

export type SupportedLocale = 'en' | 'am' | 'om' | 'ti';

type I18nContextValue = {
  locale: SupportedLocale;
  selectedLocale: SupportedLocale | null;
  setLocale: (locale: SupportedLocale | null) => void;
  t: (key: string, params?: Record<string, string | number>) => string;
};

const translations: Record<SupportedLocale, Translation> = {
  en,
  am,
  om,
  ti,
};

const I18nContext = createContext<I18nContextValue | null>(null);

const LOCALE_STORAGE_KEY = 'teleproperty.locale';

function getNestedValue(obj: any, path: string): string {
  const keys = path.split('.');
  let current = obj;
  
  for (const key of keys) {
    if (current && typeof current === 'object' && key in current) {
      current = current[key];
    } else {
      return path; // Return key as fallback
    }
  }
  
  return typeof current === 'string' ? current : path;
}

function interpolate(str: string, params?: Record<string, string | number>): string {
  if (!params) return str;
  
  return str.replace(/\{\{(\w+)\}\}/g, (match, key) => {
    return params[key] !== undefined ? String(params[key]) : match;
  });
}

export function I18nProvider({ children }: { children: ReactNode }) {
  const [selectedLocale, setSelectedLocale] = useState<SupportedLocale | null>(null);
  const [mounted, setMounted] = useState(false);

  // Hydrate locale from localStorage
  useEffect(() => {
    const stored = localStorage.getItem(LOCALE_STORAGE_KEY) as SupportedLocale | null;
    if (stored && ['en', 'am', 'om', 'ti'].includes(stored)) {
      setSelectedLocale(stored);
    }
    setMounted(true);
  }, []);

  // Persist locale to localStorage
  useEffect(() => {
    if (mounted && selectedLocale) {
      localStorage.setItem(LOCALE_STORAGE_KEY, selectedLocale);
    } else if (mounted && selectedLocale === null) {
      localStorage.removeItem(LOCALE_STORAGE_KEY);
    }
  }, [selectedLocale, mounted]);

  const effectiveLocale = selectedLocale || 'en';

  const t = useCallback(
    (key: string, params?: Record<string, string | number>) => {
      const translation = translations[effectiveLocale];
      const value = getNestedValue(translation, key);
      return interpolate(value, params);
    },
    [effectiveLocale]
  );

  const value = useMemo<I18nContextValue>(
    () => ({
      locale: effectiveLocale,
      selectedLocale,
      setLocale: setSelectedLocale,
      t,
    }),
    [effectiveLocale, selectedLocale, t]
  );

  if (!mounted) {
    return null;
  }

  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>;
}

export function useI18n() {
  const context = useContext(I18nContext);
  if (!context) {
    throw new Error('useI18n must be used within I18nProvider');
  }
  return context;
}
