'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { 
  Home, 
  Building2, 
  DraftingCompass, 
  CreditCard, 
  User
} from 'lucide-react';
import { useTheme } from '@/lib/theme/theme-provider';
import { useI18n } from '@/lib/i18n/i18n-provider';
import { iconSize } from '@/lib/design-system/dimensions';

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

  return (
    <>
      {/* Desktop Sidebar - Hidden on mobile */}
      <aside 
        className="hidden lg:block sticky top-0 left-0 h-screen w-64 border-r"
        style={{ backgroundColor: colors.background, borderColor: colors.border }}
      >
        <div className="flex flex-col h-full p-4">
          {/* Logo */}
          <div className="mb-8 px-3 pt-2">
            <h1 className="text-2xl font-black text-[#0B8F55] tracking-tight">
              TeleProperty
            </h1>
            <p className="text-xs mt-1" style={{ color: colors.textMuted }}>
              Property Platform
            </p>
          </div>

          {/* Navigation */}
          <nav className="flex-1 space-y-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = pathname === item.href;
              
              return (
                <Link
                  key={item.key}
                  href={item.href}
                  className="flex items-center gap-3 px-4 py-3 rounded-xl font-semibold text-sm transition-all duration-200 border"
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
                  <Icon size={iconSize.xl} strokeWidth={2.1} />
                  <span>{t(item.translationKey)}</span>
                </Link>
              );
            })}
          </nav>

          {/* Footer info */}
          <div className="pt-4 border-t" style={{ borderColor: colors.border }}>
            <p className="text-xs px-3" style={{ color: colors.textMuted }}>
              © 2024 TeleProperty
            </p>
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
