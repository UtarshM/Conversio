import { useState } from "react";
import {
  TrendingUp,
  Users,
  CornerUpLeft,
  RotateCw,
  Calendar,
  BarChart2,
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
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [hoveredPoint, setHoveredPoint] = useState<number | null>(null);

  const handleRefresh = () => {
    setIsRefreshing(true);
    setTimeout(() => setIsRefreshing(false), 500);
  };

  // Smooth spline curve points matching RapidSales screenshot
  const spendData = [
    { day: "Sep 01", cost: 12, autoReply: 4 },
    { day: "Sep 03", cost: 245, autoReply: 38 },
    { day: "Sep 05", cost: 45, autoReply: 12 },
    { day: "Sep 07", cost: 168, autoReply: 28 },
    { day: "Sep 09", cost: 30, autoReply: 8 },
    { day: "Sep 11", cost: 65, autoReply: 15 },
    { day: "Sep 13", cost: 140, autoReply: 25 },
    { day: "Sep 15", cost: 215, autoReply: 42 },
    { day: "Sep 17", cost: 110, autoReply: 20 },
    { day: "Sep 19", cost: 185, autoReply: 35 },
    { day: "Sep 21", cost: 20, autoReply: 5 },
  ];

  return (
    <div className="space-y-6 text-left">
      {/* Top Header: Dashboard Title & Refresh Button */}
      <div className="flex items-center justify-between">
        <div className="flex items-start gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-orange-50 border border-orange-200/80 flex items-center justify-center text-[#ea580c] mt-0.5 shadow-2xs">
            <BarChart2 className="w-5 h-5 stroke-[2.5]" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-gray-900 font-sans tracking-tight">Dashboard</h1>
            <p className="text-xs text-gray-500 font-medium">Your outreach at a glance</p>
          </div>
        </div>

        <Button
          variant="outline"
          size="sm"
          onClick={handleRefresh}
          className="h-8 px-3 rounded-lg bg-white border-gray-200 text-gray-700 hover:bg-gray-50 text-xs font-semibold shadow-2xs flex items-center gap-1.5"
        >
          <RotateCw className={`w-3.5 h-3.5 ${isRefreshing ? "animate-spin text-[#ea580c]" : "text-gray-500"}`} />
          Refresh
        </Button>
      </div>

      {/* Timeframe Pill Selectors (Exact RapidSales Screenshot Styling) */}
      <div className="flex items-center gap-1 overflow-x-auto pb-1 scrollbar-none">
        {TIMEFRAMES.map((tf) => (
          <button
            key={tf}
            onClick={() => setSelectedTimeframe(tf)}
            className={`px-3 py-1 rounded-full text-xs font-medium transition-all whitespace-nowrap flex items-center gap-1.5 ${
              selectedTimeframe === tf
                ? "bg-[#ea580c] text-white font-semibold shadow-xs"
                : "text-gray-600 hover:text-gray-900 hover:bg-gray-100"
            }`}
          >
            {tf === "Custom" && <Calendar className="w-3.5 h-3.5" />}
            {tf}
          </button>
        ))}
      </div>

      {/* 4 Clean White KPI Cards with Left Color Accent Stripes */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Card 1: CREDITS */}
        <div className="p-5 rounded-xl bg-white border border-gray-200/90 shadow-[0_1px_2px_rgba(0,0,0,0.04)] hover:shadow-md transition-shadow relative border-l-4 border-l-purple-500">
          <div className="flex items-center justify-between">
            <div className="w-8 h-8 rounded-lg bg-purple-50 border border-purple-100 flex items-center justify-center text-purple-600">
              <span className="font-bold text-sm">₹</span>
            </div>
          </div>
          <div className="mt-3">
            <span className="text-[11px] font-bold text-gray-500 uppercase tracking-wider block">Credits</span>
            <div className="text-2xl font-bold text-gray-900 font-sans tracking-tight mt-0.5">₹82,559.76</div>
            <p className="text-xs text-gray-400 mt-1 font-normal">Wallet balance</p>
          </div>
        </div>

        {/* Card 2: TOTAL COST */}
        <div className="p-5 rounded-xl bg-white border border-gray-200/90 shadow-[0_1px_2px_rgba(0,0,0,0.04)] hover:shadow-md transition-shadow relative border-l-4 border-l-rose-500">
          <div className="flex items-center justify-between">
            <div className="w-8 h-8 rounded-lg bg-rose-50 border border-rose-100 flex items-center justify-center text-rose-500">
              <TrendingUp className="w-4 h-4 stroke-[2.5]" />
            </div>
          </div>
          <div className="mt-3">
            <span className="text-[11px] font-bold text-gray-500 uppercase tracking-wider block">Total Cost</span>
            <div className="text-2xl font-bold text-gray-900 font-sans tracking-tight mt-0.5">₹5,416.73</div>
          </div>
        </div>

        {/* Card 3: TOTAL CONTACTS */}
        <div className="p-5 rounded-xl bg-white border border-gray-200/90 shadow-[0_1px_2px_rgba(0,0,0,0.04)] hover:shadow-md transition-shadow relative border-l-4 border-l-teal-500">
          <div className="flex items-center justify-between">
            <div className="w-8 h-8 rounded-lg bg-teal-50 border border-teal-100 flex items-center justify-center text-teal-600">
              <Users className="w-4 h-4 stroke-[2.5]" />
            </div>
          </div>
          <div className="mt-3">
            <span className="text-[11px] font-bold text-gray-500 uppercase tracking-wider block">Total Contacts</span>
            <div className="text-2xl font-bold text-gray-900 font-sans tracking-tight mt-0.5">283</div>
          </div>
        </div>

        {/* Card 4: REPLY RATE */}
        <div className="p-5 rounded-xl bg-white border border-gray-200/90 shadow-[0_1px_2px_rgba(0,0,0,0.04)] hover:shadow-md transition-shadow relative border-l-4 border-l-indigo-500">
          <div className="flex items-center justify-between">
            <div className="w-8 h-8 rounded-lg bg-indigo-50 border border-indigo-100 flex items-center justify-center text-indigo-600">
              <CornerUpLeft className="w-4 h-4 stroke-[2.5]" />
            </div>
          </div>
          <div className="mt-3">
            <span className="text-[11px] font-bold text-gray-500 uppercase tracking-wider block">Reply Rate</span>
            <div className="text-2xl font-bold text-gray-900 font-sans tracking-tight mt-0.5">0.9%</div>
            <p className="text-xs text-gray-400 mt-1 font-normal">191 of 21,208</p>
          </div>
        </div>
      </div>

      {/* Daily Spend Multi-Channel Spline Chart Card (Exact RapidSales Match) */}
      <div className="p-6 rounded-xl bg-white border border-gray-200/90 shadow-[0_1px_2px_rgba(0,0,0,0.04)] space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <BarChart2 className="w-4 h-4 text-gray-500" />
            <h3 className="text-base font-bold text-gray-900">Daily Spend</h3>
          </div>
          <div className="text-xl font-bold text-gray-900 font-sans">₹5,416.73</div>
        </div>

        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs border-b border-gray-100 pb-3">
          <p className="text-xs text-gray-400">
            Auto-reply is part of WhatsApp cost — shown as a dashed overlay, not added to the total.
          </p>

          {/* Legend Items (RapidSales screenshot matching) */}
          <div className="flex items-center gap-4 text-xs shrink-0">
            <span className="flex items-center gap-1.5 text-gray-600">
              <span className="w-2.5 h-2.5 rounded-full bg-[#10b981]" /> WhatsApp
            </span>
            <span className="flex items-center gap-1.5 text-gray-600">
              <span className="w-2.5 h-2.5 rounded-full bg-[#3b82f6]" /> Email
            </span>
            <span className="flex items-center gap-1.5 text-gray-600">
              <span className="w-2.5 h-2.5 rounded-full bg-[#ea580c]" /> Call
            </span>
            <span className="flex items-center gap-1.5 text-gray-600">
              <span className="w-3 border-t-2 border-dashed border-[#eab308]" /> Auto-reply
            </span>
          </div>
        </div>

        {/* Clean SVG Spline Area Chart with Y-Axis */}
        <div className="relative h-64 w-full pt-4">
          <svg className="w-full h-full overflow-visible" viewBox="0 0 1000 220" preserveAspectRatio="none">
            <defs>
              <linearGradient id="spendGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#ea580c" stopOpacity="0.22" />
                <stop offset="100%" stopColor="#ea580c" stopOpacity="0.00" />
              </linearGradient>
            </defs>

            {/* Horizontal Grid lines matching RapidSales */}
            <g className="text-[10px] fill-gray-400 font-mono">
              <line x1="40" y1="10" x2="1000" y2="10" stroke="#f1f5f9" strokeWidth="1" />
              <text x="5" y="14">₹250</text>

              <line x1="40" y1="50" x2="1000" y2="50" stroke="#f1f5f9" strokeWidth="1" />
              <text x="5" y="54">₹200</text>

              <line x1="40" y1="90" x2="1000" y2="90" stroke="#f1f5f9" strokeWidth="1" />
              <text x="5" y="94">₹150</text>

              <line x1="40" y1="130" x2="1000" y2="130" stroke="#f1f5f9" strokeWidth="1" />
              <text x="5" y="134">₹100</text>

              <line x1="40" y1="170" x2="1000" y2="170" stroke="#f1f5f9" strokeWidth="1" />
              <text x="5" y="174">₹50</text>

              <line x1="40" y1="210" x2="1000" y2="210" stroke="#e2e8f0" strokeWidth="1" />
              <text x="5" y="214">₹0</text>
            </g>

            {/* Main Spend Curve Area Fill */}
            <path
              d="M 50 210
                 C 90 200, 110 20, 150 20
                 C 180 20, 200 170, 230 170
                 C 250 170, 270 80, 300 80
                 C 330 80, 360 210, 400 210
                 C 450 210, 520 70, 600 70
                 C 660 70, 680 180, 710 180
                 C 740 180, 760 90, 800 90
                 C 830 90, 870 210, 920 210
                 C 960 210, 980 210, 1000 210
                 L 1000 210 L 50 210 Z"
              fill="url(#spendGradient)"
            />

            {/* Main Spend Curve Line (Orange/Amber in screenshot) */}
            <path
              d="M 50 210
                 C 90 200, 110 20, 150 20
                 C 180 20, 200 170, 230 170
                 C 250 170, 270 80, 300 80
                 C 330 80, 360 210, 400 210
                 C 450 210, 520 70, 600 70
                 C 660 70, 680 180, 710 180
                 C 740 180, 760 90, 800 90
                 C 830 90, 870 210, 920 210
                 C 960 210, 980 210, 1000 210"
              fill="none"
              stroke="#ea580c"
              strokeWidth="2"
            />

            {/* Auto-Reply Dashed Overlay Line (Yellow/Gold) */}
            <path
              d="M 50 210
                 C 90 208, 110 175, 150 175
                 C 180 175, 200 200, 230 200
                 C 250 200, 270 185, 300 185
                 C 330 185, 360 210, 400 210
                 C 450 210, 520 180, 600 180
                 C 660 180, 680 205, 710 205
                 C 740 205, 760 188, 800 188
                 C 830 188, 870 210, 920 210
                 L 1000 210"
              fill="none"
              stroke="#eab308"
              strokeWidth="2"
              strokeDasharray="4 4"
            />
          </svg>
        </div>
      </div>
    </div>
  );
}
