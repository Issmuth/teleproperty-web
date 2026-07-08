'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { ChevronRight, House, LayoutGrid, MapPin, Plus, Sparkles, ChevronLeft, ChevronDown } from 'lucide-react';
import { useTheme } from '@/lib/theme/theme-provider';
import { useSidebar } from '@/lib/layout/sidebar-context';
import { Tag } from '@/components/common/tag';
import { iconSize, iconButtonClasses, buttonClasses, inputClasses } from '@/lib/design-system/dimensions';

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
  const { isCollapsed } = useSidebar();
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
    <div className="flex-1 min-h-screen" style={{ backgroundColor: colors.background }}>
      {/* Back Button - Positioned relative to main content */}
      <div className="max-w-5xl mx-auto px-4 lg:px-8 pt-4 lg:pt-6">
        <button
          onClick={() => router.back()}
          className={`${iconButtonClasses.md} lg:${iconButtonClasses.lg} rounded-full border flex items-center justify-center shadow-sm hover:opacity-80 transition-opacity`}
          style={{ backgroundColor: colors.surface, borderColor: colors.border }}
          aria-label="Go back to previous step"
        >
          <ChevronLeft size={iconSize.xl} style={{ color: colors.text }} aria-hidden="true" />
        </button>
      </div>

      {/* Header */}
      <header className="max-w-5xl mx-auto px-4 lg:px-8 pt-4 pb-6 space-y-4">
        {/* Progress Steps */}
        <div className="flex gap-2" role="progressbar" aria-valuenow={2} aria-valuemin={1} aria-valuemax={3} aria-label="Step 2 of 3">
          {[1, 2, 3].map((step) => (
            <div
              key={step}
              className="flex-1 h-1.5 rounded-full"
              style={{
                backgroundColor: step <= 2 ? colors.activeText : colors.surfaceMuted,
              }}
              aria-hidden="true"
            />
          ))}
        </div>

        {/* Hero Card */}
        <div
          className="rounded-3xl p-5 lg:p-6 border shadow-sm space-y-4"
          style={{ backgroundColor: colors.surface, borderColor: colors.border }}
        >
          <div className="flex items-center justify-between">
            <Tag variant="primary" size="sm" icon={LayoutGrid} iconSize={14}>
              Property Details
            </Tag>
            <Tag variant="muted" size="sm">
              Step 2 of 3
            </Tag>
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
      </header>

      {/* Content */}
      <main className="max-w-5xl mx-auto px-4 lg:px-8 pb-32">
        <form aria-label="Property details form">
        <div
          className="rounded-3xl p-4 lg:p-5 border space-y-4"
          style={{ backgroundColor: colors.surface, borderColor: colors.border }}
        >
          {/* Property Type */}
          <fieldset className="space-y-3">
            <legend className="text-xs font-black" style={{ color: colors.text }}>
              Property Type (Required)
            </legend>
            <div className="grid grid-cols-2 gap-2" role="radiogroup" aria-required="true">
              {propertyTypeOptions.map((option) => {
                const Icon = option.icon;
                const isSelected = propertyType === option.key;
                return (
                  <button
                    key={option.key}
                    type="button"
                    onClick={() => setPropertyType(option.key)}
                    className="flex items-center gap-2 p-3 rounded-xl border-2 transition-all hover:opacity-80"
                    style={{
                      backgroundColor: isSelected ? colors.activeSurface : colors.background,
                      borderColor: isSelected ? colors.activeText : colors.border,
                    }}
                    role="radio"
                    aria-checked={isSelected}
                    aria-label={option.label}
                  >
                    <div
                      className={`${iconButtonClasses.sm} rounded-lg flex items-center justify-center flex-shrink-0`}
                      style={{
                        backgroundColor: isSelected ? colors.activeText : colors.surfaceMuted,
                      }}
                      aria-hidden="true"
                    >
                      <Icon size={iconSize.sm} color={isSelected ? '#FFFFFF' : colors.textMuted} />
                    </div>
                    <span className="text-xs font-black" style={{ color: colors.text }}>
                      {option.label}
                    </span>
                  </button>
                );
              })}
            </div>
          </fieldset>

          {/* Purpose */}
          <fieldset className="space-y-3">
            <legend className="text-xs font-black" style={{ color: colors.text }}>
              Purpose (Required)
            </legend>
            <div className="grid grid-cols-2 gap-2" role="radiogroup" aria-required="true">
              {purposeOptions.map((option) => {
                const Icon = option.icon;
                const isSelected = purpose === option.key;
                return (
                  <button
                    key={option.key}
                    type="button"
                    onClick={() => setPurpose(option.key)}
                    className="flex items-center gap-2 p-3 rounded-xl border-2 transition-all hover:opacity-80"
                    style={{
                      backgroundColor: isSelected ? colors.activeSurface : colors.background,
                      borderColor: isSelected ? colors.activeText : colors.border,
                    }}
                    role="radio"
                    aria-checked={isSelected}
                    aria-label={option.label}
                  >
                    <div
                      className={`${iconButtonClasses.sm} rounded-lg flex items-center justify-center flex-shrink-0`}
                      style={{
                        backgroundColor: isSelected ? colors.activeText : colors.surfaceMuted,
                      }}
                      aria-hidden="true"
                    >
                      <Icon size={iconSize.sm} color={isSelected ? '#FFFFFF' : colors.textMuted} />
                    </div>
                    <span className="text-xs font-black" style={{ color: colors.text }}>
                      {option.label}
                    </span>
                  </button>
                );
              })}
            </div>
          </fieldset>

          {/* City */}
          <div className="space-y-3">
            <label htmlFor="city-selector" className="text-xs font-black" style={{ color: colors.text }}>
              City (Required)
            </label>
            <button
              id="city-selector"
              type="button"
              onClick={() => setCitySheetVisible(!citySheetVisible)}
              className={`w-full ${inputClasses.lg} flex items-center justify-between hover:opacity-80 transition-opacity border`}
              style={{ backgroundColor: colors.surface, borderColor: colors.border }}
              aria-label={`Select city, currently ${city}`}
              aria-expanded={citySheetVisible}
              aria-haspopup="listbox"
            >
              <div className="flex items-center gap-3">
                <MapPin size={iconSize.md} style={{ color: colors.textMuted }} aria-hidden="true" />
                <span className="text-sm font-bold" style={{ color: colors.text }}>
                  {city}
                </span>
              </div>
              <ChevronDown size={iconSize.md} style={{ color: colors.textMuted }} aria-hidden="true" />
            </button>

            {/* City Dropdown */}
            {citySheetVisible && (
              <div
                className="rounded-xl border p-2 space-y-1 max-h-64 overflow-y-auto"
                style={{ backgroundColor: colors.surface, borderColor: colors.border }}
                role="listbox"
                aria-label="City selection"
              >
                {ethiopianCities.map((cityOption) => {
                  const isSelected = city === cityOption;
                  return (
                    <button
                      key={cityOption}
                      type="button"
                      onClick={() => {
                        setCity(cityOption);
                        setCitySheetVisible(false);
                      }}
                      className={`w-full ${inputClasses.lg} flex items-center gap-3 hover:opacity-80 transition-all border`}
                      style={{
                        backgroundColor: isSelected ? colors.activeSurface : colors.surface,
                        borderColor: isSelected ? colors.activeText : colors.border,
                      }}
                      role="option"
                      aria-selected={isSelected}
                    >
                      <MapPin size={iconSize.sm} style={{ color: isSelected ? colors.activeText : colors.textMuted }} aria-hidden="true" />
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
            <label htmlFor="area-location" className="text-xs font-black" style={{ color: colors.text }}>
              Area / Location
            </label>
            <input
              id="area-location"
              type="text"
              value={areaLocation}
              onChange={(e) => setAreaLocation(e.target.value)}
              placeholder="e.g. Bole, Summit"
              className={`w-full ${inputClasses.lg} border focus:outline-none focus:ring-2`}
              style={{
                backgroundColor: colors.surface,
                borderColor: colors.border,
                color: colors.text,
              }}
              aria-label="Area or location within the city"
            />
          </div>

          {/* Price & Size */}
          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-3">
              <label htmlFor="price" className="text-xs font-black" style={{ color: colors.text }}>
                Price
              </label>
              <input
                id="price"
                type="text"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                placeholder="ETB 2,500,000"
                className={`w-full ${inputClasses.lg} border focus:outline-none focus:ring-2`}
                style={{
                  backgroundColor: colors.surface,
                  borderColor: colors.border,
                  color: colors.text,
                }}
                aria-label="Property price in Ethiopian Birr"
              />
            </div>
            <div className="space-y-3">
              <label htmlFor="size" className="text-xs font-black" style={{ color: colors.text }}>
                Bedrooms / Size
              </label>
              <input
                id="size"
                type="text"
                value={size}
                onChange={(e) => setSize(e.target.value)}
                placeholder="3BR or 150m²"
                className={`w-full ${inputClasses.lg} border focus:outline-none focus:ring-2`}
                style={{
                  backgroundColor: colors.surface,
                  borderColor: colors.border,
                  color: colors.text,
                }}
                aria-label="Number of bedrooms or property size"
              />
            </div>
          </div>
        </div>
        </form>
      </main>

      {/* Footer */}
      <div 
        className={`fixed bottom-0 left-0 right-0 p-4 lg:p-6 z-20 transition-all duration-300 ${
          isCollapsed ? 'lg:left-20' : 'lg:left-64'
        }`} 
        style={{ backgroundColor: colors.background }}
      >
        <div className="max-w-5xl mx-auto pb-16 lg:pb-0">
          <button
            onClick={() => router.push('/post-property/contact')}
            type="submit"
            className={`w-full ${buttonClasses.lg} lg:h-14 font-black flex items-center justify-center gap-2 transition-all hover:opacity-90`}
            style={{
              backgroundColor: colors.activeText,
              color: '#FFFFFF',
            }}
            aria-label="Continue to contact information"
          >
            <span>Continue</span>
            <ChevronRight size={iconSize.md} aria-hidden="true" />
          </button>
        </div>
      </div>
    </div>
  );
}
