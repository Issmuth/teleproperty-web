'use client';

import { useRouter } from 'next/navigation';
import { ArrowLeft, Check } from 'lucide-react';
import { useTheme } from '@/lib/theme/theme-provider';

interface Plan {
  name: string;
  price: string;
  period: string;
  color: string;
  current?: boolean;
  popular?: boolean;
  features: string[];
}

const plans: Plan[] = [
  {
    name: 'Basic',
    price: 'ETB 500',
    period: '/month',
    color: '#64748B',
    features: [
      '10 verified leads/month',
      '5 active property listings',
      'Basic profile badge',
      'Email leads only',
      'Standard search placement',
    ],
  },
  {
    name: 'Professional',
    price: 'ETB 1,500',
    period: '/month',
    color: '#16A34A',
    current: true,
    popular: true,
    features: [
      '60 verified leads/month',
      '30 active property listings',
      'Featured broker badge ✓',
      'WhatsApp + Phone + Email leads',
      'Priority search placement',
      'Advanced analytics dashboard',
      'Verified broker profile',
      'Call center support',
    ],
  },
  {
    name: 'Enterprise',
    price: 'ETB 3,500',
    period: '/month',
    color: '#2563EB',
    features: [
      'Unlimited verified leads',
      'Unlimited listings',
      'Premium featured badge',
      'All lead channels',
      'Top search placement',
      'Full analytics suite',
      'Priority verified profile',
      '24/7 dedicated support',
      'Custom integrations',
      'White-label options',
    ],
  },
];

export default function SubscriptionsPage() {
  const router = useRouter();
  const { colors } = useTheme();

  return (
    <div className="min-h-screen" style={{ backgroundColor: colors.background }}>
      {/* Header */}
      <div
        className="sticky top-14 lg:top-16 z-10 px-4 lg:px-8 py-3 lg:py-4 flex items-center gap-3 border-b"
        style={{ backgroundColor: colors.background, borderColor: colors.border }}
      >
        <button
          onClick={() => router.back()}
          className="w-9 h-9 lg:w-10 lg:h-10 rounded-xl flex items-center justify-center hover:opacity-80 transition-opacity"
          style={{ backgroundColor: colors.surface }}
        >
          <ArrowLeft size={20} style={{ color: colors.text }} />
        </button>
        <h1 className="text-lg lg:text-xl font-black" style={{ color: colors.text }}>
          Subscription Plans
        </h1>
      </div>

      <div className="max-w-6xl mx-auto px-4 lg:px-8 pt-20 lg:pt-24 pb-32">
        <div className="text-center mb-8 lg:mb-12">
          <h2 className="text-2xl lg:text-4xl font-black mb-3" style={{ color: colors.text }}>
            Choose Your Plan
          </h2>
          <p className="text-base lg:text-lg font-semibold" style={{ color: colors.textMuted }}>
            Select the perfect plan for your business needs
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-6">
          {plans.map((plan) => (
            <div
              key={plan.name}
              className={`border rounded-2xl lg:rounded-3xl p-6 lg:p-8 space-y-6 relative ${
                plan.popular ? 'ring-2' : ''
              }`}
              style={{
                backgroundColor: colors.surface,
                borderColor: plan.popular ? plan.color : colors.border,
                ...(plan.popular && { '--tw-ring-color': plan.color } as React.CSSProperties),
              }}
            >
              {/* Popular Badge */}
              {plan.popular && (
                <div
                  className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1.5 rounded-full"
                  style={{ backgroundColor: plan.color }}
                >
                  <span className="text-xs font-black text-white">MOST POPULAR</span>
                </div>
              )}

              {/* Current Plan Badge */}
              {plan.current && (
                <div className="absolute top-4 right-4 bg-green-100 dark:bg-green-900/20 px-3 py-1 rounded-full">
                  <span className="text-xs font-black text-green-700 dark:text-green-400">CURRENT</span>
                </div>
              )}

              {/* Plan Header */}
              <div>
                <h3 className="text-xl lg:text-2xl font-black mb-2" style={{ color: colors.text }}>
                  {plan.name}
                </h3>
                <div className="flex items-baseline gap-1">
                  <span
                    className="text-3xl lg:text-4xl font-black"
                    style={{ color: plan.color }}
                  >
                    {plan.price}
                  </span>
                  <span className="text-base font-semibold" style={{ color: colors.textMuted }}>
                    {plan.period}
                  </span>
                </div>
              </div>

              {/* Features */}
              <ul className="space-y-3">
                {plan.features.map((feature, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <Check
                      size={18}
                      style={{ color: plan.color }}
                      className="flex-shrink-0 mt-0.5"
                    />
                    <span className="text-sm lg:text-base font-semibold" style={{ color: colors.text }}>
                      {feature}
                    </span>
                  </li>
                ))}
              </ul>

              {/* CTA Button */}
              <button
                className={`w-full py-3.5 rounded-xl font-black transition-all ${
                  plan.current ? 'opacity-50 cursor-not-allowed' : 'hover:opacity-90'
                }`}
                style={{
                  backgroundColor: plan.current ? colors.surfaceMuted : plan.color,
                  color: '#FFFFFF',
                }}
                disabled={plan.current}
              >
                {plan.current ? 'Current Plan' : `Upgrade to ${plan.name}`}
              </button>
            </div>
          ))}
        </div>

        {/* Additional Info */}
        <div
          className="mt-8 lg:mt-12 border rounded-2xl lg:rounded-3xl p-6 lg:p-8 text-center"
          style={{ backgroundColor: colors.surface, borderColor: colors.border }}
        >
          <h3 className="text-lg lg:text-xl font-black mb-3" style={{ color: colors.text }}>
            Need a Custom Solution?
          </h3>
          <p className="text-sm lg:text-base font-semibold mb-4" style={{ color: colors.textMuted }}>
            Contact us for enterprise solutions and custom pricing
          </p>
          <button className="bg-[#0B8F55] text-white font-black px-6 py-3 rounded-xl hover:bg-[#0A7A4A] transition-colors">
            Contact Sales
          </button>
        </div>
      </div>
    </div>
  );
}
