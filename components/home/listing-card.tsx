import Image from 'next/image';
import { useTheme } from '@/lib/theme/theme-provider';
import { Tag } from '@/components/common/tag';

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
    <article
      onClick={onPress}
      className="flex-shrink-0 w-64 rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow cursor-pointer border"
      style={{ backgroundColor: colors.surface, borderColor: colors.border }}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          onPress?.();
        }
      }}
      aria-label={`${title} in ${location}, ${stats}, ${price}, ${badge || ''} project by ${agency}, rated ${rating} stars`}
    >
      <div className="relative h-40">
        <Image
          src={image}
          alt={`${title} - project development rendering`}
          fill
          sizes="256px"
          className="object-cover"
        />
        {badge && (
          <div className="absolute top-2 left-2">
            <Tag variant="custom" customBg="rgba(255, 255, 255, 0.95)" customColor="#1F2937" size="sm">
              {badge}
            </Tag>
          </div>
        )}
        <div className="absolute top-2 right-2">
          <Tag variant="custom" customBg="rgba(0, 0, 0, 0.7)" customColor="#FFFFFF" size="sm">
            ★ {rating}
          </Tag>
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
    </article>
  );
}
