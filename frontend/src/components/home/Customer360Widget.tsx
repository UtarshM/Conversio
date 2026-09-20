import React, { useState } from "react";
import {
  User,
  ShoppingBag,
  MessageSquare,
  PhoneCall,
  Activity,
  Sparkles,
  Calendar,
  CreditCard,
  ShieldCheck,
  TrendingUp,
  Tag,
  Clock,
  CheckCircle2,
  ExternalLink,
  Flame,
} from "lucide-react";

type TabKey =
  | "overview"
  | "orders"
  | "products"
  | "conversations"
  | "campaigns"
  | "calls"
  | "activities"
  | "ai_insights";

interface TimelineEvent {
  date: string;
  badge: string;
  badgeColor: string;
  title: string;
  detail: string;
  value?: string;
  channelIcon?: string;
}

const TIMELINE_EVENTS: TimelineEvent[] = [
  {
    date: "12 Sept, 04:32 PM",
    badge: "ORDER PLACED",
    badgeColor: "bg-emerald-500/20 text-emerald-400 border-emerald-500/30",
    title: "Placed Order #SC-1829 via 1-Click WhatsApp Link",
    detail: "Items: Glow Radiance Serum (30ml), Vitamin C Face Wash (100ml)",
    value: "₹2,499 (Prepaid via UPI)",
  },
  {
    date: "10 Sept, 11:15 AM",
    badge: "WHATSAPP CLICKED",
    badgeColor: "bg-teal-500/20 text-teal-400 border-teal-500/30",
    title: "Clicked WhatsApp Reorder Cadence",
    detail: "Opened template: 'Festive Skincare Restock Nudge' with personalized 10% coupon.",
  },
  {
    date: "08 Sept, 09:40 PM",
    badge: "STORE VISIT",
    badgeColor: "bg-blue-500/20 text-blue-400 border-blue-500/30",
    title: "Viewed Product 'Hydrating Peptide Cream'",
    detail: "Browsed skincare collection for 4m 12s on mobile Safari.",
  },
  {
    date: "04 Sept, 06:10 PM",
    badge: "EMAIL OPENED",
    badgeColor: "bg-purple-500/20 text-purple-400 border-purple-500/30",
    title: "Opened VIP Autumn Routine Newsletter",
    detail: "Subject: 'Rahul, your personalized 3-step ritual for radiant skin'",
  },
  {
    date: "28 Aug, 08:22 PM",
    badge: "CART ABANDONED",
    badgeColor: "bg-amber-500/20 text-amber-400 border-amber-500/30",
    title: "Abandoned Cart (₹3,200) — Recovered in 18 mins",
    detail: "Conversio WhatsApp recovery workflow triggered & completed with 1-click Razorpay payment.",
    value: "₹3,200 Recovered",
  },
  {
    date: "27 Aug, 03:04 PM",
    badge: "AI CHAT",
    badgeColor: "bg-emerald-500/20 text-emerald-400 border-emerald-500/30",
    title: "Autonomous WhatsApp Conversation",
    detail: "Customer asked ingredient sensitivity questions in Hindi. Conversio AI resolved and recommended SPF.",
  },
  {
    date: "20 Aug, 01:15 PM",
    badge: "DELIVERED",
    badgeColor: "bg-cyan-500/20 text-cyan-400 border-cyan-500/30",
    title: "Order #SC-1644 Delivered by Shiprocket",
    detail: "Customer confirmed satisfaction with 5-star rating via interactive WhatsApp feedback block.",
  },
];

export const Customer360Widget: React.FC = () => {
  const [activeTab, setActiveTab] = useState<TabKey>("overview");

  const tabs: { key: TabKey; label: string; count?: string }[] = [
    { key: "overview", label: "Overview" },
    { key: "orders", label: "Orders", count: "5" },
    { key: "products", label: "Products", count: "8" },
    { key: "conversations", label: "Conversations", count: "12" },
    { key: "campaigns", label: "Campaigns", count: "4" },
    { key: "calls", label: "Calls", count: "2" },
    { key: "activities", label: "Timeline", count: "7" },
    { key: "ai_insights", label: "AI Insights", count: "3" },
  ];

  return (
    <div className="rounded-3xl border border-white/10 bg-[#091014]/90 p-6 lg:p-10 shadow-2xl backdrop-blur-2xl">
      {/* Header / Intro */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-8 border-b border-white/10">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-semibold uppercase tracking-wider mb-2">
            <User className="w-3.5 h-3.5" /> Module 2 — Heart of Conversio
          </div>
          <h3 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
            Customer 360 & Unified Commerce Timeline
          </h3>
          <p className="text-sm text-gray-400 mt-1">
            Every customer gets a single unified profile: Shopify orders, behavioral intent, WhatsApp discussions, and predictive churn metrics.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-xs font-bold text-emerald-300">
            <Sparkles className="w-3.5 h-3.5 text-emerald-400" /> Auto-Synced with Shopify
          </span>
        </div>
      </div>

      {/* Customer Hero Profile Card */}
      <div className="mt-8 rounded-2xl border border-emerald-500/20 bg-gradient-to-r from-emerald-950/20 via-black/40 to-teal-950/10 p-6">
        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
          {/* Identity & Contact */}
          <div className="flex items-center gap-4">
            <div className="relative">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-emerald-500 to-teal-400 flex items-center justify-center text-black font-black text-xl shadow-lg shadow-emerald-500/20">
                RS
              </div>
              <div className="absolute -bottom-1 -right-1 w-5 h-5 rounded-full bg-emerald-500 border-2 border-[#091014] flex items-center justify-center">
                <CheckCircle2 className="w-3 h-3 text-black" />
              </div>
            </div>

            <div>
              <div className="flex items-center gap-3">
                <h4 className="text-xl font-bold text-white">Rahul Sharma</h4>
                <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-amber-500/20 text-amber-300 border border-amber-500/30 flex items-center gap-1">
                  <Flame className="w-3 h-3" /> VIP Gold
                </span>
              </div>
              <div className="text-xs text-gray-400 flex flex-wrap items-center gap-3 mt-1">
                <span>+91 98201 54890</span>
                <span>•</span>
                <span>rahul.sharma@example.com</span>
                <span>•</span>
                <span>Bandra West, Mumbai</span>
              </div>
            </div>
          </div>

          {/* Quick Metrics Badges */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 w-full lg:w-auto">
            <div className="bg-black/50 border border-white/10 rounded-xl p-3 text-center">
              <span className="text-[10px] uppercase text-gray-400 font-semibold block">Customer Score</span>
              <span className="text-lg font-extrabold text-emerald-400">82/100</span>
            </div>
            <div className="bg-black/50 border border-white/10 rounded-xl p-3 text-center">
              <span className="text-[10px] uppercase text-gray-400 font-semibold block">Total LTV</span>
              <span className="text-lg font-extrabold text-white">₹14,820</span>
            </div>
            <div className="bg-black/50 border border-white/10 rounded-xl p-3 text-center">
              <span className="text-[10px] uppercase text-gray-400 font-semibold block">Average AOV</span>
              <span className="text-lg font-extrabold text-white">₹2,964</span>
            </div>
            <div className="bg-black/50 border border-white/10 rounded-xl p-3 text-center">
              <span className="text-[10px] uppercase text-gray-400 font-semibold block">Orders</span>
              <span className="text-lg font-extrabold text-teal-400">5 Orders</span>
            </div>
          </div>
        </div>

        {/* Predictive AI Intelligence Strip */}
        <div className="mt-6 pt-5 border-t border-white/10 grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="flex items-center gap-3 bg-white/[0.03] p-3 rounded-xl border border-white/5">
            <Calendar className="w-4 h-4 text-emerald-400 shrink-0" />
            <div>
              <span className="text-[11px] text-gray-400 block font-medium">Next Purchase Prediction</span>
              <span className="text-xs font-bold text-emerald-300">8 – 14 Days (High Probability)</span>
            </div>
          </div>

          <div className="flex items-center gap-3 bg-white/[0.03] p-3 rounded-xl border border-white/5">
            <ShieldCheck className="w-4 h-4 text-teal-400 shrink-0" />
            <div>
              <span className="text-[11px] text-gray-400 block font-medium">COD Risk Profile</span>
              <span className="text-xs font-bold text-teal-300">Low Risk (100% Delivery History)</span>
            </div>
          </div>

          <div className="flex items-center gap-3 bg-white/[0.03] p-3 rounded-xl border border-white/5">
            <TrendingUp className="w-4 h-4 text-cyan-400 shrink-0" />
            <div>
              <span className="text-[11px] text-gray-400 block font-medium">Churn Probability</span>
              <span className="text-xs font-bold text-cyan-300">12% (Highly Engaged)</span>
            </div>
          </div>
        </div>
      </div>

      {/* Tabs Navigation */}
      <div className="mt-8 flex items-center gap-2 overflow-x-auto pb-2 border-b border-white/10 scrollbar-none">
        {tabs.map((tab) => {
          const isActive = activeTab === tab.key;
          return (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key)}
              className={`px-4 py-2.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all flex items-center gap-1.5 ${
                isActive
                  ? "bg-emerald-500 text-black shadow-lg shadow-emerald-500/20"
                  : "bg-white/[0.03] text-gray-400 hover:text-white hover:bg-white/[0.07]"
              }`}
            >
              {tab.label}
              {tab.count && (
                <span
                  className={`text-[10px] px-1.5 py-0.2 rounded-full font-mono ${
                    isActive ? "bg-black/30 text-black font-bold" : "bg-white/10 text-gray-300"
                  }`}
                >
                  {tab.count}
                </span>
              )}
            </button>
          );
        })}
      </div>

      {/* Tab Content Display */}
      <div className="mt-6">
        {/* Unified Timeline / Activities */}
        {(activeTab === "overview" || activeTab === "activities") && (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h5 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2">
                <Clock className="w-4 h-4 text-emerald-400" /> Unified Customer + Commerce Event Stream
              </h5>
              <span className="text-xs text-gray-400">All touchpoints chronologically unified</span>
            </div>

            <div className="relative pl-6 before:absolute before:left-2.5 before:top-3 before:bottom-3 before:w-0.5 before:bg-white/10 space-y-4">
              {TIMELINE_EVENTS.map((event, idx) => (
                <div
                  key={idx}
                  className="relative group p-4 rounded-xl border border-white/5 bg-white/[0.02] hover:bg-white/[0.05] hover:border-emerald-500/30 transition-all"
                >
                  {/* Timeline bullet */}
                  <div className="absolute -left-[27px] top-5 w-3 h-3 rounded-full bg-emerald-400 ring-4 ring-[#091014]" />

                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-1.5">
                    <div className="flex items-center gap-2">
                      <span className={`text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded border ${event.badgeColor}`}>
                        {event.badge}
                      </span>
                      <span className="text-xs font-semibold text-white">{event.title}</span>
                    </div>
                    <span className="text-[11px] text-gray-400 font-mono">{event.date}</span>
                  </div>

                  <p className="text-xs text-gray-400 leading-relaxed pl-1">{event.detail}</p>

                  {event.value && (
                    <div className="mt-2 text-xs font-semibold text-emerald-400 pl-1 flex items-center gap-1.5">
                      <Sparkles className="w-3 h-3" /> Attributed Value: {event.value}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Orders Tab */}
        {activeTab === "orders" && (
          <div className="space-y-3">
            <div className="rounded-xl border border-white/10 overflow-hidden">
              <table className="w-full text-left text-xs text-gray-300">
                <thead className="bg-black/50 text-[11px] text-gray-400 uppercase tracking-wider border-b border-white/10">
                  <tr>
                    <th className="p-3">Order ID</th>
                    <th className="p-3">Date</th>
                    <th className="p-3">Items</th>
                    <th className="p-3">Amount</th>
                    <th className="p-3">Payment</th>
                    <th className="p-3">Status</th>
                    <th className="p-3">RTO Risk</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5">
                  <tr className="hover:bg-white/[0.02]">
                    <td className="p-3 font-mono text-emerald-400 font-semibold">#SC-1829</td>
                    <td className="p-3 text-gray-400">12 Sep 2026</td>
                    <td className="p-3">Glow Serum + Vitamin C Wash</td>
                    <td className="p-3 font-bold text-white">₹2,499</td>
                    <td className="p-3">UPI Prepaid</td>
                    <td className="p-3"><span className="px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 text-[10px] font-bold">Shipped</span></td>
                    <td className="p-3 text-emerald-400 font-semibold">Low (4%)</td>
                  </tr>
                  <tr className="hover:bg-white/[0.02]">
                    <td className="p-3 font-mono text-emerald-400 font-semibold">#SC-1644</td>
                    <td className="p-3 text-gray-400">20 Aug 2026</td>
                    <td className="p-3">Hydrating Night Gel</td>
                    <td className="p-3 font-bold text-white">₹3,200</td>
                    <td className="p-3">Card Prepaid</td>
                    <td className="p-3"><span className="px-2 py-0.5 rounded bg-cyan-500/20 text-cyan-300 text-[10px] font-bold">Delivered</span></td>
                    <td className="p-3 text-emerald-400 font-semibold">Low (2%)</td>
                  </tr>
                  <tr className="hover:bg-white/[0.02]">
                    <td className="p-3 font-mono text-emerald-400 font-semibold">#SC-1412</td>
                    <td className="p-3 text-gray-400">14 Jul 2026</td>
                    <td className="p-3">Daily Moisturizer (SPF 50)</td>
                    <td className="p-3 font-bold text-white">₹1,850</td>
                    <td className="p-3">COD (Verified via Voice)</td>
                    <td className="p-3"><span className="px-2 py-0.5 rounded bg-cyan-500/20 text-cyan-300 text-[10px] font-bold">Delivered</span></td>
                    <td className="p-3 text-emerald-400 font-semibold">Low (5%)</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* AI Insights Tab */}
        {activeTab === "ai_insights" && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-5 rounded-xl border border-emerald-500/30 bg-emerald-950/20 space-y-2">
              <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded">
                Reorder Trigger
              </span>
              <h6 className="text-sm font-bold text-white">Replenishment Ready in 9 Days</h6>
              <p className="text-xs text-gray-400 leading-relaxed">
                Rahul consumes ~1ml of Glow Radiance Serum daily. The bottle empties on September 21st. Recommended action: 1-click WhatsApp restock trigger on Sept 19.
              </p>
            </div>

            <div className="p-5 rounded-xl border border-teal-500/30 bg-teal-950/20 space-y-2">
              <span className="text-[10px] font-bold uppercase tracking-wider text-teal-400 bg-teal-500/10 px-2 py-0.5 rounded">
                Cross-Sell Affinity
              </span>
              <h6 className="text-sm font-bold text-white">High Likelihood for Ceramide Barrier Cream</h6>
              <p className="text-xs text-gray-400 leading-relaxed">
                Shoppers with Rahul’s skin profile who purchase Vitamin C + Serum demonstrate an 84% conversion rate when introduced to Ceramide Barrier Cream.
              </p>
            </div>

            <div className="p-5 rounded-xl border border-cyan-500/30 bg-cyan-950/20 space-y-2">
              <span className="text-[10px] font-bold uppercase tracking-wider text-cyan-400 bg-cyan-500/10 px-2 py-0.5 rounded">
                Preferred Channel
              </span>
              <h6 className="text-sm font-bold text-white">WhatsApp 1-Click Checkout</h6>
              <p className="text-xs text-gray-400 leading-relaxed">
                Rahul exhibits an 82% read rate within 6 minutes on WhatsApp with a 100% UPI completion rate. Zero friction email fallback needed.
              </p>
            </div>
          </div>
        )}

        {/* Other Tabs fallback summary */}
        {["products", "conversations", "campaigns", "calls"].includes(activeTab) && (
          <div className="p-8 rounded-xl border border-white/5 bg-black/30 text-center space-y-2">
            <CheckCircle2 className="w-8 h-8 text-emerald-400 mx-auto" />
            <h6 className="text-sm font-bold text-white capitalize">{activeTab} Synced Across Systems</h6>
            <p className="text-xs text-gray-400 max-w-md mx-auto">
              Conversio automatically reconciles Shopify catalog purchases, WhatsApp thread histories, and voice recordings under Rahul Sharma's master identifier.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};
