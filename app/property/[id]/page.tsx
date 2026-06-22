'use client';

import { useState, use } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import {
  ChevronLeft,
  Heart,
  Share2,
  Bed,
  Bath,
  Square,
  MapPin,
  Star,
  Lock,
  MessageCircleMore,
  Upload,
  Camera,
} from 'lucide-react';
import { useTheme } from '@/lib/theme/theme-provider';
import { useI18n } from '@/lib/i18n/i18n-provider';

// Sample property data
const propertyData: Record<string, any> = {
  '1': {
    id: '1',
    title: '5BR Executive Villa – Bole',
    location: 'Bole, Addis Ababa',
    price: 'ETB 9,500,000',
    image: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1400&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1400&q=80',
      'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?auto=format&fit=crop&w=1400&q=80',
      'https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=1400&q=80',
      'https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=1400&q=80',
    ],
    description: 'This premium property is located in one of Addis Ababa\'s most sought-after neighborhoods. Featuring modern architecture, quality finishes, and excellent access to transport, schools, and amenities. The property is fully verified and ready for immediate viewing.',
    beds: 5,
    baths: 4,
    area: 420,
    agentName: 'Samuel Tadesse',
    agentLabel: 'Verified Agent · Addis Ababa',
    rating: '4.9',
    reviewsCount: '42 reviews',
  },
  '2': {
    id: '2',
    title: 'Modern 3BR Apartment – Kazanchis',
    location: 'Kazanchis, Addis Ababa',
    price: 'ETB 4,200,000',
    image: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=1400&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=1400&q=80',
      'https://images.unsplash.com/photo-1494526585095-c41746248156?auto=format&fit=crop&w=1400&q=80',
      'https://images.unsplash.com/photo-1560185008-b033106af3d0?auto=format&fit=crop&w=1400&q=80',
      'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1400&q=80',
    ],
    description: 'A bright and efficient apartment with a smart layout, good natural light, and a convenient central location for everyday living.',
    beds: 3,
    baths: 2,
    area: 150,
    agentName: 'Amina Yusuf',
    agentLabel: 'Verified Agent · Addis Ababa',
    rating: '4.8',
    reviewsCount: '28 reviews',
  },
};

export default function PropertyDetailsPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = use(params);
  const router = useRouter();
  const { colors } = useTheme();
  const { t } = useI18n();

  const property = propertyData[resolvedParams.id] || propertyData['1'];
  
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [isSaved, setIsSaved] = useState(false);
  const [reviewText, setReviewText] = useState('');
  const [reviewRating, setReviewRating] = useState(0);

  const handleBack = () => {
    router.back();
  };

  const handleSubmitReview = () => {
    if (reviewText.trim() && reviewRating > 0) {
      console.log('Review submitted:', { rating: reviewRating, text: reviewText });
      setReviewText('');
      setReviewRating(0);
    }
  };

  return (
    <div className="flex-1" style={{ backgroundColor: colors.background }}>
      <div className="max-w-7xl mx-auto">
        {/* Desktop: Two Column Layout, Mobile: Single Column */}
        <div className="lg:grid lg:grid-cols-[1fr,400px] lg:gap-6 lg:p-6">
          
          {/* Left Column: Images, Description, Reviews */}
          <div className="space-y-4">
            
            {/* Hero Image */}
            <div className="relative h-80 lg:h-96 lg:rounded-2xl overflow-hidden">
              <Image
                src={property.gallery[selectedImageIndex]}
                alt={property.title}
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                className="object-cover"
                priority
                unoptimized
              />
              
              {/* Top Actions Bar */}
              <div className="absolute top-3 left-3 right-3 flex items-center justify-between">
                <button
                  onClick={handleBack}
                  className="w-10 h-10 rounded-full flex items-center justify-center transition-transform active:scale-95"
                  style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}
                >
                  <ChevronLeft size={22} className="text-white" strokeWidth={2.5} />
                </button>

                <div className="flex items-center gap-2">
                  <button
                    className="w-10 h-10 rounded-full flex items-center justify-center transition-transform active:scale-95"
                    style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}
                  >
                    <Share2 size={18} className="text-white" strokeWidth={2.5} />
                  </button>
                  <button
                    onClick={() => setIsSaved(!isSaved)}
                    className="w-10 h-10 rounded-full flex items-center justify-center transition-transform active:scale-95"
                    style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}
                  >
                    <Heart
                      size={18}
                      className={isSaved ? 'text-red-500 fill-red-500' : 'text-white'}
                      strokeWidth={2.5}
                    />
                  </button>
                </div>
              </div>

              {/* Image Counter */}
              <div className="absolute bottom-3 right-3 flex items-center gap-2 bg-black bg-opacity-70 rounded-xl px-3 py-1.5">
                <Camera size={14} className="text-white" />
                <span className="text-xs font-bold text-white">
                  {selectedImageIndex + 1} / {property.gallery.length}
                </span>
              </div>
            </div>

            {/* Thumbnail Gallery */}
            <div className="flex gap-2 overflow-x-auto px-4 lg:px-0 scrollbar-hide">
              {property.gallery.map((image: string, index: number) => (
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
            <div className="lg:hidden px-4 space-y-2">
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1">
                  <h1 className="text-xl font-black" style={{ color: colors.text }}>
                    {property.title}
                  </h1>
                  <div className="flex items-center gap-1.5 mt-2">
                    <MapPin size={14} className="text-green-600" />
                    <span className="text-sm font-medium" style={{ color: colors.textMuted }}>
                      {property.location}
                    </span>
                  </div>
                </div>
                <div className="text-lg font-black" style={{ color: colors.activeText }}>
                  {property.price}
                </div>
              </div>
            </div>

            {/* Stats Row */}
            <div className="grid grid-cols-3 gap-3 px-4 lg:px-0">
              <div className="flex flex-col items-center justify-center rounded-xl py-4 border" style={{ backgroundColor: colors.surfaceMuted, borderColor: colors.border }}>
                <Bed size={20} className="text-green-600" />
                <span className="text-lg font-black mt-2" style={{ color: colors.text }}>{property.beds}</span>
                <span className="text-xs font-bold mt-1" style={{ color: colors.textMuted }}>Bedrooms</span>
              </div>
              <div className="flex flex-col items-center justify-center rounded-xl py-4 border" style={{ backgroundColor: colors.surfaceMuted, borderColor: colors.border }}>
                <Bath size={20} className="text-green-600" />
                <span className="text-lg font-black mt-2" style={{ color: colors.text }}>{property.baths}</span>
                <span className="text-xs font-bold mt-1" style={{ color: colors.textMuted }}>Bathrooms</span>
              </div>
              <div className="flex flex-col items-center justify-center rounded-xl py-4 border" style={{ backgroundColor: colors.surfaceMuted, borderColor: colors.border }}>
                <Square size={20} className="text-green-600" />
                <span className="text-lg font-black mt-2" style={{ color: colors.text }}>{property.area} m²</span>
                <span className="text-xs font-bold mt-1" style={{ color: colors.textMuted }}>Area</span>
              </div>
            </div>

            {/* About Property */}
            <div className="mx-4 lg:mx-0 p-4 rounded-2xl border" style={{ backgroundColor: colors.surface, borderColor: colors.border }}>
              <h2 className="text-base font-black mb-3" style={{ color: colors.text }}>
                About This Property
              </h2>
              <p className="text-sm leading-relaxed" style={{ color: colors.textMuted }}>
                {property.description}
              </p>
            </div>

            {/* Reviews Section */}
            <div className="mx-4 lg:mx-0 p-4 rounded-2xl border space-y-4" style={{ backgroundColor: colors.surface, borderColor: colors.border }}>
              <div className="flex items-center justify-between">
                <h2 className="text-base font-black" style={{ color: colors.text }}>Reviews</h2>
                <div className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg" style={{ backgroundColor: 'rgba(245, 158, 11, 0.1)' }}>
                  <Star size={16} className="text-amber-500 fill-amber-500" />
                  <span className="text-sm font-black" style={{ color: colors.text }}>{property.rating}</span>
                </div>
              </div>

              {/* Write Review */}
              <div className="p-4 rounded-xl border space-y-3" style={{ backgroundColor: colors.surfaceMuted, borderColor: colors.border }}>
                <h3 className="text-sm font-black" style={{ color: colors.text }}>Write a Review</h3>
                
                <div className="flex gap-2">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      onClick={() => setReviewRating(star)}
                      className="transition-transform active:scale-95"
                    >
                      <Star
                        size={28}
                        className={star <= reviewRating ? 'text-amber-500 fill-amber-500' : 'text-amber-500'}
                        strokeWidth={2}
                      />
                    </button>
                  ))}
                </div>

                <textarea
                  value={reviewText}
                  onChange={(e) => setReviewText(e.target.value)}
                  placeholder="Share your experience with this property..."
                  className="w-full p-3 rounded-xl border text-sm resize-none"
                  style={{
                    backgroundColor: colors.surface,
                    borderColor: colors.border,
                    color: colors.text,
                    minHeight: '100px',
                  }}
                  rows={4}
                />

                <button
                  onClick={handleSubmitReview}
                  disabled={!reviewText.trim() || reviewRating === 0}
                  className="w-full flex items-center justify-center gap-2 py-3 rounded-xl font-black text-sm transition-all active:scale-98 disabled:opacity-50"
                  style={{
                    backgroundColor: reviewText.trim() && reviewRating > 0 ? colors.activeText : colors.surfaceMuted,
                    color: '#fff',
                  }}
                >
                  <MessageCircleMore size={16} />
                  <span>Submit Review</span>
                </button>
              </div>

              {/* No Reviews State */}
              <div className="p-6 rounded-xl border flex flex-col items-center gap-3 text-center" style={{ backgroundColor: colors.surface, borderColor: colors.border }}>
                <MessageCircleMore size={32} style={{ color: colors.textMuted }} />
                <p className="text-sm" style={{ color: colors.textMuted }}>
                  No reviews yet. Be the first to share your experience!
                </p>
              </div>
            </div>
          </div>

          {/* Right Sidebar (Desktop Only) */}
          <div className="hidden lg:block lg:sticky lg:top-20 lg:h-fit space-y-4">
            
            {/* Property Info Card */}
            <div className="p-5 rounded-2xl border" style={{ backgroundColor: colors.surface, borderColor: colors.border }}>
              <h1 className="text-2xl font-black mb-2" style={{ color: colors.text }}>
                {property.title}
              </h1>
              <div className="flex items-center gap-2 mb-4">
                <MapPin size={16} className="text-green-600" />
                <span className="text-sm font-medium" style={{ color: colors.textMuted }}>
                  {property.location}
                </span>
              </div>
              <div className="text-2xl font-black" style={{ color: colors.activeText }}>
                {property.price}
              </div>
            </div>

            {/* Agent Card */}
            <div className="p-5 rounded-2xl border" style={{ backgroundColor: colors.surface, borderColor: colors.border }}>
              <h3 className="text-base font-black mb-4" style={{ color: colors.text }}>Agent</h3>
              <div className="flex items-center gap-3">
                <div className="w-14 h-14 rounded-xl flex items-center justify-center text-white font-black" style={{ backgroundColor: colors.activeText }}>
                  AG
                </div>
                <div className="flex-1">
                  <h4 className="text-sm font-black" style={{ color: colors.text }}>{property.agentName}</h4>
                  <p className="text-xs font-medium mt-0.5" style={{ color: colors.textMuted }}>{property.agentLabel}</p>
                  <div className="flex items-center gap-2 mt-1.5">
                    <div className="flex gap-0.5">
                      {[0, 1, 2, 3, 4].map((star) => (
                        <Star key={star} size={12} className="text-amber-500 fill-amber-500" />
                      ))}
                    </div>
                    <span className="text-xs font-semibold" style={{ color: colors.textMuted }}>
                      ({property.reviewsCount})
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Contact Locked */}
            <div className="p-5 rounded-2xl border" style={{ backgroundColor: colors.surface, borderColor: colors.border }}>
              <div className="flex flex-col items-center gap-3 p-6 rounded-xl border border-dashed" style={{ borderColor: colors.border }}>
                <div className="w-14 h-14 rounded-full flex items-center justify-center" style={{ backgroundColor: colors.surfaceMuted }}>
                  <Lock size={24} style={{ color: colors.textMuted }} />
                </div>
                <h4 className="text-sm font-black text-center" style={{ color: colors.text }}>
                  Contact Details Locked
                </h4>
                <p className="text-xs text-center leading-relaxed" style={{ color: colors.textMuted }}>
                  Subscribe to unlock agent phone, WhatsApp & Telegram
                </p>
                <button className="w-full py-3 rounded-xl font-black text-sm text-white transition-transform active:scale-98" style={{ backgroundColor: colors.activeText }}>
                  Subscribe to Unlock →
                </button>
              </div>
            </div>
          </div>

          {/* Mobile: Agent & Contact (Below content) */}
          <div className="lg:hidden space-y-4 px-4 pb-24">
            <div className="p-4 rounded-2xl border" style={{ backgroundColor: colors.surface, borderColor: colors.border }}>
              <h3 className="text-base font-black mb-3" style={{ color: colors.text }}>Agent</h3>
              <div className="flex items-center gap-3">
                <div className="w-13 h-13 rounded-xl flex items-center justify-center text-white font-black text-base" style={{ backgroundColor: colors.activeText }}>
                  AG
                </div>
                <div className="flex-1">
                  <h4 className="text-sm font-black" style={{ color: colors.text }}>{property.agentName}</h4>
                  <p className="text-xs font-medium mt-0.5" style={{ color: colors.textMuted }}>{property.agentLabel}</p>
                  <div className="flex items-center gap-2 mt-1">
                    <div className="flex gap-0.5">
                      {[0, 1, 2, 3, 4].map((star) => (
                        <Star key={star} size={12} className="text-amber-500 fill-amber-500" />
                      ))}
                    </div>
                    <span className="text-xs font-semibold" style={{ color: colors.textMuted }}>
                      ({property.reviewsCount})
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <div className="p-4 rounded-2xl border" style={{ backgroundColor: colors.surface, borderColor: colors.border }}>
              <div className="flex flex-col items-center gap-3 p-6 rounded-xl border border-dashed" style={{ borderColor: colors.border }}>
                <div className="w-13 h-13 rounded-full flex items-center justify-center" style={{ backgroundColor: colors.surfaceMuted }}>
                  <Lock size={22} style={{ color: colors.textMuted }} />
                </div>
                <h4 className="text-sm font-black text-center" style={{ color: colors.text }}>
                  Contact Details Locked
                </h4>
                <p className="text-xs text-center leading-relaxed" style={{ color: colors.textMuted }}>
                  Subscribe to unlock agent phone, WhatsApp & Telegram
                </p>
                <button className="w-full py-3 rounded-xl font-black text-sm text-white transition-transform active:scale-98" style={{ backgroundColor: colors.activeText }}>
                  Subscribe to Unlock →
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
