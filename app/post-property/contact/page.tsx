'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { ChevronRight, Camera, CheckCircle2, ChevronLeft, Mail } from 'lucide-react';
import { useTheme } from '@/lib/theme/theme-provider';

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
          className="w-9 h-9 lg:w-10 lg:h-10 rounded-full border flex items-center justify-center shadow-sm hover:opacity-80 transition-opacity"
          style={{ backgroundColor: colors.surface, borderColor: colors.border }}
        >
          <ChevronLeft size={20} style={{ color: colors.text }} />
        </button>
      </div>

      {/* Header */}
      <div className="max-w-5xl mx-auto px-4 lg:px-8 pt-4 pb-6 space-y-4">
        {/* Progress Steps */}
        <div className="flex gap-2">
          {[1, 2, 3].map((step) => (
            <div
              key={step}
              className="flex-1 h-1.5 rounded-full"
              style={{
                backgroundColor: colors.activeText,
              }}
            />
          ))}
        </div>

        {/* Hero Card */}
        <div
          className="rounded-3xl p-5 lg:p-6 border shadow-sm space-y-4"
          style={{ backgroundColor: colors.surface, borderColor: colors.border }}
        >
          <div className="flex items-center justify-between">
            <div
              className="flex items-center gap-2 px-3 py-1.5 rounded-full"
              style={{ backgroundColor: colors.activeSurface }}
            >
              <Mail size={14} style={{ color: colors.activeText }} />
              <span className="text-xs font-black" style={{ color: colors.activeText }}>
                Contact & Verify
              </span>
            </div>
            <div
              className="px-3 py-1.5 rounded-full border"
              style={{ backgroundColor: colors.surfaceMuted, borderColor: colors.border }}
            >
              <span className="text-xs font-black" style={{ color: colors.textMuted }}>
                Step 3 of 3
              </span>
            </div>
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
      </div>

      {/* Content */}
      <div className="max-w-5xl mx-auto px-4 lg:px-8 pb-32 space-y-4">
        {/* Contact Options */}
        <div
          className="rounded-3xl p-4 lg:p-5 border space-y-4"
          style={{ backgroundColor: colors.surface, borderColor: colors.border }}
        >
          <h3 className="text-xs font-black" style={{ color: colors.text }}>
            Contact Options
          </h3>

          {/* WhatsApp */}
          <div className="space-y-2">
            <label className="text-xs font-black" style={{ color: colors.text }}>
              WhatsApp Number
            </label>
            <div
              className="flex items-center gap-2 min-h-[48px] px-3 rounded-xl border"
              style={{ backgroundColor: colors.surface, borderColor: colors.border }}
            >
              <div
                className="px-2 py-1 rounded-lg"
                style={{ backgroundColor: colors.activeSurface }}
              >
                <span className="text-xs font-black" style={{ color: colors.activeText }}>
                  WA
                </span>
              </div>
              <input
                type="tel"
                value={whatsapp}
                onChange={(e) => setWhatsapp(e.target.value)}
                placeholder="+251 911 234 567"
                className="flex-1 text-sm font-semibold bg-transparent focus:outline-none"
                style={{ color: colors.text }}
              />
            </div>
          </div>

          {/* Telegram */}
          <div className="space-y-2">
            <label className="text-xs font-black" style={{ color: colors.text }}>
              Telegram
            </label>
            <div
              className="flex items-center gap-2 min-h-[48px] px-3 rounded-xl border"
              style={{ backgroundColor: colors.surface, borderColor: colors.border }}
            >
              <div
                className="px-2 py-1 rounded-lg"
                style={{ backgroundColor: colors.activeSurface }}
              >
                <span className="text-xs font-black" style={{ color: colors.activeText }}>
                  TG
                </span>
              </div>
              <input
                type="text"
                value={telegram}
                onChange={(e) => setTelegram(e.target.value)}
                placeholder="@username"
                className="flex-1 text-sm font-semibold bg-transparent focus:outline-none"
                style={{ color: colors.text }}
              />
            </div>
          </div>

          {/* Email */}
          <div className="space-y-2">
            <label className="text-xs font-black" style={{ color: colors.text }}>
              Contact Email
            </label>
            <div
              className="flex items-center gap-2 min-h-[48px] px-4 rounded-xl border"
              style={{ backgroundColor: colors.surface, borderColor: colors.border }}
            >
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="contact@example.com"
                className="flex-1 text-sm font-semibold bg-transparent focus:outline-none"
                style={{ color: colors.text }}
              />
            </div>
          </div>
        </div>

        {/* Description */}
        <div
          className="rounded-3xl p-4 lg:p-5 border space-y-3"
          style={{ backgroundColor: colors.surface, borderColor: colors.border }}
        >
          <label className="text-xs font-black" style={{ color: colors.text }}>
            Description
          </label>
          <textarea
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
          />
        </div>

        {/* Upload Photos */}
        <div
          className="rounded-3xl p-4 lg:p-5 border space-y-3"
          style={{ backgroundColor: colors.surface, borderColor: colors.border }}
        >
          <label className="text-xs font-black" style={{ color: colors.text }}>
            Upload Photos
          </label>
          <button
            className="w-full min-h-[140px] rounded-2xl border-2 border-dashed flex flex-col items-center justify-center gap-2 hover:opacity-80 transition-opacity"
            style={{
              borderColor: colors.border,
              backgroundColor: colors.surfaceMuted,
            }}
          >
            <Camera size={24} style={{ color: colors.textMuted }} />
            <div className="text-center">
              <p className="text-sm font-black" style={{ color: colors.text }}>
                Tap to Upload
              </p>
              <p className="text-xs font-semibold mt-0.5" style={{ color: colors.textMuted }}>
                Max 10 photos (JPG, PNG)
              </p>
            </div>
          </button>
        </div>

        {/* Verification */}
        <div
          className="rounded-3xl p-4 lg:p-5 border space-y-3"
          style={{ backgroundColor: colors.surface, borderColor: colors.border }}
        >
          <label className="text-xs font-black" style={{ color: colors.text }}>
            Verification (Optional)
          </label>
          <div className="space-y-2">
            {verificationOptions.map((option) => {
              const isSelected = verificationType === option.key;
              return (
                <button
                  key={option.key}
                  onClick={() => setVerificationType(option.key)}
                  className="w-full min-h-[48px] px-4 rounded-xl border flex items-center gap-3 transition-all hover:opacity-80"
                  style={{
                    backgroundColor: isSelected ? colors.activeSurface : colors.surface,
                    borderColor: isSelected ? colors.activeText : colors.border,
                  }}
                >
                  <div
                    className="w-5 h-5 rounded-full border-2 flex items-center justify-center"
                    style={{
                      borderColor: isSelected ? colors.activeText : colors.textMuted,
                    }}
                  >
                    {isSelected && <CheckCircle2 size={13} style={{ color: colors.activeText }} />}
                  </div>
                  <span className="text-sm font-black" style={{ color: colors.text }}>
                    {option.label}
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="fixed bottom-0 left-0 lg:left-64 right-0 p-4 lg:p-6 z-20" style={{ backgroundColor: colors.background }}>
        <div className="max-w-5xl mx-auto">
          <button
            onClick={() => router.push('/')}
            className="w-full min-h-[48px] lg:min-h-[52px] rounded-2xl font-black text-sm lg:text-base flex items-center justify-center gap-2 transition-all hover:opacity-90"
            style={{
              backgroundColor: colors.activeText,
              color: '#FFFFFF',
            }}
          >
            <span>Review Packages</span>
            <ChevronRight size={16} />
          </button>
        </div>
      </div>
    </div>
  );
}
