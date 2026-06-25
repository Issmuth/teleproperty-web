'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Building2, Mail, Phone, UserRound, ChevronLeft } from 'lucide-react';
import { useTheme } from '@/lib/theme/theme-provider';
import { useI18n } from '@/lib/i18n/i18n-provider';
import { iconSize, iconButtonClasses, buttonClasses, inputClasses } from '@/lib/design-system/dimensions';

export default function BrokerRegisterPage() {
  const router = useRouter();
  const { colors } = useTheme();
  const { t } = useI18n();
  
  const [brokerName, setBrokerName] = useState('');
  const [companyName, setCompanyName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [email, setEmail] = useState('');

  const isSubmitDisabled = !brokerName.trim() || !phoneNumber.trim();

  const handleSubmit = () => {
    if (!isSubmitDisabled) {
      router.push('/broker-dashboard');
    }
  };

  return (
    <div className="min-h-screen" style={{ backgroundColor: colors.background }}>
      {/* Top Bar */}
      <div
        className="sticky top-14 lg:top-16 z-10 px-4 lg:px-6 py-4 flex items-center gap-3 border-b"
        style={{ backgroundColor: colors.background, borderColor: colors.border }}
      >
        <button
          onClick={() => router.back()}
          className={`${iconButtonClasses.md} flex items-center justify-center transition-colors`}
          style={{ backgroundColor: colors.surface }}
          onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = colors.iconButtonBackground)}
          onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = colors.surface)}
        >
          <ChevronLeft size={iconSize.xl} style={{ color: colors.text }} />
        </button>
        <div>
          <h1 className="text-lg font-black" style={{ color: colors.text }}>
            {t('account.brokerRegister.title')}
          </h1>
          <p className="text-xs font-semibold mt-0.5" style={{ color: colors.textMuted }}>
            {t('account.brokerRegister.subtitle')}
          </p>
        </div>
      </div>

      <div className="max-w-2xl mx-auto px-4 lg:px-8 pt-20 lg:pt-24 pb-32">
        <div
          className="rounded-3xl lg:rounded-[32px] p-6 lg:p-8 border space-y-5 lg:space-y-6"
          style={{
            backgroundColor: colors.surface,
            borderColor: colors.border,
          }}
        >
          {/* Broker Name */}
          <div className="space-y-2">
            <label className="text-sm font-black" style={{ color: colors.text }}>
              {t('account.brokerRegister.brokerName')}
            </label>
            <div
              className={`flex items-center gap-3 ${inputClasses.lg} border`}
              style={{
                backgroundColor: colors.background,
                borderColor: colors.border,
              }}
            >
              <UserRound size={iconSize.md} style={{ color: colors.textMuted }} />
              <input
                type="text"
                value={brokerName}
                onChange={(e) => setBrokerName(e.target.value)}
                placeholder={t('account.brokerRegister.brokerNamePlaceholder')}
                className="flex-1 bg-transparent text-sm font-semibold outline-none"
                style={{ color: colors.text }}
              />
            </div>
          </div>

          {/* Company Name */}
          <div className="space-y-2">
            <label className="text-sm font-black" style={{ color: colors.text }}>
              {t('account.brokerRegister.companyName')}
            </label>
            <div
              className={`flex items-center gap-3 ${inputClasses.lg} border`}
              style={{
                backgroundColor: colors.background,
                borderColor: colors.border,
              }}
            >
              <Building2 size={iconSize.md} style={{ color: colors.textMuted }} />
              <input
                type="text"
                value={companyName}
                onChange={(e) => setCompanyName(e.target.value)}
                placeholder={t('account.brokerRegister.companyNamePlaceholder')}
                className="flex-1 bg-transparent text-sm font-semibold outline-none"
                style={{ color: colors.text }}
              />
            </div>
          </div>

          {/* Phone Number */}
          <div className="space-y-2">
            <label className="text-sm font-black" style={{ color: colors.text }}>
              {t('account.brokerRegister.phoneNumber')}
            </label>
            <div
              className={`flex items-center gap-3 ${inputClasses.lg} border`}
              style={{
                backgroundColor: colors.background,
                borderColor: colors.border,
              }}
            >
              <Phone size={iconSize.md} style={{ color: colors.textMuted }} />
              <input
                type="tel"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
                placeholder={t('account.brokerRegister.phoneNumberPlaceholder')}
                className="flex-1 bg-transparent text-sm font-semibold outline-none"
                style={{ color: colors.text }}
              />
            </div>
          </div>

          {/* Email */}
          <div className="space-y-2">
            <label className="text-sm font-black" style={{ color: colors.text }}>
              {t('account.brokerRegister.emailAddress')}
            </label>
            <div
              className={`flex items-center gap-3 ${inputClasses.lg} border`}
              style={{
                backgroundColor: colors.background,
                borderColor: colors.border,
              }}
            >
              <Mail size={iconSize.md} style={{ color: colors.textMuted }} />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder={t('account.brokerRegister.emailPlaceholder')}
                className="flex-1 bg-transparent text-sm font-semibold outline-none"
                style={{ color: colors.text }}
              />
            </div>
          </div>

          {/* Submit Button */}
          <button
            onClick={handleSubmit}
            disabled={isSubmitDisabled}
            className={`w-full ${buttonClasses.lg} font-black transition-all mt-2 ${
              isSubmitDisabled
                ? 'cursor-not-allowed'
                : 'hover:opacity-90'
            }`}
            style={{
              backgroundColor: isSubmitDisabled ? colors.surfaceMuted : colors.activeText,
              color: isSubmitDisabled ? colors.textMuted : '#FFFFFF',
            }}
          >
            {t('account.brokerRegister.submitButton')}
          </button>
        </div>
      </div>
    </div>
  );
}
