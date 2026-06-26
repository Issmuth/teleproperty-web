'use client';

import { ReactNode } from 'react';
import { Sidebar } from './sidebar';
import { Header } from './header';
import { useTheme } from '@/lib/theme/theme-provider';
import { SidebarProvider } from '@/lib/layout/sidebar-context';

export function LayoutWrapper({ children }: { children: ReactNode }) {
  const { colors } = useTheme();

  return (
    <SidebarProvider>
      <div 
        className="min-h-screen flex font-sans" 
        style={{ backgroundColor: colors.background }}
      >
        <Sidebar />
        <div className="flex-1 flex flex-col overflow-x-hidden">
          <Header />
          <main 
            id="main-content" 
            className="flex-1 overflow-y-auto pb-20 lg:pb-0"
            role="main"
            aria-label="Main content"
          >
            {children}
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
}
