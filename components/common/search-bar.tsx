'use client';

import { ReactNode } from 'react';
import { Search, SlidersHorizontal } from 'lucide-react';
import { useTheme } from '@/lib/theme/theme-provider';
import { iconSize, iconButtonClasses } from '@/lib/design-system/dimensions';

type SearchBarProps = {
  placeholder: string;
  value?: string;
  onChangeText?: (value: string) => void;
  onFilterPress?: () => void;
  variant?: 'elevated' | 'muted';
  showFilter?: boolean;
  rightAccessory?: ReactNode;
  ariaLabel?: string;
  id?: string;
};

export function SearchBar({
  placeholder,
  value,
  onChangeText,
  onFilterPress,
  variant = 'elevated',
  showFilter = true,
  rightAccessory,
  ariaLabel = 'Search properties',
  id = 'search',
}: SearchBarProps) {
  const isElevated = variant === 'elevated';
  const { colors } = useTheme();

  return (
    <div 
      className={`flex items-center w-full ${isElevated ? 'gap-2 rounded-[22px] p-2.5 shadow-lg' : 'gap-3'}`}
      style={isElevated ? { backgroundColor: colors.surface } : undefined}
      role="search"
    >
      {/* Input wrapper */}
      <label htmlFor={id} className="sr-only">
        {ariaLabel}
      </label>
      <div 
        className={`
          flex flex-1 items-center gap-2.5 border min-w-0
          ${isElevated 
            ? 'h-11 rounded-2xl px-3.5' 
            : 'h-12 rounded-xl px-4'
          }
        `}
        style={isElevated 
          ? { backgroundColor: colors.surface, borderColor: colors.border }
          : { backgroundColor: colors.surfaceMuted, borderColor: colors.border }
        }
      >
        <Search 
          size={iconSize.lg} 
          className="flex-shrink-0" 
          style={{ color: colors.textMuted }} 
          strokeWidth={2.1}
          aria-hidden="true"
        />
        <input
          id={id}
          type="search"
          value={value}
          onChange={(e) => onChangeText?.(e.target.value)}
          placeholder={placeholder}
          className="flex-1 outline-none text-sm font-medium bg-transparent min-w-0"
          style={{ color: colors.text }}
          aria-label={ariaLabel}
          autoComplete="off"
        />
      </div>

      {/* Filter button */}
      {showFilter && (
        <button
          type="button"
          onClick={onFilterPress}
          className={`
            flex items-center justify-center flex-shrink-0
            transition-transform active:scale-95
            ${isElevated 
              ? iconButtonClasses.lg
              : `${iconButtonClasses.xl} border`
            }
          `}
          style={isElevated
            ? { backgroundColor: colors.surfaceMuted }
            : { backgroundColor: colors.surfaceMuted, borderColor: colors.border }
          }
          aria-label="Open search filters"
        >
          <SlidersHorizontal 
            size={iconSize.lg} 
            style={{ color: colors.textMuted }} 
            strokeWidth={2.2}
            aria-hidden="true"
          />
        </button>
      )}

      {/* Right accessory (for search button, etc.) */}
      {rightAccessory}
    </div>
  );
}
