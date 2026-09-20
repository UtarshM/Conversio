import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { PublicNavbar } from "@/components/PublicNavbar";
import { PublicFooter } from "@/components/PublicFooter";
import { AeoStructuredData } from "@/components/AeoStructuredData";
import { CalendarBookingModal } from "@/components/CalendarBookingModal";

// Core D2C Modules
import { CommandCenterWidget } from "@/components/home/CommandCenterWidget";
import { AiRevenueOpportunitiesWidget } from "@/components/home/AiRevenueOpportunitiesWidget";
import { Customer360Widget } from "@/components/home/Customer360Widget";
import { IdentityResolutionWidget } from "@/components/home/IdentityResolutionWidget";
import { SalesCrmPipelineWidget } from "@/components/home/SalesCrmPipelineWidget";
import { OmnichannelInboxWidget } from "@/components/home/OmnichannelInboxWidget";
import { AiActionAgentsWidget } from "@/components/home/AiActionAgentsWidget";
import { RtoIntelligenceWidget } from "@/components/home/RtoIntelligenceWidget";
import { CustomerJourneysWidget } from "@/components/home/CustomerJourneysWidget";
import { RevenueAttributionWidget } from "@/components/home/RevenueAttributionWidget";

// Extended Capabilities
import { SequenceBuilderWidget } from "@/components/home/SequenceBuilderWidget";
import { AppointmentBookingWidget } from "@/components/home/AppointmentBookingWidget";
import { ChannelsDeepDive } from "@/components/home/ChannelsDeepDive";
import { StackSavingsCalculator } from "@/components/home/StackSavingsCalculator";
import { RapidFaqSection } from "@/components/home/RapidFaqSection";

import {
  ArrowRight,
  Sparkles,
  Zap,
  TrendingUp,
  ShieldCheck,
  RefreshCw,
  ShoppingBag,
  RotateCcw,
  Users,
  CheckCircle2,
  Calendar,
  Layers,
  PhoneCall,
  MessageSquare,
  Mail,
  Flame,
  Star,
  ExternalLink,
} from "lucide-react";

export default function HomePage() {
  const [calendarModalOpen, setCalendarModalOpen] = useState(false);
  const [selectedPlanForDemo, setSelectedPlanForDemo] = useState<string>("Conversio Growth");

  useEffect(() => {
    document.title = "Conversio by Scalezix — Turn Every Customer Interaction Into Revenue";
  }, []);

  return (
    <div className="min-h-screen bg-[#04080a] text-white selection:bg-emerald-500 selection:text-black font-sans relative overflow-x-hidden">
      <AeoStructuredData />
      <PublicNavbar />

      {/* Background Ambient Glows */}
      <div className="fixed top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[500px] bg-gradient-to-b from-emerald-500/10 via-teal-500/5 to-transparent blur-3xl pointer-events-none -z-10" />
      <div className="fixed top-1/3 -left-48 w-96 h-96 bg-emerald-600/5 rounded-full blur-3xl pointer-events-none -z-10" />
      <div className="fixed top-2/3 -right-48 w-96 h-96 bg-teal-600/5 rounded-full blur-3xl pointer-events-none -z-10" />

      <main className="relative z-10 pt-28 sm:pt-36 pb-20 space-y-24 sm:space-y-36">
        {/* ========================================================================= */}
        {/* SECTION 1: HERO — TURN CUSTOMER DATA INTO REVENUE                         */}
        {/* ========================================================================= */}
        <section className="container mx-auto px-4 sm:px-6 max-w-7xl">
          <div className="text-center max-w-4xl mx-auto space-y-6">
            {/* Super Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs sm:text-sm font-semibold tracking-wider uppercase shadow-inner">
              <Sparkles className="w-4 h-4 animate-pulse" />
              CONVERSIO BY SCALEZIX • AI REVENUE & CUSTOMER AUTOMATION PLATFORM
            </div>

            {/* Official Vision Headline */}
            <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-white leading-[1.08]">
              Turn Every Customer Interaction{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-teal-300 to-cyan-400">
                Into Revenue
              </span>
            </h1>

            {/* Official Vision Subheadline */}
            <p className="text-base sm:text-xl text-gray-300 leading-relaxed max-w-3xl mx-auto">
              Conversio uses AI to recover abandoned carts, reduce COD losses, increase repeat purchases, automate customer conversations, and identify your next revenue opportunities.
            </p>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
              <Link to="/signup">
                <Button className="w-full sm:w-auto h-13 px-8 rounded-2xl bg-emerald-500 hover:bg-emerald-400 text-black font-bold text-base shadow-xl shadow-emerald-500/20 hover:scale-[1.02] transition-all flex items-center gap-2.5">
                  <Zap className="w-4 h-4 fill-current" />
                  Start Free
                  <ArrowRight className="w-4 h-4" />
                </Button>
              </Link>

              <Button
                variant="outline"
                onClick={() => setCalendarModalOpen(true)}
                className="w-full sm:w-auto h-13 px-8 rounded-2xl border-white/15 bg-white/[0.04] hover:bg-white/[0.08] text-white font-semibold text-base backdrop-blur-xl flex items-center gap-2"
              >
                <Calendar className="w-4 h-4 text-emerald-400" />
                Book a Demo
              </Button>
            </div>

            {/* Metric Strip Highlights */}
            <div className="pt-8 grid grid-cols-2 sm:grid-cols-4 gap-3 max-w-3xl mx-auto text-left">
              <div className="bg-white/[0.03] border border-white/10 p-3.5 rounded-2xl">
                <div className="text-xs text-gray-400 uppercase font-semibold">Total Revenue</div>
                <div className="text-xl font-bold text-white mt-0.5">₹82.4L</div>
                <div className="text-[10px] text-gray-400">Live Shopify Store</div>
              </div>
              <div className="bg-emerald-500/10 border border-emerald-500/20 p-3.5 rounded-2xl">
                <div className="text-xs text-emerald-400 uppercase font-semibold">Attributed</div>
                <div className="text-xl font-bold text-emerald-300 mt-0.5">₹18.7L</div>
                <div className="text-[10px] text-emerald-400/80">Conversio OS</div>
              </div>
              <div className="bg-white/[0.03] border border-white/10 p-3.5 rounded-2xl">
                <div className="text-xs text-teal-400 uppercase font-semibold">Recovered</div>
                <div className="text-xl font-bold text-white mt-0.5">₹6.4L</div>
                <div className="text-[10px] text-teal-400/80">Abandoned Carts</div>
              </div>
              <div className="bg-white/[0.03] border border-white/10 p-3.5 rounded-2xl">
                <div className="text-xs text-cyan-400 uppercase font-semibold">COD Saved</div>
                <div className="text-xl font-bold text-white mt-0.5">₹2.1L</div>
                <div className="text-[10px] text-cyan-400/80">RTO Shield</div>
              </div>
            </div>
          </div>

          {/* Hero Interactive Executive Dashboard Preview with Real Product Mockup */}
          <div className="mt-14 relative rounded-3xl border border-white/15 bg-gradient-to-b from-[#0e171b] to-[#04080a] p-4 sm:p-6 shadow-2xl shadow-emerald-500/10 backdrop-blur-2xl overflow-hidden group">
            {/* Top Bar with Browser Dots & URL */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-white/10">
              <div className="flex items-center gap-3">
                <div className="flex gap-1.5">
                  <div className="w-3 h-3 rounded-full bg-red-500/60" />
                  <div className="w-3 h-3 rounded-full bg-amber-500/60" />
                  <div className="w-3 h-3 rounded-full bg-emerald-500/60" />
                </div>
                <span className="text-xs text-gray-400 font-mono">conversio.scalezix.com/dashboard</span>
              </div>

              <div className="flex items-center gap-2 sm:gap-3">
                <span className="flex items-center gap-1.5 text-xs font-semibold text-emerald-400 bg-emerald-500/10 px-3 py-1 rounded-full border border-emerald-500/20">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                  Shopify Store Live Sync Active
                </span>
              </div>
            </div>

            {/* High-Resolution Dashboard Mockup Image Showcase */}
            <div className="pt-4 relative rounded-2xl overflow-hidden bg-white/5 border border-white/10 shadow-inner">
              <img
                src="/home/dashboard_mockup.png"
                alt="Conversio Outreach Analytics & Daily Spend Dashboard"
                className="w-full h-auto object-cover rounded-xl shadow-2xl transition-transform duration-700 group-hover:scale-[1.01]"
              />

              {/* Floating Live Telemetry Badges */}
              <div className="absolute top-4 right-4 hidden md:flex items-center gap-2">
                <div className="px-3 py-1.5 rounded-xl bg-black/75 border border-white/20 backdrop-blur-md text-white text-xs font-mono font-bold shadow-xl flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                  <span>Credits: ₹82,559.76</span>
                </div>
                <div className="px-3 py-1.5 rounded-xl bg-black/75 border border-white/20 backdrop-blur-md text-emerald-400 text-xs font-mono font-bold shadow-xl">
                  <span>18.4% Reply Rate</span>
                </div>
              </div>
            </div>
          </div>

          {/* Social Proof: Real Client Logos & Meta Tech Partner Badge */}
          <div className="mt-14 text-center space-y-4">
            <p className="text-xs font-mono text-gray-400 uppercase tracking-widest">
              TRUSTED BY 700+ ENTERPRISES &amp; FASTEST GROWING D2C BRANDS ACROSS INDIA
            </p>
            <div className="flex flex-wrap items-center justify-center gap-6 sm:gap-10 py-6 px-6 rounded-3xl bg-white/[0.02] border border-white/5 backdrop-blur-xl">
              <img src="/clients_clean/indianoil.png" alt="Indian Oil" className="h-6 sm:h-8 object-contain opacity-70 hover:opacity-100 transition-all grayscale hover:grayscale-0" />
              <img src="/clients_clean/acg.png" alt="ACG Pharma" className="h-6 sm:h-8 object-contain opacity-70 hover:opacity-100 transition-all grayscale hover:grayscale-0" />
              <img src="/clients_clean/gmm.png" alt="GMM Pfaudler" className="h-5 sm:h-7 object-contain opacity-70 hover:opacity-100 transition-all grayscale hover:grayscale-0" />
              <img src="/clients_clean/cybernetik.png" alt="Cybernetik" className="h-5 sm:h-7 object-contain opacity-70 hover:opacity-100 transition-all grayscale hover:grayscale-0" />
              <img src="/clients_clean/indomim.png" alt="Indo-MIM" className="h-5 sm:h-7 object-contain opacity-70 hover:opacity-100 transition-all grayscale hover:grayscale-0" />
              <img src="/clients_clean/vulkan.png" alt="Vulkan" className="h-5 sm:h-7 object-contain opacity-70 hover:opacity-100 transition-all grayscale hover:grayscale-0" />
              <img src="/clients_clean/standardglass.png" alt="Standard Glass" className="h-5 sm:h-7 object-contain opacity-70 hover:opacity-100 transition-all grayscale hover:grayscale-0" />
              <img src="/clients_clean/lt.png" alt="L&T" className="h-5 sm:h-7 object-contain opacity-70 hover:opacity-100 transition-all grayscale hover:grayscale-0" />
              <img src="/clients_clean/gansons.png" alt="Gansons" className="h-5 sm:h-7 object-contain opacity-70 hover:opacity-100 transition-all grayscale hover:grayscale-0" />
              <div className="h-6 w-px bg-white/10 hidden sm:block" />
              <img src="/home/meta-partner-badge.avif" alt="Official Meta Tech Provider" className="h-7 sm:h-9 object-contain hover:scale-105 transition-transform" />
            </div>
          </div>
        </section>

        {/* ========================================================================= */}
        {/* SECTION 2: THE 4 PILLARS — RECOVER • RETAIN • CONVERT • REPEAT            */}
        {/* ========================================================================= */}
        <section className="container mx-auto px-4 sm:px-6 max-w-7xl">
          <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-emerald-400 text-xs font-semibold uppercase tracking-wider">
              <Layers className="w-3.5 h-3.5" /> Full Customer Lifecycle
            </div>
            <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
              Recover. Retain. Convert. Repeat.
            </h2>
            <p className="text-gray-400 text-sm sm:text-base leading-relaxed">
              Conversio unifies the 4 essential revenue engines of modern direct-to-consumer e-commerce brands into one autonomous system.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Pillar 1: RECOVER */}
            <div className="rounded-3xl border border-white/10 bg-[#091014]/80 p-5 flex flex-col justify-between hover:border-emerald-500/40 hover:bg-white/[0.03] transition-all group overflow-hidden shadow-lg">
              <div>
                <div className="rounded-2xl overflow-hidden mb-4 border border-white/10 shadow-md bg-black/40">
                  <img
                    src="/blog/cart_recovery.jpg"
                    alt="Autonomous Cart Recovery Engine"
                    className="w-full h-40 object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[10px] uppercase font-bold tracking-wider text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded">
                    Pillar 01
                  </span>
                  <div className="w-8 h-8 rounded-xl bg-emerald-500/10 text-emerald-400 flex items-center justify-center">
                    <ShoppingBag className="w-4 h-4" />
                  </div>
                </div>
                <h3 className="text-lg font-bold text-white mb-2">Recover Lost Revenue</h3>
                <p className="text-xs text-gray-400 leading-relaxed">
                  Autonomous 3-tier cart recovery across WhatsApp, email, and AI voice. Reclaims abandoned checkouts with instant 1-click UPI checkout links.
                </p>
              </div>
              <div className="pt-4 mt-4 border-t border-white/5 text-xs text-emerald-400 font-semibold flex items-center justify-between">
                <span>Cart Recovery Rate</span>
                <span className="font-mono font-bold text-sm">24.8%</span>
              </div>
            </div>

            {/* Pillar 2: RETAIN */}
            <div className="rounded-3xl border border-white/10 bg-[#091014]/80 p-5 flex flex-col justify-between hover:border-teal-500/40 hover:bg-white/[0.03] transition-all group overflow-hidden shadow-lg">
              <div>
                <div className="rounded-2xl overflow-hidden mb-4 border border-white/10 shadow-md bg-black/40">
                  <img
                    src="/home/inbox_feature.jpg"
                    alt="Customer 360 & Unified Omnichannel Inbox"
                    className="w-full h-40 object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[10px] uppercase font-bold tracking-wider text-teal-400 bg-teal-500/10 px-2 py-0.5 rounded">
                    Pillar 02
                  </span>
                  <div className="w-8 h-8 rounded-xl bg-teal-500/10 text-teal-400 flex items-center justify-center">
                    <RotateCcw className="w-4 h-4" />
                  </div>
                </div>
                <h3 className="text-lg font-bold text-white mb-2">Retain &amp; Replenish</h3>
                <p className="text-xs text-gray-400 leading-relaxed">
                  Predictive reorder engine calculates daily product depletion rates and triggers replenishment alerts right before the customer runs out.
                </p>
              </div>
              <div className="pt-4 mt-4 border-t border-white/5 text-xs text-teal-400 font-semibold flex items-center justify-between">
                <span>Repeat Orders Lift</span>
                <span className="font-mono font-bold text-sm">+31.2%</span>
              </div>
            </div>

            {/* Pillar 3: CONVERT */}
            <div className="rounded-3xl border border-white/10 bg-[#091014]/80 p-5 flex flex-col justify-between hover:border-cyan-500/40 hover:bg-white/[0.03] transition-all group overflow-hidden shadow-lg">
              <div>
                <div className="rounded-2xl overflow-hidden mb-4 border border-white/10 shadow-md bg-black/40">
                  <img
                    src="/blog/ai_voice.jpg"
                    alt="AI Voice Calling Dialer & Inbound Sales Agent"
                    className="w-full h-40 object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[10px] uppercase font-bold tracking-wider text-cyan-400 bg-cyan-500/10 px-2 py-0.5 rounded">
                    Pillar 03
                  </span>
                  <div className="w-8 h-8 rounded-xl bg-cyan-500/10 text-cyan-400 flex items-center justify-center">
                    <Sparkles className="w-4 h-4" />
                  </div>
                </div>
                <h3 className="text-lg font-bold text-white mb-2">Convert Inbound Intent</h3>
                <p className="text-xs text-gray-400 leading-relaxed">
                  Autonomous AI sales agents answer product queries, match shades, check stock, and curate pre-filled carts directly in WhatsApp.
                </p>
              </div>
              <div className="pt-4 mt-4 border-t border-white/5 text-xs text-cyan-400 font-semibold flex items-center justify-between">
                <span>Inbound Chat Conversion</span>
                <span className="font-mono font-bold text-sm">18.4%</span>
              </div>
            </div>

            {/* Pillar 4: REPEAT */}
            <div className="rounded-3xl border border-white/10 bg-[#091014]/80 p-5 flex flex-col justify-between hover:border-emerald-500/40 hover:bg-white/[0.03] transition-all group overflow-hidden shadow-lg">
              <div>
                <div className="rounded-2xl overflow-hidden mb-4 border border-white/10 shadow-md bg-black/40">
                  <img
                    src="/blog/rto_reduction.jpg"
                    alt="RTO Shield & Secure Delivery Intelligence"
                    className="w-full h-40 object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[10px] uppercase font-bold tracking-wider text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded">
                    Pillar 04
                  </span>
                  <div className="w-8 h-8 rounded-xl bg-emerald-500/10 text-emerald-400 flex items-center justify-center">
                    <ShieldCheck className="w-4 h-4" />
                  </div>
                </div>
                <h3 className="text-lg font-bold text-white mb-2">Repeat &amp; Defend COD</h3>
                <p className="text-xs text-gray-400 leading-relaxed">
                  Automated 60-day win-back campaigns and 7-factor COD risk scoring to slash return-to-origin losses before dispatch.
                </p>
              </div>
              <div className="pt-4 mt-4 border-t border-white/5 text-xs text-emerald-400 font-semibold flex items-center justify-between">
                <span>RTO Losses Prevented</span>
                <span className="font-mono font-bold text-sm">-65.4%</span>
              </div>
            </div>
          </div>
        </section>

        {/* ========================================================================= */}
        {/* SECTION 3: CUSTOMER PLATFORM — CUSTOMER 360 & IDENTITY RESOLUTION        */}
        {/* ========================================================================= */}
        <section className="container mx-auto px-4 sm:px-6 max-w-7xl space-y-12">
          <Customer360Widget />
          <IdentityResolutionWidget />
        </section>

        {/* ========================================================================= */}
        {/* SECTION 4: SALES CRM — OMNICHANNEL DEAL PIPELINE & AUTOMATION            */}
        {/* ========================================================================= */}
        <section className="container mx-auto px-4 sm:px-6 max-w-7xl">
          <SalesCrmPipelineWidget />
        </section>

        {/* ========================================================================= */}
        {/* SECTION 5: UNIFIED OMNICHANNEL INBOX & LIVE CUSTOMER 360 DRAWER          */}
        {/* ========================================================================= */}
        <section className="container mx-auto px-4 sm:px-6 max-w-7xl">
          <OmnichannelInboxWidget />
        </section>

        {/* ========================================================================= */}
        {/* SECTION 6: AUTOMATE EVERY CUSTOMER JOURNEY                                */}
        {/* ========================================================================= */}
        <section className="container mx-auto px-4 sm:px-6 max-w-7xl">
          <CustomerJourneysWidget />
        </section>

        {/* ========================================================================= */}
        {/* SECTION 7: AUTONOMOUS AI ACTION AGENTS & MULTI-LINGUAL INTENT             */}
        {/* ========================================================================= */}
        <section className="container mx-auto px-4 sm:px-6 max-w-7xl">
          <AiActionAgentsWidget />
        </section>

        {/* ========================================================================= */}
        {/* SECTION 8: COD & RTO INTELLIGENCE SHIELD                                  */}
        {/* ========================================================================= */}
        <section className="container mx-auto px-4 sm:px-6 max-w-7xl">
          <RtoIntelligenceWidget />
        </section>

        {/* ========================================================================= */}
        {/* SECTION 9: REVENUE INTELLIGENCE & TRUE ATTRIBUTION                        */}
        {/* ========================================================================= */}
        <section className="container mx-auto px-4 sm:px-6 max-w-7xl space-y-12">
          <RevenueAttributionWidget />
          <AiRevenueOpportunitiesWidget />
        </section>

        {/* ========================================================================= */}
        {/* SECTION 10: EXTENDED CHANNELS & SEQUENCE BUILDER                          */}
        {/* ========================================================================= */}
        <section className="container mx-auto px-4 sm:px-6 max-w-7xl space-y-16">
          <div className="text-center max-w-3xl mx-auto space-y-3">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-emerald-400 text-xs font-semibold uppercase tracking-wider">
              <Zap className="w-3.5 h-3.5" /> Omnichannel Execution
            </div>
            <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
              Visual Multi-Step Sequence Orchestration
            </h2>
            <p className="text-gray-400 text-sm sm:text-base leading-relaxed">
              Design multi-day omnichannel cadences across WhatsApp Cloud API, Authenticated Email, and AI Telephony with real-time Stop-on-Reply controls.
            </p>
          </div>

          <SequenceBuilderWidget />

          {/* RapidSales Benchmarked Campaign Delivery Showcase */}
          <div className="rounded-3xl border border-white/10 bg-[#091014]/80 p-6 sm:p-10 shadow-2xl backdrop-blur-2xl">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              <div className="lg:col-span-5 space-y-4 text-left">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-orange-500/10 border border-orange-500/20 text-[#ea580c] text-xs font-semibold uppercase tracking-wider font-mono">
                  <ShieldCheck className="w-3.5 h-3.5" /> Meta Anti-Ban Safeguards
                </div>
                <h3 className="text-2xl sm:text-3xl font-bold text-white">
                  Anti-Ban Delivery &amp; Natural Human Jitter
                </h3>
                <p className="text-sm text-gray-400 leading-relaxed">
                  Eliminate carrier throttling and Meta number suspensions with configurable audience batching (25 recipients / 5 min gaps) and randomized natural human jitter delays (5s–10s) between messages.
                </p>
                <div className="space-y-2 pt-2 text-xs text-gray-300">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span>Automatic failed message retry with template fallback</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span>Dynamic volume throttling preserving High Quality Meta Tier</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span>Zero spam risk with Stop-on-Reply opt-out compliance</span>
                  </div>
                </div>
              </div>
              <div className="lg:col-span-7 rounded-2xl overflow-hidden border border-white/10 shadow-2xl bg-white/5">
                <img
                  src="/home/campaign_delivery_mockup.png"
                  alt="Campaign Delivery Settings with Anti-Ban Human Jitter"
                  className="w-full h-auto object-cover rounded-xl hover:scale-[1.02] transition-transform duration-500"
                />
              </div>
            </div>
          </div>

          <ChannelsDeepDive />
        </section>

        {/* ========================================================================= */}
        {/* SECTION 11: STACK SAVINGS CALCULATOR                                      */}
        {/* ========================================================================= */}
        <section className="container mx-auto px-4 sm:px-6 max-w-7xl">
          <StackSavingsCalculator />
        </section>

        {/* ========================================================================= */}
        {/* SECTION 12: D2C INTEGRATIONS ECOSYSTEM                                    */}
        {/* ========================================================================= */}
        <section className="container mx-auto px-4 sm:px-6 max-w-7xl">
          <div className="rounded-3xl border border-white/10 bg-[#091014]/90 p-8 sm:p-12 backdrop-blur-2xl">
            <div className="text-center max-w-3xl mx-auto space-y-4 mb-12">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-semibold uppercase tracking-wider">
                <Layers className="w-3.5 h-3.5" /> Module 10 — Ecosystem & Integrations
              </div>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-white">
                Plug Directly Into Your Existing Commerce Stack
              </h2>
              <p className="text-sm text-gray-400 leading-relaxed">
                Connect your Shopify store in 60 seconds with OAuth. Seamlessly orchestrate data across your payment gateways, logistics partners, and ad platforms.
              </p>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-4">
              {[
                { name: "Shopify", category: "Commerce", desc: "Real-time webhook sync for carts, orders, and customer 360." },
                { name: "WhatsApp Cloud API", category: "Messaging", desc: "Official Meta API with 98% open rates and interactive buttons." },
                { name: "Razorpay", category: "Payments", desc: "Instant UPI links, pre-paid incentives, and payment reconciliation." },
                { name: "Shiprocket", category: "Logistics", desc: "Automated tracking updates, NDR management, and RTO alerts." },
                { name: "AI Voice Telephony", category: "Calling", desc: "Multilingual conversational voice calls in Hindi & Gujarati." },
                { name: "Meta & Google Ads", category: "Audience", desc: "Push high-LTV VIP customer segments for CAPI lookalike targeting." },
              ].map((item, idx) => (
                <div key={idx} className="p-4 rounded-2xl bg-white/[0.02] border border-white/10 text-center hover:border-emerald-500/40 hover:bg-white/[0.04] transition-all">
                  <span className="text-[9px] uppercase font-bold tracking-wider text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded">
                    {item.category}
                  </span>
                  <h4 className="text-sm font-bold text-white mt-2 mb-1">{item.name}</h4>
                  <p className="text-[11px] text-gray-400 leading-tight">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ========================================================================= */}
        {/* SECTION 13: COMPREHENSIVE D2C OBJECTIONS FAQ                              */}
        {/* ========================================================================= */}
        <section className="container mx-auto px-4 sm:px-6 max-w-7xl">
          <RapidFaqSection />
        </section>

        {/* ========================================================================= */}
        {/* SECTION 14: HIGH-CONVERSION BOTTOM CTA BANNER                             */}
        {/* ========================================================================= */}
        <section className="container mx-auto px-4 sm:px-6 max-w-7xl">
          <div className="relative rounded-3xl border border-emerald-500/30 bg-gradient-to-r from-emerald-950/40 via-[#0a1215] to-teal-950/30 p-8 sm:p-14 text-center overflow-hidden shadow-2xl backdrop-blur-2xl">
            <div className="absolute -top-24 -left-24 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute -bottom-24 -right-24 w-96 h-96 bg-teal-500/10 rounded-full blur-3xl pointer-events-none" />

            <div className="relative z-10 max-w-3xl mx-auto space-y-6">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-semibold uppercase tracking-wider">
                <Sparkles className="w-3.5 h-3.5" /> Ready in 5 Minutes
              </div>

              <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
                Turn Every Customer Interaction Into Revenue Today
              </h2>

              <p className="text-sm sm:text-base text-gray-300 leading-relaxed max-w-2xl mx-auto">
                Join high-growth D2C brands automating abandoned cart recovery, cutting COD RTO losses, and boosting customer lifetime value with Conversio.
              </p>

              <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
                <Link to="/signup">
                  <Button className="w-full sm:w-auto h-13 px-8 rounded-2xl bg-emerald-500 hover:bg-emerald-400 text-black font-bold text-base shadow-xl shadow-emerald-500/20 hover:scale-[1.02] transition-all flex items-center gap-2.5">
                    <Zap className="w-4 h-4 fill-current" />
                    Start Free
                    <ArrowRight className="w-4 h-4" />
                  </Button>
                </Link>

                <Button
                  variant="outline"
                  onClick={() => setCalendarModalOpen(true)}
                  className="w-full sm:w-auto h-13 px-8 rounded-2xl border-white/15 bg-white/[0.04] hover:bg-white/[0.08] text-white font-semibold text-base backdrop-blur-xl flex items-center gap-2"
                >
                  <Calendar className="w-4 h-4 text-emerald-400" />
                  Book a Demo
                </Button>
              </div>

              <div className="text-xs text-gray-400 pt-2 flex flex-wrap items-center justify-center gap-4">
                <span className="flex items-center gap-1.5"><CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" /> 60-Second Shopify Install</span>
                <span className="flex items-center gap-1.5"><CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" /> Official Meta WhatsApp API</span>
                <span className="flex items-center gap-1.5"><CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" /> Transparent At-Cost Usage</span>
              </div>
            </div>
          </div>
        </section>
      </main>

      <PublicFooter />

      {/* Calendar Booking Modal */}
      <CalendarBookingModal
        isOpen={calendarModalOpen}
        onClose={() => setCalendarModalOpen(false)}
        selectedPlan={selectedPlanForDemo}
      />
    </div>
  );
}
