import React, { useState } from "react";
import {
  TrendingUp,
  DollarSign,
  ShieldCheck,
  RefreshCw,
  Sparkles,
  CheckCircle2,
  Users,
  PieChart,
  ArrowUpRight,
  HelpCircle,
  Zap,
} from "lucide-react";

export const RevenueAttributionWidget: React.FC = () => {
  const [selectedAttribution, setSelectedAttribution] = useState<"all" | "direct" | "assisted" | "organic">("all");

  return (
    <div className="rounded-3xl border border-white/10 bg-[#091014]/90 p-6 lg:p-10 shadow-2xl backdrop-blur-2xl">
      {/* Header Bar */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-8 border-b border-white/10">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-semibold uppercase tracking-wider mb-2">
            <TrendingUp className="w-3.5 h-3.5" /> Module 1 & 8 — Revenue Intelligence & Attribution
          </div>
          <h3 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
            Revenue-First Dashboard & True Attribution
          </h3>
          <p className="text-sm text-gray-400 mt-1">
            Zero vanity metrics. Every rupee recovered or generated is reconciled through multi-touch attribution (Direct vs Assisted vs Organic).
          </p>
        </div>

        <div className="flex items-center gap-2 bg-emerald-500/10 border border-emerald-500/20 px-3 py-1.5 rounded-xl text-emerald-400 text-xs font-bold">
          <Sparkles className="w-3.5 h-3.5" /> 25.6x Measured Platform ROAS
        </div>
      </div>

      {/* Primary Revenue Cards Grid */}
      <div className="mt-8 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
        <div className="p-4 rounded-2xl bg-black/40 border border-white/10 flex flex-col justify-between">
          <span className="text-[10px] uppercase text-gray-400 font-semibold block">Total Revenue</span>
          <div className="mt-2">
            <div className="text-2xl font-black text-white">₹82.4L</div>
            <span className="text-[10px] text-gray-400">Total store GMV</span>
          </div>
        </div>

        <div className="p-4 rounded-2xl bg-gradient-to-tr from-emerald-950/40 via-emerald-900/20 to-teal-950/30 border border-emerald-500/40 flex flex-col justify-between shadow-lg shadow-emerald-500/5">
          <span className="text-[10px] uppercase text-emerald-400 font-bold block">Conversio Attributed</span>
          <div className="mt-2">
            <div className="text-2xl font-black text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-teal-300">
              ₹18.7L
            </div>
            <span className="text-[10px] text-emerald-400/90 font-medium">22.7% of total GMV</span>
          </div>
        </div>

        <div className="p-4 rounded-2xl bg-black/40 border border-emerald-500/20 flex flex-col justify-between">
          <span className="text-[10px] uppercase text-emerald-300 font-semibold block">Recovered Revenue</span>
          <div className="mt-2">
            <div className="text-2xl font-black text-white">₹6.4L</div>
            <span className="text-[10px] text-gray-400">Cart & checkout</span>
          </div>
        </div>

        <div className="p-4 rounded-2xl bg-black/40 border border-teal-500/20 flex flex-col justify-between">
          <span className="text-[10px] uppercase text-teal-300 font-semibold block">Repeat Purchases</span>
          <div className="mt-2">
            <div className="text-2xl font-black text-white">₹8.2L</div>
            <span className="text-[10px] text-gray-400">LTV reorder engine</span>
          </div>
        </div>

        <div className="p-4 rounded-2xl bg-black/40 border border-cyan-500/20 flex flex-col justify-between">
          <span className="text-[10px] uppercase text-cyan-300 font-semibold block">COD Losses Saved</span>
          <div className="mt-2">
            <div className="text-2xl font-black text-white">₹2.1L</div>
            <span className="text-[10px] text-gray-400">RTO Shield</span>
          </div>
        </div>

        <div className="p-4 rounded-2xl bg-black/40 border border-white/10 flex flex-col justify-between">
          <span className="text-[10px] uppercase text-gray-300 font-semibold block">Campaign Revenue</span>
          <div className="mt-2">
            <div className="text-2xl font-black text-white">₹2.0L</div>
            <span className="text-[10px] text-gray-400">Targeted sequences</span>
          </div>
        </div>
      </div>

      {/* Customer Health Cohorts Strip */}
      <div className="mt-6 p-4 rounded-2xl bg-black/30 border border-white/10 flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-white font-bold text-sm">
            <Users className="w-5 h-5 text-emerald-400" />
          </div>
          <div>
            <span className="text-xs font-bold text-white block">48,291 Active Customers</span>
            <span className="text-[11px] text-gray-400">Live Shopify database sync</span>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-3 text-xs">
          <div className="px-3 py-1.5 rounded-lg bg-white/5 border border-white/10">
            <span className="text-gray-400 mr-1.5">New Shoppers:</span>
            <span className="text-white font-bold">4,281</span>
          </div>
          <div className="px-3 py-1.5 rounded-lg bg-white/5 border border-white/10">
            <span className="text-gray-400 mr-1.5">Returning:</span>
            <span className="text-emerald-400 font-bold">8,912</span>
          </div>
          <div className="px-3 py-1.5 rounded-lg bg-amber-500/10 border border-amber-500/20 text-amber-300">
            <span className="text-amber-400/80 mr-1.5">VIP Tier:</span>
            <span className="font-bold">1,240</span>
          </div>
          <div className="px-3 py-1.5 rounded-lg bg-red-500/10 border border-red-500/20 text-red-300">
            <span className="text-red-400/80 mr-1.5">At Risk of Churn:</span>
            <span className="font-bold">5,821</span>
          </div>
        </div>
      </div>

      {/* Attribution Methodology & Transparent Attribution Breakdown */}
      <div className="mt-8 pt-8 border-t border-white/10">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
          <div>
            <span className="text-xs uppercase font-bold tracking-wider text-emerald-400 block mb-1">
              Multi-Touch Attribution Rigor
            </span>
            <h4 className="text-lg font-bold text-white">
              Preventing Inflated Claims: Direct vs Assisted vs Organic
            </h4>
          </div>

          <div className="flex items-center gap-1.5 bg-white/5 p-1 rounded-xl border border-white/10 text-xs">
            {(["all", "direct", "assisted", "organic"] as const).map((mode) => (
              <button
                key={mode}
                onClick={() => setSelectedAttribution(mode)}
                className={`px-3 py-1 rounded-lg capitalize font-semibold transition-all ${
                  selectedAttribution === mode
                    ? "bg-emerald-500 text-black shadow"
                    : "text-gray-400 hover:text-white"
                }`}
              >
                {mode}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className={`p-5 rounded-2xl border transition-all ${selectedAttribution === "direct" || selectedAttribution === "all" ? "bg-emerald-950/20 border-emerald-500/40" : "bg-white/[0.02] border-white/5 opacity-50"}`}>
            <div className="flex items-center justify-between mb-2">
              <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300">
                Direct Revenue
              </span>
              <span className="text-lg font-extrabold text-emerald-400">₹11.2L</span>
            </div>
            <p className="text-xs text-gray-300 leading-relaxed">
              Customer clicked a Conversio WhatsApp or email 1-click checkout link and completed transaction within 24 hours.
            </p>
            <div className="mt-3 text-[11px] text-emerald-400/90 font-medium">
              100% Deterministic Click ID Match
            </div>
          </div>

          <div className={`p-5 rounded-2xl border transition-all ${selectedAttribution === "assisted" || selectedAttribution === "all" ? "bg-teal-950/20 border-teal-500/40" : "bg-white/[0.02] border-white/5 opacity-50"}`}>
            <div className="flex items-center justify-between mb-2">
              <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded bg-teal-500/20 text-teal-300">
                Assisted Revenue
              </span>
              <span className="text-lg font-extrabold text-teal-300">₹7.5L</span>
            </div>
            <p className="text-xs text-gray-300 leading-relaxed">
              Customer had an AI conversation or received a reorder notice and returned to purchase on Shopify within a 7-day window.
            </p>
            <div className="mt-3 text-[11px] text-teal-400/90 font-medium">
              Unified Customer 360 Attribution
            </div>
          </div>

          <div className={`p-5 rounded-2xl border transition-all ${selectedAttribution === "organic" || selectedAttribution === "all" ? "bg-white/[0.03] border-white/10" : "bg-white/[0.02] border-white/5 opacity-50"}`}>
            <div className="flex items-center justify-between mb-2">
              <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded bg-white/10 text-gray-400">
                Organic Revenue
              </span>
              <span className="text-lg font-extrabold text-white">₹63.7L</span>
            </div>
            <p className="text-xs text-gray-400 leading-relaxed">
              Orders placed directly with zero Conversio automated interaction in the purchase path. Never credited to Conversio.
            </p>
            <div className="mt-3 text-[11px] text-gray-400 font-medium">
              Clean Separation of Credit
            </div>
          </div>
        </div>
      </div>

      {/* Founder Decisioning Screen: "What Should I Do Next?" */}
      <div className="mt-8 pt-8 border-t border-white/10">
        <div className="flex items-center gap-2 mb-4">
          <Zap className="w-4 h-4 text-emerald-400" />
          <h4 className="text-sm font-bold text-white uppercase tracking-wider">
            Executive Decisioning: "What Should I Do Next?"
          </h4>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          <div className="p-4 rounded-xl bg-gradient-to-r from-emerald-950/30 to-black/40 border border-emerald-500/30 flex items-start gap-3">
            <span className="w-6 h-6 rounded-lg bg-emerald-500/20 text-emerald-400 font-bold text-xs flex items-center justify-center shrink-0">1</span>
            <div className="text-xs text-gray-300">
              <span className="font-bold text-white block mb-0.5">Reorder Opportunity</span>
              1,240 customers are likely to reorder within 14 days based on SKU depletion models.
            </div>
          </div>

          <div className="p-4 rounded-xl bg-gradient-to-r from-teal-950/30 to-black/40 border border-teal-500/30 flex items-start gap-3">
            <span className="w-6 h-6 rounded-lg bg-teal-500/20 text-teal-400 font-bold text-xs flex items-center justify-center shrink-0">2</span>
            <div className="text-xs text-gray-300">
              <span className="font-bold text-white block mb-0.5">High Win-Back Probability</span>
              842 customers have reached Day 55 without repurchasing; win-back window closes at Day 60.
            </div>
          </div>

          <div className="p-4 rounded-xl bg-gradient-to-r from-amber-950/30 to-black/40 border border-amber-500/30 flex items-start gap-3">
            <span className="w-6 h-6 rounded-lg bg-amber-500/20 text-amber-400 font-bold text-xs flex items-center justify-center shrink-0">3</span>
            <div className="text-xs text-gray-300">
              <span className="font-bold text-white block mb-0.5">High-Value COD Risk</span>
              182 high-value COD orders currently require voice confirmation to prevent ₹3.2L in RTO.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
