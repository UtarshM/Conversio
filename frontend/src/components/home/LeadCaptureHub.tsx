import { useState } from "react";
import {
  Database,
  FileSpreadsheet,
  Share2,
  CheckCircle2,
  ArrowRight,
  Sparkles,
  Layers,
  ShoppingBag,
  Zap,
  Users,
  ShieldCheck,
  RefreshCw
} from "lucide-react";
import { Button } from "@/components/ui/button";

interface IngestedLead {
  id: string;
  name: string;
  phone: string;
  source: "meta" | "sheets" | "csv" | "shopify";
  segment: string;
  timeAgo: string;
  status: "Triggering WhatsApp" | "AI Calling Now" | "Meeting Booked" | "Cart Recovered";
}

export function LeadCaptureHub({
  onOpenDemo
}: {
  onOpenDemo: (plan: string) => void;
}) {
  const [activeSource, setActiveSource] = useState<"all" | "meta" | "sheets" | "csv" | "shopify">("all");

  const sampleLeads: IngestedLead[] = [
    {
      id: "LD-9021",
      name: "Vikram Singhania",
      phone: "+91 98210 XXXXX",
      source: "meta",
      segment: "Luxury Real Estate 3BHK",
      timeAgo: "12s ago",
      status: "Triggering WhatsApp"
    },
    {
      id: "LD-9022",
      name: "Pooja Deshmukh",
      phone: "+91 98401 XXXXX",
      source: "shopify",
      segment: "Abandoned Cart (₹3,499)",
      timeAgo: "48s ago",
      status: "Cart Recovered"
    },
    {
      id: "LD-9023",
      name: "Amitabh Verma",
      phone: "+91 99870 XXXXX",
      source: "sheets",
      segment: "EdTech UPSC Batch 2026",
      timeAgo: "2m ago",
      status: "AI Calling Now"
    },
    {
      id: "LD-9024",
      name: "Siddharth Rao",
      phone: "+91 98190 XXXXX",
      source: "csv",
      segment: "B2B SaaS Founders Q3",
      timeAgo: "5m ago",
      status: "Meeting Booked"
    }
  ];

  const filteredLeads = activeSource === "all"
    ? sampleLeads
    : sampleLeads.filter((l) => l.source === activeSource);

  return (
    <div className="rounded-[32px] bg-slate-950/80 border border-white/10 p-6 sm:p-10 shadow-2xl backdrop-blur-2xl relative overflow-hidden">
      <div className="absolute top-0 left-1/3 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl pointer-events-none" />

      {/* Header */}
      <div className="text-center max-w-3xl mx-auto mb-12">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-500/10 border border-purple-500/30 text-purple-400 text-xs font-mono font-bold mb-3">
          <Database className="w-3.5 h-3.5" /> UNIVERSAL LEAD INGESTION &amp; SEGMENTATION
        </div>
        <h3 className="text-2xl sm:text-4xl font-display font-extrabold text-white tracking-tight">
          Capture Leads From Every Source Automatically
        </h3>
        <p className="text-xs sm:text-base text-slate-400 mt-2">
          Connect Meta Lead Ads, Google Sheets, CSV uploads, and Shopify webhooks. Every lead is organized in real time and triggers instant multi-channel cadences without manual CSV downloads.
        </p>
      </div>

      {/* 4 Ingestion Connectors */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
        <div
          onClick={() => setActiveSource("meta")}
          className={`p-5 rounded-2xl border transition-all cursor-pointer ${
            activeSource === "meta"
              ? "bg-slate-900 border-blue-500 shadow-[0_0_20px_rgba(59,130,246,0.3)] ring-1 ring-blue-500/50"
              : "bg-slate-900/50 border-white/10 hover:border-white/20"
          }`}
        >
          <div className="w-10 h-10 rounded-xl bg-blue-500/20 text-blue-400 flex items-center justify-center mb-3">
            <Share2 className="w-5 h-5" />
          </div>
          <h4 className="text-sm font-bold text-white">Meta Lead Ads</h4>
          <p className="text-[11px] text-slate-400 mt-1">
            Real-time webhook sync in &lt;1 second. No Zapier required.
          </p>
          <span className="inline-block mt-3 text-[10px] font-mono text-emerald-400 bg-emerald-950/60 border border-emerald-500/30 px-2 py-0.5 rounded">
            ● 0s Latency Hook
          </span>
        </div>

        <div
          onClick={() => setActiveSource("sheets")}
          className={`p-5 rounded-2xl border transition-all cursor-pointer ${
            activeSource === "sheets"
              ? "bg-slate-900 border-emerald-500 shadow-[0_0_20px_rgba(16,185,129,0.3)] ring-1 ring-emerald-500/50"
              : "bg-slate-900/50 border-white/10 hover:border-white/20"
          }`}
        >
          <div className="w-10 h-10 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center mb-3">
            <FileSpreadsheet className="w-5 h-5" />
          </div>
          <h4 className="text-sm font-bold text-white">Google Sheets</h4>
          <p className="text-[11px] text-slate-400 mt-1">
            Two-way bidirectional sync. New rows trigger outreach instantly.
          </p>
          <span className="inline-block mt-3 text-[10px] font-mono text-emerald-400 bg-emerald-950/60 border border-emerald-500/30 px-2 py-0.5 rounded">
            ● Auto Row Poller
          </span>
        </div>

        <div
          onClick={() => setActiveSource("csv")}
          className={`p-5 rounded-2xl border transition-all cursor-pointer ${
            activeSource === "csv"
              ? "bg-slate-900 border-purple-500 shadow-[0_0_20px_rgba(168,85,247,0.3)] ring-1 ring-purple-500/50"
              : "bg-slate-900/50 border-white/10 hover:border-white/20"
          }`}
        >
          <div className="w-10 h-10 rounded-xl bg-purple-500/20 text-purple-400 flex items-center justify-center mb-3">
            <Layers className="w-5 h-5" />
          </div>
          <h4 className="text-sm font-bold text-white">Bulk CSV Imports</h4>
          <p className="text-[11px] text-slate-400 mt-1">
            Upload lists of 10,000+ prospects with auto-deduplication &amp; format check.
          </p>
          <span className="inline-block mt-3 text-[10px] font-mono text-emerald-400 bg-emerald-950/60 border border-emerald-500/30 px-2 py-0.5 rounded">
            ● 10k+ Contact Scale
          </span>
        </div>

        <div
          onClick={() => setActiveSource("shopify")}
          className={`p-5 rounded-2xl border transition-all cursor-pointer ${
            activeSource === "shopify"
              ? "bg-slate-900 border-orange-500 shadow-[0_0_20px_rgba(249,115,22,0.3)] ring-1 ring-orange-500/50"
              : "bg-slate-900/50 border-white/10 hover:border-white/20"
          }`}
        >
          <div className="w-10 h-10 rounded-xl bg-orange-500/20 text-orange-400 flex items-center justify-center mb-3">
            <ShoppingBag className="w-5 h-5" />
          </div>
          <h4 className="text-sm font-bold text-white">Shopify &amp; Store Webhooks</h4>
          <p className="text-[11px] text-slate-400 mt-1">
            Captures checkouts, COD orders, and customer product views automatically.
          </p>
          <span className="inline-block mt-3 text-[10px] font-mono text-emerald-400 bg-emerald-950/60 border border-emerald-500/30 px-2 py-0.5 rounded">
            ● Native Store App
          </span>
        </div>
      </div>

      {/* Live Stream Simulation Table */}
      <div className="rounded-2xl bg-slate-900 border border-white/10 p-5 sm:p-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 pb-4 border-b border-white/10">
          <div className="flex items-center gap-2">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
            </span>
            <span className="text-xs font-mono font-bold text-white">
              REAL-TIME INGESTION STREAM (AUTO-SYNCING)
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => setActiveSource("all")}
              className={`px-3 py-1 rounded-lg text-xs font-mono transition-all cursor-pointer ${
                activeSource === "all" ? "bg-white/10 text-white font-bold" : "text-slate-400 hover:text-white"
              }`}
            >
              Show All
            </button>
          </div>
        </div>

        {/* Lead Rows */}
        <div className="divide-y divide-white/5 mt-3">
          {filteredLeads.map((lead) => (
            <div
              key={lead.id}
              className="py-3 sm:py-3.5 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs"
            >
              <div className="flex items-center gap-3">
                <span className="text-[11px] font-mono text-slate-500">{lead.id}</span>
                <span className="font-bold text-white text-sm">{lead.name}</span>
                <span className="text-slate-400 font-mono text-[11px]">{lead.phone}</span>
              </div>

              <div className="flex items-center gap-3 flex-wrap">
                <span className="px-2.5 py-0.5 rounded-full bg-white/5 border border-white/10 text-slate-300 text-[11px]">
                  {lead.segment}
                </span>

                <span
                  className={`px-2.5 py-0.5 rounded-full font-mono text-[10px] font-bold border ${
                    lead.status === "Meeting Booked"
                      ? "bg-purple-950/80 text-purple-300 border-purple-500/40"
                      : lead.status === "AI Calling Now"
                      ? "bg-amber-950/80 text-amber-300 border-amber-500/40 animate-pulse"
                      : lead.status === "Cart Recovered"
                      ? "bg-emerald-950/80 text-emerald-300 border-emerald-500/40"
                      : "bg-blue-950/80 text-blue-300 border-blue-500/40"
                  }`}
                >
                  ● {lead.status}
                </span>

                <span className="text-slate-500 font-mono text-[10px]">{lead.timeAgo}</span>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-6 pt-4 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2 text-xs font-mono text-slate-400">
            <CheckCircle2 className="w-4 h-4 text-emerald-400" />
            <span>Auto-Segmented by Conversio Rules Engine</span>
          </div>

          <Button
            onClick={() => onOpenDemo("Growth Tri-Channel")}
            className="w-full sm:w-auto bg-purple-600 hover:bg-purple-500 text-white font-bold text-xs h-10 px-6 rounded-xl cursor-pointer shadow-[0_0_15px_rgba(168,85,247,0.35)]"
          >
            Connect Your Lead Source
          </Button>
        </div>
      </div>
    </div>
  );
}
