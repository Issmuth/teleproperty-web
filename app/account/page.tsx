'use client';

import { 
  Star, Heart, Building2, PhoneCall, CreditCard, MessageSquareHeart,
  Bell, Shield, Headphones, Globe, ChevronRight, User
} from 'lucide-react';

const accountItems = [
  {
    icon: Star,
    iconColor: '#F59E0B',
    bgColor: '#FFF7E6',
    title: 'My Subscription',
    subtitle: 'Upgrade your plan',
  },
  {
    icon: Heart,
    iconColor: '#FB7185',
    bgColor: '#FFF1F2',
    title: 'Saved Properties',
    subtitle: '0 saved properties',
  },
  {
    icon: Building2,
    iconColor: '#3B82F6',
    bgColor: '#EFF6FF',
    title: 'My Listings',
    subtitle: '0 active listings',
  },
  {
    icon: PhoneCall,
    iconColor: '#22C55E',
    bgColor: '#ECFDF5',
    title: 'My Callbacks',
    subtitle: '2 pending',
  },
  {
    icon: CreditCard,
    iconColor: '#F59E0B',
    bgColor: '#FFF7E6',
    title: 'My Payments',
    subtitle: 'Payment history',
  },
  {
    icon: MessageSquareHeart,
    iconColor: '#F59E0B',
    bgColor: '#FFF7E6',
    title: 'My Reviews',
    subtitle: 'My reviews (3)',
  },
  {
    icon: Bell,
    iconColor: '#A855F7',
    bgColor: '#F3E8FF',
    title: 'Notifications',
    subtitle: 'Manage alerts',
  },
  {
    icon: Shield,
    iconColor: '#64748B',
    bgColor: '#F8FAFC',
    title: 'Privacy & Security',
    subtitle: 'Account protection',
  },
  {
    icon: Headphones,
    iconColor: '#14B8A6',
    bgColor: '#ECFEFF',
    title: 'Support',
    subtitle: 'Help center · Call 8181',
  },
];

export default function AccountPage() {
  const isAuthenticated = false; // Replace with actual auth state

  return (
    <div className="flex-1 bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 lg:px-8 py-6 lg:py-8 space-y-4">
        
        {/* Profile Card */}
        <div className="bg-gradient-to-br from-[#0B8F55] to-[#0A7A4A] rounded-2xl p-6 text-white">
          <div className="flex items-start gap-4">
            <div className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center">
              <User size={32} className="text-white" />
            </div>
            <div className="flex-1">
              {isAuthenticated ? (
                <>
                  <h2 className="text-xl font-black mb-1">John Doe</h2>
                  <p className="text-sm font-medium text-white/90 mb-0.5">+251 912 345 678</p>
                  <p className="text-xs font-semibold text-white/80">Basic Plan</p>
                </>
              ) : (
                <>
                  <h2 className="text-xl font-black mb-1">Welcome!</h2>
                  <p className="text-sm font-medium text-white/90 mb-3">Sign in to access your account</p>
                  <button className="px-4 py-2 bg-white rounded-xl hover:bg-gray-100 transition-colors">
                    <span className="text-sm font-bold text-[#0B8F55]">Sign In / Register</span>
                  </button>
                </>
              )}
            </div>
          </div>
        </div>

        {/* Account Items */}
        <div className="bg-white border border-gray-200 rounded-2xl p-2 space-y-0">
          {accountItems.map((item, index) => {
            const Icon = item.icon;
            return (
              <div key={index}>
                <button className="w-full flex items-center gap-3 p-3 hover:bg-gray-50 rounded-xl transition-colors">
                  <div 
                    className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
                    style={{ backgroundColor: item.bgColor }}
                  >
                    <Icon size={18} style={{ color: item.iconColor }} />
                  </div>
                  <div className="flex-1 text-left">
                    <h3 className="text-sm font-bold text-gray-900">{item.title}</h3>
                    <p className="text-xs font-medium text-gray-600">{item.subtitle}</p>
                  </div>
                  <ChevronRight size={18} className="text-gray-400 flex-shrink-0" />
                </button>
                {index < accountItems.length - 1 && (
                  <div className="h-2" />
                )}
              </div>
            );
          })}
        </div>

        {/* Language */}
        <div className="bg-white border border-gray-200 rounded-2xl p-2">
          <button className="w-full flex items-center gap-3 p-3 hover:bg-gray-50 rounded-xl transition-colors">
            <div className="w-10 h-10 bg-[#ECFDF5] rounded-xl flex items-center justify-center">
              <Globe size={18} className="text-[#22C55E]" />
            </div>
            <div className="flex-1 text-left">
              <h3 className="text-sm font-bold text-gray-900">App Language</h3>
              <p className="text-xs font-medium text-gray-600">English</p>
            </div>
            <ChevronRight size={18} className="text-gray-400" />
          </button>
        </div>

        {/* Sign Out / Sign In Button */}
        {isAuthenticated ? (
          <button className="w-full py-3 bg-[#0B8F55] text-white font-black rounded-xl hover:bg-[#0A7A4A] transition-colors">
            Sign Out
          </button>
        ) : (
          <button className="w-full py-3 bg-[#0B8F55] text-white font-black rounded-xl hover:bg-[#0A7A4A] transition-colors">
            Sign In / Register
          </button>
        )}
      </div>
    </div>
  );
}
