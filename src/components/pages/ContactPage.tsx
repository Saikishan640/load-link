import React, { useState } from 'react';
import { 
  MapPin, 
  Phone, 
  Mail, 
  Clock, 
  Send, 
  CheckCircle2, 
  Building, 
  ShieldAlert, 
  HelpCircle,
  GraduationCap
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

export const ContactPage: React.FC = () => {
  const { addNotification } = useAuth();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    inquiryType: 'transporter',
    message: '',
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email) return;

    setSubmitted(true);
    addNotification(
      'Message Received',
      `Thank you ${formData.name}! Our corridor logistics team will contact you at ${formData.phone || formData.email} within 2 hours.`,
      'alert'
    );
  };

  return (
    <div className="min-h-screen bg-[#020617] text-slate-100 py-12 sm:py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto space-y-16">
        {/* Header */}
        <div className="text-center space-y-4">
          <span className="px-3.5 py-1 rounded-full bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 text-xs font-bold uppercase tracking-wider">
            Corridor Hubs & Support
          </span>
          <h1 className="font-extrabold text-3xl sm:text-4xl lg:text-5xl text-white">
            Get in Touch with <span className="text-indigo-400">LoadLink</span>
          </h1>
          <p className="text-sm sm:text-base text-slate-300 max-w-2xl mx-auto">
            Whether you are a truck fleet owner looking to double earnings or a business needing reliable freight matching, we're ready to assist.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Contact Details & Regional Hubs */}
          <div className="space-y-6">
            {/* 24x7 Highway SOS Box */}
            <div className="p-5 rounded-2xl bg-amber-500/10 border border-amber-500/20 space-y-2 backdrop-blur-md">
              <div className="flex items-center gap-2 text-amber-400 font-bold text-sm">
                <ShieldAlert className="w-5 h-5" />
                <span>24/7 Transporter SOS Desk</span>
              </div>
              <p className="text-xs text-slate-300">
                For in-transit vehicle breakdown assistance, highway police escalation, or OTP issues on NH44:
              </p>
              <div className="font-mono text-base font-extrabold text-white pt-1">
                +91 1800-LOAD-LINK (Toll-Free)
              </div>
            </div>

            {/* Regional Hub 1: Hyderabad */}
            <div className="p-5 rounded-2xl bg-white/[0.02] border border-white/10 space-y-2 backdrop-blur-md">
              <div className="flex items-center justify-between">
                <h4 className="font-bold text-white text-base">Hyderabad HQ & Hub</h4>
                <span className="px-2 py-0.5 rounded-full bg-indigo-500/20 text-indigo-300 border border-indigo-500/30 text-[10px] font-mono">
                  HQ Corridor
                </span>
              </div>
              <p className="text-xs text-slate-400 flex items-start gap-2">
                <MapPin className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <span>HITEC City Logistic Park, Phase 2, Madhapur, Hyderabad, TS 500081</span>
              </p>
              <p className="text-xs text-slate-400 flex items-center gap-2">
                <Phone className="w-4 h-4 text-slate-500" />
                <span>+91 040-4920-8800</span>
              </p>
            </div>

            {/* Regional Hub 2: Bengaluru */}
            <div className="p-5 rounded-2xl bg-white/[0.02] border border-white/10 space-y-2 backdrop-blur-md">
              <div className="flex items-center justify-between">
                <h4 className="font-bold text-white text-base">Bengaluru Hub</h4>
                <span className="px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/30 text-[10px] font-mono">
                  NH44 Terminal
                </span>
              </div>
              <p className="text-xs text-slate-400 flex items-start gap-2">
                <MapPin className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <span>Peenya 2nd Stage Freight Complex, Tumkur Road, Bengaluru, KA 560058</span>
              </p>
              <p className="text-xs text-slate-400 flex items-center gap-2">
                <Phone className="w-4 h-4 text-slate-500" />
                <span>+91 080-2839-4411</span>
              </p>
            </div>

            {/* Regional Hub 3: Vijayawada */}
            <div className="p-5 rounded-2xl bg-white/[0.02] border border-white/10 space-y-2 backdrop-blur-md">
              <div className="flex items-center justify-between">
                <h4 className="font-bold text-white text-base">Vijayawada Hub</h4>
                <span className="px-2 py-0.5 rounded-full bg-indigo-500/20 text-indigo-300 border border-indigo-500/30 text-[10px] font-mono">
                  NH65 Terminal
                </span>
              </div>
              <p className="text-xs text-slate-400 flex items-start gap-2">
                <MapPin className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <span>Autonagar Commercial Transporters Colony, Vijayawada, AP 520007</span>
              </p>
            </div>

            {/* Academic Credit Box */}
            <div className="p-4 rounded-2xl bg-white/[0.02] border border-white/10 text-xs text-slate-400 space-y-1 backdrop-blur-md">
              <div className="flex items-center gap-2 text-white font-semibold">
                <GraduationCap className="w-4 h-4 text-indigo-400" />
                <span>College Project Lead</span>
              </div>
              <p>Saikishan (Sai) • B.Tech CSE (3rd Year)</p>
              <p className="text-[11px] text-slate-500">Contact: saikishan@loadlink.app</p>
            </div>
          </div>

          {/* Interactive Form */}
          <div className="lg:col-span-2">
            <div className="p-6 sm:p-8 rounded-3xl bg-white/[0.02] border border-white/10 shadow-2xl backdrop-blur-md">
              <h3 className="font-bold text-2xl text-white mb-2">Send an Inquiry</h3>
              <p className="text-xs text-slate-400 mb-6">
                Fill out the form below and our corridor fleet managers will respond right away.
              </p>

              {submitted ? (
                <div className="p-8 text-center space-y-4 bg-emerald-950/20 border border-emerald-500/30 rounded-2xl">
                  <CheckCircle2 className="w-12 h-12 text-emerald-400 mx-auto" />
                  <h4 className="font-bold text-xl text-white">Inquiry Received!</h4>
                  <p className="text-xs text-slate-300 max-w-md mx-auto">
                    Thank you for reaching out. We have logged your request and assigned it to our Hyderabad-Bengaluru logistics dispatcher.
                  </p>
                  <button
                    onClick={() => {
                      setSubmitted(false);
                      setFormData({ name: '', email: '', phone: '', inquiryType: 'transporter', message: '' });
                    }}
                    className="px-4 py-2 rounded-xl bg-white/10 hover:bg-white/15 border border-white/10 text-xs font-semibold text-white cursor-pointer"
                  >
                    Send Another Message
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-slate-300 mb-1.5">Full Name</label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. Ramesh Kumar"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className="w-full bg-[#020617] border border-white/10 rounded-xl px-3.5 py-2.5 text-xs text-white placeholder:text-slate-600 focus:border-indigo-500 focus:outline-none"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-slate-300 mb-1.5">Email Address</label>
                      <input
                        type="email"
                        required
                        placeholder="e.g. ramesh@transport.com"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="w-full bg-[#020617] border border-white/10 rounded-xl px-3.5 py-2.5 text-xs text-white placeholder:text-slate-600 focus:border-indigo-500 focus:outline-none"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-slate-300 mb-1.5">Phone Number</label>
                      <input
                        type="tel"
                        placeholder="+91 98765 43210"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        className="w-full bg-[#020617] border border-white/10 rounded-xl px-3.5 py-2.5 text-xs text-white placeholder:text-slate-600 focus:border-indigo-500 focus:outline-none"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-slate-300 mb-1.5">Inquiry Type</label>
                      <select
                        value={formData.inquiryType}
                        onChange={(e) => setFormData({ ...formData, inquiryType: e.target.value })}
                        className="w-full bg-[#020617] border border-white/10 rounded-xl px-3.5 py-2.5 text-xs text-white focus:border-indigo-500 focus:outline-none"
                      >
                        <option value="transporter">Driver / Fleet Owner Onboarding</option>
                        <option value="shipper">Business / Retail Freight Shifting</option>
                        <option value="enterprise">Enterprise TMS API Integration</option>
                        <option value="proposal">College Project / Capstone Query</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1.5">Message / Cargo Details</label>
                    <textarea
                      rows={4}
                      required
                      placeholder="Describe your freight requirements, vehicle type, or specific corridor route..."
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      className="w-full bg-[#020617] border border-white/10 rounded-xl p-3.5 text-xs text-white placeholder:text-slate-600 focus:border-indigo-500 focus:outline-none"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs sm:text-sm shadow-lg shadow-indigo-500/20 transition-all flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <Send className="w-4 h-4" />
                    <span>Submit Inquiry</span>
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
