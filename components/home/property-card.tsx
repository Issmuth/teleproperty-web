import Image from 'next/image';

type PropertyCardProps = {
  image: string;
  title: string;
  location: string;
  price: string;
};

export function PropertyCard({ image, title, location, price }: PropertyCardProps) {
  return (
    <div className="flex-shrink-0 w-56 bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow cursor-pointer border border-gray-100">
      <div className="relative h-40">
        <Image
          src={image}
          alt={title}
          fill
          className="object-cover"
        />
      </div>
      
      <div className="p-3">
        <h3 className="font-bold text-sm text-gray-900 mb-1 line-clamp-1">
          {title}
        </h3>
        <p className="text-xs text-gray-600 mb-2">{location}</p>
        <p className="font-black text-sm text-gray-900">{price}</p>
      </div>
    </div>
  );
}
