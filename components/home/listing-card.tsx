import Image from 'next/image';
import { useTheme } from '@/lib/theme/theme-provider';

type ListingCardProps = {
  image: string;
  badge?: string;
  title: string;
  location: string;
  stats: string;
  rating: string;
  price: string;
  agency: string;
  accent: string;
  onPress?: () => void;
};

export function ListingCard({
  image,
  badge,
  title,
  location,
  stats,
  rating,
  price,
  agency,
  accent,
  onPress,
}: ListingCardProps) {
  const { colors } = useTheme();

  return (
    <div
      onClick={onPress}
      className="flex-shrink-0 w-64 rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow cursor-pointer border"
      style={{ backgroundColor: colors.surface, borderColor: colors.border }}
    >
      <div className="relative h-40">
        <Image
          src={image}
          alt={title}
          fill
          className="object-cover"
        />
        {badge && (
          <div className="absolute top-2 left-2 px-2 py-1 bg-white/95 backdrop-blur-sm rounded-full">
            <span className="text-[10px] font-bold text-gray-800">{badge}</span>
          </div>
        )}
        <div className="absolute top-2 right-2 px-2 py-0.5 bg-black/70 backdrop-blur-sm rounded-full flex items-center gap-1">
          <span className="text-[10px] font-bold text-white">★ {rating}</span>
        </div>
      </div>
      
      <div className="p-3">
        <h3 className="font-bold text-sm mb-0.5 line-clamp-1" style={{ color: colors.text }}>
          {title}
        </h3>
        <p className="text-xs mb-0.5" style={{ color: colors.textMuted }}>{location}</p>
        <p className="text-[10px] mb-2" style={{ color: colors.textMuted }}>{stats}</p>
        
        <div className="flex items-center justify-between pt-2 border-t" style={{ borderColor: colors.border }}>
          <div>
            <p className="text-[10px] mb-0.5" style={{ color: colors.textMuted }}>by {agency}</p>
            <p className="font-black text-sm" style={{ color: colors.text }}>{price}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
