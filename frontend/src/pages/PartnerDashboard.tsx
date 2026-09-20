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
  const { data: dashboardData } = usePartnerDashboardQuery();
  const { data: subWorkspaces = [] } = usePartnerSubWorkspacesQuery();
  
  const requestPayoutMutation = useRequestPayoutMutation();
  const createSubWorkspaceMutation = useCreateSubWorkspaceMutation();
  const topupSubWorkspaceMutation = useTopupSubWorkspaceMutation();

  const [activeTab, setActiveTab] = useState<"overview" | "workspaces" | "calculator" | "marketing">("overview");
  const [showPayoutDialog, setShowPayoutDialog] = useState(false);
  const [payoutAmount, setPayoutAmount] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("upi");
  const [accountDetails, setAccountDetails] = useState("partner@okhdfcbank");
  const [copiedLink, setCopiedLink] = useState(false);
  const [copiedPromo, setCopiedPromo] = useState(false);

  const [referredStores, setReferredStores] = useState(25);
  const [avgPlanPrice, setAvgPlanPrice] = useState(6499);
  const commissionRate = 0.25;
  const estimatedMonthlyIncome = Math.round(referredStores * avgPlanPrice * commissionRate);
  const estimatedAnnualIncome = estimatedMonthlyIncome * 12;

  const [clientName, setClientName] = useState("");
  const [adminName, setAdminName] = useState("");
  const [adminEmail, setAdminEmail] = useState("");
  const [clientPlan, setClientPlan] = useState<"starter" | "growth" | "enterprise">("growth");
  const [showProvisionDialog, setShowProvisionDialog] = useState(false);
  const [provisionedCreds, setProvisionedCreds] = useState<any>(null);

  const [selectedSubWorkspaceId, setSelectedSubWorkspaceId] = useState<string | null>(null);
  const [topupAmount, setTopupAmount] = useState("5000");
  const [showTopupDialog, setShowTopupDialog] = useState(false);

  const partner = dashboardData?.partner || {
    companyName: "Scalezix Agency",
    tier: "gold" as PartnerTier,
    referralCode: "SCALEZIX2026",
    commissionRate: 25.0,
    unpaidBalance: 42500,
    totalEarned: 184200,
    totalPaid: 141700,
    totalReferrals: 18,
    activeSubscriptions: 14,
  };

  const referrals = dashboardData?.referrals ?? [];
  const payouts = dashboardData?.payouts ?? [];

  const referralLink = typeof window !== "undefined"
    ? `${window.location.origin}/signup?ref=${partner.referralCode || "SCALE"}`
    : `https://conversio.ai/signup?ref=${partner.referralCode || "SCALE"}`;

  const handleCopyReferralLink = () => {
    navigator.clipboard.writeText(referralLink);
    setCopiedLink(true);
    toast({ title: "Link Copied! 🔗", description: "Referral link copied to clipboard" });
    setTimeout(() => setCopiedLink(false), 2000);
  };

  const handleCopyPromoCopy = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedPromo(true);
    toast({ title: "Promo Copy Saved! 🚀", description: "Copy pasted to clipboard." });
    setTimeout(() => setCopiedPromo(false), 2000);
  };

  const handleRequestPayout = async () => {
    const amount = Number(payoutAmount);
    try {
      await requestPayoutMutation.mutateAsync({
        amount,
        paymentMethod,
        paymentDetails: { details: accountDetails },
      });
      setShowPayoutDialog(false);
      setPayoutAmount("");
      toast({ title: "Payout Requested! 💸", description: "Your payout request has been sent for immediate processing." });
    } catch (e: any) {
      toast({ title: "Payout Request Failed", description: e?.message || "Failed to request payout", variant: "destructive" });
    }
  };

  const handleCreateSubWorkspace = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await createSubWorkspaceMutation.mutateAsync({
        name: clientName,
        adminName,
        adminEmail,
        plan: clientPlan,
      });
      setProvisionedCreds(res);
      setClientName("");
      setAdminName("");
      setAdminEmail("");
      toast({ title: "Client Workspace Created! 🎉", description: `Sub-workspace ${res.workspace?.name} is ready.` });
    } catch (e: any) {
      toast({ title: "Failed to create workspace", description: e?.message || "Error creating workspace", variant: "destructive" });
    }
  };

  const handleTopupSubWorkspace = async () => {
    if (!selectedSubWorkspaceId) return;
    try {
      await topupSubWorkspaceMutation.mutateAsync({
        subWorkspaceId: selectedSubWorkspaceId,
        amount: Number(topupAmount),
        description: "Agency Wallet Top-up",
      });
      setShowTopupDialog(false);
      toast({ title: "Wallet Credited! 💳", description: `Added ₹${Number(topupAmount).toLocaleString()} to client workspace.` });
    } catch (e: any) {
      toast({ title: "Top-up Failed", description: e?.message || "Error adding funds", variant: "destructive" });
    }
  };

  return (
    <DashboardLayout>
      <div className="space-y-8 text-left max-w-7xl mx-auto p-4">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 border-b border-border pb-6">
          <div>
            <div className="flex items-center gap-2">
              <Badge className={`${tierColors[partner.tier || "gold"]} font-mono text-[10px] uppercase border px-3 py-1`}>
                <Award className="w-3 h-3 mr-1 inline" /> {tierLabels[partner.tier || "gold"]}
              </Badge>
              <Badge variant="outline" className="font-mono text-[10px] uppercase text-emerald-600 bg-emerald-50 border-emerald-200">
                {partner.commissionRate}% RECURRING REVENUE SHARE
              </Badge>
            </div>
            <h1 className="text-3xl font-extrabold font-display tracking-tight text-foreground mt-2">
              {partner.companyName} Control Center
            </h1>
          </div>
          <Button onClick={() => setShowPayoutDialog(true)} className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs h-10 px-5 rounded-xl shadow-sm">
            <HandCoins className="w-4 h-4 mr-1.5" /> Request Payout
          </Button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <StatCard title="Total Earned" value={`₹${(partner.totalEarned || 0).toLocaleString()}`} icon={TrendingUp} variant="emerald" />
          <StatCard title="Available Balance" value={`₹${(partner.unpaidBalance || 0).toLocaleString()}`} icon={Wallet} variant="default" />
          <StatCard title="Total Referrals" value={String(partner.totalReferrals || 0)} icon={Users} variant="sky" />
          <StatCard title="Total Paid" value={`₹${(partner.totalPaid || 0).toLocaleString()}`} icon={CheckCircle2} variant="indigo" />
        </div>

        <div className="flex border-b border-border space-x-6 overflow-x-auto text-xs font-semibold">
          <button onClick={() => setActiveTab("overview")} className={`pb-3 flex items-center gap-1.5 ${activeTab === "overview" ? "border-b-2 border-emerald-600 text-emerald-600 font-bold" : "text-muted-foreground"}`}>
            <Sparkles className="w-4 h-4" /> Overview
          </button>
          <button onClick={() => setActiveTab("workspaces")} className={`pb-3 flex items-center gap-1.5 ${activeTab === "workspaces" ? "border-b-2 border-emerald-600 text-emerald-600 font-bold" : "text-muted-foreground"}`}>
            <Building2 className="w-4 h-4" /> Client Accounts
          </button>
          <button onClick={() => setActiveTab("calculator")} className={`pb-3 flex items-center gap-1.5 ${activeTab === "calculator" ? "border-b-2 border-emerald-600 text-emerald-600 font-bold" : "text-muted-foreground"}`}>
            <Calculator className="w-4 h-4" /> Calculator
          </button>
          <button onClick={() => setActiveTab("marketing")} className={`pb-3 flex items-center gap-1.5 ${activeTab === "marketing" ? "border-b-2 border-emerald-600 text-emerald-600 font-bold" : "text-muted-foreground"}`}>
            <MessageSquare className="w-4 h-4" /> Marketing Kit
          </button>
        </div>

        {activeTab === "overview" && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card className="border border-border">
              <CardHeader><CardTitle className="text-base">Recent Referrals</CardTitle></CardHeader>
              <CardContent>
                <Table>
                  <TableBody>
                    {referrals.map((r: any) => (
                      <TableRow key={r.id}>
                        <TableCell>{r.referredEmail}</TableCell>
                        <TableCell><Badge className={`${referralStatusColors[r.status]}`}>{r.status}</Badge></TableCell>
                        <TableCell className="text-right font-bold text-emerald-600">₹{r.commissionAmount}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
            <Card className="border border-border">
              <CardHeader><CardTitle className="text-base">Payout History</CardTitle></CardHeader>
              <CardContent>
                <Table>
                  <TableBody>
                    {payouts.map((p: any) => (
                      <TableRow key={p.id}>
                        <TableCell>₹{p.amount}</TableCell>
                        <TableCell>{p.status}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </div>
        )}

        {activeTab === "workspaces" && (
          <div className="space-y-6">
            <Button onClick={() => setShowProvisionDialog(true)} className="bg-emerald-600 text-white"><Plus className="w-4 h-4 mr-1"/> Provision Client</Button>
            <Card>
              <Table>
                <TableBody>
                  {subWorkspaces.map((ws: any) => (
                    <TableRow key={ws.id}>
                      <TableCell>{ws.name}</TableCell>
                      <TableCell><Button size="sm" onClick={() => { setSelectedSubWorkspaceId(ws.id); setShowTopupDialog(true); }}>Add Credits</Button></TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Card>
          </div>
        )}

        {activeTab === "calculator" && (
          <Card className="p-6 max-w-xl mx-auto space-y-4">
            <h3 className="text-xl font-bold">Earnings Calculator</h3>
            <p className="text-2xl font-bold text-emerald-600">₹{estimatedMonthlyIncome.toLocaleString()} / mo</p>
            <Button onClick={handleCopyReferralLink} className="w-full">Copy Referral Link</Button>
          </Card>
        )}

        {activeTab === "marketing" && (
          <div className="grid gap-6">
            <Card className="p-5">
              <h4 className="font-bold">Pitch Template</h4>
              <p className="text-xs text-muted-foreground my-2">"Scale your sales with Conversio AI... {referralLink}"</p>
              <Button size="sm" variant="outline" onClick={() => handleCopyPromoCopy(`...${referralLink}`)}>Copy</Button>
            </Card>
          </div>
        )}

        <Dialog open={showPayoutDialog} onOpenChange={setShowPayoutDialog}>
          <DialogContent>
            <DialogHeader><DialogTitle>Request Payout</DialogTitle></DialogHeader>
            <Input type="number" value={payoutAmount} onChange={(e) => setPayoutAmount(e.target.value)} placeholder="Amount" />
            <Button onClick={handleRequestPayout}>Confirm</Button>
          </DialogContent>
        </Dialog>

        <Dialog open={showProvisionDialog} onOpenChange={setShowProvisionDialog}>
          <DialogContent>
            <DialogHeader><DialogTitle>Provision Client</DialogTitle></DialogHeader>
            <form onSubmit={handleCreateSubWorkspace} className="space-y-4">
              <Input placeholder="Client Name" value={clientName} onChange={(e) => setClientName(e.target.value)} />
              <Input placeholder="Admin Name" value={adminName} onChange={(e) => setAdminName(e.target.value)} />
              <Input placeholder="Admin Email" value={adminEmail} onChange={(e) => setAdminEmail(e.target.value)} />
              <Button type="submit">Create</Button>
            </form>
          </DialogContent>
        </Dialog>

        <Dialog open={showTopupDialog} onOpenChange={setShowTopupDialog}>
          <DialogContent>
            <DialogHeader><DialogTitle>Add Credits</DialogTitle></DialogHeader>
            <Input type="number" value={topupAmount} onChange={(e) => setTopupAmount(e.target.value)} />
            <Button onClick={handleTopupSubWorkspace}>Confirm</Button>
          </DialogContent>
        </Dialog>
      </div>
    </DashboardLayout>
  );
}
