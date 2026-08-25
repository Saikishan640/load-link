import React from 'react';
import { 
  Package, 
  RotateCcw, 
  Truck, 
  Wallet, 
  Navigation, 
  ArrowRight, 
  ShieldCheck, 
  Clock, 
  CheckCircle2, 
  TrendingUp, 
  MapPin, 
  Sparkles,
  Zap,
  Leaf
} from 'lucide-react';
import { useData } from '../../context/DataContext';
import { useAuth } from '../../context/AuthContext';

interface DashboardOverviewProps {
  setCurrentTab: (tab: string) => void;
  openPostLoadModal: () => void;
}

export const DashboardOverview: React.FC<DashboardOverviewProps> = ({
  setCurrentTab,
  openPostLoadModal,
}) => {
  const { loads, returnLoads, activeTracking, vehicles, bookings, matchReturnLoad } = useData();
  const { currentUser, role } = useAuth();

  const activeShipmentsCount = loads.filter((l) => l.status === 'in_transit' || l.status === 'posted').length;
  const availableReturnMatches = returnLoads.filter((r) => r.status === 'available');

  return (
    <div className="space-y-6">
      {/* Top Banner with Role-Aware Context */}
      <div className="rounded-3xl bg-gradient-to-r from-slate-900/90 via-slate-900/60 to-indigo-950/40 border border-white/10 p-6 shadow-xl flex flex-col md:flex-row items-start md:items-center justify-between gap-4 backdrop-blur-xl">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold text-indigo-400 uppercase tracking-wider">
              {role === 'driver' ? 'Transporter Fleet Portal' : role === 'business' ? 'Enterprise Logistics Terminal' : 'Shipper Dispatch Command'}
            </span>
            <span className="flex h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
          </div>
          <h2 className="font-bold text-2xl text-white">
            Welcome back, {currentUser?.name || 'Shipper'}!
          </h2>
          <p className="text-xs text-slate-300">
            NH44 Hyderabad ↔ Bengaluru corridor matching engine running at 94.2% efficiency.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={openPostLoadModal}
            className="px-4 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs shadow-lg shadow-indigo-500/25 transition-all flex items-center gap-1.5 cursor-pointer"
          >
            <Package className="w-4 h-4" />
            <span>Post Consignment</span>
          </button>
          <button
            onClick={() => setCurrentTab('return_loads')}
            className="px-4 py-2.5 rounded-xl bg-white/5 hover:bg-white/10 text-white font-semibold text-xs border border-white/10 flex items-center gap-1.5 transition-colors cursor-pointer"
          >
            <RotateCcw className="w-4 h-4 text-indigo-400" />
            <span>Find Return Load</span>
          </button>
        </div>
      </div>

      {/* KPI Metric Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="p-5 rounded-2xl bg-white/[0.02] border border-white/10 space-y-2 backdrop-blur-md">
          <div className="flex items-center justify-between text-slate-400">
            <span className="text-xs font-medium">Active Shipments</span>
            <Package className="w-4 h-4 text-indigo-400" />
          </div>
          <div className="flex items-baseline gap-2">
            <span className="font-extrabold text-2xl sm:text-3xl text-white">
              {activeShipmentsCount}
            </span>
            <span className="text-[10px] text-indigo-400 font-semibold">Live in Transit</span>
          </div>
        </div>

        <div className="p-5 rounded-2xl bg-white/[0.02] border border-white/10 space-y-2 backdrop-blur-md">
          <div className="flex items-center justify-between text-slate-400">
            <span className="text-xs font-medium">Return Matches</span>
            <RotateCcw className="w-4 h-4 text-amber-400" />
          </div>
          <div className="flex items-baseline gap-2">
            <span className="font-extrabold text-2xl sm:text-3xl text-amber-400">
              {availableReturnMatches.length}
            </span>
            <span className="text-[10px] text-emerald-400 font-semibold">-32% Tariff Discount</span>
          </div>
        </div>

        <div className="p-5 rounded-2xl bg-white/[0.02] border border-white/10 space-y-2 backdrop-blur-md">
          <div className="flex items-center justify-between text-slate-400">
            <span className="text-xs font-medium">Escrow Wallet Balance</span>
            <Wallet className="w-4 h-4 text-emerald-400" />
          </div>
          <div className="flex items-baseline gap-2">
            <span className="font-extrabold text-2xl sm:text-3xl text-emerald-400">
              ₹{(currentUser?.wallet_balance || 14500).toLocaleString()}
            </span>
          </div>
        </div>

        <div className="p-5 rounded-2xl bg-white/[0.02] border border-white/10 space-y-2 backdrop-blur-md">
          <div className="flex items-center justify-between text-slate-400">
            <span className="text-xs font-medium">Empty Miles Eliminated</span>
            <Leaf className="w-4 h-4 text-emerald-400" />
          </div>
          <div className="flex items-baseline gap-2">
            <span className="font-extrabold text-2xl sm:text-3xl text-emerald-400">
              1,130 km
            </span>
            <span className="text-[10px] text-emerald-400 font-semibold">~240kg CO2</span>
          </div>
        </div>
      </div>

      {/* Live Highway Tracking Spotlight */}
      <div className="p-6 rounded-3xl bg-white/[0.02] border border-white/10 space-y-4 backdrop-blur-md">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-xl bg-indigo-500/10 text-indigo-400">
              <Navigation className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-bold text-lg text-white">Live Highway Corridor Tracking</h3>
              <p className="text-xs text-slate-400">Active Consignment #LD-101 • Vehicle TS 09 UA 8842</p>
            </div>
          </div>
          <button
            onClick={() => setCurrentTab('tracking')}
            className="px-3 py-1.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-xs font-semibold text-indigo-300 flex items-center gap-1 transition-colors cursor-pointer"
          >
            <span>Full Map Screen</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Progress Bar & Telemetry */}
        <div className="p-4 rounded-2xl bg-[#020617]/80 border border-white/10 space-y-3">
          <div className="flex items-center justify-between text-xs">
            <span className="font-bold text-white flex items-center gap-1.5">
              <MapPin className="w-3.5 h-3.5 text-emerald-400" />
              Hyderabad (Gachibowli)
            </span>
            <span className="font-mono text-indigo-400 font-bold">
              {activeTracking.progress_percent}% En Route
            </span>
            <span className="font-bold text-white flex items-center gap-1.5">
              <MapPin className="w-3.5 h-3.5 text-amber-400" />
              Bengaluru (Whitefield)
            </span>
          </div>

          <div className="w-full h-2.5 bg-slate-800 rounded-full overflow-hidden relative">
            <div
              className="h-full bg-gradient-to-r from-indigo-500 via-emerald-500 to-amber-400 rounded-full transition-all duration-1000"
              style={{ width: `${activeTracking.progress_percent}%` }}
            />
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-[11px] pt-1 text-slate-400">
            <div>
              <span className="block text-slate-500 font-medium">Current Position:</span>
              <span className="text-slate-200 font-semibold truncate block">
                {activeTracking.current_location_name}
              </span>
            </div>
            <div>
              <span className="block text-slate-500 font-medium">Highway Speed:</span>
              <span className="text-emerald-400 font-mono font-bold">
                {activeTracking.speed_kmh} km/h
              </span>
            </div>
            <div>
              <span className="block text-slate-500 font-medium">ETA to Destination:</span>
              <span className="text-amber-400 font-bold">
                {activeTracking.eta_hours} hours remaining
              </span>
            </div>
            <div>
              <span className="block text-slate-500 font-medium">Next Waypoint:</span>
              <span className="text-slate-300 font-medium truncate block">
                {activeTracking.next_waypoint}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Return Load Match Opportunities Spotlight */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="p-6 rounded-3xl bg-white/[0.02] border border-white/10 space-y-4 backdrop-blur-md">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <RotateCcw className="w-5 h-5 text-indigo-400" />
              <h3 className="font-bold text-lg text-white">
                Available Return-Load Deals
              </h3>
            </div>
            <span className="text-xs text-emerald-400 font-bold px-2 py-0.5 rounded-full bg-emerald-500/10 border border-emerald-500/20">Save 30%+</span>
          </div>

          <div className="space-y-3">
            {availableReturnMatches.slice(0, 2).map((ret) => (
              <div
                key={ret.id}
                className="p-4 rounded-2xl bg-[#020617]/70 border border-white/10 hover:border-indigo-500/30 space-y-2 transition-all"
              >
                <div className="flex items-center justify-between text-xs">
                  <span className="font-bold text-white">{ret.pickup_location.split(',')[0]} → {ret.destination.split(',')[0]}</span>
                  <span className="px-2 py-0.5 rounded-full bg-emerald-500/15 text-emerald-400 font-bold border border-emerald-500/30">
                    {ret.savings_percent}% OFF
                  </span>
                </div>

                <div className="flex items-center justify-between text-xs text-slate-400">
                  <span>Driver: {ret.driver_name} ({ret.vehicle_type.toUpperCase()})</span>
                  <div>
                    <span className="line-through text-slate-500 mr-2 font-mono">₹{ret.normal_fare.toLocaleString()}</span>
                    <span className="text-indigo-400 font-bold font-mono text-sm">₹{ret.fare.toLocaleString()}</span>
                  </div>
                </div>

                <button
                  onClick={() => setCurrentTab('return_loads')}
                  className="w-full py-2 rounded-xl bg-indigo-500/15 hover:bg-indigo-500/25 text-indigo-300 font-semibold text-xs border border-indigo-500/30 flex items-center justify-center gap-1.5 transition-all cursor-pointer"
                >
                  <Sparkles className="w-3.5 h-3.5 text-indigo-400" />
                  <span>Lock Return Load Match</span>
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Freight Activity Feed */}
        <div className="p-6 rounded-3xl bg-white/[0.02] border border-white/10 space-y-4 backdrop-blur-md">
          <div className="flex items-center justify-between">
            <h3 className="font-bold text-lg text-white">Recent Freight History</h3>
            <button
              onClick={() => setCurrentTab('loads')}
              className="text-xs text-indigo-400 hover:text-indigo-300 transition-colors font-medium"
            >
              View All Loads →
            </button>
          </div>

          <div className="space-y-3">
            {loads.slice(0, 3).map((l) => (
              <div
                key={l.id}
                className="p-3.5 rounded-2xl bg-[#020617]/70 border border-white/10 flex items-center justify-between text-xs hover:border-white/20 transition-colors"
              >
                <div className="space-y-0.5">
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-white">#{l.id.slice(-6).toUpperCase()}</span>
                    <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold uppercase border ${
                      l.status === 'in_transit'
                        ? 'bg-indigo-500/15 text-indigo-300 border-indigo-500/30'
                        : l.status === 'delivered'
                        ? 'bg-emerald-500/15 text-emerald-300 border-emerald-500/30'
                        : 'bg-amber-500/15 text-amber-300 border-amber-500/30'
                    }`}>
                      {l.status.replace('_', ' ')}
                    </span>
                  </div>
                  <p className="text-[11px] text-slate-400 truncate max-w-[200px]">
                    {l.pickup_location.split(',')[0]} → {l.destination.split(',')[0]}
                  </p>
                </div>

                <div className="text-right">
                  <span className="font-bold text-white font-mono block">₹{l.fare.toLocaleString()}</span>
                  <span className="text-[10px] text-slate-500">{l.weight_kg} kg</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
