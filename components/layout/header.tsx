'use client';

import { Bell, Menu, Globe, House, X, ChevronRight, User, LogOut } from 'lucide-react';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { ThemeToggle } from '@/components/common/theme-toggle';
import { useTheme } from '@/lib/theme/theme-provider';
import { useI18n } from '@/lib/i18n/i18n-provider';
import { useAuth } from '@/lib/auth/auth-store';
import { iconSize, iconButtonClasses, buttonClasses } from '@/lib/design-system/dimensions';

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
  const { isAuthenticated, session, signOut } = useAuth();
  const router = useRouter();
  const [isLanguageOpen, setIsLanguageOpen] = useState(false);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);

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
        role="banner"
      >
        <div className="flex items-center justify-between px-4 lg:px-6 h-14 lg:h-16">
          {/* Logo */}
          <div className="flex items-center gap-2.5">
            <a href="/" className="flex items-center gap-2.5">
              <div className={`${iconButtonClasses.md} lg:${iconButtonClasses.lg} rounded-xl bg-[#0B8F55] flex items-center justify-center`}>
                <House className="text-white" size={iconSize.lg} strokeWidth={2.5} />
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
            </a>
          </div>

          {/* Header Actions */}
          <div className="flex items-center gap-3 lg:gap-5">
            {/* Language Dropdown */}
            <div className="relative">
              <button
                onClick={() => setIsLanguageOpen(!isLanguageOpen)}
                className={`${iconButtonClasses.sm} flex items-center justify-center transition-colors`}
                style={{ 
                  backgroundColor: isLanguageOpen ? colors.iconButtonBackground : 'transparent' 
                }}
                onMouseEnter={(e) => e.currentTarget.style.backgroundColor = colors.iconButtonBackground}
                onMouseLeave={(e) => {
                  if (!isLanguageOpen) e.currentTarget.style.backgroundColor = 'transparent';
                }}
                aria-label="Change language"
                aria-expanded={isLanguageOpen}
                aria-haspopup="true"
              >
                <Globe className="text-[#0B8F55]" size={iconSize.xl} strokeWidth={2} aria-hidden="true" />
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
                    role="menu"
                    aria-label="Language selection"
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
                          role="menuitem"
                          aria-current={selectedLocale === lang.code ? 'true' : undefined}
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
              onClick={() => router.push('/account/notifications')}
              className={`${iconButtonClasses.sm} flex items-center justify-center transition-colors relative`}
              style={{ backgroundColor: 'transparent' }}
              onMouseEnter={(e) => e.currentTarget.style.backgroundColor = colors.iconButtonBackground}
              onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
              aria-label="Notifications"
            >
              <Bell size={iconSize.xl} strokeWidth={2} style={{ color: colors.icon }} />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full" />
            </button>

            {/* Menu Button - Hidden on desktop */}
            <button
              onClick={() => setIsDrawerOpen(true)}
              className={`lg:hidden ${iconButtonClasses.sm} flex items-center justify-center transition-colors`}
              style={{ backgroundColor: 'transparent' }}
              onMouseEnter={(e) => e.currentTarget.style.backgroundColor = colors.iconButtonBackground}
              onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
              aria-label="Open menu"
            >
              <Menu size={iconSize.xl} strokeWidth={2} style={{ color: colors.icon }} />
            </button>

            {/* Auth Button / User Menu - Desktop only, rightmost */}
            {!isAuthenticated ? (
              <button
                onClick={() => router.push('/auth')}
                className={`hidden lg:flex items-center gap-2 ${buttonClasses.md} bg-[#22C55E] hover:bg-[#1EA952] text-white font-bold transition-colors`}
              >
                <User size={iconSize.md} strokeWidth={2.5} />
                Sign In
              </button>
            ) : (
              <div className="relative hidden lg:block">
                <button
                  onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                  className={`flex items-center gap-2 ${buttonClasses.md} transition-colors`}
                  style={{ 
                    backgroundColor: isUserMenuOpen ? colors.iconButtonBackground : 'transparent' 
                  }}
                  onMouseEnter={(e) => e.currentTarget.style.backgroundColor = colors.iconButtonBackground}
                  onMouseLeave={(e) => {
                    if (!isUserMenuOpen) e.currentTarget.style.backgroundColor = 'transparent';
                  }}
                  aria-label={`User menu for ${session?.displayName}`}
                  aria-expanded={isUserMenuOpen}
                  aria-haspopup="true"
                >
                  <div className={`${iconButtonClasses.sm} rounded-full bg-[#22C55E] flex items-center justify-center`}>
                    <span className="text-white text-sm font-bold">
                      {session?.displayName.charAt(0).toUpperCase()}
                    </span>
                  </div>
                  <span className="text-sm font-semibold" style={{ color: colors.text }}>
                    {session?.displayName}
                  </span>
                </button>

                {isUserMenuOpen && (
                  <>
                    <div
                      className="fixed inset-0 z-40"
                      onClick={() => setIsUserMenuOpen(false)}
                    />
                    <div 
                      className="absolute right-0 top-12 w-56 rounded-2xl shadow-xl border p-3 z-50"
                      style={{ 
                        backgroundColor: colors.surface, 
                        borderColor: colors.border 
                      }}
                      role="menu"
                      aria-label="User account menu"
                    >
                      <div className="space-y-2">
                        <button
                          onClick={() => {
                            router.push('/account');
                            setIsUserMenuOpen(false);
                          }}
                          className={`w-full text-left ${buttonClasses.md} justify-start transition-colors flex items-center gap-2`}
                          style={{ 
                            backgroundColor: colors.surface, 
                            color: colors.text 
                          }}
                          onMouseEnter={(e) => e.currentTarget.style.backgroundColor = colors.iconButtonBackground}
                          onMouseLeave={(e) => e.currentTarget.style.backgroundColor = colors.surface}
                          role="menuitem"
                        >
                          <User size={iconSize.md} aria-hidden="true" />
                          Account
                        </button>
                        <button
                          onClick={async () => {
                            await signOut();
                            setIsUserMenuOpen(false);
                            router.push('/');
                          }}
                          className={`w-full text-left ${buttonClasses.md} justify-start transition-colors flex items-center gap-2`}
                          style={{ 
                            backgroundColor: colors.surface, 
                            color: colors.text 
                          }}
                          onMouseEnter={(e) => e.currentTarget.style.backgroundColor = colors.iconButtonBackground}
                          onMouseLeave={(e) => e.currentTarget.style.backgroundColor = colors.surface}
                          role="menuitem"
                        >
                          <LogOut size={iconSize.md} aria-hidden="true" />
                          Sign Out
                        </button>
                      </div>
                    </div>
                  </>
                )}
              </div>
            )}
          </div>
        </div>
      </header>

      {/* Right Drawer Menu */}
      {isDrawerOpen && (
        <>
          <div
            className="fixed inset-0 bg-black/50 z-50 transition-opacity"
            onClick={() => setIsDrawerOpen(false)}
            aria-hidden="true"
          />
          <nav
            className="fixed top-0 right-0 bottom-0 w-72 shadow-2xl z-50 transform transition-transform"
            style={{ backgroundColor: colors.drawerBackground }}
            role="navigation"
            aria-label="Mobile menu"
            id="main-navigation"
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
                  className={`${iconButtonClasses.sm} flex items-center justify-center transition-colors`}
                  style={{ backgroundColor: 'transparent' }}
                  onMouseEnter={(e) => e.currentTarget.style.backgroundColor = colors.iconButtonBackground}
                  onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
                >
                  <X size={iconSize.xl} style={{ color: colors.icon }} />
                </button>
              </div>

              {/* Drawer Content */}
              <div className="flex-1 overflow-y-auto py-2" role="menu">
                {/* Auth Section - Show at top */}
                {!isAuthenticated ? (
                  <button
                    onClick={() => {
                      router.push('/auth');
                      setIsDrawerOpen(false);
                    }}
                    className={`w-full flex items-center justify-center gap-2 mx-5 mb-4 ${buttonClasses.lg} bg-[#22C55E] hover:bg-[#1EA952] text-white font-bold transition-colors`}
                    aria-label="Sign in or register"
                  >
                    <User size={iconSize.lg} strokeWidth={2.5} aria-hidden="true" />
                    Sign In / Register
                  </button>
                ) : (
                  <div className="px-5 py-4 mb-2 border-b" style={{ borderColor: colors.border }}>
                    <div className="flex items-center gap-3">
                      <div className={`${iconButtonClasses.xl} rounded-full bg-[#22C55E] flex items-center justify-center flex-shrink-0`}>
                        <span className="text-white text-lg font-bold">
                          {session?.displayName.charAt(0).toUpperCase()}
                        </span>
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-base font-bold truncate" style={{ color: colors.text }}>
                          {session?.displayName}
                        </p>
                        <p className="text-xs font-semibold" style={{ color: colors.textMuted }}>
                          {session?.role && t(`auth.role.${session.role}.title`)}
                        </p>
                      </div>
                    </div>
                  </div>
                )}

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

                {/* Sign Out at bottom if authenticated */}
                {isAuthenticated && (
                  <button
                    onClick={async () => {
                      await signOut();
                      setIsDrawerOpen(false);
                      router.push('/');
                    }}
                    className="w-full flex items-center gap-3 px-5 py-3.5 mt-2 border-t transition-colors"
                    style={{ 
                      backgroundColor: 'transparent',
                      borderColor: colors.border
                    }}
                    onMouseEnter={(e) => e.currentTarget.style.backgroundColor = colors.iconButtonBackground}
                    onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
                  >
                    <LogOut size={iconSize.lg} strokeWidth={2} style={{ color: colors.icon }} />
                    <span className="text-base font-medium" style={{ color: colors.text }}>
                      {t('account.signOut')}
                    </span>
                  </button>
                )}
              </div>
            </div>
          </nav>
        </>
      )}
    </>
  );
}
