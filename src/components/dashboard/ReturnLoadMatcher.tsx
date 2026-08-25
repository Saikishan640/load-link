import React, { useState } from 'react';
import { 
  RotateCcw, 
  Truck, 
  MapPin, 
  ArrowRight, 
  Sparkles, 
  DollarSign, 
  CheckCircle2, 
  Filter, 
  RefreshCw,
  Zap,
  Leaf
} from 'lucide-react';
import { useData } from '../../context/DataContext';
import { useAuth } from '../../context/AuthContext';

export const ReturnLoadMatcher: React.FC = () => {
  const { returnLoads, loads, matchReturnLoad, refreshReturnMatches } = useData();
  const { role } = useAuth();
  const [selectedCityFilter, setSelectedCityFilter] = useState('all');

  const unassignedLoads = loads.filter((l) => l.status === 'posted');

  const filteredReturnLoads = returnLoads.filter((r) => {
    if (selectedCityFilter === 'all') return true;
    return r.pickup_location.toLowerCase().includes(selectedCityFilter.toLowerCase());
  });

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="rounded-3xl bg-white/[0.02] border border-white/10 p-6 shadow-xl space-y-3 backdrop-blur-md">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <div className="p-2 rounded-xl bg-indigo-500/20 text-indigo-400">
                <RotateCcw className="w-5 h-5" />
              </div>
              <h2 className="font-bold text-2xl text-white">
                Automated Return-Load Matching Engine
              </h2>
            </div>
            <p className="text-xs text-slate-300">
              Eliminate empty return miles. Match vehicles dropping goods at destination hubs with reverse freight.
            </p>
          </div>

          <button
            onClick={refreshReturnMatches}
            className="px-4 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs shadow-md shadow-indigo-500/20 transition-all flex items-center gap-2 cursor-pointer"
          >
            <RefreshCw className="w-4 h-4" />
            <span>Scan 14 Corridors</span>
          </button>
        </div>

        {/* Highlight Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-3 border-t border-white/10 text-xs">
          <div className="p-3 rounded-xl bg-[#020617] border border-white/10">
            <span className="text-slate-400 block">Average Shipper Discount:</span>
            <span className="font-bold text-lg text-emerald-400">30% - 38% OFF</span>
          </div>
          <div className="p-3 rounded-xl bg-[#020617] border border-white/10">
            <span className="text-slate-400 block">Transporter Round-Trip Yield:</span>
            <span className="font-bold text-lg text-amber-400">+140% Net Profit</span>
          </div>
          <div className="p-3 rounded-xl bg-[#020617] border border-white/10">
            <span className="text-slate-400 block">Corridor Matching Speed:</span>
            <span className="font-bold text-lg text-indigo-400">&lt; 4 mins auto-lock</span>
          </div>
        </div>
      </div>

      {/* Filter Bar */}
      <div className="flex items-center justify-between gap-4">
        <div className="flex items-center gap-2 text-xs">
          <Filter className="w-4 h-4 text-slate-400" />
          <span className="text-slate-400">Filter Corridor Hub:</span>
          <select
            value={selectedCityFilter}
            onChange={(e) => setSelectedCityFilter(e.target.value)}
            className="bg-[#020617] border border-white/10 rounded-xl px-3 py-1.5 text-xs text-white focus:border-indigo-500 focus:outline-none"
          >
            <option value="all">All Hubs (South India)</option>
            <option value="bengaluru">Bengaluru Hubs</option>
            <option value="hyderabad">Hyderabad Hubs</option>
            <option value="vijayawada">Vijayawada Hubs</option>
          </select>
        </div>

        <span className="text-xs text-slate-400">
          Showing <span className="text-white font-bold">{filteredReturnLoads.length}</span> active return slots
        </span>
      </div>

      {/* Return Slots Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {filteredReturnLoads.map((slot) => {
          const isMatched = slot.status === 'matched';

          return (
            <div
              key={slot.id}
              className={`rounded-3xl p-6 transition-all duration-300 space-y-4 backdrop-blur-md ${
                isMatched
                  ? 'bg-white/[0.01] border border-emerald-500/30'
                  : 'bg-white/[0.02] border border-white/10 hover:border-white/20 shadow-xl'
              }`}
            >
              {/* Top status bar */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="px-2.5 py-1 rounded-lg bg-indigo-500/20 text-indigo-300 font-bold text-xs uppercase flex items-center gap-1">
                    <Truck className="w-3.5 h-3.5" />
                    {slot.vehicle_type.toUpperCase()}
                  </span>
                  <span className="text-xs text-slate-400 font-mono">Slot #{slot.id.slice(-6)}</span>
                </div>

                <span className={`px-2.5 py-1 rounded-full text-xs font-bold ${
                  isMatched
                    ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/40'
                    : 'bg-amber-500/20 text-amber-400 border border-amber-500/40'
                }`}>
                  {isMatched ? '✓ Match Locked' : `${slot.savings_percent}% Return Discount`}
                </span>
              </div>

              {/* Route Display */}
              <div className="p-4 rounded-2xl bg-[#020617] border border-white/10 space-y-2">
                <div className="flex items-center justify-between text-xs">
                  <div className="space-y-0.5">
                    <span className="text-[10px] text-slate-500 block">Origin Hub (Empty Departure)</span>
                    <span className="font-bold text-white flex items-center gap-1">
                      <MapPin className="w-3.5 h-3.5 text-amber-400" />
                      {slot.pickup_location}
                    </span>
                  </div>
                  <ArrowRight className="w-4 h-4 text-slate-500 mx-2 shrink-0" />
                  <div className="space-y-0.5 text-right">
                    <span className="text-[10px] text-slate-500 block">Destination Base</span>
                    <span className="font-bold text-white flex items-center gap-1 justify-end">
                      <MapPin className="w-3.5 h-3.5 text-emerald-400" />
                      {slot.destination}
                    </span>
                  </div>
                </div>

                <div className="pt-2 border-t border-white/10 flex items-center justify-between text-xs text-slate-400">
                  <span>Driver: <strong className="text-slate-200">{slot.driver_name}</strong></span>
                  <span>Available: <strong className="text-slate-200">{slot.available_date}</strong></span>
                </div>
              </div>

              {/* Financial comparison */}
              <div className="flex items-center justify-between p-3.5 rounded-2xl bg-[#020617] border border-white/10">
                <div>
                  <span className="text-[11px] text-slate-400 block">Return-Load Special Tariff</span>
                  <div className="flex items-baseline gap-2">
                    <span className="font-extrabold text-2xl text-amber-400 font-mono">
                      ₹{slot.fare.toLocaleString()}
                    </span>
                    <span className="line-through text-xs text-slate-500 font-mono">
                      ₹{slot.normal_fare.toLocaleString()}
                    </span>
                  </div>
                </div>

                <div className="text-right">
                  <span className="text-xs text-emerald-400 font-bold block">Double-Earnings Yield</span>
                  <span className="text-[11px] text-slate-400">100% Highway Utilization</span>
                </div>
              </div>

              {/* Action: Match with Available Unassigned Loads */}
              {!isMatched && unassignedLoads.length > 0 && (
                <div className="space-y-2 pt-2 border-t border-white/10">
                  <span className="text-[11px] font-semibold text-slate-300 block">
                    Instant Match with your Posted Shipment:
                  </span>
                  <div className="flex items-center gap-2">
                    <select
                      id={`match-select-${slot.id}`}
                      className="flex-1 bg-[#020617] border border-white/10 rounded-xl px-3 py-2 text-xs text-white focus:border-indigo-500 focus:outline-none"
                    >
                      {unassignedLoads.map((ul) => (
                        <option key={ul.id} value={ul.id}>
                          {ul.pickup_location.split(',')[0]} → {ul.destination.split(',')[0]} ({ul.weight_kg}kg)
                        </option>
                      ))}
                    </select>

                    <button
                      onClick={() => {
                        const selectEl = document.getElementById(`match-select-${slot.id}`) as HTMLSelectElement;
                        if (selectEl && selectEl.value) {
                          matchReturnLoad(slot.id, selectEl.value);
                        }
                      }}
                      className="px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs shadow-md transition-all whitespace-nowrap flex items-center gap-1 cursor-pointer"
                    >
                      <Sparkles className="w-3.5 h-3.5" />
                      <span>Lock Deal</span>
                    </button>
                  </div>
                </div>
              )}

              {isMatched && (
                <div className="p-3 rounded-xl bg-emerald-950/20 border border-emerald-500/30 text-xs text-emerald-300 flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>Return match active. Reverse journey locked at discounted tariff.</span>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};
