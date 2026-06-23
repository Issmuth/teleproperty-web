'use client';

import { useRef } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Info } from 'lucide-react';
import { AuthShell } from '@/components/auth/auth-shell';
import { AuthStepper } from '@/components/auth/auth-stepper';
import { useAuth } from '@/lib/auth/auth-store';

export default function VerifyAuthPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { draft, updateDraft } = useAuth();
  const otpRefs = useRef<Array<HTMLInputElement | null>>([]);
  
  const redirectTo = searchParams.get('redirectTo') || '/';
  const code = draft.otp;
  const phoneLabel = draft.phoneNumber.trim()
    ? `+251 ${draft.phoneNumber.trim()}`
    : '+251';

  const isContinueDisabled = code.some((item) => item.trim().length === 0);

  const updateCodeAtIndex = (index: number, value: string) => {
    const sanitized = value.replace(/[^0-9]/g, '').slice(-1);
    const next = [...code] as [string, string, string, string];
    next[index] = sanitized;
    updateDraft({ otp: next });

    if (sanitized && index < 3) {
      otpRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Backspace' && !code[index] && index > 0) {
      otpRefs.current[index - 1]?.focus();
    }
  };

  return (
    <AuthShell
      title="TeleProperty"
      subtitle="Ethiopia's #1 Property Platform"
      onBackPress={() => router.back()}
      onClosePress={() => router.replace('/')}
    >
      <div className="space-y-5 px-2 lg:px-0">
        <AuthStepper currentStep={2} steps={3} />

        <div className="space-y-1 mt-2 md:mt-4 lg:mt-0">
          <h2 className="text-xl md:text-2xl lg:text-3xl font-black text-gray-900 dark:text-white">
            Enter Verification Code
          </h2>
          <p className="text-sm md:text-base font-semibold text-gray-600 dark:text-gray-400 leading-relaxed">
            We sent a code to <span className="font-black">{phoneLabel}</span>
          </p>
        </div>

        {/* Demo Notice */}
        <div className="min-h-[48px] md:min-h-[52px] bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-2xl md:rounded-3xl px-4 flex items-center gap-2">
          <Info size={16} className="text-green-600 dark:text-green-500 flex-shrink-0 md:w-5 md:h-5" strokeWidth={2.5} />
          <p className="text-xs md:text-sm font-black text-green-600 dark:text-green-500">
            Demo: use any 4 digits
          </p>
        </div>

        {/* OTP Input */}
        <div className="flex justify-center gap-2.5 md:gap-3 mt-8">
          {code.map((digit, index) => (
            <input
              key={index}
              ref={(ref) => {
                otpRefs.current[index] = ref;
              }}
              type="text"
              inputMode="numeric"
              maxLength={1}
              value={digit}
              onChange={(e) => updateCodeAtIndex(index, e.target.value)}
              onKeyDown={(e) => handleKeyDown(index, e)}
              className={`w-[52px] h-[56px] md:w-[64px] md:h-[68px] lg:w-[72px] lg:h-[76px] text-center text-xl md:text-2xl font-black rounded-xl md:rounded-2xl border-2 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-green-500 ${
                digit
                  ? 'border-green-600 dark:border-green-500'
                  : 'border-gray-300 dark:border-gray-700'
              }`}
            />
          ))}
        </div>

        {/* Verify Button */}
        <button
          onClick={() => router.push(`/auth/role?redirectTo=${encodeURIComponent(redirectTo)}`)}
          disabled={isContinueDisabled}
          className={`w-full min-h-[48px] md:min-h-[52px] rounded-2xl md:rounded-3xl font-black text-[15px] md:text-base shadow-lg transition-all mt-6 ${
            isContinueDisabled
              ? 'bg-gray-200 dark:bg-gray-800 text-gray-400 dark:text-gray-500 cursor-not-allowed'
              : 'bg-[#22C55E] hover:bg-[#1EA952] text-white'
          }`}
        >
          Verify & Continue
        </button>

        {/* Resend Code */}
        <button
          onClick={() => updateDraft({ otp: ['', '', '', ''] })}
          className="w-full text-center pt-2"
        >
          <span className="text-sm md:text-base font-black text-green-600 dark:text-green-500 hover:underline">
            Resend Code
          </span>
        </button>
      </div>
    </AuthShell>
  );
}
