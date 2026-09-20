import { useState } from "react";
import {
  Wallet,
  TrendingUp,
  Users,
  CornerUpLeft,
  RotateCw,
  Calendar,
  Sparkles,
  Zap,
} from "lucide-react";
import { Button } from "@/components/ui/button";

type Timeframe =
  | "All"
  | "Today"
  | "Yesterday"
  | "This Week"
  | "Last Week"
  | "This Month"
  | "Last Month"
  | "This Year"
  | "Last Year"
  | "Custom";

const TIMEFRAMES: Timeframe[] = [
  "All",
  "Today",
  "Yesterday",
  "This Week",
  "Last Week",
  "This Month",
  "Last Month",
  "This Year",
  "Last Year",
  "Custom",
];

export function OutreachAnalyticsCard() {
  const [selectedTimeframe, setSelectedTimeframe] = useState<Timeframe>("All");
  const [activeChannel, setActiveChannel] = useState<"all" | "whatsapp" | "email" | "call" | "autoreply">("all");
  const [isRefreshing, setIsRefreshing] = useState(false);

  const handleRefresh = () => {
    setIsRefreshing(true);
    setTimeout(() => setIsRefreshing(false), 600);
  };

  return (
    <div className="space-y-6 text-left">
      {/* Title & Timeframe Filters Header */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-extrabold text-white tracking-tight flex items-center gap-2">
            <TrendingUp className="w-5 h-5 text-emerald-400" />
            Outreach at a Glance
          </h2>
          <p className="text-xs text-gray-400 mt-0.5">
            Real-time multi-channel delivery velocity, recipient response rates, and cost telemetry.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={handleRefresh}
            className="h-8 px-3 rounded-xl bg-white/[0.03] border-white/10 text-gray-300 hover:text-white hover:bg-white/[0.08] text-xs font-semibold flex items-center gap-1.5"
          >
            <RotateCw className={`w-3.5 h-3.5 ${isRefreshing ? "animate-spin text-emerald-400" : ""}`} />
            Refresh
          </Button>
        </div>
      </div>

      {/* Timeframe Pill Selectors (Benchmarked from RapidSales) */}
      <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none">
        {TIMEFRAMES.map((tf) => (
          <button
            key={tf}
            onClick={() => setSelectedTimeframe(tf)}
            className={`px-3 py-1.5 rounded-full text-xs font-semibold transition-all whitespace-nowrap flex items-center gap-1.5 ${
              selectedTimeframe === tf
                ? "bg-emerald-500 text-black font-bold shadow-md shadow-emerald-500/20"
                : "bg-white/[0.03] text-gray-400 hover:text-white hover:bg-white/[0.08] border border-white/5"
            }`}
          >
            {tf === "Custom" && <Calendar className="w-3 h-3" />}
            {tf}
          </button>
        ))}
      </div>

      {/* 4 Clean Metric Cards (Benchmarked from RapidSales) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Card 1: CREDITS */}
        <div className="p-5 rounded-2xl bg-[#070e12] border border-white/10 hover:border-emerald-500/30 transition-all space-y-1 relative overflow-hidden group">
          <div className="flex items-center justify-between text-xs text-gray-400">
            <span className="font-semibold uppercase tracking-wider text-[10px]">Credits</span>
            <div className="w-7 h-7 rounded-lg bg-purple-500/10 border border-purple-500/20 flex items-center justify-center text-purple-400">
              <span className="font-bold text-xs">₹</span>
            </div>
          </div>
          <div className="text-2xl font-bold text-white font-mono mt-1">₹82,559.76</div>
          <p className="text-[11px] text-gray-400">Wallet balance available</p>
          <div className="absolute -bottom-6 -right-6 w-16 h-16 bg-purple-500/5 rounded-full blur-xl group-hover:bg-purple-500/10 transition-colors" />
        </div>

        {/* Card 2: TOTAL COST */}
        <div className="p-5 rounded-2xl bg-[#070e12] border border-white/10 hover:border-emerald-500/30 transition-all space-y-1 relative overflow-hidden group">
          <div className="flex items-center justify-between text-xs text-gray-400">
            <span className="font-semibold uppercase tracking-wider text-[10px]">Total Cost</span>
            <div className="w-7 h-7 rounded-lg bg-rose-500/10 border border-rose-500/20 flex items-center justify-center text-rose-400">
              <TrendingUp className="w-3.5 h-3.5" />
            </div>
          </div>
          <div className="text-2xl font-bold text-white font-mono mt-1">₹5,416.73</div>
          <p className="text-[11px] text-emerald-400 font-medium">32.4x Attributed ROAS</p>
          <div className="absolute -bottom-6 -right-6 w-16 h-16 bg-rose-500/5 rounded-full blur-xl group-hover:bg-rose-500/10 transition-colors" />
        </div>

        {/* Card 3: TOTAL CONTACTS */}
        <div className="p-5 rounded-2xl bg-[#070e12] border border-white/10 hover:border-emerald-500/30 transition-all space-y-1 relative overflow-hidden group">
          <div className="flex items-center justify-between text-xs text-gray-400">
            <span className="font-semibold uppercase tracking-wider text-[10px]">Total Contacts</span>
            <div className="w-7 h-7 rounded-lg bg-teal-500/10 border border-teal-500/20 flex items-center justify-center text-teal-400">
              <Users className="w-3.5 h-3.5" />
            </div>
          </div>
          <div className="text-2xl font-bold text-white font-mono mt-1">48,291</div>
          <p className="text-[11px] text-teal-400">Live Shopify Customer Graph</p>
          <div className="absolute -bottom-6 -right-6 w-16 h-16 bg-teal-500/5 rounded-full blur-xl group-hover:bg-teal-500/10 transition-colors" />
        </div>

        {/* Card 4: REPLY RATE */}
        <div className="p-5 rounded-2xl bg-[#070e12] border border-white/10 hover:border-emerald-500/30 transition-all space-y-1 relative overflow-hidden group">
          <div className="flex items-center justify-between text-xs text-gray-400">
            <span className="font-semibold uppercase tracking-wider text-[10px]">Reply Rate</span>
            <div className="w-7 h-7 rounded-lg bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center text-cyan-400">
              <CornerUpLeft className="w-3.5 h-3.5" />
            </div>
          </div>
          <div className="text-2xl font-bold text-emerald-400 font-mono mt-1">18.4%</div>
          <p className="text-[11px] text-gray-400">1,248 of 6,782 responded</p>
          <div className="absolute -bottom-6 -right-6 w-16 h-16 bg-cyan-500/5 rounded-full blur-xl group-hover:bg-cyan-500/10 transition-colors" />
        </div>
      </div>

      {/* Daily Spend Multi-Channel Chart Card */}
      <div className="p-6 rounded-3xl bg-[#070e12] border border-white/10 shadow-xl space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-white/10">
          <div>
            <span className="text-xs text-gray-400 uppercase font-semibold tracking-wider">Daily Spend</span>
            <div className="text-2xl sm:text-3xl font-bold text-white font-mono mt-0.5">₹5,416.73</div>
            <p className="text-[11px] text-gray-400 mt-1">
              Auto-reply is part of WhatsApp cost — shown as a dashed overlay, not added to the total.
            </p>
          </div>

          {/* Channel Legend with Filter Toggles */}
          <div className="flex flex-wrap items-center gap-3 text-xs">
            <button
              onClick={() => setActiveChannel("all")}
              className={`flex items-center gap-1.5 px-2.5 py-1 rounded-lg transition-colors ${
                activeChannel === "all" ? "bg-white/10 text-white font-bold" : "text-gray-400 hover:text-white"
              }`}
            >
              All Channels
            </button>

            <button
              onClick={() => setActiveChannel("whatsapp")}
              className={`flex items-center gap-1.5 px-2.5 py-1 rounded-lg transition-colors ${
                activeChannel === "whatsapp" ? "bg-emerald-500/20 text-emerald-300 font-bold border border-emerald-500/30" : "text-gray-400 hover:text-white"
              }`}
            >
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-400" />
              WhatsApp (₹3,820)
            </button>

            <button
              onClick={() => setActiveChannel("email")}
              className={`flex items-center gap-1.5 px-2.5 py-1 rounded-lg transition-colors ${
                activeChannel === "email" ? "bg-blue-500/20 text-blue-300 font-bold border border-blue-500/30" : "text-gray-400 hover:text-white"
              }`}
            >
              <span className="w-2.5 h-2.5 rounded-full bg-blue-400" />
              Email (₹412)
            </button>

            <button
              onClick={() => setActiveChannel("call")}
              className={`flex items-center gap-1.5 px-2.5 py-1 rounded-lg transition-colors ${
                activeChannel === "call" ? "bg-rose-500/20 text-rose-300 font-bold border border-rose-500/30" : "text-gray-400 hover:text-white"
              }`}
            >
              <span className="w-2.5 h-2.5 rounded-full bg-rose-400" />
              Call (₹1,184)
            </button>

            <button
              onClick={() => setActiveChannel("autoreply")}
              className={`flex items-center gap-1.5 px-2.5 py-1 rounded-lg transition-colors ${
                activeChannel === "autoreply" ? "bg-amber-500/20 text-amber-300 font-bold border border-amber-500/30" : "text-gray-400 hover:text-white"
              }`}
            >
              <span className="w-2.5 h-2.5 rounded-full bg-amber-400 border border-dashed border-amber-300" />
              Auto-reply (₹218)
            </button>
          </div>
        </div>

        {/* SVG Bezier Area Curve Chart */}
        <div className="relative h-64 w-full">
          {/* Y Axis Grid Lines */}
          <div className="absolute inset-0 flex flex-col justify-between pointer-events-none text-[10px] font-mono text-gray-500">
            <div className="border-b border-white/5 pb-1 flex justify-between"><span>₹250</span></div>
            <div className="border-b border-white/5 pb-1 flex justify-between"><span>₹200</span></div>
            <div className="border-b border-white/5 pb-1 flex justify-between"><span>₹150</span></div>
            <div className="border-b border-white/5 pb-1 flex justify-between"><span>₹100</span></div>
            <div className="flex justify-between"><span>₹0</span></div>
          </div>

          {/* SVG Curves */}
          <svg className="absolute inset-0 w-full h-full overflow-visible" preserveAspectRatio="none" viewBox="0 0 800 240">
            <defs>
              <linearGradient id="emeraldGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#10b981" stopOpacity="0.25" />
                <stop offset="100%" stopColor="#10b981" stopOpacity="0.0" />
              </linearGradient>
              <linearGradient id="roseGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#f43f5e" stopOpacity="0.2" />
                <stop offset="100%" stopColor="#f43f5e" stopOpacity="0.0" />
              </linearGradient>
            </defs>

            {/* Area Fill for Primary Channel */}
            {(activeChannel === "all" || activeChannel === "whatsapp") && (
              <>
                <path
                  d="M 0,220 C 50,140 100,50 150,60 C 200,70 250,180 300,160 C 350,140 400,230 450,210 C 500,190 550,70 600,80 C 650,90 700,210 750,190 L 800,140 L 800,240 L 0,240 Z"
                  fill="url(#emeraldGrad)"
                />
                <path
                  d="M 0,220 C 50,140 100,50 150,60 C 200,70 250,180 300,160 C 350,140 400,230 450,210 C 500,190 550,70 600,80 C 650,90 700,210 750,190 L 800,140"
                  fill="none"
                  stroke="#10b981"
                  strokeWidth="2.5"
                />
              </>
            )}

            {/* AI Call Curve */}
            {(activeChannel === "all" || activeChannel === "call") && (
              <path
                d="M 0,235 C 50,200 100,180 150,140 C 200,100 250,220 300,210 C 350,200 400,120 450,150 C 500,180 550,130 600,120 C 650,110 700,180 750,160 L 800,150"
                fill="none"
                stroke="#f43f5e"
                strokeWidth="2"
              />
            )}

            {/* Email Curve */}
            {(activeChannel === "all" || activeChannel === "email") && (
              <path
                d="M 0,238 C 50,230 100,220 150,210 C 200,200 250,215 300,205 C 350,195 400,200 450,190 C 500,180 550,195 600,185 C 650,175 700,190 750,180 L 800,175"
                fill="none"
                stroke="#60a5fa"
                strokeWidth="2"
              />
            )}

            {/* Auto-reply dashed overlay */}
            {(activeChannel === "all" || activeChannel === "autoreply") && (
              <path
                d="M 0,230 C 50,160 100,90 150,100 C 200,110 250,200 300,180 C 350,160 400,235 450,220 C 500,205 550,100 600,110 C 650,120 700,220 750,205 L 800,160"
                fill="none"
                stroke="#fbbf24"
                strokeWidth="1.75"
                strokeDasharray="5,5"
              />
            )}
          </svg>
        </div>

        {/* X Axis Time Labels */}
        <div className="flex justify-between text-[10px] font-mono text-gray-500 pt-2 border-t border-white/5">
          <span>01 Sep</span>
          <span>05 Sep</span>
          <span>10 Sep</span>
          <span>15 Sep</span>
          <span>20 Sep (Today)</span>
        </div>
      </div>
    </div>
  );
}
