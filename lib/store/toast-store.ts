import { create } from 'zustand';

export type ToastType = 'success' | 'error' | 'info' | 'warning';

export type Toast = {
  id: string;
  message: string;
  type: ToastType;
  duration: number;
};

type ToastState = {
  toasts: Toast[];
  addToast: (message: string, type?: ToastType, duration?: number) => void;
  removeToast: (id: string) => void;
  clearAllToasts: () => void;
};

export const useToastStore = create<ToastState>((set) => ({
  toasts: [],
  
  addToast: (message: string, type: ToastType = 'info', duration: number = 4000) => {
    const id = `toast-${Date.now()}-${Math.random()}`;
    const toast: Toast = { id, message, type, duration };
    
    set((state) => ({
      toasts: [...state.toasts, toast],
    }));

    // Auto-remove toast after duration
    if (duration > 0) {
      setTimeout(() => {
        set((state) => ({
          toasts: state.toasts.filter((t) => t.id !== id),
        }));
      }, duration);
    }
  },

  removeToast: (id: string) => {
    set((state) => ({
      toasts: state.toasts.filter((t) => t.id !== id),
    }));
  },

  clearAllToasts: () => {
    set({ toasts: [] });
  },
}));

// Convenience methods
export const toast = {
  success: (message: string, duration?: number) => 
    useToastStore.getState().addToast(message, 'success', duration),
  
  error: (message: string, duration?: number) => 
    useToastStore.getState().addToast(message, 'error', duration),
  
  info: (message: string, duration?: number) => 
    useToastStore.getState().addToast(message, 'info', duration),
  
  warning: (message: string, duration?: number) => 
    useToastStore.getState().addToast(message, 'warning', duration),
};
