'use client';

import { useRouter } from 'next/navigation';
import { Shield, CheckCircle2, RefreshCw, ArrowLeft } from 'lucide-react';
import { useTheme } from '@/lib/theme/theme-provider';
import { useI18n } from '@/lib/i18n/i18n-provider';

const activePlan = {
  name: "Professional Broker Plan",
  price: "ETB 1,500",
  cardBg: "#16A34A",
  leads: "60",
  listings: "30",
  featured: "✓",
  features: [
    "60 verified leads/month",
    "30 active property listings",
    "Featured broker badge ✓",
    "WhatsApp + Phone + Email leads",
    "Priority search placement",
    "Advanced analytics dashboard",
    "Verified broker profile",
    "Call center support",
  ],
};

export default function MySubscriptionPage() {
  const router = useRouter();
  const { colors } = useTheme();
  const { t } = useI18n();

  const today = new Date();
  const nextBilling = new Date(today);
  nextBilling.setMonth(nextBilling.getMonth() + 1);
  const fmt = (d: Date) => `${d.getMonth() + 1}/${d.getDate()}/${d.getFullYear()}`;

  return (
    <div className="min-h-screen" style={{ backgroundColor: colors.background }}>
      {/* Top Bar */}
      <div 
        className="sticky top-14 lg:top-16 z-10 px-4 lg:px-8 py-3 lg:py-4 flex items-center gap-3 border-b"
        style={{ backgroundColor: colors.background, borderColor: colors.border }}
      >
        <button
          onClick={() => router.back()}
          className="w-9 h-9 lg:w-10 lg:h-10 rounded-xl flex items-center justify-center hover:opacity-80 transition-opacity"
          style={{ backgroundColor: colors.surface }}
        >
          <ArrowLeft size={20} style={{ color: colors.text }} />
        </button>
        <h1 className="text-lg lg:text-xl font-black" style={{ color: colors.text }}>
          My Subscription
        </h1>
      </div>

      <div className="max-w-3xl mx-auto px-4 lg:px-8 pt-20 lg:pt-24 pb-32 space-y-4 lg:space-y-5">
        <div>
          <h2 className="text-2xl lg:text-3xl font-black" style={{ color: colors.text }}>
            My Subscription
          </h2>
          <p className="text-sm lg:text-base font-semibold mt-1" style={{ color: colors.textMuted }}>
            Your active broker plan
          </p>
        </div>

        {/* Status Banner */}
        <div className="bg-[#16A34A] rounded-2xl lg:rounded-3xl p-4 lg:p-5 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3 flex-1">
            <Shield size={18} color="#FFFFFF" className="flex-shrink-0" />
            <div>
              <p className="text-sm lg:text-base font-black text-white">Subscription Active</p>
              <p className="text-xs lg:text-sm font-semibold text-white/85 mt-0.5">
                {activePlan.name} · Auto-renews monthly
              </p>
            </div>
          </div>
          <CheckCircle2 size={22} color="#FFFFFF" className="flex-shrink-0" />
        </div>

        {/* Plan Card */}
        <div 
          className="rounded-2xl lg:rounded-3xl p-5 lg:p-6 space-y-4"
          style={{ backgroundColor: activePlan.cardBg }}
        >
          <div className="flex items-start justify-between">
            <div>
              <h3 className="text-base lg:text-lg font-black text-white">{activePlan.name}</h3>
              <p className="text-sm lg:text-base font-semibold text-white/85 mt-1">
                {activePlan.price}/month
              </p>
            </div>
            <CheckCircle2 size={24} color="rgba(255,255,255,0.9)" />
          </div>
          <div className="grid grid-cols-3 gap-2">
            {[
              { val: activePlan.leads, label: "Leads/mo" },
              { val: activePlan.listings, label: "Listings" },
              { val: activePlan.featured, label: "Featured" },
            ].map((s) => (
              <div key={s.label} className="text-center">
                <p className="text-xl lg:text-2xl font-black text-white">{s.val}</p>
                <p className="text-xs font-semibold text-white/70 mt-1">{s.label}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Billing Details */}
        <div
          className="border rounded-2xl lg:rounded-3xl p-4 lg:p-5 space-y-4"
          style={{ backgroundColor: colors.surface, borderColor: colors.border }}
        >
          {[
            { label: "Monthly price", value: activePlan.price, bold: true },
            { label: "Start date", value: fmt(today), bold: true },
            { label: "Next billing", value: fmt(nextBilling), bold: true },
            { label: "Auto-renew", isToggle: true },
          ].map((row) => (
            <div key={row.label} className="flex items-center justify-between">
              <span className="text-sm lg:text-base font-semibold" style={{ color: colors.textMuted }}>
                {row.label}
              </span>
              {row.isToggle ? (
                <div className="flex items-center gap-1.5 bg-indigo-50 dark:bg-indigo-900/20 rounded-lg px-2.5 py-1.5">
                  <RefreshCw size={11} color="#6366F1" />
                  <span className="text-xs font-black text-indigo-600 dark:text-indigo-400">ON</span>
                </div>
              ) : (
                <span
                  className={`text-sm lg:text-base ${row.bold ? 'font-black' : 'font-bold'}`}
                  style={{ color: colors.text }}
                >
                  {row.value}
                </span>
              )}
            </div>
          ))}
        </div>

        {/* Unlocked Features */}
        <div
          className="rounded-2xl lg:rounded-3xl p-4 lg:p-5 space-y-3"
          style={{ backgroundColor: colors.surfaceMuted }}
        >
          <div className="flex items-center gap-2">
            <Shield size={16} color="#16A34A" />
            <h3 className="text-sm lg:text-base font-black text-green-700 dark:text-green-400">
              Unlocked Features
            </h3>
          </div>
          {activePlan.features.map((f) => (
            <div key={f} className="flex items-start gap-2.5">
              <CheckCircle2 size={14} color="#16A34A" className="mt-0.5 flex-shrink-0" />
              <span className="text-sm lg:text-base font-semibold text-green-800 dark:text-green-300">
                {f}
              </span>
            </div>
          ))}
        </div>

        <button
          onClick={() => router.push('/account/subscriptions')}
          className="w-full bg-[#16A34A] text-white font-black rounded-2xl min-h-[52px] lg:min-h-[56px] hover:bg-[#15803D] transition-colors text-sm lg:text-base"
        >
          Upgrade Plan
        </button>

        <button
          onClick={() => router.back()}
          className="w-full py-3 text-center"
        >
          <span className="text-sm lg:text-base font-bold" style={{ color: colors.textMuted }}>
            Back to Account
          </span>
        </button>
      </div>
    </div>
  );
}
