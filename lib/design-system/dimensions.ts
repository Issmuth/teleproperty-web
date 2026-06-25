/**
 * Design System - Dimensions & Spacing
 * 
 * Standardized values for consistent UI across the application.
 * Use these constants instead of arbitrary values.
 */

// ============================================================================
// SPACING SCALE (based on 4px base unit)
// ============================================================================
export const spacing = {
  // Extra small spacing
  xs: '0.25rem',    // 4px
  sm: '0.5rem',     // 8px
  md: '0.75rem',    // 12px
  lg: '1rem',       // 16px
  xl: '1.25rem',    // 20px
  '2xl': '1.5rem',  // 24px
  '3xl': '2rem',    // 32px
  '4xl': '2.5rem',  // 40px
  '5xl': '3rem',    // 48px
  '6xl': '4rem',    // 64px
} as const;

// ============================================================================
// ICON SIZES
// ============================================================================
export const iconSize = {
  xs: 12,
  sm: 14,
  md: 16,
  lg: 18,
  xl: 20,
  '2xl': 24,
  '3xl': 32,
  '4xl': 48,
} as const;

// ============================================================================
// BUTTON/INTERACTIVE ELEMENT HEIGHTS
// ============================================================================
export const buttonHeight = {
  sm: '2rem',       // 32px - small buttons, chips
  md: '2.5rem',     // 40px - default buttons
  lg: '3rem',       // 48px - primary actions
  xl: '3.5rem',     // 56px - hero CTAs
} as const;

// ============================================================================
// ICON BUTTON/AVATAR SIZES
// ============================================================================
export const iconButtonSize = {
  xs: '1.5rem',     // 24px
  sm: '2rem',       // 32px
  md: '2.25rem',    // 36px
  lg: '2.5rem',     // 40px
  xl: '3rem',       // 48px
  '2xl': '3.5rem',  // 56px
  '3xl': '4rem',    // 64px
} as const;

// ============================================================================
// CARD PADDING
// ============================================================================
export const cardPadding = {
  sm: '0.75rem',    // 12px - compact cards
  md: '1rem',       // 16px - default cards
  lg: '1.25rem',    // 20px - feature cards
  xl: '1.5rem',     // 24px - hero cards
} as const;

// ============================================================================
// BORDER RADIUS
// ============================================================================
export const borderRadius = {
  sm: '0.375rem',   // 6px - tags, small elements
  md: '0.5rem',     // 8px - buttons, inputs
  lg: '0.75rem',    // 12px - cards, containers
  xl: '1rem',       // 16px - large cards
  '2xl': '1.5rem',  // 24px - feature sections
  '3xl': '2rem',    // 32px - hero sections
  full: '9999px',   // full rounded
} as const;

// ============================================================================
// INPUT/FIELD HEIGHTS
// ============================================================================
export const inputHeight = {
  sm: '2rem',       // 32px
  md: '2.5rem',     // 40px
  lg: '3rem',       // 48px
} as const;

// ============================================================================
// CONTAINER MAX WIDTHS
// ============================================================================
export const containerWidth = {
  sm: '640px',      // Small content
  md: '768px',      // Medium content
  lg: '1024px',     // Large content
  xl: '1280px',     // Extra large content
  '2xl': '1536px',  // Full width content
  content: '1200px', // Standard content width
} as const;

// ============================================================================
// GAP SPACING (for flex/grid)
// ============================================================================
export const gap = {
  xs: '0.25rem',    // 4px
  sm: '0.5rem',     // 8px
  md: '0.75rem',    // 12px
  lg: '1rem',       // 16px
  xl: '1.5rem',     // 24px
  '2xl': '2rem',    // 32px
} as const;

// ============================================================================
// IMAGE HEIGHTS (common aspect ratios)
// ============================================================================
export const imageHeight = {
  thumb: '4rem',     // 64px - thumbnail
  card: '9rem',      // 144px - card images
  cardLg: '12rem',   // 192px - large card images
  hero: '16rem',     // 256px - hero images (mobile)
  heroLg: '24rem',   // 384px - hero images (desktop)
} as const;

// ============================================================================
// UTILITY FUNCTIONS
// ============================================================================

/**
 * Get consistent padding for a card/container
 * @param size - The size variant (sm, md, lg, xl)
 * @param responsive - Whether to use responsive padding
 */
export const getCardPadding = (size: keyof typeof cardPadding = 'md', responsive = true) => {
  if (responsive) {
    const mobileSize = size === 'xl' ? 'lg' : size === 'lg' ? 'md' : 'sm';
    return `${cardPadding[mobileSize]} lg:${cardPadding[size]}`;
  }
  return cardPadding[size];
};

/**
 * Get consistent gap spacing
 * @param size - The gap size (xs, sm, md, lg, xl, 2xl)
 * @param responsive - Whether to use responsive gap
 */
export const getGap = (size: keyof typeof gap = 'md', responsive = true) => {
  if (responsive) {
    const mobileSize = size === '2xl' ? 'xl' : size === 'xl' ? 'lg' : size;
    return `${gap[mobileSize]} lg:${gap[size]}`;
  }
  return gap[size];
};

/**
 * Get consistent border radius
 * @param size - The radius size
 */
export const getBorderRadius = (size: keyof typeof borderRadius = 'lg') => {
  return borderRadius[size];
};

// ============================================================================
// TAILWIND CLASS HELPERS
// ============================================================================

/**
 * Standard button classes
 */
export const buttonClasses = {
  sm: 'h-8 px-3 text-xs rounded-lg',
  md: 'h-10 px-4 text-sm rounded-xl',
  lg: 'h-12 px-6 text-base rounded-xl',
  xl: 'h-14 px-8 text-lg rounded-2xl',
} as const;

/**
 * Standard icon button classes
 */
export const iconButtonClasses = {
  xs: 'w-6 h-6 rounded-lg',
  sm: 'w-8 h-8 rounded-xl',
  md: 'w-9 h-9 rounded-xl',
  lg: 'w-10 h-10 rounded-xl',
  xl: 'w-12 h-12 rounded-2xl',
} as const;

/**
 * Standard input/field classes
 */
export const inputClasses = {
  sm: 'h-8 px-3 text-xs rounded-lg',
  md: 'h-10 px-4 text-sm rounded-xl',
  lg: 'h-12 px-4 text-base rounded-xl',
} as const;

/**
 * Standard card classes
 */
export const cardClasses = {
  sm: 'p-3 rounded-lg',
  md: 'p-4 rounded-xl',
  lg: 'p-5 rounded-2xl',
  xl: 'p-6 lg:p-8 rounded-2xl lg:rounded-3xl',
} as const;

// ============================================================================
// EXPORT DEFAULT FOR CONVENIENCE
// ============================================================================
export const dimensions = {
  spacing,
  iconSize,
  buttonHeight,
  iconButtonSize,
  cardPadding,
  borderRadius,
  inputHeight,
  containerWidth,
  gap,
  imageHeight,
  // Helper functions
  getCardPadding,
  getGap,
  getBorderRadius,
  // Class helpers
  buttonClasses,
  iconButtonClasses,
  inputClasses,
  cardClasses,
} as const;

export default dimensions;
