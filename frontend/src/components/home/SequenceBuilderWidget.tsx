import { useState } from "react";
import {
  MessageSquare,
  Mail,
  PhoneCall,
  Zap,
  ArrowRight,
  CheckCircle2,
  Clock,
  Sparkles,
  Calendar,
  Layers,
  ChevronRight,
  Bot
} from "lucide-react";
import { Button } from "@/components/ui/button";

interface StepNode {
  step: number;
  channel: "whatsapp" | "email" | "voice";
  title: string;
  timing: string;
  preview: string;
  metric: string;
  tag: string;
}

export function SequenceBuilderWidget({
  onOpenDemo
}: {
  onOpenDemo: (plan: string) => void;
}) {
  const [activeCadence, setActiveCadence] = useState<"inbound" | "outbound" | "d2c">("inbound");
  const [selectedStep, setSelectedStep] = useState<number>(1);
  const [stopOnReplyActive, setStopOnReplyActive] = useState<boolean>(true);
  const [isSimulatingReply, setIsSimulatingReply] = useState<boolean>(false);

  const cadences: Record<
    "inbound" | "outbound" | "d2c",
    {
      name: string;
      description: string;
      steps: StepNode[];
    }
  > = {
    inbound: {
      name: "Inbound <60s Qualification Cadence",
      description: "Triggered instantly when a prospect submits a Meta Lead Ad, Webhook, or Google Sheet row.",
      steps: [
        {
          step: 1,
          channel: "whatsapp",
          title: "Channel 1: Instant WhatsApp Welcome + Quick-Reply",
          timing: "Instant (Within 12 seconds)",
          preview: "Hi {{firstName}}! Thanks for inquiring about Conversio. Would you like to see a 5-min live demo this week?",
          metric: "98% Open Rate • 42% Reply Rate",
          tag: "OFFICIAL WHATSAPP CLOUD API"
        },
        {
          step: 2,
          channel: "email",
          title: "Channel 2: Executive Overview & Case Study Deck",
          timing: "Wait 4 Hours (If no WhatsApp reply)",
          preview: "Subject: {{company}} + Conversio: How leading brands 3x'd outbound meetings with unified AI outreach.",
          metric: "68% Open Rate • Domain Authenticated",
          tag: "DMARC/SPF PROTECTED"
        },
        {
          step: 3,
          channel: "voice",
          title: "Channel 3: Autonomous AI Voice Qualification Call",
          timing: "Next Day 11:00 AM (If no email/chat reply)",
          preview: "Hey {{firstName}}, this is Arya from Conversio following up on your demo request. Do you have 2 minutes to chat about your sales team's current setup?",
          metric: "84% Pickup Rate • ElevenLabs Neural Voice",
          tag: "MULTILINGUAL AI VOICE AGENT"
        },
        {
          step: 4,
          channel: "whatsapp",
          title: "Channel 4: AI Calendar Booking & Confirmation",
          timing: "Immediately upon prospect saying 'Yes'",
          preview: "Awesome! Your Google Meet demo is confirmed for tomorrow at 3:00 PM. Here is your calendar link: meet.google.com/xyz",
          metric: "100% Calendar Sync • 0% No-Show Rate",
          tag: "AUTO APPOINTMENT BOOKING"
        }
      ]
    },
    outbound: {
      name: "Cold B2B Multi-Touch Prospecting",
      description: "Targeted outbound for B2B tech, exporters, and agencies to penetrate high-value decision-makers.",
      steps: [
        {
          step: 1,
          channel: "email",
          title: "Channel 1: Hyper-Personalized Cold Introduction",
          timing: "Day 1 (Morning 9:30 AM)",
          preview: "Subject: Quick question regarding {{company}}'s outbound response speed",
          metric: "72% In-box Deliverability",
          tag: "CUSTOM DOMAIN OUTREACH"
        },
        {
          step: 2,
          channel: "whatsapp",
          title: "Channel 2: Contextual WhatsApp Executive Ping",
          timing: "Day 2 (Afternoon 2:15 PM)",
          preview: "Hi {{firstName}}, sent a brief note to your inbox yesterday regarding {{company}}. Sharing our 1-page ROI brief here for quick review.",
          metric: "94% Read Rate within 10 min",
          tag: "OFFICIAL TEMPLATE MESSAGE"
        },
        {
          step: 3,
          channel: "voice",
          title: "Channel 3: AI SDR Follow-Up Call with Human Pauses",
          timing: "Day 4 (Morning 10:45 AM)",
          preview: "Hi {{firstName}}, calling briefly to verify if you had a chance to review the multi-channel ROI brief. Can I schedule 10 minutes with our VP of Sales?",
          metric: "Natural Speech Synthesis",
          tag: "AI VOICE SDR"
        }
      ]
    },
    d2c: {
      name: "D2C Abandoned Checkout & COD Shield",
      description: "Recovers dropped Shopify carts and confirms Cash on Delivery orders to eliminate RTO courier losses.",
      steps: [
        {
          step: 1,
          channel: "whatsapp",
          title: "Channel 1: Cart Recovery with 1-Click Pre-filled Checkout",
          timing: "15 Mins Post-Abandonment",
          preview: "Hey {{firstName}}, your bag is reserved! Complete your order now and enjoy 10% instant discount with code SAVE10.",
          metric: "24.8% Cart Recovery Rate",
          tag: "DYNAMIC DISCOUNT LINK"
        },
        {
          step: 2,
          channel: "voice",
          title: "Channel 2: AI COD Address & Intent Verification Call",
          timing: "Instant upon COD Order Placement",
          preview: "Namaste {{firstName}} ji! This is Conversio confirming order #{{orderId}} for {{productName}}. Press 1 or say 'Confirm' to dispatch today.",
          metric: "-42% RTO Losses • Hindi / Hinglish",
          tag: "AI COD VERIFICATION"
        },
        {
          step: 3,
          channel: "whatsapp",
          title: "Channel 3: Instant UPI Prepay Incentive (Save ₹50)",
          timing: "Immediately during COD verification",
          preview: "Pay via UPI now to get ₹50 cashback + priority air dispatch via Delhivery Express.",
          metric: "38% COD to Prepaid Shift",
          tag: "RAZORPAY / CASHFREE SECURE"
        }
      ]
    }
  };

  const currentCadence = cadences[activeCadence];
  const activeStepData = currentCadence.steps.find((s) => s.step === selectedStep) || currentCadence.steps[0];

  return (
    <div className="rounded-[32px] bg-slate-950/80 border border-white/10 p-6 sm:p-10 shadow-2xl backdrop-blur-2xl relative overflow-hidden">
      {/* Background glow flare */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />

      {/* Header bar */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 pb-8 border-b border-white/10">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/30 text-blue-400 text-xs font-mono font-bold mb-3">
            <Layers className="w-3.5 h-3.5" /> VISUAL MULTI-CHANNEL SEQUENCE BUILDER
          </div>
          <h3 className="text-2xl sm:text-3xl font-display font-extrabold text-white">
            Orchestrate WhatsApp, Email &amp; AI Voice in One Flow
          </h3>
          <p className="text-xs sm:text-sm text-slate-400 mt-1 max-w-2xl">
            {currentCadence.description}
          </p>
        </div>

        {/* Cadence Preset Switcher */}
        <div className="flex flex-wrap gap-2 p-1.5 rounded-2xl bg-slate-900 border border-white/10 shrink-0">
          <button
            type="button"
            onClick={() => {
              setActiveCadence("inbound");
              setSelectedStep(1);
            }}
            className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
              activeCadence === "inbound"
                ? "bg-blue-600 text-white shadow-[0_0_15px_rgba(59,130,246,0.4)]"
                : "text-slate-400 hover:text-white"
            }`}
          >
            Inbound &lt;60s
          </button>
          <button
            type="button"
            onClick={() => {
              setActiveCadence("outbound");
              setSelectedStep(1);
            }}
            className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
              activeCadence === "outbound"
                ? "bg-purple-600 text-white shadow-[0_0_15px_rgba(168,85,247,0.4)]"
                : "text-slate-400 hover:text-white"
            }`}
          >
            Cold B2B Outbound
          </button>
          <button
            type="button"
            onClick={() => {
              setActiveCadence("d2c");
              setSelectedStep(1);
            }}
            className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
              activeCadence === "d2c"
                ? "bg-emerald-600 text-white shadow-[0_0_15px_rgba(16,185,129,0.4)]"
                : "text-slate-400 hover:text-white"
            }`}
          >
            D2C Cart &amp; COD Shield
          </button>
        </div>
      </div>

      {/* Main Flow Canvas & Step Detail Preview */}
      <div className="pt-8 grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: Flow Step Nodes */}
        <div className="lg:col-span-6 space-y-4">
          <div className="flex items-center justify-between text-xs font-mono text-slate-400 pb-2">
            <span>SEQUENCE PIPELINE ({currentCadence.steps.length} TOUCHPOINTS)</span>
            <span className="text-emerald-400 font-bold flex items-center gap-1">
              <Sparkles className="w-3 h-3" /> CLICK TO INSPECT NODE
            </span>
          </div>

          {currentCadence.steps.map((node) => {
            const isSelected = selectedStep === node.step;
            const isHaltedByReply = isSimulatingReply && node.step > 1;

            return (
              <div
                key={node.step}
                onClick={() => setSelectedStep(node.step)}
                className={`p-4 rounded-2xl border transition-all cursor-pointer relative ${
                  isSelected
                    ? "bg-slate-900 border-blue-500 shadow-[0_0_20px_rgba(59,130,246,0.25)] ring-1 ring-blue-500/50"
                    : isHaltedByReply
                    ? "bg-slate-950/40 border-dashed border-red-500/40 opacity-60"
                    : "bg-slate-900/60 border-white/10 hover:border-white/20"
                }`}
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-start gap-3">
                    <div
                      className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 mt-0.5 ${
                        node.channel === "whatsapp"
                          ? "bg-emerald-500/20 text-emerald-400 border border-emerald-500/30"
                          : node.channel === "email"
                          ? "bg-blue-500/20 text-blue-400 border border-blue-500/30"
                          : "bg-purple-500/20 text-purple-400 border border-purple-500/30"
                      }`}
                    >
                      {node.channel === "whatsapp" && <MessageSquare className="w-4 h-4" />}
                      {node.channel === "email" && <Mail className="w-4 h-4" />}
                      {node.channel === "voice" && <PhoneCall className="w-4 h-4" />}
                    </div>

                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-mono font-bold text-white">
                          Step {node.step}
                        </span>
                        <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-white/5 text-slate-300 border border-white/10">
                          {node.timing}
                        </span>
                      </div>
                      <h4 className="text-sm font-bold text-slate-100 mt-1">
                        {node.title}
                      </h4>
                      <p className="text-[11px] text-slate-400 font-mono mt-1">
                        {isHaltedByReply ? (
                          <span className="text-red-400 font-bold">
                            ⚠️ HALTED BY STOP-ON-REPLY (Prospect Replied on WhatsApp)
                          </span>
                        ) : (
                          node.metric
                        )}
                      </p>
                    </div>
                  </div>

                  <ChevronRight
                    className={`w-4 h-4 text-slate-500 mt-2 transition-transform ${
                      isSelected ? "text-blue-400 rotate-90" : ""
                    }`}
                  />
                </div>
              </div>
            );
          })}

          {/* Stop-on-Reply Interactive Bar */}
          <div className="p-4 rounded-2xl bg-slate-900 border border-amber-500/30 flex items-center justify-between gap-4 mt-6">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-xl bg-amber-500/20 text-amber-400 flex items-center justify-center shrink-0">
                <Zap className="w-4 h-4" />
              </div>
              <div>
                <span className="text-xs font-bold text-white block">
                  Stop-on-Reply Cross-Channel Safety
                </span>
                <span className="text-[11px] text-slate-400 block">
                  Automatically halts all remaining drips the instant a prospect responds on ANY channel.
                </span>
              </div>
            </div>

            <button
              type="button"
              onClick={() => setIsSimulatingReply(!isSimulatingReply)}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-mono font-bold shrink-0 transition-all cursor-pointer border ${
                isSimulatingReply
                  ? "bg-red-500/20 border-red-500 text-red-300 shadow-[0_0_15px_rgba(239,68,68,0.3)]"
                  : "bg-amber-500/20 border-amber-500/40 text-amber-300 hover:bg-amber-500/30"
              }`}
            >
              {isSimulatingReply ? "Reset Cadence" : "Simulate Prospect Reply"}
            </button>
          </div>
        </div>

        {/* Right Column: Node Inspector & Live Preview */}
        <div className="lg:col-span-6 rounded-3xl bg-slate-900/90 border border-white/10 p-6 sm:p-7 shadow-2xl relative">
          <div className="flex items-center justify-between pb-4 border-b border-white/10">
            <div>
              <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-blue-400">
                NODE INSPECTOR • STEP {activeStepData.step}
              </span>
              <h4 className="text-base sm:text-lg font-bold text-white mt-0.5">
                {activeStepData.title}
              </h4>
            </div>
            <span className="text-[10px] font-mono px-2.5 py-1 rounded-full bg-white/10 text-emerald-400 font-bold border border-emerald-500/30">
              {activeStepData.tag}
            </span>
          </div>

          {/* Node Execution Details */}
          <div className="space-y-4 py-5">
            <div>
              <label className="text-[11px] font-mono uppercase tracking-wider text-slate-400 block mb-1.5">
                Execution Trigger &amp; Timing
              </label>
              <div className="p-3 rounded-xl bg-slate-950 border border-white/10 text-xs font-mono text-slate-200 flex items-center gap-2">
                <Clock className="w-3.5 h-3.5 text-blue-400" />
                <span>{activeStepData.timing}</span>
              </div>
            </div>

            <div>
              <label className="text-[11px] font-mono uppercase tracking-wider text-slate-400 block mb-1.5">
                Dynamic Message &amp; AI Prompt Payload
              </label>
              <div className="p-4 rounded-xl bg-slate-950 border border-white/10 text-xs text-slate-200 font-mono leading-relaxed relative">
                <p>{activeStepData.preview}</p>
                {activeStepData.channel === "voice" && (
                  <div className="mt-3 pt-3 border-t border-white/10 flex items-center gap-2 text-[10px] text-purple-300">
                    <span className="w-2 h-2 rounded-full bg-purple-400 animate-pulse" />
                    <span>Neural Voice Model: ElevenLabs Ultra-Low Latency (~380ms)</span>
                  </div>
                )}
                {activeStepData.channel === "whatsapp" && (
                  <div className="mt-3 pt-3 border-t border-white/10 flex items-center gap-2 text-[10px] text-emerald-300">
                    <span className="w-2 h-2 rounded-full bg-emerald-400" />
                    <span>Quick-Reply Buttons: [Book Demo Now] [Schedule for Tomorrow]</span>
                  </div>
                )}
              </div>
            </div>

            <div>
              <label className="text-[11px] font-mono uppercase tracking-wider text-slate-400 block mb-1.5">
                Verified Benchmark Performance
              </label>
              <div className="p-3 rounded-xl bg-emerald-950/40 border border-emerald-500/30 text-xs font-mono text-emerald-300 flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>{activeStepData.metric}</span>
              </div>
            </div>
          </div>

          <div className="pt-4 border-t border-white/10 flex flex-col sm:flex-row gap-3">
            <Button
              onClick={() => onOpenDemo("Growth Tri-Channel")}
              className="flex-1 bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs h-11 rounded-xl cursor-pointer shadow-[0_0_15px_rgba(59,130,246,0.35)]"
            >
              Launch This Sequence
            </Button>
            <Button
              onClick={() => onOpenDemo("Growth Tri-Channel")}
              variant="outline"
              className="border-white/10 text-slate-300 hover:text-white bg-slate-800 text-xs font-bold h-11 rounded-xl cursor-pointer"
            >
              Customize Variables
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
