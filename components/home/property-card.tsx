import Image from 'next/image';
import { useTheme } from '@/lib/theme/theme-provider';

type PropertyCardProps = {
  image: string;
  title: string;
  location: string;
  price: string;
};

export function PropertyCard({ image, title, location, price }: PropertyCardProps) {
  const { colors } = useTheme();

  return (
    <div className="flex-shrink-0 w-44 rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow cursor-pointer border" style={{ backgroundColor: colors.surface, borderColor: colors.border }}>
      <div className="relative h-32">
        <Image
          src={image}
          alt={title}
          fill
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
    </div>
  );
}
