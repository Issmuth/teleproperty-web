'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Heart, MapPin, Bed, Bath, Square, Lock, BadgeCheck, Star } from 'lucide-react';
import { useTheme } from '@/lib/theme/theme-provider';
import { usePropertySaved } from '@/lib/hooks/use-saved-properties';

type PropertyCardProps = {
  id: string;
  title: string;
  location: string;
  age: string;
  price: string;
  beds: number;
  baths: number;
  area: number;
  featured: boolean;
  forSale: boolean;
  verified: boolean;
  image: string;
};

export function PropertyCard({
  id,
  title,
  location,
  age,
  price,
  beds,
  baths,
  area,
  featured,
  forSale,
  verified,
  image,
}: PropertyCardProps) {
  const { colors } = useTheme();
  const { isSaved, toggleSaved } = usePropertySaved(id);

  const handleToggleSave = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    toggleSaved({
      id,
      title,
      location,
      price,
      image,
      type: 'property',
    });
  };

  return (
    <Link 
      href={`/property/${id}`}
      className="rounded-lg border overflow-hidden hover:shadow-lg transition-shadow cursor-pointer block" 
      style={{ backgroundColor: colors.surface, borderColor: colors.border }}
    >
      <div className="relative h-36">
        <Image
          src={image}
          alt={title}
          fill
          className="object-cover"
        />
        
        {/* Top left badges */}
        <div className="absolute top-2 left-2 flex gap-1">
          {featured && (
            <div className="flex items-center gap-0.5 px-1.5 py-0.5 bg-[#FBA100] rounded-md">
              <Star size={9} className="text-white fill-white" />
              <span className="text-[9px] font-bold text-white">Featured</span>
            </div>
          )}
          {forSale && (
            <div className="px-1.5 py-0.5 bg-[#10B981] rounded-md">
              <span className="text-[9px] font-bold text-white">For Sale</span>
            </div>
          )}
          {verified && (
            <div className="flex items-center gap-0.5 px-1.5 py-0.5 bg-white rounded-md">
              <BadgeCheck size={10} className="text-[#0B8F55]" />
              <span className="text-[9px] font-bold text-[#0A7A4A]">Verified</span>
            </div>
          )}
        </div>

        {/* Heart button */}
        <button 
          onClick={handleToggleSave}
          className="absolute top-2 right-2 w-6 h-6 rounded-full bg-white flex items-center justify-center hover:bg-gray-100 transition-all active:scale-95"
        >
          <Heart 
            size={13} 
            className={isSaved ? "text-red-500 fill-red-500" : "text-gray-500"} 
          />
        </button>

        {/* Price tag */}
        <div className="absolute bottom-2 right-2 px-2 py-0.5 bg-black/70 backdrop-blur-sm rounded-lg">
          <span className="text-xs font-black text-white">{price}</span>
        </div>
      </div>

      <div className="p-3 space-y-2">
        <h3 className="text-sm font-bold line-clamp-1" style={{ color: colors.text }}>{title}</h3>

        <div className="flex items-center gap-1.5">
          <MapPin size={11} className="text-[#18C36A] flex-shrink-0" />
          <span className="text-xs font-medium flex-1 line-clamp-1" style={{ color: colors.textMuted }}>{location}</span>
          <span className="px-1.5 py-0.5 rounded text-[10px] font-semibold flex-shrink-0" style={{ backgroundColor: colors.surfaceMuted, color: colors.textMuted }}>
            {age}
          </span>
        </div>

        <div className="flex items-center gap-2.5">
          <div className="flex items-center gap-1">
            <Bed size={12} style={{ color: colors.iconMuted }} />
            <span className="text-xs font-semibold" style={{ color: colors.textMuted }}>{beds}</span>
          </div>
          <div className="flex items-center gap-1">
            <Bath size={12} style={{ color: colors.iconMuted }} />
            <span className="text-xs font-semibold" style={{ color: colors.textMuted }}>{baths}</span>
          </div>
          <div className="flex items-center gap-1">
            <Square size={12} style={{ color: colors.iconMuted }} />
            <span className="text-xs font-semibold" style={{ color: colors.textMuted }}>{area}m²</span>
          </div>
        </div>

        <button className="w-full flex items-center justify-center gap-1 py-2 bg-[#0B8F55] rounded-lg hover:bg-[#0A7A4A] transition-colors">
          <Lock size={12} className="text-white" />
          <span className="text-xs font-bold text-white">Subscribe to View</span>
        </button>
      </div>
    </Link>
  );
}
