import React, { useState } from 'react';
import { 
  X, 
  MapPin, 
  Navigation, 
  Truck, 
  Boxes, 
  Calendar, 
  ShieldCheck, 
  DollarSign, 
  RotateCcw, 
  ArrowRight,
  Info
} from 'lucide-react';
import { useData } from '../../context/DataContext';
import { useAuth } from '../../context/AuthContext';
import { VehicleCategory } from '../../types';

interface PostLoadModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const PostLoadModal: React.FC<PostLoadModalProps> = ({ isOpen, onClose }) => {
  const { createLoad, estimateFare } = useData();
  const { currentUser } = useAuth();

  const [pickup, setPickup] = useState('Hyderabad, Telangana (Gachibowli)');
  const [destination, setDestination] = useState('Bengaluru, Karnataka (Whitefield)');
  const [loadType, setLoadType] = useState<'household' | 'business_cargo' | 'agricultural' | 'construction' | 'electronics' | 'industrial'>('household');
  const [weightKg, setWeightKg] = useState(1500);
  const [vehicleType, setVehicleType] = useState<VehicleCategory>('mini_truck');
  const [pickupDate, setPickupDate] = useState(new Date().toISOString().split('T')[0]);
  const [goodsValue, setGoodsValue] = useState(250000);
  const [hasInsurance, setHasInsurance] = useState(true);
  const [notes, setNotes] = useState('');
  const [isReturnLoadOptIn, setIsReturnLoadOptIn] = useState(true);

  if (!isOpen) return null;

  const fareEst = estimateFare(pickup, destination, vehicleType, weightKg);
  const effectiveFare = isReturnLoadOptIn ? fareEst.returnDiscountFare : fareEst.totalFare;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!pickup || !destination) return;

    createLoad({
      customer_id: currentUser?.id || 'user_cust_1',
      customer_name: currentUser?.name || 'Saikishan (Sai)',
      customer_phone: currentUser?.phone || '+91 98490 12345',
      pickup_location: pickup,
      destination,
      load_type: loadType,
      weight_kg: weightKg,
      vehicle_type: vehicleType,
      fare: effectiveFare,
      distance_km: fareEst.distanceKm,
      pickup_date: pickupDate,
      goods_value: goodsValue,
      has_insurance: hasInsurance,
      notes,
      is_return_load: isReturnLoadOptIn,
    });

    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#020617]/80 backdrop-blur-md overflow-y-auto">
      <div className="relative w-full max-w-2xl rounded-3xl bg-[#020617] border border-white/10 shadow-2xl p-6 sm:p-8 space-y-6 my-8 backdrop-blur-xl">
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-white/10">
          <div>
            <span className="text-xs font-bold text-indigo-400 uppercase tracking-wider">New Freight Consignment</span>
            <h3 className="font-bold text-2xl text-white mt-0.5">Post a Load for Dispatch</h3>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-xl bg-white/[0.05] text-slate-400 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4 text-xs">
          {/* Corridor Pickup & Destination */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block font-semibold text-slate-300 mb-1">Pickup Location & Hub</label>
              <div className="relative">
                <MapPin className="w-4 h-4 text-emerald-400 absolute left-3 top-2.5" />
                <input
                  type="text"
                  required
                  value={pickup}
                  onChange={(e) => setPickup(e.target.value)}
                  className="w-full bg-[#020617] border border-white/10 rounded-xl pl-9 pr-3 py-2 text-white focus:border-indigo-500 focus:outline-none"
                  placeholder="e.g. Hyderabad, TS"
                />
              </div>
            </div>

            <div>
              <label className="block font-semibold text-slate-300 mb-1">Destination & Drop Point</label>
              <div className="relative">
                <Navigation className="w-4 h-4 text-indigo-400 absolute left-3 top-2.5" />
                <input
                  type="text"
                  required
                  value={destination}
                  onChange={(e) => setDestination(e.target.value)}
                  className="w-full bg-[#020617] border border-white/10 rounded-xl pl-9 pr-3 py-2 text-white focus:border-indigo-500 focus:outline-none"
                  placeholder="e.g. Bengaluru, KA"
                />
              </div>
            </div>
          </div>

          {/* Load Type & Vehicle Selection */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div>
              <label className="block font-semibold text-slate-300 mb-1">Cargo Type</label>
              <select
                value={loadType}
                onChange={(e) => setLoadType(e.target.value as any)}
                className="w-full bg-[#020617] border border-white/10 rounded-xl px-3 py-2 text-white focus:border-indigo-500 focus:outline-none capitalize"
              >
                <option value="household">Household Shifting</option>
                <option value="business_cargo">Packaged FMCG</option>
                <option value="agricultural">Agricultural Goods</option>
                <option value="electronics">Fragile Electronics</option>
                <option value="construction">Building Materials</option>
                <option value="industrial">Industrial Machines</option>
              </select>
            </div>

            <div>
              <label className="block font-semibold text-slate-300 mb-1">Vehicle Category</label>
              <select
                value={vehicleType}
                onChange={(e) => setVehicleType(e.target.value as VehicleCategory)}
                className="w-full bg-[#020617] border border-white/10 rounded-xl px-3 py-2 text-white focus:border-indigo-500 focus:outline-none capitalize"
              >
                <option value="auto">Load Auto (500 kg)</option>
                <option value="mini_truck">Tata Ace (1.2 Ton)</option>
                <option value="lorry">Lorry / 12ft (8.5 Ton)</option>
                <option value="container">Heavy Container (24 Ton)</option>
              </select>
            </div>

            <div>
              <label className="block font-semibold text-slate-300 mb-1">Loading Date</label>
              <input
                type="date"
                required
                value={pickupDate}
                onChange={(e) => setPickupDate(e.target.value)}
                className="w-full bg-[#020617] border border-white/10 rounded-xl px-3 py-2 text-white focus:border-indigo-500 focus:outline-none"
              />
            </div>
          </div>

          {/* Weight & Value */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <div className="flex justify-between items-center mb-1">
                <label className="font-semibold text-slate-300">Cargo Weight</label>
                <span className="font-mono text-indigo-400 font-bold">{weightKg.toLocaleString()} kg</span>
              </div>
              <input
                type="range"
                min="200"
                max="15000"
                step="100"
                value={weightKg}
                onChange={(e) => setWeightKg(Number(e.target.value))}
                className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-indigo-500"
              />
            </div>

            <div>
              <label className="block font-semibold text-slate-300 mb-1">Declared Value (for Transit Cover)</label>
              <div className="relative">
                <span className="absolute left-3 top-2 text-slate-500 font-bold">₹</span>
                <input
                  type="number"
                  value={goodsValue}
                  onChange={(e) => setGoodsValue(Number(e.target.value))}
                  className="w-full bg-[#020617] border border-white/10 rounded-xl pl-8 pr-3 py-2 text-white font-mono focus:border-indigo-500 focus:outline-none"
                />
              </div>
            </div>
          </div>

          {/* Return Load Opt-in Toggle Card */}
          <div className="p-3.5 rounded-2xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-between gap-4">
            <div className="flex items-start gap-2.5">
              <RotateCcw className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
              <div>
                <span className="font-bold text-white block">Enable Return-Load Match Discount</span>
                <p className="text-[11px] text-slate-300">
                  Allow empty return vehicles on this corridor to fulfill your shipment at a 30%+ discount.
                </p>
              </div>
            </div>
            <input
              type="checkbox"
              checked={isReturnLoadOptIn}
              onChange={(e) => setIsReturnLoadOptIn(e.target.checked)}
              className="w-5 h-5 accent-amber-500 rounded cursor-pointer"
            />
          </div>

          {/* Notes */}
          <div>
            <label className="block font-semibold text-slate-300 mb-1">Handling Notes / Instructions</label>
            <input
              type="text"
              placeholder="e.g. Loading dock requires hydraulic ramp, 2 helpers needed"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              className="w-full bg-[#020617] border border-white/10 rounded-xl px-3 py-2 text-white focus:border-indigo-500 focus:outline-none"
            />
          </div>

          {/* Live Quote Summary */}
          <div className="p-4 rounded-2xl bg-[#020617] border border-white/10 flex items-center justify-between">
            <div>
              <span className="text-slate-400 text-[11px] block">Calculated Trip Tariff</span>
              <div className="flex items-baseline gap-2">
                <span className="font-extrabold text-2xl text-white">
                  ₹{effectiveFare.toLocaleString()}
                </span>
                {isReturnLoadOptIn && (
                  <span className="text-xs text-emerald-400 font-bold">
                    (Save ₹{fareEst.savingsAmount.toLocaleString()})
                  </span>
                )}
              </div>
            </div>

            <div className="text-right text-[11px] text-slate-400">
              <span>{fareEst.distanceKm} km • Escrow Protected</span>
            </div>
          </div>

          <div className="pt-2 flex items-center justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2.5 rounded-xl bg-white/[0.05] hover:bg-white/10 text-slate-300 hover:text-white transition-colors cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-6 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold shadow-lg shadow-indigo-500/20 transition-all flex items-center gap-1.5 cursor-pointer"
            >
              <span>Publish Consignment</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
