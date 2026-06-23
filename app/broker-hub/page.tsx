'use client';

import { useRouter } from 'next/navigation';
import {
  Briefcase,
  ClipboardList,
  MessageSquareMore,
  ShieldCheck,
  Sparkles,
  TrendingUp,
  Users,
  Waves,
  ChevronLeft,
} from 'lucide-react';
import { useTheme } from '@/lib/theme/theme-provider';
import { useI18n } from '@/lib/i18n/i18n-provider';

const quickActions = [
  { labelKey: 'account.brokerHub.quick.register', icon: Briefcase },
  { labelKey: 'account.brokerHub.quick.uploadListings', icon: ClipboardList },
  { labelKey: 'account.brokerHub.quick.verifiedLeads', icon: Users },
  {
    labelKey: 'account.brokerHub.quick.clientInquiries',
    icon: MessageSquareMore,
  },
] as const;

const benefits = [
  {
    icon: Users,
    titleKey: 'account.brokerHub.benefit.receive.title',
    subtitleKey: 'account.brokerHub.benefit.receive.subtitle',
  },
  {
    icon: TrendingUp,
    titleKey: 'account.brokerHub.benefit.grow.title',
    subtitleKey: 'account.brokerHub.benefit.grow.subtitle',
  },
  {
    icon: Sparkles,
    titleKey: 'account.brokerHub.benefit.featured.title',
    subtitleKey: 'account.brokerHub.benefit.featured.subtitle',
  },
  {
    icon: ShieldCheck,
    titleKey: 'account.brokerHub.benefit.reputation.title',
    subtitleKey: 'account.brokerHub.benefit.reputation.subtitle',
  },
] as const;

export default function BrokerHubPage() {
  const router = useRouter();
  const { colors, isDark } = useTheme();
  const { t } = useI18n();

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
            {t('account.brokerHub.title')}
          </h1>
          <p className="text-xs font-semibold mt-0.5" style={{ color: colors.textMuted }}>
            {t('account.brokerHub.subtitle')}
          </p>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 lg:px-8 pt-20 lg:pt-24 pb-32">
        {/* Hero Card */}
        <div
          className="relative rounded-3xl lg:rounded-[32px] p-6 lg:p-10 overflow-hidden mb-6 lg:mb-8"
          style={{ backgroundColor: isDark ? '#1E3A8A' : '#2F5BEA', minHeight: '280px' }}
        >
          {/* Decorative circles */}
          <div
            className="absolute right-[-32px] top-[-28px] lg:right-[-60px] lg:top-[-40px] w-[108px] h-[108px] lg:w-[160px] lg:h-[160px] rounded-full"
            style={{ backgroundColor: 'rgba(255,255,255,0.12)' }}
          />
          <div
            className="absolute right-[-10px] bottom-[-8px] lg:right-[-20px] lg:bottom-[-16px] w-[88px] h-[88px] lg:w-[140px] lg:h-[140px] rounded-full"
            style={{ backgroundColor: 'rgba(255,255,255,0.08)' }}
          />

          {/* Content */}
          <div className="relative z-10 max-w-2xl">
            <div className="w-[42px] h-[42px] lg:w-[52px] lg:h-[52px] rounded-2xl lg:rounded-3xl flex items-center justify-center mb-4 lg:mb-5" style={{ backgroundColor: 'rgba(255,255,255,0.16)' }}>
              <Waves size={24} className="text-white lg:w-7 lg:h-7" />
            </div>

            <h2 className="text-2xl lg:text-4xl font-black text-white mb-3 lg:mb-4">
              {t('account.brokerHub.hero.title')}
            </h2>

            <p className="text-sm lg:text-base font-semibold text-white/96 mb-5 lg:mb-6 leading-relaxed max-w-lg">
              {t('account.brokerHub.hero.copy')}
            </p>

            {/* Quick action chips */}
            <div className="flex flex-wrap gap-2 lg:gap-3 mb-6 lg:mb-8">
              {quickActions.map((action) => {
                const Icon = action.icon;
                return (
                  <div
                    key={action.labelKey}
                    className="flex items-center gap-2 px-3 lg:px-4 py-2 rounded-full"
                    style={{ backgroundColor: 'rgba(255,255,255,0.14)' }}
                  >
                    <Icon size={12} className="text-white lg:w-4 lg:h-4" />
                    <span className="text-xs lg:text-sm font-black text-white">
                      {t(action.labelKey)}
                    </span>
                  </div>
                );
              })}
            </div>

            {/* CTA Button */}
            <button
              onClick={() => router.push('/broker-register')}
              className="inline-flex items-center px-6 lg:px-8 py-3 lg:py-3.5 rounded-2xl lg:rounded-3xl bg-white hover:bg-gray-50 transition-colors"
            >
              <span className="text-sm lg:text-base font-black" style={{ color: '#1D4ED8' }}>
                {t('account.brokerHub.registerButton')}
              </span>
            </button>
          </div>
        </div>

        {/* Benefits Card */}
        <div
          className="rounded-3xl lg:rounded-[32px] p-5 lg:p-8 border"
          style={{
            backgroundColor: colors.surface,
            borderColor: colors.border,
          }}
        >
          <p
            className="text-xs font-black uppercase tracking-wider mb-6 lg:mb-8"
            style={{ color: colors.textMuted }}
          >
            {t('account.brokerHub.whyJoin')}
          </p>

          <div className="grid md:grid-cols-2 gap-5 lg:gap-6">
            {benefits.map((item) => {
              const Icon = item.icon;
              return (
                <div key={item.titleKey} className="flex items-start gap-4">
                  <div
                    className="w-[42px] h-[42px] lg:w-[48px] lg:h-[48px] rounded-xl lg:rounded-2xl flex items-center justify-center flex-shrink-0"
                    style={{ backgroundColor: colors.surfaceMuted }}
                  >
                    <Icon size={18} className="lg:w-5 lg:h-5" style={{ color: colors.activeText }} />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-sm lg:text-base font-black mb-1" style={{ color: colors.text }}>
                      {t(item.titleKey)}
                    </h3>
                    <p className="text-xs lg:text-sm font-medium leading-relaxed" style={{ color: colors.textMuted }}>
                      {t(item.subtitleKey)}
                    </p>
                  </div>
                  <ShieldCheck size={16} className="lg:w-5 lg:h-5 flex-shrink-0 mt-1" style={{ color: colors.activeText }} />
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
