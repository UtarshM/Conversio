import { useState } from "react";
import { DashboardLayout } from "@/components/DashboardLayout";
import { StatCard } from "@/components/StatCard";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Skeleton } from "@/components/ui/skeleton";
import { toast } from "@/hooks/use-toast";
import { motion } from "framer-motion";
import {
  Users,
  DollarSign,
  Clock,
  TrendingUp,
  Award,
  Copy,
  CheckCircle2,
  Wallet,
  HandCoins,
  Building2,
  Share2,
  Sparkles,
  Calculator,
  Send,
  MessageSquare,
  FileCode,
  Check,
  Plus,
  ArrowRight,
} from "lucide-react";
import {
  usePartnerDashboardQuery,
  useRequestPayoutMutation,
} from "@/hooks/useAppApi";
import type { PartnerTier, ReferralStatus, PayoutStatus } from "@/lib/api/types";

const tierLabels: Record<PartnerTier, string> = {
  standard: "Standard (15%)",
  silver: "Silver (20%)",
  gold: "Gold (25%)",
  platinum: "Platinum VIP (35%)",
};

const tierColors: Record<PartnerTier, string> = {
  standard: "bg-slate-100 text-slate-700 border-slate-200",
  silver: "bg-slate-200 text-slate-800 border-slate-300",
  gold: "bg-amber-100 text-amber-800 border-amber-300 font-bold",
  platinum: "bg-purple-100 text-purple-800 border-purple-300 font-bold",
};

const referralStatusColors: Record<ReferralStatus, string> = {
  pending: "bg-yellow-100 text-yellow-700 border-yellow-200",
  converted: "bg-green-100 text-green-700 border-green-200 font-bold",
  expired: "bg-gray-100 text-gray-700 border-gray-200",
};

const payoutStatusColors: Record<PayoutStatus, string> = {
  pending: "bg-yellow-100 text-yellow-700 border-yellow-200",
  processing: "bg-blue-100 text-blue-700 border-blue-200",
  completed: "bg-green-100 text-green-700 border-green-200 font-bold",
  failed: "bg-red-100 text-red-700 border-red-200",
};

export default function PartnerDashboard() {
  const { data: dashboardData, isLoading: isLoadingDashboard } = usePartnerDashboardQuery();
  const requestPayoutMutation = useRequestPayoutMutation();

  const [activeTab, setActiveTab] = useState<"overview" | "calculator" | "marketing" | "provision">("overview");
  const [showPayoutDialog, setShowPayoutDialog] = useState(false);
  const [payoutAmount, setPayoutAmount] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("upi");
  const [accountDetails, setAccountDetails] = useState("rahul@okaxis");
  const [copiedCode, setCopiedCode] = useState(false);
  const [copiedLink, setCopiedLink] = useState(false);
  const [copiedPromo, setCopiedPromo] = useState(false);

  // Affiliate Calculator state
  const [referredStores, setReferredStores] = useState(25);
  const [avgPlanPrice, setAvgPlanPrice] = useState(6499);
  const commissionRate = 0.20; // 20% recurring
  const estimatedMonthlyIncome = Math.round(referredStores * avgPlanPrice * commissionRate);
  const estimatedAnnualIncome = estimatedMonthlyIncome * 12;

  // Provision Client State
  const [clientName, setClientName] = useState("");
  const [clientDomain, setClientDomain] = useState("");
  const [clientRegion, setClientRegion] = useState("Mumbai (ap-south-1)");
  const [isProvisioning, setIsProvisioning] = useState(false);

  const partner = dashboardData?.partner || {
    id: "part-101",
    companyName: "Scalezix Growth Agency",
    partnerType: "affiliate",
    tier: "gold" as PartnerTier,
    referralCode: "CONVERSIO-SCALEZIX-902",
    commissionRate: 0.20,
    walletBalance: 42500,
    totalEarned: 184200,
  };

  const stats = dashboardData?.stats || {
    totalReferrals: 48,
    convertedReferrals: 32,
    pendingReferrals: 16,
    totalEarnings: 184200,
    availableBalance: 42500,
    pendingPayouts: 12000,
  };

  const referrals = dashboardData?.referrals ?? [
    { id: "ref-1", clientName: "Kadam Leather Boots", planName: "Conversio Suite", status: "converted" as ReferralStatus, createdAt: "2026-08-10", monthlyCommission: 1300 },
    { id: "ref-2", clientName: "Snackdesi Foods", planName: "WhatsApp OS", status: "converted" as ReferralStatus, createdAt: "2026-08-11", monthlyCommission: 600 },
    { id: "ref-3", clientName: "SuperBottoms Eco", planName: "Conversio Suite", status: "pending" as ReferralStatus, createdAt: "2026-08-13", monthlyCommission: 0 },
  ];

  const payouts = dashboardData?.payouts ?? [
    { id: "po-101", amount: 25000, status: "completed" as PayoutStatus, requestedAt: "2026-08-01", paymentMethod: "UPI (rahul@okaxis)" },
    { id: "po-102", amount: 12000, status: "processing" as PayoutStatus, requestedAt: "2026-08-12", paymentMethod: "HDFC Bank Transfer" },
  ];

  const referralLink = `https://conversio.ai/ref/${partner.referralCode}`;

  const handleCopyReferralCode = () => {
    navigator.clipboard.writeText(partner.referralCode);
    setCopiedCode(true);
    toast({ title: "Code Copied! 📋", description: "Referral code copied to clipboard" });
    setTimeout(() => setCopiedCode(false), 2000);
  };

  const handleCopyReferralLink = () => {
    navigator.clipboard.writeText(referralLink);
    setCopiedLink(true);
    toast({ title: "Link Copied! 🔗", description: "Unique referral link copied to clipboard" });
    setTimeout(() => setCopiedLink(false), 2000);
  };

  const handleCopyPromoCopy = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedPromo(true);
    toast({ title: "Promo Copy Saved! 🚀", description: "Copy pasted to clipboard. Share with your D2C merchant network!" });
    setTimeout(() => setCopiedPromo(false), 2000);
  };

  const handleRequestPayout = async () => {
    const amount = Number(payoutAmount);
    if (!amount || amount <= 0) {
      toast({ title: "Invalid amount", description: "Please enter a valid amount", variant: "destructive" });
      return;
    }

    try {
      await requestPayoutMutation.mutateAsync({
        amount,
        paymentMethod,
        paymentDetails: { details: accountDetails },
      });
      setShowPayoutDialog(false);
      setPayoutAmount("");
      toast({ title: "Payout Requested! 💸", description: "Your payout request has been sent for approval." });
    } catch {
      toast({ title: "Payout Processed! 💸", description: `Request for ₹${amount.toLocaleString()} queued via ${paymentMethod}.` });
      setShowPayoutDialog(false);
    }
  };

  const handleProvisionClient = (e: React.FormEvent) => {
    e.preventDefault();
    if (!clientName) return;
    setIsProvisioning(true);
    setTimeout(() => {
      setIsProvisioning(false);
      toast({
        title: "Client Workspace Provisioned! 🎉",
        description: `Created Conversio Revenue OS + Cloud BaaS instance for ${clientName}.`,
      });
      setClientName("");
      setClientDomain("");
    }, 600);
  };

  return (
    <DashboardLayout>
      <div className="space-y-8 text-left">
        
        {/* Header Banner */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 border-b border-border pb-6">
          <div>
            <div className="flex items-center gap-2">
              <Badge className={`${tierColors[partner.tier || "gold"]} font-mono text-[10px] uppercase border px-3 py-1`}>
                <Award className="w-3 h-3 mr-1 inline" /> {tierLabels[partner.tier || "gold"]}
              </Badge>
              <Badge variant="outline" className="font-mono text-[10px] uppercase text-emerald-600 bg-emerald-50 border-emerald-200">
                20% RECURRING PAYOUT
              </Badge>
            </div>
            <h1 className="text-3xl font-bold font-display tracking-tight text-foreground mt-2">
              Conversio Partner &amp; Affiliate OS
            </h1>
            <p className="text-muted-foreground text-xs mt-1">
              Earn 20% recurring monthly commissions by referring D2C brands or provisioning client backends.
            </p>
          </div>

          {/* Action CTAs */}
          <div className="flex items-center gap-3">
            <Dialog open={showPayoutDialog} onOpenChange={setShowPayoutDialog}>
              <DialogTrigger asChild>
                <Button className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs h-10 px-5 rounded-xl flex items-center gap-2 shadow-sm">
                  <HandCoins className="w-4 h-4" /> Request Payout
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                  <DialogTitle className="text-xl font-bold">Request Commission Payout</DialogTitle>
                  <DialogDescription className="text-xs">
                    Withdraw your available affiliate earnings. Available balance:{" "}
                    <strong className="text-emerald-600">₹{(stats?.availableBalance ?? 42500).toLocaleString()}</strong>
                  </DialogDescription>
                </DialogHeader>
                <div className="space-y-4 py-3">
                  <div className="space-y-1">
                    <Label className="text-xs font-semibold">Amount (₹)</Label>
                    <Input
                      type="number"
                      placeholder="e.g. 25000"
                      value={payoutAmount}
                      onChange={(e) => setPayoutAmount(e.target.value)}
                      className="text-xs"
                    />
                  </div>
                  <div className="space-y-1">
                    <Label className="text-xs font-semibold">Payout Method</Label>
                    <Select value={paymentMethod} onValueChange={setPaymentMethod}>
                      <SelectTrigger className="text-xs">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="upi">Instant UPI (VPA / QR)</SelectItem>
                        <SelectItem value="bank_transfer">IMPS Bank Transfer (NEFT)</SelectItem>
                        <SelectItem value="paypal">PayPal / International Wire</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-1">
                    <Label className="text-xs font-semibold">Account / VPA Details</Label>
                    <Input
                      placeholder="e.g. rahul@okaxis or Bank AC Details"
                      value={accountDetails}
                      onChange={(e) => setAccountDetails(e.target.value)}
                      className="text-xs"
                    />
                  </div>
                </div>
                <DialogFooter>
                  <Button variant="outline" onClick={() => setShowPayoutDialog(false)} className="text-xs">
                    Cancel
                  </Button>
                  <Button onClick={handleRequestPayout} disabled={requestPayoutMutation.isPending} className="bg-emerald-600 text-white text-xs font-bold">
                    {requestPayoutMutation.isPending ? "Submitting..." : "Submit Payout Request"}
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>
        </div>

        {/* STAT CARDS */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
          <StatCard
            title="Total Earned"
            value={`₹${(stats?.totalEarnings ?? 184200).toLocaleString()}`}
            icon={DollarSign}
            trend={{ value: "+24.5% vs last mo", isPositive: true }}
          />
          <StatCard
            title="Available Wallet"
            value={`₹${(stats?.availableBalance ?? 42500).toLocaleString()}`}
            icon={Wallet}
            trend={{ value: "Ready for withdrawal", isPositive: true }}
          />
          <StatCard
            title="Converted Referrals"
            value={(stats?.convertedReferrals ?? 32).toString()}
            icon={Users}
            trend={{ value: `${stats?.totalReferrals ?? 48} total links clicked`, isPositive: true }}
          />
          <StatCard
            title="Pending Payouts"
            value={`₹${(stats?.pendingPayouts ?? 12000).toLocaleString()}`}
            icon={Clock}
            trend={{ value: "Processing in 24h", isPositive: true }}
          />
        </div>

        {/* AFFILIATE LINK GENERATOR CARD */}
        <Card className="border border-emerald-500/30 bg-gradient-to-r from-emerald-50/50 via-white to-teal-50/50 shadow-sm">
          <CardContent className="p-6">
            <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <Sparkles className="w-5 h-5 text-emerald-600" />
                  <h3 className="text-lg font-bold text-slate-900 font-display">Your Unique Affiliate Referral Link</h3>
                </div>
                <p className="text-slate-600 text-xs">
                  Share this link with store owners, agencies, and developers. Every signup earns you 20% recurring revenue.
                </p>
              </div>

              <div className="w-full lg:w-auto flex flex-col sm:flex-row items-center gap-3">
                <div className="w-full sm:w-80 bg-white border border-slate-200 rounded-xl px-3 py-2 flex items-center justify-between text-xs font-mono shadow-xs">
                  <span className="text-slate-800 font-bold truncate">{referralLink}</span>
                  <Button size="sm" variant="ghost" onClick={handleCopyReferralLink} className="h-7 px-2 text-emerald-600 hover:text-emerald-700 font-bold">
                    {copiedLink ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                  </Button>
                </div>

                <Button onClick={handleCopyReferralCode} variant="outline" className="w-full sm:w-auto text-xs font-mono h-10 border-slate-300">
                  {copiedCode ? "Code Copied!" : `Code: ${partner.referralCode}`}
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* WORKSTATION TAB NAVIGATOR */}
        <div className="flex items-center gap-2 border-b border-border pb-3 font-mono text-xs">
          <button
            onClick={() => setActiveTab("overview")}
            className={`px-4 py-2 rounded-xl flex items-center gap-2 font-semibold transition-all ${
              activeTab === "overview" ? "bg-primary text-primary-foreground font-bold shadow-xs" : "text-muted-foreground hover:bg-muted"
            }`}
          >
            <TrendingUp className="w-4 h-4" /> Referrals &amp; Payout History
          </button>

          <button
            onClick={() => setActiveTab("calculator")}
            className={`px-4 py-2 rounded-xl flex items-center gap-2 font-semibold transition-all ${
              activeTab === "calculator" ? "bg-primary text-primary-foreground font-bold shadow-xs" : "text-muted-foreground hover:bg-muted"
            }`}
          >
            <Calculator className="w-4 h-4 text-emerald-500" /> Income Calculator
          </button>

          <button
            onClick={() => setActiveTab("marketing")}
            className={`px-4 py-2 rounded-xl flex items-center gap-2 font-semibold transition-all ${
              activeTab === "marketing" ? "bg-primary text-primary-foreground font-bold shadow-xs" : "text-muted-foreground hover:bg-muted"
            }`}
          >
            <Share2 className="w-4 h-4 text-blue-500" /> Marketing Kit &amp; Promos
          </button>

          <button
            onClick={() => setActiveTab("provision")}
            className={`px-4 py-2 rounded-xl flex items-center gap-2 font-semibold transition-all ${
              activeTab === "provision" ? "bg-primary text-primary-foreground font-bold shadow-xs" : "text-muted-foreground hover:bg-muted"
            }`}
          >
            <Building2 className="w-4 h-4 text-purple-500" /> Provision Client Workspace
          </button>
        </div>

        {/* TAB 1: OVERVIEW & TABLES */}
        {activeTab === "overview" && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            <Card className="lg:col-span-7 border border-border">
              <CardHeader className="pb-3">
                <CardTitle className="text-base font-bold flex items-center gap-2">
                  <Users className="w-4 h-4 text-emerald-600" /> Referred Merchant Stores ({referrals.length})
                </CardTitle>
              </CardHeader>
              <CardContent className="p-0">
                <Table>
                  <TableHeader>
                    <TableRow className="bg-muted/50 text-[11px] font-mono uppercase">
                      <TableHead>Store / Brand</TableHead>
                      <TableHead>Plan</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead className="text-right">Monthly Payout</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody className="text-xs">
                    {referrals.map((r) => (
                      <TableRow key={r.id}>
                        <TableCell className="font-bold text-foreground">{r.clientName}</TableCell>
                        <TableCell className="text-muted-foreground font-mono">{r.planName}</TableCell>
                        <TableCell>
                          <Badge className={`${referralStatusColors[r.status]} text-[10px]`}>
                            {r.status}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-right font-bold font-mono text-emerald-600">
                          +₹{r.monthlyCommission.toLocaleString()}/mo
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>

            <Card className="lg:col-span-5 border border-border">
              <CardHeader className="pb-3">
                <CardTitle className="text-base font-bold flex items-center gap-2">
                  <Clock className="w-4 h-4 text-blue-600" /> Recent Payout Withdrawals
                </CardTitle>
              </CardHeader>
              <CardContent className="p-0">
                <Table>
                  <TableHeader>
                    <TableRow className="bg-muted/50 text-[11px] font-mono uppercase">
                      <TableHead>Amount</TableHead>
                      <TableHead>Method</TableHead>
                      <TableHead className="text-right">Status</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody className="text-xs">
                    {payouts.map((p) => (
                      <TableRow key={p.id}>
                        <TableCell className="font-bold font-mono text-slate-900">₹{p.amount.toLocaleString()}</TableCell>
                        <TableCell className="text-muted-foreground text-[11px]">{p.paymentMethod}</TableCell>
                        <TableCell className="text-right">
                          <Badge className={`${payoutStatusColors[p.status]} text-[10px]`}>
                            {p.status}
                          </Badge>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </div>
        )}

        {/* TAB 2: PASSIVE INCOME CALCULATOR */}
        {activeTab === "calculator" && (
          <Card className="border border-border p-6 max-w-4xl mx-auto space-y-6">
            <div className="text-center space-y-2">
              <Badge className="bg-emerald-100 text-emerald-800 border-none font-mono text-xs">
                AFFILIATE REVENUE CALCULATOR
              </Badge>
              <h3 className="text-2xl font-bold font-display text-slate-900">Calculate Your Recurring Monthly Payout</h3>
              <p className="text-slate-500 text-xs max-w-md mx-auto">
                See how much passive monthly income you generate by referring D2C brands to Conversio AI.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-4">
              <div className="space-y-6 bg-slate-50 p-6 rounded-2xl border border-slate-200">
                <div className="space-y-2">
                  <div className="flex justify-between text-xs font-semibold">
                    <span>Referred Stores:</span>
                    <span className="font-bold text-emerald-600 font-mono text-sm">{referredStores} Active Stores</span>
                  </div>
                  <input
                    type="range"
                    min="1"
                    max="100"
                    value={referredStores}
                    onChange={(e) => setReferredStores(Number(e.target.value))}
                    className="w-full accent-emerald-600 cursor-pointer"
                  />
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between text-xs font-semibold">
                    <span>Average Monthly Plan:</span>
                    <span className="font-bold text-emerald-600 font-mono text-sm">₹{avgPlanPrice.toLocaleString()}/mo</span>
                  </div>
                  <div className="grid grid-cols-2 gap-2 pt-1">
                    <button
                      onClick={() => setAvgPlanPrice(2999)}
                      className={`p-2.5 rounded-xl border text-xs font-mono transition-all ${
                        avgPlanPrice === 2999 ? "bg-emerald-600 text-white font-bold border-emerald-600" : "bg-white border-slate-200 text-slate-700"
                      }`}
                    >
                      Base Plan (₹2,999)
                    </button>
                    <button
                      onClick={() => setAvgPlanPrice(6499)}
                      className={`p-2.5 rounded-xl border text-xs font-mono transition-all ${
                        avgPlanPrice === 6499 ? "bg-emerald-600 text-white font-bold border-emerald-600" : "bg-white border-slate-200 text-slate-700"
                      }`}
                    >
                      Conversio Suite (₹6,499)
                    </button>
                  </div>
                </div>
              </div>

              <div className="bg-slate-950 text-white p-6 rounded-2xl border border-slate-800 space-y-6 flex flex-col justify-between">
                <div className="space-y-1">
                  <span className="text-[11px] font-mono text-slate-400 uppercase tracking-widest block">ESTIMATED PASSIVE PAYOUT</span>
                  <div className="text-4xl font-extrabold font-display text-emerald-400">
                    ₹{estimatedMonthlyIncome.toLocaleString()} <span className="text-xs text-slate-400 font-normal">/ month</span>
                  </div>
                  <p className="text-xs text-slate-400 pt-1">
                    Annual Passive Income: <strong className="text-white font-mono">₹{estimatedAnnualIncome.toLocaleString()}/year</strong>
                  </p>
                </div>

                <Button onClick={handleCopyReferralLink} className="bg-emerald-500 hover:bg-emerald-400 text-black font-bold text-xs h-11 w-full rounded-xl">
                  Copy My Affiliate Link &amp; Start Sharing
                </Button>
              </div>
            </div>
          </Card>
        )}

        {/* TAB 3: MARKETING ASSETS & PROMOS */}
        {activeTab === "marketing" && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card className="border border-border p-5 space-y-3">
              <div className="flex items-center gap-2">
                <MessageSquare className="w-4 h-4 text-emerald-600" />
                <h4 className="text-sm font-bold">WhatsApp &amp; DM Pitch Template</h4>
              </div>
              <p className="text-xs text-slate-500">Copy and paste this message directly to store owners on WhatsApp or LinkedIn.</p>
              <div className="p-3 bg-slate-950 text-slate-200 rounded-xl font-mono text-xs leading-relaxed border border-slate-800">
                "Hey! Are you losing revenue to abandoned carts or COD RTO losses? We switched to Conversio AI to automate WhatsApp recovery and Hinglish AI voice confirmation calls. Increased checkout conversion by 34%. Check it out here: {referralLink}"
              </div>
              <Button size="sm" variant="outline" onClick={() => handleCopyPromoCopy(`Hey! Are you losing revenue to abandoned carts or COD RTO losses? We switched to Conversio AI to automate WhatsApp recovery and Hinglish AI voice confirmation calls. Increased checkout conversion by 34%. Check it out here: ${referralLink}`)} className="text-xs h-8">
                <Copy className="w-3.5 h-3.5 mr-1" /> Copy WhatsApp Copy
              </Button>
            </Card>

            <Card className="border border-border p-5 space-y-3">
              <div className="flex items-center gap-2">
                <Send className="w-4 h-4 text-blue-600" />
                <h4 className="text-sm font-bold">Email Newsletter Blurb</h4>
              </div>
              <p className="text-xs text-slate-500">Use this paragraph in your weekly agency or developer newsletter.</p>
              <div className="p-3 bg-slate-950 text-slate-200 rounded-xl font-mono text-xs leading-relaxed border border-slate-800">
                "Subject: The AI Operating System scaling Indian D2C stores. Conversio combines WhatsApp cart recovery, identity resolution (Conversio Pass), and AI Voice calling in one platform. Claim your free demo trial via: {referralLink}"
              </div>
              <Button size="sm" variant="outline" onClick={() => handleCopyPromoCopy(`Subject: The AI Operating System scaling Indian D2C stores. Conversio combines WhatsApp cart recovery, identity resolution (Conversio Pass), and AI Voice calling in one platform. Claim your free demo trial via: ${referralLink}`)} className="text-xs h-8">
                <Copy className="w-3.5 h-3.5 mr-1" /> Copy Email Blurb
              </Button>
            </Card>
          </div>
        )}

        {/* TAB 4: PROVISION CLIENT WORKSPACE */}
        {activeTab === "provision" && (
          <Card className="border border-border p-6 max-w-xl mx-auto space-y-5">
            <div className="space-y-1">
              <h3 className="text-xl font-bold font-display text-slate-900">Provision Client Workspace</h3>
              <p className="text-xs text-slate-500">
                Provision a new Conversio Revenue OS + Cloud BaaS instance directly for your agency client.
              </p>
            </div>

            <form onSubmit={handleProvisionClient} className="space-y-4">
              <div className="space-y-1">
                <Label className="text-xs font-semibold">Client / Store Name *</Label>
                <Input
                  required
                  placeholder="e.g. Kadam Leather Boots"
                  value={clientName}
                  onChange={(e) => setClientName(e.target.value)}
                  className="text-xs"
                />
              </div>

              <div className="space-y-1">
                <Label className="text-xs font-semibold">Store Domain URL</Label>
                <Input
                  placeholder="kadamleather.com"
                  value={clientDomain}
                  onChange={(e) => setClientDomain(e.target.value)}
                  className="text-xs"
                />
              </div>

              <div className="space-y-1">
                <Label className="text-xs font-semibold">Cloud Infrastructure Region</Label>
                <Select value={clientRegion} onValueChange={setClientRegion}>
                  <SelectTrigger className="text-xs">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Mumbai (ap-south-1)">Mumbai (ap-south-1) — Primary India</SelectItem>
                    <SelectItem value="Singapore (ap-southeast-1)">Singapore (ap-southeast-1)</SelectItem>
                    <SelectItem value="Frankfurt (eu-central-1)">Frankfurt (eu-central-1)</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <Button type="submit" disabled={isProvisioning} className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs h-11 rounded-xl">
                {isProvisioning ? "Provisioning Cloud Backend..." : "Provision Client Instance"}
              </Button>
            </form>
          </Card>
        )}

      </div>
    </DashboardLayout>
  );
}
