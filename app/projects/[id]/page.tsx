'use client';

import { useState, use } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import {
  ChevronLeft,
  Heart,
  Building2,
  CalendarDays,
  BadgeCheck,
  CircleCheckBig,
  Star,
  ShieldCheck,
  Phone,
  MessageCircle,
  ClipboardList,
  MapPin,
  Camera,
} from 'lucide-react';
import { useTheme } from '@/lib/theme/theme-provider';
import { useI18n } from '@/lib/i18n/i18n-provider';

// Sample project data
const projectData: Record<string, any> = {
  'sunrise-residences': {
    id: 'sunrise-residences',
    title: 'Sunrise Residences',
    developer: 'Sunshine Developers PLC',
    location: 'Bole, Addis Ababa',
    price: 'From ETB 2,800,000',
    image: 'https://images.unsplash.com/photo-1484154218962-a197022b5858?auto=format&fit=crop&w=1400&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1484154218962-a197022b5858?auto=format&fit=crop&w=1400&q=80',
      'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1400&q=80',
      'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?auto=format&fit=crop&w=1400&q=80',
      'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=1400&q=80',
    ],
    units: '48 Units',
    completion: 'Dec 2026',
    status: 'Off-plan',
    about: 'Luxury residential complex with premium finishes and modern amenities in the heart of Bole. This development offers a range of unit types from 1BR to penthouses, with features like a swimming pool, gym, 24/7 security, parking, and landscaped gardens.',
    rating: '4.8',
    reviews: '24',
    unitTypes: ['1BR', '2BR', '3BR', 'Penthouse'],
    amenities: ['Swimming Pool', 'Fitness Center', '24/7 Security', 'Parking', 'Landscaped Gardens', 'Playground', 'Generator Backup'],
    phone: '+251911234567',
  },
  'tech-park-addis': {
    id: 'tech-park-addis',
    title: 'Tech Park Addis',
    developer: 'Modern Developments Ltd',
    location: 'CMC, Addis Ababa',
    price: 'From ETB 3,400,000',
    image: 'https://images.unsplash.com/photo-1460317442991-0ec209397118?auto=format&fit=crop&w=1400&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1460317442991-0ec209397118?auto=format&fit=crop&w=1400&q=80',
      'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1400&q=80',
      'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=1400&q=80',
      'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1400&q=80',
    ],
    units: '72 Units',
    completion: 'Jun 2027',
    status: 'Off-plan',
    about: 'Smart residential development with modern technology integration and excellent connectivity. Perfect for young professionals and tech-savvy families.',
    rating: '4.9',
    reviews: '18',
    unitTypes: ['1BR', '2BR', '3BR'],
    amenities: ['Smart Home Tech', 'Co-working Space', 'Gym', 'Security', 'Parking', 'Fiber Internet'],
    phone: '+251911234568',
  },
};

export default function ProjectDetailsPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = use(params);
  const router = useRouter();
  const { colors } = useTheme();
  const { t } = useI18n();

  const project = projectData[resolvedParams.id] || projectData['sunrise-residences'];
  
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [isSaved, setIsSaved] = useState(false);

  const handleBack = () => {
    router.back();
  };

  const handleCall = () => {
    if (project.phone) {
      window.location.href = `tel:${project.phone}`;
    }
  };

  const handleWhatsApp = () => {
    if (project.phone) {
      const message = encodeURIComponent(`Hi, I'm interested in ${project.title}`);
      window.open(`https://wa.me/${project.phone.replace(/\+/g, '')}?text=${message}`, '_blank');
    }
  };

  return (
    <div className="flex-1" style={{ backgroundColor: colors.background }}>
      <div className="max-w-7xl mx-auto">
        {/* Desktop: Two Column Layout, Mobile: Single Column */}
        <div className="lg:grid lg:grid-cols-[1fr,400px] lg:gap-6 lg:p-6">
          
          {/* Left Column: Images, Description, Amenities */}
          <div className="space-y-4">
            
            {/* Hero Image */}
            <div className="relative h-64 lg:h-96 lg:rounded-2xl overflow-hidden bg-gray-900">
              <Image
                src={project.gallery[selectedImageIndex]}
                alt={project.title}
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 60vw, 50vw"
                className="object-cover"
                priority
              />

              {/* Top Actions Bar */}
              <div className="absolute top-3 left-3 right-3 flex items-center justify-between z-10">
                <button
                  onClick={handleBack}
                  className="w-9 h-9 rounded-full flex items-center justify-center transition-transform active:scale-95"
                  style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}
                >
                  <ChevronLeft size={20} className="text-white" strokeWidth={2.5} />
                </button>

                <button
                  onClick={() => setIsSaved(!isSaved)}
                  className="w-9 h-9 rounded-full flex items-center justify-center transition-transform active:scale-95"
                  style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}
                >
                  <Heart
                    size={18}
                    className={isSaved ? 'text-red-500 fill-red-500' : 'text-white'}
                    strokeWidth={2.5}
                  />
                </button>
              </div>

              {/* Image Counter */}
              <div className="absolute top-3 left-1/2 -translate-x-1/2 flex items-center gap-2 bg-black bg-opacity-70 rounded-xl px-3 py-1.5 z-10">
                <Camera size={14} className="text-white" />
                <span className="text-xs font-bold text-white">
                  {selectedImageIndex + 1} / {project.gallery.length}
                </span>
              </div>

              {/* Dots Indicator */}
              <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5 z-10">
                {project.gallery.map((_: any, index: number) => (
                  <div
                    key={index}
                    className={`h-1.5 rounded-full transition-all ${
                      index === selectedImageIndex ? 'w-5 bg-white' : 'w-1.5 bg-white bg-opacity-50'
                    }`}
                  />
                ))}
              </div>
            </div>

            {/* Thumbnail Gallery */}
            <div className="flex gap-2 overflow-x-auto px-4 lg:px-0 scrollbar-hide">
              {project.gallery.map((image: string, index: number) => (
                <button
                  key={index}
                  onClick={() => setSelectedImageIndex(index)}
                  className="flex-shrink-0 w-20 h-20 rounded-xl overflow-hidden border-2 transition-all"
                  style={{
                    borderColor: index === selectedImageIndex ? colors.activeText : 'transparent',
                  }}
                >
                  <Image
                    src={image}
                    alt={`Gallery ${index + 1}`}
                    width={80}
                    height={80}
                    className="object-cover w-full h-full"
                  />
                </button>
              ))}
            </div>

            {/* Mobile: Title & Price (Desktop: In Sidebar) */}
            <div className="lg:hidden px-4 space-y-1">
              <h1 className="text-xl font-black" style={{ color: colors.text }}>
                {project.title}
              </h1>
              <div className="flex items-center gap-1.5">
                <MapPin size={14} className="text-green-600" />
                <span className="text-sm font-semibold" style={{ color: colors.textMuted }}>
                  {project.location}
                </span>
              </div>
              <div className="text-xl font-black mt-1" style={{ color: colors.activeText }}>
                {project.price}
              </div>
              <p className="text-xs font-medium" style={{ color: colors.textMuted }}>
                30% down · {project.status.toLowerCase()} plan
              </p>
            </div>

            {/* Stats Row */}
            <div className="grid grid-cols-3 gap-3 px-4 lg:px-0">
              <div className="flex flex-col items-center justify-center rounded-xl py-4 border min-h-[90px]" style={{ backgroundColor: colors.activeSurface, borderColor: colors.border }}>
                <Building2 size={18} className="text-green-600" />
                <span className="text-sm font-black mt-2" style={{ color: colors.text }}>{project.units}</span>
                <span className="text-xs font-bold mt-1 text-center" style={{ color: colors.textMuted }}>Units</span>
              </div>
              <div className="flex flex-col items-center justify-center rounded-xl py-4 border min-h-[90px]" style={{ backgroundColor: colors.activeSurface, borderColor: colors.border }}>
                <CalendarDays size={18} className="text-green-600" />
                <span className="text-sm font-black mt-2" style={{ color: colors.text }}>{project.completion}</span>
                <span className="text-xs font-bold mt-1 text-center" style={{ color: colors.textMuted }}>Completion</span>
              </div>
              <div className="flex flex-col items-center justify-center rounded-xl py-4 border min-h-[90px]" style={{ backgroundColor: colors.activeSurface, borderColor: colors.border }}>
                <BadgeCheck size={18} className="text-green-600" />
                <span className="text-sm font-black mt-2" style={{ color: colors.text }}>{project.status}</span>
                <span className="text-xs font-bold mt-1 text-center" style={{ color: colors.textMuted }}>Status</span>
              </div>
            </div>

            {/* Unit Types */}
            <div className="mx-4 lg:mx-0 p-4 rounded-2xl border" style={{ backgroundColor: colors.surface, borderColor: colors.border }}>
              <h2 className="text-sm font-black mb-3" style={{ color: colors.text }}>Unit Types</h2>
              <div className="flex flex-wrap gap-2">
                {project.unitTypes.map((type: string) => (
                  <div
                    key={type}
                    className="px-3 py-1.5 rounded-full"
                    style={{ backgroundColor: colors.activeSurface }}
                  >
                    <span className="text-xs font-black" style={{ color: colors.activeText }}>
                      {type}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Amenities */}
            <div className="mx-4 lg:mx-0 p-4 rounded-2xl border" style={{ backgroundColor: colors.surface, borderColor: colors.border }}>
              <h2 className="text-sm font-black mb-3" style={{ color: colors.text }}>Amenities</h2>
              <div className="space-y-2">
                {project.amenities.map((amenity: string) => (
                  <div key={amenity} className="flex items-center gap-2">
                    <CircleCheckBig size={16} className="text-green-600 flex-shrink-0" />
                    <span className="text-sm font-semibold" style={{ color: colors.text }}>
                      {amenity}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* About Project */}
            <div className="mx-4 lg:mx-0 p-4 rounded-2xl border" style={{ backgroundColor: colors.surface, borderColor: colors.border }}>
              <h2 className="text-sm font-black mb-3" style={{ color: colors.text }}>
                About This Project
              </h2>
              <p className="text-sm leading-relaxed" style={{ color: colors.textMuted }}>
                {project.about}
              </p>
            </div>
          </div>

          {/* Right Sidebar (Desktop Only) */}
          <div className="hidden lg:block lg:sticky lg:top-20 lg:h-fit space-y-4">
            
            {/* Project Info Card */}
            <div className="p-5 rounded-2xl border" style={{ backgroundColor: colors.surface, borderColor: colors.border }}>
              <h1 className="text-2xl font-black mb-2" style={{ color: colors.text }}>
                {project.title}
              </h1>
              <div className="flex items-center gap-2 mb-3">
                <MapPin size={16} className="text-green-600" />
                <span className="text-sm font-semibold" style={{ color: colors.textMuted }}>
                  {project.location}
                </span>
              </div>
              <div className="text-2xl font-black mb-1" style={{ color: colors.activeText }}>
                {project.price}
              </div>
              <p className="text-sm font-medium" style={{ color: colors.textMuted }}>
                30% down · {project.status.toLowerCase()} plan
              </p>
            </div>

            {/* Developer Card */}
            <div className="p-5 rounded-2xl border" style={{ backgroundColor: colors.surface, borderColor: colors.border }}>
              <div className="flex items-center gap-3">
                <div className="w-11 h-11 rounded-xl flex items-center justify-center text-white font-black" style={{ backgroundColor: colors.activeText }}>
                  S
                </div>
                <div className="flex-1">
                  <h4 className="text-sm font-black" style={{ color: colors.text }}>{project.developer}</h4>
                  <div className="flex items-center gap-2 mt-1">
                    <div className="flex gap-0.5">
                      {[0, 1, 2, 3, 4].map((star) => (
                        <Star key={star} size={12} className="text-amber-500 fill-amber-500" />
                      ))}
                    </div>
                    <span className="text-xs font-bold" style={{ color: colors.textMuted }}>
                      {project.rating} ({project.reviews})
                    </span>
                  </div>
                </div>
                <ShieldCheck size={18} className="text-green-600" />
              </div>
            </div>

            {/* Action Buttons */}
            <div className="space-y-3">
              <div className="grid grid-cols-2 gap-3">
                <button
                  onClick={handleCall}
                  className="flex items-center justify-center gap-2 py-3 rounded-xl font-black text-sm text-white transition-transform active:scale-98"
                  style={{ backgroundColor: colors.activeText }}
                >
                  <Phone size={16} strokeWidth={2.5} />
                  <span>Call</span>
                </button>
                <button
                  onClick={handleWhatsApp}
                  className="flex items-center justify-center gap-2 py-3 rounded-xl font-black text-sm border transition-transform active:scale-98"
                  style={{ backgroundColor: colors.activeSurface, borderColor: colors.activeText, color: colors.activeText }}
                >
                  <MessageCircle size={16} strokeWidth={2.5} />
                  <span>WhatsApp</span>
                </button>
              </div>

              <button className="w-full flex items-center justify-center gap-2 py-3 rounded-xl font-black text-sm border transition-transform active:scale-98" style={{ backgroundColor: colors.surface, borderColor: colors.border, color: colors.text }}>
                <ClipboardList size={18} strokeWidth={2} style={{ color: colors.textMuted }} />
                <span>Request Advisor</span>
              </button>
            </div>
          </div>

          {/* Mobile: Developer & Actions (Below content) */}
          <div className="lg:hidden space-y-3 px-4 pb-24">
            <div className="p-4 rounded-2xl border" style={{ backgroundColor: colors.surface, borderColor: colors.border }}>
              <div className="flex items-center gap-3">
                <div className="w-11 h-11 rounded-xl flex items-center justify-center text-white font-black" style={{ backgroundColor: colors.activeText }}>
                  S
                </div>
                <div className="flex-1">
                  <h4 className="text-sm font-black" style={{ color: colors.text }}>{project.developer}</h4>
                  <div className="flex items-center gap-2 mt-1">
                    <div className="flex gap-0.5">
                      {[0, 1, 2, 3, 4].map((star) => (
                        <Star key={star} size={12} className="text-amber-500 fill-amber-500" />
                      ))}
                    </div>
                    <span className="text-xs font-bold" style={{ color: colors.textMuted }}>
                      {project.rating} ({project.reviews})
                    </span>
                  </div>
                </div>
                <ShieldCheck size={18} className="text-green-600" />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <button
                onClick={handleCall}
                className="flex items-center justify-center gap-2 py-3 rounded-xl font-black text-sm text-white transition-transform active:scale-98"
                style={{ backgroundColor: colors.activeText }}
              >
                <Phone size={16} strokeWidth={2.5} />
                <span>Call</span>
              </button>
              <button
                onClick={handleWhatsApp}
                className="flex items-center justify-center gap-2 py-3 rounded-xl font-black text-sm border transition-transform active:scale-98"
                style={{ backgroundColor: colors.activeSurface, borderColor: colors.activeText, color: colors.activeText }}
              >
                <MessageCircle size={16} strokeWidth={2.5} />
                <span>WhatsApp</span>
              </button>
            </div>

            <button className="w-full flex items-center justify-center gap-2 py-3 rounded-xl font-black text-sm border transition-transform active:scale-98" style={{ backgroundColor: colors.surface, borderColor: colors.border, color: colors.text }}>
              <ClipboardList size={18} strokeWidth={2} style={{ color: colors.textMuted }} />
              <span>Request Advisor</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
