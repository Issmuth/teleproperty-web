'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { ChevronRight, House, LayoutGrid, Sparkles, UserRound, ChevronLeft } from 'lucide-react';
import { useTheme } from '@/lib/theme/theme-provider';
import { useI18n } from '@/lib/i18n/i18n-provider';

type Role = 'owner' | 'broker-agent' | 'developer' | 'property-manager' | '';

export default function PostPropertyStep1() {
  const router = useRouter();
  const { colors } = useTheme();
  const [selectedRole, setSelectedRole] = useState<Role>('');

  const roleOptions = [
    {
      key: 'owner' as Role,
      label: 'Owner',
      subtitle: 'List my property',
      icon: House,
    },
    {
      key: 'broker-agent' as Role,
      label: 'Broker / Agent',
      subtitle: 'Represent buyers or sellers',
      icon: UserRound,
    },
    {
      key: 'developer' as Role,
      label: 'Developer',
      subtitle: 'List projects & units',
      icon: LayoutGrid,
    },
    {
      key: 'property-manager' as Role,
      label: 'Property Manager',
      subtitle: 'Manage rental properties',
      icon: Sparkles,
    },
  ];

  return (
    <div className="min-h-screen" style={{ backgroundColor: colors.background }}>
      {/* Back Button FAB */}
      <button
        onClick={() => router.back()}
        className="fixed left-4 lg:left-6 top-4 lg:top-6 z-50 w-9 h-9 lg:w-10 lg:h-10 rounded-full border flex items-center justify-center shadow-lg hover:opacity-80 transition-opacity"
        style={{ backgroundColor: colors.surface, borderColor: colors.border }}
      >
        <ChevronLeft size={20} style={{ color: colors.text }} />
      </button>

      {/* Header */}
      <div className="max-w-3xl mx-auto px-4 lg:px-8 pt-20 lg:pt-24 pb-6 space-y-4">
        {/* Progress Steps */}
        <div className="flex gap-2">
          {[1, 2, 3].map((step) => (
            <div
              key={step}
              className="flex-1 h-1.5 rounded-full"
              style={{
                backgroundColor: step === 1 ? colors.activeText : colors.surfaceMuted,
              }}
            />
          ))}
        </div>

        {/* Hero Card */}
        <div
          className="rounded-3xl p-5 lg:p-6 border shadow-sm space-y-4"
          style={{ backgroundColor: colors.surface, borderColor: colors.border }}
        >
          <div className="flex items-center justify-between">
            <div
              className="flex items-center gap-2 px-3 py-1.5 rounded-full"
              style={{ backgroundColor: colors.activeSurface }}
            >
              <Sparkles size={14} style={{ color: colors.activeText }} />
              <span className="text-xs font-black" style={{ color: colors.activeText }}>
                Listing Wizard
              </span>
            </div>
            <div
              className="px-3 py-1.5 rounded-full border"
              style={{ backgroundColor: colors.surfaceMuted, borderColor: colors.border }}
            >
              <span className="text-xs font-black" style={{ color: colors.textMuted }}>
                Step 1 of 3
              </span>
            </div>
          </div>

          <div>
            <h1 className="text-xl lg:text-2xl font-black mb-1" style={{ color: colors.text }}>
              I am posting as a...
            </h1>
            <p className="text-sm font-semibold" style={{ color: colors.textMuted }}>
              Select your role to continue
            </p>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-3xl mx-auto px-4 lg:px-8 pb-32">
        <div
          className="rounded-3xl p-4 lg:p-5 border"
          style={{ backgroundColor: colors.surface, borderColor: colors.border }}
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {roleOptions.map((option) => {
              const Icon = option.icon;
              const isSelected = selectedRole === option.key;
              return (
                <button
                  key={option.key}
                  onClick={() => setSelectedRole(option.key)}
                  className="flex items-start gap-3 p-4 rounded-2xl border-2 transition-all hover:opacity-80"
                  style={{
                    backgroundColor: isSelected ? colors.activeSurface : colors.background,
                    borderColor: isSelected ? colors.activeText : colors.border,
                  }}
                >
                  <div
                    className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
                    style={{
                      backgroundColor: isSelected ? colors.activeText : colors.surfaceMuted,
                    }}
                  >
                    <Icon size={18} color={isSelected ? '#FFFFFF' : colors.textMuted} />
                  </div>
                  <div className="flex-1 text-left">
                    <h3 className="text-sm font-black" style={{ color: colors.text }}>
                      {option.label}
                    </h3>
                    <p className="text-xs font-semibold mt-0.5" style={{ color: colors.textMuted }}>
                      {option.subtitle}
                    </p>
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="fixed bottom-0 left-0 right-0 p-4 lg:p-6" style={{ backgroundColor: colors.background }}>
        <div className="max-w-3xl mx-auto">
          <button
            onClick={() => selectedRole && router.push('/post-property/details')}
            disabled={!selectedRole}
            className={`w-full min-h-[48px] lg:min-h-[52px] rounded-2xl font-black text-sm lg:text-base flex items-center justify-center gap-2 transition-all ${
              !selectedRole ? 'opacity-50 cursor-not-allowed' : 'hover:opacity-90'
            }`}
            style={{
              backgroundColor: selectedRole ? colors.activeText : colors.surfaceMuted,
              color: '#FFFFFF',
            }}
          >
            <span>Continue</span>
            <ChevronRight size={16} />
          </button>
        </div>
      </div>
    </div>
  );
}
