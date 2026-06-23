'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Building2, Mail, Phone, UserRound, ChevronLeft } from 'lucide-react';
import { useTheme } from '@/lib/theme/theme-provider';

export default function DeveloperRegisterPage() {
  const router = useRouter();
  const { colors } = useTheme();
  
  const [companyName, setCompanyName] = useState('');
  const [contactName, setContactName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [email, setEmail] = useState('');

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
          className="w-9 h-9 rounded-xl flex items-center justify-center transition-colors"
          style={{ backgroundColor: colors.surface }}
          onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = colors.iconButtonBackground)}
          onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = colors.surface)}
        >
          <ChevronLeft size={20} style={{ color: colors.text }} />
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

      <div className="max-w-2xl mx-auto px-4 lg:px-8 pt-20 lg:pt-24 pb-32">
        <div
          className="rounded-3xl lg:rounded-[32px] p-6 lg:p-8 border space-y-5 lg:space-y-6"
          style={{
            backgroundColor: colors.surface,
            borderColor: colors.border,
          }}
        >
          {/* Company Name */}
          <div className="space-y-2">
            <label className="text-sm font-black" style={{ color: colors.text }}>
              Company Name
            </label>
            <div
              className="flex items-center gap-3 min-h-[46px] lg:min-h-[50px] px-4 rounded-2xl border"
              style={{
                backgroundColor: colors.background,
                borderColor: colors.border,
              }}
            >
              <Building2 size={16} style={{ color: colors.textMuted }} />
              <input
                type="text"
                value={companyName}
                onChange={(e) => setCompanyName(e.target.value)}
                placeholder="Your company or development brand"
                className="flex-1 bg-transparent text-sm font-semibold outline-none"
                style={{ color: colors.text }}
              />
            </div>
          </div>

          {/* Contact Name */}
          <div className="space-y-2">
            <label className="text-sm font-black" style={{ color: colors.text }}>
              Contact Name
            </label>
            <div
              className="flex items-center gap-3 min-h-[46px] lg:min-h-[50px] px-4 rounded-2xl border"
              style={{
                backgroundColor: colors.background,
                borderColor: colors.border,
              }}
            >
              <UserRound size={16} style={{ color: colors.textMuted }} />
              <input
                type="text"
                value={contactName}
                onChange={(e) => setContactName(e.target.value)}
                placeholder="Primary contact person"
                className="flex-1 bg-transparent text-sm font-semibold outline-none"
                style={{ color: colors.text }}
              />
            </div>
          </div>

          {/* Phone Number */}
          <div className="space-y-2">
            <label className="text-sm font-black" style={{ color: colors.text }}>
              Phone Number
            </label>
            <div
              className="flex items-center gap-3 min-h-[46px] lg:min-h-[50px] px-4 rounded-2xl border"
              style={{
                backgroundColor: colors.background,
                borderColor: colors.border,
              }}
            >
              <Phone size={16} style={{ color: colors.textMuted }} />
              <input
                type="tel"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
                placeholder="09XXXXXXXX"
                className="flex-1 bg-transparent text-sm font-semibold outline-none"
                style={{ color: colors.text }}
              />
            </div>
          </div>

          {/* Email */}
          <div className="space-y-2">
            <label className="text-sm font-black" style={{ color: colors.text }}>
              Email Address
            </label>
            <div
              className="flex items-center gap-3 min-h-[46px] lg:min-h-[50px] px-4 rounded-2xl border"
              style={{
                backgroundColor: colors.background,
                borderColor: colors.border,
              }}
            >
              <Mail size={16} style={{ color: colors.textMuted }} />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="contact@company.com"
                className="flex-1 bg-transparent text-sm font-semibold outline-none"
                style={{ color: colors.text }}
              />
            </div>
          </div>

          {/* Submit Button */}
          <button
            onClick={handleSubmit}
            disabled={isSubmitDisabled}
            className={`w-full min-h-[46px] lg:min-h-[50px] rounded-2xl font-black text-sm transition-all mt-2 ${
              isSubmitDisabled
                ? 'cursor-not-allowed'
                : 'hover:opacity-90'
            }`}
            style={{
              backgroundColor: isSubmitDisabled ? colors.surfaceMuted : colors.activeText,
              color: isSubmitDisabled ? colors.textMuted : '#FFFFFF',
            }}
          >
            Submit Application
          </button>
        </div>
      </div>
    </div>
  );
}
