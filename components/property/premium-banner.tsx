'use client';

import { X } from 'lucide-react';
import { useState } from 'react';
import { Tag } from '@/components/common/tag';

export function PremiumBanner() {
  const [visible, setVisible] = useState(true);

  if (!visible) return null;

  return (
    <div className="px-4 lg:px-8 mt-4">
      <div className="rounded-xl overflow-hidden bg-gradient-to-br from-[#F97316] to-[#EA580C] relative">
      <button
        onClick={() => setVisible(false)}
        className="absolute top-2 right-2 w-6 h-6 rounded-full bg-white/20 hover:bg-white/30 flex items-center justify-center transition-colors z-10"
      >
        <X size={14} className="text-white" />
      </button>

      <div className="p-4">
        <Tag 
          variant="custom" 
          customBg="rgba(255, 255, 255, 0.2)" 
          customColor="rgba(255, 255, 255, 0.9)"
          size="sm"
          className="uppercase tracking-wide mb-1"
        >
          Teleproperty Premium
        </Tag>
        <h3 className="text-white text-base font-black mb-1">
          Premium Property Listings
        </h3>
        <p className="text-white/90 text-xs font-medium mb-3 max-w-[90%]">
          Get featured placement and reach 10K+ buyers daily
        </p>
        <button className="px-3 py-2 bg-white rounded-lg hover:bg-gray-100 transition-colors">
          <span className="text-xs font-black text-gray-900">Post Premium</span>
        </button>
      </div>
      </div>
    </div>
  );
}
