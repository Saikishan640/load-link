import React, { useState } from 'react';
import { 
  Package, 
  MapPin, 
  Navigation, 
  RotateCcw, 
  ShieldCheck, 
  Clock, 
  ArrowRight, 
  Filter, 
  CheckCircle2, 
  Truck,
  Plus
} from 'lucide-react';
import { useData } from '../../context/DataContext';
import { LoadStatus } from '../../types';

interface LoadsListViewProps {
  openPostLoadModal: () => void;
  setCurrentTab: (tab: string) => void;
}

export const LoadsListView: React.FC<LoadsListViewProps> = ({ openPostLoadModal, setCurrentTab }) => {
  const { loads } = useData();
  const [filterStatus, setFilterStatus] = useState<string>('all');

  const filteredLoads = loads.filter((l) => {
    if (filterStatus === 'all') return true;
    return l.status === filterStatus;
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h2 className="font-bold text-2xl text-white">
            Freight Consignments & Loads
          </h2>
          <p className="text-xs text-slate-400">
            Track, dispatch, and manage all your active and historical freight orders.
          </p>
        </div>

        <button
          onClick={openPostLoadModal}
          className="px-4 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs shadow-md shadow-indigo-500/20 transition-all flex items-center gap-1.5 cursor-pointer"
        >
          <Plus className="w-4 h-4" />
          <span>Post New Load</span>
        </button>
      </div>

      {/* Filter Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 text-xs">
        {['all', 'posted', 'in_transit', 'delivered'].map((st) => (
          <button
            key={st}
            onClick={() => setFilterStatus(st)}
            className={`px-3.5 py-1.5 rounded-xl font-semibold capitalize transition-all whitespace-nowrap cursor-pointer ${
              filterStatus === st
                ? 'bg-indigo-600 text-white shadow-md shadow-indigo-500/20'
                : 'bg-white/[0.03] text-slate-400 hover:text-white border border-white/10'
            }`}
          >
            {st.replace('_', ' ')}
          </button>
        ))}
      </div>

      {/* Loads List Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filteredLoads.map((load) => (
          <div
            key={load.id}
            className="rounded-3xl bg-white/[0.02] border border-white/10 p-5 space-y-4 hover:border-white/20 transition-all shadow-lg backdrop-blur-md"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="font-bold text-white text-sm font-mono">#{load.id.slice(-6).toUpperCase()}</span>
                {load.is_return_load && (
                  <span className="px-2 py-0.5 rounded-full bg-amber-500/15 text-amber-300 text-[10px] font-bold flex items-center gap-1 border border-amber-500/30">
                    <RotateCcw className="w-3 h-3" /> Return Match
                  </span>
                )}
              </div>

              <span className={`px-2.5 py-0.5 rounded-full text-[11px] font-bold uppercase ${
                load.status === 'in_transit'
                  ? 'bg-indigo-500/20 text-indigo-300 border border-indigo-500/30'
                  : load.status === 'delivered'
                  ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                  : 'bg-amber-500/20 text-amber-300 border border-amber-500/30'
              }`}>
                {load.status.replace('_', ' ')}
              </span>
            </div>

            {/* Route */}
            <div className="p-3.5 rounded-2xl bg-[#020617] border border-white/10 space-y-2 text-xs">
              <div className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <div>
                  <span className="text-[10px] text-slate-500 block">Origin:</span>
                  <span className="text-white font-semibold">{load.pickup_location}</span>
                </div>
              </div>

              <div className="flex items-start gap-2">
                <Navigation className="w-4 h-4 text-indigo-400 shrink-0 mt-0.5" />
                <div>
                  <span className="text-[10px] text-slate-500 block">Destination:</span>
                  <span className="text-white font-semibold">{load.destination}</span>
                </div>
              </div>
            </div>

            {/* Meta specs */}
            <div className="grid grid-cols-3 gap-2 text-xs pt-1 text-slate-400">
              <div>
                <span className="text-[10px] text-slate-500 block">Cargo Type:</span>
                <span className="text-slate-200 capitalize font-medium">{load.load_type}</span>
              </div>
              <div>
                <span className="text-[10px] text-slate-500 block">Weight:</span>
                <span className="text-slate-200 font-medium">{load.weight_kg.toLocaleString()} kg</span>
              </div>
              <div>
                <span className="text-[10px] text-slate-500 block">Vehicle:</span>
                <span className="text-indigo-400 uppercase font-bold">{load.vehicle_type}</span>
              </div>
            </div>

            {/* Fare & Action */}
            <div className="pt-3 border-t border-white/10 flex items-center justify-between">
              <div>
                <span className="text-[10px] text-slate-500 block">Trip Tariff</span>
                <span className="font-extrabold text-xl text-white font-mono">
                  ₹{load.fare.toLocaleString()}
                </span>
              </div>

              {load.status === 'in_transit' ? (
                <button
                  onClick={() => setCurrentTab('tracking')}
                  className="px-3.5 py-1.5 rounded-xl bg-indigo-500/20 hover:bg-indigo-500/30 text-indigo-300 text-xs font-semibold flex items-center gap-1 transition-colors cursor-pointer"
                >
                  <Navigation className="w-3.5 h-3.5" />
                  <span>Live GPS</span>
                </button>
              ) : (
                <button
                  onClick={() => setCurrentTab('return_loads')}
                  className="px-3.5 py-1.5 rounded-xl bg-white/[0.05] hover:bg-white/10 text-slate-200 text-xs font-semibold flex items-center gap-1 transition-colors cursor-pointer"
                >
                  <span>Match Carrier</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
