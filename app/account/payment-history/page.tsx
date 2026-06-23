'use client';

import { useRouter } from 'next/navigation';
import { ArrowLeft, Download } from 'lucide-react';
import { useState } from 'react';
import { useTheme } from '@/lib/theme/theme-provider';

type Filter = 'All' | 'Subscription' | 'Listing' | 'Service' | 'Booking';

const filters: Filter[] = ['All', 'Subscription', 'Listing', 'Service', 'Booking'];

const transactions = [
  { id: '1', icon: '⭐', iconBg: '#FFFBEB', title: 'Broker Subscription – May 2026', date: 'May 1, 2026 · TLP-10100', amount: 'ETB 1,200', status: 'Paid' },
  { id: '2', icon: '💳', iconBg: '#EFF6FF', title: 'Premium Listing – Bole Villa', date: 'Apr 30, 2026 · TLP-10050', amount: 'ETB 450', status: 'Paid' },
  { id: '3', icon: '🔧', iconBg: '#F0FDF4', title: 'Home Cleaning Service – Kazanchis', date: 'Apr 28, 2026 · TLP-09990', amount: 'ETB 350', status: 'Paid' },
  { id: '4', icon: '🏨', iconBg: '#EFF6FF', title: 'Hotel Booking – Skylight AA', date: 'Apr 25, 2026 · TLP-09940', amount: 'ETB 3,200', status: 'Paid' },
  { id: '5', icon: '💳', iconBg: '#F5F3FF', title: 'Featured Listing – CMC Commercial', date: 'Apr 22, 2026 · TLP-09880', amount: 'ETB 150', status: 'Paid' },
  { id: '6', icon: '⭐', iconBg: '#FFFBEB', title: 'Broker Subscription – Apr 2026', date: 'Apr 1, 2026 · TLP-09100', amount: 'ETB 1,200', status: 'Paid' },
  { id: '7', icon: '🔧', iconBg: '#F0FDF4', title: 'Electrical Repair – Sarbet', date: 'Mar 28, 2026 · TLP-08990', amount: 'ETB 500', status: 'Paid' },
  { id: '8', icon: '💳', iconBg: '#EFF6FF', title: 'Lead Unlock – Apt Bole', date: 'Mar 20, 2026 · TLP-08800', amount: 'ETB 50', status: 'Paid' },
];

export default function PaymentHistoryPage() {
  const router = useRouter();
  const { colors, isDark } = useTheme();
  const [activeFilter, setActiveFilter] = useState<Filter>('All');

  return (
    <div className="min-h-screen" style={{ backgroundColor: colors.background }}>
      {/* Header */}
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
          Payment History
        </h1>
      </div>

      <div className="max-w-4xl mx-auto px-4 lg:px-8 pt-20 lg:pt-24 pb-32 space-y-4 lg:space-y-5">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xl lg:text-2xl font-black" style={{ color: colors.text }}>
              Payment History
            </h2>
            <p className="text-sm font-semibold mt-1" style={{ color: colors.textMuted }}>
              {transactions.length} transactions
            </p>
          </div>
          <button
            className="flex items-center gap-2 px-3 py-2 rounded-xl border hover:opacity-80 transition-opacity"
            style={{ borderColor: colors.border }}
          >
            <Download size={16} color="#16A34A" />
            <span className="text-sm font-black text-green-600 dark:text-green-400">Export</span>
          </button>
        </div>

        {/* Total Card */}
        <div className="bg-[#16A34A] rounded-2xl lg:rounded-3xl p-5 lg:p-6 relative overflow-hidden">
          <div className="absolute right-[-20px] top-[-20px] w-20 lg:w-24 h-20 lg:h-24 rounded-full bg-white/10" />
          <p className="text-sm font-bold text-white/85 mb-2">↗ Total Paid (All Time)</p>
          <p className="text-4xl lg:text-5xl font-black text-white mb-2">ETB 6,550</p>
          <p className="text-xs lg:text-sm font-semibold text-white/80">
            via Telebirr · {transactions.length} successful payments
          </p>
        </div>

        {/* Filters */}
        <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
          {filters.map((filter) => (
            <button
              key={filter}
              onClick={() => setActiveFilter(filter)}
              className="flex-shrink-0 px-4 py-2 rounded-full border text-sm font-bold transition-all"
              style={{
                backgroundColor: activeFilter === filter ? '#16A34A' : colors.surface,
                borderColor: activeFilter === filter ? '#16A34A' : colors.border,
                color: activeFilter === filter ? '#FFFFFF' : colors.textMuted,
              }}
            >
              {filter}
            </button>
          ))}
        </div>

        {/* Transactions List */}
        <div
          className="border rounded-2xl lg:rounded-3xl overflow-hidden divide-y"
          style={{ backgroundColor: colors.surface, borderColor: colors.border }}
        >
          {transactions.map((tx, index) => (
            <div
              key={tx.id}
              className="flex items-center gap-3 lg:gap-4 p-3.5 lg:p-4"
              style={{ borderColor: colors.border }}
            >
              <div
                className="w-10 h-10 lg:w-12 lg:h-12 rounded-xl flex items-center justify-center flex-shrink-0 text-base lg:text-lg"
                style={{
                  backgroundColor: isDark ? colors.surfaceMuted : tx.iconBg,
                }}
              >
                {tx.icon}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm lg:text-base font-black truncate" style={{ color: colors.text }}>
                  {tx.title}
                </p>
                <p className="text-xs lg:text-sm font-semibold mt-0.5 truncate" style={{ color: colors.textMuted }}>
                  {tx.date}
                </p>
              </div>
              <div className="text-right">
                <p className="text-sm lg:text-base font-black" style={{ color: colors.text }}>
                  {tx.amount}
                </p>
                <div className="inline-block bg-green-100 dark:bg-green-900/20 rounded-full px-2 py-0.5 mt-1">
                  <span className="text-xs font-black text-green-700 dark:text-green-400">
                    {tx.status}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
