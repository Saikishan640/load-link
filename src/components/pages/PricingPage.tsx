import React, { useState } from 'react';
import { 
  Check, 
  RotateCcw, 
  ShieldCheck, 
  HelpCircle, 
  ArrowRight, 
  Truck, 
  Zap, 
  Building, 
  DollarSign,
  Percent
} from 'lucide-react';
import { useData } from '../../context/DataContext';

interface PricingPageProps {
  setCurrentPage: (page: string) => void;
}

export const PricingPage: React.FC<PricingPageProps> = ({ setCurrentPage }) => {
  const { estimateFare } = useData();
  const [billingCycle, setBillingCycle] = useState<'monthly' | 'annual'>('monthly');

  const plans = [
    {
      name: 'Pay-As-You-Go',
      badge: 'Individual Shippers',
      price: '₹0',
      period: 'No monthly fee',
      desc: 'Ideal for occasional home shifting or single parcel dispatches.',
      features: [
        'Instant on-demand booking',
        'Live GPS highway tracking',
        'Escrow payment protection',
        'Standard customer support',
        'Up to 30% return-load discounts',
      ],
      cta: 'Post Free Load',
      highlighted: false,
    },
    {
      name: 'Pro Shipper',
      badge: 'Small Businesses & Retailers',
      price: billingCycle === 'monthly' ? '₹2,499' : '₹1,999',
      period: 'per month billed annually',
      desc: 'For regular distributors shipping 5+ consignments per week.',
      features: [
        'Everything in Pay-As-You-Go',
        'Priority return-load matchmaking (instant lock)',
        'Dedicated corridor account manager',
        'Discounted in-transit cargo insurance',
        'Consolidated monthly GST invoicing',
        '15-day credit cycle support',
      ],
      cta: 'Start 14-Day Free Pro Trial',
      highlighted: true,
    },
    {
      name: 'Enterprise Fleet',
      badge: 'FMCG & Heavy Manufacturing',
      price: 'Custom',
      period: 'tailored high-volume contracts',
      desc: 'For multi-plant manufacturers, 3PL logistics, and warehouse hubs.',
      features: [
        'Dedicated multi-axle vehicle allocation',
        'Direct ERP / TMS API integration',
        'Custom corridor SLA guarantees (99.5% on-time)',
        'Zero-cancellation driver commitments',
        'Dedicated 24/7 highway transit desk',
      ],
      cta: 'Contact Enterprise Sales',
      highlighted: false,
    },
  ];

  const vehicleRates = [
    {
      type: 'Load Auto / Ape',
      capacity: '500 kg',
      base: '₹350 (Includes first 5 km)',
      perKm: '₹14 / km',
      returnRate: '₹9.50 / km',
      ideal: 'Intra-city shifting, hardware boxes, retail dispatch',
    },
    {
      type: 'Tata Ace (Chota Hathi)',
      capacity: '1,200 kg',
      base: '₹800 (Includes first 10 km)',
      perKm: '₹22 / km',
      returnRate: '₹15 / km',
      ideal: '1BHK/2BHK shifting, appliances, mid-range cargo',
    },
    {
      type: 'Mid-Size Lorry (Ashok Leyland)',
      capacity: '8,500 kg',
      base: '₹1,800 (Includes first 25 km)',
      perKm: '₹38 / km',
      returnRate: '₹26 / km',
      ideal: 'Bulk FMCG, wholesale grain bags, industrial spares',
    },
    {
      type: 'Multi-Axle Heavy Container',
      capacity: '24,000 kg',
      base: '₹3,500 (Includes first 50 km)',
      perKm: '₹65 / km',
      returnRate: '₹44 / km',
      ideal: 'Heavy machinery, steel coils, inter-state factory freight',
    },
  ];

  return (
    <div className="min-h-screen bg-[#020617] text-slate-100 py-12 sm:py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto space-y-16">
        {/* Header */}
        <div className="text-center space-y-4">
          <span className="px-3.5 py-1 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-xs font-bold uppercase tracking-wider">
            100% Upfront Transparency
          </span>
          <h1 className="font-extrabold text-3xl sm:text-4xl lg:text-5xl text-white">
            Transparent Pricing with <span className="text-indigo-400">Return-Load Discounts</span>
          </h1>
          <p className="text-sm sm:text-base text-slate-300 max-w-2xl mx-auto">
            No hidden broker markups. Transparent per-kilometer tariffs, and up to 35% savings when booking return-direction vehicles.
          </p>

          {/* Billing switcher */}
          <div className="flex items-center justify-center gap-3 pt-4">
            <span className={`text-xs font-medium ${billingCycle === 'monthly' ? 'text-white' : 'text-slate-400'}`}>
              Monthly Billing
            </span>
            <button
              onClick={() => setBillingCycle(billingCycle === 'monthly' ? 'annual' : 'monthly')}
              className="w-12 h-6 rounded-full bg-white/10 p-1 relative border border-white/10 transition-colors cursor-pointer"
            >
              <div
                className={`w-4 h-4 rounded-full bg-indigo-500 transition-transform ${
                  billingCycle === 'annual' ? 'translate-x-6' : 'translate-x-0'
                }`}
              />
            </button>
            <span className={`text-xs font-medium ${billingCycle === 'annual' ? 'text-white' : 'text-slate-400'}`}>
              Annual Billing <span className="text-emerald-400 text-[10px] font-bold">(Save 20%)</span>
            </span>
          </div>
        </div>

        {/* Subscription Plans */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {plans.map((p, idx) => (
            <div
              key={idx}
              className={`rounded-3xl p-6 sm:p-8 flex flex-col justify-between transition-all duration-300 relative backdrop-blur-md ${
                p.highlighted
                  ? 'bg-white/[0.04] border-2 border-indigo-500 shadow-2xl shadow-indigo-500/20 scale-105'
                  : 'bg-white/[0.02] border border-white/10'
              }`}
            >
              {p.highlighted && (
                <span className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-0.5 rounded-full bg-indigo-600 text-white font-bold text-[11px] uppercase tracking-wider shadow-md">
                  Most Popular for Business
                </span>
              )}

              <div className="space-y-4">
                <div>
                  <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">{p.badge}</span>
                  <h3 className="font-bold text-2xl text-white mt-1">{p.name}</h3>
                  <p className="text-xs text-slate-400 mt-2 leading-relaxed">{p.desc}</p>
                </div>

                <div className="pt-2">
                  <span className="text-3xl font-extrabold text-white">{p.price}</span>
                  <span className="text-xs text-slate-400 ml-2">{p.period}</span>
                </div>

                <ul className="space-y-2.5 text-xs text-slate-300 pt-4 border-t border-white/10">
                  {p.features.map((feat, fidx) => (
                    <li key={fidx} className="flex items-start gap-2">
                      <Check className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                      <span>{feat}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <button
                onClick={() => setCurrentPage(p.name === 'Enterprise Fleet' ? 'contact' : 'register')}
                className={`w-full mt-8 py-3 rounded-xl font-bold text-xs sm:text-sm transition-all shadow-md cursor-pointer ${
                  p.highlighted
                    ? 'bg-indigo-600 hover:bg-indigo-500 text-white shadow-indigo-500/25'
                    : 'bg-white/5 hover:bg-white/10 text-white border border-white/10'
                }`}
              >
                {p.cta}
              </button>
            </div>
          ))}
        </div>

        {/* Vehicle Per-KM Rates Table */}
        <div className="p-6 sm:p-8 rounded-3xl bg-white/[0.02] border border-white/10 space-y-6 backdrop-blur-md">
          <div className="flex items-center justify-between">
            <div>
              <span className="text-xs font-bold text-indigo-400 uppercase tracking-wider">Per-Kilometer Matrix</span>
              <h2 className="font-bold text-2xl text-white mt-1">
                Standard vs Return-Load Tariffs
              </h2>
            </div>
            <div className="hidden sm:flex items-center gap-1 text-xs text-emerald-400 font-bold bg-emerald-500/10 px-3 py-1 rounded-full border border-emerald-500/20">
              <Percent className="w-3.5 h-3.5" />
              <span>Up to 35% Discount on Return Legs</span>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs sm:text-sm">
              <thead>
                <tr className="border-b border-white/10 text-slate-400">
                  <th className="pb-3 font-semibold">Vehicle Category</th>
                  <th className="pb-3 font-semibold">Max Payload</th>
                  <th className="pb-3 font-semibold">Base Minimum</th>
                  <th className="pb-3 font-semibold">Standard Rate</th>
                  <th className="pb-3 font-semibold text-indigo-400">Return-Load Rate</th>
                  <th className="pb-3 font-semibold">Ideal For</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5 text-slate-300">
                {vehicleRates.map((v, idx) => (
                  <tr key={idx}>
                    <td className="py-4 font-bold text-white flex items-center gap-2">
                      <Truck className="w-4 h-4 text-indigo-400" />
                      {v.type}
                    </td>
                    <td className="py-4 text-emerald-400 font-semibold">{v.capacity}</td>
                    <td className="py-4 text-slate-400">{v.base}</td>
                    <td className="py-4 text-slate-200 font-medium">{v.perKm}</td>
                    <td className="py-4 font-bold text-amber-400 font-mono">{v.returnRate}</td>
                    <td className="py-4 text-slate-400 text-xs">{v.ideal}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Bottom CTA */}
        <div className="p-8 rounded-3xl bg-white/[0.02] border border-white/10 text-center space-y-4 backdrop-blur-md">
          <h3 className="font-bold text-2xl text-white">
            Need a Custom Logistics Contract for Regular Dispatches?
          </h3>
          <p className="text-xs sm:text-sm text-slate-400 max-w-xl mx-auto">
            Talk to our freight operations team in Hyderabad, Bengaluru, or Vijayawada for dedicated fleet contracts.
          </p>
          <button
            onClick={() => setCurrentPage('contact')}
            className="px-6 py-3 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-white font-bold text-xs sm:text-sm inline-flex items-center gap-2 transition-colors cursor-pointer"
          >
            <span>Contact Operations Team</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
