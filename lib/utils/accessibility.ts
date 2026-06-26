/**
 * Accessibility Utilities
 * Helper functions and utilities for implementing WCAG 2.1 AA compliance
 */

/**
 * Generate a unique ID for form controls and their labels
 */
export function generateId(prefix: string): string {
  return `${prefix}-${Math.random().toString(36).substr(2, 9)}`;
}

/**
 * Get ARIA props for form inputs
 */
export function getInputAriaProps({
  label,
  error,
  required = false,
  describedBy,
}: {
  label: string;
  error?: string;
  required?: boolean;
  describedBy?: string;
}) {
  const errorId = error ? `error-${generateId('input')}` : undefined;
  
  return {
    'aria-label': label,
    'aria-required': required,
    'aria-invalid': !!error,
    'aria-describedby': errorId || describedBy,
    errorId,
  };
}

/**
 * Get ARIA props for buttons with icons
 */
export function getButtonAriaProps({
  label,
  hasTextContent = false,
}: {
  label: string;
  hasTextContent?: boolean;
}) {
  // If button has visible text, icon should be hidden from screen readers
  if (hasTextContent) {
    return {
      iconProps: { 'aria-hidden': true } as const,
    };
  }
  
  // If button only has icon, add aria-label
  return {
    'aria-label': label,
    iconProps: { 'aria-hidden': true } as const,
  };
}

/**
 * Trap focus within a modal or dialog
 */
export function trapFocus(element: HTMLElement) {
  const focusableElements = element.querySelectorAll<HTMLElement>(
    'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
  );
  
  const firstElement = focusableElements[0];
  const lastElement = focusableElements[focusableElements.length - 1];

  function handleTabKey(e: KeyboardEvent) {
    if (e.key !== 'Tab') return;

    if (e.shiftKey) {
      // Shift + Tab
      if (document.activeElement === firstElement) {
        lastElement?.focus();
        e.preventDefault();
      }
    } else {
      // Tab
      if (document.activeElement === lastElement) {
        firstElement?.focus();
        e.preventDefault();
      }
    }
  }

  element.addEventListener('keydown', handleTabKey);
  
  // Focus first element
  firstElement?.focus();

  return () => {
    element.removeEventListener('keydown', handleTabKey);
  };
}

/**
 * Announce message to screen readers
 */
export function announceToScreenReader(message: string, priority: 'polite' | 'assertive' = 'polite') {
  const announcement = document.createElement('div');
  announcement.setAttribute('role', 'status');
  announcement.setAttribute('aria-live', priority);
  announcement.setAttribute('aria-atomic', 'true');
  announcement.className = 'sr-only';
  announcement.textContent = message;
  
  document.body.appendChild(announcement);
  
  // Remove after announcement
  setTimeout(() => {
    document.body.removeChild(announcement);
  }, 1000);
}

/**
 * Check if color contrast meets WCAG AA standards
 * Returns true if contrast ratio is sufficient
 */
export function meetsContrastRequirement(
  foreground: string,
  background: string,
  largeText = false
): boolean {
  const ratio = getContrastRatio(foreground, background);
  const required = largeText ? 3 : 4.5;
  return ratio >= required;
}

/**
 * Calculate contrast ratio between two colors
 * https://www.w3.org/TR/WCAG20-TECHS/G17.html
 */
function getContrastRatio(color1: string, color2: string): number {
  const l1 = getRelativeLuminance(color1);
  const l2 = getRelativeLuminance(color2);
  const lighter = Math.max(l1, l2);
  const darker = Math.min(l1, l2);
  return (lighter + 0.05) / (darker + 0.05);
}

/**
 * Get relative luminance of a color
 */
function getRelativeLuminance(color: string): number {
  // This is a simplified version - for production, use a proper color library
  const rgb = hexToRgb(color);
  if (!rgb) return 0;
  
  const [r, g, b] = [rgb.r, rgb.g, rgb.b].map((val) => {
    const normalized = val / 255;
    return normalized <= 0.03928
      ? normalized / 12.92
      : Math.pow((normalized + 0.055) / 1.055, 2.4);
  });
  
  return 0.2126 * r + 0.7152 * g + 0.0722 * b;
}

/**
 * Convert hex color to RGB
 */
function hexToRgb(hex: string): { r: number; g: number; b: number } | null {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result
    ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16),
      }
    : null;
}

/**
 * Keyboard event handlers
 */
export const keyboardHandlers = {
  /**
   * Handle Enter and Space as click for non-button elements
   */
  onActivate: (callback: () => void) => (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      callback();
    }
  },

  /**
   * Handle Escape key
   */
  onEscape: (callback: () => void) => (e: React.KeyboardEvent) => {
    if (e.key === 'Escape') {
      e.preventDefault();
      callback();
    }
  },

  /**
   * Handle arrow key navigation
   */
  onArrowNavigation: (callbacks: {
    onUp?: () => void;
    onDown?: () => void;
    onLeft?: () => void;
    onRight?: () => void;
  }) => (e: React.KeyboardEvent) => {
    switch (e.key) {
      case 'ArrowUp':
        e.preventDefault();
        callbacks.onUp?.();
        break;
      case 'ArrowDown':
        e.preventDefault();
        callbacks.onDown?.();
        break;
      case 'ArrowLeft':
        e.preventDefault();
        callbacks.onLeft?.();
        break;
      case 'ArrowRight':
        e.preventDefault();
        callbacks.onRight?.();
        break;
    }
  },
};

/**
 * Screen reader only CSS class
 * Use for elements that should only be visible to screen readers
 */
export const srOnlyClass = `
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border-width: 0;
`;
