'use client';

import { useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Phone } from 'lucide-react';
import { AuthShell } from '@/components/auth/auth-shell';
import { useAuth } from '@/lib/auth/auth-store';

export default function AuthIndexPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { isAuthenticated, isHydrated } = useAuth();
  
  const redirectTo = searchParams.get('redirectTo') || '/';

  useEffect(() => {
    if (isHydrated && isAuthenticated) {
      router.replace(redirectTo);
    }
  }, [isAuthenticated, isHydrated, redirectTo, router]);

  return (
    <AuthShell
      title="TeleProperty"
      subtitle="Ethiopia's #1 Property Platform"
      onClosePress={() => router.replace('/')}
    >
      <div className="space-y-6 px-2 lg:px-0">
        {/* Header Copy */}
        <div className="text-center space-y-2 mt-2 md:mt-4 lg:mt-0">
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-black text-gray-900 dark:text-white">
            Sign in with your phone number
          </h2>
          <p className="text-sm md:text-base font-semibold text-gray-600 dark:text-gray-400">
            Use OTP to continue to your account
          </p>
        </div>

        {/* Phone Option Card */}
        <button
          onClick={() => router.push(`/auth/phone?redirectTo=${encodeURIComponent(redirectTo)}`)}
          className="w-full min-h-[84px] md:min-h-[96px] bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-750 border border-gray-200 dark:border-gray-700 rounded-2xl md:rounded-3xl px-4 md:px-6 py-3 md:py-4 flex items-center gap-3 md:gap-4 shadow-sm hover:shadow-md transition-all"
        >
          <div className="w-[42px] h-[42px] md:w-[52px] md:h-[52px] rounded-xl md:rounded-2xl bg-green-50 dark:bg-green-900/30 flex items-center justify-center flex-shrink-0">
            <Phone size={20} className="text-green-600 dark:text-green-500 md:w-6 md:h-6" strokeWidth={2.2} />
          </div>
          <div className="flex-1 text-left">
            <h3 className="text-base md:text-lg font-black text-gray-900 dark:text-white">
              Continue with Phone
            </h3>
            <p className="text-xs md:text-sm font-semibold text-gray-600 dark:text-gray-400">
              Quick login with OTP
            </p>
          </div>
          <svg className="w-5 h-5 md:w-6 md:h-6 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>

        {/* Terms Notice */}
        <p className="text-xs md:text-sm text-center text-gray-500 dark:text-gray-400 font-medium leading-relaxed pt-2">
          By continuing, you agree to our Terms of Service and Privacy Policy
        </p>
      </div>
    </AuthShell>
  );
}
