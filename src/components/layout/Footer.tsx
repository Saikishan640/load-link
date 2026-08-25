import React from 'react';
import { 
  Truck, 
  ShieldCheck, 
  MapPin, 
  Phone, 
  Mail, 
  RotateCcw, 
  ArrowRight, 
  Award, 
  CheckCircle2, 
  Lock, 
  GraduationCap
} from 'lucide-react';

interface FooterProps {
  setCurrentPage: (page: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ setCurrentPage }) => {
  const handleNav = (id: string) => {
    setCurrentPage(id);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="border-t border-white/10 bg-[#020617] text-slate-400 text-sm">
      {/* Top trust banner */}
      <div className="border-b border-white/5 bg-white/[0.02] py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-6">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">
              <RotateCcw className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-xs font-bold text-white uppercase tracking-wider">Return-Load Engine</h4>
              <p className="text-xs text-slate-400">Up to 40% discount on empty return legs</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-xs font-bold text-white uppercase tracking-wider">Verified Drivers</h4>
              <p className="text-xs text-slate-400">100% KYC & RC documents checked</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
              <Lock className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-xs font-bold text-white uppercase tracking-wider">Escrow Protection</h4>
              <p className="text-xs text-slate-400">Payment released only upon OTP delivery</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-purple-500/10 text-purple-400 border border-purple-500/20">
              <MapPin className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-xs font-bold text-white uppercase tracking-wider">Live GPS Corridor</h4>
              <p className="text-xs text-slate-400">Sub-minute telemetry on NH44 & NH65</p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer Links */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 lg:gap-12">
          {/* Col 1: Brand & Overview */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-3 cursor-pointer" onClick={() => handleNav('home')}>
              <div className="w-9 h-9 rounded-xl bg-indigo-600 flex items-center justify-center font-bold text-white shadow-lg shadow-indigo-500/25">
                <Truck className="w-5 h-5 text-white" />
              </div>
              <span className="font-bold text-xl text-white">
                Load<span className="text-indigo-400">Link</span>
              </span>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed max-w-sm">
              India's first smart load-carrier booking & automated return-load matching platform. Turning one-way trips into profitable round-trips for drivers while cutting shipping costs for businesses and individuals.
            </p>
            
            <div className="p-3.5 rounded-2xl bg-white/[0.03] border border-white/10 text-xs text-slate-300 flex items-start gap-2.5">
              <GraduationCap className="w-5 h-5 text-indigo-400 shrink-0 mt-0.5" />
              <div>
                <span className="font-semibold text-white">College Capstone Proposal</span>
                <p className="text-[11px] text-slate-400 mt-0.5">
                  Submitted by Saikishan (Sai) • B.Tech Computer Science & Engineering (3rd Year)
                </p>
              </div>
            </div>
          </div>

          {/* Col 2: Solutions & Vehicles */}
          <div className="space-y-3">
            <h4 className="font-bold text-sm text-white uppercase tracking-wider">Vehicle Fleet</h4>
            <ul className="space-y-2 text-xs">
              <li className="hover:text-indigo-400 cursor-pointer transition-colors" onClick={() => handleNav('features')}>
                Load Auto / Piaggio Ape (500 kg)
              </li>
              <li className="hover:text-indigo-400 cursor-pointer transition-colors" onClick={() => handleNav('features')}>
                Mini-Truck / Tata Ace (1.2 Ton)
              </li>
              <li className="hover:text-indigo-400 cursor-pointer transition-colors" onClick={() => handleNav('features')}>
                Mid-Size Lorry / Ashok Leyland (8.5 Ton)
              </li>
              <li className="hover:text-indigo-400 cursor-pointer transition-colors" onClick={() => handleNav('features')}>
                Multi-Axle Heavy Container (24 Ton)
              </li>
              <li className="hover:text-indigo-400 cursor-pointer transition-colors" onClick={() => handleNav('pricing')}>
                Return-Load Matching Calculator
              </li>
            </ul>
          </div>

          {/* Col 3: Express Corridors */}
          <div className="space-y-3">
            <h4 className="font-bold text-sm text-white uppercase tracking-wider">Active Corridors</h4>
            <ul className="space-y-2 text-xs">
              <li className="flex items-center justify-between text-slate-300">
                <span>Hyderabad ↔ Bengaluru</span>
                <span className="text-[10px] text-emerald-400 font-mono">NH44</span>
              </li>
              <li className="flex items-center justify-between text-slate-300">
                <span>Hyderabad ↔ Vijayawada</span>
                <span className="text-[10px] text-emerald-400 font-mono">NH65</span>
              </li>
              <li className="flex items-center justify-between text-slate-300">
                <span>Bengaluru ↔ Chennai</span>
                <span className="text-[10px] text-emerald-400 font-mono">NH48</span>
              </li>
              <li className="flex items-center justify-between text-slate-300">
                <span>Pune ↔ Mumbai Corridor</span>
                <span className="text-[10px] text-emerald-400 font-mono">Expressway</span>
              </li>
              <li className="text-indigo-400 text-[11px] pt-1">
                +12 Upcoming South India Routes
              </li>
            </ul>
          </div>

          {/* Col 4: Platform & Support */}
          <div className="space-y-3">
            <h4 className="font-bold text-sm text-white uppercase tracking-wider">Navigation</h4>
            <ul className="space-y-2 text-xs">
              <li>
                <button onClick={() => handleNav('about')} className="hover:text-indigo-400 transition-colors">
                  About & Feasibility
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('features')} className="hover:text-indigo-400 transition-colors">
                  Features & Matching Tech
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('pricing')} className="hover:text-indigo-400 transition-colors">
                  Pricing & Subscriptions
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('contact')} className="hover:text-indigo-400 transition-colors">
                  Contact & Hubs
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('dashboard')} className="hover:text-indigo-400 transition-colors text-indigo-400 font-semibold">
                  Transporter Dashboard
                </button>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-white/5 bg-[#020617] py-6 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 text-xs">
          <p className="text-slate-500">© {new Date().getFullYear()} LoadLink Logistics Technologies Pvt. Ltd. All rights reserved.</p>
          <div className="flex items-center gap-6 text-slate-400">
            <span className="hover:text-white cursor-pointer">Privacy Policy</span>
            <span className="hover:text-white cursor-pointer">Terms of Carriage</span>
            <span className="hover:text-white cursor-pointer">Driver Escrow Agreement</span>
            <span className="text-indigo-400/80 font-mono">v2.0-sophisticated</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
