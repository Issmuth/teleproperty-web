import Image from 'next/image';
import { CircleCheckBig, Sparkles, MapPin, ArrowRight } from 'lucide-react';

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
  badge,
  title,
  developer,
  price,
  location,
  image,
  featured = false,
}: ProjectCardProps) {
  return (
    <div className="bg-white rounded-lg border border-gray-200 overflow-hidden hover:shadow-lg transition-all cursor-pointer">
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
          <h3 className="text-sm font-black text-gray-900 leading-tight">{title}</h3>
          <p className="text-xs font-semibold text-gray-600">{developer}</p>
          <div className="flex items-center gap-1 mt-1">
            <MapPin size={10} className="text-gray-500" />
            <span className="text-[10px] font-semibold text-gray-600">{location}</span>
          </div>
        </div>

        <div className="flex items-center justify-between pt-1">
          <span className="text-xs font-black text-[#0B8F55]">{price}</span>
          <button className="flex items-center gap-1 px-2.5 py-1.5 bg-[#ECFDF5] rounded-lg hover:bg-[#D1FAE5] transition-colors">
            <span className="text-[10px] font-black text-[#0B8F55]">View</span>
            <ArrowRight size={11} className="text-[#0B8F55]" strokeWidth={3} />
          </button>
        </div>
      </div>
    </div>
  );
}
