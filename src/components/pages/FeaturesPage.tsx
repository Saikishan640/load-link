import React, { useState } from 'react';
import { 
  RotateCcw, 
  ShieldCheck, 
  MapPin, 
  Lock, 
  Camera, 
  Smartphone, 
  CheckCircle2, 
  ArrowRight, 
  Sparkles, 
  Calculator, 
  Truck, 
  Layers, 
  DollarSign,
  AlertCircle
} from 'lucide-react';
import { useData } from '../../context/DataContext';

interface FeaturesPageProps {
  setCurrentPage: (page: string) => void;
}

export const FeaturesPage: React.FC<FeaturesPageProps> = ({ setCurrentPage }) => {
  const { corridors } = useData();

  // Interactive step workflow visualizer
  const [activeStep, setActiveStep] = useState(0);

  // Cargo payload calculator
  const [cargoWeight, setCargoWeight] = useState(2500);
  const [cargoType, setCargoType] = useState('Household Furniture & Electronics');

  const steps = [
    {
      num: '01',
      title: 'Post a Load',
      desc: 'Customer enters pickup point, drop point, goods type, approximate weight, and preferred loading window.',
      icon: MapPin,
      badge: 'Step 1 • Instant Input',
      color: 'text-indigo-400 bg-indigo-500/10 border-indigo-500/30',
    },
    {
      num: '02',
      title: 'Vehicle Matching',
      desc: 'LoadLink matches available nearby vehicles by payload capacity and route corridor, similar to how Rapido matches riders.',
      icon: Truck,
      badge: 'Step 2 • Geo-Matching',
      color: 'text-indigo-300 bg-indigo-500/10 border-indigo-500/30',
    },
    {
      num: '03',
      title: 'Transparent Fare & Escrow Booking',
      desc: 'Customer sees an upfront fare with zero haggling. Payment is held in secure escrow until safe delivery.',
      icon: DollarSign,
      badge: 'Step 3 • Zero Haggling',
      color: 'text-amber-400 bg-amber-500/10 border-amber-500/30',
    },
    {
      num: '04',
      title: 'Live GPS Highway Tracking',
      desc: 'Real-time vehicle telemetry along NH44 and NH65 with milestone updates (Loaded, In-Transit, Toll Plaza, Arrived).',
      icon: Smartphone,
      badge: 'Step 4 • Sub-Minute GPS',
      color: 'text-purple-400 bg-purple-500/10 border-purple-500/30',
    },
    {
      num: '05',
      title: 'OTP Delivery Confirmation',
      desc: 'Tamper-seal inspection and confidential 4-digit recipient OTP confirms delivery. Funds released to driver wallet.',
      icon: ShieldCheck,
      badge: 'Step 5 • Fraud-Proof',
      color: 'text-emerald-400 bg-emerald-500/10 border-emerald-500/30',
    },
    {
      num: '06',
      title: 'Smart Return-Load Matching',
      desc: 'The app automatically matches a return shipment from the destination city, turning empty return miles into double profit.',
      icon: RotateCcw,
      badge: 'Step 6 • The LoadLink Edge',
      color: 'text-indigo-300 bg-indigo-500/20 border-indigo-500/40',
    },
  ];

  const getRecommendedVehicle = (w: number) => {
    if (w <= 600) return { name: 'Load Auto / Ape', cap: '500 kg', kmRate: '₹14/km', fuel: '30 km/L' };
    if (w <= 1500) return { name: 'Tata Ace (Chota Hathi)', cap: '1,200 kg', kmRate: '₹22/km', fuel: '18 km/L' };
    if (w <= 9000) return { name: 'Ashok Leyland 12ft Lorry', cap: '8,500 kg', kmRate: '₹38/km', fuel: '8 km/L' };
    return { name: 'Multi-Axle Heavy Container', cap: '24,000 kg', kmRate: '₹65/km', fuel: '4 km/L' };
  };

  const recVeh = getRecommendedVehicle(cargoWeight);

  return (
    <div className="min-h-screen bg-[#020617] text-slate-100 py-12 sm:py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto space-y-16">
        {/* Header */}
        <div className="text-center space-y-4">
          <span className="px-3.5 py-1.5 rounded-full bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 text-xs font-bold uppercase tracking-wider">
            Platform Capabilities
          </span>
          <h1 className="font-extrabold text-3xl sm:text-4xl lg:text-5xl text-white">
            How <span className="text-indigo-400">LoadLink</span> Works
          </h1>
          <p className="text-sm sm:text-base text-slate-300 max-w-2xl mx-auto">
            From instant freight booking and live telemetry to our proprietary automated return-load matching algorithm.
          </p>
        </div>

        {/* Step-by-Step Interactive Workflow */}
        <div className="p-6 sm:p-8 rounded-3xl bg-white/[0.02] border border-white/10 space-y-8 backdrop-blur-md">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
              <span className="text-xs font-bold text-indigo-400 uppercase tracking-wider">Interactive Workflow</span>
              <h2 className="font-bold text-2xl text-white mt-1">The 6-Step Logistics Cycle</h2>
            </div>
            <div className="flex items-center gap-1.5 overflow-x-auto max-w-full pb-2">
              {steps.map((s, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveStep(idx)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                    activeStep === idx
                      ? 'bg-indigo-600 text-white shadow-md shadow-indigo-500/20'
                      : 'bg-white/5 text-slate-400 hover:text-white hover:bg-white/10'
                  }`}
                >
                  Step {idx + 1}
                </button>
              ))}
            </div>
          </div>

          {/* Active Step Feature Showcase */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-center">
            <div className="lg:col-span-2 space-y-4 p-6 rounded-2xl bg-[#020617]/80 border border-white/10">
              <div className="flex items-center gap-2">
                <span className={`px-2.5 py-1 rounded-full text-xs font-bold border ${steps[activeStep].color}`}>
                  {steps[activeStep].badge}
                </span>
                <span className="text-xs text-slate-500 font-mono">Workflow Phase {steps[activeStep].num}/06</span>
              </div>
              <h3 className="font-bold text-2xl text-white">
                {steps[activeStep].title}
              </h3>
              <p className="text-sm text-slate-300 leading-relaxed">
                {steps[activeStep].desc}
              </p>

              <div className="pt-4 flex items-center gap-4">
                <button
                  onClick={() => setActiveStep((prev) => (prev + 1) % steps.length)}
                  className="px-4 py-2 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-xs font-semibold text-white transition-all flex items-center gap-1.5 cursor-pointer"
                >
                  <span>Next Step</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
                <button
                  onClick={() => setCurrentPage('dashboard')}
                  className="text-xs text-indigo-400 hover:text-indigo-300 font-semibold underline underline-offset-4 cursor-pointer"
                >
                  Try in Live Dashboard →
                </button>
              </div>
            </div>

            {/* Visual Icon Card */}
            <div className="p-8 rounded-2xl bg-white/[0.03] border border-white/10 flex flex-col items-center justify-center text-center space-y-3">
              {React.createElement(steps[activeStep].icon, { className: 'w-14 h-14 text-indigo-400' })}
              <span className="font-bold text-white text-base">
                {steps[activeStep].title}
              </span>
              <p className="text-[11px] text-slate-400">Automated by LoadLink Matching Engine</p>
            </div>
          </div>
        </div>

        {/* Cargo Payload & Vehicle Recommendation Calculator */}
        <div className="p-6 sm:p-8 rounded-3xl bg-white/[0.02] border border-white/10 space-y-6 backdrop-blur-md">
          <div className="flex items-center gap-3">
            <div className="p-3 rounded-2xl bg-indigo-500/10 text-indigo-400">
              <Calculator className="w-6 h-6" />
            </div>
            <div>
              <span className="text-xs font-bold text-indigo-400 uppercase tracking-wider">Payload Intelligence</span>
              <h2 className="font-bold text-2xl text-white">
                Vehicle Recommendation Calculator
              </h2>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Select Cargo Category</label>
                <select
                  value={cargoType}
                  onChange={(e) => setCargoType(e.target.value)}
                  className="w-full bg-[#020617] border border-white/10 rounded-xl px-3.5 py-2.5 text-xs text-white focus:border-indigo-400 focus:outline-none"
                >
                  <option value="Household Furniture & Electronics">Household Furniture & Electronics</option>
                  <option value="Packaged FMCG Goods">Packaged FMCG & Grocery Goods</option>
                  <option value="Agricultural Produce & Grains">Agricultural Produce & Fresh Grains</option>
                  <option value="Industrial Raw Materials">Industrial Raw Materials & Metal</option>
                  <option value="Construction Hardware">Construction Hardware & Cement</option>
                </select>
              </div>

              <div>
                <div className="flex justify-between items-center mb-1">
                  <label className="text-xs font-semibold text-slate-300">Estimated Cargo Weight</label>
                  <span className="text-xs font-mono font-bold text-indigo-400">{cargoWeight.toLocaleString()} kg</span>
                </div>
                <input
                  type="range"
                  min="200"
                  max="20000"
                  step="100"
                  value={cargoWeight}
                  onChange={(e) => setCargoWeight(Number(e.target.value))}
                  className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-indigo-500"
                />
                <div className="flex justify-between text-[10px] text-slate-500 mt-1">
                  <span>200 kg (Auto)</span>
                  <span>5,000 kg (Lorry)</span>
                  <span>20,000 kg (Container)</span>
                </div>
              </div>
            </div>

            {/* Recommendation Result Card */}
            <div className="p-5 rounded-2xl bg-[#020617]/80 border border-indigo-500/30 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-indigo-400 uppercase tracking-wider">Recommended Vehicle</span>
                <span className="text-[10px] px-2 py-0.5 rounded-full bg-indigo-500/20 text-indigo-300 border border-indigo-500/30 font-semibold">
                  Optimal Payload Fit
                </span>
              </div>

              <h4 className="font-bold text-xl text-white flex items-center gap-2">
                <Truck className="w-5 h-5 text-indigo-400" />
                {recVeh.name}
              </h4>

              <div className="grid grid-cols-3 gap-2 text-xs pt-2 border-t border-white/10">
                <div>
                  <span className="text-[10px] text-slate-400 block">Payload Limit</span>
                  <span className="font-bold text-slate-200">{recVeh.cap}</span>
                </div>
                <div>
                  <span className="text-[10px] text-slate-400 block">Estimated Rate</span>
                  <span className="font-bold text-emerald-400">{recVeh.kmRate}</span>
                </div>
                <div>
                  <span className="text-[10px] text-slate-400 block">Fuel Mileage</span>
                  <span className="font-bold text-slate-200">{recVeh.fuel}</span>
                </div>
              </div>

              <p className="text-[11px] text-slate-400 pt-1">
                Matched automatically to minimize dead axle weight and provide the lowest per-ton freight tariff.
              </p>
            </div>
          </div>
        </div>

        {/* Live Highway Corridor Table */}
        <div className="p-6 sm:p-8 rounded-3xl bg-white/[0.02] border border-white/10 space-y-6 backdrop-blur-md">
          <div>
            <span className="text-xs font-bold text-emerald-400 uppercase tracking-wider">Regional Coverage</span>
            <h2 className="font-bold text-2xl text-white mt-1">
              Active Express Corridors
            </h2>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs sm:text-sm">
              <thead>
                <tr className="border-b border-white/10 text-slate-400">
                  <th className="pb-3 font-semibold">Corridor Name</th>
                  <th className="pb-3 font-semibold">Distance</th>
                  <th className="pb-3 font-semibold">Avg Transit</th>
                  <th className="pb-3 font-semibold">Active Fleet</th>
                  <th className="pb-3 font-semibold text-indigo-400">Return Match Rate</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5 text-slate-300">
                {corridors.map((c) => (
                  <tr key={c.id}>
                    <td className="py-3.5 font-bold text-white flex items-center gap-2">
                      <MapPin className="w-3.5 h-3.5 text-indigo-400" />
                      {c.name}
                    </td>
                    <td className="py-3.5 text-slate-400">{c.distanceKm} km</td>
                    <td className="py-3.5 text-slate-400">{c.avgDurationHours} hours</td>
                    <td className="py-3.5">
                      <span className="px-2 py-0.5 rounded-full bg-emerald-500/15 text-emerald-300 border border-emerald-500/20 font-mono text-xs">
                        {c.activeVehicles} Trucks Live
                      </span>
                    </td>
                    <td className="py-3.5 font-bold text-amber-400 font-mono">
                      {c.returnLoadSuccessRate}%
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* CTA */}
        <div className="text-center">
          <button
            onClick={() => setCurrentPage('pricing')}
            className="px-8 py-3.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-sm shadow-xl shadow-indigo-500/25 transition-all inline-flex items-center gap-2 cursor-pointer"
          >
            <span>View Transparent Pricing & Rates</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
