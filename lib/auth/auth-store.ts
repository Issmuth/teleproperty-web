'use client';

import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

export type AuthMethod = 'phone' | 'email';

export type AuthRole =
  | 'buyer'
  | 'owner'
  | 'agent'
  | 'broker'
  | 'developer'
  | 'hotel-partner';

export type AuthSession = {
  id: string;
  displayName: string;
  loginMethod: AuthMethod;
  phoneNumber?: string;
  email?: string;
  role?: AuthRole;
  faydaId?: string;
  verifiedAt: string;
};

export type AuthDraft = {
  fullName: string;
  phoneNumber: string;
  referralCode: string;
  otp: [string, string, string, string];
  role: AuthRole;
  faydaId: string;
  dateOfBirth: string;
  email: string;
  password: string;
  acceptedTerms: boolean;
};

type AuthState = {
  session: AuthSession | null;
  isHydrated: boolean;
  draft: AuthDraft;
  
  setSession: (session: AuthSession) => void;
  updateDraft: (patch: Partial<AuthDraft>) => void;
  resetDraft: () => void;
  completeAuth: () => Promise<void>;
  signOut: () => Promise<void>;
  _setHydrated: (hydrated: boolean) => void;
};

const defaultDraft: AuthDraft = {
  fullName: '',
  phoneNumber: '',
  referralCode: '',
  otp: ['', '', '', ''],
  role: 'buyer',
  faydaId: '',
  dateOfBirth: '',
  email: '',
  password: '',
  acceptedTerms: false,
};

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      session: null,
      isHydrated: false,
      draft: defaultDraft,

      setSession: (session) => {
        set({ session });
      },

      updateDraft: (patch) => {
        set((state) => ({
          draft: { ...state.draft, ...patch },
        }));
      },

      resetDraft: () => {
        set({ draft: defaultDraft });
      },

      completeAuth: async () => {
        const { draft } = get();
        
        const nextSession: AuthSession = {
          id: `session-${Date.now()}`,
          displayName: draft.fullName.trim() || 'TeleProperty User',
          loginMethod: 'phone',
          phoneNumber: draft.phoneNumber.trim() || undefined,
          email: draft.email.trim() || undefined,
          role: draft.role,
          faydaId: draft.faydaId.trim() || undefined,
          verifiedAt: new Date().toISOString(),
        };

        set({
          session: nextSession,
          draft: defaultDraft,
        });
      },

      signOut: async () => {
        set({
          session: null,
          draft: defaultDraft,
        });
      },

      _setHydrated: (hydrated) => {
        set({ isHydrated: hydrated });
      },
    }),
    {
      name: 'auth-storage',
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({
        session: state.session,
      }),
      onRehydrateStorage: () => (state) => {
        state?._setHydrated(true);
      },
    }
  )
);

export const useAuth = () => {
  const session = useAuthStore((state) => state.session);
  const isHydrated = useAuthStore((state) => state.isHydrated);
  const draft = useAuthStore((state) => state.draft);
  const updateDraft = useAuthStore((state) => state.updateDraft);
  const resetDraft = useAuthStore((state) => state.resetDraft);
  const completeAuth = useAuthStore((state) => state.completeAuth);
  const signOut = useAuthStore((state) => state.signOut);

  const isAuthenticated = Boolean(session);
  const isAdmin = session?.role === 'developer' || session?.role === 'owner';

  return {
    session,
    isHydrated,
    isAuthenticated,
    isAdmin,
    draft,
    updateDraft,
    resetDraft,
    completeAuth,
    signOut,
  };
};
