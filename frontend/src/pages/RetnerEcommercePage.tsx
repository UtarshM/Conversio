import { useState, useEffect } from "react";
import { DashboardLayout } from "@/components/DashboardLayout";
import { Button } from "@/components/ui/button";
import { toast } from "@/components/ui/use-toast";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  ShoppingBag,
  TrendingUp,
  Zap,
  Clock,
  Sparkles,
  PhoneCall,
  CheckCircle2,
  ArrowRight,
  ShieldCheck,
  AlertCircle,
  Copy,
  RefreshCw,
  Sliders,
  ExternalLink,
  MessageSquare,
  Store,
  BadgePercent,
  Play,
  Headphones,
  Send,
  Smartphone,
  Check,
  Flame,
  CreditCard,
  UserCheck,
  XCircle,
  Truck,
  Repeat,
  Star,
  Megaphone,
  MapPin,
  Calendar,
} from "lucide-react";
import {
  fetchRetnerDashboard,
  simulateWebhookEvent,
  triggerVoiceCallSimulation,
  resolveNdrAction,
  dispatchBroadcast,
  submitProductReview,
  type RetnerDashboardData,
  type RetnerCartSession,
  type RetnerCodOrder,
  type RetnerNdrRecord,
  type RetnerBroadcastTemplate,
  type RetnerReplenishmentRule,
  type RetnerReviewRecord,
} from "@/lib/api/commerceRetention";

export default function RetnerEcommercePage() {
  const [data, setData] = useState<RetnerDashboardData | null>(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("sequences");

  // Config State
  const [codDiscount, setCodDiscount] = useState("50");
  const [step1Delay, setStep1Delay] = useState("15");
  const [step2Delay, setStep2Delay] = useState("60");
  const [step2Discount, setStep2Discount] = useState("10");

  // Mobile Preview State
  const [previewStep, setPreviewStep] = useState<1 | 2 | 3>(2);

  // AI Voice Simulation State
  const [selectedCodOrder, setSelectedCodOrder] = useState<string>("ORD-8824");
  const [voiceOutcome, setVoiceOutcome] = useState<"confirm" | "prepay" | "cancel">("confirm");
  const [simulatingVoice, setSimulatingVoice] = useState(false);
  const [activeTranscript, setActiveTranscript] = useState<string | null>(null);

  // Webhook Simulator State
  const [simulatingWebhook, setSimulatingWebhook] = useState(false);

  useEffect(() => {
    loadDashboard();
  }, []);

  const loadDashboard = async () => {
    setLoading(true);
    const res = await fetchRetnerDashboard();
    setData(res);
    if (res.config) {
      setCodDiscount(String(res.config.codDiscountValue || 50));
      setStep1Delay(String(res.config.step1DelayMinutes || 15));
      setStep2Delay(String(res.config.step2DelayMinutes || 60));
      setStep2Discount(String(res.config.step2DiscountPercent || 10));
    }
    setLoading(false);
  };

  const handleSimulateWebhook = async (type: "abandoned_cart" | "cod_order" | "ndr_failed_delivery") => {
    setSimulatingWebhook(true);
    await simulateWebhookEvent(type);
    toast({
      title:
        type === "abandoned_cart"
          ? "Shopify Cart Event Received!"
          : type === "cod_order"
          ? "Shopify COD Order Received!"
          : "Shiprocket NDR Delivery Failure Event Ingested!",
      description:
        type === "abandoned_cart"
          ? "Abandoned checkout ingested. Dispatched Step 1 WhatsApp reminder queue."
          : type === "cod_order"
          ? "New COD checkout placed. Dispatched ₹50 prepaid incentive prompt."
          : "Customer address issue detected. Sent WhatsApp 1-tap re-attempt / address update prompt.",
    });
    await loadDashboard();
    setSimulatingWebhook(false);
  };

  const handleTriggerVoiceCall = async () => {
    setSimulatingVoice(true);
    const res = await triggerVoiceCallSimulation(selectedCodOrder, voiceOutcome);
    if (res.data?.transcript) {
      setActiveTranscript(res.data.transcript);
    }
    toast({
      title: "AI Voice Call Completed",
      description: `Call outcome recorded: ${voiceOutcome.toUpperCase()}. Customer status updated.`,
    });
    await loadDashboard();
    setSimulatingVoice(false);
  };

  const handleResolveNdr = async (ndrId: string, action: "reattempt_tomorrow" | "update_address" | "cancel_order") => {
    await resolveNdrAction(ndrId, action, "Customer requested delivery re-attempt via WhatsApp");
    toast({
      title: "NDR Action Relayed to Courier",
      description: "Re-attempt scheduled for tomorrow. Package saved from RTO return!",
    });
    await loadDashboard();
  };

  const handleLaunchBroadcast = async (templateId: string, title: string) => {
    await dispatchBroadcast(templateId);
    toast({
      title: "WhatsApp Broadcast Launched! 🚀",
      description: `Campaign "${title}" dispatched to audience segment with AI copy.`,
    });
    await loadDashboard();
  };

  const handleCopy = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    toast({ title: "Copied to Clipboard", description: `${label} copied.` });
  };

  const metrics = data?.metrics || {
    totalRecoveredRevenue: 482500,
    cartRecoveryRate: 21.8,
    totalCartsTracked: 142,
    totalCartsRecovered: 31,
    totalCodOrders: 94,
    codConvertedCount: 36,
    codConvertedPercent: 38.3,
    rtoCostSaved: 124600,
    totalNdrsTracked: 18,
    ndrRescuedCount: 14,
    ndrRescueRate: 77.8,
  };

  return (
    <DashboardLayout>
      <div className="space-y-6 pb-12">
        {/* TOP RETNER HERO BANNER */}
        <div className="relative overflow-hidden rounded-3xl border border-emerald-500/20 bg-gradient-to-br from-slate-950 via-slate-900 to-emerald-950/60 p-6 md:p-8 text-white shadow-2xl">
          <div className="absolute top-0 right-0 -mr-16 -mt-16 w-80 h-80 rounded-full bg-emerald-500/10 blur-3xl pointer-events-none" />

          <div className="relative z-10 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
            <div className="space-y-2 max-w-2xl">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-400/30 text-emerald-400 text-xs font-mono font-semibold">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                CONVERSIO D2C RETENTION ENGINE ACTIVE
              </div>
              <h1 className="text-2xl md:text-3xl font-extrabold tracking-tight font-display text-white">
                WhatsApp E-Commerce Retention &amp; COD Shield
              </h1>
              <p className="text-sm text-slate-300 leading-relaxed">
                Automate 3-step abandoned cart drips, convert risky COD checkouts to prepaid, rescue failed courier deliveries (NDR), and drive repeat replenishment on autopilot.
              </p>
            </div>

            {/* Quick Demo Simulator Actions */}
            <div className="flex flex-wrap items-center gap-2 bg-slate-900/80 p-3 rounded-2xl border border-slate-800 backdrop-blur-md">
              <span className="text-xs font-mono text-slate-400 font-medium px-1">Sandbox Live Simulator:</span>
              <Button
                size="sm"
                onClick={() => handleSimulateWebhook("abandoned_cart")}
                disabled={simulatingWebhook}
                className="bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold gap-1.5 shadow-md shadow-emerald-950/40"
              >
                <ShoppingBag className="w-3.5 h-3.5" /> + Cart
              </Button>
              <Button
                size="sm"
                onClick={() => handleSimulateWebhook("cod_order")}
                disabled={simulatingWebhook}
                className="bg-amber-600 hover:bg-amber-500 text-white text-xs font-bold gap-1.5 shadow-md shadow-amber-950/40"
              >
                <CreditCard className="w-3.5 h-3.5" /> + COD
              </Button>
              <Button
                size="sm"
                onClick={() => handleSimulateWebhook("ndr_failed_delivery")}
                disabled={simulatingWebhook}
                className="bg-purple-600 hover:bg-purple-500 text-white text-xs font-bold gap-1.5 shadow-md shadow-purple-950/40"
              >
                <Truck className="w-3.5 h-3.5" /> + NDR
              </Button>
            </div>
          </div>

          {/* RETNER KPI STATS ROW */}
          <div className="grid grid-cols-2 md:grid-cols-5 gap-3 mt-8 pt-6 border-t border-slate-800/80">
            <div className="p-3.5 rounded-2xl bg-slate-900/60 border border-slate-800/80">
              <div className="flex items-center justify-between text-xs text-slate-400 mb-1">
                <span>Recovered Revenue</span>
                <span className="text-[10px] font-bold text-emerald-400 bg-emerald-500/10 px-1 py-0.5 rounded border border-emerald-500/20">
                  +22.4% ROI
                </span>
              </div>
              <div className="text-xl font-black font-display text-white">
                ₹{metrics.totalRecoveredRevenue.toLocaleString()}
              </div>
              <p className="text-[10px] text-slate-400 mt-1 flex items-center gap-1">
                <CheckCircle2 className="w-3 h-3 text-emerald-400" />
                {metrics.totalCartsRecovered} carts converted
              </p>
            </div>

            <div className="p-3.5 rounded-2xl bg-slate-900/60 border border-slate-800/80">
              <div className="flex items-center justify-between text-xs text-slate-400 mb-1">
                <span>Cart Recovery Rate</span>
                <TrendingUp className="w-3.5 h-3.5 text-blue-400" />
              </div>
              <div className="text-xl font-black font-display text-blue-400">
                {metrics.cartRecoveryRate}%
              </div>
              <p className="text-[10px] text-slate-400 mt-1">
                {metrics.totalCartsRecovered} of {metrics.totalCartsTracked} checkouts
              </p>
            </div>

            <div className="p-3.5 rounded-2xl bg-slate-900/60 border border-slate-800/80">
              <div className="flex items-center justify-between text-xs text-slate-400 mb-1">
                <span>COD Converted</span>
                <BadgePercent className="w-3.5 h-3.5 text-amber-400" />
              </div>
              <div className="text-xl font-black font-display text-amber-400">
                {metrics.codConvertedPercent}%
              </div>
              <p className="text-[10px] text-slate-400 mt-1">
                {metrics.codConvertedCount} orders switched to prepaid
              </p>
            </div>

            <div className="p-3.5 rounded-2xl bg-slate-900/60 border border-slate-800/80">
              <div className="flex items-center justify-between text-xs text-slate-400 mb-1">
                <span>NDR Rescue Rate</span>
                <Truck className="w-3.5 h-3.5 text-purple-400" />
              </div>
              <div className="text-xl font-black font-display text-purple-400">
                {metrics.ndrRescueRate || 77.8}%
              </div>
              <p className="text-[10px] text-slate-400 mt-1">
                {metrics.ndrRescuedCount || 14} packages rescued
              </p>
            </div>

            <div className="p-3.5 rounded-2xl bg-slate-900/60 border border-slate-800/80 col-span-2 md:col-span-1">
              <div className="flex items-center justify-between text-xs text-slate-400 mb-1">
                <span>RTO Saved</span>
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
              </div>
              <div className="text-xl font-black font-display text-emerald-400">
                ₹{metrics.rtoCostSaved.toLocaleString()}
              </div>
              <p className="text-[10px] text-slate-400 mt-1">
                Logistics &amp; damage saved
              </p>
            </div>
          </div>
        </div>

        {/* NAVIGATION TABS */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <div className="flex items-center justify-between border-b border-border pb-2 overflow-x-auto">
            <TabsList className="bg-slate-100 p-1 rounded-xl">
              <TabsTrigger value="sequences" className="gap-2 text-xs font-semibold py-2 px-3 rounded-lg data-[state=active]:bg-white data-[state=active]:text-slate-900 data-[state=active]:shadow-sm">
                <Clock className="w-3.5 h-3.5 text-emerald-600" /> Cart Drips
              </TabsTrigger>
              <TabsTrigger value="cod_shield" className="gap-2 text-xs font-semibold py-2 px-3 rounded-lg data-[state=active]:bg-white data-[state=active]:text-slate-900 data-[state=active]:shadow-sm">
                <ShieldCheck className="w-3.5 h-3.5 text-amber-600" /> COD &amp; Voice Shield
              </TabsTrigger>
              <TabsTrigger value="ndr_logistics" className="gap-2 text-xs font-semibold py-2 px-3 rounded-lg data-[state=active]:bg-white data-[state=active]:text-slate-900 data-[state=active]:shadow-sm">
                <Truck className="w-3.5 h-3.5 text-purple-600" /> NDR &amp; Delivery Rescue
              </TabsTrigger>
              <TabsTrigger value="broadcasts" className="gap-2 text-xs font-semibold py-2 px-3 rounded-lg data-[state=active]:bg-white data-[state=active]:text-slate-900 data-[state=active]:shadow-sm">
                <Megaphone className="w-3.5 h-3.5 text-blue-600" /> Broadcasts &amp; Refills
              </TabsTrigger>
              <TabsTrigger value="integrations" className="gap-2 text-xs font-semibold py-2 px-3 rounded-lg data-[state=active]:bg-white data-[state=active]:text-slate-900 data-[state=active]:shadow-sm">
                <Store className="w-3.5 h-3.5 text-slate-700" /> Integrations
              </TabsTrigger>
              <TabsTrigger value="activity" className="gap-2 text-xs font-semibold py-2 px-3 rounded-lg data-[state=active]:bg-white data-[state=active]:text-slate-900 data-[state=active]:shadow-sm">
                <RefreshCw className="w-3.5 h-3.5 text-emerald-700" /> Live Stream
              </TabsTrigger>
            </TabsList>

            <Button
              variant="outline"
              size="sm"
              onClick={loadDashboard}
              className="text-xs gap-1.5 h-9 rounded-xl border-slate-200 hover:bg-slate-50"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${loading ? "animate-spin" : ""}`} /> Refresh Data
            </Button>
          </div>

          {/* ========================================================= */}
          {/* TAB 1: ABANDONED CART DRIP SEQUENCES & SMARTPHONE PREVIEW */}
          {/* ========================================================= */}
          <TabsContent value="sequences" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
              {/* Left Column: 3-Step Sequence Configurator */}
              <div className="lg:col-span-7 space-y-4">
                <div className="rounded-2xl border border-border bg-card p-6 shadow-sm">
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <h3 className="font-display text-lg font-bold text-foreground flex items-center gap-2">
                        <Flame className="w-5 h-5 text-amber-500" /> 3-Step High-Conversion WhatsApp Sequence
                      </h3>
                      <p className="text-xs text-muted-foreground mt-0.5">
                        Delivers timed personalized WhatsApp messages with 1-tap recovery links before customer intent drops.
                      </p>
                    </div>
                    <span className="px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-700 text-[10px] font-mono font-bold border border-emerald-200">
                      AUTOPILOT ON
                    </span>
                  </div>

                  {/* Step 1 Card */}
                  <div
                    onClick={() => setPreviewStep(1)}
                    className={`cursor-pointer rounded-xl p-4 border transition-all ${
                      previewStep === 1
                        ? "border-emerald-500 bg-emerald-50/20 shadow-sm ring-1 ring-emerald-500/20"
                        : "border-border bg-slate-50/50 hover:bg-slate-50"
                    }`}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <span className="w-6 h-6 rounded-full bg-blue-500/10 text-blue-600 font-bold text-xs flex items-center justify-center">
                          1
                        </span>
                        <span className="text-sm font-bold text-foreground">Step 1: Gentle Reminder</span>
                      </div>
                      <span className="text-[11px] font-mono text-muted-foreground bg-muted px-2 py-0.5 rounded">
                        Delay: {step1Delay} mins
                      </span>
                    </div>
                    <p className="text-xs text-muted-foreground line-clamp-2">
                      "Hi Aarav, we saved your bag! Complete your checkout before items sell out."
                    </p>
                    <div className="mt-3 flex items-center gap-4 text-[11px] text-emerald-600 font-medium">
                      <span>• No discount required</span>
                      <span>• Recovers ~40% of returning buyers</span>
                    </div>
                  </div>

                  {/* Step 2 Card */}
                  <div
                    onClick={() => setPreviewStep(2)}
                    className={`cursor-pointer rounded-xl p-4 border transition-all mt-3 ${
                      previewStep === 2
                        ? "border-emerald-500 bg-emerald-50/20 shadow-sm ring-1 ring-emerald-500/20"
                        : "border-border bg-slate-50/50 hover:bg-slate-50"
                    }`}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <span className="w-6 h-6 rounded-full bg-emerald-500/10 text-emerald-600 font-bold text-xs flex items-center justify-center">
                          2
                        </span>
                        <span className="text-sm font-bold text-foreground">Step 2: Exclusive Incentive Offer</span>
                      </div>
                      <span className="text-[11px] font-mono text-emerald-700 bg-emerald-100/60 font-bold px-2 py-0.5 rounded">
                        {step2Discount}% OFF (SAVE{step2Discount})
                      </span>
                    </div>
                    <p className="text-xs text-muted-foreground line-clamp-2">
                      "Hi Aarav, take an extra {step2Discount}% off right now. Use code SAVE{step2Discount} with 1-tap checkout."
                    </p>
                    <div className="mt-3 flex items-center gap-4 text-[11px] text-emerald-600 font-medium">
                      <span>• Delay: {step2Delay} mins</span>
                      <span>• Dynamic coupon auto-applied at checkout</span>
                    </div>
                  </div>

                  {/* Step 3 Card */}
                  <div
                    onClick={() => setPreviewStep(3)}
                    className={`cursor-pointer rounded-xl p-4 border transition-all mt-3 ${
                      previewStep === 3
                        ? "border-emerald-500 bg-emerald-50/20 shadow-sm ring-1 ring-emerald-500/20"
                        : "border-border bg-slate-50/50 hover:bg-slate-50"
                    }`}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <span className="w-6 h-6 rounded-full bg-amber-500/10 text-amber-600 font-bold text-xs flex items-center justify-center">
                          3
                        </span>
                        <span className="text-sm font-bold text-foreground">Step 3: Final Urgency Nudge</span>
                      </div>
                      <span className="text-[11px] font-mono text-amber-700 bg-amber-100/60 font-bold px-2 py-0.5 rounded">
                        Delay: 24 Hours
                      </span>
                    </div>
                    <p className="text-xs text-muted-foreground line-clamp-2">
                      "Your cart reservation expires in 2 hours. Stock is running low! Tap below to secure your items."
                    </p>
                    <div className="mt-3 flex items-center gap-4 text-[11px] text-amber-600 font-medium">
                      <span>• Creates FOMO without devaluing brand</span>
                    </div>
                  </div>

                  {/* Config Inputs */}
                  <div className="mt-6 pt-5 border-t border-border grid grid-cols-3 gap-3">
                    <div>
                      <label className="text-[11px] font-bold uppercase tracking-wider text-muted-foreground block mb-1">
                        Step 1 Delay (mins)
                      </label>
                      <input
                        type="number"
                        value={step1Delay}
                        onChange={(e) => setStep1Delay(e.target.value)}
                        className="h-9 w-full rounded-lg border border-input bg-background px-3 text-xs font-mono"
                      />
                    </div>
                    <div>
                      <label className="text-[11px] font-bold uppercase tracking-wider text-muted-foreground block mb-1">
                        Step 2 Delay (mins)
                      </label>
                      <input
                        type="number"
                        value={step2Delay}
                        onChange={(e) => setStep2Delay(e.target.value)}
                        className="h-9 w-full rounded-lg border border-input bg-background px-3 text-xs font-mono"
                      />
                    </div>
                    <div>
                      <label className="text-[11px] font-bold uppercase tracking-wider text-muted-foreground block mb-1">
                        Discount (%)
                      </label>
                      <input
                        type="number"
                        value={step2Discount}
                        onChange={(e) => setStep2Discount(e.target.value)}
                        className="h-9 w-full rounded-lg border border-input bg-background px-3 text-xs font-mono"
                      />
                    </div>
                  </div>

                  <div className="mt-4 flex justify-end">
                    <Button
                      size="sm"
                      onClick={() =>
                        toast({
                          title: "Recovery Sequence Saved",
                          description: `Timing updated to ${step1Delay}m / ${step2Delay}m with ${step2Discount}% discount code.`,
                        })
                      }
                      className="bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold gap-1.5"
                    >
                      <Check className="w-3.5 h-3.5" /> Save Sequence Settings
                    </Button>
                  </div>
                </div>
              </div>

              {/* Right Column: Photorealistic WhatsApp Mobile Preview */}
              <div className="lg:col-span-5 flex flex-col items-center">
                <div className="w-full max-w-[340px] rounded-[36px] border-[6px] border-slate-800 bg-slate-900 shadow-2xl p-3 text-slate-900">
                  {/* Phone Header notch */}
                  <div className="w-28 h-4 bg-slate-800 mx-auto rounded-b-xl mb-2 flex items-center justify-center">
                    <div className="w-3 h-3 rounded-full bg-slate-950/80 mr-2" />
                    <div className="w-8 h-1 bg-slate-700 rounded-full" />
                  </div>

                  {/* WhatsApp App Bar */}
                  <div className="bg-[#075E54] text-white p-3 rounded-t-2xl flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-800 font-bold text-xs">
                      B
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-xs font-bold truncate">Urban Brand Store</p>
                      <p className="text-[9px] text-emerald-200">Official Business Account</p>
                    </div>
                    <span className="w-2 h-2 rounded-full bg-emerald-400" />
                  </div>

                  {/* WhatsApp Chat Wallpaper Screen */}
                  <div className="bg-[#E5DDD5] p-3 rounded-b-2xl min-h-[380px] flex flex-col justify-end space-y-3 font-sans text-left">
                    <div className="text-center">
                      <span className="text-[10px] bg-white/70 px-2 py-0.5 rounded-full text-slate-500 font-medium">
                        Today 4:12 PM
                      </span>
                    </div>

                    {/* WhatsApp Message Bubble */}
                    <div className="bg-white rounded-2xl p-3 shadow-xs border border-slate-200/40 text-xs space-y-2">
                      <p className="font-semibold text-slate-900">
                        {previewStep === 1 && "Hi Aarav, you left items in your shopping bag! 🛒"}
                        {previewStep === 2 && `Hi Aarav, special ${step2Discount}% OFF saved for you! 🎁`}
                        {previewStep === 3 && "Urgent: Your cart reservation is expiring soon! ⏳"}
                      </p>

                      <div className="bg-slate-50 p-2 rounded-xl border border-slate-100 space-y-1">
                        <p className="text-[11px] font-medium text-slate-800">
                          • Oversized Heavyweight Tee - Black
                        </p>
                        <p className="text-[11px] font-medium text-slate-800">
                          • Cargo Parachute Pants - Olive
                        </p>
                        <div className="text-[11px] font-bold text-emerald-700 pt-1 border-t border-slate-200 flex justify-between">
                          <span>Total Cart Value:</span>
                          <span>
                            {previewStep === 2 ? (
                              <>
                                <span className="line-through text-slate-400 font-normal mr-1">₹2,499</span>
                                ₹{Math.round(2499 * (1 - Number(step2Discount) / 100))}
                              </>
                            ) : (
                              "₹2,499"
                            )}
                          </span>
                        </div>
                      </div>

                      <p className="text-[11px] text-slate-600">
                        {previewStep === 1 &&
                          "Stock is limited and items cannot be reserved for long. Tap below to complete your order."}
                        {previewStep === 2 &&
                          `Use exclusive coupon code SAVE${step2Discount} to claim your instant discount right now.`}
                        {previewStep === 3 &&
                          "This is our final reminder before your reserved items are released back to public inventory."}
                      </p>

                      <div className="text-right text-[9px] text-slate-400 font-mono">
                        4:12 PM <Check className="inline w-3 h-3 text-blue-500" />
                      </div>
                    </div>

                    {/* WhatsApp Quick Reply / CTA Buttons */}
                    <div className="space-y-1.5">
                      <div className="bg-white text-emerald-700 border border-slate-200 font-bold text-center py-2 px-3 rounded-xl text-xs shadow-xs flex items-center justify-center gap-1.5 cursor-pointer hover:bg-slate-50">
                        <ShoppingBag className="w-3.5 h-3.5" /> Complete Checkout
                      </div>
                      <div className="bg-white text-slate-700 border border-slate-200 font-medium text-center py-1.5 px-3 rounded-xl text-[11px] shadow-xs flex items-center justify-center gap-1.5 cursor-pointer hover:bg-slate-50">
                        <MessageSquare className="w-3 h-3" /> Chat with Store Support
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-2 mt-3">
                  <span className="text-xs text-muted-foreground">Previewing:</span>
                  {[1, 2, 3].map((s) => (
                    <button
                      key={s}
                      onClick={() => setPreviewStep(s as 1 | 2 | 3)}
                      className={`text-xs px-2.5 py-1 rounded-md font-bold transition-all ${
                        previewStep === s
                          ? "bg-emerald-600 text-white"
                          : "bg-slate-200 text-slate-700 hover:bg-slate-300"
                      }`}
                    >
                      Step {s}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Active Recovering Carts Table */}
            <div className="rounded-2xl border border-border bg-card p-6 shadow-sm">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h3 className="font-display text-base font-bold text-foreground">
                    Live Abandoned Checkouts in Recovery Queue
                  </h3>
                  <p className="text-xs text-muted-foreground">
                    Real-time carts synchronized from store webhooks undergoing automated sequence drip.
                  </p>
                </div>
                <span className="text-xs font-mono text-muted-foreground">
                  {data?.activeCarts.length || 3} Active Carts Tracked
                </span>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead className="bg-muted/50 text-muted-foreground font-mono uppercase tracking-wider text-[10px]">
                    <tr>
                      <th className="p-3 rounded-l-lg">Customer</th>
                      <th className="p-3">Cart Total</th>
                      <th className="p-3">Items</th>
                      <th className="p-3">Current Status</th>
                      <th className="p-3">Last Nudge</th>
                      <th className="p-3 rounded-r-lg text-right">Action</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-border font-medium">
                    {(data?.activeCarts || []).map((cart) => (
                      <tr key={cart.id} className="hover:bg-muted/20 transition-colors">
                        <td className="p-3">
                          <p className="font-bold text-foreground">{cart.customerName}</p>
                          <p className="text-[11px] font-mono text-muted-foreground">{cart.customerPhone}</p>
                        </td>
                        <td className="p-3 font-mono font-bold text-foreground">
                          ₹{cart.cartTotal.toLocaleString()}
                        </td>
                        <td className="p-3 text-slate-600">
                          {cart.items.map((i) => i.title).join(", ")}
                        </td>
                        <td className="p-3">
                          {cart.status === "recovered" ? (
                            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-[10px] font-bold">
                              <CheckCircle2 className="w-3 h-3" /> Recovered
                            </span>
                          ) : cart.status === "step2_sent" ? (
                            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-blue-100 text-blue-800 text-[10px] font-bold">
                              <Clock className="w-3 h-3" /> Step 2 Sent
                            </span>
                          ) : (
                            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-amber-100 text-amber-800 text-[10px] font-bold">
                              <Clock className="w-3 h-3" /> Step 1 Sent
                            </span>
                          )}
                        </td>
                        <td className="p-3 font-mono text-[11px] text-muted-foreground">
                          {cart.lastMessageSentAt ? new Date(cart.lastMessageSentAt).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }) : "Pending"}
                        </td>
                        <td className="p-3 text-right space-x-2">
                          {cart.status !== "recovered" && (
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => {
                                toast({
                                  title: "Step Dispatched",
                                  description: `Dispatched next recovery nudge to ${cart.customerPhone}`,
                                });
                              }}
                              className="text-[11px] h-7 px-2.5 rounded-lg text-emerald-700 border-emerald-300 hover:bg-emerald-50"
                            >
                              <Send className="w-3 h-3 mr-1" /> Nudge Now
                            </Button>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </TabsContent>

          {/* ========================================================= */}
          {/* TAB 2: COD-TO-PREPAID & AI VOICE CALL RTO SHIELD */}
          {/* ========================================================= */}
          <TabsContent value="cod_shield" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
              {/* COD-to-Prepaid Conversion Engine */}
              <div className="lg:col-span-6 space-y-4">
                <div className="rounded-2xl border border-border bg-card p-6 shadow-sm space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-display text-lg font-bold text-foreground flex items-center gap-2">
                        <Zap className="w-5 h-5 text-amber-500" /> COD-to-Prepaid Conversion Prompt
                      </h3>
                      <p className="text-xs text-muted-foreground mt-0.5">
                        Immediately message COD buyers with a time-limited discount to pay online via UPI, cutting RTO by up to 40%.
                      </p>
                    </div>
                    <span className="px-2.5 py-1 rounded-full bg-amber-100 text-amber-800 text-[10px] font-mono font-bold">
                      HIGH IMPACT
                    </span>
                  </div>

                  <div className="p-4 rounded-xl bg-muted/40 border border-border space-y-3">
                    <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground block">
                      Prepaid Switch Incentive (₹ Discount)
                    </label>
                    <div className="flex gap-2">
                      <input
                        type="number"
                        value={codDiscount}
                        onChange={(e) => setCodDiscount(e.target.value)}
                        className="h-10 w-full rounded-xl border border-input bg-background px-4 text-sm font-mono font-bold"
                      />
                      <Button
                        onClick={() =>
                          toast({
                            title: "Prepaid Discount Saved",
                            description: `Customers will now receive ₹${codDiscount} off when switching from COD to online payment.`,
                          })
                        }
                        className="bg-amber-600 hover:bg-amber-500 text-white font-bold h-10 px-4 text-xs"
                      >
                        Update
                      </Button>
                    </div>
                    <p className="text-[11px] text-muted-foreground">
                      Typically ₹50 to ₹100 offers highest conversion ROI without impacting margins.
                    </p>
                  </div>

                  {/* Interactive Template Preview */}
                  <div className="p-4 rounded-xl border border-amber-200 bg-amber-50/30 space-y-2">
                    <span className="text-[10px] font-mono uppercase font-bold text-amber-800">
                      WhatsApp Template Preview
                    </span>
                    <p className="text-xs text-slate-800 leading-relaxed font-sans">
                      "Namaste Vikram! Your COD order <strong>#ORD-8821</strong> is placed.
                      <br />
                      🎁 <strong>Special Offer:</strong> Pay online now with UPI and <strong>SAVE ₹{codDiscount} instantly!</strong>"
                    </p>
                    <div className="pt-2 flex flex-col gap-1.5">
                      <div className="bg-emerald-600 text-white font-bold text-center py-1.5 px-3 rounded-lg text-xs flex items-center justify-center gap-1.5 shadow-xs">
                        <CreditCard className="w-3.5 h-3.5" /> Pay ₹1,849 (Save ₹{codDiscount})
                      </div>
                      <div className="bg-white border border-slate-200 text-slate-700 text-center py-1 px-3 rounded-lg text-xs font-medium">
                        Confirm Cash on Delivery
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* AI Voice Agent COD Verification Hub */}
              <div className="lg:col-span-6 space-y-4">
                <div className="rounded-2xl border border-border bg-card p-6 shadow-sm space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-display text-lg font-bold text-foreground flex items-center gap-2">
                        <Headphones className="w-5 h-5 text-blue-500" /> AI Voice Call Verification (RTO Shield)
                      </h3>
                      <p className="text-xs text-muted-foreground mt-0.5">
                        Autonomous voice calls placed right after order confirmation to verify delivery address and genuine customer intent.
                      </p>
                    </div>
                    <span className="px-2.5 py-1 rounded-full bg-blue-100 text-blue-800 text-[10px] font-mono font-bold">
                      VOICE AGENT
                    </span>
                  </div>

                  {/* Interactive Voice Simulator */}
                  <div className="p-4 rounded-xl bg-slate-950 text-white space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-mono text-emerald-400 font-bold flex items-center gap-1.5">
                        <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                        AI Voice Call Tester
                      </span>
                      <span className="text-[10px] font-mono text-slate-400">Powered by Conversio Voice Engine</span>
                    </div>

                    <div className="grid grid-cols-2 gap-2 text-xs">
                      <div>
                        <label className="text-[10px] text-slate-400 uppercase font-mono block mb-1">Target Order</label>
                        <select
                          value={selectedCodOrder}
                          onChange={(e) => setSelectedCodOrder(e.target.value)}
                          className="w-full bg-slate-900 border border-slate-800 rounded-lg p-2 text-xs text-white"
                        >
                          {(data?.codOrders || []).map((o) => (
                            <option key={o.orderId} value={o.orderId}>
                              {o.orderId} ({o.customerName})
                            </option>
                          ))}
                        </select>
                      </div>

                      <div>
                        <label className="text-[10px] text-slate-400 uppercase font-mono block mb-1">Simulated Customer Response</label>
                        <select
                          value={voiceOutcome}
                          onChange={(e) => setVoiceOutcome(e.target.value as any)}
                          className="w-full bg-slate-900 border border-slate-800 rounded-lg p-2 text-xs text-white"
                        >
                          <option value="confirm">Customer says "Confirm Order"</option>
                          <option value="prepay">Customer agrees to Prepay Online</option>
                          <option value="cancel">Customer says "Cancel Order"</option>
                        </select>
                      </div>
                    </div>

                    <Button
                      onClick={handleTriggerVoiceCall}
                      disabled={simulatingVoice}
                      className="w-full bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs h-9 gap-2 shadow-md shadow-blue-950/40"
                    >
                      <PhoneCall className={`w-3.5 h-3.5 ${simulatingVoice ? "animate-bounce" : ""}`} />
                      {simulatingVoice ? "Calling Customer..." : "Simulate Outbound AI Verification Call"}
                    </Button>

                    {/* Live Transcript Display */}
                    {activeTranscript && (
                      <div className="p-3 rounded-lg bg-slate-900 border border-slate-800 text-[11px] font-mono space-y-1.5">
                        <p className="text-emerald-400 font-bold">Call Audio Transcript:</p>
                        <p className="text-slate-300 whitespace-pre-line leading-relaxed">{activeTranscript}</p>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* COD Orders Status Table */}
            <div className="rounded-2xl border border-border bg-card p-6 shadow-sm">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h3 className="font-display text-base font-bold text-foreground">
                    COD Verification &amp; Prepaid Conversion Log
                  </h3>
                  <p className="text-xs text-muted-foreground">
                    Recent Cash-on-Delivery orders protected against return-to-origin losses.
                  </p>
                </div>
                <span className="text-xs font-mono text-muted-foreground">
                  {data?.codOrders.length || 3} Orders Logged
                </span>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead className="bg-muted/50 text-muted-foreground font-mono uppercase tracking-wider text-[10px]">
                    <tr>
                      <th className="p-3 rounded-l-lg">Order ID</th>
                      <th className="p-3">Customer</th>
                      <th className="p-3">Amount</th>
                      <th className="p-3">Verification Method</th>
                      <th className="p-3">Current Status</th>
                      <th className="p-3 rounded-r-lg text-right">Payment Link</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-border font-medium">
                    {(data?.codOrders || []).map((order) => (
                      <tr key={order.id} className="hover:bg-muted/20 transition-colors">
                        <td className="p-3 font-mono font-bold text-foreground">{order.orderId}</td>
                        <td className="p-3">
                          <p className="font-bold text-foreground">{order.customerName}</p>
                          <p className="text-[11px] font-mono text-muted-foreground">{order.customerPhone}</p>
                        </td>
                        <td className="p-3 font-mono font-bold text-foreground">
                          ₹{order.totalAmount.toLocaleString()}
                        </td>
                        <td className="p-3 font-mono text-[11px]">
                          {order.verificationMethod === "ai_voice_call" ? (
                            <span className="flex items-center gap-1 text-blue-600 font-bold">
                              <PhoneCall className="w-3 h-3" /> AI Voice Call
                            </span>
                          ) : (
                            <span className="flex items-center gap-1 text-emerald-600 font-bold">
                              <MessageSquare className="w-3 h-3" /> WhatsApp Button
                            </span>
                          )}
                        </td>
                        <td className="p-3">
                          {order.status === "converted_to_prepaid" ? (
                            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-[10px] font-bold">
                              <CheckCircle2 className="w-3 h-3" /> Converted to Prepaid
                            </span>
                          ) : order.status === "verified_cod" ? (
                            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-blue-100 text-blue-800 text-[10px] font-bold">
                              <UserCheck className="w-3 h-3" /> Verified COD
                            </span>
                          ) : order.status === "cancelled" ? (
                            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-red-100 text-red-800 text-[10px] font-bold">
                              <XCircle className="w-3 h-3" /> Cancelled (RTO Saved)
                            </span>
                          ) : (
                            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-amber-100 text-amber-800 text-[10px] font-bold">
                              <Clock className="w-3 h-3" /> Awaiting Response
                            </span>
                          )}
                        </td>
                        <td className="p-3 text-right">
                          <button
                            onClick={() => handleCopy(order.paymentLink, "Payment link")}
                            className="text-[11px] font-mono text-muted-foreground hover:text-foreground inline-flex items-center gap-1 bg-muted px-2 py-1 rounded"
                          >
                            <Copy className="w-3 h-3" /> Copy Link
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </TabsContent>

          {/* ========================================================= */}
          {/* TAB 3: NDR & FAILED DELIVERY RESCUE (SHIPROCKET/DELHIVERY) */}
          {/* ========================================================= */}
          <TabsContent value="ndr_logistics" className="space-y-6">
            <div className="rounded-2xl border border-border bg-card p-6 shadow-sm space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-display text-lg font-bold text-foreground flex items-center gap-2">
                    <Truck className="w-5 h-5 text-purple-600" /> Non-Delivery Report (NDR) Management
                  </h3>
                  <p className="text-xs text-muted-foreground mt-0.5">
                    When courier delivery fails (Door locked, wrong landmark), Conversio immediately messages the customer on WhatsApp to update delivery preferences and avoid costly Return to Origin (RTO).
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <span className="px-3 py-1 rounded-full bg-purple-100 text-purple-800 text-xs font-mono font-bold">
                    {metrics.ndrRescueRate || 77.8}% Rescued
                  </span>
                  <Button
                    size="sm"
                    onClick={() => handleSimulateWebhook("ndr_failed_delivery")}
                    className="bg-purple-600 hover:bg-purple-500 text-white font-bold text-xs gap-1.5"
                  >
                    <Truck className="w-3.5 h-3.5" /> + Simulate NDR Failure
                  </Button>
                </div>
              </div>

              {/* NDR Active Queue Table */}
              <div className="overflow-x-auto pt-2">
                <table className="w-full text-left text-xs">
                  <thead className="bg-muted/50 text-muted-foreground font-mono uppercase tracking-wider text-[10px]">
                    <tr>
                      <th className="p-3 rounded-l-lg">Courier &amp; AWB</th>
                      <th className="p-3">Order ID</th>
                      <th className="p-3">Customer</th>
                      <th className="p-3">Failure Reason</th>
                      <th className="p-3">NDR Status</th>
                      <th className="p-3 rounded-r-lg text-right">Quick Rescue Action</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-border font-medium">
                    {(data?.ndrRecords || []).map((ndr) => (
                      <tr key={ndr.id} className="hover:bg-muted/20 transition-colors">
                        <td className="p-3">
                          <p className="font-bold text-foreground">{ndr.courierName}</p>
                          <p className="text-[11px] font-mono text-muted-foreground">{ndr.waybillNumber}</p>
                        </td>
                        <td className="p-3 font-mono font-bold text-foreground">{ndr.orderId}</td>
                        <td className="p-3">
                          <p className="font-bold text-foreground">{ndr.customerName}</p>
                          <p className="text-[11px] font-mono text-muted-foreground">{ndr.customerPhone}</p>
                        </td>
                        <td className="p-3 text-red-600 font-semibold">{ndr.failureReason}</td>
                        <td className="p-3">
                          {ndr.status === "reattempt_requested" ? (
                            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-[10px] font-bold">
                              <CheckCircle2 className="w-3 h-3" /> Re-attempt Tomorrow
                            </span>
                          ) : ndr.status === "address_updated" ? (
                            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-blue-100 text-blue-800 text-[10px] font-bold">
                              <MapPin className="w-3 h-3" /> Address Updated
                            </span>
                          ) : (
                            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-amber-100 text-amber-800 text-[10px] font-bold animate-pulse">
                              <Clock className="w-3 h-3" /> Awaiting Customer Tap
                            </span>
                          )}
                        </td>
                        <td className="p-3 text-right space-x-2">
                          {ndr.status === "pending_customer" ? (
                            <Button
                              size="sm"
                              onClick={() => handleResolveNdr(ndr.id, "reattempt_tomorrow")}
                              className="text-[11px] h-7 px-2.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white font-bold"
                            >
                              <Calendar className="w-3 h-3 mr-1" /> Re-attempt Tomorrow
                            </Button>
                          ) : (
                            <span className="text-[11px] font-mono text-muted-foreground">Relayed to Courier</span>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </TabsContent>

          {/* ========================================================= */}
          {/* TAB 4: D2C BROADCASTS & AUTO-REPLENISHMENT */}
          {/* ========================================================= */}
          <TabsContent value="broadcasts" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Broadcast Campaigns */}
              <div className="rounded-2xl border border-border bg-card p-6 shadow-sm space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-display text-base font-bold text-foreground flex items-center gap-2">
                      <Megaphone className="w-4 h-4 text-blue-600" /> D2C High-ROI WhatsApp Broadcasts
                    </h3>
                    <p className="text-xs text-muted-foreground">
                      Pre-crafted high-converting promotional campaigns with AI copywriting.
                    </p>
                  </div>
                </div>

                <div className="space-y-3">
                  {(data?.broadcastTemplates || []).map((tpl) => (
                    <div
                      key={tpl.id}
                      className="p-4 rounded-xl border border-border bg-slate-50/50 hover:bg-slate-50 transition-all space-y-2"
                    >
                      <div className="flex items-center justify-between">
                        <span className="font-bold text-xs text-foreground">{tpl.title}</span>
                        <span className="text-[10px] font-bold text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded font-mono">
                          {tpl.roiBoost}
                        </span>
                      </div>
                      <p className="text-xs text-muted-foreground line-clamp-2">{tpl.messageText}</p>
                      <div className="pt-2 flex items-center justify-between">
                        <span className="text-[10px] font-mono text-slate-500 uppercase">
                          Segment: {tpl.targetSegment.replace(/_/g, " ")}
                        </span>
                        <Button
                          size="sm"
                          onClick={() => handleLaunchBroadcast(tpl.id, tpl.title)}
                          className="text-xs font-bold h-7 px-3 bg-blue-600 hover:bg-blue-500 text-white gap-1"
                        >
                          <Send className="w-3 h-3" /> Launch Blast
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Replenishment & Repeat Purchase */}
              <div className="rounded-2xl border border-border bg-card p-6 shadow-sm space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-display text-base font-bold text-foreground flex items-center gap-2">
                      <Repeat className="w-4 h-4 text-emerald-600" /> Repeat Purchase &amp; Replenishment Rules
                    </h3>
                    <p className="text-xs text-muted-foreground">
                      Automated 30/45-day WhatsApp refill reminders for consumable products.
                    </p>
                  </div>
                  <span className="px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-[10px] font-mono font-bold">
                    3 RULES ACTIVE
                  </span>
                </div>

                <div className="space-y-3">
                  {(data?.replenishmentRules || []).map((rule) => (
                    <div
                      key={rule.id}
                      className="p-4 rounded-xl border border-border bg-slate-50/50 space-y-2"
                    >
                      <div className="flex items-center justify-between">
                        <span className="font-bold text-xs text-foreground">{rule.productCategory}</span>
                        <span className="text-[11px] font-mono font-bold text-emerald-600 bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded">
                          Cycle: Every {rule.cycleDays} Days
                        </span>
                      </div>
                      <p className="text-xs text-muted-foreground">{rule.messageCopy}</p>
                      <div className="flex items-center justify-between pt-1 text-[11px] text-slate-500">
                        <span>Coupon: <strong className="font-mono text-foreground">{rule.discountCode}</strong> ({rule.discountPercent}% OFF)</span>
                        <span className="text-emerald-600 font-bold flex items-center gap-1">
                          <CheckCircle2 className="w-3 h-3" /> Auto-Trigger
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </TabsContent>

          {/* ========================================================= */}
          {/* TAB 5: STORE INTEGRATIONS (SHOPIFY & WOOCOMMERCE) */}
          {/* ========================================================= */}
          <TabsContent value="integrations" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Shopify Webhook Card */}
              <div className="rounded-2xl border border-border bg-card p-6 shadow-sm space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center font-black text-emerald-600 font-display text-lg">
                      S
                    </div>
                    <div>
                      <h3 className="font-display text-base font-bold text-foreground">
                        Shopify Store Integration
                      </h3>
                      <p className="text-xs text-muted-foreground">
                        Real-time webhook sync for checkouts and COD orders.
                      </p>
                    </div>
                  </div>
                  <span className="px-2 py-0.5 rounded-md bg-emerald-100 text-emerald-800 text-[10px] font-mono font-bold">
                    CONNECTED
                  </span>
                </div>

                <div className="space-y-3 pt-2 text-xs">
                  <div>
                    <label className="font-semibold text-foreground block mb-1">
                      Shopify Webhook Notification URL
                    </label>
                    <div className="flex items-center gap-2">
                      <input
                        readOnly
                        value="https://api.conversio.ai/commerce/webhook/shopify/ws_demo123"
                        className="h-9 w-full rounded-lg border border-input bg-muted px-3 text-xs font-mono text-muted-foreground"
                      />
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() =>
                          handleCopy(
                            "https://api.conversio.ai/commerce/webhook/shopify/ws_demo123",
                            "Shopify Webhook URL"
                          )
                        }
                        className="h-9 px-3 gap-1"
                      >
                        <Copy className="w-3 h-3" /> Copy
                      </Button>
                    </div>
                  </div>

                  <div>
                    <label className="font-semibold text-foreground block mb-1">
                      Shopify Webhook Secret (HMAC verification)
                    </label>
                    <input
                      type="password"
                      value="shpss_live_9921ab07e84a2"
                      readOnly
                      className="h-9 w-full rounded-lg border border-input bg-muted px-3 text-xs font-mono text-muted-foreground"
                    />
                  </div>

                  <div className="p-3 rounded-xl bg-muted/40 border border-border space-y-1.5 text-[11px]">
                    <p className="font-bold text-foreground">Subscribed Shopify Topics:</p>
                    <p className="text-muted-foreground">• <code>checkouts/create</code> (Ingests new abandoned cart)</p>
                    <p className="text-muted-foreground">• <code>checkouts/update</code> (Tracks customer item modifications)</p>
                    <p className="text-muted-foreground">• <code>orders/create</code> (Triggers COD-to-Prepaid discount prompt)</p>
                  </div>
                </div>
              </div>

              {/* WooCommerce Card */}
              <div className="rounded-2xl border border-border bg-card p-6 shadow-sm space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-purple-500/10 border border-purple-500/20 flex items-center justify-center font-black text-purple-600 font-display text-lg">
                      W
                    </div>
                    <div>
                      <h3 className="font-display text-base font-bold text-foreground">
                        WooCommerce Integration
                      </h3>
                      <p className="text-xs text-muted-foreground">
                        Direct REST API &amp; Webhook connector for WordPress.
                      </p>
                    </div>
                  </div>
                  <span className="px-2 py-0.5 rounded-md bg-blue-100 text-blue-800 text-[10px] font-mono font-bold">
                    READY
                  </span>
                </div>

                <div className="space-y-3 pt-2 text-xs">
                  <div>
                    <label className="font-semibold text-foreground block mb-1">
                      WooCommerce Webhook Delivery URL
                    </label>
                    <div className="flex items-center gap-2">
                      <input
                        readOnly
                        value="https://api.conversio.ai/commerce/webhook/woocommerce/ws_demo123"
                        className="h-9 w-full rounded-lg border border-input bg-muted px-3 text-xs font-mono text-muted-foreground"
                      />
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() =>
                          handleCopy(
                            "https://api.conversio.ai/commerce/webhook/woocommerce/ws_demo123",
                            "WooCommerce Webhook URL"
                          )
                        }
                        className="h-9 px-3 gap-1"
                      >
                        <Copy className="w-3 h-3" /> Copy
                      </Button>
                    </div>
                  </div>

                  <div className="p-3 rounded-xl bg-muted/40 border border-border space-y-1.5 text-[11px]">
                    <p className="font-bold text-foreground">Setup Instructions:</p>
                    <p className="text-muted-foreground">1. Go to WooCommerce → Settings → Advanced → Webhooks</p>
                    <p className="text-muted-foreground">2. Add Webhook for <strong>Order created</strong> and set Delivery URL.</p>
                    <p className="text-muted-foreground">3. Orders marked COD will automatically trigger our RTO verification flow.</p>
                  </div>
                </div>
              </div>
            </div>
          </TabsContent>

          {/* ========================================================= */}
          {/* TAB 6: LIVE ACTIVITY STREAM */}
          {/* ========================================================= */}
          <TabsContent value="activity" className="space-y-6">
            <div className="rounded-2xl border border-border bg-card p-6 shadow-sm">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h3 className="font-display text-base font-bold text-foreground">
                    Real-Time D2C Revenue &amp; Verification Stream
                  </h3>
                  <p className="text-xs text-muted-foreground">
                    Chronological audit log of automated WhatsApp recovery touches, customer conversions, and AI calls.
                  </p>
                </div>
                <span className="text-xs font-mono text-emerald-600 font-bold flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" /> LIVE FEED
                </span>
              </div>

              <div className="space-y-3">
                {(data?.recentActivities || []).map((act) => (
                  <div
                    key={act.id}
                    className="p-4 rounded-xl border border-border bg-slate-50/50 flex items-start justify-between gap-4 text-xs hover:bg-slate-50 transition-colors"
                  >
                    <div className="flex items-start gap-3">
                      <div className="mt-0.5">
                        {act.type === "cart_recovered" || act.type === "cod_to_prepaid_converted" ? (
                          <div className="w-7 h-7 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center font-bold">
                            ₹
                          </div>
                        ) : act.type === "voice_call_completed" ? (
                          <div className="w-7 h-7 rounded-full bg-blue-100 text-blue-700 flex items-center justify-center font-bold">
                            <PhoneCall className="w-3.5 h-3.5" />
                          </div>
                        ) : act.type === "ndr_reattempt_scheduled" ? (
                          <div className="w-7 h-7 rounded-full bg-purple-100 text-purple-700 flex items-center justify-center font-bold">
                            <Truck className="w-3.5 h-3.5" />
                          </div>
                        ) : (
                          <div className="w-7 h-7 rounded-full bg-amber-100 text-amber-700 flex items-center justify-center font-bold">
                            <Clock className="w-3.5 h-3.5" />
                          </div>
                        )}
                      </div>

                      <div className="space-y-0.5">
                        <div className="flex items-center gap-2">
                          <span className="font-bold text-foreground">{act.customerName}</span>
                          <span className="font-mono text-muted-foreground text-[11px]">{act.customerPhone}</span>
                          <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-muted text-muted-foreground uppercase font-mono">
                            {act.type.replace(/_/g, " ")}
                          </span>
                        </div>
                        <p className="text-xs text-muted-foreground leading-relaxed">{act.details}</p>
                      </div>
                    </div>

                    <div className="text-right shrink-0">
                      <span className="font-bold font-mono text-emerald-600 block">
                        ₹{act.amount.toLocaleString()}
                      </span>
                      <span className="text-[10px] font-mono text-muted-foreground">
                        {new Date(act.timestamp).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
}
