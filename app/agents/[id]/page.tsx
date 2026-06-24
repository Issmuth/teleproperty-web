'use client';

import { use, useMemo } from 'react';
import { useRouter } from 'next/navigation';
import { ArrowLeft, BadgeCheck, Clock, Globe, MessageCircle, Phone, Star } from 'lucide-react';
import { useTheme } from '@/lib/theme/theme-provider';
import { sampleAgents, type AgentProfile } from '@/lib/data/agent-profile';

function findAgent(id?: string): AgentProfile {
  if (!id) return sampleAgents['agent-1'];
  return sampleAgents[id] ?? sampleAgents['agent-1'];
}

function StatCard({ label, value, colors }: { label: string; value: string | number; colors: any }) {
  return (
    <div 
      className="flex-1 min-w-[140px] rounded-xl border p-4 flex flex-col items-center gap-2"
      style={{ backgroundColor: colors.surface, borderColor: colors.border }}
    >
      <span className="text-2xl font-black" style={{ color: colors.text }}>{value}</span>
      <span className="text-xs font-semibold text-center" style={{ color: colors.textMuted }}>{label}</span>
    </div>
  );
}

export default function AgentProfilePage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = use(params);
  const router = useRouter();
  const { colors } = useTheme();
  const agent = useMemo(() => findAgent(resolvedParams.id), [resolvedParams.id]);

  const typeLabel = agent.type === 'developer' ? 'Developer' : agent.type === 'broker' ? 'Broker' : 'Agent';

  const handleCall = () => {
    if (agent.phoneNumber) {
      window.location.href = `tel:${agent.phoneNumber}`;
    }
  };

  const handleMessage = () => {
    // Could implement messaging functionality or WhatsApp redirect
    console.log('Message agent:', agent.id);
  };

  return (
    <div className="min-h-screen" style={{ backgroundColor: colors.background }}>
      {/* Header */}
      <div
        className="sticky top-14 lg:top-16 z-10 px-4 lg:px-8 py-3 lg:py-4 flex items-center justify-between border-b"
        style={{ backgroundColor: colors.background, borderColor: colors.border }}
      >
        <div className="flex items-center gap-3">
          <button
            onClick={() => router.back()}
            className="w-10 h-10 rounded-xl flex items-center justify-center hover:opacity-80 transition-opacity"
            style={{ backgroundColor: colors.surface }}
          >
            <ArrowLeft size={20} style={{ color: colors.text }} />
          </button>
          <h1 className="text-lg lg:text-xl font-black" style={{ color: colors.text }}>
            {typeLabel} Profile
          </h1>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 lg:px-8 pt-20 lg:pt-24 pb-6 space-y-4">
        {/* Top Card */}
        <div 
          className="rounded-2xl border p-6 lg:p-8 flex flex-col items-center gap-3"
          style={{ backgroundColor: colors.surface, borderColor: colors.border }}
        >
          <div 
            className="w-20 h-20 lg:w-24 lg:h-24 rounded-full flex items-center justify-center mb-2"
            style={{ backgroundColor: colors.activeText }}
          >
            <span className="text-white text-3xl lg:text-4xl font-black">
              {agent.name.charAt(0).toUpperCase()}
            </span>
          </div>

          <div className="flex items-center gap-2">
            <h2 className="text-2xl lg:text-3xl font-black" style={{ color: colors.text }}>
              {agent.name}
            </h2>
            {agent.verified && (
              <BadgeCheck size={24} className="text-green-600 fill-green-600" />
            )}
          </div>

          <p className="text-base font-semibold" style={{ color: colors.textMuted }}>
            {typeLabel}
          </p>

          <div className="flex items-center gap-2">
            <Star size={18} className="text-amber-500 fill-amber-500" />
            <span className="text-lg font-black" style={{ color: colors.text }}>
              {agent.rating}
            </span>
            <span className="text-sm font-semibold" style={{ color: colors.textMuted }}>
              ({agent.totalReviews} reviews)
            </span>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="flex flex-wrap gap-3">
          <StatCard label="Active Listings" value={agent.activeListings} colors={colors} />
          <StatCard label="Sold Properties" value={agent.soldProperties} colors={colors} />
          <StatCard label="Years Experience" value={agent.yearsExperience} colors={colors} />
          <StatCard label="Response Rate" value={agent.responseRate} colors={colors} />
        </div>

        {/* About */}
        <div 
          className="rounded-2xl border p-5 lg:p-6 space-y-4"
          style={{ backgroundColor: colors.surface, borderColor: colors.border }}
        >
          <h3 className="text-lg font-black" style={{ color: colors.text }}>About</h3>
          <p className="text-sm leading-relaxed" style={{ color: colors.textMuted }}>
            {agent.bio}
          </p>
        </div>

        {/* Specialties */}
        <div 
          className="rounded-2xl border p-5 lg:p-6 space-y-4"
          style={{ backgroundColor: colors.surface, borderColor: colors.border }}
        >
          <h3 className="text-lg font-black" style={{ color: colors.text }}>Specialties</h3>
          <div className="flex flex-wrap gap-2">
            {agent.specialties.map((specialty) => (
              <div
                key={specialty}
                className="px-3 py-2 rounded-xl"
                style={{ backgroundColor: colors.surfaceMuted }}
              >
                <span className="text-sm font-bold" style={{ color: colors.text }}>
                  {specialty}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Contact Info */}
        <div 
          className="rounded-2xl border p-5 lg:p-6 space-y-4"
          style={{ backgroundColor: colors.surface, borderColor: colors.border }}
        >
          <h3 className="text-lg font-black" style={{ color: colors.text }}>Contact Info</h3>
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div 
                className="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0"
                style={{ backgroundColor: colors.surfaceMuted }}
              >
                <Clock size={18} style={{ color: colors.text }} />
              </div>
              <div className="flex-1">
                <p className="text-xs font-semibold mb-0.5" style={{ color: colors.textMuted }}>
                  Response Time
                </p>
                <p className="text-sm font-bold" style={{ color: colors.text }}>
                  {agent.responseTime}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div 
                className="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0"
                style={{ backgroundColor: colors.surfaceMuted }}
              >
                <Globe size={18} style={{ color: colors.text }} />
              </div>
              <div className="flex-1">
                <p className="text-xs font-semibold mb-0.5" style={{ color: colors.textMuted }}>
                  Languages
                </p>
                <p className="text-sm font-bold" style={{ color: colors.text }}>
                  {agent.languages.join(', ')}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-3 pb-8">
          <button
            onClick={handleCall}
            className="flex-1 flex items-center justify-center gap-2 py-3.5 rounded-xl font-black text-white text-base transition-transform active:scale-98 bg-green-600 hover:bg-green-700"
          >
            <Phone size={18} strokeWidth={2.5} />
            <span>Call</span>
          </button>

          <button
            onClick={handleMessage}
            className="flex-1 flex items-center justify-center gap-2 py-3.5 rounded-xl font-black text-white text-base transition-transform active:scale-98 bg-blue-600 hover:bg-blue-700"
          >
            <MessageCircle size={18} strokeWidth={2.5} />
            <span>Message</span>
          </button>
        </div>
      </div>
    </div>
  );
}
