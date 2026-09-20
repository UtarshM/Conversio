import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Trello,
  PhoneCall,
  MessageSquare,
  Mail,
  Calendar,
  Sparkles,
  TrendingUp,
  CheckCircle2,
  Clock,
  ArrowRight,
  Send,
  ShoppingBag,
  Zap,
} from "lucide-react";

interface Deal {
  id: string;
  name: string;
  brand: string;
  value: string;
  numericValue: number;
  score: number;
  source: "WhatsApp" | "Website Popup" | "Meta Ad" | "Abandoned Checkout";
  lastAction: string;
  stage: "new" | "qualified" | "interested" | "proposal" | "won";
}

const INITIAL_DEALS: Deal[] = [
  {
    id: "d1",
    name: "Dr. Ananya Roy",
    brand: "Glow & Co. Wholesale",
    value: "₹45,000",
    numericValue: 45000,
    score: 92,
    source: "WhatsApp",
    lastAction: "Asked for bulk 50-pack pricing in Hindi",
    stage: "proposal",
  },
  {
    id: "d2",
    name: "Vikram Malhotra",
    brand: "Urban Fitwear",
    value: "₹18,500",
    numericValue: 18500,
    score: 84,
    source: "Meta Ad",
    lastAction: "AI Voice qualified size requirement & fabric tier",
    stage: "qualified",
  },
  {
    id: "d3",
    name: "Sneha Patel",
    brand: "AyurVeda Naturals",
    value: "₹12,400",
    numericValue: 12400,
    score: 78,
    source: "Website Popup",
    lastAction: "Scheduled Calendly consultation via WhatsApp",
    stage: "interested",
  },
  {
    id: "d4",
    name: "Karan Johar",
    brand: "Elite Leathercraft",
    value: "₹65,000",
    numericValue: 65000,
    score: 96,
    source: "Abandoned Checkout",
    lastAction: "Paid via Razorpay WhatsApp link after AI offer",
    stage: "won",
  },
  {
    id: "d5",
    name: "Meera Singhania",
    brand: "Pure Botanicals",
    value: "₹8,900",
    numericValue: 8900,
    score: 68,
    source: "WhatsApp",
    lastAction: "Inbound ping: 'Are products 100% paraben free?'",
    stage: "new",
  },
  {
    id: "d6",
    name: "Rajesh Kothari",
    brand: "Kothari Diamonds",
    value: "₹95,000",
    numericValue: 95000,
    score: 94,
    source: "WhatsApp",
    lastAction: "Paid advance ₹20,000 via Conversio UPI gateway",
    stage: "won",
  },
];

const STAGES = [
  { id: "new", title: "New Inbound Leads", color: "border-blue-500/40 text-blue-400 bg-blue-500/10" },
  { id: "qualified", title: "AI Qualified", color: "border-teal-500/40 text-teal-400 bg-teal-500/10" },
  { id: "interested", title: "Consult / Demo", color: "border-cyan-500/40 text-cyan-400 bg-cyan-500/10" },
  { id: "proposal", title: "Cart / Proposal Sent", color: "border-amber-500/40 text-amber-400 bg-amber-500/10" },
  { id: "won", title: "Closed Won (Revenue)", color: "border-emerald-500/40 text-emerald-400 bg-emerald-500/10" },
];

export function SalesCrmPipelineWidget() {
  const [deals, setDeals] = useState<Deal[]>(INITIAL_DEALS);
  const [activeDealNotification, setActiveDealNotification] = useState<string | null>(null);

  const moveDealForward = (dealId: string) => {
    setDeals((prev) =>
      prev.map((d) => {
        if (d.id !== dealId) return d;
        if (d.stage === "new") return { ...d, stage: "qualified", lastAction: "AI Bot verified budget & phone" };
        if (d.stage === "qualified") return { ...d, stage: "interested", lastAction: "WhatsApp Calendly demo booked" };
        if (d.stage === "interested") return { ...d, stage: "proposal", lastAction: "Pre-filled Shopify cart link sent" };
        if (d.stage === "proposal") return { ...d, stage: "won", lastAction: "Payment confirmed via Razorpay webhook" };
        return d;
      })
    );

    setActiveDealNotification(`Deal progressed to next pipeline stage!`);
    setTimeout(() => setActiveDealNotification(null), 3000);
  };

  const totalWon = deals
    .filter((d) => d.stage === "won")
    .reduce((sum, d) => sum + d.numericValue, 0);

  const totalActive = deals
    .filter((d) => d.stage !== "won")
    .reduce((sum, d) => sum + d.numericValue, 0);

  return (
    <div className="rounded-3xl border border-white/10 bg-[#070e12]/95 p-6 sm:p-10 shadow-2xl backdrop-blur-2xl space-y-8">
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-6 border-b border-white/10">
        <div className="space-y-1.5">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-semibold uppercase tracking-wider">
            <Trello className="w-3.5 h-3.5" /> Module 2 • Sales CRM & Deal Pipeline
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
            High-Velocity Omnichannel Deal Pipeline
          </h2>
          <p className="text-xs sm:text-sm text-gray-400">
            Track high-ticket D2C orders, custom corporate gifting inquiries, and wholesale opportunities with automated lead scoring and 1-click multi-channel outreach.
          </p>
        </div>

        {/* Pipeline Summary Badges */}
        <div className="flex flex-wrap items-center gap-3">
          <div className="px-3.5 py-2 rounded-xl bg-white/[0.03] border border-white/10 text-xs">
            <span className="text-gray-400">Active Pipeline:</span>{" "}
            <span className="font-mono font-bold text-white">₹{(totalActive / 100000).toFixed(2)}L</span>
          </div>
          <div className="px-3.5 py-2 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-xs">
            <span className="text-emerald-400">Closed Won:</span>{" "}
            <span className="font-mono font-bold text-emerald-300">₹{(totalWon / 100000).toFixed(2)}L</span>
          </div>
        </div>
      </div>

      {activeDealNotification && (
        <div className="p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-xs text-emerald-400 flex items-center justify-between animate-fadeIn">
          <span className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4" /> {activeDealNotification}
          </span>
          <span className="text-[10px] text-emerald-400/80">Updated live</span>
        </div>
      )}

      {/* Kanban Board Columns */}
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4 overflow-x-auto pb-2">
        {STAGES.map((stage) => {
          const stageDeals = deals.filter((d) => d.stage === stage.id);
          const stageTotal = stageDeals.reduce((sum, d) => sum + d.numericValue, 0);

          return (
            <div
              key={stage.id}
              className="p-4 rounded-2xl bg-white/[0.02] border border-white/10 flex flex-col justify-between space-y-3 min-w-[220px]"
            >
              {/* Column Header */}
              <div className="pb-2 border-b border-white/10 space-y-1">
                <div className="flex items-center justify-between">
                  <span className={`text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded border ${stage.color}`}>
                    {stage.title}
                  </span>
                  <span className="text-xs font-mono text-gray-400 font-bold">{stageDeals.length}</span>
                </div>
                <div className="text-[11px] text-gray-400 font-mono">
                  Total: <span className="text-white font-semibold">₹{(stageTotal / 1000).toFixed(1)}k</span>
                </div>
              </div>

              {/* Deals in this stage */}
              <div className="space-y-3 min-h-[220px]">
                {stageDeals.length === 0 ? (
                  <div className="h-full flex items-center justify-center text-center p-4 text-[11px] text-gray-400 border border-dashed border-white/10 rounded-xl">
                    No active deals in this stage
                  </div>
                ) : (
                  stageDeals.map((deal) => (
                    <div
                      key={deal.id}
                      className="p-3.5 rounded-xl bg-[#091217] border border-white/10 hover:border-emerald-500/40 transition-all space-y-2.5 shadow-md group"
                    >
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-bold text-white group-hover:text-emerald-300 transition-colors">
                          {deal.name}
                        </span>
                        <span className="text-xs font-mono font-bold text-emerald-400">
                          {deal.value}
                        </span>
                      </div>

                      <div className="text-[10px] text-gray-400 flex items-center justify-between">
                        <span>{deal.brand}</span>
                        <span className="px-1.5 py-0.2 rounded bg-white/5 font-mono text-[9px] text-gray-300">
                          Score: {deal.score}
                        </span>
                      </div>

                      <p className="text-[11px] text-gray-400 leading-tight border-t border-white/5 pt-2">
                        {deal.lastAction}
                      </p>

                      <div className="pt-2 border-t border-white/5 flex items-center justify-between">
                        <span className="text-[9px] uppercase font-semibold text-teal-400/80 font-mono">
                          {deal.source}
                        </span>

                        {deal.stage !== "won" ? (
                          <button
                            onClick={() => moveDealForward(deal.id)}
                            className="text-[10px] text-emerald-400 hover:text-emerald-300 font-semibold flex items-center gap-1 hover:underline"
                          >
                            Advance <ArrowRight className="w-3 h-3" />
                          </button>
                        ) : (
                          <span className="text-[10px] text-emerald-400 font-mono font-bold flex items-center gap-1">
                            <CheckCircle2 className="w-3 h-3" /> Won
                          </span>
                        )}
                      </div>
                    </div>
                  ))
                )}
              </div>

              {/* Bottom Quick Trigger */}
              <div className="pt-2 border-t border-white/5 text-center">
                <span className="text-[10px] text-gray-400 font-mono">
                  {stage.id === "won" ? "Revenue Attributed" : "Auto-Sync with Shopify"}
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
