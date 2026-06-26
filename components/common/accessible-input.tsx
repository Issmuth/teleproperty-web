'use client';

import { forwardRef, InputHTMLAttributes, ReactNode } from 'react';
import { useTheme } from '@/lib/theme/theme-provider';
import { inputClasses } from '@/lib/design-system/dimensions';
import { generateId } from '@/lib/utils/accessibility';

interface AccessibleInputProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'size'> {
  label: string;
  error?: string;
  helperText?: string;
  icon?: ReactNode;
  size?: 'sm' | 'md' | 'lg';
  showLabel?: boolean;
}

/**
 * Accessible Input Component
 * Fully WCAG 2.1 AA compliant input with proper labels and ARIA attributes
 */
export const AccessibleInput = forwardRef<HTMLInputElement, AccessibleInputProps>(
  (
    {
      label,
      error,
      helperText,
      icon,
      size = 'lg',
      showLabel = true,
      required,
      className = '',
      id: providedId,
      ...props
    },
    ref
  ) => {
    const { colors } = useTheme();
    const id = providedId || generateId('input');
    const errorId = error ? `${id}-error` : undefined;
    const helperId = helperText ? `${id}-helper` : undefined;
    const describedBy = [errorId, helperId].filter(Boolean).join(' ') || undefined;

    return (
      <div className="space-y-2">
        {/* Label */}
        <label
          htmlFor={id}
          className={`text-sm font-black ${showLabel ? '' : 'sr-only'}`}
          style={{ color: colors.text }}
        >
          {label}
          {required && (
            <span className="ml-1" aria-label="required">
              *
            </span>
          )}
        </label>

        {/* Input Container */}
        <div className="relative">
          <div
            className={`flex items-center gap-3 ${inputClasses[size]} border ${className}`}
            style={{
              backgroundColor: colors.background,
              borderColor: error ? '#EF4444' : colors.border,
            }}
          >
            {/* Icon */}
            {icon && (
              <div aria-hidden="true" style={{ color: colors.textMuted }}>
                {icon}
              </div>
            )}

            {/* Input */}
            <input
              ref={ref}
              id={id}
              className="flex-1 bg-transparent text-sm font-semibold outline-none"
              style={{ color: colors.text }}
              aria-required={required}
              aria-invalid={!!error}
              aria-describedby={describedBy}
              {...props}
            />
          </div>
        </div>

        {/* Helper Text */}
        {helperText && !error && (
          <p
            id={helperId}
            className="text-xs font-medium"
            style={{ color: colors.textMuted }}
          >
            {helperText}
          </p>
        )}

        {/* Error Message */}
        {error && (
          <p
            id={errorId}
            role="alert"
            aria-live="assertive"
            className="text-xs font-bold"
            style={{ color: '#EF4444' }}
          >
            {error}
          </p>
        )}
      </div>
    );
  }
);

AccessibleInput.displayName = 'AccessibleInput';
