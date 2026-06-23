'use client';

import { useRouter } from 'next/navigation';
import { ArrowLeft, Heart } from 'lucide-react';
import { useTheme } from '@/lib/theme/theme-provider';
import { useI18n } from '@/lib/i18n/i18n-provider';

export default function SavedPropertiesPage() {
  const router = useRouter();
  const { colors } = useTheme();
  const { t } = useI18n();

  // Mock data - replace with actual saved properties
  const savedProperties: any[] = [];

  return (
    <div className="min-h-screen" style={{ backgroundColor: colors.background }}>
      {/* Header */}
      <div
        className="sticky top-14 lg:top-16 z-10 px-4 lg:px-8 py-3 lg:py-4 flex items-center gap-3 border-b"
        style={{ backgroundColor: colors.background, borderColor: colors.border }}
      >
        <button
          onClick={() => router.back()}
          className="w-9 h-9 lg:w-10 lg:h-10 rounded-xl flex items-center justify-center hover:opacity-80 transition-opacity"
          style={{ backgroundColor: colors.surface }}
        >
          <ArrowLeft size={20} style={{ color: colors.text }} />
        </button>
        <div className="flex-1">
          <h1 className="text-lg lg:text-xl font-black" style={{ color: colors.text }}>
            {t("nav.saved")}
          </h1>
          <p className="text-xs lg:text-sm font-semibold mt-0.5" style={{ color: colors.textMuted }}>
            {savedProperties.length} {savedProperties.length === 1 ? 'property' : 'properties'}
          </p>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 lg:px-8 pt-20 lg:pt-24 pb-32">
        {savedProperties.length === 0 ? (
          <div className="flex items-center justify-center pt-16 lg:pt-24">
            <div
              className="border rounded-3xl p-8 lg:p-12 max-w-md text-center space-y-4"
              style={{ backgroundColor: colors.surface, borderColor: colors.border }}
            >
              <div
                className="w-16 h-16 lg:w-20 lg:h-20 rounded-full flex items-center justify-center mx-auto"
                style={{ backgroundColor: colors.surfaceMuted }}
              >
                <Heart size={32} style={{ color: colors.textMuted }} strokeWidth={1.5} />
              </div>
              <h2 className="text-xl lg:text-2xl font-black" style={{ color: colors.text }}>
                {t("account.saved.emptyTitle")}
              </h2>
              <p className="text-sm lg:text-base font-medium leading-relaxed" style={{ color: colors.textMuted }}>
                {t("account.saved.emptyBody")}
              </p>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {/* Property cards will go here */}
            {savedProperties.map((property) => (
              <div key={property.id}>
                {/* Property card component */}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
