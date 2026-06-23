'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { ChevronRight, House, LayoutGrid, MapPin, Plus, Sparkles, ChevronLeft, ChevronDown } from 'lucide-react';
import { useTheme } from '@/lib/theme/theme-provider';

type PropertyType = 'residential' | 'commercial' | 'land' | 'hotel' | '';
type Purpose = 'rent' | 'sale' | 'new-project' | 'short-term' | '';

const ethiopianCities = [
  'Addis Ababa',
  'Adama',
  'Hawassa',
  'Bahir Dar',
  'Dire Dawa',
  'Mekelle',
  'Jimma',
  'Gondar',
  'Bishoftu',
];

export default function PostPropertyStep2() {
  const router = useRouter();
  const { colors } = useTheme();
  const [propertyType, setPropertyType] = useState<PropertyType>('');
  const [purpose, setPurpose] = useState<Purpose>('');
  const [city, setCity] = useState('Addis Ababa');
  const [areaLocation, setAreaLocation] = useState('');
  const [price, setPrice] = useState('');
  const [size, setSize] = useState('');
  const [citySheetVisible, setCitySheetVisible] = useState(false);

  const propertyTypeOptions = [
    { key: 'residential' as PropertyType, label: 'Residential', icon: House },
    { key: 'commercial' as PropertyType, label: 'Commercial', icon: LayoutGrid },
    { key: 'land' as PropertyType, label: 'Land / Plot', icon: MapPin },
    { key: 'hotel' as PropertyType, label: 'Hotel / Guest House', icon: Sparkles },
  ];

  const purposeOptions = [
    { key: 'rent' as Purpose, label: 'Rent', icon: Sparkles },
    { key: 'sale' as Purpose, label: 'Sale', icon: Plus },
    { key: 'new-project' as Purpose, label: 'New Project', icon: LayoutGrid },
    { key: 'short-term' as Purpose, label: 'Short-term Rental', icon: House },
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
                backgroundColor: step <= 2 ? colors.activeText : colors.surfaceMuted,
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
              <LayoutGrid size={14} style={{ color: colors.activeText }} />
              <span className="text-xs font-black" style={{ color: colors.activeText }}>
                Property Details
              </span>
            </div>
            <div
              className="px-3 py-1.5 rounded-full border"
              style={{ backgroundColor: colors.surfaceMuted, borderColor: colors.border }}
            >
              <span className="text-xs font-black" style={{ color: colors.textMuted }}>
                Step 2 of 3
              </span>
            </div>
          </div>

          <div>
            <h1 className="text-xl lg:text-2xl font-black mb-1" style={{ color: colors.text }}>
              Property Details
            </h1>
            <p className="text-sm font-semibold" style={{ color: colors.textMuted }}>
              Tell us more about your property
            </p>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-3xl mx-auto px-4 lg:px-8 pb-32">
        <div
          className="rounded-3xl p-4 lg:p-5 border space-y-4"
          style={{ backgroundColor: colors.surface, borderColor: colors.border }}
        >
          {/* Property Type */}
          <div className="space-y-3">
            <label className="text-xs font-black" style={{ color: colors.text }}>
              Property Type (Required)
            </label>
            <div className="grid grid-cols-2 gap-2">
              {propertyTypeOptions.map((option) => {
                const Icon = option.icon;
                const isSelected = propertyType === option.key;
                return (
                  <button
                    key={option.key}
                    onClick={() => setPropertyType(option.key)}
                    className="flex items-center gap-2 p-3 rounded-xl border-2 transition-all hover:opacity-80"
                    style={{
                      backgroundColor: isSelected ? colors.activeSurface : colors.background,
                      borderColor: isSelected ? colors.activeText : colors.border,
                    }}
                  >
                    <div
                      className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0"
                      style={{
                        backgroundColor: isSelected ? colors.activeText : colors.surfaceMuted,
                      }}
                    >
                      <Icon size={14} color={isSelected ? '#FFFFFF' : colors.textMuted} />
                    </div>
                    <span className="text-xs font-black" style={{ color: colors.text }}>
                      {option.label}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Purpose */}
          <div className="space-y-3">
            <label className="text-xs font-black" style={{ color: colors.text }}>
              Purpose (Required)
            </label>
            <div className="grid grid-cols-2 gap-2">
              {purposeOptions.map((option) => {
                const Icon = option.icon;
                const isSelected = purpose === option.key;
                return (
                  <button
                    key={option.key}
                    onClick={() => setPurpose(option.key)}
                    className="flex items-center gap-2 p-3 rounded-xl border-2 transition-all hover:opacity-80"
                    style={{
                      backgroundColor: isSelected ? colors.activeSurface : colors.background,
                      borderColor: isSelected ? colors.activeText : colors.border,
                    }}
                  >
                    <div
                      className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0"
                      style={{
                        backgroundColor: isSelected ? colors.activeText : colors.surfaceMuted,
                      }}
                    >
                      <Icon size={14} color={isSelected ? '#FFFFFF' : colors.textMuted} />
                    </div>
                    <span className="text-xs font-black" style={{ color: colors.text }}>
                      {option.label}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* City */}
          <div className="space-y-3">
            <label className="text-xs font-black" style={{ color: colors.text }}>
              City (Required)
            </label>
            <button
              onClick={() => setCitySheetVisible(!citySheetVisible)}
              className="w-full min-h-[48px] px-4 rounded-xl border flex items-center justify-between hover:opacity-80 transition-opacity"
              style={{ backgroundColor: colors.surface, borderColor: colors.border }}
            >
              <div className="flex items-center gap-3">
                <MapPin size={16} style={{ color: colors.textMuted }} />
                <span className="text-sm font-bold" style={{ color: colors.text }}>
                  {city}
                </span>
              </div>
              <ChevronDown size={16} style={{ color: colors.textMuted }} />
            </button>

            {/* City Dropdown */}
            {citySheetVisible && (
              <div
                className="rounded-xl border p-2 space-y-1 max-h-64 overflow-y-auto"
                style={{ backgroundColor: colors.surface, borderColor: colors.border }}
              >
                {ethiopianCities.map((cityOption) => {
                  const isSelected = city === cityOption;
                  return (
                    <button
                      key={cityOption}
                      onClick={() => {
                        setCity(cityOption);
                        setCitySheetVisible(false);
                      }}
                      className="w-full min-h-[44px] px-3 rounded-lg border flex items-center gap-3 hover:opacity-80 transition-all"
                      style={{
                        backgroundColor: isSelected ? colors.activeSurface : colors.surface,
                        borderColor: isSelected ? colors.activeText : colors.border,
                      }}
                    >
                      <MapPin size={14} style={{ color: isSelected ? colors.activeText : colors.textMuted }} />
                      <span className="text-sm font-bold" style={{ color: colors.text }}>
                        {cityOption}
                      </span>
                    </button>
                  );
                })}
              </div>
            )}
          </div>

          {/* Area/Location */}
          <div className="space-y-3">
            <label className="text-xs font-black" style={{ color: colors.text }}>
              Area / Location
            </label>
            <input
              type="text"
              value={areaLocation}
              onChange={(e) => setAreaLocation(e.target.value)}
              placeholder="e.g. Bole, Summit"
              className="w-full min-h-[48px] px-4 rounded-xl border text-sm font-semibold focus:outline-none focus:ring-2"
              style={{
                backgroundColor: colors.surface,
                borderColor: colors.border,
                color: colors.text,
              }}
            />
          </div>

          {/* Price & Size */}
          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-3">
              <label className="text-xs font-black" style={{ color: colors.text }}>
                Price
              </label>
              <input
                type="text"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                placeholder="ETB 2,500,000"
                className="w-full min-h-[48px] px-4 rounded-xl border text-sm font-semibold focus:outline-none focus:ring-2"
                style={{
                  backgroundColor: colors.surface,
                  borderColor: colors.border,
                  color: colors.text,
                }}
              />
            </div>
            <div className="space-y-3">
              <label className="text-xs font-black" style={{ color: colors.text }}>
                Bedrooms / Size
              </label>
              <input
                type="text"
                value={size}
                onChange={(e) => setSize(e.target.value)}
                placeholder="3BR or 150m²"
                className="w-full min-h-[48px] px-4 rounded-xl border text-sm font-semibold focus:outline-none focus:ring-2"
                style={{
                  backgroundColor: colors.surface,
                  borderColor: colors.border,
                  color: colors.text,
                }}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="fixed bottom-0 left-0 right-0 p-4 lg:p-6" style={{ backgroundColor: colors.background }}>
        <div className="max-w-3xl mx-auto">
          <button
            onClick={() => router.push('/post-property/contact')}
            className="w-full min-h-[48px] lg:min-h-[52px] rounded-2xl font-black text-sm lg:text-base flex items-center justify-center gap-2 transition-all hover:opacity-90"
            style={{
              backgroundColor: colors.activeText,
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
