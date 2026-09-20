import React, { useState } from "react";
import { Sparkles, ArrowRight, CheckCircle2, Zap, TrendingUp, Users, ShoppingCart, RefreshCw, UserCheck, ShieldAlert } from "lucide-react";

interface Opportunity {
  id: string;
  title: string;
  category: string;
  potentialRevenue: string;
  customerCount: string;
  confidenceScore: number;
  channels: string[];
  recommendedAction: string;
  urgency: "HIGH" | "MEDIUM" | "SCHEDULED";
  status: "ready" | "activating" | "active";
}

const INITIAL_OPPORTUNITIES: Opportunity[] = [
  {
    id: "cart-recovery",
    title: "High-Intent Cart Abandonment",
    category: "Recover",
    potentialRevenue: "₹2,40,000",
    customerCount: "1,284 shoppers",
    confidenceScore: 94,
    channels: ["WhatsApp Cloud API", "Smart Email", "AI Voice"],
    recommendedAction: "15-min dynamic WhatsApp nudge with 5% expiring discount & UPI 1-click link.",
    urgency: "HIGH",
    status: "ready",
  },
  {
    id: "reorder-engine",
    title: "Predictive Reorder Window",
    category: "Retain",
    potentialRevenue: "₹2,10,000",
    customerCount: "842 shoppers",
    confidenceScore: 91,
    channels: ["WhatsApp Interactive", "Email Digest"],
    recommendedAction: "Replenishment trigger timed to product consumption cycle (Day 28 of 30).",
    urgency: "HIGH",
    status: "ready",
  },
  {
    id: "winback-60d",
    title: "60-Day Inactivity Win-Back",
    category: "Repeat",
    potentialRevenue: "₹1,60,000",
    customerCount: "1,820 shoppers",
    confidenceScore: 88,
    channels: ["WhatsApp Cloud API", "AI Telephony"],
    recommendedAction: "Personalized curated catalog based on previous category preference.",
    urgency: "MEDIUM",
    status: "ready",
  },
  {
    id: "cross-sell-spf",
    title: "Intelligent Cross-Sell Pairing",
    category: "Convert",
    potentialRevenue: "₹1,40,000",
    customerCount: "920 shoppers",
    confidenceScore: 89,
    channels: ["WhatsApp Interactive"],
    recommendedAction: "Recommend SPF Sunscreen to recent Cleanser & Moisturizer buyers.",
    urgency: "MEDIUM",
    status: "ready",
  },
  {
    id: "vip-upsell",
    title: "VIP Tier Upgrade & Secret Drop",
    category: "Retain",
    potentialRevenue: "₹1,20,000",
    customerCount: "284 VIPs",
    confidenceScore: 96,
    channels: ["VIP WhatsApp Concierge"],
    recommendedAction: "Exclusive early access invite to limited edition festive product drop.",
    urgency: "SCHEDULED",
    status: "ready",
  },
];

export const AiRevenueOpportunitiesWidget: React.FC = () => {
  const [opportunities, setOpportunities] = useState<Opportunity[]>(INITIAL_OPPORTUNITIES);
  const [selectedOpp, setSelectedOpp] = useState<Opportunity | null>(null);
  const [isActivatingAll, setIsActivatingAll] = useState(false);
  const [allActivated, setAllActivated] = useState(false);

  const handleActivate = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setOpportunities((prev) =>
      prev.map((opp) => (opp.id === id ? { ...opp, status: "activating" } : opp))
    );

    setTimeout(() => {
      setOpportunities((prev) =>
        prev.map((opp) => (opp.id === id ? { ...opp, status: "active" } : opp))
      );
    }, 1200);
  };

  const handleActivateAll = () => {
    setIsActivatingAll(true);
    setTimeout(() => {
      setOpportunities((prev) => prev.map((opp) => ({ ...opp, status: "active" })));
      setIsActivatingAll(false);
      setAllActivated(true);
    }, 1500);
  };

  const totalCalculated = opportunities.reduce((acc, curr) => {
    const num = parseInt(curr.potentialRevenue.replace(/[^\d]/g, ""), 10) || 0;
    return acc + num;
  }, 0);

  const activeCount = opportunities.filter((o) => o.status === "active").length;

  return (
    <div className="relative rounded-3xl border border-emerald-500/20 bg-gradient-to-b from-[#0e171b] via-[#091014] to-[#05090b] p-6 lg:p-10 shadow-2xl backdrop-blur-xl overflow-hidden">
      {/* Background ambient glow */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-1/4 w-80 h-80 bg-teal-500/10 rounded-full blur-3xl pointer-events-none" />

      {/* Header Bar */}
      <div className="relative flex flex-col md:flex-row md:items-center justify-between gap-6 pb-8 border-b border-white/10">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-semibold tracking-wider uppercase mb-3">
            <Sparkles className="w-3.5 h-3.5 animate-pulse" />
            Signature Conversio Intelligence
          </div>
          <h3 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
            AI Revenue Opportunities
          </h3>
          <p className="text-sm text-gray-400 mt-1">
            Autonomous opportunity detector continuously scanning your customer graph, order intent, and lifecycle churn risks.
          </p>
        </div>

        {/* Global Opportunity Metric & 1-Click Master CTA */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 bg-black/40 border border-emerald-500/20 p-4 rounded-2xl">
          <div>
            <span className="text-xs uppercase text-gray-400 font-medium tracking-wider block">
              Identified Revenue Pool
            </span>
            <div className="text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-teal-300 to-cyan-400">
              ₹8.7L
            </div>
            <span className="text-[11px] text-emerald-400/90 font-medium flex items-center gap-1 mt-0.5">
              <TrendingUp className="w-3 h-3" /> 5 actionable cohorts detected
            </span>
          </div>

          <button
            onClick={handleActivateAll}
            disabled={isActivatingAll || allActivated}
            className={`w-full sm:w-auto px-5 py-3 rounded-xl font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 transition-all shadow-lg ${
              allActivated
                ? "bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 cursor-default"
                : "bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-400 hover:to-teal-500 text-black shadow-emerald-500/20 hover:scale-[1.02]"
            }`}
          >
            {isActivatingAll ? (
              <>
                <RefreshCw className="w-4 h-4 animate-spin" /> Deploying All...
              </>
            ) : allActivated ? (
              <>
                <CheckCircle2 className="w-4 h-4 text-emerald-400" /> All Workflows Live
              </>
            ) : (
              <>
                <Zap className="w-4 h-4 fill-current" /> Activate Opportunities
              </>
            )}
          </button>
        </div>
      </div>

      {/* 5 Opportunity Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 pt-8">
        {opportunities.map((opp) => {
          const isSelected = selectedOpp?.id === opp.id;
          const isActive = opp.status === "active";
          const isActivating = opp.status === "activating";

          return (
            <div
              key={opp.id}
              onClick={() => setSelectedOpp(opp)}
              className={`group relative rounded-2xl border p-5 cursor-pointer transition-all duration-300 flex flex-col justify-between ${
                isActive
                  ? "bg-emerald-950/20 border-emerald-500/40 shadow-lg shadow-emerald-500/5"
                  : isSelected
                  ? "bg-white/[0.07] border-emerald-400/50 shadow-md"
                  : "bg-white/[0.03] border-white/10 hover:border-white/20 hover:bg-white/[0.05]"
              }`}
            >
              {/* Category & Confidence */}
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="text-[10px] uppercase font-bold tracking-wider px-2.5 py-0.5 rounded-md bg-white/10 text-gray-300">
                    {opp.category}
                  </span>
                  <div className="flex items-center gap-1.5 text-xs text-emerald-400 font-semibold bg-emerald-500/10 px-2 py-0.5 rounded-full border border-emerald-500/20">
                    <Sparkles className="w-3 h-3" />
                    {opp.confidenceScore}% Confidence
                  </div>
                </div>

                <div className="text-2xl font-extrabold text-white tracking-tight">
                  {opp.potentialRevenue}
                </div>
                <div className="text-xs text-gray-400 font-medium mb-2">
                  {opp.customerCount}
                </div>

                <h4 className="text-sm font-semibold text-white group-hover:text-emerald-300 transition-colors">
                  {opp.title}
                </h4>
                <p className="text-xs text-gray-400 mt-1 line-clamp-2 leading-relaxed">
                  {opp.recommendedAction}
                </p>
              </div>

              {/* Action Button & Channel icons */}
              <div className="pt-4 mt-4 border-t border-white/5 flex items-center justify-between">
                <div className="flex items-center gap-1.5 text-[11px] text-gray-400">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 inline-block" />
                  {opp.channels[0]}
                </div>

                <button
                  onClick={(e) => handleActivate(opp.id, e)}
                  disabled={isActive || isActivating}
                  className={`text-xs font-bold px-3 py-1.5 rounded-lg transition-all flex items-center gap-1.5 ${
                    isActive
                      ? "bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 cursor-default"
                      : isActivating
                      ? "bg-emerald-500/10 text-emerald-400"
                      : "bg-white/10 hover:bg-emerald-500 hover:text-black text-white"
                  }`}
                >
                  {isActivating ? (
                    <>
                      <RefreshCw className="w-3 h-3 animate-spin" /> Deploying
                    </>
                  ) : isActive ? (
                    <>
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" /> Active
                    </>
                  ) : (
                    <>
                      Activate <ArrowRight className="w-3 h-3" />
                    </>
                  )}
                </button>
              </div>
            </div>
          );
        })}

        {/* 6th Card: Autonomous AI Engine State */}
        <div className="rounded-2xl border border-dashed border-emerald-500/30 bg-emerald-950/10 p-5 flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-2 text-emerald-400 text-xs font-semibold uppercase tracking-wider mb-2">
              <Zap className="w-4 h-4" /> Autonomous Mode
            </div>
            <h4 className="text-sm font-bold text-white mb-1">
              Zero Manual Campaign Setup
            </h4>
            <p className="text-xs text-gray-400 leading-relaxed">
              Conversio continuously segments your Shopify customer base, predicts reorder cycles, and calculates RTO risks 24/7 without marketing fatigue.
            </p>
          </div>

          <div className="pt-4 border-t border-white/5 flex items-center justify-between text-xs text-gray-400">
            <span>Active Deployments</span>
            <span className="font-bold text-emerald-400">{activeCount} of 5 Live</span>
          </div>
        </div>
      </div>

      {/* Selected Opportunity Detail Drawer / Preview */}
      {selectedOpp && (
        <div className="mt-8 pt-6 border-t border-white/10 bg-black/30 rounded-2xl p-6 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="space-y-1 max-w-2xl">
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold uppercase text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">
                {selectedOpp.category} Blueprint
              </span>
              <span className="text-xs text-gray-400">• {selectedOpp.customerCount}</span>
            </div>
            <h4 className="text-base font-bold text-white">{selectedOpp.title}</h4>
            <p className="text-xs text-gray-300 leading-relaxed">{selectedOpp.recommendedAction}</p>
            <div className="flex flex-wrap items-center gap-2 pt-2">
              <span className="text-[11px] text-gray-400 font-medium">Orchestrated Channels:</span>
              {selectedOpp.channels.map((ch, i) => (
                <span key={i} className="text-[11px] bg-white/10 text-gray-200 px-2 py-0.5 rounded-md font-mono">
                  {ch}
                </span>
              ))}
            </div>
          </div>

          <div className="flex items-center gap-3 w-full md:w-auto">
            <button
              onClick={() => setSelectedOpp(null)}
              className="px-4 py-2.5 rounded-xl border border-white/10 text-xs font-semibold text-gray-300 hover:bg-white/5"
            >
              Close
            </button>
            <button
              onClick={(e) => handleActivate(selectedOpp.id, e)}
              disabled={selectedOpp.status === "active" || selectedOpp.status === "activating"}
              className={`px-5 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider flex items-center gap-2 ${
                selectedOpp.status === "active"
                  ? "bg-emerald-500/20 text-emerald-300 border border-emerald-500/30"
                  : "bg-emerald-500 text-black hover:bg-emerald-400"
              }`}
            >
              {selectedOpp.status === "active" ? (
                <>
                  <CheckCircle2 className="w-4 h-4" /> Live in Production
                </>
              ) : (
                <>
                  <Zap className="w-4 h-4 fill-current" /> Deploy AI Workflow
                </>
              )}
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
