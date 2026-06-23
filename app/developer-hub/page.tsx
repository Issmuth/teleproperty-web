'use client';

import { useRouter } from 'next/navigation';
import {
  Building2,
  ClipboardList,
  Gauge,
  Megaphone,
  Plus,
  ShieldCheck,
  Sparkles,
  Users,
  Waves,
  ChevronLeft,
} from 'lucide-react';
import { useTheme } from '@/lib/theme/theme-provider';

const quickActions = [
  { label: 'Add Projects', icon: Plus },
  { label: 'Unit Management', icon: Building2 },
  { label: 'Lead Dashboard', icon: ClipboardList },
  { label: 'Campaigns', icon: Megaphone },
] as const;

const benefits = [
  {
    icon: Building2,
    title: 'List off-plan and ready projects',
    subtitle: 'Showcase developments with structured project details.',
  },
  {
    icon: Users,
    title: 'Receive verified buyer leads',
    subtitle: 'Capture and manage serious inquiries in one place.',
  },
  {
    icon: Gauge,
    title: 'Track views, enquiries & sales',
    subtitle: 'Measure the performance of each development or campaign.',
  },
  {
    icon: Megaphone,
    title: 'Run sponsored campaigns',
    subtitle: 'Promote flagship projects with targeted placement.',
  },
] as const;

const infoCards = [
  {
    icon: Sparkles,
    title: 'Partner ready',
    subtitle: 'Onboard teams, brands, and agencies.',
  },
  {
    icon: ClipboardList,
    title: 'Lead tracking',
    subtitle: 'Watch every enquiry from one dashboard.',
  },
] as const;

export default function DeveloperHubPage() {
  const router = useRouter();
  const { colors, isDark } = useTheme();

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
            Developer Hub
          </h1>
          <p className="text-xs font-semibold mt-0.5" style={{ color: colors.textMuted }}>
            List projects, manage units, and grow your pipeline
          </p>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 lg:px-8 pt-20 lg:pt-24 pb-32">
        {/* Hero Card */}
        <div
          className="relative rounded-3xl lg:rounded-[32px] p-6 lg:p-10 overflow-hidden mb-6 lg:mb-8"
          style={{ backgroundColor: isDark ? '#7C4A00' : '#EA580C', minHeight: '300px' }}
        >
          {/* Decorative circles */}
          <div
            className="absolute right-[-32px] top-[-28px] lg:right-[-60px] lg:top-[-40px] w-[108px] h-[108px] lg:w-[160px] lg:h-[160px] rounded-full"
            style={{ backgroundColor: 'rgba(255,255,255,0.14)' }}
          />
          <div
            className="absolute right-[-10px] top-[88px] lg:right-[-20px] lg:top-[140px] w-[88px] h-[88px] lg:w-[140px] lg:h-[140px] rounded-full"
            style={{ backgroundColor: 'rgba(255,255,255,0.08)' }}
          />

          {/* Content */}
          <div className="relative z-10 max-w-2xl">
            <div className="w-[42px] h-[42px] lg:w-[52px] lg:h-[52px] rounded-2xl lg:rounded-3xl flex items-center justify-center mb-4 lg:mb-5" style={{ backgroundColor: 'rgba(255,255,255,0.16)' }}>
              <Waves size={24} className="text-white lg:w-7 lg:h-7" />
            </div>

            <h2 className="text-2xl lg:text-4xl font-black text-white mb-3 lg:mb-4">
              Developer Hub
            </h2>

            <p className="text-sm lg:text-base font-semibold text-white/95 mb-5 lg:mb-6 leading-relaxed max-w-lg">
              List your projects, manage units, run campaigns, and receive qualified buyer leads.
            </p>

            {/* Quick action chips */}
            <div className="flex flex-wrap gap-2 lg:gap-3 mb-6 lg:mb-8">
              {quickActions.map((action) => {
                const Icon = action.icon;
                return (
                  <div
                    key={action.label}
                    className="flex items-center gap-2 px-3 lg:px-4 py-2 rounded-full"
                    style={{ backgroundColor: colors.iconButtonBackground }}
                  >
                    <Icon size={12} className="lg:w-4 lg:h-4" style={{ color: colors.icon }} />
                    <span className="text-xs lg:text-sm font-black" style={{ color: colors.text }}>
                      {action.label}
                    </span>
                  </div>
                );
              })}
            </div>

            {/* CTA Button */}
            <button
              onClick={() => router.push('/developer-register')}
              className="inline-flex items-center px-6 lg:px-8 py-3 lg:py-3.5 rounded-2xl lg:rounded-3xl border transition-colors"
              style={{
                backgroundColor: colors.surface,
                borderColor: colors.border,
              }}
              onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = colors.iconButtonBackground)}
              onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = colors.surface)}
            >
              <span className="text-sm lg:text-base font-black" style={{ color: colors.text }}>
                Register as Developer
              </span>
            </button>
          </div>
        </div>

        {/* Benefits Card */}
        <div
          className="rounded-3xl lg:rounded-[32px] p-5 lg:p-8 border mb-6 lg:mb-8"
          style={{
            backgroundColor: colors.surface,
            borderColor: colors.border,
          }}
        >
          <div className="grid md:grid-cols-2 gap-5 lg:gap-6">
            {benefits.map((item) => {
              const Icon = item.icon;
              return (
                <div key={item.title} className="flex items-start gap-4">
                  <div
                    className="w-[42px] h-[42px] lg:w-[48px] lg:h-[48px] rounded-xl lg:rounded-2xl flex items-center justify-center flex-shrink-0"
                    style={{ backgroundColor: colors.surfaceMuted }}
                  >
                    <Icon size={18} className="lg:w-5 lg:h-5" style={{ color: colors.activeText }} />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-sm lg:text-base font-black mb-1" style={{ color: colors.text }}>
                      {item.title}
                    </h3>
                    <p className="text-xs lg:text-sm font-medium leading-relaxed" style={{ color: colors.textMuted }}>
                      {item.subtitle}
                    </p>
                  </div>
                  <ShieldCheck size={16} className="lg:w-5 lg:h-5 flex-shrink-0 mt-1" style={{ color: colors.activeText }} />
                </div>
              );
            })}
          </div>
        </div>

        {/* Info Cards Row */}
        <div className="grid md:grid-cols-2 gap-4 lg:gap-6">
          {infoCards.map((card) => {
            const Icon = card.icon;
            return (
              <div
                key={card.title}
                className="rounded-2xl lg:rounded-3xl p-5 lg:p-6 border"
                style={{
                  backgroundColor: colors.surface,
                  borderColor: colors.border,
                }}
              >
                <Icon size={18} className="lg:w-5 lg:h-5 mb-3" style={{ color: colors.activeText }} />
                <h3 className="text-sm lg:text-base font-black mb-2" style={{ color: colors.text }}>
                  {card.title}
                </h3>
                <p className="text-xs lg:text-sm font-medium leading-relaxed" style={{ color: colors.textMuted }}>
                  {card.subtitle}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
