import Image from 'next/image';
import Link from 'next/link';
import { CircleCheckBig, Sparkles, MapPin, ArrowRight } from 'lucide-react';
import { useTheme } from '@/lib/theme/theme-provider';

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
          <div className="flex items-center gap-0.5 px-2 py-0.5 bg-white/98 backdrop-blur-sm rounded-full shadow-md">
            <CircleCheckBig size={9} className="text-[#0F9D58]" />
            <span className="text-[9px] font-black text-[#0F9D58]">{badge}</span>
          </div>
          {featured && (
            <div className="flex items-center gap-0.5 px-2 py-0.5 bg-[#FFEDD5]/98 backdrop-blur-sm rounded-full shadow-md">
              <Sparkles size={9} className="text-[#B45309]" />
              <span className="text-[9px] font-black text-[#B45309]">Featured</span>
            </div>
          )}
        </div>
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
