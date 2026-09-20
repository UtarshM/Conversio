import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  MessageSquare,
  Mail,
  PhoneCall,
  Bot,
  UserCheck,
  Send,
  Sparkles,
  ShoppingBag,
  ExternalLink,
  ShieldCheck,
  RotateCcw,
  CheckCircle2,
  Clock,
  Zap,
} from "lucide-react";

interface InboxChat {
  id: string;
  name: string;
  channel: "whatsapp" | "email" | "voice" | "chat";
  lastMessage: string;
  time: string;
  unread: boolean;
  intent: string;
  language: string;
  aiStatus: "autonomous" | "human";
  orderId?: string;
  cartValue?: string;
}

const CHATS: InboxChat[] = [
  {
    id: "c1",
    name: "Rahul Sharma",
    channel: "whatsapp",
    lastMessage: "Bhaiya mera order #48192 kab tak aayega?",
    time: "2m ago",
    unread: true,
    intent: "Order Tracking",
    language: "Hindi / Hinglish",
    aiStatus: "autonomous",
    orderId: "#48192",
    cartValue: "₹3,490",
  },
  {
    id: "c2",
    name: "Priya Verma",
    channel: "email",
    lastMessage: "Exchange request: Size M to Large for Linen Shirt",
    time: "14m ago",
    unread: false,
    intent: "Return / Exchange",
    language: "English",
    aiStatus: "human",
    orderId: "#48110",
    cartValue: "₹2,199",
  },
  {
    id: "c3",
    name: "Amit Desai",
    channel: "voice",
    lastMessage: "AI Voice Call confirmed COD order in Surat (Gujarati)",
    time: "42m ago",
    unread: false,
    intent: "COD Verification",
    language: "Gujarati",
    aiStatus: "autonomous",
    orderId: "#48201",
    cartValue: "₹4,200",
  },
  {
    id: "c4",
    name: "Sneha Kapur",
    channel: "chat",
    lastMessage: "Does this Vitamin C serum suit oily acne skin?",
    time: "1h ago",
    unread: false,
    intent: "Product Advice",
    language: "English",
    aiStatus: "autonomous",
    cartValue: "₹1,850",
  },
];

export function OmnichannelInboxWidget() {
  const [selectedChatId, setSelectedChatId] = useState<string>("c1");
  const [aiAutonomous, setAiAutonomous] = useState<boolean>(true);
  const [messages, setMessages] = useState([
    {
      id: "m1",
      sender: "customer",
      text: "Bhaiya mera order #48192 kab tak aayega? Delhivery tracking nahi chal raha.",
      time: "11:42 AM",
    },
    {
      id: "m2",
      sender: "system",
      text: "Tool Executed: get_order_status(phone='+919820144891', order_id='#48192') → Delhivery Waybill #1289192 • Out for Delivery (Mumbai)",
      time: "11:42 AM",
    },
    {
      id: "m3",
      sender: "ai",
      text: "Namaste Rahul ji! ✨ Aapka order #48192 Mumbai local hub se dispatch ho kar out for delivery hai. Hamare delivery partner aaj shaam 4:30 PM tak aapke address (Powai) par deliver kar denge.\n\nAap chahein toh delivery boy ka contact yahan se dekh sakte hain. Kya main kuch aur madad kar sakta hoon?",
      time: "11:43 AM",
    },
  ]);

  const [inputVal, setInputVal] = useState("");

  const activeChat = CHATS.find((c) => c.id === selectedChatId) || CHATS[0];

  const handleSend = () => {
    if (!inputVal.trim()) return;
    setMessages((prev) => [
      ...prev,
      {
        id: `m_${Date.now()}`,
        sender: aiAutonomous ? "ai" : "human",
        text: inputVal,
        time: "Just now",
      },
    ]);
    setInputVal("");
  };

  return (
    <div className="rounded-3xl border border-white/10 bg-[#070e12]/95 p-6 sm:p-10 shadow-2xl backdrop-blur-2xl space-y-8">
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-6 border-b border-white/10">
        <div className="space-y-1.5">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-semibold uppercase tracking-wider">
            <MessageSquare className="w-3.5 h-3.5" /> Module 4 • Unified Multichannel Inbox & AI Handoff
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
            One Inbox for WhatsApp, Email, Voice & Chat
          </h2>
          <p className="text-xs sm:text-sm text-gray-400">
            Agents and AI collaborate side-by-side. View full customer context, trigger instant Shopify tools, and take over chats with 1 click.
          </p>
        </div>

        {/* Global Status */}
        <div className="flex items-center gap-3">
          <span className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-mono">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            Meta WhatsApp Cloud API Connected
          </span>
        </div>
      </div>

      {/* Main 3-Column Workspace */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 rounded-2xl border border-white/10 overflow-hidden bg-[#091116]/80">
        {/* Left Column: Conversations List (3 cols) */}
        <div className="lg:col-span-4 border-r border-white/10 p-3 space-y-2">
          <div className="flex items-center justify-between px-2 py-1.5 text-xs text-gray-400 font-semibold uppercase">
            <span>Conversations (4)</span>
            <span className="text-emerald-400 font-mono">1 Unread</span>
          </div>

          <div className="space-y-1.5">
            {CHATS.map((chat) => {
              const isSelected = chat.id === selectedChatId;
              return (
                <div
                  key={chat.id}
                  onClick={() => setSelectedChatId(chat.id)}
                  className={`p-3 rounded-xl cursor-pointer transition-all border ${
                    isSelected
                      ? "bg-white/[0.08] border-emerald-500/40 text-white"
                      : "bg-white/[0.01] border-transparent hover:bg-white/[0.03] text-gray-300"
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      {chat.channel === "whatsapp" && <MessageSquare className="w-3.5 h-3.5 text-emerald-400" />}
                      {chat.channel === "email" && <Mail className="w-3.5 h-3.5 text-purple-400" />}
                      {chat.channel === "voice" && <PhoneCall className="w-3.5 h-3.5 text-cyan-400" />}
                      {chat.channel === "chat" && <MessageSquare className="w-3.5 h-3.5 text-blue-400" />}
                      <span className="text-xs font-bold text-white">{chat.name}</span>
                    </div>
                    <span className="text-[10px] text-gray-400 font-mono">{chat.time}</span>
                  </div>

                  <p className="text-[11px] text-gray-400 truncate mt-1">{chat.lastMessage}</p>

                  <div className="flex items-center justify-between mt-2 pt-1 border-t border-white/5 text-[9px]">
                    <span className="text-emerald-400 bg-emerald-500/10 px-1.5 py-0.2 rounded font-mono">
                      {chat.intent}
                    </span>
                    <span className="text-gray-400 font-mono">{chat.language}</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Center Column: Live Chat Stream (5 cols) */}
        <div className="lg:col-span-5 flex flex-col justify-between border-r border-white/10 min-h-[420px]">
          {/* Chat Header */}
          <div className="p-3.5 border-b border-white/10 flex items-center justify-between bg-white/[0.02]">
            <div>
              <div className="text-xs font-bold text-white flex items-center gap-2">
                {activeChat.name}
                <span className="text-[10px] text-gray-400 font-mono">({activeChat.language})</span>
              </div>
              <div className="text-[10px] text-emerald-400 font-mono mt-0.5">
                Intent: {activeChat.intent} • Order {activeChat.orderId || "N/A"}
              </div>
            </div>

            <Button
              size="sm"
              variant="outline"
              onClick={() => setAiAutonomous(!aiAutonomous)}
              className={`h-7 px-2.5 rounded-lg text-[10px] font-bold border ${
                aiAutonomous
                  ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/30 hover:bg-emerald-500/20"
                  : "bg-amber-500/10 text-amber-300 border-amber-500/30 hover:bg-amber-500/20"
              }`}
            >
              {aiAutonomous ? (
                <>
                  <Bot className="w-3 h-3 mr-1 text-emerald-400" /> AI Autopilot Active
                </>
              ) : (
                <>
                  <UserCheck className="w-3 h-3 mr-1 text-amber-300" /> Human Mode (AI Paused)
                </>
              )}
            </Button>
          </div>

          {/* Messages Feed */}
          <div className="p-4 space-y-3 overflow-y-auto flex-1">
            {messages.map((m) => (
              <div key={m.id} className="space-y-1">
                {m.sender === "system" ? (
                  <div className="p-2 rounded-lg bg-emerald-950/30 border border-emerald-500/20 text-[10px] text-emerald-300 font-mono">
                    <Sparkles className="w-3 h-3 inline mr-1 text-emerald-400" />
                    {m.text}
                  </div>
                ) : (
                  <div
                    className={`max-w-[85%] rounded-2xl p-3 text-xs leading-relaxed ${
                      m.sender === "customer"
                        ? "bg-white/[0.06] text-white mr-auto border border-white/10"
                        : m.sender === "ai"
                        ? "bg-emerald-500/20 text-emerald-100 ml-auto border border-emerald-500/30"
                        : "bg-teal-500/20 text-teal-100 ml-auto border border-teal-500/30"
                    }`}
                  >
                    <div className="flex items-center justify-between text-[9px] text-gray-400 mb-1 font-mono">
                      <span>{m.sender === "customer" ? activeChat.name : m.sender === "ai" ? "Conversio AI Agent" : "You (Support)"}</span>
                      <span>{m.time}</span>
                    </div>
                    <div className="whitespace-pre-line">{m.text}</div>
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Input Box */}
          <div className="p-3 border-t border-white/10 bg-white/[0.01] flex items-center gap-2">
            <input
              type="text"
              value={inputVal}
              onChange={(e) => setInputVal(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSend()}
              placeholder={aiAutonomous ? "AI is handling replies. Type to override..." : "Type reply as human agent..."}
              className="flex-1 bg-black/40 border border-white/10 rounded-xl px-3 py-2 text-xs text-white placeholder-gray-400 focus:outline-none focus:border-emerald-500"
            />
            <Button
              size="sm"
              onClick={handleSend}
              className="h-8 px-3 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-black font-bold"
            >
              <Send className="w-3.5 h-3.5" />
            </Button>
          </div>
        </div>

        {/* Right Column: Customer Context Drawer (3 cols) */}
        <div className="lg:col-span-3 p-4 space-y-4 bg-white/[0.01]">
          <div className="flex items-center justify-between pb-2 border-b border-white/10">
            <span className="text-xs font-bold text-white uppercase tracking-wider">Customer 360</span>
            <span className="text-[10px] text-emerald-400 font-mono">Score 82/100</span>
          </div>

          <div className="space-y-3 text-xs">
            <div>
              <div className="text-[10px] text-gray-400 uppercase">Customer Profile</div>
              <div className="text-sm font-bold text-white mt-0.5">{activeChat.name}</div>
              <div className="text-[11px] text-gray-400">+91 98201 44891 • Powai, Mumbai</div>
            </div>

            <div className="p-2.5 rounded-xl bg-white/[0.02] border border-white/10 space-y-1">
              <div className="flex justify-between text-[11px]">
                <span className="text-gray-400">Lifetime Value:</span>
                <span className="text-white font-mono font-bold">₹14,820 (5 orders)</span>
              </div>
              <div className="flex justify-between text-[11px]">
                <span className="text-gray-400">RTO Risk:</span>
                <span className="text-emerald-400 font-mono font-bold">Low (12%)</span>
              </div>
              <div className="flex justify-between text-[11px]">
                <span className="text-gray-400">Replenishment:</span>
                <span className="text-teal-300 font-mono">Due in 8 days</span>
              </div>
            </div>

            {/* Quick Agent Actions */}
            <div className="space-y-1.5 pt-1">
              <div className="text-[10px] text-gray-400 uppercase font-semibold">1-Click Tools</div>
              <button className="w-full text-left p-2 rounded-lg bg-white/[0.03] hover:bg-white/[0.06] border border-white/10 text-[11px] text-gray-200 flex items-center justify-between transition-colors">
                <span>Create Pre-filled Cart</span>
                <ShoppingBag className="w-3.5 h-3.5 text-emerald-400" />
              </button>
              <button className="w-full text-left p-2 rounded-lg bg-white/[0.03] hover:bg-white/[0.06] border border-white/10 text-[11px] text-gray-200 flex items-center justify-between transition-colors">
                <span>Send UPI Payment Link</span>
                <Zap className="w-3.5 h-3.5 text-cyan-400" />
              </button>
              <button className="w-full text-left p-2 rounded-lg bg-white/[0.03] hover:bg-white/[0.06] border border-white/10 text-[11px] text-gray-200 flex items-center justify-between transition-colors">
                <span>Trigger AI Voice Verification</span>
                <PhoneCall className="w-3.5 h-3.5 text-teal-400" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
