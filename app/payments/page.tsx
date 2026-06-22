'use client';

import { CreditCard, Gift, Zap } from 'lucide-react';
import { useTheme } from '@/lib/theme/theme-provider';
import { useI18n } from '@/lib/i18n/i18n-provider';

const paymentOptions = [
  {
    title: 'Lead Access',
    subtitle: 'Unlock property contact details',
    price: 'ETB 50',
  },
  {
    title: 'Pro Subscription',
    subtitle: 'Unlimited leads · Featured listing',
    price: 'ETB 500/mo',
  },
  {
    title: 'List Property',
    subtitle: 'Basic listing (30 days)',
    price: 'ETB 200',
  },
  {
    title: 'Service Payment',
    subtitle: 'Pay for booked home services',
    price: 'Variable',
  },
];

const paymentHistory = [
  {
    id: '1',
    title: 'Lead Access – Villa Bole',
    date: 'Apr 30',
    amount: 'ETB 50',
    status: 'Paid',
  },
  {
    id: '2',
    title: 'Home Cleaning – Kazanchis',
    date: 'Apr 28',
    amount: 'ETB 350',
    status: 'Paid',
  },
  {
    id: '3',
    title: 'Pro Subscription – May',
    date: 'May 1',
    amount: 'ETB 500',
    status: 'Active',
  },
];

export default function PaymentsPage() {
  const { colors } = useTheme();
  const { t } = useI18n();

  return (
    <div className="flex-1" style={{ backgroundColor: colors.background }}>
      <div className="max-w-4xl mx-auto px-4 lg:px-8 py-6 lg:py-8 space-y-6">
        
        {/* Rewards Card */}
        <div className="bg-gradient-to-br from-[#7C3AED] to-[#6D28D9] rounded-2xl p-6 text-white">
          <div className="flex items-start justify-between mb-4">
            <div>
              <p className="text-sm font-bold text-white/90 uppercase tracking-wide mb-1">
                {t('payments.rewards.kicker')}
              </p>
              <div className="flex items-baseline gap-2">
                <span className="text-4xl font-black">1,250</span>
                <span className="text-lg font-bold text-white/90">{t('payments.rewards.points')}</span>
              </div>
            </div>
            <Gift size={32} className="text-white/80" />
          </div>
          <div className="flex gap-2">
            <button className="px-4 py-2 bg-white rounded-xl hover:bg-gray-100 transition-colors">
              <span className="text-sm font-bold text-purple-700">{t('payments.rewards.redeem')}</span>
            </button>
            <button className="px-4 py-2 bg-white/20 backdrop-blur-sm rounded-xl hover:bg-white/30 transition-colors">
              <span className="text-sm font-bold text-white">{t('payments.rewards.earnMore')}</span>
            </button>
          </div>
        </div>

        {/* Pay with Telebirr */}
        <div className="border rounded-2xl p-5" style={{ backgroundColor: colors.surface, borderColor: colors.border }}>
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 bg-[#ECFDF5] rounded-xl flex items-center justify-center">
              <Zap size={24} className="text-[#0B8F55]" />
            </div>
            <div className="flex-1">
              <h3 className="text-base font-black" style={{ color: colors.text }}>{t('payments.payWith')}</h3>
              <p className="text-sm font-medium" style={{ color: colors.textMuted }}>{t('payments.payWithSubtitle')}</p>
            </div>
          </div>
        </div>

        {/* Payment Options */}
        <div className="border rounded-2xl p-5 space-y-3" style={{ backgroundColor: colors.surface, borderColor: colors.border }}>
          <h3 className="text-base font-black mb-4" style={{ color: colors.text }}>{t('payments.options.title')}</h3>
          {paymentOptions.map((option, index) => (
            <div key={index}>
              {index > 0 && <div className="h-px my-3" style={{ backgroundColor: colors.border }} />}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ backgroundColor: colors.surfaceMuted }}>
                    <CreditCard size={18} style={{ color: colors.iconMuted }} />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold" style={{ color: colors.text }}>{option.title}</h4>
                    <p className="text-xs font-medium" style={{ color: colors.textMuted }}>{option.subtitle}</p>
                  </div>
                </div>
                <span className="text-sm font-black" style={{ color: colors.text }}>{option.price}</span>
              </div>
            </div>
          ))}
        </div>

        {/* Payment History */}
        <div className="border rounded-2xl p-5" style={{ backgroundColor: colors.surface, borderColor: colors.border }}>
          <h3 className="text-base font-black mb-4" style={{ color: colors.text }}>{t('payments.history.title')}</h3>
          <div className="space-y-3">
            {paymentHistory.map((item) => (
              <div key={item.id}>
                <div className="flex items-center justify-between py-2">
                  <div className="flex-1">
                    <h4 className="text-sm font-bold" style={{ color: colors.text }}>{item.title}</h4>
                    <p className="text-xs font-medium" style={{ color: colors.textMuted }}>{item.date}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-black" style={{ color: colors.text }}>{item.amount}</p>
                    <span className={`
                      inline-block px-2 py-0.5 text-[10px] font-bold rounded-full
                      ${item.status === 'Paid' 
                        ? 'bg-green-100 text-green-700' 
                        : 'bg-blue-100 text-blue-700'
                      }
                    `}>
                      {item.status}
                    </span>
                  </div>
                </div>
                {item.id !== paymentHistory[paymentHistory.length - 1].id && (
                  <div className="h-px" style={{ backgroundColor: colors.border }} />
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
