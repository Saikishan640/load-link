import React, { useState } from 'react';
import { 
  Truck, 
  Lock, 
  Mail, 
  ArrowRight, 
  ShieldCheck, 
  Sparkles, 
  UserCheck, 
  Building 
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { UserRole } from '../../types';

interface LoginPageProps {
  setCurrentPage: (page: string) => void;
}

export const LoginPage: React.FC<LoginPageProps> = ({ setCurrentPage }) => {
  const { login, allUsers, switchRole } = useAuth();
  const [selectedRole, setSelectedRole] = useState<UserRole>('customer');
  const [email, setEmail] = useState('saikishan@loadlink.app');
  const [password, setPassword] = useState('password123');
  const [isLoading, setIsLoading] = useState(false);

  const handleRoleSelect = (role: UserRole) => {
    setSelectedRole(role);
    if (role === 'customer') {
      setEmail('saikishan@loadlink.app');
    } else if (role === 'driver') {
      setEmail('ramesh.trucker@gmail.com');
    } else {
      setEmail('logistics@deccanfmcg.com');
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    await login(email, selectedRole);
    setIsLoading(false);
    setCurrentPage('dashboard');
  };

  const handleQuickLogin = async (userEmail: string, role: UserRole) => {
    setIsLoading(true);
    await login(userEmail, role);
    setIsLoading(false);
    setCurrentPage('dashboard');
  };

  return (
    <div className="min-h-screen bg-[#020617] text-slate-100 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Background ambient glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none -z-10" />

      <div className="max-w-md w-full space-y-6">
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
          <h2 className="font-bold text-2xl text-white">Sign In to Your Account</h2>
          <p className="text-xs text-slate-400">
            Select your role and access your logistics command center.
          </p>
        </div>

        {/* Role Selector Tabs */}
        <div className="grid grid-cols-3 gap-1.5 p-1 rounded-2xl bg-white/[0.03] border border-white/10">
          <button
            type="button"
            onClick={() => handleRoleSelect('customer')}
            className={`py-2 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
              selectedRole === 'customer'
                ? 'bg-indigo-600 text-white shadow-sm'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            Customer
          </button>
          <button
            type="button"
            onClick={() => handleRoleSelect('driver')}
            className={`py-2 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
              selectedRole === 'driver'
                ? 'bg-amber-600 text-white shadow-sm'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            Driver / Fleet
          </button>
          <button
            type="button"
            onClick={() => handleRoleSelect('business')}
            className={`py-2 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
              selectedRole === 'business'
                ? 'bg-emerald-600 text-white shadow-sm'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            Business
          </button>
        </div>

        {/* Main Form Card */}
        <div className="rounded-3xl bg-white/[0.02] border border-white/10 p-6 sm:p-8 shadow-2xl backdrop-blur-md space-y-5">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1.5">Email Address</label>
              <div className="relative">
                <Mail className="w-4 h-4 text-slate-500 absolute left-3.5 top-3" />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-[#020617] border border-white/10 rounded-xl pl-10 pr-3.5 py-2.5 text-xs text-white placeholder:text-slate-600 focus:border-indigo-500 focus:outline-none"
                  placeholder="name@example.com"
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="text-xs font-semibold text-slate-300">Password</label>
                <span className="text-[11px] text-indigo-400 hover:underline cursor-pointer">
                  Forgot Password?
                </span>
              </div>
              <div className="relative">
                <Lock className="w-4 h-4 text-slate-500 absolute left-3.5 top-3" />
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full bg-[#020617] border border-white/10 rounded-xl pl-10 pr-3.5 py-2.5 text-xs text-white placeholder:text-slate-600 focus:border-indigo-500 focus:outline-none"
                  placeholder="••••••••"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-3 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs sm:text-sm shadow-lg shadow-indigo-500/25 transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              {isLoading ? (
                <span>Authenticating with Supabase...</span>
              ) : (
                <>
                  <span>Sign In</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </form>

          {/* Quick Demo Test Logins */}
          <div className="pt-4 border-t border-white/10 space-y-2">
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
              1-Click Demo Accounts (Pre-Seeded)
            </span>
            <div className="grid grid-cols-1 gap-1.5">
              <button
                type="button"
                onClick={() => handleQuickLogin('saikishan@loadlink.app', 'customer')}
                className="w-full p-2 rounded-xl bg-white/[0.02] hover:bg-white/5 border border-white/5 text-left flex items-center justify-between text-xs transition-colors cursor-pointer"
              >
                <div>
                  <span className="font-semibold text-indigo-300">Saikishan (Sai)</span>
                  <span className="text-[10px] text-slate-500 block">Customer • Active Hyd ↔ Blr Load</span>
                </div>
                <span className="text-[10px] px-2 py-0.5 rounded-full bg-indigo-500/10 text-indigo-400 font-mono">
                  Login →
                </span>
              </button>

              <button
                type="button"
                onClick={() => handleQuickLogin('ramesh.trucker@gmail.com', 'driver')}
                className="w-full p-2 rounded-xl bg-white/[0.02] hover:bg-white/5 border border-white/5 text-left flex items-center justify-between text-xs transition-colors cursor-pointer"
              >
                <div>
                  <span className="font-semibold text-amber-300">Ramesh Kumar</span>
                  <span className="text-[10px] text-slate-500 block">Lorry Driver • TS 09 UA 8842</span>
                </div>
                <span className="text-[10px] px-2 py-0.5 rounded-full bg-amber-500/10 text-amber-400 font-mono">
                  Login →
                </span>
              </button>

              <button
                type="button"
                onClick={() => handleQuickLogin('logistics@deccanfmcg.com', 'business')}
                className="w-full p-2 rounded-xl bg-white/[0.02] hover:bg-white/5 border border-white/5 text-left flex items-center justify-between text-xs transition-colors cursor-pointer"
              >
                <div>
                  <span className="font-semibold text-emerald-300">Priya Sharma</span>
                  <span className="text-[10px] text-slate-500 block">Deccan FMCG • Enterprise Dispatcher</span>
                </div>
                <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 font-mono">
                  Login →
                </span>
              </button>
            </div>
          </div>
        </div>

        {/* Bottom Switch to Register */}
        <p className="text-center text-xs text-slate-400">
          Don't have an account yet?{' '}
          <button
            onClick={() => setCurrentPage('register')}
            className="text-indigo-400 font-bold hover:underline cursor-pointer"
          >
            Sign up Free
          </button>
        </p>
      </div>
    </div>
  );
};
