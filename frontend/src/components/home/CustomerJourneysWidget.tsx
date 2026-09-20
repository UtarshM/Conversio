import React, { useState } from "react";
import {
  GitFork,
  CheckCircle2,
  Clock,
  ArrowRight,
  MessageSquare,
  Mail,
  PhoneCall,
  Sparkles,
  ShoppingBag,
  ShieldCheck,
  RotateCcw,
  Zap,
} from "lucide-react";

interface JourneyStep {
  title: string;
  channel: string;
  delay?: string;
  condition?: string;
  detail: string;
  icon: "whatsapp" | "email" | "voice" | "event" | "ai";
}

interface JourneyBlueprint {
  id: string;
  name: string;
  category: "Recover" | "Retain" | "Convert" | "Shield";
  triggerEvent: string;
  description: string;
  metrics: { label: string; value: string };
  steps: JourneyStep[];
}

const JOURNEYS: JourneyBlueprint[] = [
  {
    id: "cart-recovery",
    name: "Autonomous Abandoned Cart Recovery",
    category: "Recover",
    triggerEvent: "event: cart.abandoned",
    description: "Multichannel cascade that stops instantly upon purchase detection to prevent awkward spam.",
    metrics: { label: "Cart Recovery Rate", value: "24.8%" },
    steps: [
      {
        title: "Cart Abandoned Detected",
        channel: "Webhook Trigger",
        delay: "Immediate",
        detail: "Shopify checkout session paused without payment completion.",
        icon: "event",
      },
      {
        title: "Personalized WhatsApp 1-Click Checkout",
        channel: "WhatsApp Cloud API",
        delay: "+15 Minutes",
        condition: "If unpurchased",
        detail: "Sends product photo, reserved cart list, and direct Razorpay 1-click UPI checkout button.",
        icon: "whatsapp",
      },
      {
        title: "Conditional Purchase Check",
        channel: "Event Engine",
        delay: "+2 Hours",
        condition: "Order completed? STOP. Otherwise proceed.",
        detail: "Conversio verifies order status in real time to guarantee zero duplicate messages.",
        icon: "ai",
      },
      {
        title: "Smart Email with Social Proof & FAQs",
        channel: "Authenticated Email",
        delay: "+4 Hours",
        condition: "If still abandoned",
        detail: "Delivers customer reviews, dermatologist backing, and 24-hour reserved stock guarantee.",
        icon: "email",
      },
      {
        title: "Autonomous AI Conversion Concierge",
        channel: "WhatsApp AI Agent",
        delay: "+24 Hours",
        condition: "Cart value > ₹2,000",
        detail: "AI Agent checks if shopper had questions about size/shade and offers 5% expiring voucher.",
        icon: "ai",
      },
    ],
  },
  {
    id: "predictive-reorder",
    name: "Predictive Product Consumption Reorder",
    category: "Retain",
    triggerEvent: "event: order.delivered",
    description: "Calculates the exact day the customer's bottle or jar will finish and automates replenishment.",
    metrics: { label: "Repeat Purchase Rate", value: "31.2%" },
    steps: [
      {
        title: "Order Delivered Notification",
        channel: "Shiprocket Webhook",
        delay: "Day 0",
        detail: "Tracks successful physical delivery and starts the 30-day consumable depletion countdown.",
        icon: "event",
      },
      {
        title: "How-To-Use Routine Guide",
        channel: "WhatsApp Interactive",
        delay: "+3 Days",
        detail: "Sends morning & night routine instructions to maximize customer results and satisfaction.",
        icon: "whatsapp",
      },
      {
        title: "Depletion Window Prediction",
        channel: "AI Intelligence",
        delay: "Day 24 of 30",
        detail: "AI predicts ~6ml remaining based on customer application frequency models.",
        icon: "ai",
      },
      {
        title: "1-Click Restock WhatsApp Flow",
        channel: "WhatsApp Cloud API",
        delay: "Day 27",
        detail: "'Running low, Rahul? Click here to restock your Glow Serum before you run out.' Pre-filled UPI link.",
        icon: "whatsapp",
      },
    ],
  },
  {
    id: "cod-shield",
    name: "High-Risk COD & RTO Verification",
    category: "Shield",
    triggerEvent: "event: order.created (COD)",
    description: "Calculates 7-factor RTO risk and executes automated confirmation cascade before warehouse dispatch.",
    metrics: { label: "RTO Losses Prevented", value: "65.4%" },
    steps: [
      {
        title: "COD Order Placed on Shopify",
        channel: "Shopify Webhook",
        delay: "Immediate",
        detail: "Order #SC-1829 captured with COD payment method.",
        icon: "event",
      },
      {
        title: "RTO Risk Calculation (Low / Med / High)",
        channel: "Conversio Risk Engine",
        delay: "120ms",
        detail: "Scored on past return history, pincode deliverability, address completeness, and order value.",
        icon: "ai",
      },
      {
        title: "1-Click WhatsApp Confirmation Ping",
        channel: "WhatsApp Cloud API",
        delay: "+1 Minute",
        condition: "Medium & High Risk",
        detail: "Interactive buttons: 'Confirm Order' or 'Convert to Prepaid for ₹100 Cashback'.",
        icon: "whatsapp",
      },
      {
        title: "Autonomous Multilingual AI Voice Call",
        channel: "AI Telephony",
        delay: "+2 Hours",
        condition: "If WhatsApp Unanswered",
        detail: "AI agent speaks Hindi or Gujarati to verify address and delivery willingness.",
        icon: "voice",
      },
    ],
  },
  {
    id: "inactivity-winback",
    name: "60-Day Inactive Customer Win-Back",
    category: "Retain",
    triggerEvent: "event: customer.churn_risk_changed",
    description: "Detects lapse in repurchase habit and delivers curated personalized catalog recommendations.",
    metrics: { label: "Win-Back Conversion", value: "14.2%" },
    steps: [
      {
        title: "Inactivity Milestone Detected",
        channel: "RFM Segmentation",
        delay: "Day 55",
        detail: "Customer has exceeded 1.5x their historical inter-purchase interval.",
        icon: "event",
      },
      {
        title: "Curated Routine Recommendation",
        channel: "WhatsApp Flow",
        delay: "Day 58 at 11:00 AM",
        detail: "Showcases complementary new product drops suited to their past skin preferences.",
        icon: "whatsapp",
      },
      {
        title: "VIP We-Miss-You Incentive",
        channel: "Smart Email",
        delay: "+2 Days",
        condition: "If unread on WhatsApp",
        detail: "Exclusive VIP loyalty perk with 48-hour expiration timer.",
        icon: "email",
      },
    ],
  },
];

export const CustomerJourneysWidget: React.FC = () => {
  const [selectedJourney, setSelectedJourney] = useState<JourneyBlueprint>(JOURNEYS[0]);

  return (
    <div className="rounded-3xl border border-white/10 bg-[#091014]/90 p-6 lg:p-10 shadow-2xl backdrop-blur-2xl">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-8 border-b border-white/10">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-semibold uppercase tracking-wider mb-2">
            <GitFork className="w-3.5 h-3.5" /> Module 5 & 6 — Event-Driven Automation Engine
          </div>
          <h3 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
            Automate Every Step of the Customer Journey
          </h3>
          <p className="text-sm text-gray-400 mt-1">
            20+ real-time e-commerce triggers. Workflows pause dynamically the second an order is completed to protect customer goodwill.
          </p>
        </div>

        <div className="flex items-center gap-2 text-xs font-bold text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-3 py-1.5 rounded-xl">
          <Zap className="w-3.5 h-3.5" /> Stop-on-Reply & Stop-on-Purchase
        </div>
      </div>

      {/* Blueprint Switcher Pills */}
      <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
        {JOURNEYS.map((j) => {
          const isSelected = selectedJourney.id === j.id;
          return (
            <button
              key={j.id}
              onClick={() => setSelectedJourney(j)}
              className={`p-4 rounded-2xl border text-left transition-all ${
                isSelected
                  ? "bg-emerald-950/30 border-emerald-400/50 shadow-lg shadow-emerald-500/10"
                  : "bg-white/[0.02] border-white/10 hover:border-white/20 hover:bg-white/[0.04]"
              }`}
            >
              <div className="flex items-center justify-between mb-2">
                <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-300">
                  {j.category}
                </span>
                <span className="text-xs font-bold text-emerald-400">{j.metrics.value}</span>
              </div>
              <h5 className="text-xs font-bold text-white leading-tight mb-1">{j.name}</h5>
              <div className="text-[10px] font-mono text-gray-400">{j.triggerEvent}</div>
            </button>
          );
        })}
      </div>

      {/* Visual Journey Stepper */}
      <div className="mt-8 p-6 rounded-2xl border border-white/10 bg-black/40">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-5 border-b border-white/10">
          <div>
            <h4 className="text-base font-bold text-white">{selectedJourney.name}</h4>
            <p className="text-xs text-gray-400 mt-0.5">{selectedJourney.description}</p>
          </div>
          <div className="text-xs font-semibold text-emerald-400 bg-emerald-500/10 px-3 py-1 rounded-lg border border-emerald-500/20 w-fit">
            {selectedJourney.metrics.label}: {selectedJourney.metrics.value}
          </div>
        </div>

        {/* Stepper Pipeline */}
        <div className="mt-6 relative pl-6 before:absolute before:left-3 before:top-4 before:bottom-4 before:w-0.5 before:bg-white/10 space-y-4">
          {selectedJourney.steps.map((step, idx) => (
            <div
              key={idx}
              className="relative group p-4 rounded-xl border border-white/5 bg-white/[0.02] hover:bg-white/[0.04] transition-all"
            >
              {/* Stepper Node */}
              <div className="absolute -left-[27px] top-4 w-3.5 h-3.5 rounded-full bg-emerald-400 ring-4 ring-[#091014] flex items-center justify-center text-[8px] font-black text-black">
                {idx + 1}
              </div>

              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-1">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-bold text-white">{step.title}</span>
                  <span className="text-[10px] font-semibold px-2 py-0.5 rounded bg-white/10 text-gray-300 font-mono">
                    {step.channel}
                  </span>
                </div>
                {step.delay && (
                  <span className="text-[11px] text-emerald-400 font-mono flex items-center gap-1">
                    <Clock className="w-3 h-3" /> {step.delay}
                  </span>
                )}
              </div>

              <p className="text-xs text-gray-400 leading-relaxed">{step.detail}</p>

              {step.condition && (
                <div className="mt-2 text-[11px] font-semibold text-teal-300/90 flex items-center gap-1.5 bg-teal-500/10 px-2.5 py-1 rounded border border-teal-500/20 w-fit">
                  <Sparkles className="w-3 h-3 text-teal-400" /> Condition: {step.condition}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
