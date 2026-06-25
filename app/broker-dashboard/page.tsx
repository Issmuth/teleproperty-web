'use client';

import { useRouter } from 'next/navigation';
import {
  ArrowRight,
  BarChart3,
  Bell,
  BookOpen,
  Building2,
  ChevronLeft,
  CirclePlus,
  MessageCircle,
  Phone,
  ShieldCheck,
  Star,
  Users,
  Wallet,
  Zap,
} from 'lucide-react';
import { useTheme } from '@/lib/theme/theme-provider';
import { useI18n } from '@/lib/i18n/i18n-provider';
import { Tag } from '@/components/common/tag';

const metrics = [
  { value: '4', labelKey: 'account.brokerDashboard.metrics.myListings', icon: Building2, color: '#6366F1', bg: '#EEF2FF' },
  { value: '2', labelKey: 'account.brokerDashboard.metrics.newLeads', icon: Bell, color: '#EF4444', bg: '#FEF2F2' },
  { value: '3', labelKey: 'account.brokerDashboard.metrics.callbacks', icon: Phone, color: '#8B5CF6', bg: '#F5F3FF' },
  { value: 'ETB 400', labelKey: 'account.brokerDashboard.metrics.wallet', icon: Wallet, color: '#10B981', bg: '#ECFDF5' },
] as const;

const quickLinks = [
  {
    icon: Users,
    color: '#EF4444',
    bg: '#FEF2F2',
    titleKey: 'account.brokerDashboard.links.verifiedLeads',
    subtitleKey: 'account.brokerDashboard.links.verifiedLeadsSubtitle',
    badge: '2 New',
    badgeColor: '#FFFFFF',
    badgeBg: '#EF4444',
  },
  {
    icon: Building2,
    color: '#6366F1',
    bg: '#EEF2FF',
    titleKey: 'account.brokerDashboard.links.myListings',
    subtitleKey: 'account.brokerDashboard.links.myListingsSubtitle',
    badge: undefined,
    badgeColor: undefined,
    badgeBg: undefined,
  },
  {
    icon: CirclePlus,
    color: '#10B981',
    bg: '#ECFDF5',
    titleKey: 'account.brokerDashboard.links.addListing',
    subtitleKey: 'account.brokerDashboard.links.addListingSubtitle',
    badge: undefined,
    badgeColor: undefined,
    badgeBg: undefined,
  },
  {
    icon: Wallet,
    color: '#10B981',
    bg: '#ECFDF5',
    titleKey: 'account.brokerDashboard.links.brokerWallet',
    subtitleKey: 'account.brokerDashboard.links.brokerWalletSubtitle',
    badge: undefined,
    badgeColor: undefined,
    badgeBg: undefined,
  },
  {
    icon: Star,
    color: '#F59E0B',
    bg: '#FFFBEB',
    titleKey: 'account.brokerDashboard.links.subscriptionPlans',
    subtitleKey: 'account.brokerDashboard.links.subscriptionPlansSubtitle',
    badge: undefined,
    badgeColor: undefined,
    badgeBg: undefined,
  },
  {
    icon: Phone,
    color: '#F97316',
    bg: '#FFF7ED',
    titleKey: 'account.brokerDashboard.links.callbackRequests',
    subtitleKey: 'account.brokerDashboard.links.callbackRequestsSubtitle',
    badge: '3',
    badgeColor: '#FFFFFF',
    badgeBg: '#EF4444',
  },
  {
    icon: MessageCircle,
    color: '#10B981',
    bg: '#ECFDF5',
    titleKey: 'account.brokerDashboard.links.whatsappInquiries',
    subtitleKey: 'account.brokerDashboard.links.whatsappInquiriesSubtitle',
    badge: undefined,
    badgeColor: undefined,
    badgeBg: undefined,
  },
  {
    icon: BookOpen,
    color: '#64748B',
    bg: '#F8FAFC',
    titleKey: 'account.brokerDashboard.links.paymentHistory',
    subtitleKey: 'account.brokerDashboard.links.paymentHistorySubtitle',
    badge: undefined,
    badgeColor: undefined,
    badgeBg: undefined,
  },
  {
    icon: ShieldCheck,
    color: '#6366F1',
    bg: '#EEF2FF',
    titleKey: 'account.brokerDashboard.links.profileVerification',
    subtitleKey: 'account.brokerDashboard.links.profileVerificationSubtitle',
    badge: undefined,
    badgeColor: undefined,
    badgeBg: undefined,
  },
  {
    icon: BarChart3,
    color: '#8B5CF6',
    bg: '#F5F3FF',
    titleKey: 'account.brokerDashboard.links.analytics',
    subtitleKey: 'account.brokerDashboard.links.analyticsSubtitle',
    badge: undefined,
    badgeColor: undefined,
    badgeBg: undefined,
  },
];

export default function BrokerDashboardPage() {
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
        <h1 className="text-lg font-black" style={{ color: colors.text }}>
          {t('account.brokerDashboard.title')}
        </h1>
      </div>

      <div className="max-w-6xl mx-auto px-4 lg:px-8 pt-20 lg:pt-24 pb-32 space-y-6">
        {/* Profile Card */}
        <div
          className="relative rounded-3xl p-6 lg:p-8 overflow-hidden"
          style={{ backgroundColor: isDark ? '#1E3A8A' : '#2F5BEA' }}
        >
          <div
            className="absolute right-[-24px] top-[-24px] w-[100px] h-[100px] rounded-full"
            style={{ backgroundColor: 'rgba(255,255,255,0.1)' }}
          />
          <div className="relative flex items-center gap-4 lg:gap-6">
            <div className="w-14 h-14 lg:w-16 lg:h-16 rounded-2xl bg-white flex items-center justify-center flex-shrink-0">
              <span className="text-lg lg:text-xl font-black" style={{ color: '#2F5BEA' }}>
                AG
              </span>
            </div>
            <div className="flex-1">
              <div className="flex items-center gap-2">
                <h2 className="text-base lg:text-lg font-black text-white">
                  {t('account.brokerDashboard.profileTitle')}
                </h2>
                <ShieldCheck size={16} className="text-white/80" />
              </div>
              <p className="text-xs lg:text-sm font-semibold text-white/85 mt-1">
                {t('account.brokerDashboard.profilePlan')}
              </p>
              <div className="h-1.5 rounded-full bg-white/25 mt-3 overflow-hidden">
                <div className="w-1/4 h-full rounded-full bg-white" />
              </div>
              <p className="text-xs font-semibold text-white/75 mt-1">
                {t('account.brokerDashboard.profileCompletion', { percent: '25' })}
              </p>
            </div>
          </div>
        </div>

        {/* Metrics Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 lg:gap-4">
          {metrics.map((item) => {
            const Icon = item.icon;
            return (
              <div
                key={item.labelKey}
                className="rounded-2xl lg:rounded-3xl p-4 lg:p-5 border flex items-center gap-3"
                style={{
                  backgroundColor: colors.surface,
                  borderColor: colors.border,
                }}
              >
                <div
                  className="w-10 h-10 lg:w-12 lg:h-12 rounded-xl lg:rounded-2xl flex items-center justify-center flex-shrink-0"
                  style={{ backgroundColor: isDark ? colors.surfaceMuted : item.bg }}
                >
                  <Icon size={18} style={{ color: item.color }} className="lg:w-5 lg:h-5" />
                </div>
                <div>
                  <p className="text-lg lg:text-xl font-black" style={{ color: colors.text }}>
                    {item.value}
                  </p>
                  <p className="text-xs font-semibold mt-0.5" style={{ color: colors.textMuted }}>
                    {t(item.labelKey)}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Subscription Card */}
        <div
          className="rounded-3xl p-5 lg:p-6 border space-y-5"
          style={{
            backgroundColor: colors.surface,
            borderColor: colors.border,
          }}
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Zap size={16} className="text-blue-600" />
              <h3 className="text-sm lg:text-base font-black" style={{ color: colors.text }}>
                {t('account.brokerDashboard.subscription.title')}
              </h3>
            </div>
            <Tag 
              variant="custom" 
              customBg={isDark ? 'rgba(22, 163, 74, 0.3)' : '#DCFCE7'} 
              customColor="#16A34A"
              size="sm"
            >
              <div className="flex items-center gap-1.5">
                <div className="w-1.5 h-1.5 rounded-full bg-green-600" />
                <span>{t('account.brokerDashboard.subscription.status')}</span>
              </div>
            </Tag>
          </div>

          <div className="grid grid-cols-3 gap-3">
            {[
              { value: 'Standard', labelKey: 'account.brokerDashboard.subscription.currentPlan' },
              { value: '48 left', labelKey: 'account.brokerDashboard.subscription.leadsRemaining' },
              { value: 'Jun 3', labelKey: 'account.brokerDashboard.subscription.renewalDate' },
            ].map((item) => (
              <div
                key={item.labelKey}
                className="rounded-2xl p-3 lg:p-4"
                style={{ backgroundColor: isDark ? colors.surfaceMuted : '#EFF6FF' }}
              >
                <p className="text-sm lg:text-base font-black text-blue-600">
                  {item.value}
                </p>
                <p className="text-xs font-semibold mt-1" style={{ color: colors.textMuted }}>
                  {t(item.labelKey)}
                </p>
              </div>
            ))}
          </div>

          <button className="w-full min-h-[46px] lg:min-h-[50px] rounded-2xl bg-blue-600 hover:bg-blue-700 transition-colors">
            <span className="text-sm font-black text-white">
              ↑ {t('account.brokerDashboard.subscription.upgrade')}
            </span>
          </button>
        </div>

        {/* New Leads Notice */}
        <div className="flex items-center gap-3 lg:gap-4 bg-rose-50 dark:bg-rose-900/20 border border-rose-200 dark:border-rose-800 rounded-2xl lg:rounded-3xl p-4 lg:p-5">
          <div className="w-10 h-10 lg:w-12 lg:h-12 rounded-xl bg-rose-100 dark:bg-rose-900/40 flex items-center justify-center flex-shrink-0">
            <Bell size={18} className="text-rose-600 lg:w-5 lg:h-5" />
          </div>
          <div className="flex-1">
            <h3 className="text-sm font-black text-rose-900 dark:text-rose-400">
              {t('account.brokerDashboard.leadsNotice.title', { count: '2' })}
            </h3>
            <p className="text-xs font-semibold text-rose-600 dark:text-rose-500 mt-0.5">
              {t('account.brokerDashboard.leadsNotice.subtitle', { location: 'Bole & Kazanchis' })}
            </p>
          </div>
          <button className="px-4 py-2 rounded-full bg-rose-600 hover:bg-rose-700 transition-colors">
            <span className="text-xs font-black text-white">
              {t('account.brokerDashboard.leadsNotice.viewBtn')}
            </span>
          </button>
        </div>

        {/* Quick Links */}
        <div
          className="rounded-3xl border overflow-hidden"
          style={{
            backgroundColor: colors.surface,
            borderColor: colors.border,
          }}
        >
          {quickLinks.map((item, index) => {
            const Icon = item.icon;
            const isLast = index === quickLinks.length - 1;
            return (
              <button
                key={item.titleKey}
                className={`w-full flex items-center gap-3 lg:gap-4 px-4 lg:px-5 py-3.5 lg:py-4 transition-colors ${
                  !isLast ? 'border-b' : ''
                }`}
                style={{ borderColor: colors.border }}
                onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = colors.iconButtonBackground)}
                onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = 'transparent')}
              >
                <div
                  className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
                  style={{ backgroundColor: isDark ? colors.surfaceMuted : item.bg }}
                >
                  <Icon size={16} style={{ color: item.color }} />
                </div>
                <div className="flex-1 text-left">
                  <p className="text-sm font-black" style={{ color: colors.text }}>
                    {t(item.titleKey)}
                  </p>
                  <p className="text-xs font-semibold mt-0.5" style={{ color: colors.textMuted }}>
                    {t(item.subtitleKey)}
                  </p>
                </div>
                {item.badge && (
                  <Tag 
                    variant="custom" 
                    customBg={item.badgeBg} 
                    customColor={item.badgeColor}
                    size="sm"
                  >
                    {item.badge}
                  </Tag>
                )}
                <ArrowRight size={15} style={{ color: colors.textMuted }} />
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
