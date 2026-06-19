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

const navItems = [
  { key: 'home', label: 'Home', icon: Home, href: '/' },
  { key: 'property', label: 'Property', icon: Building2, href: '/property' },
  { key: 'projects', label: 'Projects', icon: DraftingCompass, href: '/projects' },
  { key: 'payments', label: 'Payments', icon: CreditCard, href: '/payments' },
  { key: 'account', label: 'Account', icon: User, href: '/account' },
];

export function Sidebar() {
  const pathname = usePathname();

  return (
    <>
      {/* Desktop Sidebar - Hidden on mobile */}
      <aside className="hidden lg:block sticky top-0 left-0 h-screen w-64 bg-white border-r border-gray-200">
        <div className="flex flex-col h-full p-4">
          {/* Logo */}
          <div className="mb-8 px-3 pt-2">
            <h1 className="text-2xl font-black text-[#0B8F55] tracking-tight">
              TeleProperty
            </h1>
            <p className="text-xs text-gray-600 mt-1">Property Platform</p>
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
                  className={`
                    flex items-center gap-3 px-4 py-3 rounded-xl font-semibold text-sm
                    transition-all duration-200
                    ${isActive 
                      ? 'bg-[#ECFDF5] text-[#0B8F55] border border-[#0B8F55]/20' 
                      : 'text-gray-700 hover:bg-gray-100'
                    }
                  `}
                >
                  <Icon size={20} strokeWidth={2.1} />
                  <span>{item.label}</span>
                </Link>
              );
            })}
          </nav>

          {/* Footer info */}
          <div className="pt-4 border-t border-gray-200">
            <p className="text-xs text-gray-500 px-3">
              © 2024 TeleProperty
            </p>
          </div>
        </div>
      </aside>

      {/* Mobile Bottom Tab Bar - Only visible on mobile */}
      <nav className="lg:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 z-50 safe-area-bottom">
        <div className="flex items-center justify-around px-2 py-2 max-w-md mx-auto">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.href;
            
            return (
              <Link
                key={item.key}
                href={item.href}
                className={`
                  flex flex-col items-center justify-center flex-1 py-2 px-1 rounded-xl
                  transition-all duration-200 min-h-[66px]
                  ${isActive 
                    ? 'bg-[#ECFDF5] border border-[#0B8F55]/20' 
                    : ''
                  }
                `}
              >
                <Icon 
                  size={20} 
                  strokeWidth={2.1}
                  className={isActive ? 'text-[#0B8F55]' : 'text-gray-500'}
                />
                <span className={`
                  text-[11px] font-bold mt-1
                  ${isActive ? 'text-[#0B8F55]' : 'text-gray-700'}
                `}>
                  {item.label}
                </span>
              </Link>
            );
          })}
        </div>
      </nav>
    </>
  );
}
