import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { PublicNavbar } from "@/components/PublicNavbar";
import { PublicFooter } from "@/components/PublicFooter";
import { AeoStructuredData } from "@/components/AeoStructuredData";
import { CalendarBookingModal } from "@/components/CalendarBookingModal";
import { Link, useNavigate } from "react-router-dom";
import {
  CheckCircle2,
  Calendar,
  Sparkles,
  HelpCircle,
  Zap,
  ShieldCheck,
  ArrowRight,
  ShoppingBag,
  Flame,
} from "lucide-react";

export default function PricingPage() {
  const [isAnnual, setIsAnnual] = useState(true);
  const [calendarModalOpen, setCalendarModalOpen] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState("Growth Tri-Channel");
  const navigate = useNavigate();

  useEffect(() => {
    document.title = "Transparent Pricing — Conversio AI";
  }, []);

  const openDemoWithPlan = (plan: string) => {
    setSelectedPlan(plan);
    setCalendarModalOpen(true);
  };

  return (
    <div className="min-h-screen bg-[#030712] text-slate-100 font-sans selection:bg-emerald-500 selection:text-black overflow-x-hidden relative">
      {/* Background Mesh Glow */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute top-10 left-1/3 w-[600px] h-[450px] bg-emerald-600/10 rounded-full blur-[140px]" />
        <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[400px] bg-blue-600/10 rounded-full blur-[140px]" />
        <div
          className="absolute inset-0 opacity-[0.14]"
          style={{
            backgroundImage: "radial-gradient(rgba(255, 255, 255, 0.2) 1px, transparent 1px)",
            backgroundSize: "32px 32px",
          }}
        />
      </div>

      <AeoStructuredData />
      <PublicNavbar />

      <main className="pt-36 sm:pt-44 pb-28 relative z-10">
        <div className="container mx-auto px-4 sm:px-6 max-w-6xl">
          {/* Header */}
          <div className="text-center max-w-3xl mx-auto mb-16">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-mono font-semibold mb-4 shadow-xs">
              <Sparkles className="w-3.5 h-3.5 text-emerald-400" /> TRANSPARENT REVENUE PRICING
            </div>
            <h1 className="text-3xl sm:text-5xl md:text-6xl font-display font-extrabold text-white tracking-tight leading-tight">
              Invest in Outcomes, Not Empty Features
            </h1>
            <p className="text-slate-400 text-sm sm:text-lg mt-4">
              Transparent plans combining Conversio D2C Retention &amp; Outbound Sales. Official WhatsApp Cloud API access, zero Meta markup fees, and direct calendar demo onboarding.
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

          {/* Pricing 3 Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch mb-20">
            {/* TIER 1: Starter D2C */}
            <div className="rounded-[32px] bg-slate-900/60 border border-white/10 p-7 sm:p-9 flex flex-col justify-between shadow-2xl backdrop-blur-xl hover:border-white/20 transition-all text-left">
              <div>
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-xl font-bold text-white font-display">Starter D2C</h3>
                  <span className="text-[10px] font-mono font-bold text-emerald-400 bg-emerald-500/10 border border-emerald-500/30 px-2.5 py-0.5 rounded-full">
                    D2C RETENTION
                  </span>
                </div>
                <p className="text-xs text-slate-400 min-h-[34px]">
                  Ideal for growing Shopify &amp; WooCommerce brands needing cart recovery and COD protection.
                </p>

                <div className="mt-6 flex items-baseline">
                  <span className="text-4xl sm:text-5xl font-extrabold tracking-tight font-mono text-white">
                    ₹{isAnnual ? "2,799" : "3,499"}
                  </span>
                  <span className="ml-2 text-xs text-slate-400 font-semibold">/ month</span>
                </div>
                {isAnnual && (
                  <p className="text-[11px] text-emerald-400 font-semibold mt-1">Billed annually (₹33,588/yr)</p>
                )}

                <div className="mt-8 border-t border-white/10 pt-6 space-y-3.5 text-xs text-slate-300">
                  <div className="flex items-start gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                    <span>Official WhatsApp Cloud API verification</span>
                  </div>
                  <div className="flex items-start gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                    <span>3-Step Automated Abandoned Cart Recovery</span>
                  </div>
                  <div className="flex items-start gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                    <span>COD-to-Prepaid RTO Shield (₹50 UPI prompt)</span>
                  </div>
                  <div className="flex items-start gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                    <span>NDR Courier alerts (Shiprocket/Delhivery)</span>
                  </div>
                  <div className="flex items-start gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                    <span>Up to 10,000 WhatsApp messages / month</span>
                  </div>
                </div>
              </div>

              <div className="pt-8">
                <Button
                  onClick={() => openDemoWithPlan("Starter D2C")}
                  className="w-full bg-slate-800 hover:bg-slate-700 text-white font-bold text-xs h-12 rounded-2xl cursor-pointer transition-all border border-white/10"
                >
                  Book Starter Demo
                </Button>
              </div>
            </div>

            {/* TIER 2: Growth Tri-Channel (FEATURED) */}
            <div className="rounded-[32px] bg-slate-900/90 border-2 border-emerald-500 p-7 sm:p-9 flex flex-col justify-between shadow-[0_20px_60px_rgba(16,185,129,0.25)] relative ring-4 ring-emerald-500/10 backdrop-blur-2xl text-left">
              <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-emerald-600 text-white text-[11px] font-mono font-bold uppercase tracking-widest px-4 py-1 rounded-full shadow-[0_0_15px_rgba(16,185,129,0.5)] border border-emerald-400/40">
                MOST POPULAR • FULL PLATFORM
              </div>

              <div>
                <div className="flex items-center justify-between mb-2 mt-2 sm:mt-0">
                  <h3 className="text-xl font-bold text-white font-display">Growth Tri-Channel</h3>
                  <span className="text-[10px] font-mono font-bold text-blue-400 bg-blue-500/10 border border-blue-500/30 px-2.5 py-0.5 rounded-full">
                    RETENTION + OUTBOUND
                  </span>
                </div>
                <p className="text-xs text-slate-400 min-h-[34px]">
                  The complete operating system: WhatsApp D2C retention + Tri-channel sales outreach.
                </p>

                <div className="mt-6 flex items-baseline">
                  <span className="text-4xl sm:text-5xl font-extrabold tracking-tight font-mono text-emerald-400">
                    ₹{isAnnual ? "5,599" : "6,999"}
                  </span>
                  <span className="ml-2 text-xs text-slate-400 font-semibold">/ month</span>
                </div>
                {isAnnual && (
                  <p className="text-[11px] text-emerald-400 font-semibold mt-1">Billed annually (₹67,188/yr)</p>
                )}

                <div className="mt-8 border-t border-white/10 pt-6 space-y-3.5 text-xs text-slate-300">
                  <div className="flex items-start gap-2.5 font-semibold text-white">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                    <span>Everything in Starter D2C plan</span>
                  </div>
                  <div className="flex items-start gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                    <span>Tri-Channel Sales (WhatsApp + Email + Voice)</span>
                  </div>
                  <div className="flex items-start gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                    <span>Stop-on-Reply cross-channel automation engine</span>
                  </div>
                  <div className="flex items-start gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                    <span>Speed-to-Lead &lt;60s auto-dialer &amp; WhatsApp ping</span>
                  </div>
                  <div className="flex items-start gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                    <span>AI Voice Agent for COD address confirmation</span>
                  </div>
                  <div className="flex items-start gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                    <span>25,000 WhatsApp messages + 500 Voice minutes</span>
                  </div>
                </div>
              </div>

              <div className="pt-8">
                <Button
                  onClick={() => openDemoWithPlan("Growth Tri-Channel")}
                  className="w-full bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs h-12 rounded-2xl cursor-pointer shadow-[0_0_25px_rgba(16,185,129,0.5)] transition-all transform active:scale-95"
                >
                  Book Growth Demo
                </Button>
              </div>
            </div>

            {/* TIER 3: Enterprise Scale */}
            <div className="rounded-[32px] bg-slate-900/60 border border-white/10 p-7 sm:p-9 flex flex-col justify-between shadow-2xl backdrop-blur-xl hover:border-white/20 transition-all text-left">
              <div>
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-xl font-bold text-white font-display">Enterprise Scale</h3>
                  <span className="text-[10px] font-mono font-bold text-purple-400 bg-purple-500/10 border border-purple-500/30 px-2.5 py-0.5 rounded-full">
                    CUSTOM SCALE
                  </span>
                </div>
                <p className="text-xs text-slate-400 min-h-[34px]">
                  High volume retail chains, enterprise B2B sales teams, and high-frequency D2C brands.
                </p>

                <div className="mt-6 flex items-baseline">
                  <span className="text-4xl sm:text-5xl font-extrabold tracking-tight font-mono text-white">
                    ₹{isAnnual ? "11,999" : "14,999"}
                  </span>
                  <span className="ml-2 text-xs text-slate-400 font-semibold">/ month</span>
                </div>
                {isAnnual && (
                  <p className="text-[11px] text-emerald-400 font-semibold mt-1">Billed annually (₹1,43,988/yr)</p>
                )}

                <div className="mt-8 border-t border-white/10 pt-6 space-y-3.5 text-xs text-slate-300">
                  <div className="flex items-start gap-2.5 font-semibold text-white">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                    <span>Everything in Growth Tri-Channel</span>
                  </div>
                  <div className="flex items-start gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                    <span>Unlimited team seats &amp; granular role permissions</span>
                  </div>
                  <div className="flex items-start gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                    <span>Dedicated WhatsApp Phone Numbers &amp; IP routing</span>
                  </div>
                  <div className="flex items-start gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                    <span>Custom ERP/SAP integration &amp; priority webhooks</span>
                  </div>
                  <div className="flex items-start gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                    <span>100,000 messages/mo + 2,500 Voice minutes</span>
                  </div>
                  <div className="flex items-start gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                    <span>Dedicated Account Manager &amp; 99.9% Uptime SLA</span>
                  </div>
                </div>
              </div>

              <div className="pt-8">
                <Button
                  onClick={() => openDemoWithPlan("Enterprise Scale")}
                  className="w-full bg-slate-800 hover:bg-slate-700 text-white font-bold text-xs h-12 rounded-2xl cursor-pointer transition-all border border-white/10"
                >
                  Book Enterprise Demo
                </Button>
              </div>
            </div>
          </div>

          {/* Feature Comparison Matrix */}
          <div className="rounded-[36px] bg-slate-900/80 border border-white/10 p-6 sm:p-10 backdrop-blur-2xl text-left mb-16">
            <h3 className="text-xl sm:text-2xl font-bold font-display text-white mb-6">
              Complete Feature Matrix
            </h3>

            <div className="overflow-x-auto">
              <table className="w-full text-xs text-left">
                <thead>
                  <tr className="border-b border-white/10 text-slate-400 font-mono uppercase tracking-wider">
                    <th className="py-3 px-4">Feature Capabilities</th>
                    <th className="py-3 px-4">Starter D2C</th>
                    <th className="py-3 px-4 text-emerald-400">Growth Tri-Channel</th>
                    <th className="py-3 px-4">Enterprise</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5 text-slate-300">
                  <tr>
                    <td className="py-3.5 px-4 font-semibold text-white">Official Meta WhatsApp API</td>
                    <td className="py-3.5 px-4">Included</td>
                    <td className="py-3.5 px-4 text-emerald-400 font-semibold">Included</td>
                    <td className="py-3.5 px-4">Multi-WABA Included</td>
                  </tr>
                  <tr>
                    <td className="py-3.5 px-4 font-semibold text-white">3-Step Abandoned Cart Recovery</td>
                    <td className="py-3.5 px-4">✓ (WhatsApp)</td>
                    <td className="py-3.5 px-4 text-emerald-400 font-semibold">✓ (WhatsApp + SMS)</td>
                    <td className="py-3.5 px-4">✓ (Omnichannel)</td>
                  </tr>
                  <tr>
                    <td className="py-3.5 px-4 font-semibold text-white">COD-to-Prepaid RTO Shield</td>
                    <td className="py-3.5 px-4">✓ (₹50 UPI prompt)</td>
                    <td className="py-3.5 px-4 text-emerald-400 font-semibold">✓ (AI Dynamic Incentive)</td>
                    <td className="py-3.5 px-4">✓ (Custom Gateway Rule)</td>
                  </tr>
                  <tr>
                    <td className="py-3.5 px-4 font-semibold text-white">AI Voice Agent Confirmation</td>
                    <td className="py-3.5 px-4 text-slate-500">—</td>
                    <td className="py-3.5 px-4 text-emerald-400 font-semibold">500 Mins / month</td>
                    <td className="py-3.5 px-4">2,500 Mins / month</td>
                  </tr>
                  <tr>
                    <td className="py-3.5 px-4 font-semibold text-white">Tri-Channel Cadences (WhatsApp + Email + Voice)</td>
                    <td className="py-3.5 px-4 text-slate-500">—</td>
                    <td className="py-3.5 px-4 text-emerald-400 font-semibold">✓ (WhatsApp+Email+Voice)</td>
                    <td className="py-3.5 px-4">✓ (Unlimited Cadences)</td>
                  </tr>
                  <tr>
                    <td className="py-3.5 px-4 font-semibold text-white">Stop-on-Reply Automation</td>
                    <td className="py-3.5 px-4 text-slate-500">—</td>
                    <td className="py-3.5 px-4 text-emerald-400 font-semibold">Included</td>
                    <td className="py-3.5 px-4">Included</td>
                  </tr>
                  <tr>
                    <td className="py-3.5 px-4 font-semibold text-white">NDR Courier Delivery Rescue</td>
                    <td className="py-3.5 px-4">Shiprocket, Delhivery</td>
                    <td className="py-3.5 px-4 text-emerald-400 font-semibold">All Couriers + AI Reschedule</td>
                    <td className="py-3.5 px-4">Custom Courier Webhooks</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* FAQ Section */}
          <div className="max-w-3xl mx-auto text-left space-y-6">
            <h3 className="text-2xl font-bold font-display text-white text-center mb-8">
              Frequently Asked Questions
            </h3>

            <div className="p-6 rounded-2xl bg-slate-900/60 border border-white/10 space-y-2">
              <h4 className="font-bold text-white text-sm">Are Meta WhatsApp conversation fees included?</h4>
              <p className="text-xs text-slate-400 leading-relaxed">
                We connect directly to your own Meta WhatsApp Business Account with zero markup fees. Meta charges standard conversation rates directly to your payment method with 1,000 free monthly service conversations.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-slate-900/60 border border-white/10 space-y-2">
              <h4 className="font-bold text-white text-sm">How does the Stop-on-Reply engine work?</h4>
              <p className="text-xs text-slate-400 leading-relaxed">
                When a lead replies on WhatsApp, Email, or accepts an AI voice call, Conversio instantly listens to inbound webhooks and cancels all future follow-up steps in that cadence.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-slate-900/60 border border-white/10 space-y-2">
              <h4 className="font-bold text-white text-sm">Can I switch between plans at any time?</h4>
              <p className="text-xs text-slate-400 leading-relaxed">
                Yes, you can upgrade, downgrade, or adjust add-ons whenever your campaign volume changes.
              </p>
            </div>
          </div>

          {/* Bottom CTA Banner */}
          <div className="mt-16 rounded-[32px] bg-gradient-to-r from-slate-950 via-slate-900 to-emerald-950/80 border border-white/10 p-8 sm:p-12 text-center shadow-2xl">
            <h3 className="text-2xl sm:text-3xl font-bold font-display text-white">
              Ready to experience the Conversio platform?
            </h3>
            <p className="text-slate-400 text-xs sm:text-sm mt-2 max-w-lg mx-auto">
              Schedule a personalized walkthrough and custom ROI projection with our team.
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
        defaultPlan={selectedPlan}
      />

      <PublicFooter />
    </div>
  );
}
