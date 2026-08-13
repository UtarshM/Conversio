import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { PublicNavbar } from "@/components/PublicNavbar";
import { PublicFooter } from "@/components/PublicFooter";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  ArrowRight,
  Sparkles,
  Zap,
  Activity,
  Radio,
  MessageSquare,
  Instagram,
  Phone,
  Bell,
  Mail,
  Smartphone,
  CheckCircle2,
  Layers,
  ShoppingBag,
  Flame,
  Crown,
  Search,
  Tag,
  RotateCcw,
  Clock,
} from "lucide-react";

export default function OmnichannelPage() {
  const navigate = useNavigate();
  const [selectedSignal, setSelectedSignal] = useState<number | null>(0);

  const liveSignals = [
    { label: "Anonymous user clicked CTA", icon: Zap, color: "text-amber-600 bg-amber-100/80" },
    { label: "Viewed reviews gallery", icon: Activity, color: "text-blue-600 bg-blue-100/80" },
    { label: "Scrolled 90% on home", icon: Sparkles, color: "text-purple-600 bg-purple-100/80" },
    { label: "Landed on Product page", icon: ShoppingBag, color: "text-emerald-600 bg-emerald-100/80" },
    { label: "Viewed Bundle collection", icon: Layers, color: "text-indigo-600 bg-indigo-100/80" },
    { label: "Scrolled 83% on checkout", icon: Activity, color: "text-rose-600 bg-rose-100/80" },
  ];

  const smartProfiles = [
    { name: "High-Value Shopper", icon: Crown, bg: "bg-amber-50 text-amber-900 border-amber-200" },
    { name: "Product Persuader", icon: Flame, bg: "bg-rose-50 text-rose-900 border-rose-200" },
    { name: "Product Researcher", icon: Search, bg: "bg-blue-50 text-blue-900 border-blue-200" },
    { name: "Bargain Hunter", icon: Tag, bg: "bg-emerald-50 text-emerald-900 border-emerald-200" },
    { name: "Repeat Purchaser", icon: RotateCcw, bg: "bg-purple-50 text-purple-900 border-purple-200" },
    { name: "Hesitant Buyer", icon: Clock, bg: "bg-orange-50 text-orange-900 border-orange-200" },
  ];

  const deliveryChannels = [
    { name: "WhatsApp", icon: MessageSquare, color: "text-emerald-800 bg-emerald-50 border-emerald-200" },
    { name: "Instagram DMs", icon: Instagram, color: "text-pink-800 bg-pink-50 border-pink-200" },
    { name: "Facebook Ads", icon: Radio, color: "text-blue-800 bg-blue-50 border-blue-200" },
    { name: "AI Voice", icon: Phone, color: "text-purple-800 bg-purple-50 border-purple-200" },
    { name: "Push Alerts", icon: Bell, color: "text-amber-800 bg-amber-50 border-amber-200" },
    { name: "SMS / RCS", icon: Smartphone, color: "text-cyan-800 bg-cyan-50 border-cyan-200" },
    { name: "Email Sequence", icon: Mail, color: "text-rose-800 bg-rose-50 border-rose-200" },
  ];

  return (
    <div className="min-h-screen bg-white text-slate-900 font-sans flex flex-col justify-between selection:bg-emerald-500 selection:text-black">
      {/* Shared Public Navbar */}
      <PublicNavbar />

      {/* Main Container */}
      <main className="pt-36 pb-24 px-4 sm:px-6 max-w-7xl mx-auto w-full space-y-16">
        
        {/* Header Block */}
        <div className="text-center max-w-4xl mx-auto space-y-4">
          <Badge className="bg-emerald-100 text-emerald-800 border-emerald-200 text-xs font-mono tracking-widest uppercase py-1.5 px-4 font-bold">
            INTENT-DRIVEN OMNICHANNEL ARCHITECTURE
          </Badge>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-display font-extrabold tracking-tight text-slate-900 leading-tight">
            Turn Real-Time Visitor Signals into Multi-Channel Revenue
          </h1>
          <p className="text-slate-600 text-lg max-w-3xl mx-auto leading-relaxed font-normal">
            Conversio captures live browser signals, scores intent automatically, resolves visitor identities with Conversio Pass, and dispatches automated WhatsApp, AI Voice, and Instagram workflows.
          </p>
        </div>

        {/* 4-Column Pipeline Diagram (Retner.ai /omnichannel Style in LIGHT MODE) */}
        <div className="bg-slate-50 border border-slate-200 p-6 md:p-10 rounded-[36px] shadow-sm space-y-6">
          <div className="flex items-center justify-between border-b border-slate-200 pb-4">
            <h3 className="text-sm font-bold text-slate-900 font-mono flex items-center gap-2">
              <Activity className="w-4 h-4 text-emerald-600" /> CONVERSIO REAL-TIME REVENUE PIPELINE
            </h3>
            <Badge className="bg-emerald-100 text-emerald-800 border-none text-[10px] font-bold">Real-Time Processing</Badge>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 items-stretch text-left font-sans">
            
            {/* COLUMN 1: LIVE SIGNALS */}
            <div className="bg-white border border-slate-200 p-5 rounded-3xl space-y-4 flex flex-col justify-between shadow-xs">
              <div className="flex items-center gap-2">
                <span className="w-6 h-6 rounded-full bg-emerald-500 text-black font-extrabold text-xs flex items-center justify-center font-mono">1</span>
                <h4 className="font-bold text-slate-900 text-base">Live Signals</h4>
              </div>

              <div className="space-y-2.5 relative pl-4 border-l-2 border-slate-200">
                {liveSignals.map((signal, idx) => (
                  <div
                    key={idx}
                    onClick={() => setSelectedSignal(idx)}
                    className={`p-3 rounded-2xl border transition-all cursor-pointer flex items-center gap-3 ${
                      selectedSignal === idx
                        ? "bg-slate-100 border-emerald-500 text-slate-900 shadow-2xs font-bold"
                        : "bg-slate-50/70 border-slate-200 text-slate-600 hover:border-slate-300 hover:text-slate-900"
                    }`}
                  >
                    <div className={`w-7 h-7 rounded-xl flex items-center justify-center flex-shrink-0 ${signal.color}`}>
                      <signal.icon className="w-3.5 h-3.5" />
                    </div>
                    <span className="text-xs font-semibold leading-tight">{signal.label}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* COLUMN 2: INTENT SCORING */}
            <div className="bg-white border border-slate-200 p-5 rounded-3xl space-y-4 flex flex-col justify-between shadow-xs">
              <div className="flex items-center gap-2">
                <span className="w-6 h-6 rounded-full bg-emerald-500 text-black font-extrabold text-xs flex items-center justify-center font-mono">2</span>
                <h4 className="font-bold text-slate-900 text-base">Intent Scoring</h4>
              </div>

              <div className="space-y-3">
                {/* High Intent */}
                <div className="p-4 bg-rose-50/60 border-l-4 border-l-rose-500 border-rose-200/60 rounded-2xl space-y-1">
                  <Badge className="bg-rose-100 text-rose-800 border-none text-[10px] font-mono font-bold">⚡ HIGH INTENT</Badge>
                  <p className="text-xs font-bold text-slate-900 pt-1">Ready to buy. Needs an instant nudge.</p>
                  <p className="text-[10px] text-slate-600">Triggers instant WhatsApp offer + 5% UPI discount.</p>
                </div>

                {/* Medium Intent */}
                <div className="p-4 bg-amber-50/60 border-l-4 border-l-amber-500 border-amber-200/60 rounded-2xl space-y-1">
                  <Badge className="bg-amber-100 text-amber-800 border-none text-[10px] font-mono font-bold">⚡ MEDIUM INTENT</Badge>
                  <p className="text-xs font-bold text-slate-900 pt-1">Comparing options. Needs social proof.</p>
                  <p className="text-[10px] text-slate-600">Triggers customer reviews &amp; warranty badge.</p>
                </div>

                {/* Low Intent */}
                <div className="p-4 bg-blue-50/60 border-l-4 border-l-blue-500 border-blue-200/60 rounded-2xl space-y-1">
                  <Badge className="bg-blue-100 text-blue-800 border-none text-[10px] font-mono font-bold">👁️ LOW INTENT</Badge>
                  <p className="text-xs font-bold text-slate-900 pt-1">Just browsing. Capture email or SMS.</p>
                  <p className="text-[10px] text-slate-600">Triggers exit intent lead popup.</p>
                </div>
              </div>
            </div>

            {/* COLUMN 3: SMART PROFILES */}
            <div className="bg-white border border-slate-200 p-5 rounded-3xl space-y-4 flex flex-col justify-between shadow-xs">
              <div className="flex items-center gap-2">
                <span className="w-6 h-6 rounded-full bg-emerald-500 text-black font-extrabold text-xs flex items-center justify-center font-mono">3</span>
                <h4 className="font-bold text-slate-900 text-base">Smart Profiles</h4>
              </div>

              <div className="grid grid-cols-2 gap-2.5">
                {smartProfiles.map((persona, idx) => (
                  <div key={idx} className={`p-3 rounded-2xl border flex flex-col items-center text-center justify-center space-y-1.5 ${persona.bg}`}>
                    <persona.icon className="w-5 h-5" />
                    <span className="text-[10px] font-bold leading-tight">{persona.name}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* COLUMN 4: ACTION DELIVERY */}
            <div className="bg-white border border-slate-200 p-5 rounded-3xl space-y-4 flex flex-col justify-between shadow-xs">
              <div className="flex items-center gap-2">
                <span className="w-6 h-6 rounded-full bg-emerald-500 text-black font-extrabold text-xs flex items-center justify-center font-mono">4</span>
                <h4 className="font-bold text-slate-900 text-base">Action Delivery</h4>
              </div>

              <div className="space-y-2">
                {deliveryChannels.map((channel, idx) => (
                  <div key={idx} className={`p-2.5 rounded-xl border flex items-center justify-between font-bold text-xs ${channel.color}`}>
                    <span className="flex items-center gap-2">
                      <channel.icon className="w-4 h-4" /> {channel.name}
                    </span>
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                  </div>
                ))}
              </div>
            </div>

          </div>
        </div>

        {/* CTA Banner */}
        <div className="bg-gradient-to-r from-emerald-900 to-slate-900 text-white p-8 md:p-12 rounded-[36px] text-center space-y-6 shadow-xl">
          <Badge className="bg-emerald-500/20 text-emerald-300 border-none text-xs font-mono uppercase font-bold">DEPLOY OMNICHANNEL IN 2 MINUTES</Badge>
          <h2 className="text-3xl md:text-5xl font-extrabold text-white">Ready to automate your intent-driven shopper flow?</h2>
          <p className="text-slate-200 text-base max-w-xl mx-auto font-normal">Connect your Shopify or WooCommerce store today and launch pre-built omni-channel triggers.</p>
          
          <div className="flex flex-col sm:flex-row justify-center gap-4 pt-2">
            <Button onClick={() => navigate("/signup")} className="bg-emerald-500 hover:bg-emerald-400 text-black font-bold text-xs px-8 py-3 rounded-xl h-12">
              Start Free Trial <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
            <Button onClick={() => navigate("/playground")} variant="outline" className="border-slate-600 text-white hover:bg-slate-800 text-xs px-8 py-3 rounded-xl h-12">
              Test in Live Sandbox
            </Button>
          </div>
        </div>

      </main>

      {/* Shared Public Footer */}
      <PublicFooter />
    </div>
  );
}
