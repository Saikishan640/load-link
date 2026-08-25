import React, { useState } from 'react';
import { 
  Truck, 
  User, 
  Mail, 
  Phone, 
  Lock, 
  Building, 
  ShieldCheck, 
  ArrowRight, 
  FileText,
  CheckCircle2
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useData } from '../../context/DataContext';
import { UserRole, VehicleCategory } from '../../types';

interface RegisterPageProps {
  setCurrentPage: (page: string) => void;
}

export const RegisterPage: React.FC<RegisterPageProps> = ({ setCurrentPage }) => {
  const { signup } = useAuth();
  const { addVehicle } = useData();

  const [role, setRole] = useState<UserRole>('customer');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [companyName, setCompanyName] = useState('');
  const [gstin, setGstin] = useState('');

  // Driver specific fields
  const [vehicleType, setVehicleType] = useState<VehicleCategory>('lorry');
  const [vehicleName, setVehicleName] = useState('Ashok Leyland 1618');
  const [vehicleNumber, setVehicleNumber] = useState('TS 08 XY 1122');
  const [capacityKg, setCapacityKg] = useState(8500);

  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !phone) return;

    setIsLoading(true);

    await signup({
      name,
      email,
      phone,
      role,
      company_name: companyName || (role === 'business' ? 'Enterprise Logistics' : undefined),
      gstin: gstin || (role === 'business' ? '36AABCU9603R1ZM' : undefined),
    });

    // If driver registered, automatically attach vehicle
    if (role === 'driver') {
      addVehicle({
        driver_id: `user_${Date.now()}`,
        driver_name: name,
        driver_phone: phone,
        vehicle_type: vehicleType,
        vehicle_name: vehicleName,
        vehicle_number: vehicleNumber.toUpperCase(),
        capacity_kg: capacityKg,
        current_location: 'Hyderabad, Telangana',
        is_verified: true,
        is_available: true,
        rate_per_km: vehicleType === 'auto' ? 14 : vehicleType === 'mini_truck' ? 22 : vehicleType === 'lorry' ? 38 : 65,
        rc_number: `RC-${vehicleNumber.replace(/\s+/g, '')}-2024`,
        insurance_expiry: '2027-01-01',
      });
    }

    setIsLoading(false);
    setCurrentPage('dashboard');
  };

  return (
    <div className="min-h-screen bg-[#020617] text-slate-100 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      <div className="max-w-lg w-full space-y-6">
        {/* Header */}
        <div className="text-center space-y-2">
          <div 
            onClick={() => setCurrentPage('home')}
            className="inline-flex items-center gap-2 cursor-pointer group"
          >
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-indigo-500 via-purple-500 to-indigo-400 p-[1px]">
              <div className="w-full h-full bg-[#020617] rounded-[11px] flex items-center justify-center">
                <Truck className="w-5 h-5 text-indigo-400" />
              </div>
            </div>
            <span className="font-bold text-2xl text-white">
              Load<span className="text-indigo-400">Link</span>
            </span>
          </div>
          <h2 className="font-bold text-2xl text-white">Create Your Account</h2>
          <p className="text-xs text-slate-400">
            Join the smart logistics and return-load network across South India.
          </p>
        </div>

        {/* Role Switcher */}
        <div className="grid grid-cols-3 gap-1.5 p-1 rounded-2xl bg-white/[0.03] border border-white/10">
          <button
            type="button"
            onClick={() => setRole('customer')}
            className={`py-2 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
              role === 'customer'
                ? 'bg-indigo-600 text-white shadow-sm'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            Shipper / Customer
          </button>
          <button
            type="button"
            onClick={() => setRole('driver')}
            className={`py-2 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
              role === 'driver'
                ? 'bg-amber-600 text-white shadow-sm'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            Driver / Fleet Owner
          </button>
          <button
            type="button"
            onClick={() => setRole('business')}
            className={`py-2 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
              role === 'business'
                ? 'bg-emerald-600 text-white shadow-sm'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            Business Enterprise
          </button>
        </div>

        {/* Form Card */}
        <div className="rounded-3xl bg-white/[0.02] border border-white/10 p-6 sm:p-8 shadow-2xl backdrop-blur-md space-y-4">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Full Name</label>
                <div className="relative">
                  <User className="w-4 h-4 text-slate-500 absolute left-3 top-3" />
                  <input
                    type="text"
                    required
                    placeholder="e.g. Suresh Kumar"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full bg-[#020617] border border-white/10 rounded-xl pl-9 pr-3 py-2 text-xs text-white focus:border-indigo-500 focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Phone Number</label>
                <div className="relative">
                  <Phone className="w-4 h-4 text-slate-500 absolute left-3 top-3" />
                  <input
                    type="tel"
                    required
                    placeholder="+91 98490 00000"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full bg-[#020617] border border-white/10 rounded-xl pl-9 pr-3 py-2 text-xs text-white focus:border-indigo-500 focus:outline-none"
                  />
                </div>
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">Email Address</label>
              <div className="relative">
                <Mail className="w-4 h-4 text-slate-500 absolute left-3 top-3" />
                <input
                  type="email"
                  required
                  placeholder="suresh@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-[#020617] border border-white/10 rounded-xl pl-9 pr-3 py-2 text-xs text-white focus:border-indigo-500 focus:outline-none"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">Set Password</label>
              <div className="relative">
                <Lock className="w-4 h-4 text-slate-500 absolute left-3 top-3" />
                <input
                  type="password"
                  required
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full bg-[#020617] border border-white/10 rounded-xl pl-9 pr-3 py-2 text-xs text-white focus:border-indigo-500 focus:outline-none"
                />
              </div>
            </div>

            {/* Business Specific */}
            {role === 'business' && (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2 border-t border-white/10">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">Company Name</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Telangana Logistics Ltd"
                    value={companyName}
                    onChange={(e) => setCompanyName(e.target.value)}
                    className="w-full bg-[#020617] border border-white/10 rounded-xl px-3 py-2 text-xs text-white focus:border-emerald-500 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">GSTIN Number</label>
                  <input
                    type="text"
                    required
                    placeholder="36AABCD1234F1Z5"
                    value={gstin}
                    onChange={(e) => setGstin(e.target.value.toUpperCase())}
                    className="w-full bg-[#020617] border border-white/10 rounded-xl px-3 py-2 text-xs text-white font-mono focus:border-emerald-500 focus:outline-none"
                  />
                </div>
              </div>
            )}

            {/* Driver KYC & Vehicle Specific */}
            {role === 'driver' && (
              <div className="space-y-3 pt-2 border-t border-white/10">
                <div className="flex items-center gap-1.5 text-xs text-amber-400 font-semibold">
                  <ShieldCheck className="w-4 h-4" />
                  <span>Vehicle & KYC Details (Onboard Instant)</span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[11px] font-semibold text-slate-400 mb-1">Vehicle Category</label>
                    <select
                      value={vehicleType}
                      onChange={(e) => setVehicleType(e.target.value as VehicleCategory)}
                      className="w-full bg-[#020617] border border-white/10 rounded-xl px-3 py-2 text-xs text-white focus:border-amber-400 focus:outline-none capitalize"
                    >
                      <option value="auto">Load Auto (500 kg)</option>
                      <option value="mini_truck">Tata Ace (1.2 Ton)</option>
                      <option value="lorry">Lorry (8.5 Ton)</option>
                      <option value="container">Heavy Container (24 Ton)</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-[11px] font-semibold text-slate-400 mb-1">Vehicle Number Plate</label>
                    <input
                      type="text"
                      required
                      placeholder="TS 09 UA 8842"
                      value={vehicleNumber}
                      onChange={(e) => setVehicleNumber(e.target.value.toUpperCase())}
                      className="w-full bg-[#020617] border border-white/10 rounded-xl px-3 py-2 text-xs text-white font-mono focus:border-amber-400 focus:outline-none"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[11px] font-semibold text-slate-400 mb-1">Vehicle Model Name</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Ashok Leyland 1214"
                      value={vehicleName}
                      onChange={(e) => setVehicleName(e.target.value)}
                      className="w-full bg-[#020617] border border-white/10 rounded-xl px-3 py-2 text-xs text-white focus:border-amber-400 focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-semibold text-slate-400 mb-1">Max Payload (kg)</label>
                    <input
                      type="number"
                      required
                      value={capacityKg}
                      onChange={(e) => setCapacityKg(Number(e.target.value))}
                      className="w-full bg-[#020617] border border-white/10 rounded-xl px-3 py-2 text-xs text-white font-mono focus:border-amber-400 focus:outline-none"
                    />
                  </div>
                </div>
              </div>
            )}

            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-3 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs sm:text-sm shadow-lg shadow-indigo-500/25 transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              {isLoading ? (
                <span>Registering on Supabase PostgreSQL...</span>
              ) : (
                <>
                  <span>Create {role.toUpperCase()} Account</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </form>
        </div>

        <p className="text-center text-xs text-slate-400">
          Already have an account?{' '}
          <button
            onClick={() => setCurrentPage('login')}
            className="text-indigo-400 font-bold hover:underline cursor-pointer"
          >
            Log In
          </button>
        </p>
      </div>
    </div>
  );
};
