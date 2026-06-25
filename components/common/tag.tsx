'use client';

import { LucideIcon } from 'lucide-react';
import { useTheme } from '@/lib/theme/theme-provider';

export type TagVariant = 
  | 'featured' 
  | 'forSale' 
  | 'verified' 
  | 'status' 
  | 'muted'
  | 'primary'
  | 'amber'
  | 'custom';

export type TagSize = 'xs' | 'sm' | 'md';

type TagProps = {
  children: React.ReactNode;
  variant?: TagVariant;
  size?: TagSize;
  icon?: LucideIcon;
  iconSize?: number;
  customBg?: string;
  customColor?: string;
  className?: string;
};

const variantStyles: Record<TagVariant, { bg: string; color: string; border?: string }> = {
  featured: { bg: '#FBA100', color: '#FFFFFF' },
  forSale: { bg: '#10B981', color: '#FFFFFF' },
  verified: { bg: '#FFFFFF', color: '#0A7A4A', border: 'transparent' },
  status: { bg: '#16A34A', color: '#FFFFFF' },
  muted: { bg: '', color: '' }, // Uses theme colors
  primary: { bg: '', color: '' }, // Uses theme colors
  amber: { bg: 'rgba(245, 158, 11, 0.1)', color: '' }, // Uses theme text color
  custom: { bg: '', color: '' }, // Uses customBg and customColor props
};

const sizeStyles: Record<TagSize, { px: string; py: string; text: string; rounded: string }> = {
  xs: { px: 'px-1.5', py: 'py-0.5', text: 'text-[9px]', rounded: 'rounded-md' },
  sm: { px: 'px-2', py: 'py-0.5', text: 'text-[10px]', rounded: 'rounded-lg' },
  md: { px: 'px-3', py: 'py-1.5', text: 'text-xs', rounded: 'rounded-full' },
};

export function Tag({
  children,
  variant = 'muted',
  size = 'xs',
  icon: Icon,
  iconSize,
  customBg,
  customColor,
  className = '',
}: TagProps) {
  const { colors, isDark } = useTheme();
  
  const variantStyle = variantStyles[variant];
  const sizeStyle = sizeStyles[size];
  
  // Determine background color
  let backgroundColor = variantStyle.bg;
  if (variant === 'muted') {
    backgroundColor = colors.surfaceMuted;
  } else if (variant === 'primary') {
    backgroundColor = colors.activeSurface;
  } else if (variant === 'custom' && customBg) {
    backgroundColor = customBg;
  }
  
  // Determine text color
  let textColor = variantStyle.color;
  if (variant === 'muted') {
    textColor = colors.textMuted;
  } else if (variant === 'primary') {
    textColor = colors.activeText;
  } else if (variant === 'amber') {
    textColor = colors.text;
  } else if (variant === 'custom' && customColor) {
    textColor = customColor;
  }

  // Determine border color
  const borderColor = variantStyle.border || 'transparent';

  // Calculate icon size based on tag size
  const defaultIconSize = size === 'xs' ? 9 : size === 'sm' ? 10 : 12;
  const actualIconSize = iconSize ?? defaultIconSize;

  return (
    <div
      className={`inline-flex items-center gap-0.5 ${sizeStyle.px} ${sizeStyle.py} ${sizeStyle.rounded} font-bold ${className}`}
      style={{ 
        backgroundColor,
        color: textColor,
        border: borderColor !== 'transparent' ? `1px solid ${borderColor}` : undefined,
      }}
    >
      {Icon && <Icon size={actualIconSize} className={variant === 'featured' ? 'fill-current' : ''} />}
      <span className={sizeStyle.text}>{children}</span>
    </div>
  );
}
