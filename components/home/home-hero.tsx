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
    <div className="space-y-4">
      {/* Hero gradient section */}
      <div className="bg-gradient-to-br from-[#064E3B] via-[#065F46] to-[#14532D] rounded-2xl lg:rounded-3xl p-6 lg:p-8 text-white">
        <div className="mb-4">
          <p className="text-sm font-black text-white/90 tracking-wide">
            ET TELEPROPERTY FINDER
          </p>
        </div>
        
        <div className="mb-6">
          <h1 className="text-3xl lg:text-5xl font-black tracking-tight mb-2">
            ONE STOP SHOP
          </h1>
          <p className="text-base lg:text-lg font-bold text-white/90">
            For All Your Property Needs
          </p>
        </div>

        {/* Segmented control */}
        <div className="flex gap-2 bg-white/10 backdrop-blur-sm p-1.5 rounded-xl">
          {segments.map((segment) => (
            <button
              key={segment.key}
              onClick={() => onSegmentChange(segment.key)}
              className={`
                flex-1 py-2.5 px-4 rounded-lg font-bold text-sm transition-all
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
      <div className="flex gap-2 lg:gap-3">
        <div className="flex-1 flex items-center gap-3 bg-white border border-gray-200 rounded-xl lg:rounded-2xl px-4 py-3 shadow-sm">
          <Search size={20} className="text-gray-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => onSearchQueryChange?.(e.target.value)}
            placeholder="Search city, area..."
            className="flex-1 outline-none text-sm lg:text-base"
          />
          <button
            onClick={onFilterPress}
            className="text-sm font-bold text-[#0B8F55] hover:text-[#0A7A4A]"
          >
            Filters
          </button>
        </div>
        
        <button
          onClick={onSearchPress}
          className="px-6 lg:px-8 py-3 bg-[#0B8F55] text-white font-bold rounded-xl lg:rounded-2xl hover:bg-[#0A7A4A] transition-colors text-sm lg:text-base"
        >
          Search
        </button>
      </div>

      {/* Post property button */}
      <button
        onClick={onPostPress}
        className="w-full flex items-center justify-center gap-3 bg-[#18C36A] text-white font-bold rounded-xl lg:rounded-2xl py-3.5 hover:bg-[#16B05E] transition-colors"
      >
        <PlusCircle size={20} />
        <span>Post Property FREE</span>
      </button>
    </div>
  );
}
