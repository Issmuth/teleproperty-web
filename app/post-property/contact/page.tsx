'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { ChevronRight, Camera, CheckCircle2, ChevronLeft, Mail } from 'lucide-react';
import { useTheme } from '@/lib/theme/theme-provider';
import { Tag } from '@/components/common/tag';
import { iconSize, iconButtonClasses, buttonClasses, inputClasses } from '@/lib/design-system/dimensions';

type VerificationType = 'owner-id' | 'broker-license' | 'developer-document' | '';

export default function PostPropertyStep3() {
  const router = useRouter();
  const { colors } = useTheme();
  const [whatsapp, setWhatsapp] = useState('');
  const [telegram, setTelegram] = useState('');
  const [email, setEmail] = useState('');
  const [description, setDescription] = useState('');
  const [verificationType, setVerificationType] = useState<VerificationType>('');

  const verificationOptions = [
    { key: 'owner-id' as VerificationType, label: 'Owner ID' },
    { key: 'broker-license' as VerificationType, label: 'Broker License' },
    { key: 'developer-document' as VerificationType, label: 'Developer Document' },
  ];

  return (
    <div className="flex-1 min-h-screen" style={{ backgroundColor: colors.background }}>
      {/* Back Button - Positioned relative to main content */}
      <div className="max-w-5xl mx-auto px-4 lg:px-8 pt-4 lg:pt-6">
        <button
          onClick={() => router.back()}
          className={`${iconButtonClasses.md} lg:${iconButtonClasses.lg} rounded-full border flex items-center justify-center shadow-sm hover:opacity-80 transition-opacity`}
          style={{ backgroundColor: colors.surface, borderColor: colors.border }}
          aria-label="Go back to previous step"
        >
          <ChevronLeft size={iconSize.xl} style={{ color: colors.text }} aria-hidden="true" />
        </button>
      </div>

      {/* Header */}
      <header className="max-w-5xl mx-auto px-4 lg:px-8 pt-4 pb-6 space-y-4">
        {/* Progress Steps */}
        <div className="flex gap-2" role="progressbar" aria-valuenow={3} aria-valuemin={1} aria-valuemax={3} aria-label="Step 3 of 3">
          {[1, 2, 3].map((step) => (
            <div
              key={step}
              className="flex-1 h-1.5 rounded-full"
              style={{
                backgroundColor: colors.activeText,
              }}
              aria-hidden="true"
            />
          ))}
        </div>

        {/* Hero Card */}
        <div
          className="rounded-3xl p-5 lg:p-6 border shadow-sm space-y-4"
          style={{ backgroundColor: colors.surface, borderColor: colors.border }}
        >
          <div className="flex items-center justify-between">
            <Tag variant="primary" size="sm" icon={Mail} iconSize={14}>
              Contact & Verify
            </Tag>
            <Tag variant="muted" size="sm">
              Step 3 of 3
            </Tag>
          </div>

          <div>
            <h1 className="text-xl lg:text-2xl font-black mb-1" style={{ color: colors.text }}>
              Contact & Verification
            </h1>
            <p className="text-sm font-semibold" style={{ color: colors.textMuted }}>
              Add contact details and upload photos
            </p>
          </div>
        </div>
      </header>

      {/* Content */}
      <main className="max-w-5xl mx-auto px-4 lg:px-8 pb-32 space-y-4">
        <form aria-label="Property contact and verification form">
        {/* Contact Options */}
        <section
          className="rounded-3xl p-4 lg:p-5 border space-y-4"
          style={{ backgroundColor: colors.surface, borderColor: colors.border }}
          aria-labelledby="contact-options-heading"
        >
          <h2 id="contact-options-heading" className="text-xs font-black" style={{ color: colors.text }}>
            Contact Options
          </h2>

          {/* WhatsApp */}
          <div className="space-y-2">
            <label htmlFor="whatsapp" className="text-xs font-black" style={{ color: colors.text }}>
              WhatsApp Number
            </label>
            <div
              className={`flex items-center gap-2 ${inputClasses.lg} border`}
              style={{ backgroundColor: colors.surface, borderColor: colors.border }}
            >
              <Tag variant="primary" size="xs" aria-hidden="true">
                WA
              </Tag>
              <input
                id="whatsapp"
                type="tel"
                value={whatsapp}
                onChange={(e) => setWhatsapp(e.target.value)}
                placeholder="+251 911 234 567"
                className="flex-1 text-sm font-semibold bg-transparent focus:outline-none"
                style={{ color: colors.text }}
                aria-label="WhatsApp number"
              />
            </div>
          </div>

          {/* Telegram */}
          <div className="space-y-2">
            <label htmlFor="telegram" className="text-xs font-black" style={{ color: colors.text }}>
              Telegram
            </label>
            <div
              className={`flex items-center gap-2 ${inputClasses.lg} border`}
              style={{ backgroundColor: colors.surface, borderColor: colors.border }}
            >
              <Tag variant="primary" size="xs" aria-hidden="true">
                TG
              </Tag>
              <input
                id="telegram"
                type="text"
                value={telegram}
                onChange={(e) => setTelegram(e.target.value)}
                placeholder="@username"
                className="flex-1 text-sm font-semibold bg-transparent focus:outline-none"
                style={{ color: colors.text }}
                aria-label="Telegram username"
              />
            </div>
          </div>

          {/* Email */}
          <div className="space-y-2">
            <label htmlFor="contact-email" className="text-xs font-black" style={{ color: colors.text }}>
              Contact Email
            </label>
            <div
              className={`flex items-center gap-2 ${inputClasses.lg} border`}
              style={{ backgroundColor: colors.surface, borderColor: colors.border }}
            >
              <input
                id="contact-email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="contact@example.com"
                className="flex-1 text-sm font-semibold bg-transparent focus:outline-none"
                style={{ color: colors.text }}
                aria-label="Contact email address"
              />
            </div>
          </div>
        </section>

        {/* Description */}
        <section
          className="rounded-3xl p-4 lg:p-5 border space-y-3"
          style={{ backgroundColor: colors.surface, borderColor: colors.border }}
          aria-labelledby="description-heading"
        >
          <label htmlFor="description" id="description-heading" className="text-xs font-black" style={{ color: colors.text }}>
            Description
          </label>
          <textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Describe your property, include unique features, nearby amenities..."
            rows={5}
            className="w-full px-4 py-3 rounded-xl border text-sm font-semibold resize-none focus:outline-none focus:ring-2"
            style={{
              backgroundColor: colors.surface,
              borderColor: colors.border,
              color: colors.text,
            }}
            aria-label="Property description"
          />
        </section>

        {/* Upload Photos */}
        <section
          className="rounded-3xl p-4 lg:p-5 border space-y-3"
          style={{ backgroundColor: colors.surface, borderColor: colors.border }}
          aria-labelledby="photos-heading"
        >
          <h2 id="photos-heading" className="text-xs font-black" style={{ color: colors.text }}>
            Upload Photos
          </h2>
          <button
            type="button"
            className="w-full h-36 rounded-2xl border-2 border-dashed flex flex-col items-center justify-center gap-2 hover:opacity-80 transition-opacity"
            style={{
              borderColor: colors.border,
              backgroundColor: colors.surfaceMuted,
            }}
            aria-label="Upload property photos - Maximum 10 photos in JPG or PNG format"
          >
            <Camera size={iconSize['2xl']} style={{ color: colors.textMuted }} aria-hidden="true" />
            <div className="text-center">
              <p className="text-sm font-black" style={{ color: colors.text }}>
                Tap to Upload
              </p>
              <p className="text-xs font-semibold mt-0.5" style={{ color: colors.textMuted }}>
                Max 10 photos (JPG, PNG)
              </p>
            </div>
          </button>
        </section>

        {/* Verification */}
        <section
          className="rounded-3xl p-4 lg:p-5 border space-y-3"
          style={{ backgroundColor: colors.surface, borderColor: colors.border }}
          aria-labelledby="verification-heading"
        >
          <h2 id="verification-heading" className="text-xs font-black" style={{ color: colors.text }}>
            Verification (Optional)
          </h2>
          <fieldset className="space-y-2">
            <legend className="sr-only">Choose verification document type</legend>
            {verificationOptions.map((option) => {
              const isSelected = verificationType === option.key;
              return (
                <button
                  key={option.key}
                  type="button"
                  onClick={() => setVerificationType(option.key)}
                  className={`w-full ${inputClasses.lg} flex items-center gap-3 transition-all hover:opacity-80 border`}
                  style={{
                    backgroundColor: isSelected ? colors.activeSurface : colors.surface,
                    borderColor: isSelected ? colors.activeText : colors.border,
                  }}
                  role="radio"
                  aria-checked={isSelected}
                  aria-label={option.label}
                >
                  <div
                    className="w-5 h-5 rounded-full border-2 flex items-center justify-center"
                    style={{
                      borderColor: isSelected ? colors.activeText : colors.textMuted,
                    }}
                    aria-hidden="true"
                  >
                    {isSelected && <CheckCircle2 size={13} style={{ color: colors.activeText }} />}
                  </div>
                  <span className="text-sm font-black" style={{ color: colors.text }}>
                    {option.label}
                  </span>
                </button>
              );
            })}
          </fieldset>
        </section>
        </form>
      </main>

      {/* Footer */}
      <div className="fixed bottom-0 left-0 lg:left-64 right-0 p-4 lg:p-6 z-20" style={{ backgroundColor: colors.background }}>
        <div className="max-w-5xl mx-auto">
          <button
            type="button"
            onClick={() => router.push('/')}
            className={`w-full ${buttonClasses.lg} lg:h-14 font-black flex items-center justify-center gap-2 transition-all hover:opacity-90`}
            style={{
              backgroundColor: colors.activeText,
              color: '#FFFFFF',
            }}
            aria-label="Continue to review subscription packages"
          >
            <span>Review Packages</span>
            <ChevronRight size={iconSize.md} aria-hidden="true" />
          </button>
        </div>
      </div>
    </div>
  );
}
