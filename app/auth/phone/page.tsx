'use client';

import { useMemo } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { ArrowRight, Flag } from 'lucide-react';
import { AuthShell } from '@/components/auth/auth-shell';
import { AuthStepper } from '@/components/auth/auth-stepper';
import { AccessibleInput } from '@/components/common/accessible-input';
import { useAuth } from '@/lib/auth/auth-store';

export default function PhoneAuthPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { draft, updateDraft } = useAuth();
  
  const redirectTo = searchParams.get('redirectTo') || '/';

  const isContinueDisabled = useMemo(
    () => !draft.fullName.trim() || !draft.phoneNumber.trim(),
    [draft.fullName, draft.phoneNumber]
  );

  return (
    <AuthShell
      title="TeleProperty"
      subtitle="Ethiopia's #1 Property Platform"
      onBackPress={() => router.back()}
      onClosePress={() => router.replace('/')}
    >
      <div className="space-y-5 px-2 lg:px-0">
        <AuthStepper currentStep={1} steps={3} />

        <div className="space-y-1 mt-2 md:mt-4 lg:mt-0">
          <h1 className="text-xl md:text-2xl lg:text-3xl font-black text-gray-900 dark:text-white">
            Enter Your Phone
          </h1>
          <p className="text-sm md:text-base font-semibold text-gray-600 dark:text-gray-400">
            We'll send a one-time code
          </p>
        </div>

        <form aria-label="Phone authentication form">
          {/* Full Name Field */}
          <div className="space-y-2 mb-5">
            <AccessibleInput
              id="full-name"
              label="Full Name"
              type="text"
              value={draft.fullName}
              onChange={(e) => updateDraft({ fullName: e.target.value })}
              placeholder="Your full name"
              required
              className="w-full min-h-[48px] md:min-h-[52px] px-4 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-xl md:rounded-2xl text-sm md:text-base font-semibold text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
            />
          </div>

          {/* Phone Number Field */}
          <div className="space-y-2 mb-5">
            <label htmlFor="phone-number" className="text-sm md:text-base font-black text-gray-900 dark:text-white">
              Phone Number
            </label>
            <div className="flex gap-2.5">
              <div 
                className="w-[88px] md:w-[96px] min-h-[48px] md:min-h-[52px] bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-xl md:rounded-2xl flex items-center justify-center gap-2 flex-shrink-0"
                aria-label="Country code Ethiopia +251"
              >
                <Flag size={16} className="text-gray-900 dark:text-white md:w-5 md:h-5" strokeWidth={2.5} aria-hidden="true" />
                <span className="text-sm md:text-base font-black text-gray-900 dark:text-white">+251</span>
              </div>
              <input
                id="phone-number"
                type="tel"
                value={draft.phoneNumber}
                onChange={(e) => updateDraft({ phoneNumber: e.target.value })}
                placeholder="9X XXX XXXX"
                maxLength={10}
                required
                aria-required="true"
                aria-describedby="phone-help"
                className="flex-1 min-h-[48px] md:min-h-[52px] px-4 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-xl md:rounded-2xl text-sm md:text-base font-semibold text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
              />
            </div>
            <p id="phone-help" className="sr-only">
              Enter your 10-digit Ethiopian phone number without the country code
            </p>
          </div>

          {/* Referral Code Field */}
          <div className="space-y-2 mb-5">
            <AccessibleInput
              id="referral-code"
              label="Referral Code (Optional)"
              type="text"
              value={draft.referralCode}
              onChange={(e) => updateDraft({ referralCode: e.target.value.toUpperCase() })}
              placeholder="e.g. TPF-BIRUK-001"
              className="w-full min-h-[48px] md:min-h-[52px] px-4 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-xl md:rounded-2xl text-sm md:text-base font-semibold text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
            />
          </div>

          {/* Continue Button */}
          <button
            type="submit"
            onClick={(e) => {
              e.preventDefault();
              router.push(`/auth/verify?redirectTo=${encodeURIComponent(redirectTo)}`);
            }}
            disabled={isContinueDisabled}
            aria-label="Send one-time password to your phone"
            className={`w-full min-h-[48px] md:min-h-[52px] rounded-2xl md:rounded-3xl flex items-center justify-center gap-2 font-black text-[15px] md:text-base shadow-lg transition-all mt-6 ${
              isContinueDisabled
                ? 'bg-gray-200 dark:bg-gray-800 text-gray-400 dark:text-gray-500 cursor-not-allowed'
                : 'bg-[#22C55E] hover:bg-[#1EA952] text-white'
            }`}
          >
            <ArrowRight size={18} strokeWidth={2.5} className="md:w-5 md:h-5" aria-hidden="true" />
            <span>Send OTP</span>
          </button>

          {/* Terms Notice */}
          <p className="text-xs md:text-sm text-center text-gray-500 dark:text-gray-400 mt-4">
            By continuing you agree to our Terms & Privacy Policy
          </p>
        </form>
      </div>
    </AuthShell>
  );
}
