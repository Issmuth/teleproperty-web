import Image from 'next/image';
import { useTheme } from '@/lib/theme/theme-provider';

type PropertyCardProps = {
  id?: string;
  image: string;
  title: string;
  location: string;
  price: string;
  onPress?: () => void;
};

export function PropertyCard({ image, title, location, price, onPress }: PropertyCardProps) {
  const { colors } = useTheme();

  return (
    <article 
      onClick={onPress}
      className="flex-shrink-0 w-44 rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow cursor-pointer border" 
      style={{ backgroundColor: colors.surface, borderColor: colors.border }}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          onPress?.();
        }
      }}
      aria-label={`${title} in ${location}, priced at ${price}`}
    >
      <div className="relative h-32">
        <Image
          src={image}
          alt={`${title} - property exterior view`}
          fill
          sizes="176px"
          className="object-cover"
        />
      </div>
      
      <div className="p-2.5">
        <h3 className="font-bold text-xs mb-0.5 line-clamp-1" style={{ color: colors.text }}>
          {title}
        </h3>
        <p className="text-[10px] mb-1.5" style={{ color: colors.textMuted }}>{location}</p>
        <p className="font-black text-xs" style={{ color: colors.text }}>{price}</p>
      </div>
    </article>
  );
}
