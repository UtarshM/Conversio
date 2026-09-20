import { useState } from "react";
import { DashboardLayout } from "@/components/DashboardLayout";
import { CommandCenterWidget } from "@/components/home/CommandCenterWidget";
import { Customer360Widget } from "@/components/home/Customer360Widget";
import { SalesCrmPipelineWidget } from "@/components/home/SalesCrmPipelineWidget";
import { OmnichannelInboxWidget } from "@/components/home/OmnichannelInboxWidget";
import { RtoIntelligenceWidget } from "@/components/home/RtoIntelligenceWidget";
import { OutreachAnalyticsCard } from "@/components/dashboard/OutreachAnalyticsCard";
import {
  LayoutDashboard,
  Users,
  Trello,
  MessageSquare,
  ShieldCheck,
  ShoppingBag,
  Sparkles,
  Zap,
  CheckCircle2,
  TrendingUp,
  ArrowRight,
  ExternalLink,
} from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

export default function Dashboard() {
  const [activeView, setActiveView] = useState<"command" | "customer360" | "pipeline" | "inbox" | "rto">("command");

  return (
    <DashboardLayout>
      <div className="max-w-7xl mx-auto space-y-8 text-left">
        {/* Top Control Bar & Workspace Mode Switcher */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 p-4 rounded-2xl bg-[#070e12] border border-white/10 shadow-lg">
          <div className="flex items-center gap-2 overflow-x-auto pb-1 md:pb-0">
            <button
              onClick={() => setActiveView("command")}
              className={`px-3.5 py-2 rounded-xl text-xs font-semibold flex items-center gap-2 transition-all whitespace-nowrap ${
                activeView === "command"
                  ? "bg-emerald-500 text-black font-bold shadow-md shadow-emerald-500/20"
                  : "text-gray-400 hover:text-white hover:bg-white/[0.04]"
              }`}
            >
              <LayoutDashboard className="w-3.5 h-3.5" />
              Founder Command Center
            </button>

            <button
              onClick={() => setActiveView("customer360")}
              className={`px-3.5 py-2 rounded-xl text-xs font-semibold flex items-center gap-2 transition-all whitespace-nowrap ${
                activeView === "customer360"
                  ? "bg-emerald-500 text-black font-bold shadow-md shadow-emerald-500/20"
                  : "text-gray-400 hover:text-white hover:bg-white/[0.04]"
              }`}
            >
              <Users className="w-3.5 h-3.5" />
              Customer 360 &amp; Timeline
            </button>

            <button
              onClick={() => setActiveView("pipeline")}
              className={`px-3.5 py-2 rounded-xl text-xs font-semibold flex items-center gap-2 transition-all whitespace-nowrap ${
                activeView === "pipeline"
                  ? "bg-emerald-500 text-black font-bold shadow-md shadow-emerald-500/20"
                  : "text-gray-400 hover:text-white hover:bg-white/[0.04]"
              }`}
            >
              <Trello className="w-3.5 h-3.5" />
              Sales CRM Pipeline
            </button>

            <button
              onClick={() => setActiveView("inbox")}
              className={`px-3.5 py-2 rounded-xl text-xs font-semibold flex items-center gap-2 transition-all whitespace-nowrap ${
                activeView === "inbox"
                  ? "bg-emerald-500 text-black font-bold shadow-md shadow-emerald-500/20"
                  : "text-gray-400 hover:text-white hover:bg-white/[0.04]"
              }`}
            >
              <MessageSquare className="w-3.5 h-3.5" />
              Omnichannel Inbox
            </button>

            <button
              onClick={() => setActiveView("rto")}
              className={`px-3.5 py-2 rounded-xl text-xs font-semibold flex items-center gap-2 transition-all whitespace-nowrap ${
                activeView === "rto"
                  ? "bg-emerald-500 text-black font-bold shadow-md shadow-emerald-500/20"
                  : "text-gray-400 hover:text-white hover:bg-white/[0.04]"
              }`}
            >
              <ShieldCheck className="w-3.5 h-3.5" />
              RTO Shield
            </button>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <span className="text-[10px] text-emerald-400 bg-emerald-500/10 px-2.5 py-1 rounded-full border border-emerald-500/20 font-mono font-bold flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
              Shopify Webhooks Live
            </span>
          </div>
        </div>

        {/* Dynamic View Container */}
        {activeView === "command" && (
          <div className="space-y-8">
            <CommandCenterWidget />

            {/* RAPIDSALES BENCHMARKED MULTI-CHANNEL SPEND & OUTREACH ANALYTICS */}
            <OutreachAnalyticsCard />

            {/* Quick Link Cards to Modules */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <div
                onClick={() => setActiveView("customer360")}
                className="p-5 rounded-2xl bg-[#070e12] border border-white/10 hover:border-emerald-500/40 cursor-pointer transition-all space-y-2 group"
              >
                <div className="w-9 h-9 rounded-xl bg-emerald-500/10 text-emerald-400 flex items-center justify-center group-hover:scale-110 transition-transform">
                  <Users className="w-4 h-4" />
                </div>
                <h4 className="text-sm font-bold text-white group-hover:text-emerald-300 transition-colors">Customer 360</h4>
                <p className="text-xs text-gray-400">Inspect Rahul Sharma's 5 orders, health score 82/100, and replenishment cycle.</p>
                <div className="text-[11px] text-emerald-400 font-semibold flex items-center gap-1 pt-1">
                  Open Customer 360 <ArrowRight className="w-3 h-3" />
                </div>
              </div>

              <div
                onClick={() => setActiveView("pipeline")}
                className="p-5 rounded-2xl bg-[#070e12] border border-white/10 hover:border-teal-500/40 cursor-pointer transition-all space-y-2 group"
              >
                <div className="w-9 h-9 rounded-xl bg-teal-500/10 text-teal-400 flex items-center justify-center group-hover:scale-110 transition-transform">
                  <Trello className="w-4 h-4" />
                </div>
                <h4 className="text-sm font-bold text-white group-hover:text-teal-300 transition-colors">Sales CRM Deals</h4>
                <p className="text-xs text-gray-400">Track high-ticket wholesale and custom gifting inquiries across Kanban stages.</p>
                <div className="text-[11px] text-teal-400 font-semibold flex items-center gap-1 pt-1">
                  Open Deal Pipeline <ArrowRight className="w-3 h-3" />
                </div>
              </div>

              <div
                onClick={() => setActiveView("inbox")}
                className="p-5 rounded-2xl bg-[#070e12] border border-white/10 hover:border-cyan-500/40 cursor-pointer transition-all space-y-2 group"
              >
                <div className="w-9 h-9 rounded-xl bg-cyan-500/10 text-cyan-400 flex items-center justify-center group-hover:scale-110 transition-transform">
                  <MessageSquare className="w-4 h-4" />
                </div>
                <h4 className="text-sm font-bold text-white group-hover:text-cyan-300 transition-colors">Omnichannel Inbox</h4>
                <p className="text-xs text-gray-400">WhatsApp, Email &amp; Voice calls in one place with AI Autopilot and tool execution.</p>
                <div className="text-[11px] text-cyan-400 font-semibold flex items-center gap-1 pt-1">
                  Open Unified Inbox <ArrowRight className="w-3 h-3" />
                </div>
              </div>

              <div
                onClick={() => setActiveView("rto")}
                className="p-5 rounded-2xl bg-[#070e12] border border-white/10 hover:border-emerald-500/40 cursor-pointer transition-all space-y-2 group"
              >
                <div className="w-9 h-9 rounded-xl bg-emerald-500/10 text-emerald-400 flex items-center justify-center group-hover:scale-110 transition-transform">
                  <ShieldCheck className="w-4 h-4" />
                </div>
                <h4 className="text-sm font-bold text-white group-hover:text-emerald-300 transition-colors">RTO Intelligence</h4>
                <p className="text-xs text-gray-400">7-factor COD risk scoring, automated WhatsApp ping, and AI Voice verification.</p>
                <div className="text-[11px] text-emerald-400 font-semibold flex items-center gap-1 pt-1">
                  Open RTO Shield <ArrowRight className="w-3 h-3" />
                </div>
              </div>
            </div>
          </div>
        )}

        {activeView === "customer360" && <Customer360Widget />}

        {activeView === "pipeline" && <SalesCrmPipelineWidget />}

        {activeView === "inbox" && <OmnichannelInboxWidget />}

        {activeView === "rto" && <RtoIntelligenceWidget />}
      </div>
    </DashboardLayout>
  );
}
