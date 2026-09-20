import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  GitMerge,
  Smartphone,
  Mail,
  ShoppingBag,
  Globe,
  MapPin,
  CheckCircle2,
  Sparkles,
  Layers,
  ArrowRight,
  ShieldCheck,
  Fingerprint,
} from "lucide-react";

interface Touchpoint {
  id: string;
  type: string;
  icon: any;
  label: string;
  value: string;
  source: string;
  status: "matched" | "verified";
  color: string;
}

const TOUCHPOINTS: Touchpoint[] = [
  {
    id: "web",
    type: "Web Session",
    icon: Globe,
    label: "Guest Checkout Cookie",
    value: "_cv_8f9120 • Chrome Mac",
    source: "Shopify Storefront",
    status: "matched",
    color: "from-blue-500/20 to-cyan-500/20 text-cyan-400 border-cyan-500/30",
  },
  {
    id: "whatsapp",
    type: "WhatsApp",
    icon: Smartphone,
    label: "Meta Verified Phone",
    value: "+91 98201 44891",
    source: "WhatsApp Cloud API",
    status: "verified",
    color: "from-emerald-500/20 to-teal-500/20 text-emerald-400 border-emerald-500/30",
  },
  {
    id: "shopify",
    type: "Shopify ID",
    icon: ShoppingBag,
    label: "Customer Account",
    value: "Shopify #48192",
    source: "Shopify REST Webhook",
    status: "matched",
    color: "from-green-500/20 to-emerald-500/20 text-green-400 border-green-500/30",
  },
  {
    id: "email",
    type: "Email Identity",
    icon: Mail,
    label: "Primary Email",
    value: "rahul.sharma@gmail.com",
    source: "Razorpay Checkout",
    status: "verified",
    color: "from-purple-500/20 to-pink-500/20 text-purple-400 border-purple-500/30",
  },
  {
    id: "address",
    type: "Address Entity",
    icon: MapPin,
    label: "Delivery Address",
    value: "Flat 402, Powai, Mumbai 400076",
    source: "Shiprocket Fulfillment",
    status: "matched",
    color: "from-amber-500/20 to-orange-500/20 text-amber-400 border-amber-500/30",
  },
];

export function IdentityResolutionWidget() {
  const [selectedNode, setSelectedNode] = useState<string>("whatsapp");

  return (
    <div className="rounded-3xl border border-white/10 bg-[#070e12]/95 p-6 sm:p-10 shadow-2xl backdrop-blur-2xl space-y-8">
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-6 border-b border-white/10">
        <div className="space-y-1.5">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-semibold uppercase tracking-wider">
            <Fingerprint className="w-3.5 h-3.5" /> Module 1 & 2 • Identity Resolution Engine
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
            Deterministic & Probabilistic Identity Graph
          </h2>
          <p className="text-xs sm:text-sm text-gray-400">
            Never lose customer context. Conversio resolves fragmented anonymous web sessions, WhatsApp numbers, Shopify accounts, and delivery addresses into one master profile.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <div className="px-3.5 py-2 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-mono font-bold flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-400" />
            99.4% Graph Match Accuracy
          </div>
        </div>
      </div>

      {/* Visual Resolution Graph */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
        {/* Left Side: 5 Fragmented Touchpoints */}
        <div className="lg:col-span-5 space-y-3">
          <div className="text-xs text-gray-400 font-semibold uppercase tracking-wider mb-2 flex items-center justify-between">
            <span>Fragmented Customer Signals</span>
            <span className="text-[10px] text-gray-400">Click to inspect node</span>
          </div>

          {TOUCHPOINTS.map((tp) => {
            const Icon = tp.icon;
            const isSelected = selectedNode === tp.id;
            return (
              <div
                key={tp.id}
                onClick={() => setSelectedNode(tp.id)}
                className={`p-3.5 rounded-2xl border transition-all cursor-pointer flex items-center justify-between ${
                  isSelected
                    ? "bg-white/[0.08] border-emerald-500/50 shadow-lg shadow-emerald-500/10"
                    : "bg-white/[0.02] border-white/10 hover:border-white/20 hover:bg-white/[0.04]"
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className={`w-9 h-9 rounded-xl border bg-gradient-to-br flex items-center justify-center ${tp.color}`}>
                    <Icon className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-xs font-bold text-white flex items-center gap-2">
                      {tp.label}
                      <span className="text-[9px] px-1.5 py-0.2 rounded bg-white/10 text-gray-300 font-mono">
                        {tp.source}
                      </span>
                    </div>
                    <div className="text-[11px] font-mono text-gray-300 mt-0.5">{tp.value}</div>
                  </div>
                </div>

                <div className="flex items-center gap-1.5 text-[10px] text-emerald-400 font-mono">
                  <CheckCircle2 className="w-3 h-3" />
                  Stitched
                </div>
              </div>
            );
          })}
        </div>

        {/* Center: The Graph Stitching Connector */}
        <div className="lg:col-span-2 flex flex-col items-center justify-center py-4 lg:py-0">
          <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400 shadow-xl shadow-emerald-500/20 animate-pulse">
            <GitMerge className="w-6 h-6 rotate-90 lg:rotate-0" />
          </div>
          <span className="text-[10px] font-mono text-emerald-400 uppercase tracking-wider mt-2 font-bold text-center">
            AI Graph Stitching
          </span>
          <span className="text-[9px] text-gray-400 font-mono text-center">Deterministic Key Match</span>
        </div>

        {/* Right Side: The Unified Master Entity */}
        <div className="lg:col-span-5">
          <div className="p-6 rounded-3xl border border-emerald-500/40 bg-gradient-to-br from-[#0c181f] to-[#060c0f] shadow-2xl relative overflow-hidden space-y-5">
            <div className="flex items-center justify-between pb-4 border-b border-white/10">
              <div>
                <span className="text-[10px] font-mono uppercase tracking-wider text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">
                  Master Customer ID: CUST-88219
                </span>
                <h3 className="text-xl font-bold text-white mt-1.5">Rahul Sharma</h3>
                <p className="text-xs text-gray-400">Powai, Mumbai • Loyal VIP Shopper</p>
              </div>

              <div className="text-right">
                <div className="text-xs text-gray-400">Health Score</div>
                <div className="text-2xl font-extrabold text-emerald-400 font-mono">82/100</div>
              </div>
            </div>

            {/* Resolved Attributes Grid */}
            <div className="grid grid-cols-2 gap-3 text-xs">
              <div className="p-2.5 rounded-xl bg-white/[0.02] border border-white/10">
                <div className="text-[10px] text-gray-400 uppercase">Total Lifetime Spend</div>
                <div className="text-base font-bold text-white font-mono mt-0.5">₹14,820</div>
                <div className="text-[10px] text-emerald-400">5 Orders Placed</div>
              </div>

              <div className="p-2.5 rounded-xl bg-white/[0.02] border border-white/10">
                <div className="text-[10px] text-gray-400 uppercase">Average Order Value</div>
                <div className="text-base font-bold text-white font-mono mt-0.5">₹2,964</div>
                <div className="text-[10px] text-cyan-400">+18% above store avg</div>
              </div>

              <div className="p-2.5 rounded-xl bg-white/[0.02] border border-white/10">
                <div className="text-[10px] text-gray-400 uppercase">RTO Risk Score</div>
                <div className="text-base font-bold text-emerald-400 font-mono mt-0.5">12 / 100</div>
                <div className="text-[10px] text-emerald-400/80">Safe • Auto-Dispatch</div>
              </div>

              <div className="p-2.5 rounded-xl bg-white/[0.02] border border-white/10">
                <div className="text-[10px] text-gray-400 uppercase">Next Purchase Due</div>
                <div className="text-base font-bold text-teal-300 font-mono mt-0.5">8–14 Days</div>
                <div className="text-[10px] text-teal-400/80">Replenishment Alert Ready</div>
              </div>
            </div>

            {/* Graph Impact Callout */}
            <div className="p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-xs text-emerald-300 flex items-center gap-2.5">
              <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>
                <strong>Zero Split Histories:</strong> All 5 touchpoints feed into 1 chronological timeline. No duplicate WhatsApp spam or confused support agents.
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
