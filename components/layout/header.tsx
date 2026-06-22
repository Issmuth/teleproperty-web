'use client';

import { Bell, Menu, Globe, House, X, ChevronRight } from 'lucide-react';
import { useState } from 'react';
import { ThemeToggle } from '@/components/common/theme-toggle';
import { useTheme } from '@/lib/theme/theme-provider';
import { useI18n } from '@/lib/i18n/i18n-provider';

const languages = [
  { code: null, labelKey: 'languages.useDevice' },
  { code: 'en' as const, labelKey: 'languages.en' },
  { code: 'am' as const, labelKey: 'languages.am' },
  { code: 'om' as const, labelKey: 'languages.om' },
  { code: 'ti' as const, labelKey: 'languages.ti' },
];

const drawerMenuItems = [
  { labelKey: 'drawer.searchProperty', href: '/property' },
  { labelKey: 'drawer.postProperty', href: '/property/post' },
  { labelKey: 'drawer.newProjects', href: '/projects' },
  { labelKey: 'drawer.developersHub', href: '/developer-hub' },
  { labelKey: 'drawer.verifiedBrokers', href: '/broker-hub' },
  { labelKey: 'drawer.subscriptionPlans', href: '/subscriptions' },
  { labelKey: 'drawer.mySubscription', href: '/account/subscription' },
  { labelKey: 'drawer.myPayments', href: '/account/payments' },
  { labelKey: 'drawer.settings', href: '/account/settings' },
];

export function Header() {
  const { colors } = useTheme();
  const { t, setLocale, selectedLocale } = useI18n();
  const [isLanguageOpen, setIsLanguageOpen] = useState(false);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const handleLanguageSelect = (code: 'en' | 'am' | 'om' | 'ti' | null) => {
    setLocale(code);
    setIsLanguageOpen(false);
  };

  return (
    <>
      <header 
        className="sticky top-0 z-40 border-b shadow-sm"
        style={{ 
          backgroundColor: colors.headerBackground, 
          borderColor: colors.border 
        }}
      >
        <div className="flex items-center justify-between px-4 lg:px-6 h-14 lg:h-16">
          {/* Logo */}
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 lg:w-10 lg:h-10 rounded-xl bg-[#0B8F55] flex items-center justify-center">
              <House className="text-white" size={18} strokeWidth={2.5} />
            </div>
            <div className="hidden sm:block">
              <h1 
                className="text-base lg:text-lg font-black leading-tight"
                style={{ color: colors.text }}
              >
                TeleProperty
              </h1>
              <p className="text-xs font-semibold text-[#0B8F55] leading-tight">
                Finder Ethiopia
              </p>
            </div>
          </div>

          {/* Header Actions */}
          <div className="flex items-center gap-3 lg:gap-5">
            {/* Language Dropdown */}
            <div className="relative">
              <button
                onClick={() => setIsLanguageOpen(!isLanguageOpen)}
                className="p-2 rounded-lg transition-colors"
                style={{ 
                  backgroundColor: isLanguageOpen ? colors.iconButtonBackground : 'transparent' 
                }}
                onMouseEnter={(e) => e.currentTarget.style.backgroundColor = colors.iconButtonBackground}
                onMouseLeave={(e) => {
                  if (!isLanguageOpen) e.currentTarget.style.backgroundColor = 'transparent';
                }}
                aria-label="Change language"
              >
                <Globe className="text-[#0B8F55]" size={20} strokeWidth={2} />
              </button>

              {isLanguageOpen && (
                <>
                  <div
                    className="fixed inset-0 z-40"
                    onClick={() => setIsLanguageOpen(false)}
                  />
                  <div 
                    className="absolute right-0 top-12 w-56 rounded-2xl shadow-xl border p-3 z-50"
                    style={{ 
                      backgroundColor: colors.surface, 
                      borderColor: colors.border 
                    }}
                  >
                    <p 
                      className="text-xs font-bold uppercase tracking-wide px-3 pb-2"
                      style={{ color: colors.textMuted }}
                    >
                      {t('account.appLanguage.title')}
                    </p>
                    <div className="space-y-2">
                      {languages.map((lang) => (
                        <button
                          key={lang.code ?? 'system'}
                          onClick={() => handleLanguageSelect(lang.code)}
                          className="w-full text-left px-3 py-2.5 rounded-xl text-sm font-semibold transition-colors border"
                          style={selectedLocale === lang.code
                            ? { 
                                backgroundColor: colors.activeSurface, 
                                borderColor: colors.activeBorder, 
                                color: colors.activeText 
                              }
                            : { 
                                backgroundColor: colors.surface, 
                                borderColor: colors.border, 
                                color: colors.text 
                              }
                          }
                        >
                          {t(lang.labelKey)}
                        </button>
                      ))}
                    </div>
                  </div>
                </>
              )}
            </div>

            {/* Theme Toggle */}
            <ThemeToggle />

            {/* Notifications */}
            <button
              className="p-2 rounded-lg transition-colors relative"
              style={{ backgroundColor: 'transparent' }}
              onMouseEnter={(e) => e.currentTarget.style.backgroundColor = colors.iconButtonBackground}
              onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
              aria-label="Notifications"
            >
              <Bell size={20} strokeWidth={2} style={{ color: colors.icon }} />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full" />
            </button>

            {/* Menu Button */}
            <button
              onClick={() => setIsDrawerOpen(true)}
              className="p-2 rounded-lg transition-colors"
              style={{ backgroundColor: 'transparent' }}
              onMouseEnter={(e) => e.currentTarget.style.backgroundColor = colors.iconButtonBackground}
              onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
              aria-label="Open menu"
            >
              <Menu size={20} strokeWidth={2} style={{ color: colors.icon }} />
            </button>
          </div>
        </div>
      </header>

      {/* Right Drawer Menu */}
      {isDrawerOpen && (
        <>
          <div
            className="fixed inset-0 bg-black/50 z-50 transition-opacity"
            onClick={() => setIsDrawerOpen(false)}
          />
          <div 
            className="fixed top-0 right-0 bottom-0 w-72 shadow-2xl z-50 transform transition-transform"
            style={{ backgroundColor: colors.drawerBackground }}
          >
            <div className="flex flex-col h-full">
              {/* Drawer Header */}
              <div 
                className="flex items-center justify-between p-5 border-b"
                style={{ borderColor: colors.border }}
              >
                <h2 className="text-xl font-bold" style={{ color: colors.text }}>
                  {t('drawer.menuTitle')}
                </h2>
                <button
                  onClick={() => setIsDrawerOpen(false)}
                  className="p-2 rounded-lg transition-colors"
                  style={{ backgroundColor: 'transparent' }}
                  onMouseEnter={(e) => e.currentTarget.style.backgroundColor = colors.iconButtonBackground}
                  onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
                >
                  <X size={20} style={{ color: colors.icon }} />
                </button>
              </div>

              {/* Drawer Content */}
              <div className="flex-1 overflow-y-auto py-2">
                {drawerMenuItems.map((item, index) => (
                  <a
                    key={index}
                    href={item.href}
                    onClick={() => setIsDrawerOpen(false)}
                    className="flex items-center justify-between px-5 py-3.5 transition-colors"
                    style={{ backgroundColor: 'transparent' }}
                    onMouseEnter={(e) => e.currentTarget.style.backgroundColor = colors.iconButtonBackground}
                    onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
                  >
                    <span className="text-base font-medium" style={{ color: colors.text }}>
                      {t(item.labelKey)}
                    </span>
                    <ChevronRight size={16} strokeWidth={2} style={{ color: colors.iconMuted }} />
                  </a>
                ))}
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
}
