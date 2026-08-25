import React, { useState } from 'react';
import { 
  Wallet, 
  ArrowUpRight, 
  ArrowDownLeft, 
  ShieldCheck, 
  CheckCircle2, 
  Clock, 
  Lock, 
  CreditCard, 
  Building2,
  Sparkles
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useData } from '../../context/DataContext';

export const EscrowWalletView: React.FC = () => {
  const { currentUser, role, addNotification } = useAuth();
  const { bookings } = useData();
  const [withdrawAmount, setWithdrawAmount] = useState('5000');
  const [upiId, setUpiId] = useState('saikishan@okaxis');
  const [withdrawSuccess, setWithdrawSuccess] = useState(false);

  const handleWithdraw = (e: React.FormEvent) => {
    e.preventDefault();
    if (!withdrawAmount) return;

    setWithdrawSuccess(true);
    addNotification(
      'Payout Initiated',
      `₹${withdrawAmount} transfer initiated to ${upiId} via Instant IMPS/UPI. Settlement in ~2 minutes.`,
      'payment'
    );
    setTimeout(() => setWithdrawSuccess(false), 5000);
  };

  return (
    <div className="space-y-6">
      {/* Top Header */}
      <div>
        <h2 className="font-bold text-2xl text-white">
          Escrow Wallet & Transit Payouts
        </h2>
        <p className="text-xs text-slate-400">
          Secure digital escrow holding for shippers and instant milestone payouts for transporters.
        </p>
      </div>

      {/* Wallet Balance Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="rounded-3xl bg-white/[0.02] border border-white/10 p-6 space-y-4 shadow-xl relative overflow-hidden backdrop-blur-md">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-400">Available Wallet Balance</span>
            <div className="p-2 rounded-xl bg-emerald-500/10 text-emerald-400">
              <Wallet className="w-5 h-5" />
            </div>
          </div>
          <div>
            <span className="font-extrabold text-3xl sm:text-4xl text-white font-mono">
              ₹{(currentUser?.wallet_balance || 14500).toLocaleString()}
            </span>
            <span className="text-[11px] text-emerald-400 block mt-1">✓ Ready for Instant Payout / Dispatch</span>
          </div>
        </div>

        <div className="rounded-3xl bg-white/[0.02] border border-amber-500/30 p-6 space-y-4 shadow-xl backdrop-blur-md">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-400">Locked in Transit Escrow</span>
            <div className="p-2 rounded-xl bg-amber-500/10 text-amber-400">
              <Lock className="w-5 h-5" />
            </div>
          </div>
          <div>
            <span className="font-extrabold text-3xl sm:text-4xl text-amber-400 font-mono">
              ₹22,400
            </span>
            <span className="text-[11px] text-slate-400 block mt-1">Consignment #LD-101 (Release upon OTP)</span>
          </div>
        </div>

        <div className="rounded-3xl bg-white/[0.02] border border-white/10 p-6 space-y-4 shadow-xl backdrop-blur-md">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-400">Total Lifetime Savings</span>
            <div className="p-2 rounded-xl bg-indigo-500/10 text-indigo-400">
              <Sparkles className="w-5 h-5" />
            </div>
          </div>
          <div>
            <span className="font-extrabold text-3xl sm:text-4xl text-indigo-400 font-mono">
              ₹68,900
            </span>
            <span className="text-[11px] text-slate-400 block mt-1">Achieved via Return-Load Discounts</span>
          </div>
        </div>
      </div>

      {/* Instant Payout / Add Funds Action Form */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="p-6 rounded-3xl bg-white/[0.02] border border-white/10 space-y-4 backdrop-blur-md">
          <h3 className="font-bold text-lg text-white">Instant UPI / Bank Withdrawal</h3>
          <p className="text-xs text-slate-400">
            Transporters can withdraw earned trip fares 24/7 with zero IMPS fees.
          </p>

          {withdrawSuccess ? (
            <div className="p-4 rounded-2xl bg-emerald-950/20 border border-emerald-500/30 text-xs text-emerald-300 flex items-center gap-2">
              <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
              <span>Withdrawal request initiated successfully! Bank confirmation reference #TXN891240</span>
            </div>
          ) : (
            <form onSubmit={handleWithdraw} className="space-y-3 text-xs">
              <div>
                <label className="block font-semibold text-slate-300 mb-1">UPI ID or Virtual Payment Address</label>
                <input
                  type="text"
                  required
                  value={upiId}
                  onChange={(e) => setUpiId(e.target.value)}
                  placeholder="name@upi"
                  className="w-full bg-[#020617] border border-white/10 rounded-xl px-3 py-2 text-white font-mono focus:border-indigo-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-300 mb-1">Amount to Transfer (₹)</label>
                <input
                  type="number"
                  required
                  value={withdrawAmount}
                  onChange={(e) => setWithdrawAmount(e.target.value)}
                  className="w-full bg-[#020617] border border-white/10 rounded-xl px-3 py-2 text-white font-mono focus:border-indigo-500 focus:outline-none"
                />
              </div>

              <button
                type="submit"
                className="w-full py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs shadow-md transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
              >
                <ArrowUpRight className="w-4 h-4" />
                <span>Withdraw ₹{Number(withdrawAmount || 0).toLocaleString()} Instantly</span>
              </button>
            </form>
          )}
        </div>

        {/* Escrow Guarantee Infographic */}
        <div className="p-6 rounded-3xl bg-white/[0.02] border border-white/10 space-y-4 backdrop-blur-md">
          <div className="flex items-center gap-2 text-emerald-400">
            <ShieldCheck className="w-5 h-5" />
            <h3 className="font-bold text-lg text-white">How LoadLink Escrow Protects You</h3>
          </div>

          <div className="space-y-3 text-xs text-slate-300">
            <div className="p-3 rounded-xl bg-[#020617] border border-white/10 flex items-start gap-2.5">
              <span className="w-5 h-5 rounded-full bg-indigo-500/20 text-indigo-400 font-bold flex items-center justify-center text-[10px] shrink-0 mt-0.5">
                1
              </span>
              <p>
                <strong>Customer Deposits Fare:</strong> When a load is booked, funds are locked in the digital escrow vault.
              </p>
            </div>

            <div className="p-3 rounded-xl bg-[#020617] border border-white/10 flex items-start gap-2.5">
              <span className="w-5 h-5 rounded-full bg-indigo-500/20 text-indigo-400 font-bold flex items-center justify-center text-[10px] shrink-0 mt-0.5">
                2
              </span>
              <p>
                <strong>Live Highway Tracking:</strong> The transporter transports the consignment with real-time GPS telemetry on NH44.
              </p>
            </div>

            <div className="p-3 rounded-xl bg-[#020617] border border-white/10 flex items-start gap-2.5">
              <span className="w-5 h-5 rounded-full bg-indigo-500/20 text-indigo-400 font-bold flex items-center justify-center text-[10px] shrink-0 mt-0.5">
                3
              </span>
              <p>
                <strong>OTP Verification & Release:</strong> Once the recipient confirms goods intact via 4-digit OTP, the payment is credited instantly to the transporter's wallet.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
