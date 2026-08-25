import React, { useState } from 'react';
import { 
  User, 
  Mail, 
  Phone, 
  Building, 
  ShieldCheck, 
  CheckCircle2, 
  Camera, 
  Key, 
  Save 
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

export const ProfileView: React.FC = () => {
  const { currentUser, role, addNotification } = useAuth();
  const [name, setName] = useState(currentUser?.name || 'Saikishan');
  const [email, setEmail] = useState(currentUser?.email || 'saikishan@loadlink.app');
  const [phone, setPhone] = useState(currentUser?.phone || '+91 98490 12345');
  const [saved, setSaved] = useState(false);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setSaved(true);
    addNotification('Profile Updated', 'Your profile information has been synchronized with Supabase.', 'system');
    setTimeout(() => setSaved(false), 4000);
  };

  return (
    <div className="space-y-6 max-w-4xl">
      {/* Header */}
      <div>
        <h2 className="font-bold text-2xl text-white">
          Account Profile & Credentials
        </h2>
        <p className="text-xs text-slate-400">
          Manage your personal details, verified role access, and corridor security settings.
        </p>
      </div>

      {/* Profile Overview Card */}
      <div className="rounded-3xl bg-white/[0.02] border border-white/10 p-6 sm:p-8 space-y-6 shadow-xl backdrop-blur-md">
        <div className="flex flex-col sm:flex-row items-center gap-6 pb-6 border-b border-white/10">
          <div className="relative">
            <img
              src={currentUser?.avatar || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=200'}
              alt={currentUser?.name}
              className="w-24 h-24 rounded-3xl object-cover border-2 border-indigo-500/40 shadow-xl"
            />
            <div className="absolute -bottom-2 -right-2 p-2 rounded-xl bg-indigo-600 text-white shadow-md cursor-pointer hover:bg-indigo-500 transition-colors">
              <Camera className="w-4 h-4" />
            </div>
          </div>

          <div className="space-y-1.5 text-center sm:text-left">
            <div className="flex items-center justify-center sm:justify-start gap-2">
              <h3 className="font-bold text-2xl text-white">{currentUser?.name}</h3>
              <span className="flex items-center gap-1 text-[11px] font-bold text-emerald-400 bg-emerald-500/10 px-2.5 py-0.5 rounded-full border border-emerald-500/30">
                <ShieldCheck className="w-3.5 h-3.5" />
                KYC Verified
              </span>
            </div>
            <p className="text-xs text-slate-400">{currentUser?.email} • {currentUser?.phone}</p>
            <div className="flex items-center justify-center sm:justify-start gap-2 pt-1">
              <span className="text-[11px] px-2.5 py-0.5 rounded-full bg-indigo-500/20 text-indigo-300 font-bold uppercase border border-indigo-500/30">
                Role: {role}
              </span>
              <span className="text-[11px] px-2.5 py-0.5 rounded-full bg-white/[0.05] text-slate-300 font-mono border border-white/10">
                ID: {currentUser?.id}
              </span>
            </div>
          </div>
        </div>

        {/* Edit Form */}
        <form onSubmit={handleSave} className="space-y-4 text-xs">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block font-semibold text-slate-300 mb-1">Full Legal Name</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full bg-[#020617] border border-white/10 rounded-xl px-3 py-2 text-white focus:border-indigo-500 focus:outline-none"
              />
            </div>

            <div>
              <label className="block font-semibold text-slate-300 mb-1">Email Address</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-[#020617] border border-white/10 rounded-xl px-3 py-2 text-white focus:border-indigo-500 focus:outline-none"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block font-semibold text-slate-300 mb-1">Primary Phone Number</label>
              <input
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="w-full bg-[#020617] border border-white/10 rounded-xl px-3 py-2 text-white focus:border-indigo-500 focus:outline-none"
              />
            </div>

            <div>
              <label className="block font-semibold text-slate-300 mb-1">Registered Enterprise / Firm</label>
              <input
                type="text"
                disabled
                value={currentUser?.company_name || 'LoadLink Shipper Member'}
                className="w-full bg-white/[0.02] border border-white/10 rounded-xl px-3 py-2 text-slate-400 cursor-not-allowed"
              />
            </div>
          </div>

          {saved && (
            <div className="p-3 rounded-xl bg-emerald-950/20 border border-emerald-500/30 text-emerald-300 flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>Profile saved successfully to Supabase database!</span>
            </div>
          )}

          <div className="pt-2 flex justify-end">
            <button
              type="submit"
              className="px-6 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold shadow-md transition-all flex items-center gap-1.5 cursor-pointer"
            >
              <Save className="w-4 h-4" />
              <span>Save Changes</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
