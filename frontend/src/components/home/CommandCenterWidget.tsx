import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Sparkles,
  TrendingUp,
  RotateCcw,
  ShieldCheck,
  Zap,
  Users,
  AlertTriangle,
  HeartHandshake,
  Crown,
  CheckCircle2,
  Clock,
  PhoneCall,
  ShoppingBag,
  ArrowRight,
  ChevronRight,
  Activity,
  Bot,
  Flame,
} from "lucide-react";

interface RevenueOpportunity {
  id: string;
  title: string;
  category: string;
  potentialRevenue: string;
  eligibleCount: number;
  confidence: number;
  description: string;
  recommendedChannel: "WhatsApp" | "AI Voice" | "Email" | "Multi-channel";
}

const OPPORTUNITIES_DATA: RevenueOpportunity[] = [
  {
    id: "cart",
    title: "High-Value Abandoned Carts (>₹2,500)",
    category: "Cart Recovery",
    potentialRevenue: "₹3.20 Lakhs",
    eligibleCount: 1284,
    confidence: 94,
    description: "Shoppers dropped off at payment step in the last 48 hours. Ready for 3-tier WhatsApp + Voice recovery cascade.",
    recommendedChannel: "Multi-channel",
  },
  {
    id: "reorder",
    title: "Predictive Product Replenishment",
    category: "Reorder Engine",
    potentialRevenue: "₹2.80 Lakhs",
    eligibleCount: 842,
    confidence: 91,
    description: "Consumable items reaching estimated 90% depletion cycle. WhatsApp replenishment nudge with 1-click reorder link.",
    recommendedChannel: "WhatsApp",
  },
  {
    id: "winback",
    title: "60-Day High-LTV Inactive Shoppers",
    category: "Win-Back",
    potentialRevenue: "₹2.40 Lakhs",
    eligibleCount: 1820,
    confidence: 86,
    description: "Previously loyal customers who haven't ordered in 60+ days. Personalized win-back coupon with catalog drop.",
    recommendedChannel: "Email",
  },
  {
    id: "cross_sell",
    title: "Post-Purchase Affinity Cross-Sell",
    category: "Cross-Sell",
    potentialRevenue: "₹1.90 Lakhs",
    eligibleCount: 920,
    confidence: 89,
    description: "Recent buyers of Serum ready for complementary Moisturizer & Sunscreen pairing offer at special 15% bundle price.",
    recommendedChannel: "WhatsApp",
  },
  {
    id: "vip",
    title: "VIP Exclusive Early Access Drop",
    category: "VIP Nurture",
    potentialRevenue: "₹1.40 Lakhs",
    eligibleCount: 284,
    confidence: 96,
    description: "Top 1% spenders (>₹10,000 LTV). Private WhatsApp drop before public site launch with personalized greeting.",
    recommendedChannel: "WhatsApp",
  },
  {
    id: "cod",
    title: "High-Risk COD Verification & Prepaid Switch",
    category: "RTO Shield",
    potentialRevenue: "₹1.10 Lakhs",
    eligibleCount: 92,
    confidence: 92,
    description: "High-risk unconfirmed COD orders pending dispatch. Autonomous AI voice verification + ₹50 prepaid conversion incentive.",
    recommendedChannel: "AI Voice",
  },
];

export function CommandCenterWidget() {
  const [activatedIds, setActivatedIds] = useState<string[]>([]);
  const [isActivatingAll, setIsActivatingAll] = useState(false);
  const [activeTab, setActiveTab] = useState<"opportunities" | "health" | "actions">("opportunities");

  const totalPool = "₹12.80 Lakhs";

  const handleActivate = (id: string) => {
    if (!activatedIds.includes(id)) {
      setActivatedIds((prev) => [...prev, id]);
    }
  };

  const handleActivateAll = () => {
    setIsActivatingAll(true);
    setTimeout(() => {
      setActivatedIds(OPPORTUNITIES_DATA.map((o) => o.id));
      setIsActivatingAll(false);
    }, 900);
  };

  return (
    <div className="rounded-3xl border border-white/10 bg-[#070e12]/95 p-6 sm:p-10 shadow-2xl backdrop-blur-2xl space-y-8">
      {/* Top Header & Daily Briefing Greeting */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 pb-6 border-b border-white/10">
        <div className="space-y-1.5">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-ping" />
            <Badge className="bg-emerald-500/10 text-emerald-400 border-emerald-500/20 font-mono text-[10px] tracking-wider uppercase">
              Section 3 & 108 • Autonomous Founder Command Center
            </Badge>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight flex items-center gap-2">
            Good morning, Utkarsh <span className="text-xl">👋</span>
          </h2>
          <p className="text-xs sm:text-sm text-gray-400">
            Conversio scanned <span className="text-white font-medium">48,291 customer profiles</span> this morning. Here is your operational revenue pulse.
          </p>
        </div>

        {/* Global Action Button */}
        <div className="flex items-center gap-3">
          <Button
            onClick={handleActivateAll}
            disabled={isActivatingAll || activatedIds.length === OPPORTUNITIES_DATA.length}
            className="h-11 px-6 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-400 text-black font-bold text-xs sm:text-sm shadow-lg shadow-emerald-500/20 hover:scale-[1.02] transition-all flex items-center gap-2"
          >
            <Zap className="w-4 h-4 fill-current" />
            {isActivatingAll
              ? "Deploying Autonomous Workflows..."
              : activatedIds.length === OPPORTUNITIES_DATA.length
              ? "All Opportunities Active"
              : "Activate All Opportunities (₹12.8L)"}
          </Button>
        </div>
      </div>

      {/* 4 Core Executive Metric Pillars */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="p-4 sm:p-5 rounded-2xl bg-white/[0.02] border border-white/10 relative overflow-hidden">
          <div className="text-[11px] text-gray-400 uppercase font-semibold flex items-center justify-between">
            <span>Revenue Influenced</span>
            <TrendingUp className="w-4 h-4 text-emerald-400" />
          </div>
          <div className="text-2xl sm:text-3xl font-extrabold text-white mt-1">₹18.70 Lakhs</div>
          <div className="text-[11px] text-emerald-400 mt-1 flex items-center gap-1 font-medium">
            <span>+28.4%</span> vs. last month
          </div>
          <div className="absolute -bottom-6 -right-6 w-20 h-20 bg-emerald-500/5 rounded-full blur-xl" />
        </div>

        <div className="p-4 sm:p-5 rounded-2xl bg-white/[0.02] border border-white/10 relative overflow-hidden">
          <div className="text-[11px] text-gray-400 uppercase font-semibold flex items-center justify-between">
            <span>Recovered Carts</span>
            <ShoppingBag className="w-4 h-4 text-teal-400" />
          </div>
          <div className="text-2xl sm:text-3xl font-extrabold text-white mt-1">₹1.24 Lakhs</div>
          <div className="text-[11px] text-teal-400 mt-1 flex items-center gap-1 font-medium">
            <span>24.8%</span> recovery conversion
          </div>
          <div className="absolute -bottom-6 -right-6 w-20 h-20 bg-teal-500/5 rounded-full blur-xl" />
        </div>

        <div className="p-4 sm:p-5 rounded-2xl bg-white/[0.02] border border-white/10 relative overflow-hidden">
          <div className="text-[11px] text-gray-400 uppercase font-semibold flex items-center justify-between">
            <span>Repeat Purchase Rate</span>
            <RotateCcw className="w-4 h-4 text-cyan-400" />
          </div>
          <div className="text-2xl sm:text-3xl font-extrabold text-white mt-1">18.4%</div>
          <div className="text-[11px] text-cyan-400 mt-1 flex items-center gap-1 font-medium">
            <span>+4.2%</span> replenishment lift
          </div>
          <div className="absolute -bottom-6 -right-6 w-20 h-20 bg-cyan-500/5 rounded-full blur-xl" />
        </div>

        <div className="p-4 sm:p-5 rounded-2xl bg-white/[0.02] border border-white/10 relative overflow-hidden">
          <div className="text-[11px] text-gray-400 uppercase font-semibold flex items-center justify-between">
            <span>RTO Rate</span>
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
          </div>
          <div className="text-2xl sm:text-3xl font-extrabold text-emerald-300 mt-1">7.8%</div>
          <div className="text-[11px] text-emerald-400/80 mt-1 flex items-center gap-1 font-medium">
            Down from <span className="line-through text-gray-400">18.2%</span> industry avg
          </div>
          <div className="absolute -bottom-6 -right-6 w-20 h-20 bg-emerald-500/5 rounded-full blur-xl" />
        </div>
      </div>

      {/* Tabs Switcher for Command Sub-Views */}
      <div className="flex items-center gap-2 border-b border-white/10 pb-4 overflow-x-auto">
        <button
          onClick={() => setActiveTab("opportunities")}
          className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all flex items-center gap-2 whitespace-nowrap ${
            activeTab === "opportunities"
              ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/30"
              : "text-gray-400 hover:text-white hover:bg-white/[0.02]"
          }`}
        >
          <Sparkles className="w-4 h-4" />
          AI Revenue Opportunities ({totalPool})
        </button>

        <button
          onClick={() => setActiveTab("health")}
          className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all flex items-center gap-2 whitespace-nowrap ${
            activeTab === "health"
              ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/30"
              : "text-gray-400 hover:text-white hover:bg-white/[0.02]"
          }`}
        >
          <Users className="w-4 h-4" />
          Customer Health Breakdown (48,291)
        </button>

        <button
          onClick={() => setActiveTab("actions")}
          className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all flex items-center gap-2 whitespace-nowrap ${
            activeTab === "actions"
              ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/30"
              : "text-gray-400 hover:text-white hover:bg-white/[0.02]"
          }`}
        >
          <Activity className="w-4 h-4" />
          Today's Actions & AI Activity
        </button>
      </div>

      {/* TAB CONTENT 1: AI REVENUE OPPORTUNITIES (₹12.8L POOL) */}
      {activeTab === "opportunities" && (
        <div className="space-y-4">
          <div className="flex items-center justify-between text-xs text-gray-400 pb-1">
            <span>6 Unlocked Revenue Opportunities detected by Conversio AI</span>
            <span className="text-emerald-400 font-mono font-semibold">
              {activatedIds.length} of {OPPORTUNITIES_DATA.length} Activated
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {OPPORTUNITIES_DATA.map((opp) => {
              const isDone = activatedIds.includes(opp.id);
              return (
                <div
                  key={opp.id}
                  className={`p-5 rounded-2xl border transition-all flex flex-col justify-between ${
                    isDone
                      ? "bg-emerald-950/20 border-emerald-500/40"
                      : "bg-white/[0.02] border-white/10 hover:border-emerald-500/30"
                  }`}
                >
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] uppercase font-bold tracking-wider text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded">
                        {opp.category}
                      </span>
                      <span className="text-[11px] text-gray-400 font-mono">
                        {opp.confidence}% Confidence
                      </span>
                    </div>

                    <div>
                      <h4 className="text-sm font-bold text-white leading-tight">{opp.title}</h4>
                      <p className="text-xs text-gray-400 mt-1 leading-relaxed">{opp.description}</p>
                    </div>

                    <div className="flex items-center justify-between pt-2 border-t border-white/5 text-xs">
                      <span className="text-gray-400">Target Audience:</span>
                      <span className="text-white font-mono font-medium">{opp.eligibleCount} shoppers</span>
                    </div>

                    <div className="flex items-center justify-between text-xs">
                      <span className="text-gray-400">Est. Revenue:</span>
                      <span className="text-emerald-300 font-mono font-bold text-sm">
                        {opp.potentialRevenue}
                      </span>
                    </div>
                  </div>

                  <div className="pt-4 mt-4 border-t border-white/5 flex items-center justify-between">
                    <span className="text-[11px] text-teal-400/80 font-mono">
                      Via {opp.recommendedChannel}
                    </span>

                    <Button
                      size="sm"
                      onClick={() => handleActivate(opp.id)}
                      disabled={isDone}
                      className={`h-8 px-3 rounded-lg text-xs font-semibold ${
                        isDone
                          ? "bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 cursor-default"
                          : "bg-emerald-500 hover:bg-emerald-400 text-black font-bold"
                      }`}
                    >
                      {isDone ? (
                        <>
                          <CheckCircle2 className="w-3.5 h-3.5 mr-1" /> Active
                        </>
                      ) : (
                        "Activate"
                      )}
                    </Button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* TAB CONTENT 2: CUSTOMER HEALTH BREAKDOWN */}
      {activeTab === "health" && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="p-5 rounded-2xl bg-white/[0.02] border border-white/10 space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs text-gray-400 uppercase font-semibold">Healthy</span>
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              </div>
              <div className="text-2xl font-bold text-white font-mono">28,421</div>
              <div className="text-[11px] text-emerald-400">58.8% of total base</div>
              <p className="text-[11px] text-gray-400 leading-tight">Regular reorders, high engagement, zero RTO record.</p>
            </div>

            <div className="p-5 rounded-2xl bg-white/[0.02] border border-white/10 space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs text-gray-400 uppercase font-semibold">At Risk</span>
                <Clock className="w-4 h-4 text-amber-400" />
              </div>
              <div className="text-2xl font-bold text-white font-mono">8,421</div>
              <div className="text-[11px] text-amber-400">17.4% of total base</div>
              <p className="text-[11px] text-gray-400 leading-tight">Passed expected reorder window by 15–30 days.</p>
            </div>

            <div className="p-5 rounded-2xl bg-white/[0.02] border border-white/10 space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs text-gray-400 uppercase font-semibold">Churn Risk</span>
                <AlertTriangle className="w-4 h-4 text-rose-400" />
              </div>
              <div className="text-2xl font-bold text-white font-mono">3,281</div>
              <div className="text-[11px] text-rose-400">6.8% of total base</div>
              <p className="text-[11px] text-gray-400 leading-tight">No activity for 60+ days, previous high LTV spenders.</p>
            </div>

            <div className="p-5 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs text-emerald-400 uppercase font-semibold">VIP Segment</span>
                <Crown className="w-4 h-4 text-amber-300" />
              </div>
              <div className="text-2xl font-bold text-emerald-300 font-mono">1,240</div>
              <div className="text-[11px] text-emerald-400">₹14,200 avg LTV</div>
              <p className="text-[11px] text-gray-300 leading-tight">Top 1% revenue contributors. Early access privilege.</p>
            </div>
          </div>

          {/* Health Visual Distribution Bar */}
          <div className="p-5 rounded-2xl bg-white/[0.02] border border-white/10 space-y-3">
            <div className="flex items-center justify-between text-xs">
              <span className="font-semibold text-white">48,291 Total Registered Customers</span>
              <span className="text-gray-400">Real-time Shopify + WhatsApp Customer Graph</span>
            </div>
            <div className="w-full h-3 rounded-full bg-white/10 flex overflow-hidden">
              <div style={{ width: "58.8%" }} className="bg-emerald-500" title="Healthy (58.8%)" />
              <div style={{ width: "17.4%" }} className="bg-amber-400" title="At Risk (17.4%)" />
              <div style={{ width: "6.8%" }} className="bg-rose-500" title="Churn Risk (6.8%)" />
              <div style={{ width: "17.0%" }} className="bg-teal-400" title="VIP & New (17.0%)" />
            </div>
            <div className="flex flex-wrap gap-4 text-[11px] text-gray-400 pt-1">
              <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full bg-emerald-500" /> Healthy (28,421)</span>
              <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full bg-amber-400" /> At Risk (8,421)</span>
              <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full bg-rose-500" /> Churn Risk (3,281)</span>
              <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full bg-teal-400" /> VIP Spenders (1,240)</span>
            </div>
          </div>
        </div>
      )}

      {/* TAB CONTENT 3: TODAY'S ACTIONS & AI ACTIVITY */}
      {activeTab === "actions" && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Left: Today's Action Queue */}
            <div className="p-5 rounded-2xl bg-white/[0.02] border border-white/10 space-y-4">
              <div className="flex items-center justify-between pb-2 border-b border-white/10">
                <span className="text-sm font-bold text-white flex items-center gap-2">
                  <Activity className="w-4 h-4 text-emerald-400" /> Today's Priority Queue
                </span>
                <span className="text-xs text-emerald-400 font-mono">1,218 Tasks Pending</span>
              </div>

              <div className="space-y-3">
                <div className="p-3.5 rounded-xl bg-white/[0.02] border border-white/10 flex items-center justify-between">
                  <div className="space-y-1">
                    <div className="text-xs font-bold text-white flex items-center gap-2">
                      <ShieldCheck className="w-3.5 h-3.5 text-cyan-400" /> 92 High-Risk COD Orders
                    </div>
                    <p className="text-[11px] text-gray-400">Ready for automated AI voice verification call before 2 PM dispatch.</p>
                  </div>
                  <Button size="sm" className="h-7 px-3 bg-cyan-500 hover:bg-cyan-400 text-black text-[10px] font-bold rounded-lg">
                    Execute Voice
                  </Button>
                </div>

                <div className="p-3.5 rounded-xl bg-white/[0.02] border border-white/10 flex items-center justify-between">
                  <div className="space-y-1">
                    <div className="text-xs font-bold text-white flex items-center gap-2">
                      <RotateCcw className="w-3.5 h-3.5 text-teal-400" /> 842 Reorder Nudges Ready
                    </div>
                    <p className="text-[11px] text-gray-400">Targeting Face Wash & Serum buyers at estimated 30-day runout.</p>
                  </div>
                  <Button size="sm" className="h-7 px-3 bg-teal-500 hover:bg-teal-400 text-black text-[10px] font-bold rounded-lg">
                    Send Nudges
                  </Button>
                </div>

                <div className="p-3.5 rounded-xl bg-white/[0.02] border border-white/10 flex items-center justify-between">
                  <div className="space-y-1">
                    <div className="text-xs font-bold text-white flex items-center gap-2">
                      <Crown className="w-3.5 h-3.5 text-amber-400" /> 284 VIP Early Access Perks
                    </div>
                    <p className="text-[11px] text-gray-400">Secret pre-launch link for the Summer Glow drop via WhatsApp.</p>
                  </div>
                  <Button size="sm" className="h-7 px-3 bg-amber-400 hover:bg-amber-300 text-black text-[10px] font-bold rounded-lg">
                    Dispatch VIP
                  </Button>
                </div>
              </div>
            </div>

            {/* Right: AI Activity Stream */}
            <div className="p-5 rounded-2xl bg-white/[0.02] border border-white/10 space-y-4">
              <div className="flex items-center justify-between pb-2 border-b border-white/10">
                <span className="text-sm font-bold text-white flex items-center gap-2">
                  <Bot className="w-4 h-4 text-emerald-400" /> AI Activity Stream (Last 24 Hours)
                </span>
                <span className="text-xs text-gray-400 font-mono">2,842 Conversations</span>
              </div>

              <div className="grid grid-cols-3 gap-2 text-center pb-2">
                <div className="p-2.5 rounded-xl bg-white/[0.02] border border-white/10">
                  <div className="text-base font-bold text-emerald-400 font-mono">1,248</div>
                  <div className="text-[10px] text-gray-400">Resolved by AI</div>
                </div>
                <div className="p-2.5 rounded-xl bg-white/[0.02] border border-white/10">
                  <div className="text-base font-bold text-teal-400 font-mono">428</div>
                  <div className="text-[10px] text-gray-400">Human Handoffs</div>
                </div>
                <div className="p-2.5 rounded-xl bg-white/[0.02] border border-white/10">
                  <div className="text-base font-bold text-white font-mono">₹4.2L</div>
                  <div className="text-[10px] text-gray-400">Unlocked Revenue</div>
                </div>
              </div>

              <div className="space-y-2 text-xs">
                <div className="flex items-center justify-between text-gray-300 bg-white/[0.01] p-2 rounded-lg">
                  <span className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                    Hindi Sales Bot recommended Shade 03
                  </span>
                  <span className="text-[10px] text-emerald-400 font-mono">+₹1,499 Cart</span>
                </div>
                <div className="flex items-center justify-between text-gray-300 bg-white/[0.01] p-2 rounded-lg">
                  <span className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-teal-400" />
                    AI Voice confirmed COD in Ahmedabad (Gujarati)
                  </span>
                  <span className="text-[10px] text-teal-400 font-mono">Verified (COD)</span>
                </div>
                <div className="flex items-center justify-between text-gray-300 bg-white/[0.01] p-2 rounded-lg">
                  <span className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
                    Prepaid link sent with ₹50 incentive
                  </span>
                  <span className="text-[10px] text-cyan-400 font-mono">Converted to UPI</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
