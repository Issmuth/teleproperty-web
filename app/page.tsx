'use client';

import { useState } from 'react';
import { HomeHero } from '@/components/home/home-hero';
import { SectionHeader } from '@/components/home/section-header';
import { ListingCard } from '@/components/home/listing-card';
import { PropertyCard } from '@/components/home/property-card';
import { ServiceBanner } from '@/components/home/service-banner';
import { Search, Plus, Building2, Briefcase, ShieldCheck } from 'lucide-react';
import { useTheme } from '@/lib/theme/theme-provider';
import { useI18n } from '@/lib/i18n/i18n-provider';

const segments = [
  { key: 'buy', label: 'Buy' },
  { key: 'rent', label: 'Rent' },
  { key: 'projects', label: 'Projects' },
];

const featuredProjects = [
  {
    id: 'diamond-plaza',
    image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=900&q=80',
    badge: 'Under construction',
    title: 'Diamond Plaza Complex',
    location: 'Addis Ababa, Kazanchis',
    stats: '320+ units',
    rating: '4.9',
    price: 'From ETB 3.2M',
    agency: 'Elite Builders',
    accent: '#0B8F55',
  },
  {
    id: 'skyline-residence',
    image: 'https://images.unsplash.com/photo-1494526585095-c41746248156?auto=format&fit=crop&w=900&q=80',
    badge: 'Launch soon',
    title: 'Skyline Residence',
    location: 'Bole, Addis Ababa',
    stats: '180+ units',
    rating: '4.8',
    price: 'From ETB 2.7M',
    agency: 'Urban Nest',
    accent: '#1877F2',
  },
];

const featuredProperties = [
  {
    id: 'featured-property-1',
    image: 'https://images.unsplash.com/photo-1560185007-5f0bb1866cab?auto=format&fit=crop&w=900&q=80',
    title: 'Modern family villa',
    location: 'Megenagna, Addis Ababa',
    price: 'ETB 8.4M',
  },
  {
    id: 'featured-property-2',
    image: 'https://images.unsplash.com/photo-1572120360610-d971b9d7767c?auto=format&fit=crop&w=900&q=80',
    title: 'Garden apartment',
    location: 'CMC, Addis Ababa',
    price: 'ETB 4.1M',
  },
  {
    id: 'featured-property-3',
    image: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=900&q=80',
    title: 'Penthouse suite',
    location: '22, Addis Ababa',
    price: 'ETB 12.5M',
  },
];

export default function Home() {
  const [activeSegment, setActiveSegment] = useState('buy');
  const [searchQuery, setSearchQuery] = useState('');
  const { colors } = useTheme();
  const { t } = useI18n();

  const segments = [
    { key: 'buy', label: t('home.buy') },
    { key: 'rent', label: t('home.rent') },
    { key: 'projects', label: t('home.newProjects') },
  ];

  return (
    <div className="flex-1" style={{ backgroundColor: colors.background }}>
      <div className="max-w-5xl mx-auto px-4 lg:px-8 py-4 lg:py-6">
        {/* Hero Section */}
        <div className="mb-6">
          <HomeHero
            activeSegment={activeSegment}
            onSegmentChange={setActiveSegment}
            segments={segments}
            searchQuery={searchQuery}
            onSearchQueryChange={setSearchQuery}
            onFilterPress={() => console.log('Filters')}
            onPostPress={() => console.log('Post property')}
            onSearchPress={() => console.log('Search')}
          />
        </div>

        {/* Featured Projects */}
        <div className="mb-6">
          <div className="mb-3">
            <SectionHeader
              title={t('home.featuredProjects')}
              actionLabel={t('home.seeAll')}
              onActionPress={() => console.log('See all projects')}
            />
          </div>
          
          <div className="flex gap-3 overflow-x-auto pb-4 -mx-4 px-4 lg:mx-0 lg:px-0 scrollbar-hide">
            {featuredProjects.map((project) => (
              <ListingCard
                key={project.id}
                {...project}
                onPress={() => console.log('Project:', project.id)}
              />
            ))}
          </div>
        </div>

        {/* Featured Properties */}
        <div className="mb-6">
          <div className="mb-3">
            <SectionHeader
              title={t('home.featuredProperties')}
              actionLabel={t('home.browseAll')}
              onActionPress={() => console.log('Browse all properties')}
            />
          </div>
          
          <div className="flex gap-3 overflow-x-auto pb-4 -mx-4 px-4 lg:mx-0 lg:px-0 scrollbar-hide">
            {featuredProperties.map((property) => (
              <PropertyCard
                key={property.id}
                {...property}
              />
            ))}
          </div>
        </div>

        {/* All Services */}
        <div>
          <h2 className="text-base font-black mb-3" style={{ color: colors.text }}>
            {t('home.allServices')}
          </h2>

          <div className="space-y-3">
            {/* Search Property - Full width */}
            <ServiceBanner
              backgroundColor="#0B3C2A"
              icon={Search}
              title={t('home.services.searchProperty.title')}
              subtitle={t('home.services.searchProperty.subtitle')}
              image="https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=900&q=80"
              size="full"
              onPress={() => console.log('Search property')}
            />

            {/* Two columns grid - side by side on all screens */}
            <div className="grid grid-cols-2 gap-3">
              <ServiceBanner
                backgroundColor="#0B3C2A"
                icon={Plus}
                title={t('home.services.postProperty.title')}
                subtitle={t('home.services.postProperty.subtitle')}
                image="https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=500&q=80"
                size="half"
                onPress={() => console.log('Post property')}
              />
              
              <ServiceBanner
                backgroundColor="#0B3C2A"
                icon={Building2}
                title={t('home.services.newProjects.title')}
                subtitle={t('home.services.newProjects.subtitle')}
                image="https://images.unsplash.com/photo-1541881451213-911293a9d905?auto=format&fit=crop&w=500&q=80"
                size="half"
                onPress={() => console.log('New projects')}
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <ServiceBanner
                backgroundColor="#0B3C2A"
                icon={Briefcase}
                title={t('home.services.developerHub.title')}
                subtitle={t('home.services.developerHub.subtitle')}
                image="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=800&q=80"
                size="half"
                onPress={() => window.location.href = '/developer-hub'}
              />
              
              <ServiceBanner
                backgroundColor="#0B3C2A"
                icon={ShieldCheck}
                title={t('home.services.verifiedBrokers.title')}
                subtitle={t('home.services.verifiedBrokers.subtitle')}
                image="https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?auto=format&fit=crop&w=500&q=80"
                size="half"
                onPress={() => window.location.href = '/broker-hub'}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
