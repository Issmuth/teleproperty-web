'use client';

import { useRouter } from 'next/navigation';
import { ArrowLeft, PhoneCall, Clock, X, CirclePlus, Building2, Briefcase, Wrench, Hotel } from 'lucide-react';
import { useState } from 'react';
import { useTheme } from '@/lib/theme/theme-provider';
import { useI18n } from '@/lib/i18n/i18n-provider';

type Category = 'inquiry' | 'broker' | 'service' | 'hotel';
type Status = 'pending' | 'called' | 'closed';

interface Callback {
  id: string;
  type: Category;
  title: string;
  subtitle?: string;
  when: string;
  status: Status;
  phone: string;
}

const categoryOptions = [
  { id: 'inquiry' as Category, label: 'Property Inquiry', Icon: Building2 },
  { id: 'broker' as Category, label: 'Broker Callback', Icon: Briefcase },
  { id: 'service' as Category, label: 'Home Service', Icon: Wrench },
  { id: 'hotel' as Category, label: 'Hotel Booking', Icon: Hotel },
];

const sampleCallbacks: Callback[] = [
  {
    id: 'cb1',
    type: 'inquiry',
    title: 'Property Inquiry - 3BR Apartment',
    subtitle: 'Bole, Addis Ababa',
    when: 'Today 9:15 AM',
    status: 'pending',
    phone: '+251 911 234 567',
  },
  {
    id: 'cb2',
    type: 'broker',
    title: 'Broker Callback Request',
    subtitle: 'Commercial Property Listing',
    when: 'Today 11:00 AM',
    status: 'pending',
    phone: '+251 922 345 678',
  },
  {
    id: 'cb3',
    type: 'service',
    title: 'Home Cleaning Service',
    subtitle: 'Kazanchis Area',
    when: 'Yesterday',
    status: 'called',
    phone: '+251 933 456 789',
  },
];

export default function CallbacksPage() {
  const router = useRouter();
  const { colors } = useTheme();
  const { t } = useI18n();
  const [showForm, setShowForm] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<Category>('inquiry');
  const [details, setDetails] = useState('');
  const [phone, setPhone] = useState('');

  function getStatusBadge(status: Status) {
    const configs = {
      pending: { bg: 'rgba(245,158,11,0.16)', color: '#D97706', label: 'Pending' },
      called: { bg: 'rgba(34,197,94,0.16)', color: '#16A34A', label: 'Called' },
      closed: { bg: colors.surfaceMuted, color: colors.textMuted, label: 'Closed' },
    };
    return configs[status];
  }

  function getCategoryIcon(type: Category) {
    const option = categoryOptions.find((c) => c.id === type);
    return option?.Icon || Building2;
  }

  return (
    <div className="min-h-screen" style={{ backgroundColor: colors.background }}>
      {/* Header */}
      <div
        className="sticky top-14 lg:top-16 z-10 px-4 lg:px-8 py-3 lg:py-4 flex items-center justify-between gap-3 border-b"
        style={{ backgroundColor: colors.background, borderColor: colors.border }}
      >
        <div className="flex items-center gap-3">
          <button
            onClick={() => router.back()}
            className="w-9 h-9 lg:w-10 lg:h-10 rounded-xl flex items-center justify-center hover:opacity-80 transition-opacity"
            style={{ backgroundColor: colors.surface }}
          >
            <ArrowLeft size={20} style={{ color: colors.text }} />
          </button>
          <h1 className="text-lg lg:text-xl font-black" style={{ color: colors.text }}>
            Callback Requests
          </h1>
        </div>
        <button
          onClick={() => setShowForm(!showForm)}
          className="bg-[#16A34A] text-white font-black px-3 lg:px-4 py-2 rounded-xl hover:bg-[#15803D] transition-colors text-sm flex items-center gap-2"
        >
          <CirclePlus size={16} />
          <span className="hidden sm:inline">Request</span>
        </button>
      </div>

      <div className="max-w-4xl mx-auto px-4 lg:px-8 pt-20 lg:pt-24 pb-32 space-y-4">
        {/* Request Form */}
        {showForm && (
          <div
            className="border rounded-2xl lg:rounded-3xl p-4 lg:p-6 space-y-4"
            style={{ backgroundColor: colors.surface, borderColor: colors.border }}
          >
            <div className="flex items-center justify-between">
              <h2 className="text-base lg:text-lg font-black" style={{ color: colors.text }}>
                New Callback Request
              </h2>
              <button onClick={() => setShowForm(false)}>
                <X size={20} style={{ color: colors.textMuted }} />
              </button>
            </div>

            <div>
              <label className="block text-sm font-black mb-2" style={{ color: colors.text }}>
                Category
              </label>
              <div className="grid grid-cols-2 gap-3">
                {categoryOptions.map((cat) => {
                  const Icon = cat.Icon;
                  const isSelected = selectedCategory === cat.id;
                  return (
                    <button
                      key={cat.id}
                      onClick={() => setSelectedCategory(cat.id)}
                      className="flex items-center gap-2 px-3 py-2.5 rounded-xl border transition-all"
                      style={{
                        borderColor: isSelected ? '#16A34A' : colors.border,
                        backgroundColor: isSelected ? '#16A34A' : colors.background,
                      }}
                    >
                      <Icon size={16} color={isSelected ? '#FFFFFF' : colors.textMuted} />
                      <span
                        className="text-sm font-bold"
                        style={{ color: isSelected ? '#FFFFFF' : colors.text }}
                      >
                        {cat.label}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            <div>
              <label className="block text-sm font-black mb-2" style={{ color: colors.text }}>
                Details (optional)
              </label>
              <input
                type="text"
                value={details}
                onChange={(e) => setDetails(e.target.value)}
                placeholder="e.g. 3BR Villa in Bole"
                className="w-full px-4 py-3 rounded-xl border text-sm font-semibold"
                style={{
                  borderColor: colors.border,
                  backgroundColor: colors.background,
                  color: colors.text,
                }}
              />
            </div>

            <div>
              <label className="block text-sm font-black mb-2" style={{ color: colors.text }}>
                Your Phone Number
              </label>
              <input
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="+251 9X XXX XXXX"
                className="w-full px-4 py-3 rounded-xl border text-sm font-semibold"
                style={{
                  borderColor: colors.border,
                  backgroundColor: colors.background,
                  color: colors.text,
                }}
              />
            </div>

            <button
              onClick={() => setShowForm(false)}
              className="w-full bg-[#16A34A] text-white font-black rounded-xl py-3 hover:bg-[#15803D] transition-colors"
            >
              Submit Callback Request
            </button>
          </div>
        )}

        {/* Callbacks List */}
        {sampleCallbacks.map((callback) => {
          const Icon = getCategoryIcon(callback.type);
          const badge = getStatusBadge(callback.status);

          return (
            <div
              key={callback.id}
              className="border rounded-2xl lg:rounded-3xl p-4 lg:p-5 space-y-4"
              style={{ backgroundColor: colors.surface, borderColor: colors.border }}
            >
              <div className="flex items-start gap-4">
                <div
                  className="w-11 h-11 lg:w-12 lg:h-12 rounded-xl flex items-center justify-center flex-shrink-0"
                  style={{ backgroundColor: colors.surfaceMuted }}
                >
                  <Icon size={20} style={{ color: colors.activeText }} />
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="text-sm lg:text-base font-black" style={{ color: colors.text }}>
                    {callback.title}
                  </h3>
                  {callback.subtitle && (
                    <p className="text-xs lg:text-sm font-semibold mt-1" style={{ color: colors.textMuted }}>
                      📍 {callback.subtitle}
                    </p>
                  )}
                  <p className="text-xs lg:text-sm font-semibold mt-1" style={{ color: colors.textMuted }}>
                    {callback.when}
                  </p>
                </div>
                <div
                  className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-full"
                  style={{ backgroundColor: badge.bg }}
                >
                  <Clock size={11} style={{ color: badge.color }} />
                  <span className="text-xs font-black" style={{ color: badge.color }}>
                    {badge.label}
                  </span>
                </div>
              </div>

              <div className="flex gap-2">
                <button
                  className="flex-1 bg-[#16A34A] text-white font-black py-3 rounded-xl hover:bg-[#15803D] transition-colors flex items-center justify-center gap-2"
                >
                  <PhoneCall size={16} />
                  <span className="text-sm">{callback.phone}</span>
                </button>
                <button
                  className="w-12 h-12 rounded-xl border flex items-center justify-center hover:opacity-80 transition-opacity"
                  style={{
                    borderColor: '#FECACA',
                    backgroundColor: '#FEF2F2',
                  }}
                >
                  <X size={16} color="#EF4444" />
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
