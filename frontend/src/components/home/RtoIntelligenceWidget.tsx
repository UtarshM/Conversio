import React, { useState } from "react";
import {
  ShieldAlert,
  ShieldCheck,
  CheckCircle2,
  PhoneCall,
  MessageSquare,
  AlertTriangle,
  ArrowRight,
  TrendingDown,
  Sparkles,
  RefreshCw,
  CreditCard,
  Truck,
} from "lucide-react";

interface RiskSimulation {
  tier: "LOW" | "MEDIUM" | "HIGH";
  percentage: string;
  orderCount: number;
  label: string;
  description: string;
  factors: { name: string; score: string; status: "good" | "warning" | "danger" }[];
  actionPath: string[];
  recommendedAction: string;
}

const RISK_TIERS: Record<string, RiskSimulation> = {
  LOW: {
    tier: "LOW",
    percentage: "72%",
    orderCount: 898,
    label: "Safe to Dispatch Instantly",
    description: "Repeat customers with 100% past delivery completion, verified address syntax, and active WhatsApp engagement.",
    factors: [
      { name: "Customer History", score: "5 Past Successful Deliveries", status: "good" },
      { name: "Address Quality", score: "High Precision (House No + Landmark)", status: "good" },
      { name: "Order Value", score: "₹1,850 (Normal Range)", status: "good" },
      { name: "WhatsApp Engagement", score: "High (Read in <5 mins)", status: "good" },
    ],
    actionPath: ["Shopify COD Placed", "Automated Risk Engine (Score: 12/100)", "Instant Label Generation via Shiprocket", "Dispatched Same-Day"],
    recommendedAction: "Auto-approved for immediate fulfillment with zero friction.",
  },
  MEDIUM: {
    tier: "MEDIUM",
    percentage: "18%",
    orderCount: 224,
    label: "Verify via 1-Click WhatsApp",
    description: "First-time buyers or orders with minor address ambiguities. Verified instantly with an interactive WhatsApp confirmation button.",
    factors: [
      { name: "Customer History", score: "First-Time Buyer", status: "warning" },
      { name: "Address Quality", score: "Missing Landmark / Pincode Valid", status: "warning" },
      { name: "Order Value", score: "₹3,400 (Moderate Value)", status: "good" },
      { name: "WhatsApp Activity", score: "Active WhatsApp User", status: "good" },
    ],
    actionPath: ["Shopify COD Placed", "WhatsApp Interactive Ping Sent", "Customer Clicks 'Yes, Confirm My Order'", "Address Enriched & Dispatched"],
    recommendedAction: "WhatsApp interactive verification triggered within 60 seconds of checkout.",
  },
  HIGH: {
    tier: "HIGH",
    percentage: "10%",
    orderCount: 126,
    label: "Escalate to Multilingual AI Voice Call",
    description: "High-value COD, repeat past RTO flags, or unresponsive to WhatsApp. Autonomous AI Voice agent calls to confirm intent or collect UPI prepayment.",
    factors: [
      { name: "Customer History", score: "2 Past RTO Returns Recorded", status: "danger" },
      { name: "Address Quality", score: "Vague Address / Missing Details", status: "danger" },
      { name: "Order Value", score: "₹5,800 (High-Value COD)", status: "warning" },
      { name: "WhatsApp Response", score: "Unread after 2 Hours", status: "danger" },
    ],
    actionPath: [
      "Shopify COD Placed",
      "WhatsApp Unanswered (2h delay)",
      "Autonomous AI Voice Call Dispatched (Hindi/Gujarati)",
      "Shopper Confirms Delivery or Pays via UPI Link",
    ],
    recommendedAction: "Mandatory voice confirmation or 1-click UPI prepayment before releasing inventory.",
  },
};

export const RtoIntelligenceWidget: React.FC = () => {
  const [selectedTier, setSelectedTier] = useState<"LOW" | "MEDIUM" | "HIGH">("HIGH");
  const [isSimulatingVoice, setIsSimulatingVoice] = useState(false);
  const [callVerified, setCallVerified] = useState(false);

  const activeSimulation = RISK_TIERS[selectedTier];

  const handleSimulateVoice = () => {
    setIsSimulatingVoice(true);
    setTimeout(() => {
      setIsSimulatingVoice(false);
      setCallVerified(true);
    }, 1500);
  };

  return (
    <div className="rounded-3xl border border-white/10 bg-[#091014]/90 p-6 lg:p-10 shadow-2xl backdrop-blur-2xl">
      {/* Header Bar */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-8 border-b border-white/10">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-semibold uppercase tracking-wider mb-2">
            <ShieldAlert className="w-3.5 h-3.5" /> Module 3 & 9 — COD Defense Engine
          </div>
          <h3 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
            COD & RTO Intelligence Shield
          </h3>
          <p className="text-sm text-gray-400 mt-1">
            Cut return-to-origin losses by 65%. 7-factor predictive scoring triggers automated WhatsApp & AI Voice verification before dispatch.
          </p>
        </div>

        <div className="flex items-center gap-2 bg-emerald-500/10 border border-emerald-500/20 px-3 py-1.5 rounded-xl text-emerald-400 text-xs font-bold">
          <TrendingDown className="w-4 h-4" /> Avg RTO Reduced from 22% &rarr; 7.8%
        </div>
      </div>

      {/* COD Executive Numbers Strip */}
      <div className="mt-8 grid grid-cols-2 sm:grid-cols-5 gap-3">
        <div className="p-4 rounded-xl bg-black/40 border border-white/10 text-center">
          <span className="text-[10px] uppercase text-gray-400 font-semibold block">Total COD Orders</span>
          <span className="text-xl font-extrabold text-white">1,248</span>
        </div>
        <div className="p-4 rounded-xl bg-black/40 border border-emerald-500/30 text-center">
          <span className="text-[10px] uppercase text-emerald-400 font-semibold block">Verified Orders</span>
          <span className="text-xl font-extrabold text-emerald-400">1,102</span>
        </div>
        <div className="p-4 rounded-xl bg-black/40 border border-amber-500/30 text-center">
          <span className="text-[10px] uppercase text-amber-400 font-semibold block">In Verification</span>
          <span className="text-xl font-extrabold text-amber-400">146</span>
        </div>
        <div className="p-4 rounded-xl bg-black/40 border border-red-500/30 text-center">
          <span className="text-[10px] uppercase text-red-400 font-semibold block">Potential RTO Blocked</span>
          <span className="text-xl font-extrabold text-red-400">78</span>
        </div>
        <div className="col-span-2 sm:col-span-1 p-4 rounded-xl bg-gradient-to-tr from-emerald-950/40 to-teal-950/30 border border-emerald-500/40 text-center">
          <span className="text-[10px] uppercase text-emerald-300 font-semibold block">Recovered Revenue</span>
          <span className="text-xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-teal-200">
            ₹4.8L
          </span>
        </div>
      </div>

      {/* Risk Tier Selection Tabs */}
      <div className="mt-8">
        <div className="flex items-center justify-between mb-4">
          <span className="text-xs uppercase tracking-wider text-gray-400 font-bold">
            Live Order Cohort Risk Scoring
          </span>
          <span className="text-xs text-emerald-400 font-medium">Select tier to inspect verification flow:</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {(["LOW", "MEDIUM", "HIGH"] as const).map((tierKey) => {
            const tierData = RISK_TIERS[tierKey];
            const isSelected = selectedTier === tierKey;
            return (
              <button
                key={tierKey}
                onClick={() => {
                  setSelectedTier(tierKey);
                  setCallVerified(false);
                }}
                className={`p-4 rounded-2xl border text-left transition-all ${
                  isSelected
                    ? tierKey === "LOW"
                      ? "bg-emerald-950/40 border-emerald-400/60 shadow-lg shadow-emerald-500/10"
                      : tierKey === "MEDIUM"
                      ? "bg-amber-950/40 border-amber-400/60 shadow-lg shadow-amber-500/10"
                      : "bg-red-950/40 border-red-400/60 shadow-lg shadow-red-500/10"
                    : "bg-white/[0.02] border-white/10 hover:border-white/20"
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <span
                    className={`text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded ${
                      tierKey === "LOW"
                        ? "bg-emerald-500/20 text-emerald-300"
                        : tierKey === "MEDIUM"
                        ? "bg-amber-500/20 text-amber-300"
                        : "bg-red-500/20 text-red-300"
                    }`}
                  >
                    {tierKey} RISK
                  </span>
                  <span className="text-xl font-black text-white">{tierData.percentage}</span>
                </div>
                <div className="text-xs font-bold text-white mb-1">{tierData.label}</div>
                <div className="text-[11px] text-gray-400">{tierData.orderCount} Orders Classified</div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Selected Risk Tier Interactive Pipeline Breakdown */}
      <div className="mt-6 p-6 rounded-2xl border border-white/10 bg-black/40">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* 7-Factor Risk Analysis */}
          <div className="lg:col-span-6 space-y-4">
            <div>
              <span className="text-[10px] uppercase font-bold tracking-wider text-gray-400 block mb-1">
                7-Factor Risk Assessment Engine
              </span>
              <h5 className="text-base font-bold text-white">{activeSimulation.label}</h5>
              <p className="text-xs text-gray-400 mt-1 leading-relaxed">{activeSimulation.description}</p>
            </div>

            <div className="space-y-2">
              {activeSimulation.factors.map((factor, i) => (
                <div
                  key={i}
                  className="p-3 rounded-xl bg-white/[0.02] border border-white/5 flex items-center justify-between text-xs"
                >
                  <span className="text-gray-300 font-medium">{factor.name}</span>
                  <span
                    className={`font-semibold ${
                      factor.status === "good"
                        ? "text-emerald-400"
                        : factor.status === "warning"
                        ? "text-amber-400"
                        : "text-red-400"
                    }`}
                  >
                    {factor.score}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Verification Cascade Pipeline */}
          <div className="lg:col-span-6 rounded-xl border border-emerald-500/20 bg-emerald-950/10 p-5 space-y-4 flex flex-col justify-between">
            <div>
              <span className="text-[10px] uppercase font-bold tracking-wider text-emerald-400 block mb-1">
                Autonomous Verification Cascade
              </span>
              <h5 className="text-sm font-bold text-white mb-3">Resolution & Fulfillment Pipeline</h5>

              <div className="space-y-2.5">
                {activeSimulation.actionPath.map((step, idx) => (
                  <div key={idx} className="flex items-center gap-2.5 text-xs">
                    <div className="w-5 h-5 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center font-bold text-[10px] shrink-0 border border-emerald-500/30">
                      {idx + 1}
                    </div>
                    <span className="text-gray-300 font-medium">{step}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Interactive High Risk Voice Trigger */}
            {selectedTier === "HIGH" && (
              <div className="pt-4 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-3">
                <div className="text-xs text-gray-300">
                  <span className="font-bold text-white block">Unresponsive WhatsApp?</span>
                  <span>AI Voice Agent initiates call in customer's local language.</span>
                </div>

                <button
                  onClick={handleSimulateVoice}
                  disabled={isSimulatingVoice || callVerified}
                  className={`px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-wider flex items-center gap-2 transition-all shrink-0 ${
                    callVerified
                      ? "bg-emerald-500/20 text-emerald-300 border border-emerald-500/30"
                      : "bg-emerald-500 text-black hover:bg-emerald-400"
                  }`}
                >
                  {isSimulatingVoice ? (
                    <>
                      <RefreshCw className="w-3.5 h-3.5 animate-spin" /> Calling Customer...
                    </>
                  ) : callVerified ? (
                    <>
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" /> Confirmed by Voice
                    </>
                  ) : (
                    <>
                      <PhoneCall className="w-3.5 h-3.5" /> Simulate AI Voice Call
                    </>
                  )}
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
