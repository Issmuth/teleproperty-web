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
        relative overflow-hidden rounded-2xl cursor-pointer group
        ${isHalf ? 'h-48' : 'h-56'}
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
      
      <div className="relative h-full p-6 flex flex-col justify-between text-white">
        <Icon size={32} strokeWidth={2} />
        
        <div>
          <h3 className="font-black text-lg mb-1">{title}</h3>
          <p className="text-sm font-semibold text-white/90">{subtitle}</p>
        </div>
      </div>
    </div>
  );
}
