import Image from 'next/image';

type PropertyCardProps = {
  image: string;
  title: string;
  location: string;
  price: string;
};

export function PropertyCard({ image, title, location, price }: PropertyCardProps) {
  return (
    <div className="flex-shrink-0 w-44 bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow cursor-pointer border border-gray-100">
      <div className="relative h-32">
        <Image
          src={image}
          alt={title}
          fill
          className="object-cover"
        />
      </div>
      
      <div className="p-2.5">
        <h3 className="font-bold text-xs text-gray-900 mb-0.5 line-clamp-1">
          {title}
        </h3>
        <p className="text-[10px] text-gray-600 mb-1.5">{location}</p>
        <p className="font-black text-xs text-gray-900">{price}</p>
      </div>
    </div>
  );
}
