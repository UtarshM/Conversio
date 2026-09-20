import React, { useState } from "react";
import { Calculator, ArrowRight, CheckCircle2 } from "lucide-react";

export const EarningsCalculator: React.FC = () => {
  const [referredStores, setReferredStores] = useState(25);
  const [avgPlanPrice, setAvgPlanPrice] = useState(6499);
  const commissionRate = 0.25; // 25% recurring

  const estimatedMonthly = Math.round(referredStores * avgPlanPrice * commissionRate);
  const estimatedAnnual = estimatedMonthly * 12;

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-10 shadow-2xl max-w-4xl mx-auto">
      <div className="text-center max-w-xl mx-auto space-y-2 mb-8">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-mono">
          <Calculator className="w-3.5 h-3.5" /> INTERACTIVE PARTNER CALCULATOR
        </div>
        <h3 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
          Calculate Your Recurring Monthly Payout
        </h3>
        <p className="text-slate-400 text-xs sm:text-sm">
          See your passive income potential based on your agency network or D2C merchant referrals.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        {/* Sliders & Plan Selector */}
        <div className="lg:col-span-7 space-y-6 bg-slate-950 p-6 rounded-2xl border border-slate-800/80">
          <div className="space-y-3">
            <div className="flex justify-between items-center text-xs font-semibold text-slate-300">
              <span>Active Referred Stores:</span>
              <span className="text-base font-bold text-emerald-400 font-mono">
                {referredStores} Brands
              </span>
            </div>
            <input
              type="range"
              min="1"
              max="150"
              value={referredStores}
              onChange={(e) => setReferredStores(Number(e.target.value))}
              className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-emerald-500"
            />
            <div className="flex justify-between text-[10px] text-slate-500 font-mono">
              <span>1 store</span>
              <span>50 stores</span>
              <span>100 stores</span>
              <span>150 stores</span>
            </div>
          </div>

          <div className="space-y-3 pt-2">
            <div className="flex justify-between items-center text-xs font-semibold text-slate-300">
              <span>Average Monthly Plan Tier:</span>
              <span className="text-base font-bold text-emerald-400 font-mono">
                ₹{avgPlanPrice.toLocaleString()}/mo
              </span>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <button
                type="button"
                onClick={() => setAvgPlanPrice(2999)}
                className={`p-3 rounded-xl border text-xs font-mono text-left transition-all ${
                  avgPlanPrice === 2999
                    ? "bg-emerald-500/10 border-emerald-500 text-white font-bold"
                    : "bg-slate-900 border-slate-800 text-slate-400 hover:text-slate-200"
                }`}
              >
                <span className="block font-bold">Starter Plan</span>
                <span className="text-[11px] text-slate-500">₹2,999 / month</span>
              </button>

              <button
                type="button"
                onClick={() => setAvgPlanPrice(6499)}
                className={`p-3 rounded-xl border text-xs font-mono text-left transition-all ${
                  avgPlanPrice === 6499
                    ? "bg-emerald-500/10 border-emerald-500 text-white font-bold"
                    : "bg-slate-900 border-slate-800 text-slate-400 hover:text-slate-200"
                }`}
              >
                <span className="block font-bold">Growth Suite</span>
                <span className="text-[11px] text-emerald-400">₹6,499 / month (Most Popular)</span>
              </button>
            </div>
          </div>
        </div>

        {/* Output Box */}
        <div className="lg:col-span-5 bg-gradient-to-b from-slate-950 to-slate-900 p-6 sm:p-8 rounded-2xl border border-emerald-500/30 text-white flex flex-col justify-between space-y-6">
          <div className="space-y-2">
            <span className="text-[10px] font-mono uppercase tracking-widest text-emerald-400 block">
              ESTIMATED MONTHLY COMMISSION
            </span>
            <div className="text-4xl sm:text-5xl font-black text-emerald-400 font-mono tracking-tight">
              ₹{estimatedMonthly.toLocaleString()}
            </div>
            <p className="text-xs text-slate-400">
              Per month recurring lifetime revenue.
            </p>
          </div>

          <div className="pt-4 border-t border-slate-800 space-y-2">
            <div className="flex justify-between text-xs text-slate-300">
              <span>Annual Passive Earning:</span>
              <strong className="text-white font-mono">₹{estimatedAnnual.toLocaleString()}/yr</strong>
            </div>
            <div className="flex justify-between text-xs text-slate-300">
              <span>Commission Tier:</span>
              <strong className="text-emerald-400 font-mono">25% Revenue Share</strong>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
