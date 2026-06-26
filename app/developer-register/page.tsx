'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Building2, Mail, Phone, UserRound, ChevronLeft } from 'lucide-react';
import { useTheme } from '@/lib/theme/theme-provider';
import { iconSize, iconButtonClasses, buttonClasses } from '@/lib/design-system/dimensions';
import { AccessibleInput } from '@/components/common/accessible-input';

export default function DeveloperRegisterPage() {
  const router = useRouter();
  const { colors } = useTheme();
  
  const [companyName, setCompanyName] = useState('');
  const [contactName, setContactName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [email, setEmail] = useState('');
  const [errors, setErrors] = useState<Record<string, string>>({});

  const isSubmitDisabled = !companyName.trim() || !contactName.trim() || !phoneNumber.trim();

  const handleSubmit = () => {
    if (!isSubmitDisabled) {
      router.push('/developer-dashboard');
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
          aria-label="Go back"
        >
          <ChevronLeft size={iconSize.xl} style={{ color: colors.text }} aria-hidden="true" />
        </button>
        <div>
          <h1 className="text-lg font-black" style={{ color: colors.text }}>
            Register as Developer
          </h1>
          <p className="text-xs font-semibold mt-0.5" style={{ color: colors.textMuted }}>
            Start your partnership application here
          </p>
        </div>
      </div>

      <main className="max-w-2xl mx-auto px-4 lg:px-8 pt-20 lg:pt-24 pb-32">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSubmit();
          }}
          aria-label="Developer registration form"
        >
          <div
            className="rounded-3xl lg:rounded-[32px] p-6 lg:p-8 border space-y-5 lg:space-y-6"
            style={{
              backgroundColor: colors.surface,
              borderColor: colors.border,
            }}
          >
            <AccessibleInput
              label="Company Name"
              value={companyName}
              onChange={(e) => setCompanyName(e.target.value)}
              placeholder="Your company or development brand"
              icon={<Building2 size={iconSize.md} />}
              required
              error={errors.companyName}
              size="lg"
            />

            <AccessibleInput
              label="Contact Name"
              value={contactName}
              onChange={(e) => setContactName(e.target.value)}
              placeholder="Primary contact person"
              icon={<UserRound size={iconSize.md} />}
              required
              error={errors.contactName}
              size="lg"
            />

            <AccessibleInput
              label="Phone Number"
              type="tel"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
              placeholder="09XXXXXXXX"
              icon={<Phone size={iconSize.md} />}
              required
              error={errors.phoneNumber}
              size="lg"
            />

            <AccessibleInput
              label="Email Address"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="contact@company.com"
              icon={<Mail size={iconSize.md} />}
              error={errors.email}
              helperText="Optional - We'll use this for updates"
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
              Submit Application
            </button>
          </div>
        </form>
      </main>
    </div>
  );
}
