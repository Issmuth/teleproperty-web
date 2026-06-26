'use client';

import { useTheme } from '@/lib/theme/theme-provider';

/**
 * Skip Links Component
 * Provides keyboard users with quick navigation to main content areas
 * These links are hidden until focused via keyboard navigation
 */
export function SkipLinks() {
  const { colors } = useTheme();

  const links = [
    { href: '#main-content', label: 'Skip to main content' },
    { href: '#main-navigation', label: 'Skip to navigation' },
    { href: '#search', label: 'Skip to search' },
  ];

  return (
    <>
      <nav className="skip-links-container" aria-label="Skip links">
        {links.map((link, index) => (
          <a
            key={link.href}
            href={link.href}
            className="skip-link"
            style={{
              backgroundColor: colors.activeText,
              color: '#FFFFFF',
              top: `${index * 48}px`, // Stack them vertically
            }}
          >
            {link.label}
          </a>
        ))}
      </nav>

      <style jsx>{`
        .skip-links-container {
          position: fixed;
          top: 0;
          left: 0;
          z-index: 9999;
        }

        .skip-link {
          position: absolute;
          left: -9999px;
          padding: 12px 20px;
          font-size: 14px;
          font-weight: 700;
          text-decoration: none;
          border-radius: 0 0 8px 0;
          transition: left 0.2s ease;
          white-space: nowrap;
        }

        .skip-link:focus {
          left: 0;
          outline: 2px solid #FFFFFF;
          outline-offset: 2px;
        }
      `}</style>
    </>
  );
}

