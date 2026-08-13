import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { PublicNavbar } from "@/components/PublicNavbar";
import { PublicFooter } from "@/components/PublicFooter";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Sparkles,
  BarChart3,
  UserCheck,
  Zap,
  MousePointer,
  Clock,
  Activity,
  Smartphone,
  Globe,
  Fingerprint,
  Gift,
  Flame,
  MessageSquare,
  Instagram,
  Mail,
  Phone,
  Bell,
  CheckCircle2,
  ArrowRight,
  TrendingUp,
  Play,
  RotateCw,
  ShieldCheck,
  Crown,
  Layers,
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export default function SandboxPage() {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState<1 | 2 | 3 | 4>(1);

  // Demo 1 State: Predictive Intent Scorer
  const [dwellTime, setDwellTime] = useState(4.5);
  const [scrollDepth, setScrollDepth] = useState(85);
  const [isCalculating, setIsCalculating] = useState(false);
  const [intentScore, setIntentScore] = useState<number | null>(94.8);

  // Demo 2 State: Conversio Pass Identity
  const [searchQuery, setSearchQuery] = useState("49.36.112.84 (Ahmedabad)");
  const [isResolving, setIsResolving] = useState(false);
  const [identityData, setIdentityData] = useState<{
    name: string;
    phone: string;
    city: string;
    ltv: string;
    orders: number;
  } | null>({
    name: "Rahul Makwana",
    phone: "+91 98250 *****",
    city: "Ahmedabad, Gujarat",
    ltv: "₹12,450",
    orders: 4,
  });

  // Demo 3 State: Gamified Wheel Trigger
  const [isSpinning, setIsSpinning] = useState(false);
  const [spinReward, setSpinReward] = useState<string | null>("Flat 10% OFF + Free Express Shipping");

  // Demo 4 State: Omnichannel Sequence
  const [omniCustomer, setOmniCustomer] = useState("Ananya");
  const [omniStep, setOmniStep] = useState<number>(3);

  const handleCalculateIntent = () => {
    setIsCalculating(true);
    setTimeout(() => {
      setIsCalculating(false);
      const computed = Math.min(99.4, Math.round((dwellTime * 8) + (scrollDepth * 0.6)));
      setIntentScore(computed);
      toast({
        title: "Intent Calculated!",
        description: `Intent score updated to ${computed}% based on dwell & scroll depth.`,
      });
    }, 400);
  };

  const handleResolveIdentity = () => {
    setIsResolving(true);
    setTimeout(() => {
      setIsResolving(false);
      setIdentityData({
        name: "Siddharth Patel",
        phone: "+91 98980 *****",
        city: "Surat, Gujarat",
        ltv: "₹18,900",
        orders: 6,
      });
      toast({
        title: "Conversio Pass Match!",
        description: "Stitched anonymous session to verified shopper profile.",
      });
    }, 500);
  };

  const handleSpinWheel = () => {
    setIsSpinning(true);
    setSpinReward(null);
    setTimeout(() => {
      setIsSpinning(false);
      const rewards = ["Flat 15% OFF", "Free Express Delivery", "₹300 UPI Voucher", "Buy 1 Get 1 Free"];
      const reward = rewards[Math.floor(Math.random() * rewards.length)];
      setSpinReward(reward);
      toast({ title: "🎁 Wheel Spin Complete!", description: reward });
    }, 700);
  };

  return (
    <div className="min-h-screen bg-white text-slate-900 font-sans flex flex-col justify-between selection:bg-emerald-500 selection:text-black">
      {/* Shared Public Navbar */}
      <PublicNavbar />

      {/* Main Container */}
      <main className="pt-36 pb-24 px-4 sm:px-6 max-w-7xl mx-auto w-full space-y-16">
        
        {/* Hero Section (Matching Retner's 88px Display Typography) */}
        <div className="text-center max-w-4xl mx-auto space-y-6">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-mono font-bold tracking-widest uppercase shadow-2xs">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-600"></span>
            </span>
            LIVE INTERACTIVE SIMULATOR WORKSTATION
          </div>

          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-display font-extrabold tracking-tight text-slate-900 leading-[1.06]">
            AI-Native Playground &amp;<br />Interactive Simulator.
          </h1>

          <p className="text-slate-600 text-lg sm:text-xl max-w-2xl mx-auto leading-relaxed font-normal">
            Test drive our autonomous behavioral profiling and customer recovery engine. Launch the playground below to watch our AI trace user intent behind the scenes.
          </p>
        </div>

        {/* 4 Feature Pillars Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 text-left">
          
          {/* Pillar 1 */}
          <div
            onClick={() => setActiveTab(1)}
            className={`p-7 rounded-3xl border transition-all cursor-pointer flex flex-col justify-between space-y-6 ${
              activeTab === 1
                ? "bg-slate-900 text-white border-emerald-500 shadow-xl scale-[1.02]"
                : "bg-slate-50 border-slate-200 text-slate-900 hover:border-slate-300 hover:bg-slate-100/80"
            }`}
          >
            <div className="space-y-4">
              <div className={`w-12 h-12 rounded-2xl flex items-center justify-center ${activeTab === 1 ? "bg-emerald-500 text-black" : "bg-emerald-100 text-emerald-700"}`}>
                <BarChart3 className="w-6 h-6" />
              </div>
              <Badge className={activeTab === 1 ? "bg-emerald-500/20 text-emerald-400 border-none" : "bg-emerald-100 text-emerald-800 border-none"}>DEMO 1</Badge>
              <h3 className="text-xl font-bold leading-tight">Behaviour Based Predictive Analysis</h3>
              <p className={`text-xs leading-relaxed ${activeTab === 1 ? "text-slate-300" : "text-slate-600"}`}>
                Tracks mouse cursor scans, hover dwell durations, and page scrolls in real-time to score intent.
              </p>
            </div>
            <div className="pt-4 border-t border-slate-200/20 flex items-center gap-3">
              <MousePointer className="w-4 h-4 text-emerald-500" />
              <Clock className="w-4 h-4 text-emerald-500" />
              <Activity className="w-4 h-4 text-emerald-500" />
            </div>
          </div>

          {/* Pillar 2 */}
          <div
            onClick={() => setActiveTab(2)}
            className={`p-7 rounded-3xl border transition-all cursor-pointer flex flex-col justify-between space-y-6 ${
              activeTab === 2
                ? "bg-slate-900 text-white border-blue-500 shadow-xl scale-[1.02]"
                : "bg-slate-50 border-slate-200 text-slate-900 hover:border-slate-300 hover:bg-slate-100/80"
            }`}
          >
            <div className="space-y-4">
              <div className={`w-12 h-12 rounded-2xl flex items-center justify-center ${activeTab === 2 ? "bg-blue-500 text-white" : "bg-blue-100 text-blue-700"}`}>
                <UserCheck className="w-6 h-6" />
              </div>
              <Badge className={activeTab === 2 ? "bg-blue-500/20 text-blue-400 border-none" : "bg-blue-100 text-blue-800 border-none"}>DEMO 2</Badge>
              <h3 className="text-xl font-bold leading-tight">Anonymous User Identification</h3>
              <p className={`text-xs leading-relaxed ${activeTab === 2 ? "text-slate-300" : "text-slate-600"}`}>
                Maps session footprints, device parameters, and browser contexts to build a stitchable buyer profile.
              </p>
            </div>
            <div className="pt-4 border-t border-slate-200/20 flex items-center gap-3">
              <Smartphone className="w-4 h-4 text-blue-500" />
              <Globe className="w-4 h-4 text-blue-500" />
              <Fingerprint className="w-4 h-4 text-blue-500" />
            </div>
          </div>

          {/* Pillar 3 */}
          <div
            onClick={() => setActiveTab(3)}
            className={`p-7 rounded-3xl border transition-all cursor-pointer flex flex-col justify-between space-y-6 ${
              activeTab === 3
                ? "bg-slate-900 text-white border-purple-500 shadow-xl scale-[1.02]"
                : "bg-slate-50 border-slate-200 text-slate-900 hover:border-slate-300 hover:bg-slate-100/80"
            }`}
          >
            <div className="space-y-4">
              <div className={`w-12 h-12 rounded-2xl flex items-center justify-center ${activeTab === 3 ? "bg-purple-500 text-white" : "bg-purple-100 text-purple-700"}`}>
                <Sparkles className="w-6 h-6" />
              </div>
              <Badge className={activeTab === 3 ? "bg-purple-500/20 text-purple-400 border-none" : "bg-purple-100 text-purple-800 border-none"}>DEMO 3</Badge>
              <h3 className="text-xl font-bold leading-tight">Real Time Action on Site</h3>
              <p className={`text-xs leading-relaxed ${activeTab === 3 ? "text-slate-300" : "text-slate-600"}`}>
                Triggers the interactive Spin Wheel popups dynamically if users remain idle during checkout.
              </p>
            </div>
            <div className="pt-4 border-t border-slate-200/20 flex items-center gap-3">
              <Gift className="w-4 h-4 text-purple-500" />
              <Flame className="w-4 h-4 text-purple-500" />
              <Sparkles className="w-4 h-4 text-purple-500" />
            </div>
          </div>

          {/* Pillar 4 */}
          <div
            onClick={() => setActiveTab(4)}
            className={`p-7 rounded-3xl border transition-all cursor-pointer flex flex-col justify-between space-y-6 ${
              activeTab === 4
                ? "bg-slate-900 text-white border-rose-500 shadow-xl scale-[1.02]"
                : "bg-slate-50 border-slate-200 text-slate-900 hover:border-slate-300 hover:bg-slate-100/80"
            }`}
          >
            <div className="space-y-4">
              <div className={`w-12 h-12 rounded-2xl flex items-center justify-center ${activeTab === 4 ? "bg-rose-500 text-white" : "bg-rose-100 text-rose-700"}`}>
                <Zap className="w-6 h-6" />
              </div>
              <Badge className={activeTab === 4 ? "bg-rose-500/20 text-rose-400 border-none" : "bg-rose-100 text-rose-800 border-none"}>DEMO 4</Badge>
              <h3 className="text-xl font-bold leading-tight">Retargeting through Omni Channels</h3>
              <p className={`text-xs leading-relaxed ${activeTab === 4 ? "text-slate-300" : "text-slate-600"}`}>
                Recovers dropped checkouts automatically via pre-approved conversational touchpoints.
              </p>
            </div>
            <div className="pt-4 border-t border-slate-200/20 flex items-center gap-2">
              <MessageSquare className="w-4 h-4 text-emerald-500" />
              <Instagram className="w-4 h-4 text-pink-500" />
              <Phone className="w-4 h-4 text-purple-500" />
              <Bell className="w-4 h-4 text-amber-500" />
            </div>
          </div>

        </div>

        {/* WORKSTATION SIMULATOR STAGE (Apple/Vercel Studio Design) */}
        <div className="bg-slate-950 text-white border border-slate-800 rounded-[32px] p-6 md:p-10 shadow-2xl text-left space-y-8">
          
          {/* Workstation Header */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-800 pb-6">
            <div className="flex items-center gap-3">
              <div className="w-3 h-3 rounded-full bg-rose-500" />
              <div className="w-3 h-3 rounded-full bg-amber-500" />
              <div className="w-3 h-3 rounded-full bg-emerald-500" />
              <span className="font-mono text-xs text-slate-400 ml-2">conversio-ai-engine // live-simulator-v2.4</span>
            </div>

            <div className="flex items-center gap-2 bg-slate-900 p-1.5 rounded-2xl border border-slate-800">
              <button
                onClick={() => setActiveTab(1)}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-mono font-bold transition-all ${
                  activeTab === 1 ? "bg-emerald-500 text-black shadow-sm" : "text-slate-400 hover:text-white"
                }`}
              >
                1. Intent Scorer
              </button>
              <button
                onClick={() => setActiveTab(2)}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-mono font-bold transition-all ${
                  activeTab === 2 ? "bg-blue-500 text-white shadow-sm" : "text-slate-400 hover:text-white"
                }`}
              >
                2. Identity Stitch
              </button>
              <button
                onClick={() => setActiveTab(3)}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-mono font-bold transition-all ${
                  activeTab === 3 ? "bg-purple-500 text-white shadow-sm" : "text-slate-400 hover:text-white"
                }`}
              >
                3. Spin Wheel
              </button>
              <button
                onClick={() => setActiveTab(4)}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-mono font-bold transition-all ${
                  activeTab === 4 ? "bg-rose-500 text-white shadow-sm" : "text-slate-400 hover:text-white"
                }`}
              >
                4. Omnichannel
              </button>
            </div>
          </div>

          {/* TAB 1: PREDICTIVE INTENT SCORER */}
          {activeTab === 1 && (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              <div className="lg:col-span-6 space-y-6 font-sans">
                <div>
                  <Badge className="bg-emerald-500/20 text-emerald-400 border-none font-mono text-[10px] uppercase tracking-wider mb-2">BEHAVIORAL MODEL</Badge>
                  <h3 className="text-2xl font-bold text-white">Live Cursor &amp; Dwell Intent Calculator</h3>
                  <p className="text-slate-400 text-sm mt-1">Adjust session parameters below to see how Conversio AI scores high-intent shoppers in real-time.</p>
                </div>

                <div className="space-y-4 bg-slate-900/80 p-5 rounded-2xl border border-slate-800">
                  <div className="space-y-2">
                    <div className="flex justify-between text-xs font-mono">
                      <span className="text-slate-300">Cursor Dwell Duration:</span>
                      <span className="text-emerald-400 font-bold">{dwellTime}s</span>
                    </div>
                    <input type="range" min="0.5" max="10" step="0.5" value={dwellTime} onChange={(e) => setDwellTime(Number(e.target.value))} className="w-full accent-emerald-500" />
                  </div>

                  <div className="space-y-2">
                    <div className="flex justify-between text-xs font-mono">
                      <span className="text-slate-300">Page Scroll Depth:</span>
                      <span className="text-emerald-400 font-bold">{scrollDepth}%</span>
                    </div>
                    <input type="range" min="10" max="100" step="5" value={scrollDepth} onChange={(e) => setScrollDepth(Number(e.target.value))} className="w-full accent-emerald-500" />
                  </div>
                </div>

                <Button onClick={handleCalculateIntent} disabled={isCalculating} className="w-full bg-emerald-500 hover:bg-emerald-400 text-black font-bold h-12 rounded-xl text-xs flex items-center justify-center gap-2">
                  {isCalculating ? <RotateCw className="w-4 h-4 animate-spin" /> : <Play className="w-4 h-4 fill-current" />}
                  Recalculate Intent Score
                </Button>
              </div>

              {/* Output Monitor */}
              <div className="lg:col-span-6 bg-slate-900 border border-slate-800 rounded-3xl p-6 space-y-6 font-mono">
                <div className="flex justify-between items-center text-xs border-b border-slate-800 pb-3 text-slate-400">
                  <span>INTENT PROFILING STREAM</span>
                  <span className="text-emerald-400 flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" /> LIVE STREAM</span>
                </div>

                <div className="space-y-3">
                  <div className="flex justify-between items-center bg-slate-950 p-4 rounded-2xl border border-slate-800">
                    <span className="text-slate-300 text-xs">Calculated Probability:</span>
                    <span className="text-3xl font-extrabold text-emerald-400">{intentScore}%</span>
                  </div>

                  <div className="p-4 bg-emerald-950/80 border border-emerald-500/40 rounded-2xl space-y-1.5">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-emerald-400 flex items-center gap-1.5"><ShieldCheck className="w-4 h-4" /> HIGH INTENT CONFIRMED</span>
                      <Badge className="bg-emerald-500 text-black text-[9px] font-bold">AUTOMATED TRIGGER</Badge>
                    </div>
                    <p className="text-xs text-slate-300">Action: Outbound WhatsApp prepay discount link sent with Razorpay 1-click checkout button.</p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: CONVERSIO PASS IDENTITY STITCH */}
          {activeTab === 2 && (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              <div className="lg:col-span-6 space-y-6 font-sans">
                <div>
                  <Badge className="bg-blue-500/20 text-blue-400 border-none font-mono text-[10px] uppercase tracking-wider mb-2">CONVERSIO PASS</Badge>
                  <h3 className="text-2xl font-bold text-white">Anonymous Visitor Identity Resolution</h3>
                  <p className="text-slate-400 text-sm mt-1">Conversio Pass maps session cookie footprints and device parameters to verified shopper phone numbers instantly.</p>
                </div>

                <div className="space-y-2">
                  <Label className="text-slate-300 text-xs font-mono">Visitor Session Context</Label>
                  <Input value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} className="bg-slate-900 border-slate-800 text-white font-mono text-xs h-11 rounded-xl" />
                </div>

                <Button onClick={handleResolveIdentity} disabled={isResolving} className="w-full bg-blue-600 hover:bg-blue-500 text-white font-bold h-12 rounded-xl text-xs flex items-center justify-center gap-2">
                  {isResolving ? <RotateCw className="w-4 h-4 animate-spin" /> : <UserCheck className="w-4 h-4" />}
                  Stitch Visitor Profile
                </Button>
              </div>

              {/* Identity Card */}
              <div className="lg:col-span-6 bg-slate-900 border border-slate-800 rounded-3xl p-6 space-y-4 font-mono">
                <div className="flex justify-between items-center text-xs border-b border-slate-800 pb-3 text-slate-400">
                  <span>RESOLVED IDENTITY GRAPH</span>
                  <span className="text-blue-400">GRAPH MATCH: 99.1%</span>
                </div>

                {identityData && (
                  <div className="space-y-3">
                    <div className="p-4 bg-slate-950 border border-slate-800 rounded-2xl space-y-2 text-xs">
                      <div className="flex justify-between text-slate-400"><span>Shopper Name:</span> <span className="text-white font-bold">{identityData.name}</span></div>
                      <div className="flex justify-between text-slate-400"><span>Verified Phone:</span> <span className="text-emerald-400 font-bold">{identityData.phone}</span></div>
                      <div className="flex justify-between text-slate-400"><span>City &amp; Location:</span> <span className="text-slate-200">{identityData.city}</span></div>
                      <div className="flex justify-between text-slate-400"><span>Historical LTV:</span> <span className="text-blue-400 font-bold">{identityData.ltv}</span></div>
                      <div className="flex justify-between text-slate-400"><span>Total Past Orders:</span> <span className="text-white">{identityData.orders} Orders</span></div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* TAB 3: GAMIFIED SPIN WHEEL */}
          {activeTab === 3 && (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              <div className="lg:col-span-6 space-y-6 font-sans">
                <div>
                  <Badge className="bg-purple-500/20 text-purple-400 border-none font-mono text-[10px] uppercase tracking-wider mb-2">ON-SITE ACTION</Badge>
                  <h3 className="text-2xl font-bold text-white">Gamified Spin Wheel Discount Popup</h3>
                  <p className="text-slate-400 text-sm mt-1">Triggers automatically when a visitor moves their cursor to exit the page, offering an instant WhatsApp reward voucher.</p>
                </div>

                <Button onClick={handleSpinWheel} disabled={isSpinning} className="w-full bg-purple-600 hover:bg-purple-500 text-white font-bold h-14 rounded-2xl text-sm flex items-center justify-center gap-2 shadow-lg">
                  <Gift className="w-5 h-5" />
                  {isSpinning ? "Spinning Reward Wheel..." : "Trigger Exit Intent Wheel Spin"}
                </Button>
              </div>

              {/* Wheel Output */}
              <div className="lg:col-span-6 bg-purple-950/40 border border-purple-500/30 rounded-3xl p-8 text-center flex flex-col items-center justify-center space-y-4">
                <Gift className="w-12 h-12 text-purple-400 animate-bounce" />
                {spinReward ? (
                  <div className="space-y-2">
                    <Badge className="bg-purple-500 text-white font-bold text-xs">REWARD UNLOCKED</Badge>
                    <h4 className="text-2xl font-extrabold text-white">{spinReward}</h4>
                    <p className="text-xs text-purple-300 font-mono">Dispatched to customer's WhatsApp in &lt;300ms!</p>
                  </div>
                ) : (
                  <p className="text-slate-400 font-mono text-xs">Click "Trigger Exit Intent Wheel Spin" to test.</p>
                )}
              </div>
            </div>
          )}

          {/* TAB 4: OMNICHANNEL SEQUENCE */}
          {activeTab === 4 && (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              <div className="lg:col-span-6 space-y-6 font-sans">
                <div>
                  <Badge className="bg-rose-500/20 text-rose-400 border-none font-mono text-[10px] uppercase tracking-wider mb-2">MULTI-CHANNEL DISPATCH</Badge>
                  <h3 className="text-2xl font-bold text-white">Automated Omnichannel Recovery Engine</h3>
                  <p className="text-slate-400 text-sm mt-1">Simultaneous multi-touch recovery across WhatsApp, AI Voice Telephony calling, Instagram DMs, and Push Alerts.</p>
                </div>

                <div className="space-y-2">
                  <Label className="text-slate-300 text-xs font-mono">Customer Name</Label>
                  <Input value={omniCustomer} onChange={(e) => setOmniCustomer(e.target.value)} className="bg-slate-900 border-slate-800 text-white h-11 rounded-xl" />
                </div>

                <Button onClick={() => setOmniStep((prev) => (prev % 4) + 1)} className="w-full bg-rose-600 hover:bg-rose-500 text-white font-bold h-12 rounded-xl text-xs">
                  Run Step-by-Step Omnichannel Sequence
                </Button>
              </div>

              {/* Omnichannel Dispatch Log */}
              <div className="lg:col-span-6 bg-slate-900 border border-slate-800 rounded-3xl p-6 space-y-3 font-mono text-xs">
                <div className="flex justify-between border-b border-slate-800 pb-2 text-slate-400 text-[10px]">
                  <span>MULTI-CHANNEL DISPATCH LOG</span>
                  <span className="text-rose-400">ACTIVE CHANNELS: 4</span>
                </div>

                <div className="space-y-2.5">
                  <div className="p-3 bg-emerald-950/60 border border-emerald-500/30 rounded-xl flex items-center justify-between">
                    <span className="flex items-center gap-2 text-emerald-300"><MessageSquare className="w-4 h-4" /> 💬 WhatsApp Template</span>
                    <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  </div>
                  <div className="p-3 bg-purple-950/60 border border-purple-500/30 rounded-xl flex items-center justify-between">
                    <span className="flex items-center gap-2 text-purple-300"><Phone className="w-4 h-4" /> 📞 AI Voice Telephony Call</span>
                    <CheckCircle2 className="w-4 h-4 text-purple-400" />
                  </div>
                  <div className="p-3 bg-pink-950/60 border border-pink-500/30 rounded-xl flex items-center justify-between">
                    <span className="flex items-center gap-2 text-pink-300"><Instagram className="w-4 h-4" /> 📸 Instagram DM Promo</span>
                    <CheckCircle2 className="w-4 h-4 text-pink-400" />
                  </div>
                </div>
              </div>
            </div>
          )}

        </div>

      </main>

      {/* Shared Public Footer */}
      <PublicFooter />
    </div>
  );
}
