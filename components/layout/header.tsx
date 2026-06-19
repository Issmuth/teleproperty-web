'use client';

import { Bell, Menu, Moon, Sun, Globe, House, X, ChevronRight } from 'lucide-react';
import { useState } from 'react';

const languages = [
  { code: null, label: 'Use device language' },
  { code: 'en', label: 'English' },
  { code: 'am', label: 'Amharic' },
  { code: 'om', label: 'Afan Oromo' },
  { code: 'ti', label: 'Tigrigna' },
];

const drawerMenuItems = [
  { label: 'Home', href: '/' },
  { label: 'Search Property', href: '/property' },
  { label: 'Post Property', href: '/property/post' },
  { label: 'New Projects', href: '/projects' },
  { label: 'Developers Hub', href: '/developer-hub' },
  { label: 'Verified Brokers', href: '/broker-hub' },
  { label: 'Subscription Plans', href: '/subscriptions' },
  { label: 'My Subscription', href: '/account/subscription' },
  { label: 'My Payments', href: '/account/payments' },
  { label: 'Settings', href: '/account/settings' },
];

export function Header() {
  const [isDark, setIsDark] = useState(false);
  const [isLanguageOpen, setIsLanguageOpen] = useState(false);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState<string | null>(null);

  const toggleTheme = () => setIsDark(!isDark);

  const handleLanguageSelect = (code: string | null) => {
    setSelectedLanguage(code);
    setIsLanguageOpen(false);
  };

  return (
    <>
      <header className="sticky top-0 z-40 bg-white border-b border-gray-200 shadow-sm">
        <div className="flex items-center justify-between px-4 lg:px-6 h-14 lg:h-16">
          {/* Logo */}
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 lg:w-10 lg:h-10 rounded-xl bg-[#0B8F55] flex items-center justify-center">
              <House className="text-white" size={18} strokeWidth={2.5} />
            </div>
            <div className="hidden sm:block">
              <h1 className="text-base lg:text-lg font-black text-gray-900 leading-tight">
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
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
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
                  <div className="absolute right-0 top-12 w-56 bg-white rounded-2xl shadow-xl border border-gray-200 p-3 z-50">
                    <p className="text-xs font-bold text-gray-500 uppercase tracking-wide px-3 pb-2">
                      App Language
                    </p>
                    <div className="space-y-2">
                      {languages.map((lang) => (
                        <button
                          key={lang.code ?? 'system'}
                          onClick={() => handleLanguageSelect(lang.code)}
                          className={`
                            w-full text-left px-3 py-2.5 rounded-xl text-sm font-semibold
                            transition-colors border
                            ${selectedLanguage === lang.code
                              ? 'bg-[#ECFDF5] border-[#0B8F55] text-[#0A7A4A]'
                              : 'bg-white border-gray-200 text-gray-700 hover:bg-gray-50'
                            }
                          `}
                        >
                          {lang.label}
                        </button>
                      ))}
                    </div>
                  </div>
                </>
              )}
            </div>

            {/* Theme Toggle */}
            <button
              onClick={toggleTheme}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
            >
              {isDark ? (
                <Sun className="text-gray-700" size={20} strokeWidth={2} />
              ) : (
                <Moon className="text-gray-700" size={20} strokeWidth={2} />
              )}
            </button>

            {/* Notifications */}
            <button
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors relative"
              aria-label="Notifications"
            >
              <Bell className="text-gray-700" size={20} strokeWidth={2} />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full" />
            </button>

            {/* Menu Button */}
            <button
              onClick={() => setIsDrawerOpen(true)}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              aria-label="Open menu"
            >
              <Menu className="text-gray-700" size={20} strokeWidth={2} />
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
          <div className="fixed top-0 right-0 bottom-0 w-72 bg-white shadow-2xl z-50 transform transition-transform">
            <div className="flex flex-col h-full">
              {/* Drawer Header */}
              <div className="flex items-center justify-between p-5 border-b border-gray-200">
                <h2 className="text-xl font-bold text-gray-900">Menu</h2>
                <button
                  onClick={() => setIsDrawerOpen(false)}
                  className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  <X size={20} className="text-gray-700" />
                </button>
              </div>

              {/* Drawer Content */}
              <div className="flex-1 overflow-y-auto py-2">
                {drawerMenuItems.map((item, index) => (
                  <a
                    key={index}
                    href={item.href}
                    onClick={() => setIsDrawerOpen(false)}
                    className="flex items-center justify-between px-5 py-3.5 hover:bg-gray-50 transition-colors"
                  >
                    <span className="text-base font-medium text-gray-900">
                      {item.label}
                    </span>
                    <ChevronRight size={16} className="text-gray-400" strokeWidth={2} />
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
