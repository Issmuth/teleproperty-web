'use client';

import { useEffect, useMemo } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import {
  Briefcase,
  Building2,
  Home,
  Hotel,
  SquareUser,
  UserRound,
  type LucideIcon,
} from 'lucide-react';
import { AuthShell } from '@/components/auth/auth-shell';
import { AuthStepper } from '@/components/auth/auth-stepper';
import { useAuth, type AuthRole } from '@/lib/auth/auth-store';

type RoleCard = {
  role: AuthRole;
  title: string;
  subtitle: string;
  icon: LucideIcon;
};

const roleCards: RoleCard[] = [
  {
    role: 'buyer',
    title: 'Buyer / Seeker',
    subtitle: 'Looking to buy or rent',
    icon: Home,
  },
  {
    role: 'owner',
    title: 'Owner',
    subtitle: 'List my property',
    icon: Building2,
  },
  {
    role: 'agent',
    title: 'Agent',
    subtitle: 'Find & connect clients',
    icon: UserRound,
  },
  {
    role: 'broker',
    title: 'Broker',
    subtitle: 'Manage listings & leads',
    icon: Briefcase,
  },
  {
    role: 'developer',
    title: 'Developer',
    subtitle: 'Manage projects & units',
    icon: SquareUser,
  },
  {
    role: 'hotel-partner',
    title: 'Hotel Partner',
    subtitle: 'List my hotel / guesthouse',
    icon: Hotel,
  },
];

export default function RoleAuthPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { draft, updateDraft, completeAuth } = useAuth();
  
  const redirectTo = searchParams.get('redirectTo') || '/';

  useEffect(() => {
    if (!draft.phoneNumber || !draft.fullName) {
      router.replace(`/auth/phone?redirectTo=${encodeURIComponent(redirectTo)}`);
    }
  }, [draft.fullName, draft.phoneNumber, redirectTo, router]);

  const canContinue = useMemo(() => Boolean(draft.role), [draft.role]);
  const selectedRole = roleCards.find((r) => r.role === draft.role);

  const handleContinue = async () => {
    await completeAuth();
    router.replace(redirectTo);
  };

  return (
    <AuthShell
      title="TeleProperty"
      subtitle="Ethiopia's #1 Property Platform"
      onBackPress={() => router.back()}
      onClosePress={() => router.replace('/')}
    >
      <div className="space-y-5 px-2 lg:px-0">
        <AuthStepper currentStep={3} steps={3} />

        <div className="space-y-1 mt-2 md:mt-4 lg:mt-0">
          <h2 className="text-xl md:text-2xl lg:text-3xl font-black text-gray-900 dark:text-white">
            I am a...
          </h2>
          <p className="text-sm md:text-base font-semibold text-gray-600 dark:text-gray-400">
            Select your role to personalize your experience
          </p>
        </div>

        {/* Role Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-2.5 md:gap-3 lg:gap-4 mt-4">
          {roleCards.map((item) => {
            const Icon = item.icon;
            const isSelected = draft.role === item.role;

            return (
              <button
                key={item.role}
                onClick={() => updateDraft({ role: item.role })}
                className={`min-h-[98px] md:min-h-[110px] lg:min-h-[115px] rounded-2xl md:rounded-3xl border p-3 md:p-4 flex flex-col gap-2 transition-all hover:scale-[1.02] ${
                  isSelected
                    ? 'bg-green-50 dark:bg-green-900/20 border-green-600 dark:border-green-500'
                    : 'bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-700 hover:border-gray-400 dark:hover:border-gray-600'
                }`}
              >
                <div
                  className={`w-[34px] h-[34px] md:w-[40px] md:h-[40px] rounded-xl md:rounded-2xl flex items-center justify-center ${
                    isSelected
                      ? 'bg-white dark:bg-gray-800'
                      : 'bg-gray-100 dark:bg-gray-700'
                  }`}
                >
                  <Icon
                    size={18}
                    className={`md:w-5 md:h-5 ${
                      isSelected
                        ? 'text-green-600 dark:text-green-500'
                        : 'text-gray-400 dark:text-gray-500'
                    }`}
                    strokeWidth={2.1}
                  />
                </div>
                <div className="flex-1 text-left">
                  <h3 className="text-sm md:text-base font-black text-gray-900 dark:text-white leading-tight">
                    {item.title}
                  </h3>
                  <p className="text-xs md:text-sm font-semibold text-gray-600 dark:text-gray-400 leading-snug mt-0.5">
                    {item.subtitle}
                  </p>
                </div>
              </button>
            );
          })}
        </div>

        {/* Continue Button */}
        <button
          onClick={handleContinue}
          disabled={!canContinue}
          className={`w-full min-h-[48px] md:min-h-[52px] rounded-2xl md:rounded-3xl font-black text-[15px] md:text-base shadow-lg transition-all mt-6 ${
            canContinue
              ? 'bg-[#22C55E] hover:bg-[#1EA952] text-white'
              : 'bg-gray-200 dark:bg-gray-800 text-gray-400 dark:text-gray-500 cursor-not-allowed'
          }`}
        >
          {selectedRole
            ? `Continue as ${selectedRole.title}`
            : 'Select a role'}
        </button>
      </div>
    </AuthShell>
  );
}
