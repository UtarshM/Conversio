import { useState } from "react";
import {
  PhoneCall,
  MessageSquare,
  Mail,
  CheckCircle2,
  Volume2,
  Sparkles,
  ShieldCheck,
  Globe,
  Bot,
  Play,
  Pause,
  ArrowRight
} from "lucide-react";
import { Button } from "@/components/ui/button";

export function ChannelsDeepDive({
  onOpenDemo
}: {
  onOpenDemo: (plan: string) => void;
}) {
  const [activeChannel, setActiveChannel] = useState<"voice" | "whatsapp" | "email">("voice");
  const [isPlayingAudio, setIsPlayingAudio] = useState<boolean>(false);

  return (
    <div className="rounded-[32px] bg-slate-950/80 border border-white/10 p-6 sm:p-10 shadow-2xl backdrop-blur-2xl relative overflow-hidden">
      <div className="text-center max-w-3xl mx-auto mb-10">
        <span className="text-xs font-mono font-bold uppercase tracking-widest text-emerald-400 bg-emerald-500/10 border border-emerald-500/30 px-3.5 py-1 rounded-full">
          TRI-CHANNEL ARCHITECTURE
        </span>
        <h3 className="text-2xl sm:text-4xl font-display font-extrabold text-white tracking-tight mt-4">
          Reach Leads Across the Channels They Actually Respond To
        </h3>
        <p className="text-xs sm:text-base text-slate-400 mt-2">
          Stop relying on one fragile channel. Coordinate phone, WhatsApp, and email with unified intelligence.
        </p>

        {/* Channel Tab Selector */}
        <div className="mt-8 inline-flex p-1.5 rounded-full bg-slate-900 border border-white/10">
          <button
            type="button"
            onClick={() => setActiveChannel("voice")}
            className={`px-5 py-2.5 rounded-full text-xs font-bold transition-all cursor-pointer flex items-center gap-2 ${
              activeChannel === "voice"
                ? "bg-purple-600 text-white shadow-[0_0_15px_rgba(168,85,247,0.4)]"
                : "text-slate-400 hover:text-white"
            }`}
          >
            <PhoneCall className="w-3.5 h-3.5" /> AI Voice Calling
          </button>
          <button
            type="button"
            onClick={() => setActiveChannel("whatsapp")}
            className={`px-5 py-2.5 rounded-full text-xs font-bold transition-all cursor-pointer flex items-center gap-2 ${
              activeChannel === "whatsapp"
                ? "bg-emerald-600 text-white shadow-[0_0_15px_rgba(16,185,129,0.4)]"
                : "text-slate-400 hover:text-white"
            }`}
          >
            <MessageSquare className="w-3.5 h-3.5" /> WhatsApp Cloud API
          </button>
          <button
            type="button"
            onClick={() => setActiveChannel("email")}
            className={`px-5 py-2.5 rounded-full text-xs font-bold transition-all cursor-pointer flex items-center gap-2 ${
              activeChannel === "email"
                ? "bg-blue-600 text-white shadow-[0_0_15px_rgba(59,130,246,0.4)]"
                : "text-slate-400 hover:text-white"
            }`}
          >
            <Mail className="w-3.5 h-3.5" /> Email Sequencing
          </button>
        </div>
      </div>

      {/* Tab 1: AI Voice Calling */}
      {activeChannel === "voice" && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center pt-4">
          <div className="lg:col-span-6 space-y-4">
            <div className="inline-flex items-center gap-2 text-purple-400 text-xs font-mono font-bold">
              <Volume2 className="w-4 h-4" /> ULTRA-LOW LATENCY AI VOICE AGENTS
            </div>
            <h4 className="text-xl sm:text-3xl font-bold text-white font-display">
              Voice Calls That Sound 100% Human, Never Robotic
            </h4>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              Equipped with ElevenLabs neural voice models, Conversio AI speaks fluent English, Hindi, Hinglish, and regional dialects with natural pauses. If a prospect interrupts, the AI listens and adjusts in real time.
            </p>

            <div className="space-y-2.5 pt-2 text-xs text-slate-300 font-mono">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-purple-400 shrink-0" />
                <span>Sub-400ms human conversational latency</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-purple-400 shrink-0" />
                <span>Multilingual: English, Hindi, Hinglish, and regional accents</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-purple-400 shrink-0" />
                <span>Auto-categorizes call outcomes (Interested, Callback, DND)</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-purple-400 shrink-0" />
                <span>Full call recording &amp; speech-to-text transcript synced to CRM</span>
              </div>
            </div>

            <div className="pt-4">
              <Button
                onClick={() => onOpenDemo("Growth Tri-Channel")}
                className="bg-purple-600 hover:bg-purple-500 text-white font-bold text-xs h-11 px-6 rounded-xl cursor-pointer shadow-[0_0_15px_rgba(168,85,247,0.4)]"
              >
                Hear Sample Voice Calls
              </Button>
            </div>
          </div>

          {/* Voice Simulator Card */}
          <div className="lg:col-span-6 rounded-3xl bg-slate-900 border border-purple-500/30 p-6 shadow-2xl space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-white/10 text-xs">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-purple-400 animate-ping" />
                <span className="font-bold text-white font-mono">AI DIALER ACTIVE • CALL #8921</span>
              </div>
              <span className="text-purple-400 font-mono text-[11px]">Duration: 01:24</span>
            </div>

            {/* Simulated Live Transcript */}
            <div className="space-y-3 text-xs font-mono bg-slate-950 p-4 rounded-2xl border border-white/10">
              <div className="text-slate-400">
                <span className="text-purple-400 font-bold">AI Agent (Arya):</span> "Hello Vikram ji, calling from Conversio regarding your inquiry on multi-channel automation. Did I catch you at a good time?"
              </div>
              <div className="text-slate-200">
                <span className="text-emerald-400 font-bold">Prospect (Vikram):</span> "Yes, we are spending too much on SDRs dialing manually. How fast can you hook up with our Meta leads?"
              </div>
              <div className="text-slate-400">
                <span className="text-purple-400 font-bold">AI Agent (Arya):</span> "Under 60 seconds! The second a lead clicks your Meta ad, we dial them and send an instant WhatsApp. Would you like to see this live tomorrow at 3 PM?"
              </div>
              <div className="text-slate-200">
                <span className="text-emerald-400 font-bold">Prospect (Vikram):</span> "Yes, book 3 PM."
              </div>
            </div>

            {/* Simulated Audio Waveform Bar */}
            <div className="p-3 rounded-xl bg-slate-950 border border-white/10 flex items-center justify-between gap-3">
              <button
                type="button"
                onClick={() => setIsPlayingAudio(!isPlayingAudio)}
                className="w-8 h-8 rounded-full bg-purple-600 text-white flex items-center justify-center shrink-0 cursor-pointer"
              >
                {isPlayingAudio ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4 ml-0.5" />}
              </button>

              <div className="flex-1 flex items-center gap-1 h-6">
                {[4, 8, 14, 22, 16, 28, 18, 10, 24, 18, 12, 6, 16, 24, 12, 8, 18, 10].map((h, i) => (
                  <span
                    key={i}
                    style={{ height: `${isPlayingAudio ? h : 4}px` }}
                    className="flex-1 bg-purple-400/80 rounded-full transition-all duration-150"
                  />
                ))}
              </div>

              <span className="text-[10px] font-mono text-slate-400">
                {isPlayingAudio ? "Playing 00:42" : "Listen Call Preview"}
              </span>
            </div>
          </div>
        </div>
      )}

      {/* Tab 2: WhatsApp Cloud API */}
      {activeChannel === "whatsapp" && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center pt-4">
          <div className="lg:col-span-6 space-y-4">
            <div className="inline-flex items-center gap-2 text-emerald-400 text-xs font-mono font-bold">
              <ShieldCheck className="w-4 h-4" /> 100% OFFICIAL META BUSINESS PARTNER API
            </div>
            <h4 className="text-xl sm:text-3xl font-bold text-white font-display">
              Zero Phone Number Ban Risk &amp; 98% Open Rates
            </h4>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              Never risk your primary business phone number with unofficial scrapers. Conversio uses the official WhatsApp Business Cloud API with direct Meta verification, verified Green Tick capability, and interactive buttons.
            </p>

            <div className="space-y-2.5 pt-2 text-xs text-slate-300 font-mono">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Direct Meta Pass-Through Pricing (Zero message markup)</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Interactive Quick-Reply &amp; Call-to-Action payment buttons</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>High-frequency broadcast engine with template check</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Shared team CRM inbox for seamless human escalation</span>
              </div>
            </div>

            <div className="pt-4">
              <Button
                onClick={() => onOpenDemo("Starter D2C")}
                className="bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs h-11 px-6 rounded-xl cursor-pointer shadow-[0_0_15px_rgba(16,185,129,0.4)]"
              >
                Connect WhatsApp Cloud API
              </Button>
            </div>
          </div>

          {/* WhatsApp Preview Card */}
          <div className="lg:col-span-6 rounded-3xl bg-slate-900 border border-emerald-500/30 p-6 shadow-2xl space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-white/10 text-xs">
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 rounded-full bg-emerald-500 flex items-center justify-center text-white">
                  <MessageSquare className="w-3.5 h-3.5" />
                </div>
                <span className="font-bold text-white font-mono">Conversio Verified Business API</span>
              </div>
              <span className="text-[10px] font-mono text-emerald-400">Green Tick Active</span>
            </div>

            <div className="p-4 rounded-2xl bg-[#075E54]/20 border border-emerald-500/30 space-y-3 font-sans">
              <div className="bg-[#054640] p-3.5 rounded-2xl text-xs text-white max-w-[85%] space-y-2">
                <p className="font-semibold text-emerald-300">👋 Special Invitation from Conversio</p>
                <p className="text-[12px] text-slate-200">
                  Hi Vikram! We saw your team is scaling outbound sales this quarter. We've unlocked an interactive demo of our Tri-Channel Engine for you.
                </p>
                <span className="text-[9px] text-emerald-200/60 block text-right">10:14 AM ✓✓</span>
              </div>

              {/* Interactive Buttons */}
              <div className="space-y-1.5 pt-1">
                <button
                  type="button"
                  onClick={() => onOpenDemo("Growth Tri-Channel")}
                  className="w-full py-2 bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold rounded-xl text-center cursor-pointer shadow-sm transition-all"
                >
                  📅 Book Live Demo (1-Click)
                </button>
                <button
                  type="button"
                  onClick={() => onOpenDemo("Starter D2C")}
                  className="w-full py-2 bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-medium rounded-xl text-center cursor-pointer transition-all"
                >
                  💬 Chat With Product Specialist
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Tab 3: Email Automation */}
      {activeChannel === "email" && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center pt-4">
          <div className="lg:col-span-6 space-y-4">
            <div className="inline-flex items-center gap-2 text-blue-400 text-xs font-mono font-bold">
              <Mail className="w-4 h-4" /> ENTERPRISE EMAIL PROSPECTING
            </div>
            <h4 className="text-xl sm:text-3xl font-bold text-white font-display">
              Custom Domain Authentication with High Inbox Placement
            </h4>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              Every email cadence is dispatched directly from your authenticated corporate domain (SPF, DKIM, DMARC compliant). Combined with intelligent send throttling and spin syntax, your outreach lands directly in the primary inbox.
            </p>

            <div className="space-y-2.5 pt-2 text-xs text-slate-300 font-mono">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-blue-400 shrink-0" />
                <span>Dedicated custom domain sending with SPF / DKIM verify</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-blue-400 shrink-0" />
                <span>Automated follow-up drip schedules based on open/click tracking</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-blue-400 shrink-0" />
                <span>Zero-collision handoff to WhatsApp and AI Voice callers</span>
              </div>
            </div>

            <div className="pt-4">
              <Button
                onClick={() => onOpenDemo("Growth Tri-Channel")}
                className="bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs h-11 px-6 rounded-xl cursor-pointer shadow-[0_0_15px_rgba(59,130,246,0.4)]"
              >
                Set Up Email Prospecting
              </Button>
            </div>
          </div>

          {/* Email Preview Card */}
          <div className="lg:col-span-6 rounded-3xl bg-slate-900 border border-blue-500/30 p-6 shadow-2xl space-y-3 font-sans">
            <div className="flex items-center justify-between pb-3 border-b border-white/10 text-xs">
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-blue-400" />
                <span className="font-bold text-white font-mono">Outbound Campaign Preview</span>
              </div>
              <span className="text-[10px] font-mono text-blue-400">Primary Inbox Safe</span>
            </div>

            <div className="p-4 rounded-2xl bg-slate-950 border border-white/10 text-xs space-y-2 text-slate-300 font-mono">
              <div className="text-[11px] text-slate-400 border-b border-white/10 pb-2">
                <strong>To:</strong> vikram@targetcompany.com<br />
                <strong>Subject:</strong> Quick thought on {{company}}'s outbound response speed
              </div>
              <p className="pt-2 text-slate-200">
                Hi Vikram,<br /><br />
                Most sales teams lose over 70% of potential pipeline because reps take hours to dial new leads.<br /><br />
                Conversio connects WhatsApp, Email, and human-like AI Voice calls in under 60 seconds of inquiry. We've helped brands 3x their booked meetings.
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
