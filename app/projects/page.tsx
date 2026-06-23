'use client';

import { useState } from 'react';
import { X } from 'lucide-react';
import Image from 'next/image';
import { ProjectCard } from '@/components/projects/project-card';
import { SearchBar } from '@/components/common/search-bar';
import { useTheme } from '@/lib/theme/theme-provider';
import { useI18n } from '@/lib/i18n/i18n-provider';

const projectCards = [
  {
    id: 'sunrise-residences',
    badge: 'Verified',
    title: 'Sunrise Residences',
    developer: 'Sunshine Developers PLC',
    price: 'From ETB 2,800,000',
    location: 'Bole, Addis Ababa',
    image: 'https://images.unsplash.com/photo-1484154218962-a197022b5858?auto=format&fit=crop&w=1200&q=80',
    featured: true,
  },
  {
    id: 'tech-park-addis',
    badge: 'Verified',
    title: 'Tech Park Addis',
    developer: 'Modern Developments Ltd',
    price: 'From ETB 3,400,000',
    location: 'CMC, Addis Ababa',
    image: 'https://images.unsplash.com/photo-1460317442991-0ec209397118?auto=format&fit=crop&w=1200&q=80',
    featured: true,
  },
  {
    id: 'capital-towers',
    badge: 'Verified',
    title: 'Capital Towers',
    developer: 'Capital Real Estate',
    price: 'From ETB 4,200,000',
    location: 'Kazanchis, Addis Ababa',
    image: 'https://images.unsplash.com/photo-1511818966892-d7d671e672a2?auto=format&fit=crop&w=1200&q=80',
  },
  {
    id: 'lakeside-heights',
    badge: 'Verified',
    title: 'Lakeside Heights',
    developer: 'Blue Horizon Homes',
    price: 'From ETB 2,100,000',
    location: 'Ayat, Addis Ababa',
    image: 'https://images.unsplash.com/photo-1494526585095-c41746248156?auto=format&fit=crop&w=1200&q=80',
  },
];

export default function ProjectsPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [showHero, setShowHero] = useState(true);
  const [showPromoBanner, setShowPromoBanner] = useState(true);
  const { colors } = useTheme();
  const { t } = useI18n();

  const filteredProjects = projectCards.filter((project) => {
    const needle = searchQuery.toLowerCase();
    return (
      project.title.toLowerCase().includes(needle) ||
      project.developer.toLowerCase().includes(needle) ||
      project.location.toLowerCase().includes(needle)
    );
  });

  return (
    <div className="flex-1 relative" style={{ backgroundColor: colors.background }}>
      <div className="max-w-7xl mx-auto px-4 lg:px-8 py-4 space-y-3 pb-32">
        {/* Hero Card */}
        {showHero && (
          <div className="relative h-32 rounded-xl overflow-hidden bg-[#EA580C]">
            <Image
              src="https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&w=1200&q=80"
              alt="Capital Towers"
              fill
              className="object-cover"
            />
            <div className="absolute inset-0 bg-[#D77700]/60" />
            
            <div className="relative h-full flex items-center p-3 lg:p-4 max-w-xs">
              <div className="space-y-0.5">
                <p className="text-[10px] font-black text-white/90 uppercase tracking-wide">
                  Capital Real Estate
                </p>
                <h2 className="text-base font-black text-white">
                  New Project Launch
                </h2>
                <p className="text-[10px] font-semibold text-white/95">
                  Capital Towers · Limited units available
                </p>
                <button className="mt-2 px-3 py-1.5 bg-white rounded-lg hover:bg-gray-100 transition-colors">
                  <span className="text-[10px] font-black text-[#8A4B00]">View Project</span>
                </button>
              </div>
            </div>

            <button
              onClick={() => setShowHero(false)}
              className="absolute top-2 right-2 w-6 h-6 rounded-full bg-white/20 hover:bg-white/30 flex items-center justify-center transition-colors"
            >
              <X size={14} className="text-white" />
            </button>
          </div>
        )}

        {/* Search Bar */}
        <div className="sticky top-14 lg:top-16 z-30 pb-3 w-full" style={{ backgroundColor: colors.background }}>
          <SearchBar
            placeholder={t('projects.searchPlaceholder')}
            value={searchQuery}
            onChangeText={setSearchQuery}
            onFilterPress={() => console.log('Filters')}
            variant="muted"
          />
        </div>

        {/* Stats Row */}
        <div className="grid grid-cols-3 gap-2">
          <div className="flex flex-col items-center justify-center rounded-xl py-3 border" style={{ backgroundColor: colors.surface, borderColor: colors.border }}>
            <span className="text-base font-black text-[#0B8F55]">50+</span>
            <span className="text-[10px] font-bold mt-0.5" style={{ color: colors.textMuted }}>{t('projects.stats.projects')}</span>
          </div>
          <div className="flex flex-col items-center justify-center rounded-xl py-3 border" style={{ backgroundColor: colors.surface, borderColor: colors.border }}>
            <span className="text-base font-black text-[#0B8F55]">30+</span>
            <span className="text-[10px] font-bold mt-0.5" style={{ color: colors.textMuted }}>{t('projects.stats.developers')}</span>
          </div>
          <div className="flex flex-col items-center justify-center rounded-xl py-3 border" style={{ backgroundColor: colors.surface, borderColor: colors.border }}>
            <span className="text-base font-black text-[#0B8F55]">1000+</span>
            <span className="text-[10px] font-bold mt-0.5" style={{ color: colors.textMuted }}>{t('projects.stats.units')}</span>
          </div>
        </div>

        {/* Featured Projects */}
        <div>
          <h2 className="text-sm font-black mb-2" style={{ color: colors.text }}>{t('projects.featuredHeader')}</h2>
          <div className="flex gap-3 overflow-x-auto pb-4 -mx-4 px-4 lg:mx-0 lg:px-0 scrollbar-hide">
            {projectCards.filter(p => p.featured).map((project) => (
              <div key={project.id} className="w-64 flex-shrink-0">
                <ProjectCard {...project} />
              </div>
            ))}
          </div>
        </div>

        {/* All Projects */}
        <div>
          <h2 className="text-sm font-black mb-2" style={{ color: colors.text }}>
            {t('projects.allProjects')} ({filteredProjects.length})
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 lg:gap-4">
            {filteredProjects.map((project) => (
              <ProjectCard key={project.id} {...project} />
            ))}
          </div>
        </div>
      </div>

      {/* Promo Banner - Fixed at bottom but aligned with content */}
      {showPromoBanner && (
        <div className="fixed bottom-20 lg:bottom-6 left-0 lg:left-64 right-0 z-20">
          <div className="max-w-7xl mx-auto px-4 lg:px-8">
            <div className="bg-gradient-to-r from-[#14B37B] to-[#0F9D58] rounded-xl p-3 lg:p-4 shadow-xl relative">
              <button
                onClick={() => setShowPromoBanner(false)}
                className="absolute top-2 right-2 w-5 h-5 rounded-full bg-white/20 hover:bg-white/30 flex items-center justify-center transition-colors"
              >
                <X size={12} className="text-white" />
              </button>
              
              <div className="flex items-center justify-between gap-3 pr-6">
                <div className="flex-1">
                  <p className="text-[10px] font-bold text-white/90 uppercase tracking-wide mb-0.5">
                    Project Valuation
                  </p>
                  <h3 className="text-sm font-black text-white mb-0.5">
                    Book a site visit
                  </h3>
                  <p className="text-xs font-medium text-white/90">
                    Free consultation with a project manager
                  </p>
                </div>
                <button className="px-3 py-2 bg-white rounded-lg hover:bg-gray-100 transition-colors whitespace-nowrap flex-shrink-0">
                  <span className="text-xs font-black text-gray-900">Book Now</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
