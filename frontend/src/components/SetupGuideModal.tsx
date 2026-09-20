import { useState } from "react";
import {
  CheckCircle2,
  Circle,
  X,
  Sparkles,
  ArrowRight,
  Wand2,
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
    title: "Setup AI Inbound Agent & FAQs",
    description: "Train the bot on your return policy, catalogue FAQs, and Indian Hinglish slang handling.",
    category: "AI Autopilot",
    completed: true,
    linkText: "Test AI Responses",
  },
];

export function SetupGuideModal() {
  const [isOpen, setIsOpen] = useState(false);
  const [steps, setSteps] = useState<GuideStep[]>(INITIAL_STEPS);

  const completedCount = steps.filter((s) => s.completed).length;
  const progressPercent = Math.round((completedCount / steps.length) * 100);

  const toggleStep = (id: string) => {
    setSteps((current) =>
      current.map((s) => (s.id === id ? { ...s, completed: !s.completed } : s))
    );
  };

  return (
    <>
      {/* Floating Setup Guide Trigger Button (Exact RapidSales Match) */}
      <div className="fixed bottom-6 right-6 z-50">
        <button
          type="button"
          onClick={() => setIsOpen(true)}
          className="h-10 px-4 rounded-full bg-[#ea580c] hover:bg-[#c2410c] text-white font-semibold text-xs shadow-lg shadow-orange-500/20 hover:scale-[1.03] transition-all flex items-center gap-2 cursor-pointer border border-white/20"
        >
          <Wand2 className="w-3.5 h-3.5" />
          <span>Setup Guide</span>
          <span className="w-5 h-5 rounded-full bg-black/20 text-white text-[10px] font-mono font-bold flex items-center justify-center">
            {completedCount}/{steps.length}
          </span>
        </button>
      </div>

      {/* Interactive Modal Drawer */}
      {isOpen && (
        <div className="fixed inset-0 z-[100] bg-black/50 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="w-full max-w-xl bg-white border border-gray-200 rounded-2xl p-6 shadow-2xl space-y-5 text-left relative animate-in fade-in zoom-in-95 duration-150">
            {/* Header */}
            <div className="flex items-center justify-between pb-3 border-b border-gray-100">
              <div>
                <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-orange-50 border border-orange-200 text-[#ea580c] text-[11px] font-bold uppercase tracking-wider">
                  <Wand2 className="w-3 h-3" /> Setup Playbook
                </div>
                <h3 className="text-lg font-bold text-gray-900 mt-1">Get Started with Conversio</h3>
                <p className="text-xs text-gray-500">Complete these milestones to launch your autonomous outreach.</p>
              </div>

              <button
                onClick={() => setIsOpen(false)}
                className="w-7 h-7 rounded-lg bg-gray-100 hover:bg-gray-200 text-gray-500 flex items-center justify-center transition-colors cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Progress Bar */}
            <div className="space-y-1.5">
              <div className="flex justify-between text-xs">
                <span className="text-gray-500 font-medium">Completion:</span>
                <span className="text-[#ea580c] font-bold font-mono">{progressPercent}% ({completedCount} of {steps.length})</span>
              </div>
              <div className="w-full h-2 rounded-full bg-gray-100 overflow-hidden">
                <div
                  style={{ width: `${progressPercent}%` }}
                  className="h-full bg-[#ea580c] transition-all duration-300"
                />
              </div>
            </div>

            {/* Checklist Items */}
            <div className="space-y-2.5 max-h-[340px] overflow-y-auto pr-1">
              {steps.map((step) => (
                <div
                  key={step.id}
                  onClick={() => toggleStep(step.id)}
                  className={`p-3.5 rounded-xl border transition-all cursor-pointer flex items-start gap-3 ${
                    step.completed
                      ? "bg-emerald-50/50 border-emerald-200/80 text-gray-700"
                      : "bg-white border-gray-200 hover:border-orange-300 hover:bg-orange-50/20"
                  }`}
                >
                  <div className="mt-0.5">
                    {step.completed ? (
                      <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                    ) : (
                      <Circle className="w-4 h-4 text-gray-400" />
                    )}
                  </div>

                  <div className="flex-1 space-y-0.5">
                    <div className="flex items-center justify-between">
                      <h4 className={`text-xs font-bold ${step.completed ? "line-through text-gray-400" : "text-gray-900"}`}>
                        {step.title}
                      </h4>
                      <span className="text-[10px] text-orange-600 bg-orange-50 border border-orange-200/60 px-2 py-0.2 rounded font-medium">
                        {step.category}
                      </span>
                    </div>

                    <p className="text-[11px] text-gray-500 leading-relaxed">
                      {step.description}
                    </p>

                    <div className="pt-1">
                      <span className="text-[10px] text-[#ea580c] hover:underline flex items-center gap-1 font-semibold">
                        {step.linkText} <ArrowRight className="w-2.5 h-2.5" />
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Footer */}
            <div className="pt-3 border-t border-gray-100 flex items-center justify-between text-xs">
              <span className="text-gray-500">Need personal onboarding assistance?</span>
              <Button
                size="sm"
                onClick={() => setIsOpen(false)}
                className="h-8 px-4 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg text-xs font-semibold"
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
