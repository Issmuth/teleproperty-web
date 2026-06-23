'use client';

import { ChevronLeft, Home, X } from 'lucide-react';
import { ReactNode } from 'react';
import { useRouter } from 'next/navigation';

type AuthShellProps = {
  title: string;
  subtitle: string;
  onBackPress?: () => void;
  onClosePress?: () => void;
  children: ReactNode;
};

export function AuthShell({
  title,
  subtitle,
  onBackPress,
  onClosePress,
  children,
}: AuthShellProps) {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Mobile/Tablet Layout - Stacked */}
      <div className="lg:hidden flex flex-col min-h-screen">
        {/* Hero Section with Gradient */}
        <div className="relative bg-gradient-to-br from-[#127C40] via-[#109146] to-[#19A856] min-h-[210px] md:min-h-[260px] px-4 py-6 md:py-8 flex items-center justify-center overflow-hidden">
          {/* Decorative circles */}
          <div className="absolute left-[-42px] md:left-[-60px] top-[54px] md:top-[80px] w-[120px] h-[120px] md:w-[180px] md:h-[180px] rounded-full bg-white/8" />
          <div className="absolute right-[-18px] md:right-[-30px] top-[-14px] md:top-[-20px] w-[120px] h-[120px] md:w-[180px] md:h-[180px] rounded-full bg-white/10" />

          {/* Top Actions */}
          <div className="absolute top-6 md:top-8 left-4 md:left-8 right-4 md:right-8 flex justify-end items-center">
            {onClosePress && (
              <button
                onClick={onClosePress}
                className="p-2 md:p-2.5 rounded-full bg-white/16 hover:bg-white/24 transition-colors"
                aria-label="Close"
              >
                <X size={20} className="text-white" />
              </button>
            )}
          </div>

          {/* Brand Block */}
          <div className="relative z-10 flex flex-col items-center gap-3 md:gap-5">
            <div className="p-1 md:p-1.5 rounded-2xl md:rounded-3xl bg-white/95">
              <div className="w-[42px] h-[42px] md:w-[60px] md:h-[60px] rounded-[14px] md:rounded-[20px] bg-white flex items-center justify-center">
                <Home size={24} className="text-[#0F7B44] md:w-8 md:h-8" strokeWidth={2.4} />
              </div>
            </div>
            <h1 className="text-white text-2xl md:text-4xl font-black tracking-wide">
              {title}
            </h1>
            <p className="text-white/94 text-sm md:text-lg font-bold">
              {subtitle}
            </p>
          </div>

          {/* Back Button */}
          {onBackPress && (
            <button
              onClick={onBackPress}
              className="absolute left-4 md:left-8 top-[78px] md:top-[110px] p-2 md:p-2.5 rounded-full bg-white/16 hover:bg-white/24 transition-colors"
              aria-label="Go back"
            >
              <ChevronLeft size={20} className="text-white md:w-6 md:h-6" />
            </button>
          )}
        </div>

        {/* Content Area */}
        <div className="flex-1 -mt-5 md:-mt-7 bg-white dark:bg-gray-900 rounded-t-[28px] md:rounded-t-[36px] px-4 py-6 md:px-8 md:py-10">
          {children}
        </div>
      </div>

      {/* Desktop Layout - Side by Side */}
      <div className="hidden lg:flex min-h-screen">
        {/* Left Side - Brand Section */}
        <div className="w-1/2 relative bg-gradient-to-br from-[#127C40] via-[#109146] to-[#19A856] flex items-center justify-center overflow-hidden">
          {/* Decorative circles */}
          <div className="absolute left-[-80px] top-[20%] w-[300px] h-[300px] rounded-full bg-white/8" />
          <div className="absolute right-[-60px] top-[-80px] w-[280px] h-[280px] rounded-full bg-white/10" />
          <div className="absolute left-[10%] bottom-[10%] w-[200px] h-[200px] rounded-full bg-white/6" />

          {/* Brand Content */}
          <div className="relative z-10 flex flex-col items-center gap-6 px-12">
            <div className="p-2 rounded-3xl bg-white/95">
              <div className="w-[80px] h-[80px] rounded-[24px] bg-white flex items-center justify-center">
                <Home size={40} className="text-[#0F7B44]" strokeWidth={2.4} />
              </div>
            </div>
            <h1 className="text-white text-5xl font-black tracking-wide text-center">
              {title}
            </h1>
            <p className="text-white/94 text-xl font-bold text-center">
              {subtitle}
            </p>
          </div>

          {/* Close Button - Top Right of Brand Section */}
          {onClosePress && (
            <button
              onClick={onClosePress}
              className="absolute top-8 right-8 p-3 rounded-full bg-white/16 hover:bg-white/24 transition-colors"
              aria-label="Close"
            >
              <X size={24} className="text-white" />
            </button>
          )}
        </div>

        {/* Right Side - Auth Content */}
        <div className="w-1/2 bg-white dark:bg-gray-900 flex items-center justify-center p-12 relative">
          {/* Back Button - Inside Auth Block */}
          {onBackPress && (
            <button
              onClick={onBackPress}
              className="absolute top-8 left-8 p-2.5 rounded-full bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors flex items-center gap-2 text-gray-700 dark:text-gray-300 z-10"
              aria-label="Go back"
            >
              <ChevronLeft size={20} />
              <span className="text-sm font-semibold">Back</span>
            </button>
          )}

          {/* Content with padding to avoid back button */}
          <div className={`w-full max-w-lg ${onBackPress ? 'pt-16' : ''}`}>
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}
