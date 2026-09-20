import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { PublicNavbar } from "@/components/PublicNavbar";
import { PublicFooter } from "@/components/PublicFooter";
import { AeoStructuredData } from "@/components/AeoStructuredData";
import { CalendarBookingModal } from "@/components/CalendarBookingModal";
import { SequenceBuilderWidget } from "@/components/home/SequenceBuilderWidget";
import { LeadCaptureHub } from "@/components/home/LeadCaptureHub";
import { AppointmentBookingWidget } from "@/components/home/AppointmentBookingWidget";
import { ChannelsDeepDive } from "@/components/home/ChannelsDeepDive";
import { IndustrySolutions } from "@/components/home/IndustrySolutions";
import { StackSavingsCalculator } from "@/components/home/StackSavingsCalculator";
import { RapidFaqSection } from "@/components/home/RapidFaqSection";
import {
  ArrowRight,
  BarChart3,
  Bot,
  Building2,
  Calendar,
  CalendarCheck,
  CheckCircle2,
  Clock,
  ExternalLink,
  Flame,
  Layers,
  Mail,
  MessageSquare,
  Phone,
  PhoneCall,
  RefreshCw,
  Send,
  Shield,
  ShieldCheck,
  ShoppingBag,
  ShoppingCart,
  Sparkles,
  Star,
  Target,
  TrendingUp,
  Truck,
  User,
  Users,
  Volume2,
  Zap,
} from "lucide-react";

export default function HomePage() {
  // Calendar Modal State
  const [calendarModalOpen, setCalendarModalOpen] = useState(false);
  const [selectedPlanForDemo, setSelectedPlanForDemo] = useState<string>("Growth Tri-Channel");

  // Hero interactive preview switcher: "retner" or "rapidsales"
  const [heroMode, setHeroMode] = useState<"retner" | "rapidsales">("retner");

  // Retner Cart Recovery Step Switcher
  const [activeCartStep, setActiveCartStep] = useState<1 | 2 | 3>(1);

  // Retner RTO Calculator States
  const [monthlyOrders, setMonthlyOrders] = useState<number>(2500);
  const [codPercentage, setCodPercentage] = useState<number>(65);

  // RapidSales Speed-to-lead Simulator
  const [simulatingSpeed, setSimulatingSpeed] = useState<boolean>(false);
  const [leadElapsedSec, setLeadElapsedSec] = useState<number>(0);

  // RapidSales Stop-on-reply simulation
  const [leadHasReplied, setLeadHasReplied] = useState<boolean>(false);

  // Pricing Billing Cycle
  const [isAnnual, setIsAnnual] = useState<boolean>(true);

  useEffect(() => {
    document.title = "Conversio AI — D2C Retention & Tri-Channel Sales Engine";
  }, []);

  // Calculate RTO Financial Impact
  const codOrders = Math.round((monthlyOrders * codPercentage) / 100);
  const typicalRtoCount = Math.round(codOrders * 0.28); // 28% typical RTO without shield
  const protectedRtoCount = Math.round(codOrders * 0.11); // 11% with shield
  const savedOrders = typicalRtoCount - protectedRtoCount;
  const avgOrderValue = 1850;
  const courierCostPerRto = 160;
  const directCourierSavings = savedOrders * courierCostPerRto;
  const recoveredRevenue = Math.round(savedOrders * avgOrderValue * 0.85);
  const totalMonthlyBenefit = directCourierSavings + recoveredRevenue;

  // Trigger Speed-to-lead simulation
  const handleStartSpeedTest = () => {
    setSimulatingSpeed(true);
    setLeadElapsedSec(0);
    const interval = setInterval(() => {
      setLeadElapsedSec((prev) => {
        if (prev >= 48) {
          clearInterval(interval);
          setSimulatingSpeed(false);
          return 48;
        }
        return prev + 2;
      });
    }, 70);
  };

  const openDemoModalWithPlan = (plan: string) => {
    setSelectedPlanForDemo(plan);
    setCalendarModalOpen(true);
  };

  return (
    <div className="min-h-screen bg-[#030712] text-slate-100 font-sans selection:bg-emerald-500 selection:text-black overflow-x-hidden relative">
      {/* Dynamic Background Mesh Glow & Dot Matrix */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute top-0 left-1/4 w-[650px] h-[500px] bg-emerald-600/10 rounded-full blur-[140px]" />
        <div className="absolute top-1/3 right-1/4 w-[550px] h-[450px] bg-blue-600/10 rounded-full blur-[140px]" />
        <div className="absolute bottom-1/4 left-1/3 w-[600px] h-[500px] bg-purple-600/10 rounded-full blur-[140px]" />
        <div
          className="absolute inset-0 opacity-[0.14]"
          style={{
            backgroundImage: "radial-gradient(rgba(255, 255, 255, 0.2) 1px, transparent 1px)",
            backgroundSize: "32px 32px",
          }}
        />
      </div>

      {/* SEO & AEO Structured Schemas */}
      <AeoStructuredData />

      {/* Floating Dark Glass Public Navbar */}
      <PublicNavbar />

      {/* ========================================================================= */}
      {/* SECTION 1: VIBE-CODED HERO SECTION                                        */}
      {/* ========================================================================= */}
      <section className="relative pt-36 sm:pt-44 pb-20 md:pb-28 overflow-hidden z-10">
        <div className="container mx-auto px-4 sm:px-6 relative text-center">
          
          {/* Neon Floating Badge */}
          <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-slate-900/90 border border-emerald-500/40 text-emerald-400 text-xs font-mono font-semibold mb-8 shadow-[0_0_25px_rgba(16,185,129,0.25)] backdrop-blur-xl">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
            </span>
            <span>CONVERSIO D2C RETENTION + TRI-CHANNEL SALES OUTBOUND</span>
          </div>

          {/* Main Display Headline */}
          <h1 className="text-4xl sm:text-6xl md:text-7xl lg:text-[76px] font-display font-extrabold tracking-tight text-white max-w-5xl mx-auto leading-[1.08] mb-6">
            The Autonomous AI Engine for{" "}
            <span className="bg-gradient-to-r from-emerald-400 via-teal-300 to-cyan-400 bg-clip-text text-transparent">
              WhatsApp Retention &amp; Tri-Channel Sales
            </span>
          </h1>

          {/* Subtitle */}
          <p className="text-base sm:text-xl text-slate-400 max-w-3xl mx-auto mb-12 leading-relaxed font-normal">
            Unite Conversio's 3-step WhatsApp abandoned cart recovery &amp; COD-to-prepaid RTO shield with autonomous tri-channel outreach (WhatsApp + Email + AI Voice). Turn lost traffic into repeat revenue and book qualified demos on autopilot.
          </p>

          {/* Glowing Hero CTAs */}
          <div className="flex flex-col sm:flex-row justify-center items-center gap-4 mb-16 px-4 sm:px-0 max-w-md mx-auto">
            <Button
              onClick={() => openDemoModalWithPlan("Growth Tri-Channel")}
              className="w-full sm:w-auto h-13 px-8 rounded-full bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-sm shadow-[0_0_30px_rgba(16,185,129,0.45)] hover:shadow-[0_0_40px_rgba(16,185,129,0.65)] flex items-center justify-center gap-2.5 transition-all transform active:scale-95 cursor-pointer border border-emerald-400/30"
            >
              <Calendar className="w-4 h-4 text-white" />
              <span>Book a Demo (Connect Calendar)</span>
              <ArrowRight className="w-4 h-4 text-emerald-200" />
            </Button>

            <a
              href="#d2c-retention"
              className="w-full sm:w-auto h-13 px-8 rounded-full bg-slate-900/80 hover:bg-slate-800 text-slate-200 hover:text-white border border-white/10 font-bold text-sm flex items-center justify-center gap-2 transition-all backdrop-blur-xl shadow-md"
            >
              <ShoppingBag className="w-4 h-4 text-emerald-400" />
              <span>Explore Features</span>
            </a>
          </div>

          {/* Neon Metric Badges */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 max-w-4xl mx-auto mb-16">
            <div className="p-4 sm:p-5 rounded-3xl bg-slate-900/60 border border-white/10 shadow-[0_8px_32px_rgba(0,0,0,0.37)] backdrop-blur-xl hover:border-emerald-500/40 transition-all text-center group">
              <div className="text-2xl sm:text-3xl font-extrabold font-mono text-emerald-400 group-hover:scale-105 transition-transform">+24.8%</div>
              <div className="text-xs font-semibold text-slate-200 mt-1">Cart Recovery Rate</div>
              <div className="text-[10px] text-slate-400 font-mono mt-0.5">Conversio 3-Step WhatsApp</div>
            </div>

            <div className="p-4 sm:p-5 rounded-3xl bg-slate-900/60 border border-white/10 shadow-[0_8px_32px_rgba(0,0,0,0.37)] backdrop-blur-xl hover:border-blue-500/40 transition-all text-center group">
              <div className="text-2xl sm:text-3xl font-extrabold font-mono text-blue-400 group-hover:scale-105 transition-transform">-42%</div>
              <div className="text-xs font-semibold text-slate-200 mt-1">RTO Return Loss</div>
              <div className="text-[10px] text-slate-400 font-mono mt-0.5">COD to Prepaid Incentive</div>
            </div>

            <div className="p-4 sm:p-5 rounded-3xl bg-slate-900/60 border border-white/10 shadow-[0_8px_32px_rgba(0,0,0,0.37)] backdrop-blur-xl hover:border-orange-500/40 transition-all text-center group">
              <div className="text-2xl sm:text-3xl font-extrabold font-mono text-orange-400 group-hover:scale-105 transition-transform">&lt; 48s</div>
              <div className="text-xs font-semibold text-slate-200 mt-1">Speed-to-Lead Response</div>
              <div className="text-[10px] text-slate-400 font-mono mt-0.5">Conversio Auto-Dialer</div>
            </div>

            <div className="p-4 sm:p-5 rounded-3xl bg-slate-900/60 border border-white/10 shadow-[0_8px_32px_rgba(0,0,0,0.37)] backdrop-blur-xl hover:border-purple-500/40 transition-all text-center group">
              <div className="text-2xl sm:text-3xl font-extrabold font-mono text-purple-400 group-hover:scale-105 transition-transform">8.4x</div>
              <div className="text-xs font-semibold text-slate-200 mt-1">Average Campaign ROI</div>
              <div className="text-[10px] text-slate-400 font-mono mt-0.5">Verified Across 700+ Brands</div>
            </div>
          </div>

          {/* ========================================================================= */}
          {/* INTERACTIVE DUAL-ENGINE HERO SHOWCASE                                     */}
          {/* ========================================================================= */}
          <div className="max-w-5xl mx-auto rounded-[32px] bg-slate-950/80 border border-white/15 p-5 sm:p-8 shadow-[0_25px_80px_rgba(0,0,0,0.9)] backdrop-blur-2xl text-left text-white overflow-hidden relative">
            {/* Ambient Corner Flare */}
            <div className="absolute top-0 right-0 w-80 h-80 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />

            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-6 border-b border-white/10 relative z-10">
              <div>
                <span className="text-[11px] font-mono uppercase tracking-widest text-emerald-400 font-bold flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5" /> LIVE AUTONOMOUS SANDBOX PREVIEW
                </span>
                <h3 className="text-lg sm:text-2xl font-bold text-white mt-1 font-display">
                  Experience Conversio's Integrated Dual Engine
                </h3>
              </div>

              {/* Mode Toggle Buttons */}
              <div className="inline-flex p-1.5 rounded-full bg-slate-900/90 border border-white/10 shrink-0">
                <button
                  type="button"
                  onClick={() => setHeroMode("retner")}
                  className={`px-4 py-2 rounded-full text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
                    heroMode === "retner"
                      ? "bg-emerald-600 text-white shadow-[0_0_15px_rgba(16,185,129,0.4)]"
                      : "text-slate-400 hover:text-white"
                  }`}
                >
                  <ShoppingBag className="w-3.5 h-3.5" /> D2C Retention Engine
                </button>
                <button
                  type="button"
                  onClick={() => setHeroMode("rapidsales")}
                  className={`px-4 py-2 rounded-full text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
                    heroMode === "rapidsales"
                      ? "bg-blue-600 text-white shadow-[0_0_15px_rgba(59,130,246,0.4)]"
                      : "text-slate-400 hover:text-white"
                  }`}
                >
                  <Flame className="w-3.5 h-3.5" /> Tri-Channel Sales Engine
                </button>
              </div>
            </div>

            {/* TAB 1: RETNER PREVIEW */}
            {heroMode === "retner" && (
              <div className="pt-8 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-10">
                {/* Left: Workflow Explainer */}
                <div className="lg:col-span-6 space-y-4">
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-mono font-semibold">
                    <ShoppingBag className="w-3.5 h-3.5" /> E-COMMERCE CART &amp; COD ENGINE
                  </div>
                  <h4 className="text-2xl sm:text-3xl font-bold text-white font-display">
                    Automated WhatsApp Recovery &amp; RTO Shield
                  </h4>
                  <p className="text-sm text-slate-300 leading-relaxed">
                    When a buyer abandons checkout on Shopify or WooCommerce, Conversio automatically dispatches an intent-driven 3-step WhatsApp sequence, then converts risky COD orders into instant prepaid UPI transactions.
                  </p>
                  
                  <div className="space-y-3 pt-2">
                    <div className="flex items-center gap-3 text-xs text-slate-200">
                      <div className="w-5 h-5 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center shrink-0">
                        <CheckCircle2 className="w-3.5 h-3.5" />
                      </div>
                      <span><strong>15m Drip:</strong> High-res product image with 1-click cart restore link</span>
                    </div>
                    <div className="flex items-center gap-3 text-xs text-slate-200">
                      <div className="w-5 h-5 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center shrink-0">
                        <CheckCircle2 className="w-3.5 h-3.5" />
                      </div>
                      <span><strong>COD RTO Shield:</strong> Automated ₹50 UPI prepaid cashback prompt</span>
                    </div>
                    <div className="flex items-center gap-3 text-xs text-slate-200">
                      <div className="w-5 h-5 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center shrink-0">
                        <CheckCircle2 className="w-3.5 h-3.5" />
                      </div>
                      <span><strong>NDR Rescue:</strong> Shiprocket/Delhivery failed delivery instant reschedule</span>
                    </div>
                  </div>

                  <div className="pt-3">
                    <Button
                      onClick={() => openDemoModalWithPlan("Starter D2C")}
                      className="bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold rounded-full h-11 px-6 gap-2 cursor-pointer shadow-[0_0_20px_rgba(16,185,129,0.35)]"
                    >
                      <Calendar className="w-3.5 h-3.5" /> Schedule Retention Demo
                    </Button>
                  </div>
                </div>

                {/* Right: Realistic iPhone Frame with WhatsApp UI */}
                <div className="lg:col-span-6 flex justify-center">
                  <div className="w-full max-w-[360px] rounded-[36px] p-3.5 bg-gradient-to-b from-slate-800 via-slate-900 to-black border-4 border-slate-700/80 shadow-[0_25px_60px_rgba(0,0,0,0.9)] relative">
                    {/* iPhone Dynamic Island */}
                    <div className="w-24 h-4 bg-black rounded-full mx-auto mb-3 flex items-center justify-end px-2">
                      <div className="w-1.5 h-1.5 rounded-full bg-slate-900" />
                    </div>

                    {/* WhatsApp Screen */}
                    <div className="bg-[#0b141a] rounded-[24px] p-3.5 text-xs text-slate-200 space-y-3 font-sans border border-white/5">
                      {/* Chat Header */}
                      <div className="flex items-center justify-between pb-2 border-b border-white/10 text-xs">
                        <div className="flex items-center gap-2">
                          <div className="w-7 h-7 rounded-full bg-emerald-600 flex items-center justify-center font-bold text-white text-[11px]">
                            C
                          </div>
                          <div>
                            <span className="font-bold text-white flex items-center gap-1 text-[11px]">
                              Conversio Store <CheckCircle2 className="w-3 h-3 text-emerald-400" />
                            </span>
                            <span className="text-[9px] text-emerald-400 font-mono block">Verified Business</span>
                          </div>
                        </div>
                        <span className="text-[9px] text-slate-400">2:45 PM</span>
                      </div>

                      {/* WhatsApp Message Bubble */}
                      <div className="bg-[#202c33] rounded-2xl rounded-tl-xs p-3 text-xs text-slate-200 space-y-2 shadow-md">
                        <p className="font-semibold text-white text-[11px]">
                          Hey Arjun! 👋 We noticed you left items in your cart:
                        </p>
                        <div className="bg-[#111b21] p-2.5 rounded-xl border border-slate-700/60 flex items-center gap-2.5">
                          <div className="w-9 h-9 rounded-lg bg-emerald-950 border border-emerald-700/50 flex items-center justify-center text-sm">
                            👟
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="text-white font-bold text-[11px] truncate">Air Running Shoes (Size 9)</p>
                            <p className="text-emerald-400 font-mono text-[10px]">Total: ₹2,499</p>
                          </div>
                        </div>
                        <p className="text-[10px] text-slate-300">
                          Use code <span className="font-mono font-bold text-amber-400 bg-amber-400/10 px-1 py-0.5 rounded">SAVE10</span> for extra 10% off + Free Shipping!
                        </p>
                        <div className="pt-1 space-y-1.5">
                          <button
                            type="button"
                            onClick={() => openDemoModalWithPlan("Starter D2C")}
                            className="w-full py-2 bg-emerald-600 hover:bg-emerald-500 rounded-xl text-white font-bold text-[11px] flex items-center justify-center gap-1.5 transition-all shadow-[0_0_12px_rgba(16,185,129,0.35)] cursor-pointer"
                          >
                            <ShoppingCart className="w-3 h-3" /> Complete Order Now (₹2,249)
                          </button>
                          <button
                            type="button"
                            onClick={() => openDemoModalWithPlan("Growth Tri-Channel")}
                            className="w-full py-1.5 bg-[#2a3942] hover:bg-[#32444f] rounded-xl text-slate-200 text-[10px] font-semibold flex items-center justify-center gap-1 transition-colors cursor-pointer"
                          >
                            ⚡ Convert COD to Prepaid (Save ₹50 Extra)
                          </button>
                        </div>
                        <span className="block text-[8px] text-right text-slate-400 font-mono">2:45 PM ✓✓</span>
                      </div>

                      <div className="bg-[#005c4b] rounded-2xl rounded-tr-xs p-2.5 text-[11px] text-white max-w-[85%] ml-auto space-y-1 shadow-md">
                        <p>Order confirmed via UPI Prepaid! Thank you! 🎉</p>
                        <span className="block text-[8px] text-right text-emerald-200 font-mono">2:47 PM ✓✓</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* TAB 2: RAPIDSALES PREVIEW */}
            {heroMode === "rapidsales" && (
              <div className="pt-8 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-10">
                {/* Left: RapidSales Explainer */}
                <div className="lg:col-span-6 space-y-4">
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/30 text-blue-400 text-xs font-mono font-semibold">
                    <Flame className="w-3.5 h-3.5" /> TRI-CHANNEL OUTBOUND CADENCES
                  </div>
                  <h4 className="text-2xl sm:text-3xl font-bold text-white font-display">
                    WhatsApp + Email + AI Voice Cadences with Stop-on-Reply
                  </h4>
                  <p className="text-sm text-slate-300 leading-relaxed">
                    Stop letting leads grow cold. Conversio orchestrates multi-channel touchpoints within seconds of inquiry. As soon as the prospect replies on any channel, the sequence instantly pauses to prevent awkward double-messaging.
                  </p>

                  <div className="space-y-3 pt-2">
                    <div className="flex items-center gap-3 text-xs text-slate-200">
                      <div className="w-5 h-5 rounded-full bg-blue-500/20 text-blue-400 flex items-center justify-center shrink-0">
                        <CheckCircle2 className="w-3.5 h-3.5" />
                      </div>
                      <span><strong>Sub-60s Speed-to-Lead:</strong> Automated WhatsApp hello + AI voice dialer</span>
                    </div>
                    <div className="flex items-center gap-3 text-xs text-slate-200">
                      <div className="w-5 h-5 rounded-full bg-blue-500/20 text-blue-400 flex items-center justify-center shrink-0">
                        <CheckCircle2 className="w-3.5 h-3.5" />
                      </div>
                      <span><strong>Stop-on-Reply Engine:</strong> Instantly suspends upcoming drips upon lead reply</span>
                    </div>
                    <div className="flex items-center gap-3 text-xs text-slate-200">
                      <div className="w-5 h-5 rounded-full bg-blue-500/20 text-blue-400 flex items-center justify-center shrink-0">
                        <CheckCircle2 className="w-3.5 h-3.5" />
                      </div>
                      <span><strong>Calendar Auto-Booking:</strong> Conversational AI books Google Calendar slots live</span>
                    </div>
                  </div>

                  <div className="pt-3">
                    <Button
                      onClick={() => openDemoModalWithPlan("Growth Tri-Channel")}
                      className="bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold rounded-full h-11 px-6 gap-2 cursor-pointer shadow-[0_0_20px_rgba(59,130,246,0.35)]"
                    >
                      <Calendar className="w-3.5 h-3.5" /> Schedule Sales Demo
                    </Button>
                  </div>
                </div>

                {/* Right: Tri-Channel Timeline Simulation */}
                <div className="lg:col-span-6 flex justify-center">
                  <div className="w-full max-w-[400px] rounded-3xl bg-slate-900/90 border border-white/10 p-5 shadow-2xl space-y-3 font-sans">
                    <div className="flex items-center justify-between pb-2 border-b border-white/10 text-xs">
                      <span className="font-bold text-white flex items-center gap-1.5 font-mono text-[11px]">
                        <Flame className="w-3.5 h-3.5 text-orange-400" /> B2B ENTERPRISE OUTBOUND
                      </span>
                      <span className="text-[9px] font-mono text-emerald-400 bg-emerald-950/80 px-2 py-0.5 rounded-full border border-emerald-500/30">
                        LIVE CADENCE
                      </span>
                    </div>

                    {/* Step 1: WhatsApp */}
                    <div className="p-3 rounded-2xl bg-slate-950 border border-white/10 flex items-start gap-3">
                      <div className="w-8 h-8 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center shrink-0 mt-0.5">
                        <MessageSquare className="w-4 h-4" />
                      </div>
                      <div className="flex-1 min-w-0 text-xs">
                        <div className="flex items-center justify-between">
                          <span className="font-bold text-white text-[11px]">Channel 1: WhatsApp Intro</span>
                          <span className="text-[9px] text-emerald-400 font-mono">00:08s (Sent)</span>
                        </div>
                        <p className="text-slate-400 text-[11px] mt-1">
                          "Hi Vikram, saw your inquiry about WhatsApp Cloud API pricing..."
                        </p>
                      </div>
                    </div>

                    {/* Step 2: Email */}
                    <div className="p-3 rounded-2xl bg-slate-950 border border-white/10 flex items-start gap-3">
                      <div className="w-8 h-8 rounded-xl bg-blue-500/20 text-blue-400 flex items-center justify-center shrink-0 mt-0.5">
                        <Mail className="w-4 h-4" />
                      </div>
                      <div className="flex-1 min-w-0 text-xs">
                        <div className="flex items-center justify-between">
                          <span className="font-bold text-white text-[11px]">Channel 2: Executive Case Study</span>
                          <span className="text-[9px] text-blue-400 font-mono">Day 2 (Queued)</span>
                        </div>
                        <p className="text-slate-400 text-[11px] mt-1">
                          "How Kadam Leather scaled to ₹1.8 Cr/mo with Conversio AI..."
                        </p>
                      </div>
                    </div>

                    {/* Step 3: AI Voice Call */}
                    <div className="p-3 rounded-2xl bg-slate-950 border border-white/10 flex items-start gap-3">
                      <div className="w-8 h-8 rounded-xl bg-purple-500/20 text-purple-400 flex items-center justify-center shrink-0 mt-0.5">
                        <PhoneCall className="w-4 h-4" />
                      </div>
                      <div className="flex-1 min-w-0 text-xs">
                        <div className="flex items-center justify-between">
                          <span className="font-bold text-white text-[11px]">Channel 3: AI Voice Dialer</span>
                          <span className="text-[9px] text-purple-400 font-mono">Day 3 (Pending)</span>
                        </div>
                        {/* Audio equalizer animation */}
                        <div className="flex items-center gap-1 mt-1.5">
                          <span className="w-1 h-3 bg-purple-400 rounded-full animate-pulse" />
                          <span className="w-1 h-5 bg-purple-300 rounded-full animate-pulse delay-75" />
                          <span className="w-1 h-2 bg-purple-400 rounded-full animate-pulse delay-150" />
                          <span className="w-1 h-4 bg-purple-300 rounded-full animate-pulse delay-100" />
                          <span className="text-[10px] text-purple-300 font-mono ml-2">Voice Agent Armed</span>
                        </div>
                      </div>
                    </div>

                    {/* Interactive Stop-on-reply trigger */}
                    <div className="pt-3 border-t border-white/10 flex items-center justify-between">
                      <button
                        type="button"
                        onClick={() => setLeadHasReplied(!leadHasReplied)}
                        className={`text-xs font-mono font-bold px-3 py-2 rounded-xl border transition-all cursor-pointer ${
                          leadHasReplied
                            ? "bg-amber-500/20 border-amber-500 text-amber-300 shadow-[0_0_15px_rgba(245,158,11,0.3)]"
                            : "bg-slate-800 border-white/10 text-slate-300 hover:text-white"
                        }`}
                      >
                        {leadHasReplied ? "✓ Prospect Replied! (Cadence Paused)" : "Simulate Prospect Reply"}
                      </button>
                      <span className="text-[10px] font-mono text-slate-400">
                        {leadHasReplied ? "Stop-on-Reply: ACTIVE" : "Monitoring Inbound"}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* ========================================================================= */}

      {/* ========================================================================= */}
      {/* SECTION 2: CONVERSIO D2C E-COMMERCE RETENTION                             */}
      {/* ========================================================================= */}
      <section id="d2c-retention" className="py-24 sm:py-32 relative z-10">
        <div className="container mx-auto px-4 sm:px-6 max-w-6xl">
          {/* Section Heading */}
          <div className="text-center max-w-3xl mx-auto mb-20">
            <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-emerald-500/10 text-emerald-400 text-xs font-mono font-bold mb-4 border border-emerald-500/30">
              <ShoppingBag className="w-3.5 h-3.5" /> CONVERSIO D2C RETENTION POWERHOUSE
            </div>
            <h2 className="text-3xl sm:text-5xl font-display font-extrabold text-white tracking-tight leading-tight">
              Stop Abandoned Carts &amp; Eliminate RTO Nightmares
            </h2>
            <p className="text-slate-400 text-base sm:text-lg mt-4">
              Conversio transforms lost browser intent into cold cash. Every abandoned checkout gets automated WhatsApp recovery, while risky COD orders get converted into instant prepaid UPI sales.
            </p>
          </div>

          {/* GRID: FEATURE 1 (3-Step Drip) & FEATURE 2 (COD RTO Shield Calculator) */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch mb-12">
            {/* FEATURE 1: 3-Step WhatsApp Abandoned Cart Drip */}
            <div id="retner-cart" className="lg:col-span-6 rounded-[32px] bg-slate-900/60 border border-white/10 p-7 sm:p-9 flex flex-col justify-between backdrop-blur-2xl shadow-2xl">
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="text-xs font-mono font-bold text-emerald-400 uppercase bg-emerald-500/10 border border-emerald-500/30 px-3 py-1 rounded-full">
                    3-Step Recovery Drip
                  </span>
                  <span className="text-xs font-mono text-slate-400 font-semibold">22.4% Avg Recovery</span>
                </div>

                <h3 className="text-2xl font-bold text-white mb-2 font-display">
                  Smart Timed WhatsApp Follow-ups
                </h3>
                <p className="text-xs sm:text-sm text-slate-400 mb-6">
                  Click each phase below to see how Conversio reaches customers across a 24-hour psychological conversion curve.
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

                {/* Dynamic WhatsApp Preview Bubble */}
                <div className="rounded-2xl bg-slate-950 border border-white/10 p-4 shadow-inner text-xs space-y-3">
                  <div className="flex items-center justify-between border-b border-white/10 pb-2 text-[11px] text-slate-400">
                    <span className="font-semibold text-emerald-400">Conversio WhatsApp Gateway</span>
                    <span className="font-mono">
                      {activeCartStep === 1 && "+15 Mins after abandonment"}
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
                <Button
                  onClick={() => openDemoModalWithPlan("Starter D2C")}
                  className="w-full bg-slate-800 hover:bg-slate-700 text-white font-bold text-xs h-12 rounded-2xl cursor-pointer transition-all border border-white/10"
                >
                  Book Demo for Cart Recovery
                </Button>
              </div>
            </div>

            {/* FEATURE 2: COD-to-Prepaid RTO Shield & Interactive Calculator */}
            <div id="retner-cod" className="lg:col-span-6 rounded-[32px] bg-slate-900/90 text-white p-7 sm:p-9 flex flex-col justify-between border border-emerald-500/30 shadow-[0_20px_60px_rgba(16,185,129,0.15)] backdrop-blur-2xl">
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="text-xs font-mono font-bold text-amber-400 uppercase bg-amber-400/10 border border-amber-400/30 px-3 py-1 rounded-full">
                    RTO Shield Calculator
                  </span>
                  <span className="text-xs font-mono text-emerald-400 font-semibold">Cut RTO by 40%+</span>
                </div>

                <h3 className="text-2xl font-bold text-white mb-2 font-display">
                  Calculate Your Monthly RTO Savings
                </h3>
                <p className="text-xs sm:text-sm text-slate-300 mb-6">
                  COD orders suffer from 25%–35% Return-to-Origin rates in India. Conversio prompts buyers with an instant ₹50 UPI cashback to convert COD into verified Prepaid.
                </p>

                {/* Sliders */}
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

                {/* Calculation Outputs */}
                <div className="grid grid-cols-2 gap-3 p-5 rounded-2xl bg-slate-950/80 border border-white/10 text-xs">
                  <div>
                    <span className="text-[10px] uppercase font-mono tracking-wider text-slate-400 block">
                      Saved from RTO Loss
                    </span>
                    <span className="text-xl sm:text-2xl font-mono font-extrabold text-white mt-1 block">
                      {savedOrders} Orders
                    </span>
                    <span className="text-[10px] text-slate-400">Avoided courier penalty</span>
                  </div>

                  <div>
                    <span className="text-[10px] uppercase font-mono tracking-wider text-emerald-400 block">
                      Est. Monthly Savings
                    </span>
                    <span className="text-xl sm:text-2xl font-mono font-extrabold text-emerald-400 mt-1 block">
                      ₹{totalMonthlyBenefit.toLocaleString()}
                    </span>
                    <span className="text-[10px] text-slate-400">Courier + recovered cash</span>
                  </div>
                </div>
              </div>

              <div className="pt-6 mt-6 border-t border-white/10">
                <Button
                  onClick={() => openDemoModalWithPlan("Growth Tri-Channel")}
                  className="w-full bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs h-12 rounded-2xl cursor-pointer shadow-[0_0_20px_rgba(16,185,129,0.4)]"
                >
                  Book Demo to Protect My Orders
                </Button>
              </div>
            </div>
          </div>

          {/* GRID: FEATURE 3 (AI Voice COD Verification) & FEATURE 4 (NDR Delivery Rescue) */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* FEATURE 3: AI Voice COD Verification Call */}
            <div className="p-7 sm:p-8 rounded-[32px] bg-slate-900/60 border border-white/10 flex flex-col justify-between backdrop-blur-xl">
              <div>
                <div className="w-12 h-12 rounded-2xl bg-purple-500/20 text-purple-400 flex items-center justify-center mb-5 border border-purple-500/30">
                  <PhoneCall className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold text-white mb-2 font-display">
                  AI Voice Agent for COD Confirmation
                </h3>
                <p className="text-xs sm:text-sm text-slate-400 mb-5 leading-relaxed">
                  Before fulfilling Cash-on-Delivery shipments, our conversational AI Voice agent auto-dials the customer in English or Hindi, confirms address accuracy, and verifies customer intent.
                </p>

                <div className="p-4 bg-slate-950 rounded-2xl border border-white/10 text-xs space-y-2 font-mono text-slate-300">
                  <p className="text-purple-400 font-bold flex items-center gap-1.5">
                    <Volume2 className="w-4 h-4 text-purple-400" />
                    AI Voice: "Namaste Rahul! Calling from The Wellness Co to confirm your COD order of ₹1,899. Are you available to receive it this Thursday?"
                  </p>
                  <p className="text-slate-400">👤 Customer: "Yes, please ship it to my office address."</p>
                  <span className="inline-block text-[10px] text-emerald-400 bg-emerald-950/80 border border-emerald-500/30 px-2 py-0.5 rounded-full font-bold mt-1">
                    ✓ Status: Verified for Dispatch
                  </span>
                </div>
              </div>

              <div className="mt-6 pt-5 border-t border-white/10">
                <Button
                  variant="outline"
                  onClick={() => openDemoModalWithPlan("Growth Tri-Channel")}
                  className="w-full border-white/10 bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold rounded-2xl h-11 cursor-pointer"
                >
                  See AI Calling Demo
                </Button>
              </div>
            </div>

            {/* FEATURE 4: NDR Delivery Rescue (Shiprocket / Delhivery) */}
            <div id="retner-ndr" className="p-7 sm:p-8 rounded-[32px] bg-slate-900/60 border border-white/10 flex flex-col justify-between backdrop-blur-xl">
              <div>
                <div className="w-12 h-12 rounded-2xl bg-blue-500/20 text-blue-400 flex items-center justify-center mb-5 border border-blue-500/30">
                  <Truck className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold text-white mb-2 font-display">
                  NDR Delivery Rescue (Shiprocket / Delhivery)
                </h3>
                <p className="text-xs sm:text-sm text-slate-400 mb-5 leading-relaxed">
                  Couriers mark "Customer Not Available" or "Wrong Address"? Conversio listens to webhooks from Shiprocket, Delhivery, Bluedart, and NimbusPost, dispatching an immediate WhatsApp rescue message with interactive reattempt booking.
                </p>

                <div className="p-4 bg-slate-950 rounded-2xl border border-white/10 text-xs space-y-2 font-mono text-slate-300">
                  <p className="text-blue-400 font-bold">📦 Delivery Alert: Delivery attempt unsuccessful (Door locked).</p>
                  <p className="text-slate-400 text-[11px]">Interactive Options sent to buyer: [Reschedule for Tomorrow] | [Update Delivery Address] | [Cancel]</p>
                  <span className="inline-block text-[10px] text-blue-400 bg-blue-950/80 border border-blue-500/30 px-2 py-0.5 rounded-full font-bold mt-1">
                    ✓ 34% of failed shipments rescued
                  </span>
                </div>
              </div>

              <div className="mt-6 pt-5 border-t border-white/10">
                <Button
                  variant="outline"
                  onClick={() => openDemoModalWithPlan("Starter D2C")}
                  className="w-full border-white/10 bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold rounded-2xl h-11 cursor-pointer"
                >
                  See NDR Automation Demo
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* SECTION 3: CONVERSIO TRI-CHANNEL OUTBOUND SALES & AUTONOMOUS AGENTS       */}
      {/* ========================================================================= */}
      <section id="tri-channel-sales" className="py-24 sm:py-32 bg-slate-950/90 border-t border-white/10 relative z-10">
        <div className="container mx-auto px-4 sm:px-6 max-w-6xl space-y-20 sm:space-y-28">
          
          {/* Main Section Header */}
          <div className="text-center max-w-4xl mx-auto">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-500/10 text-blue-400 text-xs font-mono font-bold mb-5 border border-blue-500/30">
              <Flame className="w-4 h-4 text-orange-400" /> CONVERSIO TRI-CHANNEL REVENUE &amp; SALES ENGINE
            </div>
            <h2 className="text-3xl sm:text-5xl md:text-6xl font-display font-extrabold text-white tracking-tight leading-tight">
              Automate Email, WhatsApp &amp; AI Calls <br className="hidden sm:inline" />
              <span className="bg-gradient-to-r from-blue-400 via-cyan-300 to-emerald-400 bg-clip-text text-transparent">
                From One Autonomous Sales Dashboard
              </span>
            </h2>
            <p className="text-slate-300 text-sm sm:text-lg mt-5 max-w-3xl mx-auto leading-relaxed">
              70% of sales time gets lost when teams manage leads across separate platforms. Conversio brings your outreach together: launch email campaigns, send WhatsApp messages, run AI-powered voice calls, and track every touchpoint from one place.
            </p>

            {/* 4 Feature Highlights Strip from RapidSales */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-12 text-left">
              <div className="p-4 rounded-2xl bg-slate-900/60 border border-white/10 flex items-start gap-3 backdrop-blur-xl">
                <div className="w-8 h-8 rounded-xl bg-blue-500/20 text-blue-400 flex items-center justify-center shrink-0 mt-0.5">
                  <Layers className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-white">Tri-Channel Outreach</h4>
                  <p className="text-[11px] text-slate-400 mt-0.5">Sync Email, WhatsApp &amp; Voice</p>
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-slate-900/60 border border-white/10 flex items-start gap-3 backdrop-blur-xl">
                <div className="w-8 h-8 rounded-xl bg-purple-500/20 text-purple-400 flex items-center justify-center shrink-0 mt-0.5">
                  <PhoneCall className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-white">Human-Like AI Voice</h4>
                  <p className="text-[11px] text-slate-400 mt-0.5">Calls that sound 100% real</p>
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-slate-900/60 border border-white/10 flex items-start gap-3 backdrop-blur-xl">
                <div className="w-8 h-8 rounded-xl bg-amber-500/20 text-amber-400 flex items-center justify-center shrink-0 mt-0.5">
                  <Zap className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-white">Smart Handoff</h4>
                  <p className="text-[11px] text-slate-400 mt-0.5">Stops on reply &amp; alerts reps</p>
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-slate-900/60 border border-white/10 flex items-start gap-3 backdrop-blur-xl">
                <div className="w-8 h-8 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center shrink-0 mt-0.5">
                  <CalendarCheck className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-white">Unified Timeline</h4>
                  <p className="text-[11px] text-slate-400 mt-0.5">Every interaction in one view</p>
                </div>
              </div>
            </div>
          </div>

          {/* FEATURE 1: VISUAL MULTI-CHANNEL SEQUENCE BUILDER */}
          <div id="sequence-builder">
            <SequenceBuilderWidget onOpenDemo={openDemoModalWithPlan} />
          </div>

          {/* FEATURE 2: PLATFORM LEAD CAPTURE FROM EVERY SOURCE */}
          <div id="lead-capture">
            <LeadCaptureHub onOpenDemo={openDemoModalWithPlan} />
          </div>

          {/* FEATURE 3: THREE CHANNELS DEEP DIVE (AI VOICE, WHATSAPP, EMAIL) */}
          <div id="channel-capabilities">
            <ChannelsDeepDive onOpenDemo={openDemoModalWithPlan} />
          </div>

          {/* FEATURE 4: AI APPOINTMENT BOOKING SIMULATOR */}
          <div id="appointment-booking">
            <AppointmentBookingWidget onOpenDemo={openDemoModalWithPlan} />
          </div>

          {/* FEATURE 5: TAILORED INDUSTRY BLUEPRINTS */}
          <div id="industry-solutions">
            <IndustrySolutions onOpenDemo={openDemoModalWithPlan} />
          </div>

          {/* FEATURE 6: CONSOLIDATED STACK SAVINGS CALCULATOR */}
          <div id="stack-savings">
            <StackSavingsCalculator onOpenDemo={openDemoModalWithPlan} />
          </div>

          {/* FEATURE 7: INTERACTIVE SPEED-TO-LEAD (<60s) STOPWATCH BENCHMARK */}
          <div className="rounded-[32px] bg-slate-950 border border-white/10 p-7 sm:p-12 text-center max-w-3xl mx-auto shadow-2xl relative overflow-hidden">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-72 h-36 bg-emerald-500/15 rounded-full blur-3xl pointer-events-none" />

            <span className="text-xs font-mono uppercase tracking-widest text-emerald-400 font-bold block mb-2">
              SPEED-TO-LEAD BENCHMARK
            </span>
            <h3 className="text-2xl sm:text-3xl font-bold text-white font-display">
              Under 60 Seconds: Why Speed Dictates Closing Rates
            </h3>
            <p className="text-xs sm:text-sm text-slate-400 mt-2 max-w-xl mx-auto">
              Harvard Business Review proves responding to an incoming lead in under 5 minutes makes you 21x more likely to qualify them. Conversio automates this in under 48 seconds.
            </p>

            {/* Stopwatch Display */}
            <div className="my-7 p-6 rounded-3xl bg-slate-900 border border-white/10 max-w-md mx-auto shadow-inner">
              <div className="text-4xl sm:text-5xl font-mono font-extrabold text-emerald-400 tracking-wider">
                00:{leadElapsedSec < 10 ? `0${leadElapsedSec}` : leadElapsedSec}s
              </div>
              <div className="text-xs font-mono text-slate-400 mt-2.5">
                {leadElapsedSec === 0 && "Ready to simulate lead submission"}
                {leadElapsedSec > 0 && leadElapsedSec < 10 && "Website Lead Captured → Formatting WhatsApp..."}
                {leadElapsedSec >= 10 && leadElapsedSec < 40 && "WhatsApp Intro Delivered! Triggering AI Voice Agent..."}
                {leadElapsedSec >= 40 && "AI Voice Dialing Prospect! Meeting Slot Confirmed! 🎉"}
              </div>
            </div>

            <Button
              disabled={simulatingSpeed}
              onClick={handleStartSpeedTest}
              className="bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs h-12 px-8 rounded-full cursor-pointer shadow-[0_0_20px_rgba(16,185,129,0.4)] transition-all transform active:scale-95"
            >
              {simulatingSpeed ? "Running Sub-60s Simulation..." : "Test Speed-to-Lead Response"}
            </Button>
          </div>

          {/* FEATURE 8: FREQUENTLY ASKED QUESTIONS ACCORDION */}
          <div id="faq">
            <RapidFaqSection />
          </div>

        </div>
      </section>

      {/* ========================================================================= */}
      {/* SECTION 4: TRANSPARENT PRICING PLANS                                      */}
      {/* ========================================================================= */}
      <section id="pricing" className="py-24 sm:py-32 relative z-10">
        <div className="container mx-auto px-4 sm:px-6 max-w-6xl">
          {/* Pricing Header */}
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-xs font-mono font-bold uppercase tracking-widest text-emerald-400 bg-emerald-500/10 border border-emerald-500/30 px-3.5 py-1 rounded-full">
              TRANSPARENT PRICING
            </span>
            <h2 className="text-3xl sm:text-5xl font-display font-extrabold text-white tracking-tight mt-4">
              Invest in Outcomes, Not Empty Features
            </h2>
            <p className="text-slate-400 text-base sm:text-lg mt-3">
              All plans include official WhatsApp Cloud API access, zero hidden Meta markup, and direct calendar demo onboarding.
            </p>

            {/* Monthly / Annual Billing Toggle */}
            <div className="mt-8 inline-flex items-center gap-3 p-1.5 rounded-full bg-slate-900 border border-white/10 shadow-lg">
              <button
                type="button"
                onClick={() => setIsAnnual(false)}
                className={`px-5 py-2.5 rounded-full text-xs font-bold transition-all cursor-pointer ${
                  !isAnnual
                    ? "bg-slate-800 text-white shadow-md"
                    : "text-slate-400 hover:text-white"
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

          {/* 3 PRICING CARDS */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch mb-16">
            {/* TIER 1: Starter D2C */}
            <div className="rounded-[32px] bg-slate-900/60 border border-white/10 p-7 sm:p-9 flex flex-col justify-between shadow-2xl backdrop-blur-xl hover:border-white/20 transition-all">
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

                {/* Price Display */}
                <div className="mt-6 flex items-baseline">
                  <span className="text-4xl sm:text-5xl font-extrabold tracking-tight font-mono text-white">
                    ₹{isAnnual ? "2,799" : "3,499"}
                  </span>
                  <span className="ml-2 text-xs text-slate-400 font-semibold">/ month</span>
                </div>
                {isAnnual && (
                  <p className="text-[11px] text-emerald-400 font-semibold mt-1">Billed annually (₹33,588/yr)</p>
                )}

                {/* Features List */}
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
                  onClick={() => openDemoModalWithPlan("Starter D2C")}
                  className="w-full bg-slate-800 hover:bg-slate-700 text-white font-bold text-xs h-12 rounded-2xl cursor-pointer transition-all border border-white/10"
                >
                  Book Starter Demo
                </Button>
              </div>
            </div>

            {/* TIER 2: Growth Tri-Channel - FEATURED */}
            <div className="rounded-[32px] bg-slate-900/90 border-2 border-emerald-500 p-7 sm:p-9 flex flex-col justify-between shadow-[0_20px_60px_rgba(16,185,129,0.25)] relative ring-4 ring-emerald-500/10 backdrop-blur-2xl">
              {/* Highlight Tag */}
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

                {/* Price Display */}
                <div className="mt-6 flex items-baseline">
                  <span className="text-4xl sm:text-5xl font-extrabold tracking-tight font-mono text-emerald-400">
                    ₹{isAnnual ? "5,599" : "6,999"}
                  </span>
                  <span className="ml-2 text-xs text-slate-400 font-semibold">/ month</span>
                </div>
                {isAnnual && (
                  <p className="text-[11px] text-emerald-400 font-semibold mt-1">Billed annually (₹67,188/yr)</p>
                )}

                {/* Features List */}
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
                  onClick={() => openDemoModalWithPlan("Growth Tri-Channel")}
                  className="w-full bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs h-12 rounded-2xl cursor-pointer shadow-[0_0_25px_rgba(16,185,129,0.5)] transition-all transform active:scale-95"
                >
                  Book Growth Demo
                </Button>
              </div>
            </div>

            {/* TIER 3: Enterprise Scale */}
            <div className="rounded-[32px] bg-slate-900/60 border border-white/10 p-7 sm:p-9 flex flex-col justify-between shadow-2xl backdrop-blur-xl hover:border-white/20 transition-all">
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

                {/* Price Display */}
                <div className="mt-6 flex items-baseline">
                  <span className="text-4xl sm:text-5xl font-extrabold tracking-tight font-mono text-white">
                    ₹{isAnnual ? "11,999" : "14,999"}
                  </span>
                  <span className="ml-2 text-xs text-slate-400 font-semibold">/ month</span>
                </div>
                {isAnnual && (
                  <p className="text-[11px] text-emerald-400 font-semibold mt-1">Billed annually (₹1,43,988/yr)</p>
                )}

                {/* Features List */}
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
                  onClick={() => openDemoModalWithPlan("Enterprise Scale")}
                  className="w-full bg-slate-800 hover:bg-slate-700 text-white font-bold text-xs h-12 rounded-2xl cursor-pointer transition-all border border-white/10"
                >
                  Book Enterprise Demo
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* FINAL CALL TO ACTION                                                      */}
      {/* ========================================================================= */}
      <section className="py-24 sm:py-32 relative z-10">
        <div className="container mx-auto px-4 sm:px-6 max-w-5xl">
          <div className="rounded-[40px] bg-gradient-to-r from-slate-950 via-slate-900 to-emerald-950/90 border border-white/10 p-10 sm:p-16 text-center shadow-[0_25px_80px_rgba(0,0,0,0.8)] backdrop-blur-2xl relative overflow-hidden">
            <div className="absolute top-0 right-0 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-mono font-semibold mb-5">
              <Sparkles className="w-3.5 h-3.5 text-emerald-400 animate-pulse" /> START YOUR REVENUE ACCELERATION
            </div>
            <h2 className="text-3xl sm:text-5xl font-extrabold font-display text-white tracking-tight leading-tight max-w-2xl mx-auto">
              Ready to Recover Carts &amp; 4x Outbound Sales?
            </h2>
            <p className="text-slate-400 text-sm sm:text-base mt-4 max-w-xl mx-auto">
              Schedule a personalized 1-on-1 strategy call with our product specialist to calculate your brand's exact recovery numbers.
            </p>
            <div className="mt-8 flex flex-col sm:flex-row justify-center items-center gap-4">
              <Link
                to="/book-demo"
                className="w-full sm:w-auto h-13 px-8 rounded-full bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-sm shadow-[0_0_30px_rgba(16,185,129,0.45)] flex items-center justify-center gap-2 transition-all transform active:scale-95"
              >
                <Calendar className="w-4 h-4" /> Book a Demo with Specialist
              </Link>
              <Link
                to="/pricing"
                className="w-full sm:w-auto h-13 px-8 rounded-full bg-slate-900 hover:bg-slate-800 text-slate-200 border border-white/10 font-bold text-sm flex items-center justify-center gap-2 transition-all"
              >
                Explore Transparent Pricing
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Floating / Reusable Calendar Booking Modal */}
      <CalendarBookingModal
        isOpen={calendarModalOpen}
        onClose={() => setCalendarModalOpen(false)}
        defaultPlan={selectedPlanForDemo}
      />

      {/* Public Footer */}
      <PublicFooter />
    </div>
  );
}
