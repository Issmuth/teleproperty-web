'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { 
  Home, 
  Building2, 
  DraftingCompass, 
  CreditCard, 
  User,
  Menu,
  X
} from 'lucide-react';
import { useState } from 'react';

const navItems = [
  { key: 'home', label: 'Home', icon: Home, href: '/' },
  { key: 'property', label: 'Property', icon: Building2, href: '/property' },
  { key: 'projects', label: 'Projects', icon: DraftingCompass, href: '/projects' },
  { key: 'payments', label: 'Payments', icon: CreditCard, href: '/payments' },
  { key: 'account', label: 'Account', icon: User, href: '/account' },
];

export function Sidebar() {
  const pathname = usePathname();
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  return (
    <>
      {/* Mobile menu button */}
      <button
        onClick={() => setIsMobileOpen(!isMobileOpen)}
        className="lg:hidden fixed top-4 left-4 z-50 p-2 rounded-lg bg-white shadow-md"
      >
        {isMobileOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      {/* Sidebar */}
      <aside
        className={`
          fixed lg:sticky top-0 left-0 h-screen w-64 bg-white border-r border-gray-200
          transform transition-transform duration-300 ease-in-out z-40
          ${isMobileOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
        `}
      >
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
                  onClick={() => setIsMobileOpen(false)}
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

      {/* Mobile overlay */}
      {isMobileOpen && (
        <div
          className="lg:hidden fixed inset-0 bg-black/50 z-30"
          onClick={() => setIsMobileOpen(false)}
        />
      )}
    </>
  );
}
