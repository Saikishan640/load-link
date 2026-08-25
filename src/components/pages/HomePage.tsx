import React, { useState } from 'react';
import { 
  Truck, 
  RotateCcw, 
  MapPin, 
  ShieldCheck, 
  TrendingUp, 
  Zap, 
  DollarSign, 
  Clock, 
  ChevronRight, 
  CheckCircle, 
  Star, 
  ArrowRight, 
  Sliders, 
  Boxes, 
  Navigation, 
  Sparkles,
  HelpCircle,
  ChevronDown,
  Building,
  UserCheck,
  Fuel,
  Leaf
} from 'lucide-react';
import { useData } from '../../context/DataContext';
import { useAuth } from '../../context/AuthContext';
import { VehicleCategory } from '../../types';

interface HomePageProps {
  setCurrentPage: (page: string) => void;
  openPostLoadModal?: () => void;
}

export const HomePage: React.FC<HomePageProps> = ({ setCurrentPage, openPostLoadModal }) => {
  const { estimateFare, corridors } = useData();
  const { role, switchRole, isAuthenticated } = useAuth();

  // Instant Fare Estimator State
  const [pickupCity, setPickupCity] = useState('Hyderabad, Telangana');
  const [dropCity, setDropCity] = useState('Bengaluru, Karnataka');
  const [selectedVehicle, setSelectedVehicle] = useState<VehicleCategory>('lorry');
  const [weightKg, setWeightKg] = useState<number>(3500);

  // Return Load interactive comparison tab
  const [comparisonMode, setComparisonMode] = useState<'with' | 'without'>('with');

  // FAQ Accordion State
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const fareResult = estimateFare(pickupCity, dropCity, selectedVehicle, weightKg);

  const handleBookNow = () => {
    if (!isAuthenticated) {
      setCurrentPage('login');
    } else {
      setCurrentPage('dashboard');
      if (openPostLoadModal) openPostLoadModal();
    }
  };

  const vehicleOptions = [
    {
      id: 'auto' as VehicleCategory,
      name: 'Load Auto / Ape',
      capacity: '500 kg',
      rate: '₹14/km',
      desc: 'Small intra-city parcel, shop deliveries',
      img: 'https://images.unsplash.com/photo-1528728329032-2972f65dfb3f?w=400&auto=format&fit=crop&q=80',
    },
    {
      id: 'mini_truck' as VehicleCategory,
      name: 'Tata Ace (Chota Hathi)',
      capacity: '1,000 kg',
      rate: '₹22/km',
      desc: 'Household shifting, retail goods, inter-city',
      img: 'https://images.unsplash.com/photo-1586191582056-a6078351fb36?w=400&auto=format&fit=crop&q=80',
    },
    {
      id: 'lorry' as VehicleCategory,
      name: 'Lorry / Mid-Truck',
      capacity: '8,500 kg',
      rate: '₹38/km',
      desc: 'Bulk goods, industrial cargo, agriculture',
      img: 'https://images.unsplash.com/photo-1601584115197-04ecc0da31d7?w=400&auto=format&fit=crop&q=80',
    },
    {
      id: 'container' as VehicleCategory,
      name: 'Heavy Multi-Axle Container',
      capacity: '24,000 kg',
      rate: '₹65/km',
      desc: 'Heavy machinery, large FMCG shipments',
      img: 'https://images.unsplash.com/photo-1519003722824-194d4455a60c?w=400&auto=format&fit=crop&q=80',
    },
  ];

  const faqs = [
    {
      q: 'How does LoadLink Return-Load Matching work?',
      a: 'When a truck drives from Hyderabad to Bengaluru with a shipment, standard operators return empty—losing money on fuel and tolls. LoadLink matches a verified shipper in Bengaluru who needs goods moved back to Hyderabad before or during arrival. Shippers get up to 35% discount, while truck owners double their trip revenue!',
    },
    {
      q: 'How are drivers and vehicles verified on LoadLink?',
      a: 'Every driver must complete digital KYC including government Aadhaar/PAN, verified Commercial Driving License, vehicle RC book, National Fitness Certificate, and commercial vehicle insurance before receiving bookings.',
    },
    {
      q: 'How does the Escrow Payment system protect me?',
      a: 'When you confirm a booking, your payment is held securely in LoadLink Escrow. The driver only receives funds after you verify the physical goods upon arrival and share the confidential 4-digit Delivery OTP.',
    },
    {
      q: 'Is transit goods insurance provided?',
      a: 'Yes, all shipments booked via LoadLink include optional comprehensive transit goods coverage up to ₹50,00,000 against theft, collision, and road accidents with instant claims support.',
    },
  ];

  return (
    <div className="min-h-screen bg-[#020617] text-slate-100 overflow-hidden">
      {/* Ambient background glows */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-[650px] bg-gradient-to-b from-indigo-600/10 via-purple-500/5 to-transparent blur-3xl pointer-events-none -z-10" />

      {/* Hero Section */}
      <section className="relative pt-14 pb-20 lg:pt-20 lg:pb-28 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          {/* Top Pill Announcement */}
          <div className="flex justify-center mb-6">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/5 border border-white/10 text-xs text-indigo-300 shadow-xl backdrop-blur-md">
              <span className="status-indicator" />
              <span className="font-semibold text-white">The Rapido for Goods Vehicles</span>
              <span className="text-slate-600">•</span>
              <span className="text-indigo-300 font-medium">Smart Return-Load Engine</span>
              <ArrowRight className="w-3.5 h-3.5 text-indigo-400" />
            </div>
          </div>

          {/* Hero Headlines */}
          <div className="text-center max-w-4xl mx-auto space-y-5">
            <h1 className="font-extrabold text-4xl sm:text-5xl lg:text-6xl tracking-tight text-white leading-tight">
              On-Demand Freight Booking &{' '}
              <span className="hero-title-gradient">
                Return-Load Matching
              </span>
            </h1>
            <p className="text-base sm:text-lg text-slate-400 max-w-2xl mx-auto leading-relaxed">
              Book trucks, lorries, Tata Aces, and load-autos on-demand. Eliminate empty return miles, cut shipping costs by up to 35%, and track every kilometer with live GPS escrow.
            </p>
          </div>

          {/* Interactive Hero Booking & Estimator Widget (Glassmorphic Card) */}
          <div className="mt-10 max-w-4xl mx-auto rounded-3xl bg-slate-900/60 border border-white/10 p-5 sm:p-8 shadow-2xl backdrop-blur-2xl">
            <div className="flex items-center justify-between pb-4 mb-6 border-b border-white/10">
              <div className="flex items-center gap-3">
                <div className="p-2.5 rounded-xl bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">
                  <Sliders className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="font-bold text-base text-white">
                    Instant Freight & Return-Load Calculator
                  </h3>
                  <p className="text-xs text-slate-400">Accurate toll, diesel, and corridor estimates</p>
                </div>
              </div>
              <span className="text-xs text-emerald-400 font-mono flex items-center gap-1.5 bg-emerald-500/10 px-2.5 py-1 rounded-full border border-emerald-500/20">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                Live Rates Active
              </span>
            </div>

            {/* Inputs Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {/* Pickup City */}
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1.5">Pickup Location</label>
                <div className="relative">
                  <MapPin className="w-4 h-4 text-indigo-400 absolute left-3.5 top-3.5" />
                  <select
                    value={pickupCity}
                    onChange={(e) => setPickupCity(e.target.value)}
                    className="w-full bg-[#020617]/80 border border-white/10 rounded-xl pl-10 pr-3 py-3 text-xs text-white focus:border-indigo-500 focus:outline-none transition-colors"
                  >
                    <option value="Hyderabad, Telangana">Hyderabad, Telangana</option>
                    <option value="Bengaluru, Karnataka">Bengaluru, Karnataka</option>
                    <option value="Vijayawada, AP">Vijayawada, Andhra Pradesh</option>
                    <option value="Chennai, Tamil Nadu">Chennai, Tamil Nadu</option>
                    <option value="Pune, Maharashtra">Pune, Maharashtra</option>
                  </select>
                </div>
              </div>

              {/* Drop City */}
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1.5">Destination</label>
                <div className="relative">
                  <Navigation className="w-4 h-4 text-indigo-400 absolute left-3.5 top-3.5" />
                  <select
                    value={dropCity}
                    onChange={(e) => setDropCity(e.target.value)}
                    className="w-full bg-[#020617]/80 border border-white/10 rounded-xl pl-10 pr-3 py-3 text-xs text-white focus:border-indigo-500 focus:outline-none transition-colors"
                  >
                    <option value="Bengaluru, Karnataka">Bengaluru, Karnataka</option>
                    <option value="Hyderabad, Telangana">Hyderabad, Telangana</option>
                    <option value="Vijayawada, AP">Vijayawada, Andhra Pradesh</option>
                    <option value="Chennai, Tamil Nadu">Chennai, Tamil Nadu</option>
                    <option value="Mumbai, Maharashtra">Mumbai, Maharashtra</option>
                  </select>
                </div>
              </div>

              {/* Vehicle Type */}
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1.5">Vehicle Category</label>
                <div className="relative">
                  <Truck className="w-4 h-4 text-indigo-400 absolute left-3.5 top-3.5" />
                  <select
                    value={selectedVehicle}
                    onChange={(e) => setSelectedVehicle(e.target.value as VehicleCategory)}
                    className="w-full bg-[#020617]/80 border border-white/10 rounded-xl pl-10 pr-3 py-3 text-xs text-white focus:border-indigo-500 focus:outline-none capitalize transition-colors"
                  >
                    <option value="auto">Load Auto (500 kg)</option>
                    <option value="mini_truck">Tata Ace (1.2 Ton)</option>
                    <option value="lorry">Lorry / 12ft (8.5 Ton)</option>
                    <option value="container">Heavy Container (24 Ton)</option>
                  </select>
                </div>
              </div>

              {/* Weight Slider */}
              <div>
                <div className="flex justify-between items-center mb-1.5">
                  <label className="text-xs font-semibold text-slate-300">Cargo Weight</label>
                  <span className="text-xs text-indigo-300 font-mono font-bold">{weightKg.toLocaleString()} kg</span>
                </div>
                <input
                  type="range"
                  min="200"
                  max="20000"
                  step="200"
                  value={weightKg}
                  onChange={(e) => setWeightKg(Number(e.target.value))}
                  className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-indigo-500 mt-3"
                />
              </div>
            </div>

            {/* Calculated Results Bar */}
            <div className="mt-6 p-4.5 rounded-2xl bg-white/[0.03] border border-white/10 flex flex-col md:flex-row items-center justify-between gap-4">
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 w-full md:w-auto text-left">
                <div>
                  <span className="text-[11px] text-slate-400 block">Distance & ETA</span>
                  <span className="text-sm font-bold text-white">
                    {fareResult.distanceKm} km <span className="text-xs text-slate-400 font-normal">({fareResult.durationHours}h)</span>
                  </span>
                </div>

                <div>
                  <span className="text-[11px] text-slate-400 block">Standard 1-Way Fare</span>
                  <span className="text-sm font-bold text-slate-300">
                    ₹{fareResult.totalFare.toLocaleString()}
                  </span>
                </div>

                <div className="p-2 px-3 rounded-xl bg-indigo-500/10 border border-indigo-500/30">
                  <span className="text-[10px] font-bold text-indigo-300 flex items-center gap-1">
                    <RotateCcw className="w-3 h-3 text-indigo-400" /> Return-Load Rate
                  </span>
                  <span className="text-sm font-bold text-white">
                    ₹{fareResult.returnDiscountFare.toLocaleString()}
                  </span>
                </div>

                <div>
                  <span className="text-[11px] text-emerald-400 block font-semibold">You Save</span>
                  <span className="text-sm font-bold text-emerald-400">
                    -₹{fareResult.savingsAmount.toLocaleString()} (32%)
                  </span>
                </div>
              </div>

              <button
                id="hero-instant-book-btn"
                onClick={handleBookNow}
                className="w-full md:w-auto px-6 py-3.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs sm:text-sm shadow-lg shadow-indigo-500/25 hover:shadow-indigo-500/40 hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-2 whitespace-nowrap cursor-pointer"
              >
                <span>Find Matched Carrier</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Quick Metrics Bar */}
          <div className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto">
            <div className="p-5 rounded-2xl bg-white/[0.02] border border-white/10 text-center">
              <span className="text-2xl sm:text-3xl font-extrabold text-white">12,400+</span>
              <p className="text-xs text-slate-400 mt-1">Loads Delivered</p>
            </div>
            <div className="p-5 rounded-2xl bg-white/[0.02] border border-white/10 text-center">
              <span className="text-2xl sm:text-3xl font-extrabold text-emerald-400">₹3.8 Cr+</span>
              <p className="text-xs text-slate-400 mt-1">Driver Double-Earnings</p>
            </div>
            <div className="p-5 rounded-2xl bg-white/[0.02] border border-white/10 text-center">
              <span className="text-2xl sm:text-3xl font-extrabold text-indigo-400">1.8M km</span>
              <p className="text-xs text-slate-400 mt-1">Empty Return Miles Cut</p>
            </div>
            <div className="p-5 rounded-2xl bg-white/[0.02] border border-white/10 text-center">
              <span className="text-2xl sm:text-3xl font-extrabold text-purple-400">4,200+</span>
              <p className="text-xs text-slate-400 mt-1">Verified Trucks & Autos</p>
            </div>
          </div>
        </div>
      </section>

      {/* CORE INNOVATION: The Return-Load Matching Engine Spotlight */}
      <section className="py-20 bg-white/[0.01] border-y border-white/10 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-14">
            <span className="px-3 py-1 rounded-full bg-indigo-500/10 text-indigo-300 text-xs font-bold uppercase tracking-wider border border-indigo-500/20">
              The Core Problem & Solution
            </span>
            <h2 className="font-bold text-3xl sm:text-4xl text-white mt-3">
              Why Return-Load Matching is a Game Changer
            </h2>
            <p className="text-sm text-slate-400 mt-2">
              Traditional logistics wastes 40% of fuel and time returning with empty cargo beds. LoadLink turns a one-way trip into a profitable round trip.
            </p>
          </div>

          {/* Interactive Visual Comparison Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {/* Case A: WITHOUT LoadLink */}
            <div className="rounded-3xl bg-[#020617] border border-red-500/20 p-6 sm:p-8 relative overflow-hidden">
              <div className="flex items-center justify-between mb-4">
                <span className="px-2.5 py-1 rounded-md bg-red-500/15 text-red-400 text-xs font-bold uppercase">
                  Without LoadLink (Traditional)
                </span>
                <span className="text-xs text-red-400/80 font-mono">Single Fare Only</span>
              </div>

              <div className="space-y-4">
                <div className="p-3.5 rounded-xl bg-white/[0.02] border border-white/5">
                  <div className="flex items-center justify-between text-xs text-slate-300 mb-1">
                    <span className="font-bold">Leg 1: Hyderabad → Bengaluru</span>
                    <span className="text-emerald-400 font-semibold">+₹22,000 Fare</span>
                  </div>
                  <p className="text-[11px] text-slate-400">Vehicle carries customer load and earns standard one-way freight.</p>
                </div>

                <div className="p-3.5 rounded-xl bg-red-950/30 border border-red-500/30">
                  <div className="flex items-center justify-between text-xs text-red-300 mb-1">
                    <span className="font-bold">Leg 2: Bengaluru → Hyderabad</span>
                    <span className="text-red-400 font-semibold">₹0 Earned (Empty Run)</span>
                  </div>
                  <p className="text-[11px] text-red-300/80">
                    Vehicle returns empty. Owner pays ₹8,500 for diesel, ₹2,200 for tolls, and driver salary out of pocket!
                  </p>
                </div>

                <div className="pt-3 border-t border-white/5 flex items-center justify-between text-xs">
                  <span className="text-slate-400">Net Operator Profit:</span>
                  <span className="text-base font-bold text-red-400 font-mono">₹11,300 (Low Margin)</span>
                </div>
              </div>
            </div>

            {/* Case B: WITH LoadLink */}
            <div className="rounded-3xl bg-slate-900/60 border border-indigo-500/40 p-6 sm:p-8 relative overflow-hidden shadow-2xl">
              <div className="flex items-center justify-between mb-4">
                <span className="px-3 py-1 rounded-full bg-indigo-500/20 text-indigo-300 text-xs font-bold uppercase flex items-center gap-1.5 border border-indigo-500/30">
                  <Sparkles className="w-3 h-3 text-indigo-400" />
                  With LoadLink Platform
                </span>
                <span className="text-xs text-indigo-300 font-mono font-bold">Double Earning</span>
              </div>

              <div className="space-y-4">
                <div className="p-3.5 rounded-xl bg-white/[0.03] border border-white/10">
                  <div className="flex items-center justify-between text-xs text-slate-200 mb-1">
                    <span className="font-bold">Leg 1: Hyderabad → Bengaluru</span>
                    <span className="text-emerald-400 font-semibold">+₹22,000 Standard Fare</span>
                  </div>
                  <p className="text-[11px] text-slate-400">Vehicle carries customer load and earns full forward trip revenue.</p>
                </div>

                <div className="p-3.5 rounded-xl bg-emerald-950/40 border border-emerald-500/40">
                  <div className="flex items-center justify-between text-xs text-emerald-300 mb-1">
                    <span className="font-bold flex items-center gap-1">
                      <RotateCcw className="w-3.5 h-3.5 text-indigo-400" />
                      Leg 2: Bengaluru → Hyderabad Return Match
                    </span>
                    <span className="text-emerald-400 font-bold">+₹15,800 Extra Fare</span>
                  </div>
                  <p className="text-[11px] text-emerald-200/80">
                    App pre-matches a return shipper at 30% discount. Truck is 100% full both ways!
                  </p>
                </div>

                <div className="pt-3 border-t border-white/10 flex items-center justify-between text-xs">
                  <span className="text-slate-300 font-medium">Net Operator Profit:</span>
                  <span className="text-lg font-extrabold text-indigo-300 font-mono">₹27,100 (+140% Profit!)</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Target Vehicle Categories */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center max-w-3xl mx-auto mb-14">
            <span className="px-3 py-1 rounded-full bg-indigo-500/10 text-indigo-300 text-xs font-bold uppercase tracking-wider border border-indigo-500/20">
              Fleet Capacity
            </span>
            <h2 className="font-bold text-3xl sm:text-4xl text-white mt-3">
              Right Vehicle for Every Cargo Size
            </h2>
            <p className="text-sm text-slate-400 mt-2">
              From local quick shop deliveries to inter-state 24-ton heavy industrial consignments.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {vehicleOptions.map((v) => (
              <div
                key={v.id}
                onClick={() => {
                  setSelectedVehicle(v.id);
                  window.scrollTo({ top: 200, behavior: 'smooth' });
                }}
                className="group rounded-2xl bg-white/[0.02] border border-white/10 hover:border-indigo-500/50 p-4.5 transition-all duration-300 hover:-translate-y-1.5 cursor-pointer shadow-lg"
              >
                <div className="h-36 w-full rounded-xl overflow-hidden mb-4 relative">
                  <img
                    src={v.img}
                    alt={v.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <span className="absolute top-2 right-2 px-2.5 py-0.5 rounded-full bg-[#020617]/90 text-[10px] font-mono text-indigo-300 border border-white/10">
                    {v.rate}
                  </span>
                </div>

                <div className="space-y-1">
                  <h3 className="font-bold text-base text-white group-hover:text-indigo-300 transition-colors">
                    {v.name}
                  </h3>
                  <div className="flex items-center justify-between text-xs text-slate-400">
                    <span>Capacity:</span>
                    <span className="font-semibold text-emerald-400">{v.capacity}</span>
                  </div>
                  <p className="text-xs text-slate-400 pt-1 leading-relaxed">{v.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Trust & Safety Features Grid */}
      <section className="py-20 bg-white/[0.01] border-t border-white/10 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center max-w-3xl mx-auto mb-14">
            <span className="px-3 py-1 rounded-full bg-indigo-500/10 text-indigo-300 text-xs font-bold uppercase tracking-wider border border-indigo-500/20">
              Trust & Technology
            </span>
            <h2 className="font-bold text-3xl sm:text-4xl text-white mt-3">
              Built Around Goods Safety & Driver Reliability
            </h2>
            <p className="text-sm text-slate-400 mt-2">
              For strangers to load ₹5,00,000 of goods onto a vehicle, trust is paramount. LoadLink removes every friction point.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="p-6 rounded-2xl bg-white/[0.02] border border-white/10 hover:border-indigo-500/30 space-y-3 transition-colors">
              <div className="w-10 h-10 rounded-xl bg-indigo-500/10 text-indigo-400 flex items-center justify-center">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-lg text-white">100% KYC Verified Fleet</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Driver Aadhaar, Commercial License, RC registration, and vehicle fitness inspected before onboarding.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-white/[0.02] border border-white/10 hover:border-indigo-500/30 space-y-3 transition-colors">
              <div className="w-10 h-10 rounded-xl bg-indigo-500/10 text-indigo-400 flex items-center justify-center">
                <Navigation className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-lg text-white">Live GPS Highway Telemetry</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Watch vehicle position, speed, and upcoming toll milestones in real time on the interactive corridor map.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-white/[0.02] border border-white/10 hover:border-indigo-500/30 space-y-3 transition-colors">
              <div className="w-10 h-10 rounded-xl bg-emerald-500/10 text-emerald-400 flex items-center justify-center">
                <DollarSign className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-lg text-white">Escrow Payment Protection</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Funds are held safely in escrow and only released to the transporter once you provide the delivery OTP.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-white/[0.02] border border-white/10 hover:border-indigo-500/30 space-y-3 transition-colors">
              <div className="w-10 h-10 rounded-xl bg-purple-500/10 text-purple-400 flex items-center justify-center">
                <Boxes className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-lg text-white">Digital Loading Proof</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Photo evidence captured at pickup and drop with tamper-proof security seal verification.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-white/[0.02] border border-white/10 hover:border-indigo-500/30 space-y-3 transition-colors">
              <div className="w-10 h-10 rounded-xl bg-indigo-500/10 text-indigo-400 flex items-center justify-center">
                <Leaf className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-lg text-white">Carbon Footprint Reduction</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Filling empty return vehicles cuts unnecessary fuel burn, reducing CO2 emissions per ton moved by 28%.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-white/[0.02] border border-white/10 hover:border-indigo-500/30 space-y-3 transition-colors">
              <div className="w-10 h-10 rounded-xl bg-indigo-500/10 text-indigo-400 flex items-center justify-center">
                <Zap className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-lg text-white">24/7 SOS & Route Support</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                One-tap emergency assistance, breakdown mechanic dispatch, and highway transit escalation desk.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center max-w-3xl mx-auto mb-14">
            <span className="px-3 py-1 rounded-full bg-indigo-500/10 text-indigo-300 text-xs font-bold uppercase tracking-wider border border-indigo-500/20">
              Real Experiences
            </span>
            <h2 className="font-bold text-3xl sm:text-4xl text-white mt-3">
              Trusted by Shippers & Transporters
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-6 rounded-2xl bg-white/[0.02] border border-white/10 space-y-4">
              <div className="flex text-amber-400 gap-1">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-current" />
                ))}
              </div>
              <p className="text-xs text-slate-300 italic leading-relaxed">
                "Earlier, whenever I drove my 8.5-ton lorry from Hyderabad to Bengaluru, I had to wait 2 days in Peenya or return empty. With LoadLink return matching, I get a booking before I even reach Karnataka!"
              </p>
              <div className="flex items-center gap-3 pt-2 border-t border-white/10">
                <img
                  src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100"
                  alt="Ramesh"
                  className="w-9 h-9 rounded-full object-cover border border-indigo-400/30"
                />
                <div>
                  <h4 className="text-xs font-bold text-white">Ramesh Kumar</h4>
                  <p className="text-[10px] text-slate-400">Lorry Owner • 140+ Trips on NH44</p>
                </div>
              </div>
            </div>

            <div className="p-6 rounded-2xl bg-white/[0.02] border border-white/10 space-y-4">
              <div className="flex text-amber-400 gap-1">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-current" />
                ))}
              </div>
              <p className="text-xs text-slate-300 italic leading-relaxed">
                "We ship commercial FMCG inventory twice a week between Hyderabad and Vijayawada. LoadLink's return-load fares reduced our monthly freight expenses by almost 30% with complete live tracking."
              </p>
              <div className="flex items-center gap-3 pt-2 border-t border-white/10">
                <img
                  src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=100"
                  alt="Priya"
                  className="w-9 h-9 rounded-full object-cover border border-indigo-400/30"
                />
                <div>
                  <h4 className="text-xs font-bold text-white">Priya Sharma</h4>
                  <p className="text-[10px] text-slate-400">Logistics Head • Deccan FMCG</p>
                </div>
              </div>
            </div>

            <div className="p-6 rounded-2xl bg-white/[0.02] border border-white/10 space-y-4">
              <div className="flex text-amber-400 gap-1">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-current" />
                ))}
              </div>
              <p className="text-xs text-slate-300 italic leading-relaxed">
                "Shifted my 2BHK household goods from Hyderabad to Bengaluru. The driver arrived on time, OTP verification gave me total peace of mind, and the price was ₹6,000 less than offline brokers."
              </p>
              <div className="flex items-center gap-3 pt-2 border-t border-white/10">
                <img
                  src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100"
                  alt="Sai"
                  className="w-9 h-9 rounded-full object-cover border border-indigo-400/30"
                />
                <div>
                  <h4 className="text-xs font-bold text-white">Karthik Reddy</h4>
                  <p className="text-[10px] text-slate-400">Software Engineer • Shifting Client</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Accordion */}
      <section className="py-20 bg-white/[0.01] border-t border-white/10 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <span className="px-3 py-1 rounded-full bg-white/5 text-slate-300 text-xs font-bold uppercase tracking-wider border border-white/10">
              Common Questions
            </span>
            <h2 className="font-bold text-3xl text-white mt-3">
              Frequently Asked Questions
            </h2>
          </div>

          <div className="space-y-3">
            {faqs.map((faq, index) => (
              <div
                key={index}
                className="rounded-2xl bg-white/[0.02] border border-white/10 overflow-hidden"
              >
                <button
                  onClick={() => setOpenFaq(openFaq === index ? null : index)}
                  className="w-full p-4 sm:p-5 text-left flex items-center justify-between gap-4 font-semibold text-sm sm:text-base text-white hover:text-indigo-300 transition-colors"
                >
                  <span>{faq.q}</span>
                  <ChevronDown
                    className={`w-4 h-4 text-slate-400 shrink-0 transition-transform duration-200 ${
                      openFaq === index ? 'rotate-180 text-indigo-400' : ''
                    }`}
                  />
                </button>
                {openFaq === index && (
                  <div className="px-4 sm:px-5 pb-5 text-xs text-slate-300 leading-relaxed border-t border-white/5 pt-3">
                    {faq.a}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Bottom CTA Banner */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto rounded-3xl bg-gradient-to-r from-indigo-900/60 via-slate-900/90 to-purple-900/60 border border-white/10 p-8 sm:p-12 shadow-2xl relative overflow-hidden backdrop-blur-xl">
          <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="space-y-2 text-center md:text-left">
              <h2 className="font-extrabold text-2xl sm:text-3xl lg:text-4xl text-white">
                Ready to Move Goods or Maximize Truck Earnings?
              </h2>
              <p className="text-xs sm:text-sm text-slate-300 max-w-xl">
                Join thousands of verified shippers and drivers on South India's premier freight network.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
              <button
                onClick={() => setCurrentPage('register')}
                className="px-6 py-3.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs sm:text-sm transition-all shadow-lg shadow-indigo-500/25 text-center cursor-pointer"
              >
                Sign Up as Shipper
              </button>
              <button
                onClick={() => {
                  switchRole('driver');
                  setCurrentPage('register');
                }}
                className="px-6 py-3.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-white font-bold text-xs sm:text-sm transition-all shadow-lg text-center cursor-pointer"
              >
                Register Vehicle (Driver)
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
