import React, { useState, useEffect } from 'react';
import { AuthProvider, useAuth } from './context/AuthContext';
import { DataProvider } from './context/DataContext';
import { Navbar } from './components/layout/Navbar';
import { Footer } from './components/layout/Footer';
import { HomePage } from './components/pages/HomePage';
import { AboutPage } from './components/pages/AboutPage';
import { FeaturesPage } from './components/pages/FeaturesPage';
import { PricingPage } from './components/pages/PricingPage';
import { ContactPage } from './components/pages/ContactPage';
import { LoginPage } from './components/pages/LoginPage';
import { RegisterPage } from './components/pages/RegisterPage';
import { DashboardPage } from './components/pages/DashboardPage';
import { CheckCircle2, AlertCircle, Info, X } from 'lucide-react';

const AppContent: React.FC = () => {
  const [currentPage, setCurrentPage] = useState<string>('home');
  const { notifications, removeNotification, isAuthenticated } = useAuth();

  // Scroll to top on page change
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [currentPage]);

  const renderPage = () => {
    switch (currentPage) {
      case 'home':
        return <HomePage setCurrentPage={setCurrentPage} />;
      case 'about':
        return <AboutPage setCurrentPage={setCurrentPage} />;
      case 'features':
        return <FeaturesPage setCurrentPage={setCurrentPage} />;
      case 'pricing':
        return <PricingPage setCurrentPage={setCurrentPage} />;
      case 'contact':
        return <ContactPage />;
      case 'login':
        return <LoginPage setCurrentPage={setCurrentPage} />;
      case 'register':
        return <RegisterPage setCurrentPage={setCurrentPage} />;
      case 'dashboard':
        return <DashboardPage setCurrentPage={setCurrentPage} initialTab="overview" />;
      case 'profile':
        return <DashboardPage setCurrentPage={setCurrentPage} initialTab="profile" />;
      case 'settings':
        return <DashboardPage setCurrentPage={setCurrentPage} initialTab="settings" />;
      default:
        return <HomePage setCurrentPage={setCurrentPage} />;
    }
  };

  const isDashboardPage = ['dashboard', 'profile', 'settings'].includes(currentPage);
  const isAuthPage = ['login', 'register'].includes(currentPage);

  return (
    <div className="min-h-screen bg-[#020617] text-slate-100 flex flex-col selection:bg-indigo-500/30 selection:text-indigo-200 relative">
      {/* Sophisticated Dark Ambient Background Blur */}
      <div className="bg-blur" />

      {/* Show public Navbar on non-dashboard & non-auth pages */}
      {!isDashboardPage && !isAuthPage && (
        <Navbar currentPage={currentPage} setCurrentPage={setCurrentPage} />
      )}

      {/* Main Page Content */}
      <main className="flex-grow">
        {renderPage()}
      </main>

      {/* Show public Footer on non-dashboard & non-auth pages */}
      {!isDashboardPage && !isAuthPage && (
        <Footer setCurrentPage={setCurrentPage} />
      )}

      {/* Toast Notification Container */}
      <div className="fixed bottom-4 right-4 z-50 flex flex-col gap-2 max-w-sm w-full pointer-events-none">
        {notifications.slice(0, 3).map((n) => (
          <div
            key={n.id}
            className="pointer-events-auto p-4 rounded-2xl bg-slate-900/90 border border-white/10 shadow-2xl backdrop-blur-xl flex items-start gap-3 animate-in slide-in-from-bottom-2 fade-in"
          >
            {n.type === 'match' ? (
              <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
            ) : n.type === 'alert' ? (
              <AlertCircle className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
            ) : (
              <Info className="w-5 h-5 text-indigo-400 shrink-0 mt-0.5" />
            )}

            <div className="flex-1 text-xs">
              <h4 className="font-bold text-white">{n.title}</h4>
              <p className="text-slate-300 mt-0.5 leading-relaxed">{n.message}</p>
            </div>

            <button
              onClick={() => removeNotification(n.id)}
              className="text-slate-500 hover:text-white p-1"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default function App() {
  return (
    <AuthProvider>
      <DataProvider>
        <AppContent />
      </DataProvider>
    </AuthProvider>
  );
}
