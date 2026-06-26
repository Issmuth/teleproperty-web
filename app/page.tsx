'use client';

import { useState, useMemo } from 'react';
import { useRouter } from 'next/navigation';
import { HomeHero } from '@/components/home/home-hero';
import { SectionHeader } from '@/components/home/section-header';
import { ListingCard } from '@/components/home/listing-card';
import { PropertyCard } from '@/components/home/property-card';
import { ServiceBanner } from '@/components/home/service-banner';
import { SearchFiltersModal } from '@/components/common/search-filters-modal';
import { propertySearchFiltersConfig, projectsSearchFiltersConfig } from '@/lib/data/search-filters';
import { Search, Plus, Building2, Briefcase, ShieldCheck } from 'lucide-react';
import { useTheme } from '@/lib/theme/theme-provider';
import { useI18n } from '@/lib/i18n/i18n-provider';

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
  const router = useRouter();
  const [activeSegment, setActiveSegment] = useState('buy');
  const [searchQuery, setSearchQuery] = useState('');
  const [filtersVisible, setFiltersVisible] = useState(false);
  const { colors } = useTheme();
  const { t } = useI18n();

  const segments = [
    { key: 'buy', label: t('home.buy') },
    { key: 'rent', label: t('home.rent') },
    { key: 'projects', label: t('home.newProjects') },
  ];

  // Determine which filter config to use based on active segment
  const filterConfig = useMemo(() => {
    return activeSegment === 'projects' 
      ? projectsSearchFiltersConfig 
      : propertySearchFiltersConfig;
  }, [activeSegment]);

  const handleSearch = () => {
    if (activeSegment === 'projects') {
      router.push(searchQuery ? `/projects?q=${encodeURIComponent(searchQuery)}` : '/projects');
    } else {
      router.push(searchQuery ? `/property?q=${encodeURIComponent(searchQuery)}` : '/property');
    }
  };

  return (
    <div className="flex-1" style={{ backgroundColor: colors.background }}>
      <div className="max-w-7xl mx-auto px-4 lg:px-8 py-4 lg:py-6">
        {/* Hidden h1 for SEO and screen readers */}
        <h1 className="sr-only">TeleProperty - Ethiopia's #1 Property Platform</h1>

        {/* Hero Section */}
        <section aria-labelledby="hero-heading">
          <h2 id="hero-heading" className="sr-only">Search Properties</h2>
          <div className="mb-6">
            <HomeHero
              activeSegment={activeSegment}
              onSegmentChange={setActiveSegment}
              segments={segments}
              searchQuery={searchQuery}
              onSearchQueryChange={setSearchQuery}
              onFilterPress={() => setFiltersVisible(true)}
              onPostPress={() => router.push('/post-property')}
              onSearchPress={handleSearch}
            />
          </div>
        </section>

        {/* Featured Projects */}
        <section aria-labelledby="featured-projects-heading">
          <div className="mb-6">
            <div className="mb-3">
              <SectionHeader
                title={t('home.featuredProjects')}
                actionLabel={t('home.seeAll')}
                onActionPress={() => router.push('/projects')}
              />
              <h2 id="featured-projects-heading" className="sr-only">{t('home.featuredProjects')}</h2>
            </div>
            
            <div className="flex gap-3 overflow-x-auto pb-4 -mx-4 px-4 lg:mx-0 lg:px-0 scrollbar-hide">
              {featuredProjects.map((project) => (
                <ListingCard
                  key={project.id}
                  {...project}
                  onPress={() => router.push(`/projects/${project.id}`)}
                />
              ))}
            </div>
          </div>
        </section>

        {/* Featured Properties */}
        <section aria-labelledby="featured-properties-heading">
          <div className="mb-6">
            <div className="mb-3">
              <SectionHeader
                title={t('home.featuredProperties')}
                actionLabel={t('home.browseAll')}
                onActionPress={() => router.push('/property')}
              />
              <h2 id="featured-properties-heading" className="sr-only">{t('home.featuredProperties')}</h2>
            </div>
            
            <div className="flex gap-3 overflow-x-auto pb-4 -mx-4 px-4 lg:mx-0 lg:px-0 scrollbar-hide">
              {featuredProperties.map((property) => (
                <PropertyCard
                  key={property.id}
                  {...property}
                  onPress={() => router.push(`/property/${property.id}`)}
                />
              ))}
            </div>
          </div>
        </section>

        {/* All Services */}
        <section aria-labelledby="services-heading">
          <div>
            <h2 id="services-heading" className="text-base font-black mb-3" style={{ color: colors.text }}>
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
                onPress={() => router.push('/property')}
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
                  onPress={() => router.push('/post-property')}
                />
                
                <ServiceBanner
                  backgroundColor="#0B3C2A"
                  icon={Building2}
                  title={t('home.services.newProjects.title')}
                  subtitle={t('home.services.newProjects.subtitle')}
                  image="https://images.unsplash.com/photo-1541881451213-911293a9d905?auto=format&fit=crop&w=500&q=80"
                  size="half"
                  onPress={() => router.push('/projects')}
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
                  onPress={() => router.push('/developer-hub')}
                />
                
                <ServiceBanner
                  backgroundColor="#0B3C2A"
                  icon={ShieldCheck}
                  title={t('home.services.verifiedBrokers.title')}
                  subtitle={t('home.services.verifiedBrokers.subtitle')}
                  image="https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?auto=format&fit=crop&w=500&q=80"
                  size="half"
                  onPress={() => router.push('/broker-hub')}
                />
              </div>
            </div>
          </div>
        </section>
      </div>

      {/* Filters Modal - switches config based on active segment */}
      <SearchFiltersModal
        visible={filtersVisible}
        onClose={() => setFiltersVisible(false)}
        config={filterConfig}
        minFieldLabel={t('home.filters.min')}
        maxFieldLabel={t('home.filters.max')}
      />
    </div>
  );
}
