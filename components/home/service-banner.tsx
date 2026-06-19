import Image from 'next/image';
import { LucideIcon } from 'lucide-react';

type ServiceBannerProps = {
  backgroundColor: string;
  icon: LucideIcon;
  title: string;
  subtitle: string;
  image: string;
  size?: 'full' | 'half';
  onPress?: () => void;
};

export function ServiceBanner({
  backgroundColor,
  icon: Icon,
  title,
  subtitle,
  image,
  size = 'full',
  onPress,
}: ServiceBannerProps) {
  const isHalf = size === 'half';
  
  return (
    <div
      onClick={onPress}
      className={`
        relative overflow-hidden rounded-xl cursor-pointer group
        ${isHalf ? 'h-36' : 'h-44'}
      `}
      style={{ backgroundColor }}
    >
      <div className="absolute inset-0">
        <Image
          src={image}
          alt={title}
          fill
          className="object-cover opacity-30 group-hover:opacity-40 transition-opacity"
        />
      </div>
      
      <div className="relative h-full p-4 flex flex-col justify-between text-white">
        <Icon size={24} strokeWidth={2} />
        
        <div>
          <h3 className="font-black text-base mb-0.5">{title}</h3>
          <p className="text-xs font-semibold text-white/90">{subtitle}</p>
        </div>
      </div>
    </div>
  );
}
