'use client';

import { useRouter } from 'next/navigation';
import { ArrowLeft, Bell, Trash2 } from 'lucide-react';
import { useState } from 'react';
import { useTheme } from '@/lib/theme/theme-provider';

type NotifCategory = 'All' | 'Property Alerts' | 'Government/News' | 'Rewards & Lottery' | 'Subscription';

interface Notification {
  id: string;
  emoji: string;
  title: string;
  body: string;
  category: Exclude<NotifCategory, 'All'>;
  time: string;
  read: boolean;
}

const filters: NotifCategory[] = [
  'All',
  'Property Alerts',
  'Government/News',
  'Rewards & Lottery',
  'Subscription',
];

const categoryMeta: Record<string, { color: string; bg: string }> = {
  'Property Alerts': { color: '#2563EB', bg: '#EFF6FF' },
  'Government/News': { color: '#16A34A', bg: '#F0FDF4' },
  'Rewards & Lottery': { color: '#D97706', bg: '#FFFBEB' },
  'Subscription': { color: '#7C3AED', bg: '#F5F3FF' },
};

const initialNotifs: Notification[] = [
  {
    id: 'n1',
    emoji: '🏠',
    title: 'New Property Match',
    body: '3-bed villa in Bole matches your saved search criteria',
    category: 'Property Alerts',
    time: '2h ago',
    read: false,
  },
  {
    id: 'n2',
    emoji: '📰',
    title: 'Land Lease Update',
    body: 'New government regulations on residential land leases announced',
    category: 'Government/News',
    time: '4h ago',
    read: false,
  },
  {
    id: 'n3',
    emoji: '🎁',
    title: 'Campaign Live',
    body: 'Monthly ETB 500,000 prize campaign started - join now!',
    category: 'Rewards & Lottery',
    time: '6h ago',
    read: false,
  },
  {
    id: 'n4',
    emoji: '💳',
    title: 'Renewal Reminder',
    body: 'Your subscription renews in 7 days - ETB 1,200/month',
    category: 'Subscription',
    time: '1d ago',
    read: false,
  },
  {
    id: 'n5',
    emoji: '🏠',
    title: 'Price Drop Alert',
    body: 'A saved property in Kazanchis dropped by ETB 200,000',
    category: 'Property Alerts',
    time: '2d ago',
    read: true,
  },
  {
    id: 'n6',
    emoji: '🎁',
    title: 'Referral Bonus',
    body: 'You earned ETB 150 for referring a new user',
    category: 'Rewards & Lottery',
    time: '3d ago',
    read: true,
  },
];

export default function NotificationsPage() {
  const router = useRouter();
  const { colors, isDark } = useTheme();
  const [activeFilter, setActiveFilter] = useState<NotifCategory>('All');
  const [notifs, setNotifs] = useState<Notification[]>(initialNotifs);

  const unreadCount = notifs.filter((n) => !n.read).length;
  const filtered = activeFilter === 'All' ? notifs : notifs.filter((n) => n.category === activeFilter);

  function markAllRead() {
    setNotifs((prev) => prev.map((n) => ({ ...n, read: true })));
  }

  function clearAll() {
    setNotifs([]);
  }

  function markRead(id: string) {
    setNotifs((prev) => prev.map((n) => (n.id === id ? { ...n, read: true } : n)));
  }

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
          Notifications
        </h1>
      </div>

      <div className="max-w-5xl mx-auto px-4 lg:px-8 pt-20 lg:pt-24 pb-32 space-y-4 lg:space-y-5">
        {/* Header Row */}
        <div className="flex items-start justify-between gap-4">
          <div className="flex items-center gap-3">
            <Bell size={24} style={{ color: colors.text }} />
            <div>
              <h2 className="text-xl lg:text-2xl font-black" style={{ color: colors.text }}>
                Notifications
              </h2>
              {unreadCount > 0 && (
                <p className="text-sm font-semibold mt-0.5" style={{ color: colors.textMuted }}>
                  {unreadCount} unread
                </p>
              )}
            </div>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={markAllRead}
              className="text-sm font-black text-blue-600 dark:text-blue-400 hover:opacity-80 transition-opacity"
            >
              Mark all read
            </button>
            <button
              onClick={clearAll}
              className="w-9 h-9 rounded-xl border flex items-center justify-center hover:opacity-80 transition-opacity"
              style={{ backgroundColor: colors.surface, borderColor: colors.border }}
            >
              <Trash2 size={16} style={{ color: colors.textMuted }} />
            </button>
          </div>
        </div>

        {/* Filters */}
        <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
          {filters.map((filter) => {
            const isActive = activeFilter === filter;
            const emoji = filter === 'Property Alerts' ? '🏠' : filter === 'Government/News' ? '📰' : filter === 'Rewards & Lottery' ? '🎁' : filter === 'Subscription' ? '💳' : '';
            return (
              <button
                key={filter}
                onClick={() => setActiveFilter(filter)}
                className="flex-shrink-0 flex items-center gap-2 px-4 py-2 rounded-full border text-sm font-bold transition-all"
                style={{
                  backgroundColor: isActive ? (isDark ? '#1E3A8A' : '#1D4ED8') : colors.surface,
                  borderColor: isActive ? 'transparent' : colors.border,
                  color: isActive ? '#FFFFFF' : colors.textMuted,
                }}
              >
                {emoji && <span>{emoji}</span>}
                <span>{filter}</span>
              </button>
            );
          })}
        </div>

        {/* Notifications List */}
        {filtered.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-16 lg:py-24">
            <Bell size={48} style={{ color: colors.textMuted }} />
            <p className="text-base font-semibold mt-4" style={{ color: colors.textMuted }}>
              No notifications
            </p>
          </div>
        ) : (
          <div className="space-y-3">
            {filtered.map((notif) => {
              const meta = categoryMeta[notif.category];
              return (
                <button
                  key={notif.id}
                  onClick={() => markRead(notif.id)}
                  className="w-full text-left border rounded-2xl lg:rounded-3xl p-4 lg:p-5 hover:opacity-80 transition-opacity"
                  style={{
                    backgroundColor: notif.read ? colors.surface : (isDark ? '#1E2D4A' : '#EFF6FF'),
                    borderColor: notif.read ? colors.border : '#BFDBFE',
                  }}
                >
                  <div className="flex items-start gap-3">
                    <div
                      className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl flex-shrink-0"
                      style={{
                        backgroundColor: isDark ? colors.surfaceMuted : meta?.bg ?? '#F8FAFC',
                      }}
                    >
                      {notif.emoji}
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="text-sm lg:text-base font-black" style={{ color: colors.text }}>
                        {notif.title}
                      </h3>
                      <p className="text-xs lg:text-sm font-semibold mt-1 leading-relaxed" style={{ color: colors.textMuted }}>
                        {notif.body}
                      </p>
                      <div className="flex items-center gap-2 mt-2">
                        <div
                          className="inline-block px-2 py-1 rounded-full"
                          style={{
                            backgroundColor: isDark ? colors.surfaceMuted : meta?.bg ?? '#F8FAFC',
                          }}
                        >
                          <span
                            className="text-xs font-black"
                            style={{ color: meta?.color ?? colors.textMuted }}
                          >
                            {notif.category}
                          </span>
                        </div>
                        <span className="text-xs font-semibold" style={{ color: colors.textMuted }}>
                          {notif.time}
                        </span>
                      </div>
                    </div>
                    {!notif.read && (
                      <div className="w-2.5 h-2.5 rounded-full bg-blue-600 mt-1 flex-shrink-0" />
                    )}
                  </div>
                </button>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
