import { useState } from "react";
import {
  Wrench,
  CheckCircle2,
  Circle,
  X,
  Sparkles,
  Zap,
  ArrowRight,
  Smartphone,
  ShoppingBag,
  ShieldCheck,
  Bot,
  Clock,
} from "lucide-react";
import { Button } from "@/components/ui/button";

interface GuideStep {
  id: string;
  title: string;
  description: string;
  category: string;
  completed: boolean;
  linkText: string;
}

const INITIAL_STEPS: GuideStep[] = [
  {
    id: "s1",
    title: "Connect WhatsApp Business Cloud API",
    description: "Link your verified Meta phone number or get a free Conversio virtual business number.",
    category: "Channels",
    completed: true,
    linkText: "Configure Cloud API",
  },
  {
    id: "s2",
    title: "Sync Shopify / WooCommerce Store",
    description: "Enable real-time webhooks for cart abandonments, new orders, and delivery milestones.",
    category: "Commerce",
    completed: true,
    linkText: "Check Webhook Health",
  },
  {
    id: "s3",
    title: "Set Delivery Batching & Anti-Ban Jitter",
    description: "Configure batch size (25) and randomized recipient delay (5-10s) to safeguard sender score.",
    category: "Deliverability",
    completed: false,
    linkText: "Adjust Rate Limits",
  },
  {
    id: "s4",
    title: "Activate Autonomous Cart Recovery",
    description: "Deploy the 3-step WhatsApp + Voice recovery sequence with instant 1-click UPI links.",
    category: "Automation",
    completed: false,
    linkText: "Launch Workflow",
  },
  {
    id: "s5",
    title: "Enable Indian Vernacular AI Intent",
    description: "Turn on automatic Hindi, Gujarati, and Hinglish intent detection with instant tool execution.",
    category: "AI Engine",
    completed: false,
    linkText: "Test Dialect AI",
  },
];

export function SetupGuideModal() {
  const [isOpen, setIsOpen] = useState(false);
  const [steps, setSteps] = useState<GuideStep[]>(INITIAL_STEPS);

  const completedCount = steps.filter((s) => s.completed).length;
  const progressPercent = Math.round((completedCount / steps.length) * 100);

  const toggleStep = (id: string) => {
    setSteps((prev) =>
      prev.map((s) => (s.id === id ? { ...s, completed: !s.completed } : s))
    );
  };

  return (
    <>
      {/* Floating Setup Guide Trigger Button (Benchmarked from RapidSales) */}
      <div className="fixed bottom-6 right-6 z-50">
        <Button
          onClick={() => setIsOpen(true)}
          className="h-11 px-4 sm:px-5 rounded-2xl bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-400 hover:to-orange-400 text-black font-bold text-xs shadow-xl shadow-orange-500/20 hover:scale-[1.03] transition-all flex items-center gap-2 cursor-pointer border border-orange-400/30"
        >
          <Wrench className="w-4 h-4" />
          <span>Setup Guide</span>
          <span className="w-5 h-5 rounded-full bg-black/20 text-black text-[10px] font-mono font-extrabold flex items-center justify-center">
            {completedCount}/{steps.length}
          </span>
        </Button>
      </div>

      {/* Interactive Modal Drawer */}
      {isOpen && (
        <div className="fixed inset-0 z-[100] bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="w-full max-w-xl bg-[#070e12] border border-white/10 rounded-3xl p-6 sm:p-8 shadow-2xl space-y-6 text-left relative animate-in fade-in zoom-in-95 duration-200">
            {/* Header */}
            <div className="flex items-center justify-between pb-4 border-b border-white/10">
              <div>
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-400 text-xs font-semibold uppercase tracking-wider font-mono">
                  <Wrench className="w-3.5 h-3.5" /> ONBOARDING PLAYBOOK
                </div>
                <h3 className="text-xl font-bold text-white mt-1.5">Conversio Setup Guide</h3>
                <p className="text-xs text-gray-400">Complete these 5 milestones to unlock full revenue autopilot.</p>
              </div>

              <button
                onClick={() => setIsOpen(false)}
                className="w-8 h-8 rounded-xl bg-white/[0.04] hover:bg-white/[0.08] text-gray-400 hover:text-white flex items-center justify-center transition-colors cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Progress Bar */}
            <div className="space-y-2">
              <div className="flex justify-between text-xs font-mono">
                <span className="text-gray-400">Setup Completion:</span>
                <span className="text-amber-400 font-bold">{progressPercent}% ({completedCount} of {steps.length})</span>
              </div>
              <div className="w-full h-2 rounded-full bg-white/10 overflow-hidden">
                <div
                  style={{ width: `${progressPercent}%` }}
                  className="h-full bg-gradient-to-r from-amber-500 to-emerald-400 transition-all duration-300"
                />
              </div>
            </div>

            {/* Checklist Items */}
            <div className="space-y-3 max-h-[340px] overflow-y-auto pr-1">
              {steps.map((step, idx) => (
                <div
                  key={step.id}
                  onClick={() => toggleStep(step.id)}
                  className={`p-4 rounded-2xl border transition-all cursor-pointer flex items-start gap-3.5 ${
                    step.completed
                      ? "bg-emerald-950/20 border-emerald-500/30 text-gray-300"
                      : "bg-white/[0.02] border-white/10 hover:border-amber-500/40 hover:bg-white/[0.04]"
                  }`}
                >
                  <div className="mt-0.5">
                    {step.completed ? (
                      <CheckCircle2 className="w-5 h-5 text-emerald-400" />
                    ) : (
                      <Circle className="w-5 h-5 text-gray-500" />
                    )}
                  </div>

                  <div className="flex-1 space-y-1">
                    <div className="flex items-center justify-between">
                      <h4 className={`text-xs font-bold ${step.completed ? "line-through text-gray-400" : "text-white"}`}>
                        {step.title}
                      </h4>
                      <span className="text-[10px] text-amber-400 bg-amber-500/10 px-2 py-0.2 rounded font-mono">
                        {step.category}
                      </span>
                    </div>

                    <p className="text-[11px] text-gray-400 leading-relaxed">
                      {step.description}
                    </p>

                    <div className="pt-1">
                      <span className="text-[10px] text-emerald-400 hover:underline flex items-center gap-1 font-semibold">
                        {step.linkText} <ArrowRight className="w-2.5 h-2.5" />
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Footer */}
            <div className="pt-4 border-t border-white/10 flex items-center justify-between text-xs">
              <span className="text-gray-400">Need personal onboarding assistance?</span>
              <Button
                size="sm"
                onClick={() => setIsOpen(false)}
                className="h-8 px-4 bg-white/[0.08] hover:bg-white/[0.12] text-white rounded-xl text-xs font-semibold"
              >
                Close Guide
              </Button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
