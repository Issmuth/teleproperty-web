'use client';

import { ReactNode } from 'react';
import { Search, SlidersHorizontal } from 'lucide-react';
import { useTheme } from '@/lib/theme/theme-provider';

type SearchBarProps = {
  placeholder: string;
  value?: string;
  onChangeText?: (value: string) => void;
  onFilterPress?: () => void;
  variant?: 'elevated' | 'muted';
  showFilter?: boolean;
  rightAccessory?: ReactNode;
};

export function SearchBar({
  placeholder,
  value,
  onChangeText,
  onFilterPress,
  variant = 'elevated',
  showFilter = true,
  rightAccessory,
}: SearchBarProps) {
  const isElevated = variant === 'elevated';
  const { colors } = useTheme();

  return (
    <div 
      className={`flex items-center w-full ${isElevated ? 'gap-2 rounded-[22px] p-2.5 shadow-lg' : 'gap-3'}`}
      style={isElevated ? { backgroundColor: colors.surface } : undefined}
    >
      {/* Input wrapper */}
      <div 
        className={`
          flex flex-1 items-center gap-2.5 border min-w-0
          ${isElevated 
            ? 'min-h-[44px] rounded-2xl px-3.5' 
            : 'h-12 rounded-xl px-4'
          }
        `}
        style={isElevated 
          ? { backgroundColor: colors.surface, borderColor: colors.border }
          : { backgroundColor: colors.surfaceMuted, borderColor: colors.border }
        }
      >
        <Search size={18} className="flex-shrink-0" style={{ color: colors.textMuted }} strokeWidth={2.1} />
        <input
          type="text"
          value={value}
          onChange={(e) => onChangeText?.(e.target.value)}
          placeholder={placeholder}
          className="flex-1 outline-none text-sm font-medium bg-transparent min-w-0"
          style={{ color: colors.text }}
        />
      </div>

      {/* Filter button */}
      {showFilter && (
        <button
          onClick={onFilterPress}
          className={`
            flex items-center justify-center flex-shrink-0
            transition-transform active:scale-95
            ${isElevated 
              ? 'w-11 h-11 rounded-[14px]' 
              : 'w-12 h-12 rounded-xl border'
            }
          `}
          style={isElevated
            ? { backgroundColor: colors.surfaceMuted }
            : { backgroundColor: colors.surfaceMuted, borderColor: colors.border }
          }
        >
          <SlidersHorizontal size={18} style={{ color: colors.textMuted }} strokeWidth={2.2} />
        </button>
      )}

      {/* Right accessory (for search button, etc.) */}
      {rightAccessory}
    </div>
  );
}
