import { useState } from "react";
import {
  DollarSign,
  TrendingUp,
  CheckCircle2,
  Sparkles,
  ArrowRight,
  ShieldCheck,
  Layers
} from "lucide-react";
import { Button } from "@/components/ui/button";

export function StackSavingsCalculator({
  onOpenDemo
}: {
  onOpenDemo: (plan: string) => void;
}) {
  const [monthlyLeads, setMonthlyLeads] = useState<number>(3000);

  // Cost estimates for traditional fragmented stack:
  // 1. Cold Email software: ~₹4,500
  // 2. WhatsApp BSP platform fee: ~₹6,000
  // 3. Tele-callers (1 tele-caller per 1,000 leads @ ₹20,000/mo)
  const callersNeeded = Math.max(1, Math.ceil(monthlyLeads / 1200));
  const callerCost = callersNeeded * 22000;
  const emailToolCost = 4500;
  const whatsappToolCost = 6000;
  const zapierCost = 2500;
  const totalFragmentedCost = callerCost + emailToolCost + whatsappToolCost + zapierCost;

  // Conversio All-in-One: Starting at ₹3,000 up to ~₹11,999 for large volume
  const conversioCost = monthlyLeads <= 2000 ? 3000 : monthlyLeads <= 8000 ? 5599 : 11999;
  const monthlySavings = totalFragmentedCost - conversioCost;
  const annualSavings = monthlySavings * 12;
  const savingsPercent = Math.round((monthlySavings / totalFragmentedCost) * 100);

  return (
    <div className="rounded-[32px] bg-slate-950/80 border border-white/10 p-6 sm:p-10 shadow-2xl backdrop-blur-2xl relative overflow-hidden">
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="text-center max-w-3xl mx-auto mb-10">
        <span className="text-xs font-mono font-bold uppercase tracking-widest text-emerald-400 bg-emerald-500/10 border border-emerald-500/30 px-3.5 py-1 rounded-full">
          STACK CONSOLIDATION &amp; ROI
        </span>
        <h3 className="text-2xl sm:text-4xl font-display font-extrabold text-white tracking-tight mt-4">
          Replace 5 Disconnected Tools with One Unified AI System
        </h3>
        <p className="text-xs sm:text-base text-slate-400 mt-2">
          Eliminate expensive software sprawl and manual callers. Track your exact monthly savings in real time.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center pt-4">
        {/* Left Column: Interactive Slider & Breakdown */}
        <div className="lg:col-span-7 space-y-6">
          <div className="p-6 rounded-3xl bg-slate-900 border border-white/10 space-y-4">
            <div className="flex items-center justify-between">
              <label className="text-xs font-mono uppercase tracking-wider text-slate-400 font-bold">
                Your Monthly Lead Inflow
              </label>
              <span className="text-2xl font-mono font-extrabold text-emerald-400">
                {monthlyLeads.toLocaleString()} Leads / mo
              </span>
            </div>

            <input
              type="range"
              min={500}
              max={20000}
              step={500}
              value={monthlyLeads}
              onChange={(e) => setMonthlyLeads(Number(e.target.value))}
              className="w-full h-2.5 bg-slate-950 rounded-lg appearance-none cursor-pointer accent-emerald-500"
            />

            <div className="flex justify-between text-[10px] font-mono text-slate-500">
              <span>500 Leads</span>
              <span>10,000 Leads</span>
              <span>20,000+ Leads</span>
            </div>
          </div>

          {/* Fragmented Cost Comparison Table */}
          <div className="p-6 rounded-3xl bg-slate-900/60 border border-white/10 space-y-3.5 text-xs font-mono">
            <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 block mb-2">
              Fragmented Monthly Stack Costs:
            </span>

            <div className="flex justify-between items-center text-slate-300 pb-2 border-b border-white/5">
              <span>{callersNeeded}x Manual Tele-Callers / SDR Salaries</span>
              <span className="text-red-400 font-bold">₹{callerCost.toLocaleString()}</span>
            </div>

            <div className="flex justify-between items-center text-slate-300 pb-2 border-b border-white/5">
              <span>Legacy WhatsApp BSP Platform Subscription</span>
              <span className="text-red-400 font-bold">₹{whatsappToolCost.toLocaleString()}</span>
            </div>

            <div className="flex justify-between items-center text-slate-300 pb-2 border-b border-white/5">
              <span>Cold Email &amp; Inbound Sequencing Software</span>
              <span className="text-red-400 font-bold">₹{emailToolCost.toLocaleString()}</span>
            </div>

            <div className="flex justify-between items-center text-slate-300 pb-2 border-b border-white/5">
              <span>Automation Webhook Connectors (Zapier / Make)</span>
              <span className="text-red-400 font-bold">₹{zapierCost.toLocaleString()}</span>
            </div>

            <div className="flex justify-between items-center text-sm font-bold text-white pt-2">
              <span>Total Fragmented Stack:</span>
              <span className="text-red-400 font-mono text-base">₹{totalFragmentedCost.toLocaleString()}/mo</span>
            </div>
          </div>
        </div>

        {/* Right Column: Net Savings Box */}
        <div className="lg:col-span-5 rounded-3xl bg-gradient-to-b from-slate-900 via-slate-900 to-emerald-950/80 border-2 border-emerald-500/40 p-7 sm:p-8 shadow-[0_20px_60px_rgba(16,185,129,0.2)] space-y-6 text-center">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-mono font-bold mx-auto">
            <Sparkles className="w-3.5 h-3.5" /> SAVE {savingsPercent}% OF MONTHLY BUDGET
          </div>

          <div>
            <span className="text-xs font-mono text-slate-400 uppercase tracking-widest block mb-1">
              Estimated Monthly Cost Savings
            </span>
            <div className="text-4xl sm:text-5xl font-mono font-extrabold text-emerald-400 tracking-tight">
              ₹{monthlySavings.toLocaleString()}
              <span className="text-xs text-slate-400 font-normal"> / month</span>
            </div>
            <div className="text-xs font-mono text-slate-300 mt-2">
              ₹{annualSavings.toLocaleString()} Saved per Year
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-slate-950/80 border border-white/10 text-xs font-mono text-left space-y-2 text-slate-300">
            <div className="flex items-center gap-2 text-emerald-400 font-bold">
              <CheckCircle2 className="w-4 h-4 shrink-0" />
              <span>Conversio Autonomous System: ₹{conversioCost.toLocaleString()}/mo</span>
            </div>
            <div className="text-[11px] text-slate-400 pl-6">
              Includes unified Email + WhatsApp + AI Voice dialer + Calendar booking in one single dashboard.
            </div>
          </div>

          <Button
            onClick={() => onOpenDemo("Growth Tri-Channel")}
            className="w-full bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs h-12 rounded-2xl cursor-pointer shadow-[0_0_25px_rgba(16,185,129,0.45)] transition-all"
          >
            Lock In Your Savings Demo
          </Button>
        </div>
      </div>
    </div>
  );
}
