'use client';

import { useRouter } from 'next/navigation';
import { ArrowLeft, Edit3, Eye, EyeOff, Trash2, Plus } from 'lucide-react';
import { useState } from 'react';
import { useTheme } from '@/lib/theme/theme-provider';
import { useI18n } from '@/lib/i18n/i18n-provider';

interface Listing {
  id: string;
  title: string;
  location: string;
  price: string;
  image: string;
  visible: boolean;
}

const sampleListings: Listing[] = [
  {
    id: '1',
    title: '3BR Modern Apartment',
    location: 'Bole, Addis Ababa',
    price: 'ETB 8,500,000',
    image: '/placeholder.jpg',
    visible: true,
  },
  {
    id: '2',
    title: 'Luxury Villa with Garden',
    location: 'Old Airport, Addis Ababa',
    price: 'ETB 15,200,000',
    image: '/placeholder.jpg',
    visible: true,
  },
];

export default function MyListingsPage() {
  const router = useRouter();
  const { colors } = useTheme();
  const { t } = useI18n();
  const [listings, setListings] = useState<Listing[]>(sampleListings);

  const activeCount = listings.filter((l) => l.visible).length;

  function toggleVisibility(id: string) {
    setListings((prev) =>
      prev.map((l) => (l.id === id ? { ...l, visible: !l.visible } : l))
    );
  }

  function removeListing(id: string) {
    setListings((prev) => prev.filter((l) => l.id !== id));
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
            My Listings
          </h1>
        </div>
        <div className="flex items-center gap-3">
          <span className="text-sm font-semibold hidden sm:inline" style={{ color: colors.textMuted }}>
            {activeCount} active
          </span>
          <button
            onClick={() => router.push('/post-property')}
            className="bg-[#0B8F55] text-white font-black px-3 lg:px-4 py-2 rounded-xl hover:bg-[#0A7A4A] transition-colors text-sm flex items-center gap-2"
          >
            <Plus size={16} />
            <span className="hidden sm:inline">Add New</span>
          </button>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 lg:px-8 pt-20 lg:pt-24 pb-32 space-y-4">
        {listings.length === 0 ? (
          <div className="flex items-center justify-center pt-16">
            <div
              className="border rounded-3xl p-12 max-w-md text-center"
              style={{ backgroundColor: colors.surface, borderColor: colors.border }}
            >
              <p className="text-lg font-bold" style={{ color: colors.textMuted }}>
                No listings yet
              </p>
            </div>
          </div>
        ) : (
          listings.map((listing) => (
            <div
              key={listing.id}
              className="border rounded-2xl lg:rounded-3xl overflow-hidden"
              style={{ backgroundColor: colors.surface, borderColor: colors.border }}
            >
              {/* Listing Preview */}
              <div className="p-4 lg:p-5">
                <div className="flex gap-4">
                  <div
                    className="w-24 h-24 lg:w-32 lg:h-32 rounded-xl flex-shrink-0"
                    style={{ backgroundColor: colors.surfaceMuted }}
                  />
                  <div className="flex-1 min-w-0">
                    <h3 className="text-base lg:text-lg font-black truncate" style={{ color: colors.text }}>
                      {listing.title}
                    </h3>
                    <p className="text-sm font-semibold mt-1 truncate" style={{ color: colors.textMuted }}>
                      📍 {listing.location}
                    </p>
                    <p className="text-base lg:text-lg font-black mt-2" style={{ color: colors.activeText }}>
                      {listing.price}
                    </p>
                  </div>
                </div>
              </div>

              {/* Actions */}
              <div className="flex gap-2 p-3 border-t" style={{ borderColor: colors.border }}>
                <button
                  onClick={() => router.push(`/post-property?edit=${listing.id}`)}
                  className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl border hover:opacity-80 transition-opacity"
                  style={{ borderColor: colors.border, backgroundColor: colors.background }}
                >
                  <Edit3 size={16} style={{ color: colors.activeText }} />
                  <span className="text-sm font-black" style={{ color: colors.activeText }}>
                    Edit
                  </span>
                </button>

                <button
                  onClick={() => toggleVisibility(listing.id)}
                  className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl border hover:opacity-80 transition-opacity"
                  style={{ borderColor: colors.border, backgroundColor: colors.background }}
                >
                  {listing.visible ? (
                    <>
                      <Eye size={16} color="#059669" />
                      <span className="text-sm font-black text-green-600 dark:text-green-400">
                        Visible
                      </span>
                    </>
                  ) : (
                    <>
                      <EyeOff size={16} style={{ color: colors.textMuted }} />
                      <span className="text-sm font-black" style={{ color: colors.textMuted }}>
                        Hidden
                      </span>
                    </>
                  )}
                </button>

                <button
                  onClick={() => removeListing(listing.id)}
                  className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl border border-red-200 dark:border-red-900/30 bg-red-50 dark:bg-red-950/20 hover:opacity-80 transition-opacity"
                >
                  <Trash2 size={16} color="#EF4444" />
                  <span className="text-sm font-black text-red-600 dark:text-red-400">
                    Delete
                  </span>
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
