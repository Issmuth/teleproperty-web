'use client';

import { Moon, Sun } from 'lucide-react';
import { useTheme } from '@/lib/theme/theme-provider';

export function ThemeToggle() {
  const { isDark, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      className="w-9 h-9 rounded-full flex items-center justify-center hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
      aria-label="Toggle theme"
    >
      {isDark ? (
        <Sun size={20} className="text-gray-700 dark:text-gray-300" />
      ) : (
        <Moon size={20} className="text-gray-700 dark:text-gray-300" />
      )}
    </button>
  );
}
