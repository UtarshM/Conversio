import React, { useState, useEffect } from "react";
import {
  Building2,
  Plus,
  Wallet,
  CheckCircle2,
  AlertCircle,
  Copy,
  ExternalLink,
  ShieldCheck,
  Search,
} from "lucide-react";
import { PartnerNavbar } from "../components/PartnerNavbar";
import { partnerApi } from "../services/partnerApi";
import type { SubWorkspace } from "../types/partner.types";

export const ClientWorkspacesPage: React.FC = () => {
  const [workspaces, setWorkspaces] = useState<SubWorkspace[]>([]);
  const [search, setSearch] = useState("");

  // Provision Modal
  const [showProvisionModal, setShowProvisionModal] = useState(false);
  const [name, setName] = useState("");
  const [adminName, setAdminName] = useState("");
  const [adminEmail, setAdminEmail] = useState("");
  const [plan, setPlan] = useState<"starter" | "growth" | "enterprise">("growth");
  const [initialBalance, setInitialBalance] = useState("2000");
  const [isProvisioning, setIsProvisioning] = useState(false);
  const [createdCreds, setCreatedCreds] = useState<any>(null);

  // Topup Modal
  const [showTopupModal, setShowTopupModal] = useState(false);
  const [selectedWsId, setSelectedWsId] = useState<string | null>(null);
  const [topupAmount, setTopupAmount] = useState("5000");
  const [isToppingUp, setIsToppingUp] = useState(false);

  const loadWorkspaces = async () => {
    const data = await partnerApi.getSubWorkspaces();
    setWorkspaces(data);
  };

  useEffect(() => {
    loadWorkspaces();
  }, []);

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsProvisioning(true);
    try {
      const res = await partnerApi.createSubWorkspace({
        name,
        adminName,
        adminEmail,
        plan,
        initialBalance: Number(initialBalance),
      });
      setCreatedCreds(res);
      await loadWorkspaces();
      setName("");
      setAdminName("");
      setAdminEmail("");
    } finally {
      setIsProvisioning(false);
    }
  };

  const handleTopup = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedWsId) return;
    setIsToppingUp(true);
    try {
      await partnerApi.topupSubWorkspace(selectedWsId, Number(topupAmount));
      await loadWorkspaces();
      setShowTopupModal(false);
    } finally {
      setIsToppingUp(false);
    }
  };

  const filtered = workspaces.filter(
    (w) =>
      w.name.toLowerCase().includes(search.toLowerCase()) ||
      w.adminEmail.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col justify-between">
      <PartnerNavbar />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 flex-1 w-full">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-slate-800 pb-6">
          <div>
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-[10px] uppercase font-mono font-bold">
                MULTI-TENANT AGENCY HUB
              </span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight mt-2">
              Client Accounts &amp; Sub-Workspaces
            </h1>
            <p className="text-xs text-slate-400 mt-0.5">
              Provision sandboxed WhatsApp instances, allocate messaging funds, and monitor live WABA numbers.
            </p>
          </div>

          <button
            onClick={() => { setCreatedCreds(null); setShowProvisionModal(true); }}
            className="bg-emerald-500 hover:bg-emerald-400 text-black font-extrabold text-xs px-5 py-2.5 rounded-xl transition-all shadow-lg shadow-emerald-500/10 flex items-center gap-1.5"
          >
            <Plus className="w-4 h-4" /> Provision Client Workspace
          </button>
        </div>

        {/* Filter bar */}
        <div className="flex items-center bg-slate-900 border border-slate-800 rounded-2xl px-4 py-2.5 max-w-md">
          <Search className="w-4 h-4 text-slate-500 mr-2" />
          <input
            placeholder="Search by client name or email..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="bg-transparent text-xs text-white placeholder-slate-500 w-full outline-none"
          />
        </div>

        {/* Workspaces Table */}
        <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="border-b border-slate-800 text-slate-500 font-mono uppercase text-[10px]">
                  <th className="pb-3">Client Workspace</th>
                  <th className="pb-3">Plan Tier</th>
                  <th className="pb-3">Admin Contact</th>
                  <th className="pb-3">WhatsApp Number</th>
                  <th className="pb-3">Wallet Credits</th>
                  <th className="pb-3 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60">
                {filtered.map((ws) => (
                  <tr key={ws.id} className="hover:bg-slate-800/30">
                    <td className="py-4">
                      <strong className="text-white text-sm block">{ws.name}</strong>
                      <span className="text-[10px] text-slate-500 font-mono">ID: {ws.id}</span>
                    </td>
                    <td className="py-4">
                      <span className="px-2.5 py-1 rounded-lg bg-slate-950 border border-slate-800 font-mono text-[11px] text-slate-300">
                        {ws.plan}
                      </span>
                    </td>
                    <td className="py-4">
                      <span className="text-slate-300 block">{ws.adminName}</span>
                      <span className="text-[11px] text-slate-500 font-mono">{ws.adminEmail}</span>
                    </td>
                    <td className="py-4">
                      <span className="text-emerald-400 font-mono flex items-center gap-1.5">
                        <CheckCircle2 className="w-3.5 h-3.5" /> {ws.phoneNumber || "+91 98000 12345"}
                      </span>
                    </td>
                    <td className="py-4 font-mono font-bold text-white">
                      ₹{ws.walletBalance.toLocaleString()}
                    </td>
                    <td className="py-4 text-right space-x-2">
                      <button
                        onClick={() => {
                          setSelectedWsId(ws.id);
                          setShowTopupModal(true);
                        }}
                        className="bg-slate-800 hover:bg-slate-700 text-white font-bold text-xs px-3 py-1.5 rounded-xl border border-slate-700 transition-colors inline-flex items-center gap-1"
                      >
                        <Wallet className="w-3 h-3" /> Add Credits
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </main>

      {/* Provision Modal */}
      {showProvisionModal && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-800 rounded-3xl max-w-lg w-full p-6 sm:p-8 space-y-6">
            <div className="flex justify-between items-start">
              <div>
                <h3 className="text-lg font-bold text-white">Provision Client Sub-Workspace</h3>
                <p className="text-xs text-slate-400">Instantly create a sandboxed instance with login credentials.</p>
              </div>
              <button onClick={() => setShowProvisionModal(false)} className="text-slate-500 hover:text-white font-mono">✕</button>
            </div>

            {createdCreds ? (
              <div className="p-6 bg-emerald-500/10 border border-emerald-500/20 rounded-2xl space-y-3">
                <div className="font-bold text-emerald-400 flex items-center gap-2 text-sm">
                  <CheckCircle2 className="w-4 h-4" /> Workspace Provisioned Successfully!
                </div>
                <div className="space-y-1.5 text-xs text-slate-300 font-mono pt-2">
                  <div><strong>Workspace:</strong> {createdCreds.workspace?.name}</div>
                  <div><strong>Admin Email:</strong> {createdCreds.workspace?.adminEmail}</div>
                  <div><strong>Temporary Password:</strong> {createdCreds.tempPassword}</div>
                </div>
                <button
                  onClick={() => setShowProvisionModal(false)}
                  className="w-full mt-4 bg-emerald-500 text-black font-bold text-xs py-2.5 rounded-xl"
                >
                  Done
                </button>
              </div>
            ) : (
              <form onSubmit={handleCreate} className="space-y-4 text-xs">
                <div>
                  <label className="block text-slate-300 font-semibold mb-1">Client Store / Company Name *</label>
                  <input
                    required
                    placeholder="e.g. Acme Apparel"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-white"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-slate-300 font-semibold mb-1">Admin Name *</label>
                    <input
                      required
                      placeholder="e.g. Ramesh Patel"
                      value={adminName}
                      onChange={(e) => setAdminName(e.target.value)}
                      className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-white"
                    />
                  </div>
                  <div>
                    <label className="block text-slate-300 font-semibold mb-1">Admin Email *</label>
                    <input
                      required
                      type="email"
                      placeholder="ramesh@acme.in"
                      value={adminEmail}
                      onChange={(e) => setAdminEmail(e.target.value)}
                      className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-white"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-slate-300 font-semibold mb-1">Assigned Plan</label>
                    <select
                      value={plan}
                      onChange={(e: any) => setPlan(e.target.value)}
                      className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-white"
                    >
                      <option value="starter">Starter Plan (₹2,999/mo)</option>
                      <option value="growth">Growth Suite (₹6,499/mo)</option>
                      <option value="enterprise">Enterprise Tier</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-slate-300 font-semibold mb-1">Initial Wallet Credit (INR)</label>
                    <input
                      type="number"
                      value={initialBalance}
                      onChange={(e) => setInitialBalance(e.target.value)}
                      className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-white font-mono"
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={isProvisioning}
                  className="w-full bg-emerald-500 hover:bg-emerald-400 text-black font-extrabold py-3 rounded-xl transition-all"
                >
                  {isProvisioning ? "Provisioning Cloud Backend..." : "Provision Client Account"}
                </button>
              </form>
            )}
          </div>
        </div>
      )}

      {/* Topup Modal */}
      {showTopupModal && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-800 rounded-3xl max-w-sm w-full p-6 space-y-6">
            <div className="flex justify-between items-start">
              <div>
                <h3 className="text-lg font-bold text-white">Allocate Wallet Funds</h3>
                <p className="text-xs text-slate-400">Credit messaging balance to this client.</p>
              </div>
              <button onClick={() => setShowTopupModal(false)} className="text-slate-500 hover:text-white font-mono">✕</button>
            </div>

            <form onSubmit={handleTopup} className="space-y-4 text-xs">
              <div>
                <label className="block text-slate-300 font-semibold mb-1">Top-up Amount (INR) *</label>
                <input
                  required
                  type="number"
                  value={topupAmount}
                  onChange={(e) => setTopupAmount(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-white font-mono"
                />
              </div>

              <button
                type="submit"
                disabled={isToppingUp}
                className="w-full bg-emerald-500 hover:bg-emerald-400 text-black font-extrabold py-3 rounded-xl transition-all"
              >
                {isToppingUp ? "Allocating Funds..." : "Confirm Credit"}
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
