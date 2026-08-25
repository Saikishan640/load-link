import React, { useState } from 'react';
import { 
  Truck, 
  MapPin, 
  ShieldCheck, 
  Bell, 
  User as UserIcon, 
  Menu, 
  X, 
  ArrowRight, 
  RotateCcw, 
  ChevronDown,
  LayoutDashboard,
  LogOut,
  Sparkles
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { UserRole } from '../../types';

interface NavbarProps {
  currentPage: string;
  setCurrentPage: (page: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({ currentPage, setCurrentPage }) => {
  const { currentUser, role, isAuthenticated, logout, switchRole, notifications, unreadNotificationCount, markNotificationAsRead } = useAuth();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [notifDropdownOpen, setNotifDropdownOpen] = useState(false);
  const [roleDropdownOpen, setRoleDropdownOpen] = useState(false);

  const navLinks = [
    { name: 'Home', id: 'home' },
    { name: 'About', id: 'about' },
    { name: 'Features', id: 'features' },
    { name: 'Pricing', id: 'pricing' },
    { name: 'Contact', id: 'contact' },
  ];

  const handleNavClick = (id: string) => {
    setCurrentPage(id);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const getRoleBadgeColor = (r: UserRole) => {
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
    <header className="sticky top-0 z-50 w-full border-b border-white/10 bg-[#020617]/85 backdrop-blur-xl transition-all duration-200">
      {/* Top micro corridor ticker banner */}
      <div className="bg-gradient-to-r from-indigo-950/40 via-slate-950/60 to-purple-950/30 border-b border-white/5 py-1 px-4 text-xs">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2 text-slate-300">
            <span className="status-indicator"></span>
            <span className="font-medium text-emerald-400">NH44 Corridor Active:</span>
            <span className="hidden sm:inline text-slate-300">Hyderabad ↔ Bengaluru return-load matching live • 94.2% return load fill rate</span>
            <span className="sm:hidden text-slate-300">Hyd ↔ Blr Live Matching</span>
          </div>
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1 text-indigo-300 text-[11px] font-semibold bg-indigo-500/10 px-2 py-0.5 rounded-full border border-indigo-500/20">
              <RotateCcw className="w-3 h-3 text-indigo-400" />
              <span>Save 30%+ on Return Trips</span>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-18">
          {/* Brand Logo */}
          <div 
            onClick={() => handleNavClick('home')}
            className="flex items-center gap-3 cursor-pointer group select-none"
            id="brand-logo-btn"
          >
            <div className="w-9 h-9 rounded-xl bg-indigo-600 flex items-center justify-center font-bold text-white shadow-lg shadow-indigo-500/25 group-hover:scale-105 transition-transform">
              <Truck className="w-5 h-5 text-white" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-bold text-xl tracking-tight text-white group-hover:text-indigo-300 transition-colors">
                  Load<span className="text-indigo-400">Link</span>
                </span>
                <span className="text-[10px] font-bold px-1.5 py-0.5 rounded-full bg-indigo-500/10 text-indigo-300 border border-indigo-500/20 uppercase tracking-wider">
                  v2.0
                </span>
              </div>
              <p className="text-[10px] text-slate-400 font-medium tracking-tight -mt-0.5 hidden sm:block">
                Smart Booking & Return-Load Logistics
              </p>
            </div>
          </div>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => {
              const isActive = currentPage === link.id;
              return (
                <button
                  key={link.id}
                  id={`nav-link-${link.id}`}
                  onClick={() => handleNavClick(link.id)}
                  className={`px-3.5 py-1.5 rounded-xl text-sm font-medium transition-all duration-150 ${
                    isActive
                      ? 'bg-white/10 text-indigo-300 font-semibold shadow-inner border border-white/5'
                      : 'text-slate-400 hover:text-white hover:bg-white/5'
                  }`}
                >
                  {link.name}
                </button>
              );
            })}
          </nav>

          {/* Right Action Tools & Auth */}
          <div className="flex items-center gap-2.5">
            {/* Quick Role Switcher Pill (Interactive Demo Aid) */}
            <div className="relative">
              <button
                id="role-switcher-btn"
                onClick={() => setRoleDropdownOpen(!roleDropdownOpen)}
                className={`hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold border transition-all ${getRoleBadgeColor(role)} hover:brightness-110`}
                title="Switch role for demo purposes"
              >
                <Sparkles className="w-3 h-3 text-indigo-400" />
                <span className="capitalize">{role} View</span>
                <ChevronDown className="w-3 h-3 opacity-70" />
              </button>

              {roleDropdownOpen && (
                <div className="absolute right-0 mt-2 w-48 rounded-2xl bg-slate-900/95 border border-white/10 shadow-2xl p-1.5 z-50 text-xs backdrop-blur-xl">
                  <p className="px-2 py-1 text-[10px] font-semibold text-slate-400 uppercase tracking-wider">
                    Switch Test Persona
                  </p>
                  <button
                    onClick={() => { switchRole('customer'); setRoleDropdownOpen(false); }}
                    className={`w-full text-left px-2.5 py-1.5 rounded-lg flex items-center justify-between ${role === 'customer' ? 'bg-indigo-500/20 text-indigo-300 font-semibold' : 'text-slate-300 hover:bg-white/5'}`}
                  >
                    <span>Customer (Sai)</span>
                    <span className="text-[10px] text-slate-500">Shipper</span>
                  </button>
                  <button
                    onClick={() => { switchRole('driver'); setRoleDropdownOpen(false); }}
                    className={`w-full text-left px-2.5 py-1.5 rounded-lg flex items-center justify-between ${role === 'driver' ? 'bg-amber-500/20 text-amber-300 font-semibold' : 'text-slate-300 hover:bg-white/5'}`}
                  >
                    <span>Driver (Ramesh)</span>
                    <span className="text-[10px] text-slate-500">Lorry Owner</span>
                  </button>
                  <button
                    onClick={() => { switchRole('business'); setRoleDropdownOpen(false); }}
                    className={`w-full text-left px-2.5 py-1.5 rounded-lg flex items-center justify-between ${role === 'business' ? 'bg-purple-500/20 text-purple-300 font-semibold' : 'text-slate-300 hover:bg-white/5'}`}
                  >
                    <span>Business (Priya)</span>
                    <span className="text-[10px] text-slate-500">Enterprise</span>
                  </button>
                </div>
              )}
            </div>

            {/* Notification Bell */}
            <div className="relative">
              <button
                id="notifications-bell-btn"
                onClick={() => setNotifDropdownOpen(!notifDropdownOpen)}
                className="relative p-2 rounded-xl text-slate-400 hover:text-white hover:bg-white/5 transition-colors"
                aria-label="Notifications"
              >
                <Bell className="w-5 h-5" />
                {unreadNotificationCount > 0 && (
                  <span className="absolute top-1.5 right-1.5 flex h-4 w-4 items-center justify-center rounded-full bg-indigo-500 text-[10px] font-bold text-white">
                    {unreadNotificationCount}
                  </span>
                )}
              </button>

              {/* Notifications Dropdown */}
              {notifDropdownOpen && (
                <div className="absolute right-0 mt-2 w-80 sm:w-96 rounded-2xl bg-slate-900/95 border border-white/10 shadow-2xl p-3 z-50 backdrop-blur-xl">
                  <div className="flex items-center justify-between pb-2 mb-2 border-b border-white/5">
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-sm text-white">Live Alerts</span>
                      {unreadNotificationCount > 0 && (
                        <span className="px-2 py-0.5 rounded-full bg-indigo-500/20 text-indigo-300 text-[10px] font-semibold border border-indigo-500/30">
                          {unreadNotificationCount} new
                        </span>
                      )}
                    </div>
                    <span className="text-[11px] text-slate-400">Corridor NH44 Feed</span>
                  </div>

                  <div className="space-y-2 max-h-72 overflow-y-auto pr-1">
                    {notifications.length === 0 ? (
                      <p className="text-xs text-slate-400 text-center py-4">No notifications right now.</p>
                    ) : (
                      notifications.map((notif) => (
                        <div
                          key={notif.id}
                          onClick={() => {
                            markNotificationAsRead(notif.id);
                            if (notif.action_link) {
                              setCurrentPage('dashboard');
                              setNotifDropdownOpen(false);
                            }
                          }}
                          className={`p-2.5 rounded-xl border text-xs cursor-pointer transition-all ${
                            notif.read
                              ? 'bg-slate-900/40 border-white/5 text-slate-400'
                              : 'bg-white/5 border-indigo-500/30 text-slate-200 hover:border-indigo-500/60'
                          }`}
                        >
                          <div className="flex items-start justify-between gap-1 mb-1">
                            <span className="font-semibold text-slate-200">{notif.title}</span>
                            <span className="text-[10px] text-slate-500 whitespace-nowrap">{notif.time}</span>
                          </div>
                          <p className="text-[11px] text-slate-300 leading-relaxed">{notif.message}</p>
                        </div>
                      ))
                    )}
                  </div>
                </div>
              )}
            </div>

            {/* Authenticated Dashboard / Auth CTA */}
            {isAuthenticated ? (
              <div className="flex items-center gap-2">
                <button
                  id="navbar-dashboard-btn"
                  onClick={() => handleNavClick('dashboard')}
                  className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all shadow-md ${
                    currentPage === 'dashboard'
                      ? 'bg-indigo-600 text-white shadow-indigo-500/25'
                      : 'bg-white/5 hover:bg-white/10 text-white border border-white/10'
                  }`}
                >
                  <LayoutDashboard className="w-4 h-4 text-indigo-400" />
                  <span className="hidden sm:inline">Dashboard</span>
                </button>

                <button
                  id="navbar-profile-btn"
                  onClick={() => handleNavClick('profile')}
                  className="flex items-center gap-2 p-1.5 sm:px-2.5 sm:py-1.5 rounded-xl bg-white/5 border border-white/10 hover:border-white/20 text-xs text-slate-200"
                >
                  <img
                    src={currentUser?.avatar || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100'}
                    alt={currentUser?.name}
                    className="w-6 h-6 rounded-full object-cover border border-indigo-400/40"
                  />
                  <span className="hidden md:inline font-medium">{currentUser?.name.split(' ')[0]}</span>
                </button>
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <button
                  id="nav-login-btn"
                  onClick={() => handleNavClick('login')}
                  className="px-3.5 py-2 rounded-xl text-xs sm:text-sm font-semibold text-slate-300 hover:text-white hover:bg-white/5 transition-all"
                >
                  Log In
                </button>
                <button
                  id="nav-register-btn"
                  onClick={() => handleNavClick('register')}
                  className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold bg-indigo-600 hover:bg-indigo-500 text-white shadow-lg shadow-indigo-500/25 hover:shadow-indigo-500/40 transition-all cursor-pointer"
                >
                  <span>Start Shipping</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            )}

            {/* Mobile hamburger menu toggle */}
            <button
              id="mobile-menu-toggle-btn"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 rounded-xl text-slate-400 hover:text-white hover:bg-white/5"
              aria-label="Open menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden border-b border-white/10 bg-[#020617]/95 backdrop-blur-2xl px-4 pt-3 pb-6 space-y-3">
          <div className="space-y-1">
            {navLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => handleNavClick(link.id)}
                className={`w-full text-left px-3 py-2 rounded-xl text-sm font-medium ${
                  currentPage === link.id ? 'bg-indigo-500/15 text-indigo-300 font-semibold' : 'text-slate-300 hover:bg-white/5'
                }`}
              >
                {link.name}
              </button>
            ))}
          </div>

          <div className="pt-2 border-t border-white/10 flex flex-col gap-2">
            <div className="flex items-center justify-between text-xs text-slate-400 px-1 py-1">
              <span>Active Persona:</span>
              <span className={`px-2 py-0.5 rounded-full font-bold uppercase ${getRoleBadgeColor(role)}`}>
                {role}
              </span>
            </div>

            <div className="grid grid-cols-3 gap-1.5">
              <button
                onClick={() => switchRole('customer')}
                className={`py-1.5 rounded-lg text-xs font-medium border text-center ${role === 'customer' ? 'bg-indigo-500/20 border-indigo-500 text-indigo-300' : 'border-white/5 text-slate-400'}`}
              >
                Customer
              </button>
              <button
                onClick={() => switchRole('driver')}
                className={`py-1.5 rounded-lg text-xs font-medium border text-center ${role === 'driver' ? 'bg-amber-500/20 border-amber-500 text-amber-300' : 'border-white/5 text-slate-400'}`}
              >
                Driver
              </button>
              <button
                onClick={() => switchRole('business')}
                className={`py-1.5 rounded-lg text-xs font-medium border text-center ${role === 'business' ? 'bg-purple-500/20 border-purple-500 text-purple-300' : 'border-white/5 text-slate-400'}`}
              >
                Business
              </button>
            </div>

            {isAuthenticated ? (
              <div className="grid grid-cols-2 gap-2 mt-2">
                <button
                  onClick={() => handleNavClick('dashboard')}
                  className="py-2.5 rounded-xl bg-indigo-600 text-white font-bold text-center text-xs shadow-lg shadow-indigo-500/25"
                >
                  Open Dashboard
                </button>
                <button
                  onClick={() => handleNavClick('profile')}
                  className="py-2.5 rounded-xl bg-white/5 border border-white/10 text-white font-medium text-center text-xs"
                >
                  My Profile
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-2 gap-2 mt-2">
                <button
                  onClick={() => handleNavClick('login')}
                  className="py-2.5 rounded-xl bg-white/5 border border-white/10 text-white font-medium text-center text-xs"
                >
                  Log In
                </button>
                <button
                  onClick={() => handleNavClick('register')}
                  className="py-2.5 rounded-xl bg-indigo-600 text-white font-bold text-center text-xs shadow-lg shadow-indigo-500/25"
                >
                  Start Shipping
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </header>
  );
};
