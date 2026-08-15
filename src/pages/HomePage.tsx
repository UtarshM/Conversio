import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useNavigate, Link } from "react-router-dom";
import { PublicNavbar } from "@/components/PublicNavbar";
import { PublicFooter } from "@/components/PublicFooter";
import { AeoStructuredData } from "@/components/AeoStructuredData";
import { motion } from "framer-motion";
import {
  ArrowRight,
  BarChart3,
  Bot,
  Building2,
  CheckCircle2,
  MessageSquare,
  Phone,
  Shield,
  ShoppingCart,
  Star,
  Target,
  TrendingUp,
  Users,
  Wallet,
  Zap,
} from "lucide-react";
import heroPhone from "@/assets/hero-phone.png";

const stats = [
  { value: "98.4%", label: "Inbound Delivery Rate" },
  { value: "+22.4%", label: "Average Cart Recovery" },
  { value: "40%", label: "RTO Risk Reduction" },
  { value: "8x", label: "Average Campaign ROI" },
];

const trustSignals = [
  "Official Meta Business Partner",
  "Bulk Broadcasts & Campaigns",
  "Shopify Abandoned Cart Recovery",
  "AI Voice COD Verification Calls",
];

const brandLogos = [
  { name: "BuildItIndia 🇮🇳", url: "/assets/brands/builditindia.png" },
  { name: "Kadam Leather (Ahmedabad)", url: "/assets/brands/kadam-new.png" },
  { name: "Beardo (Ahmedabad)", url: "/assets/brands/beardo.png" },
  { name: "Wagh Bakri (Gujarat)", url: "/assets/brands/waghbakri.png" },
  { name: "Astral (Ahmedabad)", url: "/assets/brands/astral.png" },
  { name: "Vadilal", url: "/assets/brands/vadilal.png" },
  { name: "Snitch", url: "/assets/brands/snitch.png" },
  { name: "Mamaearth", url: "/assets/brands/mamaearth.png" },
  { name: "BoAt", url: "/assets/brands/boat.png" },
  { name: "SUGAR Cosmetics", url: "/assets/brands/sugar.png" },
];

const secondMarqueeLogos = [
  { name: "BuildItIndia 🇮🇳", url: "/assets/brands/builditindia.png" },
  { name: "SuperBottoms", url: "/assets/brands/superbottoms.png" },
  { name: "Phool.co", url: "/assets/brands/phool.png" },
  { name: "Kalash Foods (Gujarat)", url: "/assets/brands/marquee-logo-5.png" },
  { name: "Frido", url: "/assets/brands/frido.jpg" },
  { name: "Ugaoo", url: "/assets/brands/ugaoo.jpg" },
  { name: "Comet Shoes", url: "/assets/brands/comet.png" },
  { name: "Man Matters", url: "/assets/brands/man-matters.jpg" },
  { name: "Snackdesi (Gujarat)", url: "/assets/brands/snackdesi-new.png" },
];

const pillars = [
  {
    icon: Target,
    title: "Broadcast Campaigns",
    desc: "Send personalized bulk marketing templates to segmented lists with official Meta green-tick reliability, low balance warnings, and upfront cost estimation.",
  },
  {
    icon: MessageSquare,
    title: "Omnichannel CRM Shared Inbox",
    desc: "Unify support and sales chats across WhatsApp, Instagram, SMS, and Voice. Equip teams with assignment rules, business hours, and canned replies.",
  },
  {
    icon: ShoppingCart,
    title: "E-Commerce Conversion & Cart Recovery",
    desc: "Recover abandoned checkouts automatically via pre-built multi-step WhatsApp triggers, dynamic discount codes, and payment links.",
  },
  {
    icon: Bot,
    title: "AI Voice & COD Verification",
    desc: "Verify Cash-on-Delivery orders dynamically via conversational AI voice calls. Offer prepaid incentives to cut RTO (Return to Origin) rates by up to 40%.",
  },
];

export default function HomePage() {
  const navigate = useNavigate();

  // Price calculations based on selected add-ons
  const [waAddons, setWaAddons] = useState({
    aiCalling: false,
    aiChatbot: false,
    conversioPass: false,
  });

  const [suiteAddons, setSuiteAddons] = useState({
    aiCalling: false,
    aiChatbot: false,
  });

  const waBasePrice = 2999;
  const waAddonsPrice = 
    (waAddons.aiCalling ? 1499 : 0) + 
    (waAddons.aiChatbot ? 1999 : 0) + 
    (waAddons.conversioPass ? 1999 : 0);
  const waTotalPrice = waBasePrice + waAddonsPrice;

  const suiteBasePrice = 6499;
  const suiteAddonsPrice = 
    (suiteAddons.aiCalling ? 999 : 0) + 
    (suiteAddons.aiChatbot ? 1499 : 0);
  const suiteTotalPrice = suiteBasePrice + suiteAddonsPrice;

  useEffect(() => {
    document.title = "Conversio AI — AI Revenue OS & WhatsApp Automation for D2C Brands";
  }, []);

  return (
    <div className="min-h-screen bg-white font-sans text-[#111111] overflow-x-hidden">
      {/* AEO & SEO Structured Data Schemas */}
      <AeoStructuredData />

      {/* Shared Public Floating Navbar */}
      <PublicNavbar />

      {/* Hero Section */}
      <section className="relative pt-36 pb-16 md:pb-24 md:pt-44 overflow-hidden bg-white">
        {/* Soft Mesh Gradient Overlay */}
        <div className="absolute top-0 left-0 w-full h-[85%] bg-gradient-to-b from-[#CDE4F7]/40 via-[#FDF0E1]/40 to-white -z-10" />
        
        <div className="container mx-auto px-6 relative z-10 text-center">
          <div className="inline-block mb-6">
            <span className="text-xs font-bold tracking-[0.2em] text-emerald-700 uppercase bg-emerald-50 px-4 py-2 rounded-full border border-emerald-200/60 shadow-xs">
              NEW: AI VOICE AGENTS FOR COD VERIFICATION
            </span>
          </div>

          <h1 className="text-4xl sm:text-5xl md:text-7xl lg:text-[76px] font-display font-extrabold tracking-tight text-[#111111] max-w-5xl mx-auto leading-[1.08] mb-6">
            AI-Native Conversion &amp; Retention OS for D2C Brands
          </h1>

          <p className="text-lg md:text-[21px] text-slate-600 max-w-3xl mx-auto mb-10 leading-[1.6]">
            Recover abandoned carts, reduce RTO, and automate repeat revenue across WhatsApp, SMS, Voice, Instagram, and RCS. 700+ D2C brands trust <strong>Conversio</strong>.
          </p>

          <div className="flex flex-col sm:flex-row justify-center items-center gap-4 mb-16 px-2 sm:px-0 max-w-md mx-auto">
            <Button className="bg-[#0A0A0A] text-white px-8 py-4 flex items-center justify-center gap-3 text-[13px] font-mono font-medium hover:bg-black/90 transition-colors w-full sm:w-auto cursor-pointer rounded-xl h-12" onClick={() => navigate("/signup")}>
              <div className="w-1.5 h-1.5 bg-white rounded-full"></div>
              Book a Demo
            </Button>
            <a href="#features" className="bg-white text-slate-800 border border-slate-200 px-8 py-4 flex items-center justify-center gap-3 text-[13px] font-mono font-medium hover:bg-slate-50 transition-colors w-full sm:w-auto rounded-xl h-12">
              <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full"></div>
              Explore Features
            </a>
          </div>

          {/* Interactive Screen Dashboard Preview with Badges */}
          <div className="relative max-w-[1000px] mx-auto mt-4 px-4 z-20">
            
            {/* Badges Overlays */}
            <div className="absolute -left-28 top-[12%] z-30 hidden xl:flex items-center gap-3.5 p-4 bg-white/95 backdrop-blur-md border border-emerald-100 rounded-2xl shadow-[0_20px_50px_rgba(134,226,93,0.15)] text-left w-64 shrink-0 animate-bounce-slow">
              <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-700">
                <ShoppingCart className="w-5 h-5" />
              </div>
              <div className="flex-1 min-w-0">
                <span className="text-[9px] uppercase tracking-wider text-emerald-700 font-bold">Intent Recovery</span>
                <h4 className="text-xs font-bold text-slate-800 mt-0.5">Cart Recovery Rate</h4>
                <div className="flex items-center gap-1.5 mt-1">
                  <span className="text-lg font-extrabold text-slate-900 leading-none">+22.4%</span>
                  <span className="text-[9px] bg-emerald-500/10 border border-emerald-500/20 text-emerald-800 px-1.5 py-0.5 rounded font-bold">ROI Boost</span>
                </div>
              </div>
            </div>

            <div className="absolute -right-28 top-[38%] z-30 hidden xl:flex items-center gap-3.5 p-4 bg-white/95 backdrop-blur-md border border-emerald-100 rounded-2xl shadow-[0_20px_50px_rgba(134,226,93,0.15)] text-left w-64 shrink-0">
              <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-700">
                <Shield className="w-5 h-5" />
              </div>
              <div className="flex-1 min-w-0">
                <span className="text-[9px] uppercase tracking-wider text-emerald-700 font-bold">RTO Prevention</span>
                <h4 className="text-xs font-bold text-slate-800 mt-0.5">COD Converted to Prepaid</h4>
                <div className="flex items-center gap-1.5 mt-1">
                  <span className="text-base font-extrabold text-slate-900 leading-none">₹4,28,900</span>
                  <span className="text-[9px] bg-emerald-500/10 border border-emerald-500/20 text-emerald-800 px-1 py-0.5 rounded font-bold">Reduced Risk</span>
                </div>
              </div>
            </div>

            <div className="absolute -left-16 bottom-[18%] z-30 hidden xl:flex items-center gap-3.5 p-3.5 bg-white/95 backdrop-blur-md border border-emerald-100 rounded-2xl shadow-[0_20px_50px_rgba(134,226,93,0.15)] text-left w-60 shrink-0">
              <div className="w-9 h-9 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-700">
                <MessageSquare className="w-4.5 h-4.5" />
              </div>
              <div className="flex-1 min-w-0">
                <span className="text-[8px] uppercase tracking-wider text-emerald-700 font-bold">Omnichannel CRM</span>
                <h4 className="text-xs font-bold text-slate-800 mt-0.5">WhatsApp Bot Dispatch</h4>
                <p className="text-[9px] text-slate-500 mt-1 flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-ping"></span> Delivered 1m ago
                </p>
              </div>
            </div>

            {/* Dashboard Visual Frame: Pixel-Perfect Live WhatsApp CRM Interface */}
            <div className="bg-slate-900 rounded-[28px] md:rounded-[36px] overflow-hidden border-[2px] border-slate-800 shadow-2xl p-3 relative z-10">
              <div className="relative w-full min-h-[460px] md:min-h-[520px] bg-slate-950 overflow-hidden rounded-[20px] md:rounded-[28px] flex flex-col text-left font-sans">
                {/* Header Bar */}
                <div className="bg-slate-900/90 border-b border-slate-800 px-6 py-4 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="relative">
                      <div className="w-10 h-10 rounded-full bg-emerald-600 flex items-center justify-center text-white font-bold text-sm">
                        C
                      </div>
                      <span className="absolute bottom-0 right-0 w-3 h-3 bg-emerald-500 border-2 border-slate-900 rounded-full" />
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <h3 className="text-sm font-bold text-white">Conversio AI Verification Agent</h3>
                        <Badge className="bg-emerald-500/20 text-emerald-400 border-emerald-500/30 text-[10px]">Verified Business</Badge>
                      </div>
                      <p className="text-[11px] text-slate-400">Official WhatsApp Cloud API • Active Order #8921</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <Badge variant="outline" className="text-emerald-400 border-emerald-500/30 bg-emerald-500/10 text-xs py-1">
                      ⚡ AI Voice Call Connected (00:42)
                    </Badge>
                  </div>
                </div>

                {/* Chat Message Thread Canvas */}
                <div className="flex-1 p-6 space-y-4 overflow-y-auto bg-[radial-gradient(#1e293b_1px,transparent_1px)] [background-size:16px_16px]">
                  
                  {/* System Tag */}
                  <div className="text-center">
                    <span className="bg-slate-800/80 text-slate-400 text-[10px] px-3 py-1 rounded-full border border-slate-700/50">
                      TODAY 10:14 AM • AUTOMATED COD VERIFICATION FLOW
                    </span>
                  </div>

                  {/* Outbound AI Message Bubble */}
                  <div className="flex justify-start max-w-lg">
                    <div className="bg-slate-800 text-slate-100 rounded-2xl rounded-tl-sm p-4 border border-slate-700/60 shadow-md space-y-2">
                      <div className="flex items-center justify-between text-[11px] text-slate-400 font-medium border-b border-slate-700/50 pb-1.5">
                        <span className="flex items-center gap-1 text-emerald-400"><Bot className="w-3.5 h-3.5" /> Conversio Bot</span>
                        <span>10:14 AM</span>
                      </div>
                      <p className="text-xs leading-relaxed">
                        Hi <strong>Rahul</strong>! 👋 Your Cash on Delivery order <strong>#8921</strong> for <em>Kadam Leather Boots</em> (₹2,499) has been received!
                      </p>
                      <div className="p-2.5 bg-emerald-950/40 border border-emerald-500/30 rounded-xl text-[11px] text-emerald-300">
                        🎁 <strong>Prepay Now &amp; Save 5%:</strong> Pay ₹2,374 via UPI right now to get instant ₹125 OFF + Priority Dispatch!
                      </div>
                    </div>
                  </div>

                  {/* Customer Inbound Reply Bubble */}
                  <div className="flex justify-end max-w-lg ml-auto">
                    <div className="bg-emerald-700 text-white rounded-2xl rounded-tr-sm p-3.5 shadow-md text-xs space-y-1">
                      <p>Yes please! Send me the 5% discount UPI payment link.</p>
                      <span className="text-[10px] text-emerald-200 block text-right">10:15 AM ✓✓</span>
                    </div>
                  </div>

                  {/* Interactive Button Card Bubble */}
                  <div className="flex justify-start max-w-lg">
                    <div className="bg-slate-800 text-slate-100 rounded-2xl rounded-tl-sm p-4 border border-slate-700/60 shadow-md space-y-3 w-full">
                      <div className="flex items-center justify-between text-[11px] text-slate-400 border-b border-slate-700/50 pb-1.5">
                        <span className="font-semibold text-slate-200">Payment Link Generated</span>
                        <span>10:15 AM</span>
                      </div>
                      <div className="space-y-2">
                        <button className="w-full bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs py-2.5 px-4 rounded-xl flex items-center justify-between transition-all">
                          <span>💳 Pay ₹2,374 via UPI (Save ₹125)</span>
                          <span className="text-[10px] bg-emerald-700 px-2 py-0.5 rounded">Razorpay Secure</span>
                        </button>
                        <button className="w-full bg-slate-700 hover:bg-slate-600 text-slate-200 text-xs py-2 px-4 rounded-xl text-left">
                          📦 Confirm COD Order (₹2,499)
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Paid Conversion Status */}
                  <div className="flex justify-center">
                    <div className="bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs px-4 py-2 rounded-xl flex items-center gap-2 font-medium">
                      <Shield className="w-4 h-4 text-emerald-400" />
                      <span>⚡ <strong>Payment Captured via UPI!</strong> Order converted to Prepaid. RTO Risk Saved!</span>
                    </div>
                  </div>

                </div>
              </div>
            </div>
          </div>

          {/* Social Proof Stars */}
          <div className="mt-14 flex flex-col md:flex-row items-center justify-center gap-3 md:gap-4 transition-all duration-500 px-4">
            <div className="flex gap-1">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="h-5 w-5 fill-amber-400 text-amber-400" />
              ))}
            </div>
            <div className="flex flex-wrap items-center justify-center gap-2 text-center text-slate-700 text-sm md:text-base">
              <span><strong>#1 in customer satisfaction</strong> based on 700+ brands on</span>
              <span className="font-semibold text-emerald-600 border border-emerald-100 bg-emerald-50 px-2 py-0.5 rounded">Shopify</span>
              <span>&amp;</span>
              <span className="font-semibold text-emerald-600 border border-emerald-100 bg-emerald-50 px-2 py-0.5 rounded">WooCommerce</span>
            </div>
          </div>
        </div>
      </section>

      {/* Brand Logos Infinite Marquee */}
      <section className="border-y border-slate-100 py-10 bg-slate-50/50 relative overflow-hidden">
        <div className="text-center mb-8 relative">
          <h3 className="text-sm font-semibold tracking-wider text-slate-400 uppercase">Trusted by D2C Brands &amp; Growing Teams</h3>
        </div>

        {/* Marquee Wrapper 1 */}
        <div className="w-full flex overflow-hidden select-none gap-6 relative">
          <div className="flex flex-shrink-0 justify-around items-center min-w-full gap-12 animate-marquee">
            {brandLogos.map((brand) => (
              <span key={brand.name} className="text-xl font-bold tracking-tight text-slate-300 font-mono hover:text-slate-500 transition-colors cursor-default whitespace-nowrap">
                {brand.name}
              </span>
            ))}
          </div>
          <div className="flex flex-shrink-0 justify-around items-center min-w-full gap-12 animate-marquee" aria-hidden="true">
            {brandLogos.map((brand) => (
              <span key={`${brand.name}-duplicate`} className="text-xl font-bold tracking-tight text-slate-300 font-mono hover:text-slate-500 transition-colors cursor-default whitespace-nowrap">
                {brand.name}
              </span>
            ))}
          </div>
        </div>

        {/* Marquee Wrapper 2 (Reverse Direction) */}
        <div className="w-full flex overflow-hidden select-none gap-6 mt-6 relative">
          <div className="flex flex-shrink-0 justify-around items-center min-w-full gap-12 animate-marquee [animation-direction:reverse]">
            {secondMarqueeLogos.map((brand) => (
              <span key={brand.name} className="text-xl font-bold tracking-tight text-slate-300 font-mono hover:text-slate-500 transition-colors cursor-default whitespace-nowrap">
                {brand.name}
              </span>
            ))}
          </div>
          <div className="flex flex-shrink-0 justify-around items-center min-w-full gap-12 animate-marquee [animation-direction:reverse]" aria-hidden="true">
            {secondMarqueeLogos.map((brand) => (
              <span key={`${brand.name}-duplicate`} className="text-xl font-bold tracking-tight text-slate-300 font-mono hover:text-slate-500 transition-colors cursor-default whitespace-nowrap">
                {brand.name}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* Pillars of Retention Section */}
      <section id="features" className="py-24 bg-white border-b border-slate-100">
        <div className="container mx-auto px-6">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-slate-900 leading-tight">
              One Unified WhatsApp Command Center
            </h2>
            <p className="mt-4 text-slate-500 text-lg">
              Manage both your transactional D2C workflows and your standard business communications from a single dashboard.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {pillars.map((item) => (
              <div key={item.title} className="p-8 border border-slate-100 rounded-3xl bg-slate-50/50 hover:bg-slate-50 transition-colors flex gap-5 items-start">
                <div className="h-12 w-12 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-600 flex-shrink-0">
                  <item.icon className="h-6 w-6" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-slate-900 mb-2">{item.title}</h3>
                  <p className="text-slate-500 text-sm leading-relaxed">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Feature Showcase 01: Automation (Money doesn't sleep) */}
          <div className="mt-20 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center bg-slate-50 p-8 md:p-12 rounded-3xl border border-slate-200/80">
            {/* Visual Workflow Diagram Card */}
            <div className="p-6 bg-white rounded-2xl border border-slate-200 shadow-md space-y-4 font-sans text-left">
              <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                <span className="text-xs font-bold text-slate-400 font-mono">FLOW BUILDER PREVIEW</span>
                <Badge className="bg-emerald-100 text-emerald-800 border-none text-[10px]">Active Trigger</Badge>
              </div>

              <div className="space-y-3 font-mono text-xs">
                <div className="p-3.5 bg-emerald-600 text-white rounded-xl font-bold flex items-center justify-between shadow-xs">
                  <span>⚡ Trigger: Abandoned Cart</span>
                  <span className="text-[10px] bg-emerald-700 px-2 py-0.5 rounded">Shopify Event</span>
                </div>
                <div className="h-6 w-0.5 bg-slate-300 mx-auto" />
                <div className="p-3 bg-slate-100 border border-slate-200 rounded-xl text-slate-700 text-center font-semibold">
                  ⏱️ Wait for 15 Minutes
                </div>
                <div className="h-6 w-0.5 bg-slate-300 mx-auto" />
                <div className="p-3 bg-slate-900 text-white rounded-xl text-center font-bold">
                  💬 Condition: Cart Value &gt; ₹1,000?
                </div>
                <div className="grid grid-cols-2 gap-2 pt-2">
                  <div className="p-2.5 bg-emerald-50 border border-emerald-200 rounded-xl text-emerald-800 text-center font-bold text-[11px]">
                    YES → Send 5% Prepay UPI Link
                  </div>
                  <div className="p-2.5 bg-blue-50 border border-blue-200 rounded-xl text-blue-800 text-center font-bold text-[11px]">
                    NO → Send WhatsApp Reminder
                  </div>
                </div>
              </div>
            </div>

            {/* Copywriting Block */}
            <div className="space-y-5 text-left">
              <Badge className="bg-emerald-100 text-emerald-800 border-emerald-200 text-xs font-mono uppercase">AUTOMATION</Badge>
              <h3 className="text-3xl md:text-4xl font-extrabold text-slate-900 leading-tight">
                Money doesn't sleep<br /><span className="text-slate-400 font-serif font-normal italic">(but you can)</span>
              </h3>
              <p className="text-slate-600 text-base leading-relaxed">
                Save time with pre-built automations that engage and sell. From welcome series to abandoned cart recovery, and post-purchase campaigns, <strong>Conversio</strong> does the heavy lifting, so you don't have to.
              </p>
              <Button onClick={() => navigate("/automations")} className="bg-slate-900 hover:bg-black text-white rounded-xl text-xs font-semibold px-6 py-3">
                Learn more about automation <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </div>
          </div>

          {/* Feature Showcase 02: Segmentation (Personalization that's intuitive) */}
          <div className="mt-16 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center bg-white p-8 md:p-12 rounded-3xl border border-slate-200/80 shadow-xs">
            {/* Copywriting Block */}
            <div className="space-y-5 text-left order-2 lg:order-1">
              <Badge className="bg-blue-100 text-blue-800 border-blue-200 text-xs font-mono uppercase">SEGMENTATION</Badge>
              <h3 className="text-3xl md:text-4xl font-extrabold text-slate-900 leading-tight">
                Personalization that's intuitive<br /><span className="text-slate-400 font-serif font-normal italic">(not frustrating)</span>
              </h3>
              <p className="text-slate-600 text-base leading-relaxed">
                Target the right people with the right message at the right time with unlimited segments that update in real time. Group your audiences based on campaign activity, shopping behavior, and more.
              </p>

              <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-2xl flex items-center gap-4">
                <span className="text-3xl font-extrabold text-emerald-700 font-mono">62.2%</span>
                <p className="text-xs text-emerald-900 font-medium">Higher order completion rate achieved with real-time segmented campaigns.</p>
              </div>

              <Button onClick={() => navigate("/contacts")} className="bg-slate-900 hover:bg-black text-white rounded-xl text-xs font-semibold px-6 py-3">
                Learn more about segmentation <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </div>

            {/* Visual Segmentation Card */}
            <div className="p-6 bg-slate-900 text-white rounded-2xl border border-slate-800 shadow-xl space-y-4 order-1 lg:order-2 text-left">
              <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                <span className="text-xs font-bold text-slate-400 font-mono">SMART AUDIENCE SEGMENTS</span>
                <Badge className="bg-emerald-500/20 text-emerald-400 border-emerald-500/30 text-[10px]">Real-Time Sync</Badge>
              </div>

              <div className="space-y-2.5">
                <div className="p-3 bg-slate-800/80 rounded-xl border border-slate-700/60 flex items-center justify-between">
                  <div>
                    <p className="text-xs font-bold text-slate-200">Lapsed Customers (60+ Days)</p>
                    <p className="text-[10px] text-slate-400">8,902 Active Contacts</p>
                  </div>
                  <Badge className="bg-amber-500/20 text-amber-400 border-none text-[10px]">High Win-back ROI</Badge>
                </div>

                <div className="p-3 bg-slate-800/80 rounded-xl border border-slate-700/60 flex items-center justify-between">
                  <div>
                    <p className="text-xs font-bold text-slate-200">High-Value COD Buyers</p>
                    <p className="text-[10px] text-slate-400">15,786 Active Contacts</p>
                  </div>
                  <Badge className="bg-emerald-500/20 text-emerald-400 border-none text-[10px]">Prepay Target</Badge>
                </div>
              </div>
            </div>
          </div>

          {/* Integrations Grid (Plug and play connection with your store) */}
          <div className="mt-20 text-center space-y-8">
            <div className="max-w-2xl mx-auto space-y-3">
              <Badge className="bg-slate-100 text-slate-700 border-slate-200 text-xs font-mono uppercase">INTEGRATIONS</Badge>
              <h3 className="text-3xl md:text-4xl font-extrabold text-slate-900">
                Plug and play connection with your store
              </h3>
              <p className="text-slate-500 text-base">
                <strong>Conversio</strong> works with all major e-commerce platforms out of the box — no third-party connectors, no extra setup.
              </p>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 gap-4 max-w-4xl mx-auto">
              {["Shopify", "WooCommerce", "Razorpay", "GoKwik", "WebEngage", "MoEngage", "Pop", "FlexyPe", "Google Sheets", "Nitro Commerce", "Judge.me", "Shiprocket"].map((name) => (
                <div key={name} className="p-4 bg-white rounded-2xl border border-slate-200/80 shadow-xs flex items-center justify-center font-bold text-xs text-slate-800 hover:border-emerald-400 hover:shadow-sm transition-all">
                  {name}
                </div>
              ))}
            </div>
          </div>

        </div>
      </section>

      {/* Pricing Section - Exact Retner Style */}
      <section id="pricing" className="py-24 bg-slate-50/50">
        <div className="container mx-auto px-6 max-w-5xl">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-slate-900">Flexible Pricing Plans</h2>
            <p className="mt-4 text-slate-500 text-lg">Pay only for what you need with base plans and flexible, checkable AI add-ons.</p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 items-start">
            
            {/* CARD 1: WhatsApp Only */}
            <div className="rounded-3xl bg-white p-8 border border-slate-100 shadow-sm flex flex-col justify-between min-h-[750px]">
              <div>
                <h3 className="text-2xl font-bold text-slate-900">WhatsApp Only</h3>
                <p className="text-sm text-slate-400 mt-2">World's most active messaging platform.</p>
                
                <div className="mt-6 flex items-baseline">
                  <span className="text-5xl font-extrabold tracking-tight text-slate-900">₹{waTotalPrice.toLocaleString()}</span>
                  <span className="ml-2 text-sm text-slate-400 font-semibold">/ month</span>
                </div>

                <div className="mt-8 border-t border-slate-100 pt-6">
                  <h4 className="text-[11px] font-bold text-slate-400 uppercase tracking-widest mb-4">Included in Base:</h4>
                  <div className="space-y-4">
                    {[
                      "Official WhatsApp Business API integration",
                      "Intent-Driven Messaging",
                      "Behaviour-driven AI Gamification",
                      "Broadcast campaigns & scheduler",
                      "Standard email & chat support",
                    ].map((feature) => (
                      <div key={feature} className="flex items-start gap-3 text-sm text-slate-600">
                        <CheckCircle2 className="h-4.5 w-4.5 text-emerald-500 mt-0.5 flex-shrink-0" />
                        <span>{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Add-ons list */}
                <div className="mt-8 border-t border-slate-100 pt-6">
                  <h4 className="text-[11px] font-bold text-slate-400 uppercase tracking-widest mb-4">Enhance with Add-ons:</h4>
                  <div className="space-y-3">
                    
                    {/* Addon 1 */}
                    <label className={`flex items-center justify-between p-4 border rounded-2xl cursor-pointer transition-all ${
                      waAddons.aiCalling ? "border-emerald-500/30 bg-emerald-50/20" : "border-slate-100 bg-white"
                    }`}>
                      <div className="flex items-center gap-3">
                        <input
                          type="checkbox"
                          checked={waAddons.aiCalling}
                          onChange={(e) => setWaAddons({ ...waAddons, aiCalling: e.target.checked })}
                          className="h-4.5 w-4.5 rounded border-slate-300 text-emerald-600 focus:ring-emerald-500"
                        />
                        <div>
                          <p className="text-sm font-semibold text-slate-800">AI Calling</p>
                          <p className="text-[11px] text-slate-400 mt-0.5">Handles automated abandoned cart recovery calls...</p>
                        </div>
                      </div>
                      <span className="text-xs font-bold text-slate-800 whitespace-nowrap">+₹1,499<span className="text-[10px] text-slate-400 font-normal">/mo</span></span>
                    </label>

                    {/* Addon 2 */}
                    <label className={`flex items-center justify-between p-4 border rounded-2xl cursor-pointer transition-all ${
                      waAddons.aiChatbot ? "border-emerald-500/30 bg-emerald-50/20" : "border-slate-100 bg-white"
                    }`}>
                      <div className="flex items-center gap-3">
                        <input
                          type="checkbox"
                          checked={waAddons.aiChatbot}
                          onChange={(e) => setWaAddons({ ...waAddons, aiChatbot: e.target.checked })}
                          className="h-4.5 w-4.5 rounded border-slate-300 text-emerald-600 focus:ring-emerald-500"
                        />
                        <div>
                          <p className="text-sm font-semibold text-slate-800">AI Chatbot</p>
                          <p className="text-[11px] text-slate-400 mt-0.5">Enterprise-grade chatbot with unlimited chats...</p>
                        </div>
                      </div>
                      <span className="text-xs font-bold text-slate-800 whitespace-nowrap">+₹1,999<span className="text-[10px] text-slate-400 font-normal">/mo</span></span>
                    </label>

                    {/* Addon 3 */}
                    <label className={`flex items-center justify-between p-4 border rounded-2xl cursor-pointer transition-all ${
                      waAddons.conversioPass ? "border-emerald-500/30 bg-emerald-50/20" : "border-slate-100 bg-white"
                    }`}>
                      <div className="flex items-center gap-3">
                        <input
                          type="checkbox"
                          checked={waAddons.conversioPass}
                          onChange={(e) => setWaAddons({ ...waAddons, conversioPass: e.target.checked })}
                          className="h-4.5 w-4.5 rounded border-slate-300 text-emerald-600 focus:ring-emerald-500"
                        />
                        <div>
                          <p className="text-sm font-semibold text-slate-800">Conversio Pass</p>
                          <p className="text-[11px] text-slate-400 mt-0.5">Unlock identification of anonymous store visitors...</p>
                        </div>
                      </div>
                      <span className="text-xs font-bold text-slate-800 whitespace-nowrap">+₹1,999<span className="text-[10px] text-slate-400 font-normal">/mo</span></span>
                    </label>

                  </div>
                </div>
              </div>
              <Button className="mt-8 w-full bg-[#0A0A0A] hover:bg-black text-white rounded-2xl h-12 text-sm font-semibold transition-all shadow-sm" onClick={() => navigate("/signup")}>
                Start Free Trial
              </Button>
            </div>

            {/* CARD 2: Full Suite */}
            <div className="rounded-3xl bg-white p-8 border border-emerald-500 ring-4 ring-emerald-500/5 shadow-md flex flex-col justify-between min-h-[750px]">
              <div>
                <div className="flex items-center justify-between">
                  <h3 className="text-2xl font-bold text-slate-900">Full Suite</h3>
                  <span className="bg-emerald-50 text-emerald-700 border border-emerald-100 rounded-full px-3 py-1 text-[10px] font-bold uppercase tracking-wider">
                    Most Popular
                  </span>
                </div>
                <p className="text-sm text-slate-400 mt-2">Every touchpoint the customer uses.</p>

                <div className="mt-6 flex items-baseline">
                  <span className="text-5xl font-extrabold tracking-tight text-slate-900">₹{suiteTotalPrice.toLocaleString()}</span>
                  <span className="ml-2 text-sm text-slate-400 font-semibold">/ month</span>
                </div>

                {/* Included Channels Badges */}
                <div className="mt-6">
                  <h4 className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-3">Included Channels:</h4>
                  <div className="flex flex-wrap gap-2">
                    <span className="inline-flex items-center gap-1.5 px-3 py-1.5 border border-green-100 bg-green-50 text-green-700 rounded-xl text-xs font-medium">
                      WhatsApp
                    </span>
                    <span className="inline-flex items-center gap-1.5 px-3 py-1.5 border border-pink-100 bg-pink-50 text-pink-700 rounded-xl text-xs font-medium">
                      Instagram
                    </span>
                    <span className="inline-flex items-center gap-1.5 px-3 py-1.5 border border-red-100 bg-red-50 text-red-700 rounded-xl text-xs font-medium">
                      Email
                    </span>
                    <span className="inline-flex items-center gap-1.5 px-3 py-1.5 border border-blue-100 bg-blue-50 text-blue-700 rounded-xl text-xs font-medium">
                      SMS
                    </span>
                    <span className="inline-flex items-center gap-1.5 px-3 py-1.5 border border-amber-100 bg-amber-50 text-amber-700 rounded-xl text-xs font-medium">
                      RCS
                    </span>
                    <span className="inline-flex items-center gap-1.5 px-3 py-1.5 border border-teal-100 bg-teal-50 text-teal-700 rounded-xl text-xs font-medium">
                      Push Notify
                    </span>
                  </div>
                </div>

                <div className="mt-8 border-t border-slate-100 pt-6">
                  <h4 className="text-[11px] font-bold text-slate-400 uppercase tracking-widest mb-4">Included in Base:</h4>
                  <div className="space-y-4">
                    {[
                      "Cross-channel synchronized flows",
                      "Intent-Driven Messaging",
                      "Behaviour-driven AI Gamification",
                      "Unified CRM inbox for all incoming chats",
                      "24/7 Priority support (Phone & Chat)",
                    ].map((feature) => (
                      <div key={feature} className="flex items-start gap-3 text-sm text-slate-600">
                        <CheckCircle2 className="h-4.5 w-4.5 text-emerald-500 mt-0.5 flex-shrink-0" />
                        <span>{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Add-ons list with discounted tag */}
                <div className="mt-8 border-t border-slate-100 pt-6">
                  <div className="flex items-center justify-between mb-4">
                    <h4 className="text-[11px] font-bold text-slate-400 uppercase tracking-widest">Enhance with Add-ons:</h4>
                    <span className="text-[9px] bg-emerald-500/10 border border-emerald-500/20 text-emerald-800 font-bold px-2 py-0.5 rounded-full">
                      Discounted Rates
                    </span>
                  </div>
                  <div className="space-y-3">
                    
                    {/* Addon 1 */}
                    <label className={`flex items-center justify-between p-4 border rounded-2xl cursor-pointer transition-all ${
                      suiteAddons.aiCalling ? "border-emerald-500 bg-emerald-50/10" : "border-slate-100 bg-white"
                    }`}>
                      <div className="flex items-center gap-3">
                        <input
                          type="checkbox"
                          checked={suiteAddons.aiCalling}
                          onChange={(e) => setSuiteAddons({ ...suiteAddons, aiCalling: e.target.checked })}
                          className="h-4.5 w-4.5 rounded border-slate-300 text-emerald-600 focus:ring-emerald-500"
                        />
                        <div>
                          <p className="text-sm font-semibold text-slate-800">AI Calling</p>
                          <p className="text-[11px] text-slate-400 mt-0.5">Handles automated abandoned cart recovery calls...</p>
                        </div>
                      </div>
                      <span className="text-xs font-bold text-slate-800 whitespace-nowrap">+₹999<span className="text-[10px] text-slate-400 font-normal">/mo</span></span>
                    </label>

                    {/* Addon 2 */}
                    <label className={`flex items-center justify-between p-4 border rounded-2xl cursor-pointer transition-all ${
                      suiteAddons.aiChatbot ? "border-emerald-500 bg-emerald-50/10" : "border-slate-100 bg-white"
                    }`}>
                      <div className="flex items-center gap-3">
                        <input
                          type="checkbox"
                          checked={suiteAddons.aiChatbot}
                          onChange={(e) => setSuiteAddons({ ...suiteAddons, aiChatbot: e.target.checked })}
                          className="h-4.5 w-4.5 rounded border-slate-300 text-emerald-600 focus:ring-emerald-500"
                        />
                        <div>
                          <p className="text-sm font-semibold text-slate-800">AI Chatbot</p>
                          <p className="text-[11px] text-slate-400 mt-0.5">Enterprise-grade chatbot with unlimited chats...</p>
                        </div>
                      </div>
                      <span className="text-xs font-bold text-slate-800 whitespace-nowrap">+₹1,499<span className="text-[10px] text-slate-400 font-normal">/mo</span></span>
                    </label>

                  </div>
                </div>
              </div>
              <Button className="mt-8 w-full bg-emerald-600 hover:bg-emerald-700 text-white rounded-2xl h-12 text-sm font-semibold transition-all shadow-sm" onClick={() => navigate("/signup")}>
                Start Free Trial
              </Button>
            </div>

          </div>
        </div>
      </section>

      {/* CTA Conversion Box */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-6 max-w-5xl">
          <div className="rounded-[2.5rem] bg-[#0A0A0A] text-white p-12 md:p-16 text-center relative overflow-hidden">
            {/* Ambient visual overlay */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(16,185,129,0.15),transparent_60%)]" />
            <h2 className="text-3xl md:text-5xl font-bold tracking-tight mb-4 relative z-10 leading-tight">
              Scale Your Communications &amp; Revenue
            </h2>
            <p className="max-w-2xl mx-auto text-slate-400 text-base md:text-lg mb-8 relative z-10">
              Integrate your Meta business portfolio, launch template-checked broadcasts, and wire Shopify webhooks in minutes.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-3 relative z-10 max-w-xs sm:max-w-none mx-auto">
              <Button className="bg-white text-slate-900 hover:bg-slate-100 px-8 py-3 rounded-xl h-12 font-medium" onClick={() => navigate("/signup")}>
                Start Free Trial <ArrowRight className="h-4 w-4 ml-1.5 inline" />
              </Button>
              <Button variant="outline" className="border-slate-800 text-slate-300 hover:bg-slate-900/50 bg-transparent px-8 py-3 rounded-xl h-12 font-medium" onClick={() => navigate("/login")}>
                See Demo Dashboard
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Unified Public Footer */}
      <PublicFooter />
    </div>
  );
}
