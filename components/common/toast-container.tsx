'use client';

import { useEffect, useState } from 'react';
import { X, CheckCircle, XCircle, Info, AlertTriangle } from 'lucide-react';
import { useTheme } from '@/lib/theme/theme-provider';
import { useToastStore, type Toast, type ToastType } from '@/lib/store/toast-store';

function ToastItem({ toast }: { toast: Toast }) {
  const { colors } = useTheme();
  const [isVisible, setIsVisible] = useState(false);
  const removeToast = useToastStore((state) => state.removeToast);

  useEffect(() => {
    // Fade in
    setTimeout(() => setIsVisible(true), 10);
  }, []);

  const handleClose = () => {
    setIsVisible(false);
    setTimeout(() => removeToast(toast.id), 300);
  };

  const getToastConfig = (type: ToastType) => {
    switch (type) {
      case 'success':
        return {
          icon: CheckCircle,
          bgColor: '#10B981',
          iconColor: '#FFFFFF',
          role: 'status' as const,
          ariaLive: 'polite' as const,
        };
      case 'error':
        return {
          icon: XCircle,
          bgColor: '#EF4444',
          iconColor: '#FFFFFF',
          role: 'alert' as const,
          ariaLive: 'assertive' as const,
        };
      case 'warning':
        return {
          icon: AlertTriangle,
          bgColor: '#F59E0B',
          iconColor: '#FFFFFF',
          role: 'status' as const,
          ariaLive: 'polite' as const,
        };
      case 'info':
      default:
        return {
          icon: Info,
          bgColor: '#3B82F6',
          iconColor: '#FFFFFF',
          role: 'status' as const,
          ariaLive: 'polite' as const,
        };
    }
  };

  const config = getToastConfig(toast.type);
  const Icon = config.icon;

  return (
    <div
      role={config.role}
      aria-live={config.ariaLive}
      aria-atomic="true"
      className={`
        flex items-center gap-3 px-4 py-3 rounded-xl shadow-lg
        transition-all duration-300 ease-out
        ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-2'}
      `}
      style={{
        backgroundColor: config.bgColor,
        minWidth: '300px',
        maxWidth: '500px',
      }}
    >
      <Icon 
        size={20} 
        color={config.iconColor} 
        strokeWidth={2.5}
        aria-hidden="true"
      />
      
      <p 
        className="flex-1 text-sm font-bold text-white"
        style={{ lineHeight: '1.4' }}
      >
        {toast.message}
      </p>

      <button
        onClick={handleClose}
        aria-label="Close notification"
        className="flex-shrink-0 w-6 h-6 rounded-md flex items-center justify-center hover:bg-white/20 transition-colors"
      >
        <X size={16} color={config.iconColor} strokeWidth={2.5} aria-hidden="true" />
      </button>
    </div>
  );
}

export function ToastContainer() {
  const toasts = useToastStore((state) => state.toasts);

  if (toasts.length === 0) return null;

  return (
    <div
      className="fixed top-4 right-4 z-50 flex flex-col gap-2 pointer-events-none"
      aria-label="Notifications"
    >
      {toasts.map((toast) => (
        <div key={toast.id} className="pointer-events-auto">
          <ToastItem toast={toast} />
        </div>
      ))}
    </div>
  );
}
