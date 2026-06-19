import Image from 'next/image';
import { Heart, MapPin, Bed, Bath, Square, Lock, BadgeCheck, Star } from 'lucide-react';

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
  return (
    <div className="bg-white rounded-lg border border-gray-200 overflow-hidden hover:shadow-lg transition-shadow cursor-pointer">
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
        <button className="absolute top-2 right-2 w-6 h-6 rounded-full bg-white flex items-center justify-center hover:bg-gray-100">
          <Heart size={13} className="text-gray-500" />
        </button>

        {/* Price tag */}
        <div className="absolute bottom-2 right-2 px-2 py-0.5 bg-black/70 backdrop-blur-sm rounded-lg">
          <span className="text-xs font-black text-white">{price}</span>
        </div>
      </div>

      <div className="p-3 space-y-2">
        <h3 className="text-sm font-bold text-gray-900 line-clamp-1">{title}</h3>

        <div className="flex items-center gap-1.5">
          <MapPin size={11} className="text-[#18C36A] flex-shrink-0" />
          <span className="text-xs font-medium text-gray-600 flex-1 line-clamp-1">{location}</span>
          <span className="px-1.5 py-0.5 bg-gray-100 rounded text-[10px] font-semibold text-gray-600 flex-shrink-0">
            {age}
          </span>
        </div>

        <div className="flex items-center gap-2.5">
          <div className="flex items-center gap-1">
            <Bed size={12} className="text-gray-500" />
            <span className="text-xs font-semibold text-gray-600">{beds}</span>
          </div>
          <div className="flex items-center gap-1">
            <Bath size={12} className="text-gray-500" />
            <span className="text-xs font-semibold text-gray-600">{baths}</span>
          </div>
          <div className="flex items-center gap-1">
            <Square size={12} className="text-gray-500" />
            <span className="text-xs font-semibold text-gray-600">{area}m²</span>
          </div>
        </div>

        <button className="w-full flex items-center justify-center gap-1 py-2 bg-[#0B8F55] rounded-lg hover:bg-[#0A7A4A] transition-colors">
          <Lock size={12} className="text-white" />
          <span className="text-xs font-bold text-white">Subscribe to View</span>
        </button>
      </div>
    </div>
  );
}
