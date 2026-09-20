import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { PublicNavbar } from "@/components/PublicNavbar";
import { PublicFooter } from "@/components/PublicFooter";
import { AeoStructuredData } from "@/components/AeoStructuredData";
import { CalendarBookingModal } from "@/components/CalendarBookingModal";
import { Link } from "react-router-dom";
import {
  CheckCircle2,
  Calendar,
  Sparkles,
  Zap,
  ShieldCheck,
  ArrowRight,
  Calculator,
  HelpCircle,
} from "lucide-react";

export default function PricingPage() {
  const [isAnnual, setIsAnnual] = useState(true);
  const [calendarModalOpen, setCalendarModalOpen] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState("Growth");

  useEffect(() => {
    document.title = "Transparent D2C Pricing — Conversio by Scalezix";
  }, []);

  const openDemoWithPlan = (plan: string) => {
    setSelectedPlan(plan);
    setCalendarModalOpen(true);
  };

  return (
    <div className="min-h-screen bg-[#04080a] text-slate-100 font-sans selection:bg-emerald-500 selection:text-black overflow-x-hidden relative">
      {/* Background Mesh Glow */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute top-10 left-1/3 w-[600px] h-[450px] bg-emerald-600/10 rounded-full blur-[140px]" />
        <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[400px] bg-teal-600/10 rounded-full blur-[140px]" />
      </div>

      <AeoStructuredData />
      <PublicNavbar />

      <main className="pt-36 sm:pt-44 pb-28 relative z-10">
        <div className="container mx-auto px-4 sm:px-6 max-w-6xl">
          {/* Header */}
          <div className="text-center max-w-3xl mx-auto mb-16">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-mono font-semibold mb-4 shadow-xs">
              <Sparkles className="w-3.5 h-3.5 text-emerald-400" /> TRANSPARENT D2C REVENUE PRICING
            </div>
            <h1 className="text-3xl sm:text-5xl md:text-6xl font-extrabold text-white tracking-tight leading-tight">
              Invest in Outcomes, Not Empty Features
            </h1>
            <p className="text-slate-400 text-sm sm:text-lg mt-4">
              Transparent plans combining Customer 360, Cart Recovery, COD RTO Shield, and Predictive Reorders. Official Meta WhatsApp Cloud API access with zero markups.
            </p>

            {/* Billing Toggle */}
            <div className="mt-8 inline-flex items-center gap-3 p-1.5 rounded-full bg-slate-900 border border-white/10 shadow-lg">
              <button
                type="button"
                onClick={() => setIsAnnual(false)}
                className={`px-5 py-2.5 rounded-full text-xs font-bold transition-all cursor-pointer ${
                  !isAnnual ? "bg-slate-800 text-white shadow-md" : "text-slate-400 hover:text-white"
                }`}
              >
                Monthly Billing
              </button>
              <button
                type="button"
                onClick={() => setIsAnnual(true)}
                className={`px-5 py-2.5 rounded-full text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
                  isAnnual
                    ? "bg-emerald-600 text-white shadow-[0_0_15px_rgba(16,185,129,0.4)]"
                    : "text-slate-400 hover:text-white"
                }`}
              >
                Annual Billing <span className="bg-emerald-400 text-black text-[10px] px-2 py-0.5 rounded-full font-extrabold">SAVE 20%</span>
              </button>
            </div>
          </div>

          {/* Pricing 4 Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 items-stretch mb-20">
            {/* TIER 1: Starter */}
            <div className="rounded-[32px] bg-slate-900/60 border border-white/10 p-6 flex flex-col justify-between shadow-2xl backdrop-blur-xl hover:border-white/20 transition-all text-left">
              <div>
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-lg font-bold text-white">Starter</h3>
                  <span className="text-[10px] font-mono font-bold text-emerald-400 bg-emerald-500/10 border border-emerald-500/30 px-2 py-0.5 rounded-full">
                    SMALLER BRANDS
                  </span>
                </div>
                <p className="text-xs text-slate-400 min-h-[36px]">
                  For emerging D2C brands starting with cart recovery and automated COD confirmation.
                </p>

                <div className="mt-6 flex items-baseline">
                  <span className="text-3xl font-extrabold tracking-tight font-mono text-white">
                    ₹{isAnnual ? "3,999" : "4,999"}
                  </span>
                  <span className="ml-2 text-xs text-slate-400 font-semibold">/ month</span>
                </div>
                {isAnnual && (
                  <p className="text-[11px] text-emerald-400 font-semibold mt-1">Billed annually (₹47,988/yr)</p>
                )}

                <div className="mt-6 border-t border-white/10 pt-5 space-y-3 text-xs text-slate-300">
                  <div className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                    <span>Up to 5,000 active customers</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                    <span>Shopify OAuth real-time integration</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                    <span>Customer 360 unified profiles</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                    <span>Automated Abandoned Cart Recovery</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                    <span>Official Meta WhatsApp API connection</span>
                  </div>
                </div>
              </div>

              <div className="pt-6">
                <Button
                  onClick={() => openDemoWithPlan("Starter")}
                  className="w-full bg-slate-800 hover:bg-slate-700 text-white font-bold text-xs h-11 rounded-xl cursor-pointer transition-all border border-white/10"
                >
                  Start with Starter
                </Button>
              </div>
            </div>

            {/* TIER 2: Growth (PRIMARY PACKAGE) */}
            <div className="rounded-[32px] bg-slate-900/90 border-2 border-emerald-500 p-6 flex flex-col justify-between shadow-[0_20px_60px_rgba(16,185,129,0.25)] relative ring-4 ring-emerald-500/10 backdrop-blur-2xl text-left">
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-emerald-600 text-white text-[10px] font-mono font-bold uppercase tracking-widest px-3 py-0.5 rounded-full shadow-[0_0_15px_rgba(16,185,129,0.5)] border border-emerald-400/40 whitespace-nowrap">
                PRIMARY PACKAGE • MOST POPULAR
              </div>

              <div>
                <div className="flex items-center justify-between mb-2 mt-2">
                  <h3 className="text-lg font-bold text-white">Growth</h3>
                  <span className="text-[10px] font-mono font-bold text-emerald-400 bg-emerald-500/10 border border-emerald-500/30 px-2 py-0.5 rounded-full">
                    CORE PLATFORM
                  </span>
                </div>
                <p className="text-xs text-slate-400 min-h-[36px]">
                  The complete operating system: AI scoring, COD RTO Shield, and Predictive Reorders.
                </p>

                <div className="mt-6 flex items-baseline">
                  <span className="text-3xl font-extrabold tracking-tight font-mono text-emerald-400">
                    ₹{isAnnual ? "7,999" : "9,999"}
                  </span>
                  <span className="ml-2 text-xs text-slate-400 font-semibold">/ month</span>
                </div>
                {isAnnual && (
                  <p className="text-[11px] text-emerald-400 font-semibold mt-1">Billed annually (₹95,988/yr)</p>
                )}

                <div className="mt-6 border-t border-white/10 pt-5 space-y-3 text-xs text-slate-300">
                  <div className="flex items-start gap-2 font-semibold text-white">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                    <span>Everything in Starter plan</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                    <span>Up to 25,000 active customers</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                    <span>AI Revenue Opportunities (1-click)</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                    <span>7-Factor COD RTO Risk Scoring Shield</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                    <span>Predictive Reorder &amp; Replenishment</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                    <span>Multi-touch True Revenue Attribution</span>
                  </div>
                </div>
              </div>

              <div className="pt-6">
                <Button
                  onClick={() => openDemoWithPlan("Growth")}
                  className="w-full bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs h-11 rounded-xl cursor-pointer shadow-[0_0_25px_rgba(16,185,129,0.5)] transition-all"
                >
                  Start with Growth
                </Button>
              </div>
            </div>

            {/* TIER 3: Scale */}
            <div className="rounded-[32px] bg-slate-900/60 border border-white/10 p-6 flex flex-col justify-between shadow-2xl backdrop-blur-xl hover:border-white/20 transition-all text-left">
              <div>
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-lg font-bold text-white">Scale</h3>
                  <span className="text-[10px] font-mono font-bold text-teal-400 bg-teal-500/10 border border-teal-500/30 px-2 py-0.5 rounded-full">
                    HIGH VOLUME
                  </span>
                </div>
                <p className="text-xs text-slate-400 min-h-[36px]">
                  For high-order-frequency brands requiring autonomous AI action agents and telephony.
                </p>

                <div className="mt-6 flex items-baseline">
                  <span className="text-3xl font-extrabold tracking-tight font-mono text-white">
                    ₹{isAnnual ? "19,999" : "24,999"}
                  </span>
                  <span className="ml-2 text-xs text-slate-400 font-semibold">/ month</span>
                </div>
                {isAnnual && (
                  <p className="text-[11px] text-emerald-400 font-semibold mt-1">Billed annually (₹2,39,988/yr)</p>
                )}

                <div className="mt-6 border-t border-white/10 pt-5 space-y-3 text-xs text-slate-300">
                  <div className="flex items-start gap-2 font-semibold text-white">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                    <span>Everything in Growth plan</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                    <span>Up to 100,000 active customers</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                    <span>Autonomous AI Action Agents</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                    <span>Indian Multilingual AI (Hindi &amp; Gujarati)</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                    <span>Shiprocket &amp; Razorpay deep webhooks</span>
                  </div>
                </div>
              </div>

              <div className="pt-6">
                <Button
                  onClick={() => openDemoWithPlan("Scale")}
                  className="w-full bg-slate-800 hover:bg-slate-700 text-white font-bold text-xs h-11 rounded-xl cursor-pointer transition-all border border-white/10"
                >
                  Start with Scale
                </Button>
              </div>
            </div>

            {/* TIER 4: Enterprise */}
            <div className="rounded-[32px] bg-slate-900/60 border border-white/10 p-6 flex flex-col justify-between shadow-2xl backdrop-blur-xl hover:border-white/20 transition-all text-left">
              <div>
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-lg font-bold text-white">Enterprise</h3>
                  <span className="text-[10px] font-mono font-bold text-cyan-400 bg-cyan-500/10 border border-cyan-500/30 px-2 py-0.5 rounded-full">
                    CUSTOM SCALE
                  </span>
                </div>
                <p className="text-xs text-slate-400 min-h-[36px]">
                  Large D2C enterprise groups, custom ERP/SAP pipelines, and bespoke AI voice tuning.
                </p>

                <div className="mt-6 flex items-baseline">
                  <span className="text-3xl font-extrabold tracking-tight font-mono text-white">
                    Custom
                  </span>
                  <span className="ml-2 text-xs text-slate-400 font-semibold">₹50,000+ / mo</span>
                </div>
                <p className="text-[11px] text-gray-400 font-semibold mt-1">Tailored SLA &amp; Volume</p>

                <div className="mt-6 border-t border-white/10 pt-5 space-y-3 text-xs text-slate-300">
                  <div className="flex items-start gap-2 font-semibold text-white">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                    <span>Everything in Scale plan</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                    <span>100,000+ customer records</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                    <span>Dedicated WhatsApp Phone Numbers</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                    <span>Dedicated Solutions Architect &amp; 99.9% SLA</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                    <span>Custom ERP, Zoho, &amp; Unicommerce integrations</span>
                  </div>
                </div>
              </div>

              <div className="pt-6">
                <Button
                  onClick={() => openDemoWithPlan("Enterprise")}
                  className="w-full bg-slate-800 hover:bg-slate-700 text-white font-bold text-xs h-11 rounded-xl cursor-pointer transition-all border border-white/10"
                >
                  Contact Sales
                </Button>
              </div>
            </div>
          </div>

          {/* ========================================================================= */}
          {/* USAGE TRANSPARENCY CARD: NO HIDDEN FEES                                   */}
          {/* ========================================================================= */}
          <div className="rounded-3xl border border-emerald-500/20 bg-emerald-950/10 p-6 sm:p-8 backdrop-blur-xl mb-16 text-left">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pb-6 border-b border-white/10">
              <div>
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-semibold uppercase tracking-wider mb-2">
                  <Calculator className="w-3.5 h-3.5" /> Transparent Usage Billing
                </div>
                <h3 className="text-xl font-bold text-white">
                  We Never Hide Meta Charges or Telephony Rates
                </h3>
                <p className="text-xs text-gray-400 mt-1">
                  Unlike legacy WhatsApp marketing platforms that mark up Meta conversation costs by 40–80%, Conversio passes all carrier fees at cost.
                </p>
              </div>

              <div className="text-left md:text-right">
                <span className="text-xs text-gray-400 font-medium block">Sample Monthly Invoice</span>
                <span className="text-2xl font-mono font-black text-emerald-400">₹14,459</span>
              </div>
            </div>

            <div className="mt-6 grid grid-cols-1 sm:grid-cols-4 gap-4 text-xs">
              <div className="p-3.5 rounded-xl bg-black/40 border border-white/5">
                <span className="text-[10px] text-gray-400 uppercase font-semibold block">Conversio Growth Platform</span>
                <span className="text-base font-bold text-white mt-1 block">₹9,999</span>
                <span className="text-[11px] text-emerald-400">Flat software subscription</span>
              </div>

              <div className="p-3.5 rounded-xl bg-black/40 border border-white/5">
                <span className="text-[10px] text-gray-400 uppercase font-semibold block">Meta WhatsApp Charges</span>
                <span className="text-base font-bold text-white mt-1 block">₹2,840</span>
                <span className="text-[11px] text-gray-400">At-cost directly via Meta</span>
              </div>

              <div className="p-3.5 rounded-xl bg-black/40 border border-white/5">
                <span className="text-[10px] text-gray-400 uppercase font-semibold block">AI Voice Telephony</span>
                <span className="text-base font-bold text-white mt-1 block">₹1,280</span>
                <span className="text-[11px] text-gray-400">At-cost carrier minutes</span>
              </div>

              <div className="p-3.5 rounded-xl bg-black/40 border border-white/5">
                <span className="text-[10px] text-gray-400 uppercase font-semibold block">Authenticated Email</span>
                <span className="text-base font-bold text-white mt-1 block">₹340</span>
                <span className="text-[11px] text-gray-400">Dedicated SMTP deliverability</span>
              </div>
            </div>
          </div>

          {/* Bottom CTA Banner */}
          <div className="rounded-[32px] bg-gradient-to-r from-slate-950 via-slate-900 to-emerald-950/80 border border-white/10 p-8 sm:p-12 text-center shadow-2xl">
            <h3 className="text-2xl sm:text-3xl font-bold text-white">
              Ready to experience Conversio on your Shopify store?
            </h3>
            <p className="text-slate-400 text-xs sm:text-sm mt-2 max-w-lg mx-auto">
              Schedule a personalized walkthrough and custom ROI recovery projection with our D2C growth team.
            </p>
            <div className="mt-6">
              <Link
                to="/book-demo"
                className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs shadow-[0_0_25px_rgba(16,185,129,0.4)] transition-all transform active:scale-95"
              >
                <Calendar className="w-4 h-4" /> Book a Demo with Specialist
              </Link>
            </div>
          </div>
        </div>
      </main>

      <CalendarBookingModal
        isOpen={calendarModalOpen}
        onClose={() => setCalendarModalOpen(false)}
        selectedPlan={selectedPlan}
      />

      <PublicFooter />
    </div>
  );
}
