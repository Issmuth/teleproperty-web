'use client';

import { useRouter } from 'next/navigation';
import { ArrowLeft } from 'lucide-react';
import { useTheme } from '@/lib/theme/theme-provider';
import { buttonClasses, iconSize } from '@/lib/design-system/dimensions';

export default function NotFound() {
  const router = useRouter();
  const { colors } = useTheme();

  return (
    <div 
      className="min-h-screen flex items-center justify-center px-4"
      style={{ backgroundColor: colors.background }}
      role="main"
      aria-labelledby="not-found-title"
    >
      <div className="max-w-md w-full text-center space-y-6">
        {/* 404 Number */}
        <div>
          <h1 
            id="not-found-title"
            className="text-[140px] lg:text-[160px] font-black leading-none tracking-tighter mb-2"
            style={{ color: colors.text }}
            aria-label="Error 404"
          >
            404
          </h1>
          <div 
            className="w-16 h-1 mx-auto rounded-full"
            style={{ backgroundColor: colors.activeText }}
            aria-hidden="true"
          />
        </div>

        {/* Message */}
        <div className="space-y-2">
          <h2 
            className="text-xl font-bold"
            style={{ color: colors.text }}
          >
            Page not found
          </h2>
          <p 
            className="text-sm font-medium"
            style={{ color: colors.textMuted }}
          >
            The page you're looking for doesn't exist or has been moved.
          </p>
        </div>

        {/* Action Button */}
        <button
          onClick={() => router.push('/')}
          className={`${buttonClasses.lg} w-full sm:w-auto flex items-center justify-center gap-2 mx-auto transition-all hover:opacity-90`}
          style={{
            backgroundColor: colors.activeText,
            color: '#FFFFFF',
          }}
          aria-label="Go back to home page"
        >
          <ArrowLeft size={iconSize.lg} strokeWidth={2.5} aria-hidden="true" />
          <span>Back to Home</span>
        </button>
      </div>
    </div>
  );
}
