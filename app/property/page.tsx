'use client';

import { useState } from 'react';
import { PremiumBanner } from '@/components/property/premium-banner';
import { PropertyCard } from '@/components/property/property-card';
import { SearchBar } from '@/components/common/search-bar';
import { SearchFiltersModal } from '@/components/common/search-filters-modal';
import { propertySearchFiltersConfig } from '@/lib/data/search-filters';
import { X } from 'lucide-react';
import { useTheme } from '@/lib/theme/theme-provider';
import { useI18n } from '@/lib/i18n/i18n-provider';

const segments = [
  { key: 'buy', label: 'Buy' },
  { key: 'rent', label: 'Rent' },
];

const sampleProperties = [
  {
    id: '1',
    title: '5BR Executive Villa - Bole',
    location: 'Bole, Addis Ababa',
    age: 'New (0-2 yrs)',
    price: 'ETB 9,500,000',
    beds: 5,
    baths: 4,
    area: 420,
    featured: true,
    forSale: true,
    verified: true,
    image: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: '2',
    title: 'Modern 3BR Apartment - Kazanchis',
    location: 'Kazanchis, Addis Ababa',
    age: 'Resale',
    price: 'ETB 4,200,000',
    beds: 3,
    baths: 2,
    area: 150,
    featured: false,
    forSale: true,
    verified: true,
    image: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: '3',
    title: 'Luxury Penthouse Suite',
    location: '22, Addis Ababa',
    age: 'New (0-2 yrs)',
    price: 'ETB 12,500,000',
    beds: 3,
    baths: 2,
    area: 280,
    featured: true,
    forSale: true,
    verified: true,
    image: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=800&q=80',
  },
];

export default function PropertyPage() {
  const [activeSegment, setActiveSegment] = useState('buy');
  const [searchQuery, setSearchQuery] = useState('');
  const [showPromoBanner, setShowPromoBanner] = useState(true);
  const [filtersVisible, setFiltersVisible] = useState(false);
  const { t } = useI18n();
  const { colors } = useTheme();

  return (
    <div className="flex-1 relative" style={{ backgroundColor: colors.background }}>
      <div className="max-w-7xl mx-auto pb-32">
        {/* Hidden h1 for SEO and screen readers */}
        <h1 className="sr-only">Property Listings - Buy and Rent Properties in Ethiopia</h1>

        <PremiumBanner />

        {/* Search and Segment Control */}
        <div className="sticky top-14 lg:top-16 z-30 px-4 lg:px-8 py-3 max-w-7xl mx-auto" style={{ backgroundColor: colors.background }}>
          {/* Search Bar */}
          <div className="mb-3 w-full">
            <SearchBar
              placeholder="Search city, area, property..."
              value={searchQuery}
              onChangeText={setSearchQuery}
              onFilterPress={() => setFiltersVisible(true)}
              variant="muted"
            />
          </div>

          {/* Segmented Control */}
          <div className="flex gap-1.5 p-1 rounded-lg shadow-sm border" style={{ backgroundColor: colors.surface, borderColor: colors.border }}>
            {segments.map((segment) => (
              <button
                key={segment.key}
                onClick={() => setActiveSegment(segment.key)}
                className="flex-1 py-2 px-3 rounded-md font-bold text-xs transition-all"
                style={activeSegment === segment.key
                  ? { backgroundColor: '#0B8F55', color: '#FFFFFF' }
                  : { backgroundColor: 'transparent', color: colors.text }
                }
                aria-pressed={activeSegment === segment.key}
              >
                {segment.label}
              </button>
            ))}
          </div>
        </div>

        {/* Results count */}
        <div className="px-4 lg:px-8 mb-3">
          <h2 
            className="text-xs font-medium" 
            style={{ color: colors.textMuted }}
            role="status"
            aria-live="polite"
            aria-atomic="true"
          >
            {t('property.resultsFound_other', { count: sampleProperties.length })}
          </h2>
        </div>

        {/* Property Grid */}
        <section aria-labelledby="property-results">
          <h2 id="property-results" className="sr-only">Property search results</h2>
          <div className="px-4 lg:px-8 pb-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3">
            {sampleProperties.map((property) => (
              <PropertyCard key={property.id} {...property} />
            ))}
          </div>
        </section>
      </div>

      {/* Promo Banner - Fixed at bottom but aligned with content */}
      {showPromoBanner && (
        <aside aria-label="Property valuation promotion">
          <div className="fixed bottom-20 lg:bottom-6 left-0 lg:left-64 right-0 z-20">
            <div className="max-w-7xl mx-auto px-4 lg:px-8">
              <div className="bg-gradient-to-r from-[#14B37B] to-[#14B37B] rounded-xl p-3 lg:p-4 shadow-xl relative">
                <button
                  onClick={() => setShowPromoBanner(false)}
                  aria-label="Close promotion banner"
                  className="absolute top-2 right-2 w-5 h-5 rounded-full bg-white/20 hover:bg-white/30 flex items-center justify-center transition-colors"
                >
                  <X size={12} className="text-white" aria-hidden="true" />
                </button>
                
                <div className="flex items-center justify-between gap-3 pr-6">
                  <div className="flex-1">
                    <p className="text-[10px] font-bold text-white/90 uppercase tracking-wide mb-0.5">
                      Property Valuation
                    </p>
                    <h3 className="text-sm font-black text-white mb-0.5">
                      Property Valuation Free
                    </h3>
                    <p className="text-xs font-medium text-white/90">
                      Know your property worth in 2 minutes
                    </p>
                  </div>
                  <button 
                    className="px-3 py-2 bg-white rounded-lg hover:bg-gray-100 transition-colors whitespace-nowrap flex-shrink-0"
                    aria-label="Start free property assessment"
                  >
                    <span className="text-xs font-black text-gray-900">Free Assessment</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </aside>
      )}

      {/* Filters Modal */}
      <SearchFiltersModal
        visible={filtersVisible}
        onClose={() => setFiltersVisible(false)}
        config={propertySearchFiltersConfig}
        minFieldLabel="Min"
        maxFieldLabel="Max"
      />
    </div>
  );
}