'use client';

import { ReactNode } from 'react';
import { Sidebar } from './sidebar';
import { Header } from './header';
import { useTheme } from '@/lib/theme/theme-provider';

export function LayoutWrapper({ children }: { children: ReactNode }) {
  const { colors } = useTheme();

  return (
    <div 
      className="min-h-screen flex font-sans" 
      style={{ backgroundColor: colors.background }}
    >
      <Sidebar />
      <div className="flex-1 flex flex-col overflow-x-hidden">
        <Header />
        <main className="flex-1 overflow-y-auto pb-20 lg:pb-0">
          {children}
        </main>
      </div>
    </div>
  );
}
