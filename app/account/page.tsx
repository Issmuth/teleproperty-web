'use client';

import { 
  Star, Heart, Building2, PhoneCall, CreditCard, MessageSquareHeart,
  Bell, Shield, Headphones, Globe, ChevronRight, User
} from 'lucide-react';
import { useTheme } from '@/lib/theme/theme-provider';
import { useI18n } from '@/lib/i18n/i18n-provider';

export default function AccountPage() {
  const isAuthenticated = false; // Replace with actual auth state
  const { colors } = useTheme();
  const { t } = useI18n();

  const accountItems = [
    {
      icon: Star,
      iconColor: '#F59E0B',
      bgColor: '#FFF7E6',
      title: t('account.mySubscription.title'),
      subtitle: t('account.mySubscription.subtitle'),
    },
    {
      icon: Heart,
      iconColor: '#FB7185',
      bgColor: '#FFF1F2',
      title: t('account.savedProperties.title'),
      subtitle: t('account.savedProperties.subtitle_zero', { count: 0 }),
    },
    {
      icon: Building2,
      iconColor: '#3B82F6',
      bgColor: '#EFF6FF',
      title: t('account.myListings.title'),
      subtitle: t('account.myListings.subtitle_zero', { count: 0 }),
    },
    {
      icon: PhoneCall,
      iconColor: '#22C55E',
      bgColor: '#ECFDF5',
      title: t('account.myCallbacks.title'),
      subtitle: t('account.myCallbacks.subtitle_other', { count: 2 }),
    },
    {
      icon: CreditCard,
      iconColor: '#F59E0B',
      bgColor: '#FFF7E6',
      title: t('account.myPayments.title'),
      subtitle: t('account.myPayments.subtitle'),
    },
    {
      icon: MessageSquareHeart,
      iconColor: '#F59E0B',
      bgColor: '#FFF7E6',
      title: t('account.myReviews.title'),
      subtitle: t('account.myReviews.subtitle', { count: 3 }),
    },
    {
      icon: Bell,
      iconColor: '#A855F7',
      bgColor: '#F3E8FF',
      title: t('account.notifications.title'),
      subtitle: t('account.notifications.subtitle'),
    },
    {
      icon: Shield,
      iconColor: '#64748B',
      bgColor: '#F8FAFC',
      title: t('account.privacy.title'),
      subtitle: t('account.privacy.subtitle'),
    },
    {
      icon: Headphones,
      iconColor: '#14B8A6',
      bgColor: '#ECFEFF',
      title: t('account.support.title'),
      subtitle: t('account.support.subtitle'),
    },
  ];

  return (
    <div className="flex-1" style={{ backgroundColor: colors.background }}>
      <div className="max-w-4xl mx-auto px-4 lg:px-8 py-6 lg:py-8 space-y-4">
        
        {/* Profile Card */}
        <div className="bg-gradient-to-br from-[#0B8F55] to-[#0A7A4A] rounded-2xl p-6 text-white">
          <div className="flex items-start gap-4">
            <div className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center">
              <User size={32} className="text-white" />
            </div>
            <div className="flex-1">
              {isAuthenticated ? (
                <>
                  <h2 className="text-xl font-black mb-1">John Doe</h2>
                  <p className="text-sm font-medium text-white/90 mb-0.5">+251 912 345 678</p>
                  <p className="text-xs font-semibold text-white/80">Basic Plan</p>
                </>
              ) : (
                <>
                  <h2 className="text-xl font-black mb-1">{t('account.welcome')}</h2>
                  <p className="text-sm font-medium text-white/90 mb-3">{t('account.signInMessage')}</p>
                  <button className="px-4 py-2 bg-white rounded-xl hover:bg-gray-100 transition-colors">
                    <span className="text-sm font-bold text-[#0B8F55]">{t('account.signInButton')}</span>
                  </button>
                </>
              )}
            </div>
          </div>
        </div>

        {/* Account Items */}
        <div className="border rounded-2xl p-2 space-y-0" style={{ backgroundColor: colors.surface, borderColor: colors.border }}>
          {accountItems.map((item, index) => {
            const Icon = item.icon;
            return (
              <div key={index}>
                <button 
                  className="w-full flex items-center gap-3 p-3 rounded-xl transition-colors"
                  style={{ backgroundColor: 'transparent' }}
                  onMouseEnter={(e) => e.currentTarget.style.backgroundColor = colors.surfaceMuted}
                  onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
                >
                  <div 
                    className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
                    style={{ backgroundColor: item.bgColor }}
                  >
                    <Icon size={18} style={{ color: item.iconColor }} />
                  </div>
                  <div className="flex-1 text-left">
                    <h3 className="text-sm font-bold" style={{ color: colors.text }}>{item.title}</h3>
                    <p className="text-xs font-medium" style={{ color: colors.textMuted }}>{item.subtitle}</p>
                  </div>
                  <ChevronRight size={18} className="flex-shrink-0" style={{ color: colors.iconMuted }} />
                </button>
                {index < accountItems.length - 1 && (
                  <div className="h-2" />
                )}
              </div>
            );
          })}
        </div>

        {/* Language */}
        <div className="border rounded-2xl p-2" style={{ backgroundColor: colors.surface, borderColor: colors.border }}>
          <button 
            className="w-full flex items-center gap-3 p-3 rounded-xl transition-colors"
            style={{ backgroundColor: 'transparent' }}
            onMouseEnter={(e) => e.currentTarget.style.backgroundColor = colors.surfaceMuted}
            onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
          >
            <div className="w-10 h-10 bg-[#ECFDF5] rounded-xl flex items-center justify-center">
              <Globe size={18} className="text-[#22C55E]" />
            </div>
            <div className="flex-1 text-left">
              <h3 className="text-sm font-bold" style={{ color: colors.text }}>{t('account.appLanguage.title')}</h3>
              <p className="text-xs font-medium" style={{ color: colors.textMuted }}>{t('languages.en')}</p>
            </div>
            <ChevronRight size={18} style={{ color: colors.iconMuted }} />
          </button>
        </div>

        {/* Sign Out / Sign In Button */}
        {isAuthenticated ? (
          <button className="w-full py-3 bg-[#0B8F55] text-white font-black rounded-xl hover:bg-[#0A7A4A] transition-colors">
            {t('account.signOut')}
          </button>
        ) : (
          <button className="w-full py-3 bg-[#0B8F55] text-white font-black rounded-xl hover:bg-[#0A7A4A] transition-colors">
            {t('account.signInButton')}
          </button>
        )}
      </div>
    </div>
  );
}
