'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Building2, Mail, Phone, UserRound, ChevronLeft } from 'lucide-react';
import { useTheme } from '@/lib/theme/theme-provider';
import { useI18n } from '@/lib/i18n/i18n-provider';
import { iconSize, iconButtonClasses, buttonClasses } from '@/lib/design-system/dimensions';
import { AccessibleInput } from '@/components/common/accessible-input';

export default function BrokerRegisterPage() {
  const router = useRouter();
  const { colors } = useTheme();
  const { t } = useI18n();
  
  const [brokerName, setBrokerName] = useState('');
  const [companyName, setCompanyName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [email, setEmail] = useState('');
  const [errors, setErrors] = useState<Record<string, string>>({});

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
          aria-label={t('common.goBack') || 'Go back'}
        >
          <ChevronLeft size={iconSize.xl} style={{ color: colors.text }} aria-hidden="true" />
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

      <main className="max-w-2xl mx-auto px-4 lg:px-8 pt-20 lg:pt-24 pb-32">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSubmit();
          }}
          aria-label={t('account.brokerRegister.formLabel') || 'Broker registration form'}
        >
          <div
            className="rounded-3xl lg:rounded-[32px] p-6 lg:p-8 border space-y-5 lg:space-y-6"
            style={{
              backgroundColor: colors.surface,
              borderColor: colors.border,
            }}
          >
            <AccessibleInput
              label={t('account.brokerRegister.brokerName')}
              value={brokerName}
              onChange={(e) => setBrokerName(e.target.value)}
              placeholder={t('account.brokerRegister.brokerNamePlaceholder')}
              icon={<UserRound size={iconSize.md} />}
              required
              error={errors.brokerName}
              size="lg"
            />

            <AccessibleInput
              label={t('account.brokerRegister.companyName')}
              value={companyName}
              onChange={(e) => setCompanyName(e.target.value)}
              placeholder={t('account.brokerRegister.companyNamePlaceholder')}
              icon={<Building2 size={iconSize.md} />}
              error={errors.companyName}
              helperText={t('account.brokerRegister.companyNameHelper') || 'Optional'}
              size="lg"
            />

            <AccessibleInput
              label={t('account.brokerRegister.phoneNumber')}
              type="tel"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
              placeholder={t('account.brokerRegister.phoneNumberPlaceholder')}
              icon={<Phone size={iconSize.md} />}
              required
              error={errors.phoneNumber}
              size="lg"
            />

            <AccessibleInput
              label={t('account.brokerRegister.emailAddress')}
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder={t('account.brokerRegister.emailPlaceholder')}
              icon={<Mail size={iconSize.md} />}
              error={errors.email}
              helperText={t('account.brokerRegister.emailHelper') || 'Optional - For updates'}
              size="lg"
            />

            {/* Submit Button */}
            <button
              type="submit"
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
              aria-disabled={isSubmitDisabled}
            >
              {t('account.brokerRegister.submitButton')}
            </button>
          </div>
        </form>
      </main>
    </div>
  );
}
