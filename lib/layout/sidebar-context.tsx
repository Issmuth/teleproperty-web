'use client';

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

type SidebarContextType = {
  isCollapsed: boolean;
  toggleSidebar: () => void;
};

const SidebarContext = createContext<SidebarContextType | undefined>(undefined);

export function SidebarProvider({ children }: { children: ReactNode }) {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isClient, setIsClient] = useState(false);

  // Set isClient flag on mount
  useEffect(() => {
    setIsClient(true);
  }, []);

  // Load saved preference from localStorage (only on client)
  useEffect(() => {
    if (isClient && typeof window !== 'undefined') {
      try {
        const saved = localStorage.getItem('sidebar-collapsed');
        if (saved !== null) {
          setIsCollapsed(saved === 'true');
        }
      } catch (error) {
        console.error('Failed to load sidebar state:', error);
      }
    }
  }, [isClient]);

  const toggleSidebar = () => {
    setIsCollapsed((prev) => {
      const newValue = !prev;
      if (typeof window !== 'undefined') {
        try {
          localStorage.setItem('sidebar-collapsed', String(newValue));
        } catch (error) {
          console.error('Failed to save sidebar state:', error);
        }
      }
      return newValue;
    });
  };

  return (
    <SidebarContext.Provider value={{ isCollapsed, toggleSidebar }}>
      {children}
    </SidebarContext.Provider>
  );
}

export function useSidebar() {
  const context = useContext(SidebarContext);
  if (context === undefined) {
    throw new Error('useSidebar must be used within a SidebarProvider');
  }
  return context;
}
