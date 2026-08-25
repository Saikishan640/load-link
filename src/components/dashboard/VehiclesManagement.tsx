import React, { useState } from 'react';
import { 
  Truck, 
  ShieldCheck, 
  Plus, 
  MapPin, 
  CheckCircle2, 
  AlertCircle, 
  FileText, 
  Calendar,
  X
} from 'lucide-react';
import { useData } from '../../context/DataContext';
import { useAuth } from '../../context/AuthContext';
import { VehicleCategory } from '../../types';

export const VehiclesManagement: React.FC = () => {
  const { vehicles, addVehicle } = useData();
  const { currentUser } = useAuth();
  const [modalOpen, setModalOpen] = useState(false);

  const [vehicleType, setVehicleType] = useState<VehicleCategory>('mini_truck');
  const [vehicleName, setVehicleName] = useState('Tata Ace Gold Diesel');
  const [vehicleNumber, setVehicleNumber] = useState('TS 10 EA 4499');
  const [capacityKg, setCapacityKg] = useState(1200);
  const [location, setLocation] = useState('Hyderabad, Telangana (Secunderabad)');
  const [ratePerKm, setRatePerKm] = useState(22);

  const handleAddVehicle = (e: React.FormEvent) => {
    e.preventDefault();
    if (!vehicleNumber || !vehicleName) return;

    addVehicle({
      driver_id: currentUser?.id || 'user_drv_1',
      driver_name: currentUser?.name || 'Ramesh Kumar',
      driver_phone: currentUser?.phone || '+91 98765 43210',
      vehicle_type: vehicleType,
      vehicle_name: vehicleName,
      vehicle_number: vehicleNumber.toUpperCase(),
      capacity_kg: capacityKg,
      current_location: location,
      is_verified: true,
      is_available: true,
      rate_per_km: ratePerKm,
      rc_number: `RC-${vehicleNumber.replace(/\s+/g, '')}-2024`,
      insurance_expiry: '2026-12-31',
    });

    setModalOpen(false);
  };

  return (
    <div className="space-y-6">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h2 className="font-bold text-2xl text-white">
            Vehicles & Fleet KYC Management
          </h2>
          <p className="text-xs text-slate-400">
            Manage your transport fleet, register commercial vehicles, and view corridor compliance.
          </p>
        </div>

        <button
          onClick={() => setModalOpen(true)}
          className="px-4 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs shadow-md shadow-indigo-500/20 transition-all flex items-center gap-1.5 cursor-pointer"
        >
          <Plus className="w-4 h-4" />
          <span>Add New Vehicle</span>
        </button>
      </div>

      {/* Fleet Vehicles Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {vehicles.map((v) => (
          <div
            key={v.id}
            className="rounded-3xl bg-white/[0.02] border border-white/10 p-6 space-y-4 shadow-xl hover:border-white/20 transition-all backdrop-blur-md"
          >
            <div className="flex items-center justify-between">
              <div className="p-2.5 rounded-2xl bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">
                <Truck className="w-6 h-6" />
              </div>

              <div className="flex items-center gap-2">
                <span className="flex items-center gap-1 text-[11px] font-bold text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-full border border-emerald-500/20">
                  <ShieldCheck className="w-3.5 h-3.5" />
                  Verified
                </span>
                <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                  v.is_available ? 'bg-emerald-500/20 text-emerald-300' : 'bg-indigo-500/20 text-indigo-300'
                }`}>
                  {v.is_available ? 'Ready for Load' : 'On Highway'}
                </span>
              </div>
            </div>

            <div>
              <h3 className="font-bold text-lg text-white">{v.vehicle_name}</h3>
              <p className="font-mono text-xs text-indigo-400 font-bold mt-0.5">{v.vehicle_number}</p>
            </div>

            <div className="p-3.5 rounded-2xl bg-[#020617] border border-white/10 space-y-2 text-xs">
              <div className="flex justify-between">
                <span className="text-slate-400">Category:</span>
                <span className="text-white font-semibold uppercase">{v.vehicle_type}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Max Payload:</span>
                <span className="text-emerald-400 font-mono font-bold">{v.capacity_kg.toLocaleString()} kg</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Corridor Base Rate:</span>
                <span className="text-white font-mono font-bold">₹{v.rate_per_km} / km</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">RC Document:</span>
                <span className="text-slate-300 font-mono text-[11px]">{v.rc_number}</span>
              </div>
            </div>

            <div className="text-xs text-slate-400 flex items-center gap-1.5 pt-1">
              <MapPin className="w-4 h-4 text-emerald-400 shrink-0" />
              <span className="truncate">{v.current_location}</span>
            </div>
          </div>
        ))}
      </div>

      {/* Add Vehicle Modal */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#020617]/80 backdrop-blur-md">
          <div className="relative w-full max-w-lg rounded-3xl bg-[#020617] border border-white/10 shadow-2xl p-6 sm:p-8 space-y-5 backdrop-blur-xl">
            <div className="flex items-center justify-between pb-3 border-b border-white/10">
              <h3 className="font-bold text-xl text-white">Register Commercial Vehicle</h3>
              <button
                onClick={() => setModalOpen(false)}
                className="p-1.5 rounded-xl bg-white/[0.05] text-slate-400 hover:text-white transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleAddVehicle} className="space-y-4 text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-slate-300 mb-1">Vehicle Category</label>
                  <select
                    value={vehicleType}
                    onChange={(e) => setVehicleType(e.target.value as VehicleCategory)}
                    className="w-full bg-[#020617] border border-white/10 rounded-xl px-3 py-2 text-white focus:border-indigo-500 focus:outline-none"
                  >
                    <option value="auto">Load Auto (500 kg)</option>
                    <option value="mini_truck">Tata Ace (1.2 Ton)</option>
                    <option value="lorry">Lorry / Eicher (8.5 Ton)</option>
                    <option value="container">Multi-Axle Container (24 Ton)</option>
                  </select>
                </div>

                <div>
                  <label className="block font-semibold text-slate-300 mb-1">Vehicle Number Plate</label>
                  <input
                    type="text"
                    required
                    placeholder="TS 09 UA 8842"
                    value={vehicleNumber}
                    onChange={(e) => setVehicleNumber(e.target.value.toUpperCase())}
                    className="w-full bg-[#020617] border border-white/10 rounded-xl px-3 py-2 text-white font-mono uppercase focus:border-indigo-500 focus:outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-slate-300 mb-1">Make & Model</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Ashok Leyland Boss 1214"
                    value={vehicleName}
                    onChange={(e) => setVehicleName(e.target.value)}
                    className="w-full bg-[#020617] border border-white/10 rounded-xl px-3 py-2 text-white focus:border-indigo-500 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-slate-300 mb-1">Max Payload Capacity (kg)</label>
                  <input
                    type="number"
                    required
                    value={capacityKg}
                    onChange={(e) => setCapacityKg(Number(e.target.value))}
                    className="w-full bg-[#020617] border border-white/10 rounded-xl px-3 py-2 text-white font-mono focus:border-indigo-500 focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block font-semibold text-slate-300 mb-1">Current Corridor Hub Location</label>
                <input
                  type="text"
                  required
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  className="w-full bg-[#020617] border border-white/10 rounded-xl px-3 py-2 text-white focus:border-indigo-500 focus:outline-none"
                />
              </div>

              <div className="pt-2 flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setModalOpen(false)}
                  className="px-4 py-2 rounded-xl bg-white/[0.05] hover:bg-white/10 text-slate-300 hover:text-white transition-colors cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold transition-all cursor-pointer"
                >
                  Save Vehicle to Fleet
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
