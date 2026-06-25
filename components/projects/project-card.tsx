'use client';

import Image from 'next/image';
import Link from 'next/link';
import { CircleCheckBig, Sparkles, MapPin, ArrowRight, Heart } from 'lucide-react';
import { useTheme } from '@/lib/theme/theme-provider';
import { usePropertySaved } from '@/lib/hooks/use-saved-properties';
import { Tag } from '@/components/common/tag';

type ProjectCardProps = {
  id: string;
  badge: string;
  title: string;
  developer: string;
  price: string;
  location: string;
  image: string;
  featured?: boolean;
};

export function ProjectCard({
  id,
  badge,
  title,
  developer,
  price,
  location,
  image,
  featured = false,
}: ProjectCardProps) {
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
      type: 'project',
    });
  };

  return (
    <Link 
      href={`/projects/${id}`}
      className="block rounded-lg border overflow-hidden hover:shadow-lg transition-all" 
      style={{ backgroundColor: colors.surface, borderColor: colors.border }}
    >
      <div className="relative h-36">
        <Image
          src={image}
          alt={title}
          fill
          className="object-cover"
        />
        
        <div className="absolute top-2 left-2 flex gap-1">
          <Tag 
            variant="custom" 
            customBg="rgba(255, 255, 255, 0.98)" 
            customColor="#0F9D58"
            size="sm"
            icon={CircleCheckBig}
            className="shadow-md"
          >
            {badge}
          </Tag>
          {featured && (
            <Tag 
              variant="custom" 
              customBg="rgba(255, 237, 213, 0.98)" 
              customColor="#B45309"
              size="sm"
              icon={Sparkles}
              className="shadow-md"
            >
              Featured
            </Tag>
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
      </div>

      <div className="p-3 space-y-2">
        <div className="space-y-0.5">
          <h3 className="text-sm font-black leading-tight" style={{ color: colors.text }}>{title}</h3>
          <p className="text-xs font-semibold" style={{ color: colors.textMuted }}>{developer}</p>
          <div className="flex items-center gap-1 mt-1">
            <MapPin size={10} style={{ color: colors.iconMuted }} />
            <span className="text-[10px] font-semibold" style={{ color: colors.textMuted }}>{location}</span>
          </div>
        </div>

        <div className="flex items-center justify-between pt-1">
          <span className="text-xs font-black text-[#0B8F55]">{price}</span>
          <div className="flex items-center gap-1 px-2.5 py-1.5 bg-[#ECFDF5] rounded-lg hover:bg-[#D1FAE5] transition-colors">
            <span className="text-[10px] font-black text-[#0B8F55]">View</span>
            <ArrowRight size={11} className="text-[#0B8F55]" strokeWidth={3} />
          </div>
        </div>
      </div>
    </Link>
  );
}
