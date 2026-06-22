'use client';

import { PlusCircle } from 'lucide-react';
import { SearchBar } from '@/components/common/search-bar';
import { useI18n } from '@/lib/i18n/i18n-provider';

type Segment = {
  key: string;
  label: string;
};

type HomeHeroProps = {
  activeSegment: string;
  onSegmentChange: (key: string) => void;
  segments: Segment[];
  onFilterPress?: () => void;
  onPostPress?: () => void;
  onSearchPress?: () => void;
  searchQuery?: string;
  onSearchQueryChange?: (val: string) => void;
};

export function HomeHero({
  activeSegment,
  onSegmentChange,
  segments,
  onFilterPress,
  onPostPress,
  onSearchPress,
  searchQuery = '',
  onSearchQueryChange,
}: HomeHeroProps) {
  const { t } = useI18n();

  return (
    <div className="space-y-3">
      {/* Hero gradient section */}
      <div className="bg-gradient-to-br from-[#064E3B] via-[#065F46] to-[#14532D] rounded-xl lg:rounded-2xl p-4 lg:p-6 text-white">
        <div className="mb-3">
          <p className="text-xs font-black text-white/90 tracking-wide">
            {t('home.heroKicker')}
          </p>
        </div>
        
        <div className="mb-4">
          <h1 className="text-2xl lg:text-4xl font-black tracking-tight mb-1">
            {t('home.heroTitle')}
          </h1>
          <p className="text-sm lg:text-base font-bold text-white/90">
            {t('home.heroSubtitle')}
          </p>
        </div>

        {/* Segmented control */}
        <div className="flex gap-1.5 bg-white/10 backdrop-blur-sm p-1 rounded-lg">
          {segments.map((segment) => (
            <button
              key={segment.key}
              onClick={() => onSegmentChange(segment.key)}
              className={`
                flex-1 py-2 px-3 rounded-md font-bold text-xs transition-all
                ${activeSegment === segment.key
                  ? 'bg-white text-[#0B8F55] shadow-md'
                  : 'text-white hover:bg-white/20'
                }
              `}
            >
              {segment.label}
            </button>
          ))}
        </div>
      </div>

      {/* Search bar with elevated variant and search button as right accessory */}
      <SearchBar
        placeholder={t('home.searchPlaceholder')}
        value={searchQuery}
        onChangeText={onSearchQueryChange}
        onFilterPress={onFilterPress}
        variant="elevated"
        showFilter={true}
        rightAccessory={
          <button
            onClick={onSearchPress}
            className="px-4 lg:px-5 py-2.5 bg-[#0B8F55] text-white font-black rounded-xl hover:bg-[#0A7A4A] transition-colors text-sm flex-shrink-0 whitespace-nowrap"
          >
            {t('home.searchAction')}
          </button>
        }
      />

      {/* Post property button */}
      <button
        onClick={onPostPress}
        className="w-full flex items-center justify-center gap-2 bg-[#18C36A] text-white font-bold rounded-xl py-3 hover:bg-[#16B05E] transition-colors text-sm"
      >
        <PlusCircle size={18} />
        <span>{t('home.postPropertyFree')}</span>
      </button>
    </div>
  );
}
