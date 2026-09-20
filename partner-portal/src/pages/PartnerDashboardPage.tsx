import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  TrendingUp,
  Wallet,
  Users,
  CheckCircle2,
  Share2,
  Copy,
  Check,
  HandCoins,
  ArrowUpRight,
  Globe,
  Building2,
  MessageSquare,
  Sparkles,
} from "lucide-react";
import { PartnerNavbar } from "../components/PartnerNavbar";
import { usePartnerAuth } from "../context/PartnerAuthContext";
import { partnerApi } from "../services/partnerApi";
import type { PartnerReferral, PartnerPayout } from "../types/partner.types";

export const PartnerDashboardPage: React.FC = () => {
  const { partner, refreshPartner } = usePartnerAuth();
  const [referrals, setReferrals] = useState<PartnerReferral[]>([]);
  const [payouts, setPayouts] = useState<PartnerPayout[]>([]);
  const [copiedLink, setCopiedLink] = useState(false);
  const [copiedPromo, setCopiedPromo] = useState(false);

  // Payout dialog
  const [showPayoutModal, setShowPayoutModal] = useState(false);
  const [payoutAmount, setPayoutAmount] = useState("25000");
  const [payoutMethod, setPayoutMethod] = useState("upi");
  const [payoutDetails, setPayoutDetails] = useState("partner@okhdfcbank");
  const [isRequesting, setIsRequesting] = useState(false);

  const referralLink = typeof window !== "undefined"
    ? `${window.location.origin}/signup?ref=${partner?.referralCode || "SCALEZIX25"}`
    : `https://conversio.ai/signup?ref=SCALEZIX25`;

  useEffect(() => {
    partnerApi.getDashboardData().then((data) => {
      setReferrals(data.referrals);
      setPayouts(data.payouts);
    });
  }, []);

  const handleCopyLink = () => {
    navigator.clipboard.writeText(referralLink);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2000);
  };

  const handleCopyPromo = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedPromo(true);
    setTimeout(() => setCopiedPromo(false), 2000);
  };

  const handleRequestPayout = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsRequesting(true);
    try {
      await partnerApi.requestPayout(Number(payoutAmount), payoutMethod, payoutDetails);
      await refreshPartner();
      const updated = await partnerApi.getDashboardData();
      setPayouts(updated.payouts);
      setShowPayoutModal(false);
    } finally {
      setIsRequesting(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col justify-between">
      <PartnerNavbar />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 flex-1 w-full">
        {/* Header Summary */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-slate-800 pb-6">
          <div>
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-0.5 rounded bg-amber-500/10 text-amber-400 border border-amber-500/20 text-[10px] uppercase font-mono font-bold">
                {partner?.tier?.toUpperCase()} PARTNER
              </span>
              <span className="px-2.5 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-[10px] uppercase font-mono font-bold">
                {partner?.commissionRate || 25}% RECURRING REVSHARE
              </span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight mt-2">
              {partner?.companyName || "Partner"} Control Center
            </h1>
            <p className="text-xs text-slate-400 mt-0.5">
              Live referral tracking, passive commission ledger, and marketing kit.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => setShowPayoutModal(true)}
              className="bg-emerald-500 hover:bg-emerald-400 text-black font-extrabold text-xs px-5 py-2.5 rounded-xl transition-all shadow-lg shadow-emerald-500/10 flex items-center gap-1.5"
            >
              <HandCoins className="w-4 h-4" /> Request Payout
            </button>
          </div>
        </div>

        {/* 4 Top KPI Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-slate-900 border border-slate-800 p-5 rounded-2xl space-y-2">
            <div className="flex justify-between items-center text-xs text-slate-400">
              <span>Total Earned</span>
              <TrendingUp className="w-4 h-4 text-emerald-400" />
            </div>
            <div className="text-2xl font-black text-white font-mono">
              ₹{(partner?.totalEarned || 0).toLocaleString()}
            </div>
            <div className="text-[11px] text-emerald-400 font-mono">+₹8,400 this month</div>
          </div>

          <div className="bg-slate-900 border border-slate-800 p-5 rounded-2xl space-y-2">
            <div className="flex justify-between items-center text-xs text-slate-400">
              <span>Available Unpaid Balance</span>
              <Wallet className="w-4 h-4 text-emerald-400" />
            </div>
            <div className="text-2xl font-black text-emerald-400 font-mono">
              ₹{(partner?.unpaidBalance || 0).toLocaleString()}
            </div>
            <div className="text-[11px] text-slate-500 font-mono">Ready for withdrawal</div>
          </div>

          <div className="bg-slate-900 border border-slate-800 p-5 rounded-2xl space-y-2">
            <div className="flex justify-between items-center text-xs text-slate-400">
              <span>Referred Clients</span>
              <Users className="w-4 h-4 text-teal-400" />
            </div>
            <div className="text-2xl font-black text-white font-mono">
              {partner?.totalReferrals || referrals.length}
            </div>
            <div className="text-[11px] text-teal-400 font-mono">{partner?.activeSubscriptions || 0} active stores</div>
          </div>

          <div className="bg-slate-900 border border-slate-800 p-5 rounded-2xl space-y-2">
            <div className="flex justify-between items-center text-xs text-slate-400">
              <span>Total Paid to Date</span>
              <CheckCircle2 className="w-4 h-4 text-blue-400" />
            </div>
            <div className="text-2xl font-black text-white font-mono">
              ₹{(partner?.totalPaid || 0).toLocaleString()}
            </div>
            <div className="text-[11px] text-slate-500 font-mono">Via Direct UPI & Bank</div>
          </div>
        </div>

        {/* Quick Referral Banner */}
        <div className="p-6 bg-gradient-to-r from-emerald-500/10 via-slate-900 to-slate-900 border border-emerald-500/30 rounded-3xl flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <Share2 className="w-4 h-4 text-emerald-400" />
              <h3 className="text-sm font-bold text-white">Your Affiliate Referral Tracking Link</h3>
            </div>
            <p className="text-xs text-slate-400">
              Share with D2C merchants or developers. Every signup generates {partner?.commissionRate || 25}% recurring lifetime revenue.
            </p>
          </div>

          <div className="flex items-center gap-3 w-full md:w-auto">
            <div className="bg-slate-950 border border-slate-800 px-4 py-2 rounded-xl text-xs font-mono text-slate-300 truncate max-w-xs">
              {referralLink}
            </div>
            <button
              onClick={handleCopyLink}
              className="bg-emerald-500 hover:bg-emerald-400 text-black text-xs font-bold px-4 py-2 rounded-xl transition-all flex items-center gap-1.5 shrink-0"
            >
              {copiedLink ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
              {copiedLink ? "Copied" : "Copy Link"}
            </button>
          </div>
        </div>

        {/* 2 Tables: Recent Referrals & Payouts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Referrals */}
          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 space-y-4">
            <div className="flex justify-between items-center">
              <div>
                <h3 className="text-base font-bold text-white">Referred Client Accounts</h3>
                <p className="text-xs text-slate-400">Live status of merchants registered via your link.</p>
              </div>
              <Link to="/commissions" className="text-xs text-emerald-400 hover:underline flex items-center gap-1">
                View Ledger <ArrowUpRight className="w-3 h-3" />
              </Link>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead>
                  <tr className="border-b border-slate-800 text-slate-500 font-mono uppercase text-[10px]">
                    <th className="pb-3">Client / Brand</th>
                    <th className="pb-3">Plan</th>
                    <th className="pb-3">Status</th>
                    <th className="pb-3 text-right">Commission</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/60">
                  {referrals.map((r) => (
                    <tr key={r.id} className="hover:bg-slate-800/30">
                      <td className="py-3">
                        <span className="font-bold text-white block">{r.clientName || r.referredEmail}</span>
                        <span className="text-[10px] text-slate-500">{new Date(r.createdAt).toLocaleDateString()}</span>
                      </td>
                      <td className="py-3 text-slate-400 font-mono text-[11px]">{r.planName || "Growth Suite"}</td>
                      <td className="py-3">
                        <span className={`px-2 py-0.5 rounded text-[10px] font-mono font-bold ${
                          r.status === "converted"
                            ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20"
                            : "bg-amber-500/10 text-amber-400 border border-amber-500/20"
                        }`}>
                          {r.status}
                        </span>
                      </td>
                      <td className="py-3 text-right font-mono font-bold text-emerald-400">
                        ₹{r.commissionAmount.toLocaleString()}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Payouts */}
          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 space-y-4">
            <div className="flex justify-between items-center">
              <div>
                <h3 className="text-base font-bold text-white">Payout History</h3>
                <p className="text-xs text-slate-400">Direct deposits to your bank account or UPI.</p>
              </div>
              <button
                onClick={() => setShowPayoutModal(true)}
                className="text-xs text-emerald-400 hover:underline flex items-center gap-1"
              >
                + New Request
              </button>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead>
                  <tr className="border-b border-slate-800 text-slate-500 font-mono uppercase text-[10px]">
                    <th className="pb-3">Amount</th>
                    <th className="pb-3">Method</th>
                    <th className="pb-3 text-right">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/60">
                  {payouts.map((p) => (
                    <tr key={p.id} className="hover:bg-slate-800/30">
                      <td className="py-3">
                        <span className="font-bold font-mono text-white block">₹{p.amount.toLocaleString()}</span>
                        <span className="text-[10px] text-slate-500">{new Date(p.createdAt).toLocaleDateString()}</span>
                      </td>
                      <td className="py-3 text-slate-400 font-mono text-[11px] truncate max-w-[140px]">
                        {p.paymentMethod}
                      </td>
                      <td className="py-3 text-right">
                        <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                          {p.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Marketing Kit Swipe Section */}
        <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 space-y-6">
          <div className="flex items-center gap-2">
            <MessageSquare className="w-5 h-5 text-emerald-400" />
            <h3 className="text-lg font-bold text-white">Affiliate Marketing Swipe Kit</h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-slate-950 p-5 rounded-2xl border border-slate-800 space-y-3">
              <span className="text-[10px] font-mono text-emerald-400 uppercase">WHATSAPP / LINKEDIN DM SWIPE</span>
              <p className="text-xs text-slate-300 font-mono leading-relaxed bg-slate-900 p-3 rounded-xl border border-slate-800">
                "Hey! Are you losing sales to abandoned carts and COD returns? We switched to Conversio to automate WhatsApp campaigns, broadcast templates, and Hinglish AI checkout calls. Try it out here: {referralLink}"
              </p>
              <button
                onClick={() => handleCopyPromo(`Hey! Are you losing sales to abandoned carts and COD returns? We switched to Conversio to automate WhatsApp campaigns, broadcast templates, and Hinglish AI checkout calls. Try it out here: ${referralLink}`)}
                className="text-xs bg-slate-800 hover:bg-slate-700 text-white font-bold px-4 py-2 rounded-xl transition-colors flex items-center gap-1.5"
              >
                <Copy className="w-3.5 h-3.5" /> Copy WhatsApp Swipe
              </button>
            </div>

            <div className="bg-slate-950 p-5 rounded-2xl border border-slate-800 space-y-3">
              <span className="text-[10px] font-mono text-teal-400 uppercase">AGENCY NEWSLETTER BLURB</span>
              <p className="text-xs text-slate-300 font-mono leading-relaxed bg-slate-900 p-3 rounded-xl border border-slate-800">
                "The WhatsApp Marketing & Automation Platform for High-Growth Indian D2C Brands. Conversio delivers 24-hr session windows, WhatsApp broadcast campaigns, and automated agent routing. Free demo: {referralLink}"
              </p>
              <button
                onClick={() => handleCopyPromo(`The WhatsApp Marketing & Automation Platform for High-Growth Indian D2C Brands. Conversio delivers 24-hr session windows, WhatsApp broadcast campaigns, and automated agent routing. Free demo: ${referralLink}`)}
                className="text-xs bg-slate-800 hover:bg-slate-700 text-white font-bold px-4 py-2 rounded-xl transition-colors flex items-center gap-1.5"
              >
                <Copy className="w-3.5 h-3.5" /> Copy Newsletter Blurb
              </button>
            </div>
          </div>
        </div>
      </main>

      {/* Payout Modal */}
      {showPayoutModal && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-800 rounded-3xl max-w-md w-full p-6 space-y-6">
            <div className="flex justify-between items-start">
              <div>
                <h3 className="text-lg font-bold text-white">Request Payout</h3>
                <p className="text-xs text-slate-400">Withdraw available commissions to UPI / Bank.</p>
              </div>
              <button onClick={() => setShowPayoutModal(false)} className="text-slate-500 hover:text-white font-mono">✕</button>
            </div>

            <form onSubmit={handleRequestPayout} className="space-y-4 text-xs">
              <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 flex justify-between items-center font-mono">
                <span className="text-slate-400">Available Balance:</span>
                <strong className="text-emerald-400 font-bold text-sm">
                  ₹{(partner?.unpaidBalance || 0).toLocaleString()}
                </strong>
              </div>

              <div>
                <label className="block text-slate-300 font-semibold mb-1">Payout Amount (INR) *</label>
                <input
                  required
                  type="number"
                  value={payoutAmount}
                  onChange={(e) => setPayoutAmount(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-white font-mono"
                />
              </div>

              <div>
                <label className="block text-slate-300 font-semibold mb-1">Transfer Method</label>
                <select
                  value={payoutMethod}
                  onChange={(e) => setPayoutMethod(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-white"
                >
                  <option value="upi">Instant UPI (VPA)</option>
                  <option value="bank_transfer">Bank Transfer (NEFT/IMPS)</option>
                </select>
              </div>

              <div>
                <label className="block text-slate-300 font-semibold mb-1">UPI ID / Bank Details *</label>
                <input
                  required
                  value={payoutDetails}
                  onChange={(e) => setPayoutDetails(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-white font-mono"
                />
              </div>

              <button
                type="submit"
                disabled={isRequesting}
                className="w-full bg-emerald-500 hover:bg-emerald-400 text-black font-extrabold py-3 rounded-xl transition-all"
              >
                {isRequesting ? "Submitting..." : "Confirm & Withdraw"}
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
