'use client';

import { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { palette } from './palette';

export type ThemeMode = 'light' | 'dark';

export type ThemeColors = {
  background: string;
  surface: string;
  surfaceMuted: string;
  surfaceAccent: string;
  text: string;
  textMuted: string;
  textInverse: string;
  border: string;
  shadow: string;
  drawerBackground: string;
  headerBackground: string;
  tabBarBackground: string;
  iconButtonBackground: string;
  icon: string;
  iconMuted: string;
  activeSurface: string;
  activeBorder: string;
  activeText: string;
};

type ThemeContextValue = {
  mode: ThemeMode;
  isDark: boolean;
  colors: ThemeColors;
  toggleTheme: () => void;
};

const lightColors: ThemeColors = {
  background: palette.surface.canvas,
  surface: palette.surface.base,
  surfaceMuted: palette.surface.elevated,
  surfaceAccent: palette.surface.soft,
  text: palette.text.primary,
  textMuted: palette.text.secondary,
  textInverse: palette.text.inverse,
  border: palette.border.subtle,
  shadow: palette.shadow.overlay,
  drawerBackground: palette.surface.canvas,
  headerBackground: palette.surface.base,
  tabBarBackground: palette.surface.base,
  iconButtonBackground: palette.surface.elevated,
  icon: palette.text.primary,
  iconMuted: palette.text.secondary,
  activeSurface: palette.surface.soft,
  activeBorder: palette.brand.primary,
  activeText: palette.brand.primaryStrong,
};

const darkColors: ThemeColors = {
  background: "#070809",
  surface: "#12161C",
  surfaceMuted: "#1A2027",
  surfaceAccent: "rgba(248, 250, 252, 0.06)",
  text: "#F8FAFC",
  textMuted: "#CBD5E1",
  textInverse: palette.text.inverse,
  border: "rgba(255, 255, 255, 0.08)",
  shadow: "rgba(0, 0, 0, 0.45)",
  drawerBackground: "#070809",
  headerBackground: "#12161C",
  tabBarBackground: "#12161C",
  iconButtonBackground: "rgba(255, 255, 255, 0.08)",
  icon: "#F8FAFC",
  iconMuted: "#CBD5E1",
  activeSurface: "rgba(24, 195, 106, 0.16)",
  activeBorder: palette.brand.accent,
  activeText: palette.brand.accent,
};

const ThemeContext = createContext<ThemeContextValue | null>(null);

const THEME_STORAGE_KEY = 'teleproperty.theme.mode';

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [mode, setMode] = useState<ThemeMode>('light');
  const [mounted, setMounted] = useState(false);

  // Hydrate theme from localStorage on mount
  useEffect(() => {
    const stored = localStorage.getItem(THEME_STORAGE_KEY) as ThemeMode | null;
    if (stored === 'light' || stored === 'dark') {
      setMode(stored);
    }
    setMounted(true);
  }, []);

  // Persist theme to localStorage
  useEffect(() => {
    if (mounted) {
      localStorage.setItem(THEME_STORAGE_KEY, mode);
      // Update document class for Tailwind dark mode
      if (mode === 'dark') {
        document.documentElement.classList.add('dark');
      } else {
        document.documentElement.classList.remove('dark');
      }
    }
  }, [mode, mounted]);

  const toggleTheme = () => {
    setMode((prev) => (prev === 'dark' ? 'light' : 'dark'));
  };

  const colors = mode === 'dark' ? darkColors : lightColors;
  const isDark = mode === 'dark';

  const value: ThemeContextValue = {
    mode,
    isDark,
    colors,
    toggleTheme,
  };

  // Prevent flash of unstyled content
  if (!mounted) {
    return null;
  }

  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within ThemeProvider');
  }
  return context;
}
