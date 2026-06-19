'use client';

import { Search, PlusCircle } from 'lucide-react';
import { useState } from 'react';

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
  return (
    <div className="space-y-3">
      {/* Hero gradient section */}
      <div className="bg-gradient-to-br from-[#064E3B] via-[#065F46] to-[#14532D] rounded-xl lg:rounded-2xl p-4 lg:p-6 text-white">
        <div className="mb-3">
          <p className="text-xs font-black text-white/90 tracking-wide">
            ET TELEPROPERTY FINDER
          </p>
        </div>
        
        <div className="mb-4">
          <h1 className="text-2xl lg:text-4xl font-black tracking-tight mb-1">
            ONE STOP SHOP
          </h1>
          <p className="text-sm lg:text-base font-bold text-white/90">
            For All Your Property Needs
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

      {/* Search bar */}
      <div className="flex gap-2">
        <div className="flex-1 flex items-center gap-2 bg-white border border-gray-200 rounded-xl px-3 py-2.5 shadow-sm">
          <Search size={18} className="text-gray-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => onSearchQueryChange?.(e.target.value)}
            placeholder="Search city, area..."
            className="flex-1 outline-none text-sm"
          />
          <button
            onClick={onFilterPress}
            className="text-xs font-bold text-[#0B8F55] hover:text-[#0A7A4A]"
          >
            Filters
          </button>
        </div>
        
        <button
          onClick={onSearchPress}
          className="px-5 py-2.5 bg-[#0B8F55] text-white font-bold rounded-xl hover:bg-[#0A7A4A] transition-colors text-sm"
        >
          Search
        </button>
      </div>

      {/* Post property button */}
      <button
        onClick={onPostPress}
        className="w-full flex items-center justify-center gap-2 bg-[#18C36A] text-white font-bold rounded-xl py-3 hover:bg-[#16B05E] transition-colors text-sm"
      >
        <PlusCircle size={18} />
        <span>Post Property FREE</span>
      </button>
    </div>
  );
}
