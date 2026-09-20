import React, { useState } from "react";
import {
  Bot,
  Wrench,
  Languages,
  CheckCircle2,
  ArrowRight,
  Sparkles,
  ShoppingBag,
  HelpCircle,
  ShieldCheck,
  RotateCcw,
  PhoneCall,
  Search,
  Database,
  Ticket,
  Send,
  Zap,
} from "lucide-react";

interface AgentProfile {
  id: string;
  name: string;
  role: string;
  badge: string;
  description: string;
  tools: string[];
  sampleTrigger: string;
}

const AGENTS: AgentProfile[] = [
  {
    id: "sales",
    name: "Aria — AI Sales & Conversion Agent",
    role: "Presales & Product Guidance",
    badge: "CONVERSION AGENT",
    description: "Guides shoppers through product recommendations, clarifies ingredient doubts, and generates pre-filled 1-click checkout carts.",
    tools: ["search_products", "check_inventory", "apply_bundle_discount", "create_cart", "generate_payment_link"],
    sampleTrigger: "Shopper asks about oily skin routine on WhatsApp or website widget.",
  },
  {
    id: "support",
    name: "Kavya — AI Customer Care Agent",
    role: "Post-Purchase & Fulfillment Support",
    badge: "SUPPORT AGENT",
    description: "Resolves real-time shipment queries, processes replacement requests, and updates addresses with Shiprocket sync.",
    tools: ["lookup_order", "check_shiprocket_status", "modify_shipping_address", "create_support_ticket", "escalate_to_human"],
    sampleTrigger: "Customer asks for tracking status in Gujarati or Hindi.",
  },
  {
    id: "cod",
    name: "Veer — COD Verification & RTO Agent",
    role: "Fraud Prevention & Prepaid Conversion",
    badge: "RTO SHIELD AGENT",
    description: "Identifies high-risk COD orders, triggers voice & WhatsApp verifications, and incentivizes instant UPI prepayment.",
    tools: ["calculate_rto_risk", "dispatch_voice_call", "generate_upi_qr", "confirm_order", "cancel_fraudulent_order"],
    sampleTrigger: "COD order placed from high-RTO pincode with past delivery failures.",
  },
  {
    id: "retention",
    name: "Rhea — AI Retention & Reorder Agent",
    role: "Customer Lifetime Value Nurture",
    badge: "RETENTION AGENT",
    description: "Calculates depletion dates for consumables and nudges customers right before they run out of stock.",
    tools: ["predict_depletion_date", "generate_loyalty_coupon", "create_one_click_reorder", "send_whatsapp_flow"],
    sampleTrigger: "Day 25 since serum delivery; consumption cycle approaches replenishment.",
  },
  {
    id: "voice",
    name: "Dev — Multilingual Voice Telephony Agent",
    role: "Autonomous Outbound Voice Calls",
    badge: "VOICE AGENT",
    description: "Conducts conversational telephone calls in fluent Hindi, Gujarati, and Indian-accented English for confirmation and recovery.",
    tools: ["synthesize_speech", "detect_interruptions", "collect_dtmf_or_voice_intent", "log_call_recording", "sync_order_status"],
    sampleTrigger: "Unconfirmed high-value COD order after 2 hours without WhatsApp response.",
  },
];

interface LanguageSimulation {
  language: string;
  flag: string;
  rawMessage: string;
  extractedIntent: string;
  detectedOrder: string;
  executedTool: string;
  aiResponse: string;
}

const LANGUAGE_SIMULATIONS: Record<string, LanguageSimulation> = {
  gujarati: {
    language: "Gujarati",
    flag: "🇮🇳",
    rawMessage: "Bhai aa product kyare malse? Order karyo ne 2 divas thai gaya.",
    extractedIntent: "Delivery Status Enquiry (Shipment ETA)",
    detectedOrder: "#SC-1829 (Shiprocket Waybill: 9812401)",
    executedTool: "check_shiprocket_status(order_id='#SC-1829')",
    aiResponse: "નમસ્તે રાહુલભાઈ! તમારો ઓર્ડર #SC-1829 રવાના થઈ ગયો છે અને કાલે બપોરે 2 વાગ્યા સુધીમાં પહોંચી જશે. લાઈવ ટ્રેકિંગ લિંક અહીં છે: scalezix.track/sc-1829",
  },
  hindi: {
    language: "Hindi",
    flag: "🇮🇳",
    rawMessage: "Kya mujhe Glow Serum pe 10% festive discount mil sakta hai abhi?",
    extractedIntent: "Price Enquiry & Coupon Request",
    detectedOrder: "Cart #CT-9012 (Cart Value: ₹2,499)",
    executedTool: "generate_loyalty_coupon(discount='10%', expiry='2h')",
    aiResponse: "नमस्ते राहुल! बिल्कुल, आपके लिए विशेष 10% छूट कूपन FESTIVE10 लागू कर दिया गया है। आप यहाँ 1-क्लिक UPI से चेकआउट कर सकते हैं: scalezix.pay/c9012",
  },
  english: {
    language: "Indian English",
    flag: "🇮🇳",
    rawMessage: "I ordered COD by mistake, can I convert it to Google Pay to avoid cash hassle?",
    extractedIntent: "Prepaid Conversion & Payment Link Request",
    detectedOrder: "#SC-1829 (COD Amount: ₹2,499)",
    executedTool: "generate_payment_link(order_id='#SC-1829', method='UPI')",
    aiResponse: "Certainly, Rahul! Here is your instant UPI payment link for Order #SC-1829. Once paid, ₹100 cashback will be added to your Conversio wallet instantly.",
  },
};

export const AiActionAgentsWidget: React.FC = () => {
  const [selectedAgent, setSelectedAgent] = useState<AgentProfile>(AGENTS[0]);
  const [simLanguage, setSimLanguage] = useState<string>("gujarati");
  const [isSimulating, setIsSimulating] = useState<boolean>(false);
  const [simResult, setSimResult] = useState<LanguageSimulation>(LANGUAGE_SIMULATIONS.gujarati);

  const handleLanguageChange = (langKey: string) => {
    setSimLanguage(langKey);
    setIsSimulating(true);
    setTimeout(() => {
      setSimResult(LANGUAGE_SIMULATIONS[langKey]);
      setIsSimulating(false);
    }, 400);
  };

  return (
    <div className="rounded-3xl border border-white/10 bg-[#091014]/90 p-6 lg:p-10 shadow-2xl backdrop-blur-2xl">
      {/* Header Bar */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-8 border-b border-white/10">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-semibold uppercase tracking-wider mb-2">
            <Bot className="w-3.5 h-3.5" /> Module 7 & 4 — Action-Oriented AI
          </div>
          <h3 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
            Autonomous AI Action Agents (Not Just Chatbots)
          </h3>
          <p className="text-sm text-gray-400 mt-1">
            Conversio agents don’t just output text. They search catalogs, verify live inventory, generate payment links, and execute transactions.
          </p>
        </div>

        <div className="flex items-center gap-2 text-xs font-semibold text-gray-400 bg-white/5 px-3 py-1.5 rounded-xl border border-white/10">
          <Wrench className="w-3.5 h-3.5 text-emerald-400" /> Function Calling Enabled
        </div>
      </div>

      {/* 5 Specialized Agents Carousel / Selector */}
      <div className="mt-8 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
        {AGENTS.map((agent) => {
          const isSelected = selectedAgent.id === agent.id;
          return (
            <button
              key={agent.id}
              onClick={() => setSelectedAgent(agent)}
              className={`p-4 rounded-2xl border text-left transition-all flex flex-col justify-between ${
                isSelected
                  ? "bg-emerald-950/30 border-emerald-400/50 shadow-lg shadow-emerald-500/10"
                  : "bg-white/[0.02] border-white/10 hover:border-white/20 hover:bg-white/[0.04]"
              }`}
            >
              <div>
                <span className="text-[9px] uppercase font-bold tracking-wider px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 block w-fit mb-2">
                  {agent.badge}
                </span>
                <h5 className="text-xs font-bold text-white leading-tight">{agent.name.split("—")[0]}</h5>
                <p className="text-[11px] text-gray-400 mt-0.5">{agent.role}</p>
              </div>

              <div className="mt-4 pt-2 border-t border-white/5 flex items-center justify-between text-[10px] text-emerald-400 font-semibold">
                <span>{agent.tools.length} Executable Tools</span>
                <ArrowRight className="w-3 h-3" />
              </div>
            </button>
          );
        })}
      </div>

      {/* Selected Agent Detailed Workbench */}
      <div className="mt-6 p-6 rounded-2xl border border-emerald-500/20 bg-gradient-to-r from-emerald-950/10 via-black/40 to-black/60">
        <div className="flex flex-col lg:flex-row items-start justify-between gap-6">
          <div className="space-y-2 max-w-xl">
            <div className="flex items-center gap-2">
              <h4 className="text-lg font-bold text-white">{selectedAgent.name}</h4>
              <span className="px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 text-[10px] font-bold">
                {selectedAgent.badge}
              </span>
            </div>
            <p className="text-xs text-gray-300 leading-relaxed">{selectedAgent.description}</p>
            <div className="text-xs text-gray-400 flex items-center gap-2 pt-1">
              <span className="font-semibold text-emerald-400">Trigger Condition:</span>
              <span>{selectedAgent.sampleTrigger}</span>
            </div>
          </div>

          {/* Tools Grid */}
          <div className="w-full lg:w-auto">
            <span className="text-[11px] uppercase tracking-wider text-gray-400 font-semibold block mb-2">
              Connected Tool Capabilities
            </span>
            <div className="flex flex-wrap gap-1.5 max-w-md">
              {selectedAgent.tools.map((tool, i) => (
                <span
                  key={i}
                  className="px-2.5 py-1 rounded-lg bg-black/60 border border-emerald-500/30 text-emerald-300 font-mono text-[11px] flex items-center gap-1.5"
                >
                  <Zap className="w-3 h-3 text-emerald-400" />
                  {tool}()
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Interactive Indian Multi-Lingual Intent Detector Simulator */}
      <div className="mt-8 pt-8 border-t border-white/10">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold text-emerald-400 uppercase tracking-wider mb-1">
              <Languages className="w-3.5 h-3.5" /> Indian Multi-Language AI Intent Detection
            </div>
            <h4 className="text-lg font-bold text-white">
              Understand Indian Vernacular Dialects & Automatically Trigger Action
            </h4>
          </div>

          {/* Language Switchers */}
          <div className="flex items-center gap-2">
            {[
              { key: "gujarati", label: "Gujarati (ગુજરાતી)" },
              { key: "hindi", label: "Hindi (हिन्दी)" },
              { key: "english", label: "Indian English" },
            ].map((item) => (
              <button
                key={item.key}
                onClick={() => handleLanguageChange(item.key)}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                  simLanguage === item.key
                    ? "bg-emerald-500 text-black shadow-md shadow-emerald-500/20"
                    : "bg-white/5 text-gray-400 hover:bg-white/10 hover:text-white"
                }`}
              >
                {item.label}
              </button>
            ))}
          </div>
        </div>

        {/* Live Simulation Playground */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
          {/* Customer Input Box */}
          <div className="lg:col-span-5 rounded-2xl border border-white/10 bg-black/50 p-5 space-y-3">
            <span className="text-[10px] uppercase font-bold tracking-wider text-gray-400 block">
              Inbound Customer WhatsApp Message
            </span>
            <div className="p-4 rounded-xl bg-white/[0.03] border border-white/10 text-white text-sm font-medium leading-relaxed">
              "{simResult.rawMessage}"
            </div>
            <div className="text-[11px] text-gray-400 flex items-center justify-between">
              <span>Customer: Rahul Sharma (+91 98201...)</span>
              <span className="text-emerald-400 font-semibold">Verified WhatsApp</span>
            </div>
          </div>

          {/* AI Intent & Tool Pipeline */}
          <div className="lg:col-span-7 rounded-2xl border border-emerald-500/20 bg-emerald-950/20 p-5 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-[10px] uppercase font-bold tracking-wider text-emerald-400">
                Conversio Intent & Function Calling Pipeline
              </span>
              <span className="text-xs text-emerald-300 font-mono bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">
                124ms Execution
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
              <div className="bg-black/40 p-2.5 rounded-lg border border-white/5">
                <span className="text-[10px] text-gray-400 block font-semibold">Detected Language & Sentiment</span>
                <span className="text-white font-bold">{simResult.language} • Neutral Intent</span>
              </div>
              <div className="bg-black/40 p-2.5 rounded-lg border border-white/5">
                <span className="text-[10px] text-gray-400 block font-semibold">Extracted Intent</span>
                <span className="text-teal-300 font-bold">{simResult.extractedIntent}</span>
              </div>
              <div className="bg-black/40 p-2.5 rounded-lg border border-white/5">
                <span className="text-[10px] text-gray-400 block font-semibold">Referenced Entity</span>
                <span className="text-white font-mono">{simResult.detectedOrder}</span>
              </div>
              <div className="bg-black/40 p-2.5 rounded-lg border border-white/5">
                <span className="text-[10px] text-gray-400 block font-semibold">Executed Action Tool</span>
                <span className="text-emerald-400 font-mono font-bold text-[11px]">{simResult.executedTool}</span>
              </div>
            </div>

            {/* Autonomous Reply */}
            <div className="pt-2">
              <span className="text-[10px] uppercase font-bold tracking-wider text-gray-400 block mb-1">
                Autonomous WhatsApp Action & Reply
              </span>
              <div className="p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-200 text-xs font-medium leading-relaxed">
                {simResult.aiResponse}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
