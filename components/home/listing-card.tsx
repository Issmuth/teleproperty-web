import Image from 'next/image';

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
  return (
    <div
      onClick={onPress}
      className="flex-shrink-0 w-72 bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-shadow cursor-pointer border border-gray-100"
    >
      <div className="relative h-48">
        <Image
          src={image}
          alt={title}
          fill
          className="object-cover"
        />
        {badge && (
          <div className="absolute top-3 left-3 px-3 py-1.5 bg-white/95 backdrop-blur-sm rounded-full">
            <span className="text-xs font-bold text-gray-800">{badge}</span>
          </div>
        )}
        <div className="absolute top-3 right-3 px-2.5 py-1 bg-black/70 backdrop-blur-sm rounded-full flex items-center gap-1">
          <span className="text-xs font-bold text-white">★ {rating}</span>
        </div>
      </div>
      
      <div className="p-4">
        <h3 className="font-bold text-base text-gray-900 mb-1 line-clamp-1">
          {title}
        </h3>
        <p className="text-sm text-gray-600 mb-1">{location}</p>
        <p className="text-xs text-gray-500 mb-3">{stats}</p>
        
        <div className="flex items-center justify-between pt-3 border-t border-gray-100">
          <div>
            <p className="text-xs text-gray-500 mb-0.5">by {agency}</p>
            <p className="font-black text-base text-gray-900">{price}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
