import React from 'react';

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="fixed inset-0 z-50 bg-white dark:bg-gray-900 overflow-auto">
      {children}
    </div>
  );
}
