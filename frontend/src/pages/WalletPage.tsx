import { DashboardLayout } from "@/components/DashboardLayout";
import { StatCard } from "@/components/StatCard";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  AlertTriangle,
  ArrowDownLeft,
  ArrowUpRight,
  Plus,
  Send,
  TrendingDown,
  Wallet as WalletIcon,
  CheckCircle2,
  FileText,
  CreditCard,
  Building2,
} from "lucide-react";
import { motion } from "framer-motion";
import { useMemo, useState } from "react";
import { useAppContext } from "@/context/AppContext";
import { toast } from "@/components/ui/use-toast";
import { useNavigate } from "react-router-dom";
import { calculateGSTBreakdown, initializeRazorpayCheckout } from "@/lib/billing/razorpayWallet";

export default function WalletPage() {
  const navigate = useNavigate();
  const [showAddMoney, setShowAddMoney] = useState(false);
  const [rechargeAmount, setRechargeAmount] = useState("5000");
  const [gstin, setGstin] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);

  const { walletBalance, totalSpent, messagesSent, transactions, addWalletFunds, lowBalanceThreshold } = useAppContext();

  const baseNum = Number(rechargeAmount) || 0;
  const gstBreakdown = useMemo(() => calculateGSTBreakdown(baseNum), [baseNum]);

  const handleRazorpayTopup = () => {
    if (baseNum < 500) {
      toast({ title: "Minimum Recharge ₹500", description: "Please enter ₹500 or more.", variant: "destructive" });
      return;
    }

    setIsProcessing(true);

    const orderData = {
      orderId: `order_conversio_${Date.now()}`,
      baseAmount: gstBreakdown.baseAmount,
      cgst: gstBreakdown.cgst,
      sgst: gstBreakdown.sgst,
      igst: gstBreakdown.igst,
      totalAmount: gstBreakdown.totalAmount,
      currency: "INR",
      gstin: gstin.trim() || undefined,
    };

    initializeRazorpayCheckout(
      orderData,
      async (paymentId) => {
        setIsProcessing(false);
        setShowAddMoney(false);
        await addWalletFunds(gstBreakdown.baseAmount);
        toast({
          title: "Wallet Recharged Successfully! 🎉",
          description: `Added ₹${gstBreakdown.baseAmount.toLocaleString()} credits. Razorpay Payment ID: ${paymentId}`,
        });
      },
      () => {
        setIsProcessing(false);
        toast({ title: "Recharge Cancelled", description: "Payment was not completed." });
      }
    );
  };

  return (
    <DashboardLayout>
      <div className="max-w-6xl mx-auto space-y-8 text-left">
        
        {/* HERO BANNER */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          className="rounded-[2rem] border border-slate-200 bg-white shadow-md overflow-hidden"
        >
          <div className="relative px-8 py-8 bg-gradient-to-r from-slate-50 via-white to-emerald-50/60">
            <div className="relative flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
              <div className="max-w-3xl">
                <div className="inline-flex items-center gap-2 rounded-full border border-emerald-200 bg-emerald-50 px-4 py-1.5 text-xs font-mono font-bold text-emerald-800 uppercase tracking-widest">
                  <WalletIcon className="h-4 w-4 text-emerald-600" />
                  FINANCE-SAFE PREPAID WALLET &amp; GST BILLING
                </div>
                <h1 className="mt-4 text-3xl font-display font-bold text-slate-900">
                  Prepaid WhatsApp Messaging Credits &amp; Ledger
                </h1>
                <p className="mt-3 text-slate-600 text-sm max-w-2xl leading-relaxed">
                  Top up credits via Razorpay, generate 18% GST tax invoices, and monitor per-message WhatsApp deductions in real time.
                </p>
              </div>

              <div className="flex items-center gap-3">
                <Button
                  onClick={() => setShowAddMoney(true)}
                  className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs h-11 px-6 rounded-xl shadow-sm flex items-center gap-2"
                >
                  <Plus className="w-4 h-4" /> Add Prepaid Credits
                </Button>
              </div>
            </div>
          </div>
        </motion.div>

        {/* LOW BALANCE ALERT */}
        {walletBalance <= lowBalanceThreshold && (
          <div className="flex items-start gap-3 rounded-2xl border border-amber-300 bg-amber-50 p-4 text-xs font-medium text-amber-900">
            <AlertTriangle className="h-5 w-5 text-amber-600 flex-shrink-0 mt-0.5" />
            <div>
              <p className="font-bold">Low Wallet Reserve Threshold</p>
              <p className="mt-0.5 text-amber-700">
                Your wallet balance is low (₹{walletBalance.toLocaleString()}). Top up via Razorpay to prevent outbound WhatsApp campaign pauses.
              </p>
            </div>
          </div>
        )}

        {/* STAT CARDS */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          <StatCard
            title="Available Credit Balance"
            value={`₹${walletBalance.toLocaleString()}`}
            icon={WalletIcon}
            trend={{ value: "Ready for broadcast dispatches", isPositive: true }}
          />
          <StatCard
            title="Total Spent"
            value={`₹${totalSpent.toLocaleString()}`}
            icon={TrendingDown}
            trend={{ value: "Meta conversation pricing pass-through", isPositive: true }}
          />
          <StatCard
            title="Total Messages Dispatched"
            value={messagesSent.toLocaleString()}
            icon={Send}
            trend={{ value: "99.4% delivery rate", isPositive: true }}
          />
        </div>

        {/* RECHARGE DIALOG WITH GST CALCULATOR */}
        <Dialog open={showAddMoney} onOpenChange={setShowAddMoney}>
          <DialogContent className="sm:max-w-[480px]">
            <DialogHeader>
              <DialogTitle className="text-xl font-bold">Add Prepaid Wallet Credits</DialogTitle>
              <DialogDescription className="text-xs text-slate-500">
                Recharge via Razorpay UPI, Cards, or NetBanking with GST 18% tax invoice.
              </DialogDescription>
            </DialogHeader>

            <div className="space-y-4 py-2 text-left">
              <div className="space-y-1">
                <Label className="text-xs font-semibold">Prepaid Credit Amount (₹)</Label>
                <div className="grid grid-cols-3 gap-2 pb-1">
                  {["2000", "5000", "10000"].map((preset) => (
                    <button
                      key={preset}
                      type="button"
                      onClick={() => setRechargeAmount(preset)}
                      className={`py-2 text-xs font-mono font-bold rounded-xl border transition-all ${
                        rechargeAmount === preset ? "bg-emerald-600 text-white border-emerald-600" : "bg-white border-slate-200 text-slate-700"
                      }`}
                    >
                      ₹{Number(preset).toLocaleString()}
                    </button>
                  ))}
                </div>
                <Input
                  type="number"
                  placeholder="e.g. 5000"
                  value={rechargeAmount}
                  onChange={(e) => setRechargeAmount(e.target.value)}
                  className="text-xs font-mono font-bold h-10"
                />
              </div>

              <div className="space-y-1">
                <Label className="text-xs font-semibold">Business GSTIN (Optional for Tax Credit)</Label>
                <Input
                  placeholder="27AAAAA0000A1Z5"
                  value={gstin}
                  onChange={(e) => setGstin(e.target.value)}
                  className="text-xs font-mono uppercase"
                />
              </div>

              {/* GST INVOICE BREAKDOWN BOX */}
              <div className="p-4 bg-slate-950 text-slate-200 rounded-2xl border border-slate-800 space-y-2 font-mono text-xs">
                <div className="flex justify-between text-slate-400">
                  <span>Prepaid Credits:</span>
                  <span>₹{gstBreakdown.baseAmount.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-slate-400">
                  <span>CGST (9%):</span>
                  <span>₹{gstBreakdown.cgst.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-slate-400">
                  <span>SGST (9%):</span>
                  <span>₹{gstBreakdown.sgst.toLocaleString()}</span>
                </div>
                <div className="border-t border-slate-800 pt-2 flex justify-between font-bold text-emerald-400 text-sm">
                  <span>Total Payable:</span>
                  <span>₹{gstBreakdown.totalAmount.toLocaleString()}</span>
                </div>
              </div>
            </div>

            <DialogFooter>
              <Button variant="outline" onClick={() => setShowAddMoney(false)} className="text-xs">
                Cancel
              </Button>
              <Button
                onClick={handleRazorpayTopup}
                disabled={isProcessing}
                className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs h-10 px-5 rounded-xl flex items-center gap-2"
              >
                <CreditCard className="w-4 h-4" />
                {isProcessing ? "Opening Razorpay..." : `Pay ₹${gstBreakdown.totalAmount.toLocaleString()} via Razorpay`}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        {/* TRANSACTIONS TABLE */}
        <div className="bg-white border border-slate-200 rounded-3xl p-6 shadow-xs space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-base font-bold font-display text-slate-900 flex items-center gap-2">
              <FileText className="w-4 h-4 text-emerald-600" /> Recent Wallet Ledger Transactions
            </h3>
          </div>

          <div className="divide-y divide-slate-100 text-xs">
            {transactions.map((t) => (
              <div key={t.id} className="py-3 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className={`w-8 h-8 rounded-xl flex items-center justify-center ${t.amount > 0 ? "bg-emerald-50 text-emerald-600" : "bg-slate-100 text-slate-600"}`}>
                    {t.amount > 0 ? <ArrowDownLeft className="w-4 h-4" /> : <ArrowUpRight className="w-4 h-4" />}
                  </div>
                  <div>
                    <p className="font-bold text-slate-900">{t.description}</p>
                    <p className="text-[11px] text-slate-400 font-mono">{t.createdAt}</p>
                  </div>
                </div>
                <span className={`font-mono font-bold ${t.amount > 0 ? "text-emerald-600" : "text-slate-800"}`}>
                  {t.amount > 0 ? `+₹${t.amount.toLocaleString()}` : `-₹${Math.abs(t.amount).toLocaleString()}`}
                </span>
              </div>
            ))}
          </div>
        </div>

      </div>
    </DashboardLayout>
  );
}
