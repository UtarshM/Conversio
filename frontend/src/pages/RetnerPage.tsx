import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { PublicNavbar } from "@/components/PublicNavbar";
import { PublicFooter } from "@/components/PublicFooter";
import { AeoStructuredData } from "@/components/AeoStructuredData";
import { CalendarBookingModal } from "@/components/CalendarBookingModal";
import { Link } from "react-router-dom";
import {
  ShoppingBag,
  ShoppingCart,
  ShieldCheck,
  CheckCircle2,
  Calendar,
  Sparkles,
  Truck,
  PhoneCall,
  ArrowRight,
  TrendingUp,
  RefreshCw,
  Zap,
} from "lucide-react";

export default function RetnerPage() {
  const [activeCartStep, setActiveCartStep] = useState<1 | 2 | 3>(1);
  const [monthlyOrders, setMonthlyOrders] = useState<number>(2500);
  const [codPercentage, setCodPercentage] = useState<number>(65);
  const [calendarModalOpen, setCalendarModalOpen] = useState(false);

  useEffect(() => {
    document.title = "D2C WhatsApp Retention Engine — Conversio AI";
  }, []);

  // Calculate RTO Financial Impact
  const codOrders = Math.round((monthlyOrders * codPercentage) / 100);
  const typicalRtoCount = Math.round(codOrders * 0.28);
  const protectedRtoCount = Math.round(codOrders * 0.11);
  const savedOrders = typicalRtoCount - protectedRtoCount;
  const avgOrderValue = 1850;
  const courierCostPerRto = 160;
  const directCourierSavings = savedOrders * courierCostPerRto;
  const recoveredRevenue = Math.round(savedOrders * avgOrderValue * 0.85);
  const totalMonthlyBenefit = directCourierSavings + recoveredRevenue;

  return (
    <div className="min-h-screen bg-[#030712] text-slate-100 font-sans selection:bg-emerald-500 selection:text-black overflow-x-hidden relative">
      {/* Background Mesh */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute top-10 left-1/4 w-[600px] h-[450px] bg-emerald-600/10 rounded-full blur-[140px]" />
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
          {/* Hero */}
          <div className="text-center max-w-4xl mx-auto mb-20">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-mono font-semibold mb-4 shadow-xs">
              <ShoppingBag className="w-3.5 h-3.5 text-emerald-400" /> CONVERSIO D2C RETENTION POWERHOUSE
            </div>
            <h1 className="text-3xl sm:text-5xl md:text-6xl font-display font-extrabold text-white tracking-tight leading-tight">
              AI-Powered WhatsApp Cart Recovery &amp; RTO Shield
            </h1>
            <p className="text-slate-400 text-sm sm:text-lg mt-4 max-w-2xl mx-auto">
              Recover 22%+ abandoned checkouts automatically and convert high-risk Cash on Delivery orders into instant prepaid UPI transactions.
            </p>

            <div className="mt-8 flex flex-col sm:flex-row justify-center gap-4">
              <Link
                to="/book-demo?plan=Starter%20D2C"
                className="h-12 px-8 rounded-full bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs shadow-[0_0_25px_rgba(16,185,129,0.4)] flex items-center justify-center gap-2 transition-all transform active:scale-95"
              >
                <Calendar className="w-4 h-4" /> Book Retention Demo
              </Link>
              <Link
                to="/pricing"
                className="h-12 px-8 rounded-full bg-slate-900 hover:bg-slate-800 text-slate-200 border border-white/10 font-bold text-xs flex items-center justify-center gap-2 transition-all"
              >
                View Pricing Plans
              </Link>
            </div>
          </div>

          {/* Feature 1: 3-Step WhatsApp Abandoned Cart Drip */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch mb-16 text-left">
            <div className="lg:col-span-6 rounded-[32px] bg-slate-900/60 border border-white/10 p-7 sm:p-9 flex flex-col justify-between backdrop-blur-xl shadow-2xl">
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="text-xs font-mono font-bold text-emerald-400 uppercase bg-emerald-500/10 border border-emerald-500/30 px-3 py-1 rounded-full">
                    3-Step Recovery Drip
                  </span>
                  <span className="text-xs font-mono text-slate-400 font-semibold">22.4% Avg Recovery</span>
                </div>

                <h2 className="text-2xl font-bold text-white mb-2 font-display">
                  3-Step WhatsApp Abandoned Cart Recovery
                </h2>
                <p className="text-xs sm:text-sm text-slate-400 mb-6">
                  98% open rates beat low-performing emails. Reach customers at the perfect psychological intervals.
                </p>

                {/* Step Selector Buttons */}
                <div className="grid grid-cols-3 gap-2 mb-6">
                  <button
                    type="button"
                    onClick={() => setActiveCartStep(1)}
                    className={`py-2 px-2 text-xs font-bold rounded-xl border text-center transition-all cursor-pointer ${
                      activeCartStep === 1
                        ? "bg-emerald-600 border-emerald-500 text-white shadow-[0_0_15px_rgba(16,185,129,0.35)]"
                        : "bg-slate-950/80 border-white/10 text-slate-400 hover:text-white"
                    }`}
                  >
                    1. 15m Reminder
                  </button>
                  <button
                    type="button"
                    onClick={() => setActiveCartStep(2)}
                    className={`py-2 px-2 text-xs font-bold rounded-xl border text-center transition-all cursor-pointer ${
                      activeCartStep === 2
                        ? "bg-emerald-600 border-emerald-500 text-white shadow-[0_0_15px_rgba(16,185,129,0.35)]"
                        : "bg-slate-950/80 border-white/10 text-slate-400 hover:text-white"
                    }`}
                  >
                    2. 60m 10% Off
                  </button>
                  <button
                    type="button"
                    onClick={() => setActiveCartStep(3)}
                    className={`py-2 px-2 text-xs font-bold rounded-xl border text-center transition-all cursor-pointer ${
                      activeCartStep === 3
                        ? "bg-emerald-600 border-emerald-500 text-white shadow-[0_0_15px_rgba(16,185,129,0.35)]"
                        : "bg-slate-950/80 border-white/10 text-slate-400 hover:text-white"
                    }`}
                  >
                    3. 24h Final Call
                  </button>
                </div>

                {/* Dynamic Preview */}
                <div className="rounded-2xl bg-slate-950 border border-white/10 p-4 shadow-inner text-xs space-y-3">
                  <div className="flex items-center justify-between border-b border-white/10 pb-2 text-[11px] text-slate-400">
                    <span className="font-semibold text-emerald-400">Conversio WhatsApp Gateway</span>
                    <span className="font-mono">
                      {activeCartStep === 1 && "+15 Mins after checkout abandoned"}
                      {activeCartStep === 2 && "+60 Mins (Coupon Injection)"}
                      {activeCartStep === 3 && "+24 Hours (Urgency Driver)"}
                    </span>
                  </div>

                  {activeCartStep === 1 && (
                    <div className="space-y-2 text-slate-200">
                      <p className="font-semibold text-white">"Hi Priya! Did you forget something? 🛍️"</p>
                      <p className="text-slate-400 text-[11px]">
                        Your Organic Vitamin C Serum is waiting for you in your shopping cart. Click below to continue right where you left off.
                      </p>
                      <div className="p-2.5 bg-slate-900 rounded-xl text-emerald-400 font-mono text-[11px] font-bold border border-emerald-500/20">
                        Cart Value: ₹1,499 • 1-Click Restore
                      </div>
                    </div>
                  )}

                  {activeCartStep === 2 && (
                    <div className="space-y-2 text-slate-200">
                      <p className="font-semibold text-white">"Special treat for you, Priya! 🎁"</p>
                      <p className="text-slate-400 text-[11px]">
                        We reserved your items. Take an extra 10% off with coupon <strong>SAVE10</strong> valid for the next 2 hours.
                      </p>
                      <div className="p-2.5 bg-emerald-950/60 rounded-xl text-emerald-300 font-mono text-[11px] font-bold border border-emerald-500/30">
                        Discounted Cart: ₹1,349 (Save ₹150)
                      </div>
                    </div>
                  )}

                  {activeCartStep === 3 && (
                    <div className="space-y-2 text-slate-200">
                      <p className="font-semibold text-white">"Last call! Stock is running low ⏳"</p>
                      <p className="text-slate-400 text-[11px]">
                        Only 2 bottles remain in our warehouse. Your reserved cart will be released at midnight.
                      </p>
                      <div className="p-2.5 bg-amber-950/60 rounded-xl text-amber-300 font-mono text-[11px] font-bold border border-amber-500/30">
                        Cart Expiring in 2 Hours
                      </div>
                    </div>
                  )}
                </div>
              </div>

              <div className="pt-6 mt-6 border-t border-white/10">
                <Link
                  to="/book-demo?plan=Starter%20D2C"
                  className="w-full bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs h-12 rounded-2xl flex items-center justify-center gap-2 shadow-[0_0_20px_rgba(16,185,129,0.35)]"
                >
                  <Calendar className="w-4 h-4" /> Book Demo for Cart Recovery
                </Link>
              </div>
            </div>

            {/* Feature 2: COD RTO Shield & Calculator */}
            <div className="lg:col-span-6 rounded-[32px] bg-slate-900/90 text-white p-7 sm:p-9 flex flex-col justify-between border border-emerald-500/30 shadow-[0_20px_60px_rgba(16,185,129,0.15)] backdrop-blur-2xl">
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="text-xs font-mono font-bold text-amber-400 uppercase bg-amber-400/10 border border-amber-400/30 px-3 py-1 rounded-full">
                    RTO Shield Calculator
                  </span>
                  <span className="text-xs font-mono text-emerald-400 font-semibold">Cut RTO by 40%+</span>
                </div>

                <h2 className="text-2xl font-bold text-white mb-2 font-display">
                  COD-to-Prepaid RTO Shield
                </h2>
                <p className="text-xs sm:text-sm text-slate-300 mb-6">
                  Indian D2C stores lose 25%–35% of COD revenue to courier penalties and return-to-origin loss. Conversio triggers an instant ₹50 UPI cashback prompt on WhatsApp.
                </p>

                <div className="space-y-5 mb-6">
                  <div>
                    <div className="flex justify-between text-xs font-semibold mb-2">
                      <span className="text-slate-300 font-mono">Monthly Orders:</span>
                      <span className="font-mono text-emerald-400 font-bold text-sm">{monthlyOrders.toLocaleString()} Orders</span>
                    </div>
                    <input
                      type="range"
                      min={500}
                      max={20000}
                      step={500}
                      value={monthlyOrders}
                      onChange={(e) => setMonthlyOrders(Number(e.target.value))}
                      className="w-full accent-emerald-500 cursor-pointer h-2 bg-slate-800 rounded-lg"
                    />
                  </div>

                  <div>
                    <div className="flex justify-between text-xs font-semibold mb-2">
                      <span className="text-slate-300 font-mono">COD Share %:</span>
                      <span className="font-mono text-amber-400 font-bold text-sm">{codPercentage}% COD</span>
                    </div>
                    <input
                      type="range"
                      min={20}
                      max={85}
                      step={5}
                      value={codPercentage}
                      onChange={(e) => setCodPercentage(Number(e.target.value))}
                      className="w-full accent-amber-500 cursor-pointer h-2 bg-slate-800 rounded-lg"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3 p-5 rounded-2xl bg-slate-950/80 border border-white/10 text-xs">
                  <div>
                    <span className="text-[10px] uppercase font-mono tracking-wider text-slate-400 block">
                      Saved from RTO Loss
                    </span>
                    <span className="text-xl sm:text-2xl font-mono font-extrabold text-white mt-1 block">
                      {savedOrders} Orders
                    </span>
                    <span className="text-[10px] text-slate-400">Avoided return courier fee</span>
                  </div>

                  <div>
                    <span className="text-[10px] uppercase font-mono tracking-wider text-emerald-400 block">
                      Est. Monthly Savings
                    </span>
                    <span className="text-xl sm:text-2xl font-mono font-extrabold text-emerald-400 mt-1 block">
                      ₹{totalMonthlyBenefit.toLocaleString()}
                    </span>
                    <span className="text-[10px] text-slate-400">Direct courier savings</span>
                  </div>
                </div>
              </div>

              <div className="pt-6 mt-6 border-t border-white/10">
                <Link
                  to="/book-demo?plan=Growth%20Tri-Channel"
                  className="w-full bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs h-12 rounded-2xl flex items-center justify-center gap-2 shadow-[0_0_20px_rgba(16,185,129,0.35)]"
                >
                  <Calendar className="w-4 h-4" /> Book Demo to Shield My Orders
                </Link>
              </div>
            </div>
          </div>

          {/* Feature 3 & 4: Voice COD Confirmation & NDR Courier Rescue */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-left">
            <div className="p-7 sm:p-9 rounded-[32px] bg-slate-900/60 border border-white/10 flex flex-col justify-between backdrop-blur-xl">
              <div>
                <div className="w-12 h-12 rounded-2xl bg-purple-500/20 text-purple-400 flex items-center justify-center mb-5 border border-purple-500/30">
                  <PhoneCall className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold text-white mb-2 font-display">
                  AI Voice Call COD Order Verification
                </h3>
                <p className="text-xs sm:text-sm text-slate-400 mb-5 leading-relaxed">
                  Autonomous conversational voice agent dials the buyer in Hindi or English to confirm shipping address before warehouse packing.
                </p>
                <div className="p-4 bg-slate-950 rounded-2xl border border-white/10 text-xs space-y-2 font-mono text-slate-300">
                  <p className="text-purple-400 font-bold">🤖 "Namaste Rahul! Calling from The Wellness Co to verify your COD order of ₹1,899. Are you available this Thursday?"</p>
                  <p className="text-slate-400">👤 "Yes, deliver to office."</p>
                  <span className="inline-block text-[10px] text-emerald-400 bg-emerald-950/80 border border-emerald-500/30 px-2 py-0.5 rounded-full font-bold">
                    ✓ Verified for Fulfillment
                  </span>
                </div>
              </div>
              <div className="mt-6 pt-5 border-t border-white/10">
                <Link
                  to="/book-demo"
                  className="w-full bg-slate-800 hover:bg-slate-700 text-white font-bold text-xs h-11 rounded-2xl flex items-center justify-center gap-2 border border-white/10"
                >
                  <Calendar className="w-4 h-4" /> Book AI Voice Demo
                </Link>
              </div>
            </div>

            <div className="p-7 sm:p-9 rounded-[32px] bg-slate-900/60 border border-white/10 flex flex-col justify-between backdrop-blur-xl">
              <div>
                <div className="w-12 h-12 rounded-2xl bg-blue-500/20 text-blue-400 flex items-center justify-center mb-5 border border-blue-500/30">
                  <Truck className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold text-white mb-2 font-display">
                  NDR Logistics Rescue (Shiprocket &amp; Delhivery)
                </h3>
                <p className="text-xs sm:text-sm text-slate-400 mb-5 leading-relaxed">
                  Courier marked "Customer Not Available"? Conversio catches the webhook and immediately sends an interactive WhatsApp message for address update or rescheduling.
                </p>
                <div className="p-4 bg-slate-950 rounded-2xl border border-white/10 text-xs space-y-2 font-mono text-slate-300">
                  <p className="text-blue-400 font-bold">📦 Delivery Exception: Customer premises locked.</p>
                  <p className="text-slate-400 text-[11px]">Options: [Reschedule for Tomorrow] | [Update Address] | [Cancel]</p>
                  <span className="inline-block text-[10px] text-blue-400 bg-blue-950/80 border border-blue-500/30 px-2 py-0.5 rounded-full font-bold">
                    ✓ 34% of failed shipments rescued
                  </span>
                </div>
              </div>
              <div className="mt-6 pt-5 border-t border-white/10">
                <Link
                  to="/book-demo"
                  className="w-full bg-slate-800 hover:bg-slate-700 text-white font-bold text-xs h-11 rounded-2xl flex items-center justify-center gap-2 border border-white/10"
                >
                  <Calendar className="w-4 h-4" /> Book NDR Rescue Demo
                </Link>
              </div>
            </div>
          </div>
        </div>
      </main>

      <PublicFooter />
    </div>
  );
}
