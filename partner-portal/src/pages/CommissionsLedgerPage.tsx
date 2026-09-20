import React, { useState, useEffect } from "react";
import { Receipt, DollarSign, ArrowUpRight, CheckCircle2, TrendingUp } from "lucide-react";
import { PartnerNavbar } from "../components/PartnerNavbar";
import { partnerApi } from "../services/partnerApi";
import type { PartnerCommissionLedger } from "../types/partner.types";

export const CommissionsLedgerPage: React.FC = () => {
  const [commissions, setCommissions] = useState<PartnerCommissionLedger[]>([]);

  useEffect(() => {
    partnerApi.getDashboardData().then((d) => setCommissions(d.commissions));
  }, []);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col justify-between">
      <PartnerNavbar />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 flex-1 w-full">
        <div className="border-b border-slate-800 pb-6">
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-[10px] uppercase font-mono font-bold">
              FINANCIAL AUDIT LEDGER
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight mt-2">
            Commissions &amp; Revenue Share Ledger
          </h1>
          <p className="text-xs text-slate-400 mt-0.5">
            Transparent transaction-by-transaction breakdown of every referral top-up and subscription revenue share.
          </p>
        </div>

        <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="border-b border-slate-800 text-slate-500 font-mono uppercase text-[10px]">
                  <th className="pb-3">Transaction Time</th>
                  <th className="pb-3">Client Workspace</th>
                  <th className="pb-3">Revenue Type</th>
                  <th className="pb-3">Base Amount</th>
                  <th className="pb-3">Rate</th>
                  <th className="pb-3 text-right">Commission Earned</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60">
                {commissions.map((c) => (
                  <tr key={c.id} className="hover:bg-slate-800/30">
                    <td className="py-4 font-mono text-[11px] text-slate-400">
                      {new Date(c.createdAt).toLocaleString()}
                    </td>
                    <td className="py-4">
                      <strong className="text-white block">{c.workspaceName || c.workspaceId}</strong>
                      <span className="text-[10px] text-slate-500">{c.description}</span>
                    </td>
                    <td className="py-4">
                      <span className="px-2.5 py-0.5 rounded-full bg-slate-950 border border-slate-800 text-[10px] font-mono uppercase text-emerald-400">
                        {c.type}
                      </span>
                    </td>
                    <td className="py-4 font-mono text-slate-300">
                      ₹{c.baseAmount.toLocaleString()}
                    </td>
                    <td className="py-4 font-mono text-slate-400">
                      {c.commissionRate}%
                    </td>
                    <td className="py-4 text-right font-mono font-bold text-emerald-400 text-sm">
                      +₹{c.commissionEarned.toLocaleString()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </main>
    </div>
  );
};
