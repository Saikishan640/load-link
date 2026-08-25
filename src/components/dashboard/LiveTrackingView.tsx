import React, { useState } from 'react';
import { 
  Navigation, 
  MapPin, 
  Truck, 
  ShieldCheck, 
  Clock, 
  CheckCircle2, 
  Key, 
  Play, 
  Pause, 
  RotateCw, 
  AlertCircle, 
  Phone, 
  Sparkles,
  Camera
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { useData } from '../../context/DataContext';
import { useAuth } from '../../context/AuthContext';

export const LiveTrackingView: React.FC = () => {
  const { activeTracking, bookings, isTrackingSimulating, toggleSimulation, completeDelivery } = useData();
  const { role } = useAuth();

  const [otpInput, setOtpInput] = useState('');
  const [otpError, setOtpError] = useState('');
  const [deliverySuccess, setDeliverySuccess] = useState(false);

  const activeBooking = bookings[0];

  const handleVerifyOtp = (e: React.FormEvent) => {
    e.preventDefault();
    setOtpError('');

    const res = completeDelivery(activeBooking?.id || 'book_201', otpInput);
    if (res.success) {
      setDeliverySuccess(true);
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 },
      });
    } else {
      setOtpError(res.message);
    }
  };

  const waypoints = [
    { name: 'Hyderabad (Gachibowli)', km: 0, pct: 0 },
    { name: 'Mahbubnagar Toll', km: 95, pct: 18 },
    { name: 'Kurnool Tungabhadra', km: 215, pct: 38 },
    { name: 'Anantapur Bypass', km: 360, pct: 64 },
    { name: 'Chikkaballapur', km: 490, pct: 87 },
    { name: 'Bengaluru (Whitefield)', km: 565, pct: 100 },
  ];

  return (
    <div className="space-y-6">
      {/* Top Telemetry Header */}
      <div className="rounded-3xl bg-white/[0.02] border border-white/10 p-6 shadow-2xl backdrop-blur-md flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 text-xs font-bold font-mono border border-emerald-500/20">
              GPS SATELLITE SYNC
            </span>
            <span className="text-xs text-slate-400">Consignment #LD-101 • Ashok Leyland 1214 (TS 09 UA 8842)</span>
          </div>
          <h2 className="font-bold text-2xl text-white">
            {activeTracking.corridor_name}
          </h2>
          <p className="text-xs text-slate-300">
            {activeTracking.current_location_name}
          </p>
        </div>

        {/* Telemetry quick pills */}
        <div className="flex items-center gap-3">
          <div className="p-3 rounded-2xl bg-[#020617] border border-white/10 text-right">
            <span className="text-[10px] text-slate-400 block">Cruising Speed</span>
            <span className="font-extrabold text-xl text-emerald-400 font-mono">
              {activeTracking.speed_kmh} km/h
            </span>
          </div>

          <div className="p-3 rounded-2xl bg-[#020617] border border-white/10 text-right">
            <span className="text-[10px] text-slate-400 block">Time to Destination</span>
            <span className="font-extrabold text-xl text-amber-400 font-mono">
              {activeTracking.eta_hours} hrs
            </span>
          </div>

          <button
            onClick={toggleSimulation}
            className={`p-3 rounded-2xl border transition-all cursor-pointer ${
              isTrackingSimulating
                ? 'bg-amber-500/10 border-amber-500/30 text-amber-400 hover:bg-amber-500/20'
                : 'bg-white/[0.03] border-white/10 text-slate-300 hover:bg-white/5'
            }`}
            title="Toggle Live GPS Telemetry Simulation"
          >
            {isTrackingSimulating ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Interactive Map & Highway Route Visualizer */}
      <div className="p-6 rounded-3xl bg-white/[0.02] border border-white/10 space-y-6 backdrop-blur-md">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Navigation className="w-5 h-5 text-indigo-400" />
            <h3 className="font-bold text-lg text-white">
              Corridor NH44 Highway Map & Milestone Checkpoints
            </h3>
          </div>
          <span className="text-xs text-slate-400 font-mono">
            Lat: {activeTracking.latitude}°, Lng: {activeTracking.longitude}°
          </span>
        </div>

        {/* Highway Ribbon View */}
        <div className="p-6 rounded-2xl bg-[#020617] border border-white/10 relative overflow-hidden space-y-8">
          {/* Highway Lane representation */}
          <div className="relative pt-6 pb-6">
            <div className="w-full h-4 bg-slate-800 rounded-full relative overflow-hidden border border-white/5">
              {/* Highway centerline dashed markings */}
              <div className="absolute inset-0 flex items-center justify-around opacity-40">
                {[...Array(12)].map((_, i) => (
                  <div key={i} className="w-4 h-1 bg-amber-400 rounded-full" />
                ))}
              </div>

              {/* Progress fill */}
              <div
                className="h-full bg-gradient-to-r from-emerald-500 via-indigo-500 to-indigo-400 rounded-full transition-all duration-700"
                style={{ width: `${activeTracking.progress_percent}%` }}
              />
            </div>

            {/* Moving Truck Vehicle Pin */}
            <div
              className="absolute top-1 -translate-x-1/2 transition-all duration-700 flex flex-col items-center z-10"
              style={{ left: `${Math.max(4, Math.min(96, activeTracking.progress_percent))}%` }}
            >
              <div className="p-2 rounded-xl bg-amber-500 text-slate-950 shadow-xl shadow-amber-500/50 animate-bounce">
                <Truck className="w-5 h-5" />
              </div>
              <span className="text-[10px] font-bold text-amber-300 bg-[#020617]/95 px-2 py-0.5 rounded-full border border-amber-500/40 mt-1 whitespace-nowrap">
                TS 09 UA 8842 ({activeTracking.speed_kmh} km/h)
              </span>
            </div>
          </div>

          {/* Waypoints Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
            {waypoints.map((wp, idx) => {
              const isPassed = activeTracking.progress_percent >= wp.pct;
              const isCurrent = Math.abs(activeTracking.progress_percent - wp.pct) < 15;

              return (
                <div
                  key={idx}
                  className={`p-3 rounded-xl border text-xs transition-all ${
                    isPassed
                      ? 'bg-white/[0.04] border-emerald-500/40 text-slate-200'
                      : 'bg-white/[0.01] border-white/5 text-slate-500'
                  } ${isCurrent ? 'ring-2 ring-indigo-400 shadow-lg' : ''}`}
                >
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-[10px] font-mono">{wp.km} KM</span>
                    {isPassed ? (
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                    ) : (
                      <Clock className="w-3.5 h-3.5 text-slate-600" />
                    )}
                  </div>
                  <span className="font-bold block truncate text-white">{wp.name}</span>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Driver Info & Digital Delivery OTP Verification Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Driver Contact & Transit Assurance */}
        <div className="p-6 rounded-3xl bg-white/[0.02] border border-white/10 space-y-4 backdrop-blur-md">
          <h3 className="font-bold text-lg text-white">Transporter & Goods Assurance</h3>

          <div className="flex items-center gap-4 p-4 rounded-2xl bg-[#020617] border border-white/10">
            <img
              src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=120"
              alt="Ramesh"
              className="w-12 h-12 rounded-2xl object-cover border border-amber-400/40"
            />
            <div className="space-y-0.5">
              <h4 className="font-bold text-white text-sm">Ramesh Kumar</h4>
              <p className="text-xs text-slate-400">Ashok Leyland 1214 • TS 09 UA 8842</p>
              <div className="flex items-center gap-2 text-[11px] text-emerald-400">
                <ShieldCheck className="w-3.5 h-3.5" />
                <span>KYC Verified & DL Validated</span>
              </div>
            </div>
            <a
              href="tel:+919876543210"
              className="ml-auto p-2.5 rounded-xl bg-white/[0.05] hover:bg-white/10 text-amber-400 transition-colors"
              title="Call Driver"
            >
              <Phone className="w-4 h-4" />
            </a>
          </div>

          <div className="space-y-2 text-xs text-slate-300">
            <div className="flex items-center justify-between p-2.5 rounded-xl bg-[#020617] border border-white/10">
              <span className="text-slate-400">Security Tamper Seal:</span>
              <span className="font-mono text-white font-bold">SEAL-HYD-882194-A</span>
            </div>
            <div className="flex items-center justify-between p-2.5 rounded-xl bg-[#020617] border border-white/10">
              <span className="text-slate-400">Transit Goods Insurance:</span>
              <span className="text-emerald-400 font-semibold">Active (Coverage up to ₹5,00,000)</span>
            </div>
            <div className="flex items-center justify-between p-2.5 rounded-xl bg-[#020617] border border-white/10">
              <span className="text-slate-400">Payment Status:</span>
              <span className="text-amber-400 font-semibold">Held in Escrow (Release on OTP)</span>
            </div>
          </div>
        </div>

        {/* Confidential OTP Delivery Confirmation Card */}
        <div className="p-6 rounded-3xl bg-white/[0.02] border border-white/10 space-y-4 backdrop-blur-md">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Key className="w-5 h-5 text-amber-400" />
              <h3 className="font-bold text-lg text-white">Delivery OTP Verification</h3>
            </div>
            <span className="text-[10px] px-2 py-0.5 rounded-full bg-amber-500/10 text-amber-300 border border-amber-500/20">
              Escrow Release
            </span>
          </div>

          <p className="text-xs text-slate-300 leading-relaxed">
            Upon physical unloading at destination, verify the goods and provide the confidential OTP to release the ₹{activeBooking?.fare?.toLocaleString() || '22,400'} payment to the driver.
          </p>

          <div className="p-3 rounded-xl bg-[#020617] border border-white/10 flex items-center justify-between text-xs">
            <span className="text-slate-400">Confidential Recipient OTP:</span>
            <span className="font-mono text-base font-extrabold text-amber-400 tracking-widest bg-amber-500/10 px-3 py-1 rounded-lg border border-amber-500/30">
              {activeBooking?.otp || '4892'}
            </span>
          </div>

          {deliverySuccess ? (
            <div className="p-4 rounded-2xl bg-emerald-950/20 border border-emerald-500/30 text-center space-y-2">
              <CheckCircle2 className="w-8 h-8 text-emerald-400 mx-auto" />
              <h4 className="font-bold text-white text-sm">Delivery Confirmed & Funds Released!</h4>
              <p className="text-[11px] text-slate-300">
                Payment transferred to driver wallet. Proof of delivery archived.
              </p>
            </div>
          ) : (
            <form onSubmit={handleVerifyOtp} className="space-y-3">
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">
                  Enter 4-Digit OTP to Complete Delivery
                </label>
                <input
                  type="text"
                  maxLength={4}
                  placeholder="e.g. 4892"
                  value={otpInput}
                  onChange={(e) => setOtpInput(e.target.value)}
                  className="w-full bg-[#020617] border border-white/10 rounded-xl px-3 py-2 text-center text-lg font-mono font-bold tracking-widest text-white focus:border-indigo-500 focus:outline-none"
                />
              </div>

              {otpError && (
                <div className="text-xs text-red-400 flex items-center gap-1">
                  <AlertCircle className="w-3.5 h-3.5" />
                  <span>{otpError}</span>
                </div>
              )}

              <button
                type="submit"
                className="w-full py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs shadow-md transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
              >
                <CheckCircle2 className="w-4 h-4" />
                <span>Verify OTP & Release Escrow</span>
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
