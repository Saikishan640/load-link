import React from 'react';
import { 
  Truck, 
  RotateCcw, 
  ShieldCheck, 
  Target, 
  Award, 
  CheckCircle2, 
  ArrowRight, 
  GraduationCap, 
  TrendingUp, 
  Layers, 
  AlertTriangle,
  Lightbulb,
  Building2
} from 'lucide-react';

interface AboutPageProps {
  setCurrentPage: (page: string) => void;
}

export const AboutPage: React.FC<AboutPageProps> = ({ setCurrentPage }) => {
  return (
    <div className="min-h-screen bg-[#020617] text-slate-100 py-12 sm:py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto space-y-16">
        {/* Header Title */}
        <div className="text-center space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 text-xs font-semibold">
            <GraduationCap className="w-4 h-4" />
            <span>College Project Proposal & Feasibility Report</span>
          </div>
          <h1 className="font-extrabold text-3xl sm:text-4xl lg:text-5xl text-white">
            About <span className="text-indigo-400">LoadLink</span>
          </h1>
          <p className="text-base text-slate-300 max-w-2xl mx-auto leading-relaxed">
            A Smart Booking & Return-Load Matching Platform for Trucks, Lorries, Autos and Mini-Vans.
          </p>
          <div className="p-4 rounded-2xl bg-white/[0.02] border border-white/10 max-w-xl mx-auto text-xs text-slate-300 flex items-center justify-between backdrop-blur-md">
            <div className="text-left">
              <span className="text-slate-400 block text-[11px]">Submitted by:</span>
              <span className="font-bold text-white">Saikishan (Sai)</span>
            </div>
            <div className="text-left">
              <span className="text-slate-400 block text-[11px]">Academic Course:</span>
              <span className="font-semibold text-amber-400">B.Tech, CSE (3rd Year)</span>
            </div>
            <div className="text-left">
              <span className="text-slate-400 block text-[11px]">Domain:</span>
              <span className="font-semibold text-indigo-400">On-Demand Freight Logistics</span>
            </div>
          </div>
        </div>

        {/* Executive Summary & Problem Statement */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="p-6 sm:p-8 rounded-3xl bg-white/[0.02] border border-white/10 space-y-4 backdrop-blur-md">
            <div className="w-10 h-10 rounded-xl bg-indigo-500/10 text-indigo-400 flex items-center justify-center">
              <Target className="w-5 h-5" />
            </div>
            <h2 className="font-bold text-2xl text-white">1. Executive Summary</h2>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              India's ride-hailing and micro-delivery space is well served for two-wheelers—Rapido being the clearest example—but no comparable, trusted, on-demand platform exists for goods vehicles such as mini-trucks, lorries, tempos, and load-autos.
            </p>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              Businesses and individuals who need to move goods between cities still rely on informal networks, phone calls, and local transporters with zero pricing transparency or live tracking. LoadLink bridges this gap.
            </p>
          </div>

          <div className="p-6 sm:p-8 rounded-3xl bg-white/[0.02] border border-white/10 space-y-4 backdrop-blur-md">
            <div className="w-10 h-10 rounded-xl bg-red-500/10 text-red-400 flex items-center justify-center">
              <AlertTriangle className="w-5 h-5" />
            </div>
            <h2 className="font-bold text-2xl text-white">2. Problem Statement</h2>
            <ul className="space-y-2.5 text-xs sm:text-sm text-slate-300">
              <li className="flex items-start gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-red-400 mt-2 shrink-0" />
                <span>No standardized, trusted app for booking load-carriers on demand.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-red-400 mt-2 shrink-0" />
                <span>Customers depend on local brokers with arbitrary high pricing and no tracking.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-red-400 mt-2 shrink-0" />
                <span>Truck drivers frequently complete a one-way trip and return completely empty, burning fuel and tolls with zero revenue.</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Market Gap Analysis Table: Bike-based Apps vs Load-Carrier Requirements */}
        <div className="p-6 sm:p-8 rounded-3xl bg-white/[0.02] border border-white/10 space-y-6 backdrop-blur-md">
          <div className="flex items-center justify-between">
            <div>
              <span className="text-xs font-bold text-indigo-400 uppercase tracking-wider">Feasibility Gap Analysis</span>
              <h3 className="font-bold text-2xl text-white mt-1">
                3. Why Existing Bike Apps Fall Short
              </h3>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs sm:text-sm">
              <thead>
                <tr className="border-b border-white/10 text-slate-400">
                  <th className="pb-3 font-semibold">Aspect</th>
                  <th className="pb-3 font-semibold text-slate-300">Bike-based Apps (Rapido-type)</th>
                  <th className="pb-3 font-semibold text-indigo-400">Load-Carrier Requirement (LoadLink)</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5 text-slate-300">
                <tr>
                  <td className="py-3 font-medium text-white">Vehicle Type</td>
                  <td className="py-3 text-slate-400">Two-wheelers only</td>
                  <td className="py-3 text-indigo-300 font-semibold">Auto, Mini-truck, Lorry, Tempo, Containers</td>
                </tr>
                <tr>
                  <td className="py-3 font-medium text-white">Load Size</td>
                  <td className="py-3 text-slate-400">Person / small parcel</td>
                  <td className="py-3 text-indigo-300 font-semibold">Bulk household goods, business cargo, raw materials</td>
                </tr>
                <tr>
                  <td className="py-3 font-medium text-white">Trip Length</td>
                  <td className="py-3 text-slate-400">Mostly intra-city, short distances</td>
                  <td className="py-3 text-indigo-300 font-semibold">Intra-city & long-distance inter-city corridors</td>
                </tr>
                <tr>
                  <td className="py-3 font-medium text-white">Return Trip Impact</td>
                  <td className="py-3 text-slate-400">Not a major cost factor</td>
                  <td className="py-3 text-indigo-300 font-semibold">Empty return trip is a major loss for vehicle owners</td>
                </tr>
                <tr>
                  <td className="py-3 font-medium text-white">Trust & Security</td>
                  <td className="py-3 text-slate-400">Ride safety & helmet</td>
                  <td className="py-3 text-indigo-300 font-semibold">Goods safety, in-transit insurance, OTP delivery proof</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* Core Innovation: Return Load Matching Breakdown */}
        <div className="p-6 sm:p-8 rounded-3xl bg-white/[0.03] border border-indigo-500/30 space-y-6 backdrop-blur-md">
          <div className="flex items-center gap-3">
            <div className="p-3 rounded-2xl bg-indigo-500/20 text-indigo-400">
              <RotateCcw className="w-6 h-6" />
            </div>
            <div>
              <span className="text-xs font-bold text-indigo-400 uppercase tracking-wider">The Unique Innovation</span>
              <h3 className="font-bold text-2xl text-white">
                4. Core Innovation: Return-Load Matching
              </h3>
            </div>
          </div>

          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
            The idea that anchors this proposal: <strong>an empty return trip is a wasted asset</strong>. By matching a return-direction booking before or during the forward trip, LoadLink turns a one-way, single-earning trip into a round-trip, double-earning trip.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
            <div className="p-4 rounded-xl bg-[#020617]/80 border border-white/10 space-y-1.5">
              <span className="font-bold text-white">1. Transporter Profitability</span>
              <p className="text-slate-400">
                Drivers earn on both legs of the highway, boosting daily profitability on the road by up to 140%.
              </p>
            </div>
            <div className="p-4 rounded-xl bg-[#020617]/80 border border-white/10 space-y-1.5">
              <span className="font-bold text-emerald-400">2. Customer Discount</span>
              <p className="text-slate-400">
                Shippers on the return route get a 30%+ lower fare because the vehicle is already covering highway tolls.
              </p>
            </div>
            <div className="p-4 rounded-xl bg-[#020617]/80 border border-white/10 space-y-1.5">
              <span className="font-bold text-indigo-400">3. Environmental Efficiency</span>
              <p className="text-slate-400">
                Reduces empty-running kilometers, lowering fuel consumption and greenhouse gas emissions per ton.
              </p>
            </div>
          </div>
        </div>

        {/* SWOT Analysis Matrix */}
        <div className="p-6 sm:p-8 rounded-3xl bg-white/[0.02] border border-white/10 space-y-6 backdrop-blur-md">
          <div className="flex items-center gap-2">
            <Layers className="w-5 h-5 text-indigo-400" />
            <h3 className="font-bold text-2xl text-white">5. SWOT Analysis</h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs sm:text-sm">
            <div className="p-4 rounded-2xl bg-emerald-950/20 border border-emerald-500/30 space-y-2">
              <span className="font-bold text-emerald-400 uppercase tracking-wider text-xs">Strengths</span>
              <ul className="space-y-1.5 text-slate-300 list-disc list-inside">
                <li>Clear, underserved gap for goods carriers in South India.</li>
                <li>Unique return-load matching model maximizes driver yield.</li>
                <li>Familiar, proven ride-hailing UX adapted for freight.</li>
              </ul>
            </div>

            <div className="p-4 rounded-2xl bg-amber-950/20 border border-amber-500/30 space-y-2">
              <span className="font-bold text-amber-400 uppercase tracking-wider text-xs">Weaknesses</span>
              <ul className="space-y-1.5 text-slate-300 list-disc list-inside">
                <li>Trust-building takes time in cargo vs passenger rides.</li>
                <li>Requires critical mass of vehicles on both corridor ends.</li>
                <li>Freight demand varies with agricultural harvesting seasons.</li>
              </ul>
            </div>

            <div className="p-4 rounded-2xl bg-indigo-950/20 border border-indigo-500/30 space-y-2">
              <span className="font-bold text-indigo-400 uppercase tracking-wider text-xs">Opportunities</span>
              <ul className="space-y-1.5 text-slate-300 list-disc list-inside">
                <li>Digitization of ₹10,000+ Crore informal road freight market.</li>
                <li>Hyper-local rollout on Hyderabad-Bengaluru and Hyderabad-Vijayawada corridors.</li>
                <li>Value-added services: In-transit insurance & warehousing.</li>
              </ul>
            </div>

            <div className="p-4 rounded-2xl bg-red-950/20 border border-red-500/30 space-y-2">
              <span className="font-bold text-red-400 uppercase tracking-wider text-xs">Threats</span>
              <ul className="space-y-1.5 text-slate-300 list-disc list-inside">
                <li>Entrenched local offline transport broker syndicates.</li>
                <li>Driver smartphone literacy & onboarding friction.</li>
                <li>Fluctuating state fuel prices and inter-state border RTO checks.</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Implementation Roadmap */}
        <div className="p-6 sm:p-8 rounded-3xl bg-white/[0.02] border border-white/10 space-y-6 backdrop-blur-md">
          <div className="flex items-center gap-2">
            <TrendingUp className="w-5 h-5 text-indigo-400" />
            <h3 className="font-bold text-2xl text-white">6. 5-Phase Implementation Roadmap</h3>
          </div>

          <div className="space-y-4">
            <div className="flex items-start gap-4 p-4 rounded-2xl bg-[#020617]/70 border border-white/10">
              <span className="px-2.5 py-1 rounded-lg bg-indigo-500/20 text-indigo-400 font-bold text-xs font-mono">Phase 1</span>
              <div>
                <h4 className="font-bold text-white text-sm">Validate Corridor Demand</h4>
                <p className="text-xs text-slate-400 mt-0.5">Interview 100+ local transporters and shifting customers on Hyderabad-Bengaluru corridor.</p>
              </div>
            </div>

            <div className="flex items-start gap-4 p-4 rounded-2xl bg-[#020617]/70 border border-white/10">
              <span className="px-2.5 py-1 rounded-lg bg-cyan-500/20 text-cyan-400 font-bold text-xs font-mono">Phase 2</span>
              <div>
                <h4 className="font-bold text-white text-sm">MVP Booking & Return Matching</h4>
                <p className="text-xs text-slate-400 mt-0.5">Deploy React + Supabase cloud platform with live GPS corridor tracking on NH44.</p>
              </div>
            </div>

            <div className="flex items-start gap-4 p-4 rounded-2xl bg-[#020617]/70 border border-white/10">
              <span className="px-2.5 py-1 rounded-lg bg-emerald-500/20 text-emerald-400 font-bold text-xs font-mono">Phase 3</span>
              <div>
                <h4 className="font-bold text-white text-sm">Trust & Escrow Layer</h4>
                <p className="text-xs text-slate-400 mt-0.5">Integrate automated KYC verification, digital proof of delivery, and escrow payouts.</p>
              </div>
            </div>

            <div className="flex items-start gap-4 p-4 rounded-2xl bg-[#020617]/70 border border-white/10">
              <span className="px-2.5 py-1 rounded-lg bg-purple-500/20 text-purple-400 font-bold text-xs font-mono">Phase 4</span>
              <div>
                <h4 className="font-bold text-white text-sm">Expand Vehicle Classes</h4>
                <p className="text-xs text-slate-400 mt-0.5">Add 24-ton container trucks, agricultural bulk tempos, and inter-state logistics fleets.</p>
              </div>
            </div>

            <div className="flex items-start gap-4 p-4 rounded-2xl bg-[#020617]/70 border border-white/10">
              <span className="px-2.5 py-1 rounded-lg bg-indigo-500/20 text-indigo-400 font-bold text-xs font-mono">Phase 5</span>
              <div>
                <h4 className="font-bold text-white text-sm">Scale & Business Subscriptions</h4>
                <p className="text-xs text-slate-400 mt-0.5">Enterprise TMS integration, in-transit insurance underwriting, and pan-India corridor coverage.</p>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom CTA */}
        <div className="text-center pt-4">
          <button
            onClick={() => setCurrentPage('features')}
            className="px-8 py-3.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-sm shadow-xl shadow-indigo-500/25 transition-all inline-flex items-center gap-2 cursor-pointer"
          >
            <span>Explore Matching Features & Tech</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
