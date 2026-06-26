'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { 
  Home, 
  Building2, 
  DraftingCompass, 
  CreditCard, 
  User,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';
import { useTheme } from '@/lib/theme/theme-provider';
import { useI18n } from '@/lib/i18n/i18n-provider';
import { useSidebar } from '@/lib/layout/sidebar-context';
import { iconSize, iconButtonClasses } from '@/lib/design-system/dimensions';

const navItems = [
  { key: 'home', translationKey: 'nav.home', icon: Home, href: '/' },
  { key: 'property', translationKey: 'nav.property', icon: Building2, href: '/property' },
  { key: 'projects', translationKey: 'nav.projects', icon: DraftingCompass, href: '/projects' },
  { key: 'payments', translationKey: 'nav.payments', icon: CreditCard, href: '/payments' },
  { key: 'account', translationKey: 'nav.account', icon: User, href: '/account' },
];

export function Sidebar() {
  const pathname = usePathname();
  const { colors } = useTheme();
  const { t } = useI18n();
  const { isCollapsed, toggleSidebar } = useSidebar();

  return (
    <>
      {/* Desktop Sidebar - Hidden on mobile */}
      <aside 
        className={`hidden lg:block sticky top-0 left-0 h-screen border-r transition-all duration-300 ${
          isCollapsed ? 'w-20' : 'w-64'
        }`}
        style={{ backgroundColor: colors.background, borderColor: colors.border }}
        role="navigation"
        aria-label="Main navigation"
        id="main-navigation"
      >
        <div className="flex flex-col h-full p-4">
          {/* Logo - Fixed height to prevent shifting */}
          <div className="mb-8 h-[72px] flex items-start pt-2">
            {isCollapsed ? (
              <div className="flex items-center justify-center w-full">
                <div className="w-12 h-12 rounded-xl bg-[#0B8F55] flex items-center justify-center">
                  <span className="text-white font-black text-xl">T</span>
                </div>
              </div>
            ) : (
              <div className="px-3">
                <h1 className="text-2xl font-black text-[#0B8F55] tracking-tight">
                  TeleProperty
                </h1>
                <p className="text-xs mt-1" style={{ color: colors.textMuted }}>
                  Property Platform
                </p>
              </div>
            )}
          </div>

          {/* Navigation */}
          <nav className="flex-1 space-y-1" aria-label="Main menu">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = pathname === item.href;
              
              return (
                <Link
                  key={item.key}
                  href={item.href}
                  title={isCollapsed ? t(item.translationKey) : undefined}
                  className={`flex items-center rounded-xl font-semibold text-sm transition-all duration-200 border ${
                    isCollapsed ? 'justify-center px-4 py-3' : 'gap-3 px-4 py-3'
                  }`}
                  style={isActive 
                    ? { 
                        backgroundColor: colors.activeSurface, 
                        color: colors.activeText,
                        borderColor: colors.activeBorder 
                      }
                    : { 
                        backgroundColor: 'transparent',
                        color: colors.text,
                        borderColor: 'transparent'
                      }
                  }
                >
                  <Icon size={iconSize.xl} strokeWidth={2.1} className="flex-shrink-0" />
                  {!isCollapsed && <span>{t(item.translationKey)}</span>}
                </Link>
              );
            })}
          </nav>

          {/* Toggle Button */}
          <div className={`mb-4 ${isCollapsed ? 'flex justify-center' : ''}`}>
            <button
              onClick={toggleSidebar}
              type="button"
              aria-label={isCollapsed ? 'Expand sidebar' : 'Collapse sidebar'}
              aria-expanded={!isCollapsed}
              className={`${iconButtonClasses.md} rounded-xl border flex items-center justify-center transition-all hover:opacity-80`}
              style={{ backgroundColor: colors.surface, borderColor: colors.border }}
            >
              {isCollapsed ? (
                <ChevronRight size={iconSize.lg} style={{ color: colors.text }} aria-hidden="true" />
              ) : (
                <ChevronLeft size={iconSize.lg} style={{ color: colors.text }} aria-hidden="true" />
              )}
            </button>
          </div>

          {/* Footer info - Fixed height */}
          <div className="pt-4 border-t h-[52px]" style={{ borderColor: colors.border }}>
            {!isCollapsed && (
              <p className="text-xs px-3" style={{ color: colors.textMuted }}>
                © 2024 TeleProperty
              </p>
            )}
          </div>
        </div>
      </aside>

      {/* Mobile Bottom Tab Bar - Only visible on mobile */}
      <nav 
        className="lg:hidden fixed bottom-0 left-0 right-0 border-t z-50 safe-area-bottom"
        style={{ backgroundColor: colors.tabBarBackground, borderColor: colors.border }}
      >
        <div className="flex items-center justify-around px-2 py-2 max-w-md mx-auto">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.href;
            
            return (
              <Link
                key={item.key}
                href={item.href}
                className="flex flex-col items-center justify-center flex-1 py-2 px-1 rounded-xl transition-all duration-200 h-16 border"
                style={isActive 
                  ? { 
                      backgroundColor: colors.activeSurface,
                      borderColor: colors.activeBorder
                    }
                  : { 
                      backgroundColor: 'transparent',
                      borderColor: 'transparent'
                    }
                }
              >
                <Icon 
                  size={iconSize.xl} 
                  strokeWidth={2.1}
                  style={{ color: isActive ? colors.activeText : colors.iconMuted }}
                />
                <span 
                  className="text-[11px] font-bold mt-1"
                  style={{ color: isActive ? colors.activeText : colors.text }}
                >
                  {t(item.translationKey)}
                </span>
              </Link>
            );
          })}
        </div>
      </nav>
    </>
  );
}
