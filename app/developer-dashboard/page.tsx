'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import {
  Building2,
  CalendarDays,
  CheckCircle2,
  ChevronLeft,
  CirclePlus,
  MapPin,
  Phone,
} from 'lucide-react';
import { useTheme } from '@/lib/theme/theme-provider';

const tabs = ['Projects', 'Leads', 'Campaigns'] as const;
type TabKey = typeof tabs[number];

const projects = [
  {
    id: '1',
    name: 'Sunrise Residences',
    location: 'Bole',
    units: 48,
    sold: 12,
    completion: 'Dec 2026',
    soldPct: 25,
    remaining: 36,
    price: 'From ETB 2.8M',
    status: 'Active' as const,
  },
  {
    id: '2',
    name: 'Capital Towers',
    location: 'Kazanchis',
    units: 120,
    sold: 45,
    completion: 'Mar 2027',
    soldPct: 38,
    remaining: 75,
    price: 'From ETB 5.5M',
    status: 'Active' as const,
  },
];

const leads = [
  { id: '1', name: 'Abebe M.', project: '2BR Sunrise Residences', time: '2h ago', status: 'New' as const },
  { id: '2', name: 'Sara T.', project: '3BR Capital Towers', time: '5h ago', status: 'Contacted' as const },
  { id: '3', name: 'Yared G.', project: 'Studio Sunrise Residences', time: '1d ago', status: 'New' as const },
];

const campaigns = [
  { id: '1', emoji: '⭐', title: 'Featured Project', subtitle: 'Top placement in search', price: 'ETB 2,500/wk' },
  { id: '2', emoji: '📣', title: 'Homepage Banner', subtitle: 'Hero section for 1 week', price: 'ETB 5,000/wk' },
  { id: '3', emoji: '✉️', title: 'Email Campaign', subtitle: '10K targeted buyers', price: 'ETB 1,500' },
  { id: '4', emoji: '📱', title: 'SMS Blast', subtitle: 'Reach 5K subscribers', price: 'ETB 800' },
];

export default function DeveloperDashboardPage() {
  const router = useRouter();
  const { colors, isDark } = useTheme();
  const [selectedTab, setSelectedTab] = useState<TabKey>('Projects');

  const accent = isDark ? '#C2410C' : '#EA580C';

  return (
    <div className="min-h-screen" style={{ backgroundColor: colors.background }}>
      {/* Top Bar */}
      <div
        className="sticky top-14 lg:top-16 z-10 px-4 lg:px-6 py-4 flex items-center gap-3 border-b"
        style={{ backgroundColor: colors.background, borderColor: colors.border }}
      >
        <button
          onClick={() => router.back()}
          className="w-9 h-9 rounded-xl flex items-center justify-center transition-colors"
          style={{ backgroundColor: colors.surface }}
          onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = colors.iconButtonBackground)}
          onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = colors.surface)}
        >
          <ChevronLeft size={20} style={{ color: colors.text }} />
        </button>
        <h1 className="text-lg font-black" style={{ color: colors.text }}>
          Developer Hub
        </h1>
      </div>

      <div className="max-w-5xl mx-auto px-4 lg:px-8 pt-20 lg:pt-24 pb-32 space-y-6">
        {/* Profile Card */}
        <div
          className="relative rounded-3xl p-6 lg:p-8 overflow-hidden"
          style={{ backgroundColor: accent }}
        >
          <div
            className="absolute right-[-24px] top-[-24px] w-[100px] h-[100px] rounded-full"
            style={{ backgroundColor: 'rgba(255,255,255,0.15)' }}
          />
          <div className="relative flex items-center gap-4 lg:gap-6">
            <div className="w-14 h-14 lg:w-16 lg:h-16 rounded-2xl bg-white flex items-center justify-center flex-shrink-0">
              <span className="text-lg lg:text-xl font-black" style={{ color: accent }}>
                DE
              </span>
            </div>
            <div className="flex-1">
              <div className="flex items-center gap-2">
                <h2 className="text-base lg:text-lg font-black text-white">
                  Developer Profile
                </h2>
                <CheckCircle2 size={16} className="text-white/90" />
              </div>
              <p className="text-xs lg:text-sm font-semibold text-white/85 mt-1">
                2 Active Projects · 57 Leads Total
              </p>
            </div>
          </div>
        </div>

        {/* Stats Row */}
        <div className="grid grid-cols-4 gap-3">
          {[
            { value: '168', label: 'Units', color: accent },
            { value: '57', label: 'Leads', color: '#2563EB' },
            { value: '3', label: 'New Leads', color: '#DC2626' },
            { value: '37%', label: 'Sold', color: '#16A34A' },
          ].map((s) => (
            <div
              key={s.label}
              className="rounded-2xl p-4 border text-center"
              style={{
                backgroundColor: colors.surface,
                borderColor: colors.border,
              }}
            >
              <p className="text-xl font-black" style={{ color: s.color }}>
                {s.value}
              </p>
              <p className="text-xs font-semibold mt-1" style={{ color: colors.textMuted }}>
                {s.label}
              </p>
            </div>
          ))}
        </div>

        {/* Tabs */}
        <div className="flex gap-2">
          {tabs.map((tab) => {
            const isSelected = tab === selectedTab;
            return (
              <button
                key={tab}
                onClick={() => setSelectedTab(tab)}
                className={`flex-1 min-h-[40px] rounded-xl font-black text-sm transition-all ${
                  isSelected ? '' : 'border'
                }`}
                style={{
                  backgroundColor: isSelected ? accent : colors.surface,
                  borderColor: isSelected ? 'transparent' : colors.border,
                  color: isSelected ? '#FFFFFF' : colors.textMuted,
                }}
              >
                {tab}
              </button>
            );
          })}
        </div>

        {/* Projects Tab */}
        {selectedTab === 'Projects' && (
          <div className="space-y-4">
            <button
              onClick={() => router.push('/property/post')}
              className="w-full min-h-[50px] rounded-2xl flex items-center justify-center gap-2 transition-opacity hover:opacity-90"
              style={{ backgroundColor: accent }}
            >
              <CirclePlus size={18} className="text-white" />
              <span className="text-sm font-black text-white">Add New Project</span>
            </button>

            {projects.map((p) => (
              <div
                key={p.id}
                className="rounded-3xl p-5 border space-y-3"
                style={{
                  backgroundColor: colors.surface,
                  borderColor: colors.border,
                }}
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <h3 className="text-base font-black" style={{ color: colors.text }}>
                      {p.name}
                    </h3>
                    <div className="flex items-center gap-1.5 mt-1">
                      <MapPin size={12} className="text-green-600" />
                      <span className="text-xs font-semibold" style={{ color: colors.textMuted }}>
                        {p.location}
                      </span>
                    </div>
                  </div>
                  <div className="bg-green-100 dark:bg-green-900/30 px-3 py-1.5 rounded-full">
                    <span className="text-xs font-black text-green-600">{p.status}</span>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-1.5">
                    <Building2 size={12} style={{ color: colors.textMuted }} />
                    <span className="text-xs font-semibold" style={{ color: colors.textMuted }}>
                      {p.units} units
                    </span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <CheckCircle2 size={12} className="text-green-600" />
                    <span className="text-xs font-semibold" style={{ color: colors.textMuted }}>
                      {p.sold} sold
                    </span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <CalendarDays size={12} className="text-purple-600" />
                    <span className="text-xs font-semibold" style={{ color: colors.textMuted }}>
                      {p.completion}
                    </span>
                  </div>
                </div>

                <div>
                  <div className="flex justify-between text-xs font-semibold mb-2" style={{ color: colors.textMuted }}>
                    <span>{p.soldPct}% sold</span>
                    <span>{p.remaining} remaining</span>
                  </div>
                  <div
                    className="h-1.5 rounded-full overflow-hidden"
                    style={{ backgroundColor: isDark ? colors.surfaceMuted : '#E5E7EB' }}
                  >
                    <div
                      className="h-full bg-green-600 rounded-full"
                      style={{ width: `${p.soldPct}%` }}
                    />
                  </div>
                </div>

                <p className="text-sm font-black text-green-600">{p.price}</p>
              </div>
            ))}
          </div>
        )}

        {/* Leads Tab */}
        {selectedTab === 'Leads' && (
          <div className="space-y-4">
            <div className="bg-rose-50 dark:bg-rose-900/20 rounded-2xl p-4 flex items-center gap-3">
              <span className="text-lg">🔔</span>
              <div>
                <h3 className="text-sm font-black text-rose-900 dark:text-rose-400">
                  3 New Leads Today!
                </h3>
                <p className="text-xs font-semibold text-rose-600 dark:text-rose-500 mt-0.5">
                  Interested buyers from Addis Ababa
                </p>
              </div>
            </div>

            {leads.map((lead) => (
              <div
                key={lead.id}
                className="rounded-2xl p-4 border"
                style={{
                  backgroundColor: colors.surface,
                  borderColor: colors.border,
                }}
              >
                <div className="flex items-start gap-3">
                  <div
                    className="w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0"
                    style={{ backgroundColor: accent }}
                  >
                    <span className="text-base font-black text-white">
                      {lead.name.charAt(0)}
                    </span>
                  </div>
                  <div className="flex-1">
                    <h3 className="text-sm font-black" style={{ color: colors.text }}>
                      {lead.name}
                    </h3>
                    <p className="text-xs font-semibold mt-0.5" style={{ color: colors.textMuted }}>
                      {lead.project}
                    </p>
                    <p className="text-xs font-semibold mt-0.5" style={{ color: colors.textMuted }}>
                      {lead.time}
                    </p>
                  </div>
                  <div className="text-right space-y-2">
                    {lead.status === 'New' && (
                      <div className="bg-rose-100 dark:bg-rose-900/30 px-3 py-1 rounded-full">
                        <span className="text-xs font-black text-rose-600">New</span>
                      </div>
                    )}
                    <button className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-green-600 hover:bg-green-700 transition-colors">
                      <Phone size={13} className="text-white" />
                      <span className="text-xs font-black text-white">Call</span>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Campaigns Tab */}
        {selectedTab === 'Campaigns' && (
          <div className="space-y-4">
            <p className="text-sm font-semibold" style={{ color: colors.textMuted }}>
              Boost your project visibility to attract more buyers
            </p>
            {campaigns.map((c) => (
              <div
                key={c.id}
                className="rounded-2xl p-4 border flex items-center gap-3"
                style={{
                  backgroundColor: colors.surface,
                  borderColor: colors.border,
                }}
              >
                <span className="text-2xl">{c.emoji}</span>
                <div className="flex-1">
                  <h3 className="text-sm font-black" style={{ color: colors.text }}>
                    {c.title}
                  </h3>
                  <p className="text-xs font-semibold mt-0.5" style={{ color: colors.textMuted }}>
                    {c.subtitle}
                  </p>
                </div>
                <div className="text-right space-y-2">
                  <p className="text-sm font-black text-green-600">{c.price}</p>
                  <button
                    className="px-4 py-1.5 rounded-full transition-opacity hover:opacity-90"
                    style={{ backgroundColor: accent }}
                  >
                    <span className="text-xs font-black text-white">Activate</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
