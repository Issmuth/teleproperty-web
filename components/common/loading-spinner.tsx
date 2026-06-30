'use client';

import { useTheme } from '@/lib/theme/theme-provider';

type LoadingSpinnerProps = {
  size?: 'sm' | 'md' | 'lg';
  message?: string;
  className?: string;
};

export function LoadingSpinner({ 
  size = 'md', 
  message = 'Loading...', 
  className = '' 
}: LoadingSpinnerProps) {
  const { colors } = useTheme();

  const sizeMap = {
    sm: 'h-6 w-6 border-2',
    md: 'h-12 w-12 border-2',
    lg: 'h-16 w-16 border-3',
  };

  return (
    <div 
      className={`flex flex-col items-center justify-center gap-3 ${className}`}
      role="status"
      aria-live="polite"
      aria-busy="true"
    >
      <div 
        className={`animate-spin rounded-full ${sizeMap[size]}`}
        style={{ borderColor: `${colors.activeText}40`, borderTopColor: colors.activeText }}
        aria-hidden="true"
      />
      <span className="sr-only">{message}</span>
      {message && (
        <p 
          className="text-sm font-semibold" 
          style={{ color: colors.textMuted }}
          aria-hidden="true"
        >
          {message}
        </p>
      )}
    </div>
  );
}
