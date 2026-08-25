import React, { useState } from 'react';
import { 
  LayoutDashboard, 
  PlusCircle, 
  RotateCcw, 
  Navigation, 
  Package, 
  Truck, 
  Wallet, 
  User as UserIcon, 
  Settings, 
  LogOut, 
  Bell, 
  ChevronRight, 
  Menu, 
  X,
  Sparkles,
  ShieldCheck,
  ChevronDown
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { UserRole } from '../../types';

interface DashboardLayoutProps {
  currentTab: string;
  setCurrentTab: (tab: string) => void;
  setCurrentPage: (page: string) => void;
  children: React.ReactNode;
  openPostLoadModal: () => void;
}

export const DashboardLayout: React.FC<DashboardLayoutProps> = ({
  currentTab,
  setCurrentTab,
  setCurrentPage,
  children,
  openPostLoadModal,
}) => {
  const { currentUser, role, switchRole, logout, notifications, unreadNotificationCount } = useAuth();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [roleDropdownOpen, setRoleDropdownOpen] = useState(false);

  const navItems = [
    { id: 'overview', label: 'Overview', icon: LayoutDashboard },
    { id: 'post_load', label: 'Post a Load', icon: PlusCircle, isAction: true },
    { id: 'return_loads', label: 'Return-Load Matcher', icon: RotateCcw, badge: 'Core' },
    { id: 'tracking', label: 'Live Highway Tracking', icon: Navigation, badge: 'Live' },
    { id: 'loads', label: 'Shipments & Freight', icon: Package },
    { id: 'vehicles', label: 'Vehicles & Fleet KYC', icon: Truck },
    { id: 'wallet', label: 'Escrow & Earnings', icon: Wallet },
    { id: 'profile', label: 'Profile & Security', icon: UserIcon },
    { id: 'settings', label: 'Supabase & Settings', icon: Settings },
  ];

  const handleNavClick = (id: string, isAction?: boolean) => {
    if (isAction) {
      openPostLoadModal();
    } else {
      setCurrentTab(id);
    }
    setSidebarOpen(false);
  };

  const getRoleBadgeStyle = (r: UserRole) => {
    switch (r) {
      case 'driver':
        return 'bg-amber-500/15 text-amber-300 border-amber-500/30';
      case 'business':
        return 'bg-purple-500/15 text-purple-300 border-purple-500/30';
      default:
        return 'bg-indigo-500/15 text-indigo-300 border-indigo-500/30';
    }
  };

  return (
    <div className="min-h-screen bg-[#020617] text-slate-100 flex flex-col md:flex-row">
      {/* Mobile Header Bar */}
      <div className="md:hidden flex items-center justify-between p-4 border-b border-white/10 bg-[#020617]/90 backdrop-blur-lg sticky top-0 z-40">
        <div 
          onClick={() => setCurrentPage('home')}
          className="flex items-center gap-2 cursor-pointer"
        >
          <div className="w-8 h-8 rounded-lg bg-indigo-600 flex items-center justify-center font-bold text-white shadow-md shadow-indigo-500/25">
            <Truck className="w-4 h-4 text-white" />
          </div>
          <span className="font-bold text-lg text-white">
            Load<span className="text-indigo-400">Link</span>
          </span>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="p-2 rounded-xl bg-white/5 border border-white/10 text-slate-300"
          >
            {sidebarOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Sidebar Navigation */}
      <aside
        className={`fixed md:sticky top-0 left-0 z-40 h-screen w-64 border-r border-white/10 bg-[#020617]/95 backdrop-blur-2xl flex flex-col justify-between p-4 transition-transform duration-300 ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'
        }`}
      >
        <div className="space-y-6">
          {/* Brand header */}
          <div 
            onClick={() => setCurrentPage('home')}
            className="flex items-center gap-3 cursor-pointer group px-2 pt-1"
          >
            <div className="w-9 h-9 rounded-xl bg-indigo-600 flex items-center justify-center font-bold text-white shadow-lg shadow-indigo-500/25 group-hover:scale-105 transition-transform">
              <Truck className="w-4 h-4 text-white" />
            </div>
            <div>
              <span className="font-bold text-lg text-white group-hover:text-indigo-300 transition-colors">
                Load<span className="text-indigo-400">Link</span>
              </span>
              <p className="text-[10px] text-slate-400 -mt-0.5 font-medium">Logistics Dashboard</p>
            </div>
          </div>

          {/* User profile card & role switcher in sidebar */}
          <div className="p-3 rounded-2xl bg-white/[0.03] border border-white/10 space-y-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <img
                  src={currentUser?.avatar || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100'}
                  alt={currentUser?.name}
                  className="w-8 h-8 rounded-full object-cover border border-indigo-400/40"
                />
                <div className="overflow-hidden">
                  <h4 className="text-xs font-bold text-white truncate">{currentUser?.name}</h4>
                  <span className={`inline-block text-[9px] font-bold px-2 py-0.5 rounded-full uppercase border ${getRoleBadgeStyle(role)} mt-0.5`}>
                    {role}
                  </span>
                </div>
              </div>
            </div>

            {/* Quick Persona Swapper for Demo Evaluation */}
            <div className="relative pt-1 border-t border-white/5">
              <button
                onClick={() => setRoleDropdownOpen(!roleDropdownOpen)}
                className="w-full py-1.5 px-2 rounded-lg bg-[#020617]/70 hover:bg-[#020617] border border-white/10 text-[10px] text-slate-300 flex items-center justify-between font-medium transition-colors"
              >
                <span className="flex items-center gap-1">
                  <Sparkles className="w-3 h-3 text-indigo-400" />
                  <span>Switch Role View</span>
                </span>
                <ChevronDown className="w-3 h-3 opacity-60" />
              </button>

              {roleDropdownOpen && (
                <div className="absolute left-0 top-full mt-1 w-full bg-slate-900 border border-white/10 rounded-xl p-1 shadow-2xl z-50 text-[11px] backdrop-blur-xl">
                  <button
                    onClick={() => { switchRole('customer'); setRoleDropdownOpen(false); }}
                    className={`w-full text-left p-1.5 rounded-lg ${role === 'customer' ? 'bg-indigo-500/20 text-indigo-300 font-bold' : 'text-slate-300 hover:bg-white/5'}`}
                  >
                    Shipper / Customer (Sai)
                  </button>
                  <button
                    onClick={() => { switchRole('driver'); setRoleDropdownOpen(false); }}
                    className={`w-full text-left p-1.5 rounded-lg ${role === 'driver' ? 'bg-amber-500/20 text-amber-300 font-bold' : 'text-slate-300 hover:bg-white/5'}`}
                  >
                    Driver / Lorry Owner (Ramesh)
                  </button>
                  <button
                    onClick={() => { switchRole('business'); setRoleDropdownOpen(false); }}
                    className={`w-full text-left p-1.5 rounded-lg ${role === 'business' ? 'bg-purple-500/20 text-purple-300 font-bold' : 'text-slate-300 hover:bg-white/5'}`}
                  >
                    Enterprise Fleet (Priya)
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* Navigation Links */}
          <nav className="space-y-1">
            {navItems.map((item) => {
              const isActive = currentTab === item.id;
              const Icon = item.icon;
              return (
                <button
                  key={item.id}
                  id={`dashboard-sidebar-${item.id}`}
                  onClick={() => handleNavClick(item.id, item.isAction)}
                  className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs font-semibold transition-all ${
                    item.isAction
                      ? 'bg-indigo-600 hover:bg-indigo-500 text-white font-bold shadow-lg shadow-indigo-500/25 mb-2 cursor-pointer'
                      : isActive
                      ? 'bg-white/10 text-indigo-300 border border-white/5 shadow-inner'
                      : 'text-slate-400 hover:bg-white/5 hover:text-white'
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <Icon className={`w-4 h-4 ${item.isAction ? 'text-white' : isActive ? 'text-indigo-400' : 'text-slate-400'}`} />
                    <span>{item.label}</span>
                  </div>
                  {item.badge && (
                    <span className={`text-[9px] font-bold px-1.5 py-0.5 rounded-full uppercase ${
                      item.badge === 'Core'
                        ? 'bg-indigo-500/20 text-indigo-300 border border-indigo-500/30'
                        : 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                    }`}>
                      {item.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </nav>
        </div>

        {/* Bottom utility links */}
        <div className="pt-4 border-t border-white/10 space-y-1">
          <button
            onClick={() => setCurrentPage('home')}
            className="w-full text-left px-3 py-2 rounded-xl text-xs text-slate-400 hover:text-white hover:bg-white/5 transition-colors flex items-center gap-2"
          >
            <ChevronRight className="w-3.5 h-3.5 rotate-180" />
            <span>Back to Public Website</span>
          </button>
          <button
            onClick={() => {
              logout();
              setCurrentPage('login');
            }}
            className="w-full text-left px-3 py-2 rounded-xl text-xs text-red-400 hover:bg-red-950/30 transition-colors flex items-center gap-2"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span>Sign Out</span>
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 min-w-0 p-4 sm:p-6 lg:p-8 overflow-y-auto">
        {/* Dashboard Topbar */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-6 mb-6 border-b border-white/10">
          <div>
            <h1 className="font-bold text-2xl sm:text-3xl text-white capitalize">
              {currentTab.replace('_', ' ')}
            </h1>
            <p className="text-xs text-slate-400 mt-0.5">
              Corridor NH44 Active • Connected to Supabase PostgreSQL Datastore
            </p>
          </div>

          <div className="flex items-center gap-3 w-full sm:w-auto">
            <button
              onClick={openPostLoadModal}
              className="flex-1 sm:flex-none px-4 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs shadow-lg shadow-indigo-500/25 transition-all flex items-center justify-center gap-1.5 cursor-pointer"
            >
              <PlusCircle className="w-3.5 h-3.5" />
              <span>Post New Load</span>
            </button>

            <button
              onClick={() => setCurrentTab('return_loads')}
              className="px-3.5 py-2.5 rounded-xl bg-white/5 border border-white/10 hover:border-indigo-500/40 text-indigo-300 font-semibold text-xs flex items-center gap-1.5 transition-colors cursor-pointer"
            >
              <RotateCcw className="w-3.5 h-3.5 text-indigo-400" />
              <span>Return Matcher</span>
            </button>
          </div>
        </div>

        {children}
      </main>
    </div>
  );
};
