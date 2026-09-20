import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { PublicNavbar } from "@/components/PublicNavbar";
import { PublicFooter } from "@/components/PublicFooter";
import { AeoStructuredData } from "@/components/AeoStructuredData";
import { Link } from "react-router-dom";
import {
  Flame,
  Layers,
  Zap,
  Calendar,
  PhoneCall,
  Mail,
  MessageSquare,
  CheckCircle2,
  Sparkles,
  ArrowRight,
  Clock,
  ShieldCheck,
  Volume2,
} from "lucide-react";

export default function RapidSalesPage() {
  const [simulatingSpeed, setSimulatingSpeed] = useState(false);
  const [leadElapsedSec, setLeadElapsedSec] = useState(0);
  const [leadHasReplied, setLeadHasReplied] = useState(false);

  useEffect(() => {
    document.title = "Tri-Channel Outbound Sales Engine — Conversio AI";
  }, []);

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

  return (
    <div className="min-h-screen bg-[#030712] text-slate-100 font-sans selection:bg-blue-500 selection:text-white overflow-x-hidden relative">
      {/* Background Mesh */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute top-10 right-1/4 w-[600px] h-[450px] bg-blue-600/10 rounded-full blur-[140px]" />
        <div className="absolute bottom-1/4 left-1/4 w-[500px] h-[400px] bg-purple-600/10 rounded-full blur-[140px]" />
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
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-blue-500/10 border border-blue-500/30 text-blue-400 text-xs font-mono font-semibold mb-4 shadow-xs">
              <Flame className="w-3.5 h-3.5 text-blue-400" /> CONVERSIO OUTBOUND SALES ENGINE
            </div>
            <h1 className="text-3xl sm:text-5xl md:text-6xl font-display font-extrabold text-white tracking-tight leading-tight">
              Tri-Channel Sales Outreach with Stop-on-Reply Automation
            </h1>
            <p className="text-slate-400 text-sm sm:text-lg mt-4 max-w-2xl mx-auto">
              Coordinate WhatsApp, Email, and conversational AI Voice Calling in a unified sales pipeline. Never send awkward follow-ups after a prospect replies.
            </p>

            <div className="mt-8 flex flex-col sm:flex-row justify-center gap-4">
              <Link
                to="/book-demo?plan=Growth%20Tri-Channel"
                className="h-12 px-8 rounded-full bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs shadow-[0_0_25px_rgba(59,130,246,0.4)] flex items-center justify-center gap-2 transition-all transform active:scale-95"
              >
                <Calendar className="w-4 h-4" /> Book Sales Demo
              </Link>
              <Link
                to="/pricing"
                className="h-12 px-8 rounded-full bg-slate-900 hover:bg-slate-800 text-slate-200 border border-white/10 font-bold text-xs flex items-center justify-center gap-2 transition-all"
              >
                View Pricing Plans
              </Link>
            </div>
          </div>

          {/* 3 Pillars Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20 text-left">
            {/* Pillar 1 */}
            <div className="rounded-[32px] bg-slate-900/70 border border-white/10 p-7 sm:p-8 flex flex-col justify-between backdrop-blur-xl hover:border-blue-500/40 transition-all shadow-xl">
              <div>
                <div className="w-12 h-12 rounded-2xl bg-blue-500/20 text-blue-400 flex items-center justify-center mb-5 border border-blue-500/30">
                  <Layers className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold text-white mb-2 font-display">
                  Tri-Channel Cadences
                </h3>
                <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
                  Combine WhatsApp (98% open rate) with executive email follow-ups and AI voice dials to achieve 4x higher response rates than email-only campaigns.
                </p>

                <div className="mt-5 pt-4 border-t border-white/10 space-y-2 text-xs font-mono text-slate-300">
                  <div className="flex items-center gap-2"><span className="w-2 h-2 rounded-full bg-emerald-400" /> WhatsApp Instant Ping</div>
                  <div className="flex items-center gap-2"><span className="w-2 h-2 rounded-full bg-blue-400" /> Deep Executive Email Drip</div>
                  <div className="flex items-center gap-2"><span className="w-2 h-2 rounded-full bg-purple-400" /> AI Outbound Phone Call</div>
                </div>
              </div>

              <div className="mt-6 pt-5 border-t border-white/10">
                <Link
                  to="/book-demo?plan=Growth%20Tri-Channel"
                  className="w-full bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs h-11 rounded-2xl flex items-center justify-center gap-2 shadow-[0_0_15px_rgba(59,130,246,0.35)]"
                >
                  <Calendar className="w-4 h-4" /> Book Cadence Demo
                </Link>
              </div>
            </div>

            {/* Pillar 2 */}
            <div className="rounded-[32px] bg-slate-900/70 border border-white/10 p-7 sm:p-8 flex flex-col justify-between backdrop-blur-xl hover:border-orange-500/40 transition-all shadow-xl">
              <div>
                <div className="w-12 h-12 rounded-2xl bg-orange-500/20 text-orange-400 flex items-center justify-center mb-5 border border-orange-500/30">
                  <Zap className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold text-white mb-2 font-display">
                  Stop-on-Reply Engine
                </h3>
                <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
                  As soon as a prospect replies on WhatsApp or Email, Conversio automatically cancels all scheduled follow-ups across all channels.
                </p>

                <div className="mt-5 pt-4 border-t border-white/10 p-3.5 bg-slate-950 rounded-2xl border border-white/10 text-xs font-mono">
                  <span className="text-orange-400 font-bold block">Inbound Reply Detected:</span>
                  <span className="text-slate-300 text-[11px] block mt-1">"Let's schedule a call this Friday."</span>
                  <span className="text-emerald-400 text-[10px] block mt-1 font-bold">✓ Remaining Cadence Cancelled</span>
                </div>
              </div>

              <div className="mt-6 pt-5 border-t border-white/10">
                <Link
                  to="/book-demo?plan=Growth%20Tri-Channel"
                  className="w-full bg-slate-800 hover:bg-slate-700 text-white font-bold text-xs h-11 rounded-2xl flex items-center justify-center gap-2 border border-white/10"
                >
                  <Calendar className="w-4 h-4" /> Book Demo
                </Link>
              </div>
            </div>

            {/* Pillar 3 */}
            <div className="rounded-[32px] bg-slate-900/70 border border-white/10 p-7 sm:p-8 flex flex-col justify-between backdrop-blur-xl hover:border-purple-500/40 transition-all shadow-xl">
              <div>
                <div className="w-12 h-12 rounded-2xl bg-purple-500/20 text-purple-400 flex items-center justify-center mb-5 border border-purple-500/30">
                  <PhoneCall className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold text-white mb-2 font-display">
                  AI Appointment Booking
                </h3>
                <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
                  Our autonomous voice agent calls qualified leads, verifies their requirements, checks real-time availability, and books directly into your Google Calendar.
                </p>

                <div className="mt-5 pt-4 border-t border-white/10 space-y-1.5 text-xs font-mono text-slate-300">
                  <div className="text-purple-400">✓ Native Google Calendar &amp; Outlook sync</div>
                  <div className="text-purple-400">✓ Instant Google Meet dispatch</div>
                  <div className="text-purple-400">✓ Automated WhatsApp reminder with 1-tap reschedule</div>
                </div>
              </div>

              <div className="mt-6 pt-5 border-t border-white/10">
                <Link
                  to="/book-demo?plan=Growth%20Tri-Channel"
                  className="w-full bg-purple-600 hover:bg-purple-500 text-white font-bold text-xs h-11 rounded-2xl flex items-center justify-center gap-2 shadow-[0_0_15px_rgba(147,51,234,0.35)]"
                >
                  <Calendar className="w-4 h-4" /> Book Voice Demo
                </Link>
              </div>
            </div>
          </div>

          {/* Interactive Speed-to-lead Demo */}
          <div className="rounded-[32px] bg-slate-950 border border-white/10 p-7 sm:p-10 text-center max-w-3xl mx-auto shadow-2xl relative overflow-hidden">
            <span className="text-xs font-mono uppercase tracking-widest text-blue-400 font-bold block mb-2">
              SPEED-TO-LEAD BENCHMARK
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold text-white font-display">
              Under 60 Seconds: Why Speed Dictates Closing Rates
            </h2>
            <p className="text-xs sm:text-sm text-slate-400 mt-2 max-w-xl mx-auto">
              Harvard Business Review proves responding to a lead in under 5 minutes makes you 21x more likely to qualify them. Conversio responds in under 48 seconds.
            </p>

            {/* Stopwatch Display */}
            <div className="my-7 p-6 rounded-3xl bg-slate-900 border border-white/10 max-w-md mx-auto shadow-inner">
              <div className="text-4xl sm:text-5xl font-mono font-extrabold text-blue-400 tracking-wider">
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
              className="bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs h-12 px-8 rounded-full cursor-pointer shadow-[0_0_20px_rgba(59,130,246,0.4)] transition-all transform active:scale-95"
            >
              {simulatingSpeed ? "Running Sub-60s Simulation..." : "Test Speed-to-Lead Response"}
            </Button>
          </div>
        </div>
      </main>

      <PublicFooter />
    </div>
  );
}
