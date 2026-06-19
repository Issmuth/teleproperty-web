'use client';

import { useState } from 'react';
import { Search } from 'lucide-react';
import { PremiumBanner } from '@/components/property/premium-banner';
import { PropertyCard } from '@/components/property/property-card';
import { X } from 'lucide-react';

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

  return (
    <div className="flex-1 bg-gray-50">
      <div className="max-w-5xl mx-auto">
        <PremiumBanner />

        {/* Search and Segment Control */}
        <div className="sticky top-14 lg:top-16 bg-gray-50 z-30 px-4 lg:px-8 py-3">
          {/* Search Bar */}
          <div className="flex items-center gap-2 bg-white border border-gray-200 rounded-xl px-3 py-2.5 shadow-sm mb-3">
            <Search size={18} className="text-gray-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search city, area, property..."
              className="flex-1 outline-none text-sm"
            />
            <button className="text-xs font-bold text-[#0B8F55] hover:text-[#0A7A4A]">
              Filters
            </button>
          </div>

          {/* Segmented Control */}
          <div className="flex gap-1.5 bg-white p-1 rounded-lg shadow-sm border border-gray-200">
            {segments.map((segment) => (
              <button
                key={segment.key}
                onClick={() => setActiveSegment(segment.key)}
                className={`
                  flex-1 py-2 px-3 rounded-md font-bold text-xs transition-all
                  ${activeSegment === segment.key
                    ? 'bg-[#0B8F55] text-white shadow-md'
                    : 'text-gray-700 hover:bg-gray-100'
                  }
                `}
              >
                {segment.label}
              </button>
            ))}
          </div>
        </div>

        {/* Results count */}
        <div className="px-4 lg:px-8 mb-3">
          <p className="text-xs font-medium text-gray-600">
            {sampleProperties.length} properties found
          </p>
        </div>

        {/* Property Grid */}
        <div className="px-4 lg:px-8 pb-8 grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3">
          {sampleProperties.map((property) => (
            <PropertyCard key={property.id} {...property} />
          ))}
        </div>

        {/* Promo Banner */}
        {showPromoBanner && (
          <div className="fixed bottom-20 lg:bottom-6 left-0 right-0 px-4 lg:px-8 max-w-5xl mx-auto z-20">
            <div className="bg-gradient-to-r from-[#14B37B] to-[#14B37B] rounded-xl p-3 lg:p-4 shadow-xl relative">
              <button
                onClick={() => setShowPromoBanner(false)}
                className="absolute top-2 right-2 w-5 h-5 rounded-full bg-white/20 hover:bg-white/30 flex items-center justify-center transition-colors"
              >
                <X size={12} className="text-white" />
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
                <button className="px-3 py-2 bg-white rounded-lg hover:bg-gray-100 transition-colors whitespace-nowrap flex-shrink-0">
                  <span className="text-xs font-black text-gray-900">Free Assessment</span>
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
