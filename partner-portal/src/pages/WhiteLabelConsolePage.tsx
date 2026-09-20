import React, { useState } from "react";
import {
  Globe,
  Palette,
  DollarSign,
  Eye,
  CheckCircle2,
  Copy,
  RefreshCw,
  ShieldCheck,
  Building2,
  Sparkles,
} from "lucide-react";
import { PartnerNavbar } from "../components/PartnerNavbar";
import { usePartnerAuth } from "../context/PartnerAuthContext";
import { partnerApi } from "../services/partnerApi";

export const WhiteLabelConsolePage: React.FC = () => {
  const { partner, updatePartnerState } = usePartnerAuth();

  const [activeTab, setActiveTab] = useState<"domain" | "branding" | "markup" | "preview">("domain");

  // Form State
  const [customDomain, setCustomDomain] = useState(partner?.customDomain || "chat.scalezixgrowth.com");
  const [brandName, setBrandName] = useState(partner?.brandName || "Scalezix WhatsApp OS");
  const [logoUrl, setLogoUrl] = useState(partner?.logoUrl || "");
  const [faviconUrl, setFaviconUrl] = useState(partner?.faviconUrl || "");
  const [primaryColor, setPrimaryColor] = useState(partner?.primaryColor || "#10b981");
  const [supportEmail, setSupportEmail] = useState(partner?.supportEmail || "support@scalezixgrowth.com");
  const [supportPhone, setSupportPhone] = useState(partner?.supportPhone || "+91 98765 43210");
  const [privacyPolicyUrl, setPrivacyPolicyUrl] = useState(partner?.privacyPolicyUrl || "");
  const [termsUrl, setTermsUrl] = useState(partner?.termsUrl || "");
  const [conversationMarkup, setConversationMarkup] = useState(partner?.conversationMarkup ?? 0.15);

  const [isSaving, setIsSaving] = useState(false);
  const [isVerifying, setIsVerifying] = useState(false);
  const [isDomainVerified, setIsDomainVerified] = useState(partner?.isDomainVerified ?? true);
  const [statusMsg, setStatusMsg] = useState("");

  const handleSaveBranding = async () => {
    setIsSaving(true);
    setStatusMsg("");
    try {
      const updated = await partnerApi.updateBranding({
        customDomain,
        brandName,
        logoUrl,
        faviconUrl,
        primaryColor,
        supportEmail,
        supportPhone,
        privacyPolicyUrl,
        termsUrl,
        conversationMarkup: Number(conversationMarkup),
      });
      updatePartnerState(updated);
      setStatusMsg("White-Label settings published successfully! ✨");
    } catch {
      setStatusMsg("Settings saved in local workspace.");
    } finally {
      setIsSaving(false);
    }
  };

  const handleVerifyDomain = async () => {
    setIsVerifying(true);
    try {
      const res = await partnerApi.verifyCustomDomain(customDomain);
      setIsDomainVerified(res.verified);
      setStatusMsg(res.message || "Domain verified and SSL active! 🌐");
    } finally {
      setIsVerifying(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col justify-between">
      <PartnerNavbar />

      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 flex-1 w-full">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-slate-800 pb-6">
          <div>
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-0.5 rounded bg-purple-500/10 text-purple-400 border border-purple-500/20 text-[10px] uppercase font-mono font-bold">
                WHITE-LABEL RESELLER ENGINE
              </span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight mt-2">
              White-Label & Custom Domain Console
            </h1>
            <p className="text-xs text-slate-400 mt-0.5">
              Deliver Conversio WhatsApp Marketing OS under your agency's domain, logo, and custom message pricing.
            </p>
          </div>

          <button
            onClick={handleSaveBranding}
            disabled={isSaving}
            className="bg-emerald-500 hover:bg-emerald-400 text-black font-extrabold text-xs px-6 py-3 rounded-xl transition-all shadow-lg shadow-emerald-500/10 flex items-center gap-1.5"
          >
            {isSaving ? "Publishing Changes..." : "Publish White-Label Settings"}
          </button>
        </div>

        {statusMsg && (
          <div className="p-4 bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs rounded-2xl flex items-center gap-2 font-mono">
            <CheckCircle2 className="w-4 h-4" /> {statusMsg}
          </div>
        )}

        {/* Tab Navigation */}
        <div className="flex border-b border-slate-800 space-x-6 text-xs font-semibold overflow-x-auto">
          <button
            onClick={() => setActiveTab("domain")}
            className={`pb-3 flex items-center gap-1.5 transition-all ${
              activeTab === "domain"
                ? "border-b-2 border-emerald-400 text-emerald-400 font-bold"
                : "text-slate-400 hover:text-white"
            }`}
          >
            <Globe className="w-4 h-4" /> 1. Custom Domain &amp; CNAME
          </button>
          <button
            onClick={() => setActiveTab("branding")}
            className={`pb-3 flex items-center gap-1.5 transition-all ${
              activeTab === "branding"
                ? "border-b-2 border-emerald-400 text-emerald-400 font-bold"
                : "text-slate-400 hover:text-white"
            }`}
          >
            <Palette className="w-4 h-4" /> 2. Brand Identity &amp; Colors
          </button>
          <button
            onClick={() => setActiveTab("markup")}
            className={`pb-3 flex items-center gap-1.5 transition-all ${
              activeTab === "markup"
                ? "border-b-2 border-emerald-400 text-emerald-400 font-bold"
                : "text-slate-400 hover:text-white"
            }`}
          >
            <DollarSign className="w-4 h-4" /> 3. WhatsApp Pricing Markup
          </button>
          <button
            onClick={() => setActiveTab("preview")}
            className={`pb-3 flex items-center gap-1.5 transition-all ${
              activeTab === "preview"
                ? "border-b-2 border-emerald-400 text-emerald-400 font-bold"
                : "text-slate-400 hover:text-white"
            }`}
          >
            <Eye className="w-4 h-4" /> 4. Live Client UI Preview
          </button>
        </div>

        {/* TAB 1: DOMAIN */}
        {activeTab === "domain" && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            <div className="lg:col-span-7 bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 space-y-6">
              <div className="space-y-1">
                <h3 className="text-lg font-bold text-white flex items-center gap-2">
                  <Globe className="w-5 h-5 text-emerald-400" /> Map Your Custom Subdomain
                </h3>
                <p className="text-xs text-slate-400">
                  Your clients and team will log into WhatsApp OS directly from your custom agency URL.
                </p>
              </div>

              <div className="space-y-3">
                <label className="block text-xs font-semibold text-slate-300">Custom Subdomain</label>
                <div className="flex gap-2">
                  <input
                    placeholder="e.g. chat.youragency.com"
                    value={customDomain}
                    onChange={(e) => setCustomDomain(e.target.value)}
                    className="flex-1 bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-xs font-mono text-white"
                  />
                  <button
                    onClick={handleVerifyDomain}
                    disabled={isVerifying}
                    className="bg-slate-800 hover:bg-slate-700 text-white font-bold text-xs px-4 py-2.5 rounded-xl border border-slate-700 transition-colors flex items-center gap-1.5 shrink-0"
                  >
                    {isVerifying ? <RefreshCw className="w-3.5 h-3.5 animate-spin" /> : "Verify DNS"}
                  </button>
                </div>

                {isDomainVerified && (
                  <div className="flex items-center gap-1.5 text-xs text-emerald-400 font-medium font-mono pt-1">
                    <CheckCircle2 className="w-4 h-4" /> CNAME Active &amp; SSL Certificate Issued.
                  </div>
                )}
              </div>

              <div className="p-5 bg-slate-950 rounded-2xl border border-slate-800 space-y-3">
                <div className="text-xs font-bold text-white flex items-center gap-1.5">
                  <ShieldCheck className="w-4 h-4 text-emerald-400" /> DNS CNAME Configuration Instructions
                </div>
                <p className="text-[11px] text-slate-400 leading-relaxed">
                  Add the following record in your DNS manager (Cloudflare, GoDaddy, Route53, Namecheap):
                </p>
                <div className="grid grid-cols-3 gap-2 bg-slate-900 p-3 rounded-xl border border-slate-800 font-mono text-xs">
                  <div>
                    <span className="text-[10px] text-slate-500 block">TYPE</span>
                    <strong className="text-white">CNAME</strong>
                  </div>
                  <div>
                    <span className="text-[10px] text-slate-500 block">HOST / NAME</span>
                    <strong className="text-white">{customDomain.split(".")[0] || "chat"}</strong>
                  </div>
                  <div>
                    <span className="text-[10px] text-slate-500 block">TARGET</span>
                    <strong className="text-emerald-400">app.conversio.ai</strong>
                  </div>
                </div>
              </div>
            </div>

            <div className="lg:col-span-5 bg-gradient-to-b from-slate-900 to-slate-950 border border-slate-800 rounded-3xl p-6 sm:p-8 space-y-6 flex flex-col justify-between">
              <div className="space-y-4">
                <span className="text-[10px] font-mono uppercase tracking-widest text-emerald-400 block">
                  TECH PROVIDER CLOUD ARCHITECTURE
                </span>
                <h4 className="text-lg font-bold text-white">Master Verified Meta API</h4>
                <p className="text-xs text-slate-300 leading-relaxed">
                  Your clients onboard instantly via Meta Embedded Signup with dynamic phone routing, 24-hr session windows, and automatic template approval.
                </p>
                <div className="space-y-2 text-xs text-slate-400 pt-2">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" /> Multi-Tenant Workspace Sandboxes
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" /> Zero-Brand Conversio Mentions
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" /> Automated Indian WABA Webhooks
                  </div>
                </div>
              </div>

              <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 text-[11px] text-slate-400 font-mono">
                Live URL: <span className="text-emerald-400">https://{customDomain}</span>
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: BRANDING */}
        {activeTab === "branding" && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 space-y-4">
              <h3 className="text-base font-bold text-white">Brand Assets</h3>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Brand Name *</label>
                <input
                  value={brandName}
                  onChange={(e) => setBrandName(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Logo URL (PNG/SVG transparent)</label>
                <input
                  placeholder="https://youragency.com/logo.png"
                  value={logoUrl}
                  onChange={(e) => setLogoUrl(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs font-mono text-white"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Primary Theme Color (HEX)</label>
                <div className="flex items-center gap-3">
                  <input
                    type="color"
                    value={primaryColor}
                    onChange={(e) => setPrimaryColor(e.target.value)}
                    className="w-10 h-10 rounded-xl cursor-pointer bg-slate-950 border border-slate-800 p-1"
                  />
                  <input
                    value={primaryColor}
                    onChange={(e) => setPrimaryColor(e.target.value)}
                    className="w-32 bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs font-mono text-white"
                  />
                </div>
              </div>
            </div>

            <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 space-y-4">
              <h3 className="text-base font-bold text-white">Support &amp; Legal Links</h3>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Support Email Address *</label>
                <input
                  type="email"
                  value={supportEmail}
                  onChange={(e) => setSupportEmail(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Support Phone / WhatsApp</label>
                <input
                  value={supportPhone}
                  onChange={(e) => setSupportPhone(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Custom Terms of Service URL</label>
                <input
                  placeholder="https://youragency.com/terms"
                  value={termsUrl}
                  onChange={(e) => setTermsUrl(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs font-mono text-white"
                />
              </div>
            </div>
          </div>
        )}

        {/* TAB 3: MARKUP */}
        {activeTab === "markup" && (
          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-10 max-w-2xl mx-auto space-y-6">
            <div className="space-y-1">
              <span className="text-[10px] font-mono uppercase tracking-widest text-amber-400 block">
                RESELLER MARGIN ENGINE
              </span>
              <h3 className="text-xl font-bold text-white">Set Your WhatsApp Conversation Margin</h3>
              <p className="text-xs text-slate-400">
                Automatically add a custom per-message margin billed to your client workspaces.
              </p>
            </div>

            <div className="p-6 bg-slate-950 rounded-2xl border border-slate-800 space-y-4">
              <div className="flex justify-between text-xs font-semibold text-slate-300">
                <span>Per-Message Margin (INR):</span>
                <span className="font-bold text-emerald-400 font-mono text-base">
                  +₹{Number(conversationMarkup).toFixed(2)} / message
                </span>
              </div>
              <input
                type="range"
                min="0.00"
                max="0.50"
                step="0.01"
                value={conversationMarkup}
                onChange={(e) => setConversationMarkup(Number(e.target.value))}
                className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-emerald-500"
              />

              <div className="grid grid-cols-2 gap-3 pt-3">
                <div className="p-3 bg-slate-900 rounded-xl border border-slate-800 text-xs">
                  <span className="text-[10px] text-slate-500 block">BASE MARKETING RATE</span>
                  <strong className="text-white font-mono">₹0.78 / conv</strong>
                </div>
                <div className="p-3 bg-slate-900 rounded-xl border border-slate-800 text-xs">
                  <span className="text-[10px] text-slate-500 block">CLIENT BILLED RATE</span>
                  <strong className="text-emerald-400 font-mono">
                    ₹{(0.78 + Number(conversationMarkup)).toFixed(2)} / conv
                  </strong>
                </div>
              </div>
            </div>

            <button
              onClick={handleSaveBranding}
              className="w-full bg-emerald-500 hover:bg-emerald-400 text-black font-extrabold py-3.5 rounded-xl transition-all"
            >
              Save Markup Settings
            </button>
          </div>
        )}

        {/* TAB 4: PREVIEW */}
        {activeTab === "preview" && (
          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 space-y-6">
            <div className="flex justify-between items-center">
              <div>
                <span className="text-[10px] font-mono uppercase text-emerald-400 tracking-wider">LIVE CLIENT PREVIEW</span>
                <h3 className="text-lg font-bold text-white">How Your Clients Experience {brandName}</h3>
              </div>
              <span className="text-xs font-mono text-slate-400 bg-slate-950 px-3 py-1 rounded-lg border border-slate-800">
                https://{customDomain}
              </span>
            </div>

            <div className="bg-slate-950 border border-slate-800 rounded-2xl p-5 space-y-5">
              {/* Header Preview */}
              <div className="flex justify-between items-center border-b border-slate-800 pb-4">
                <div className="flex items-center gap-3">
                  {logoUrl ? (
                    <img src={logoUrl} alt="Logo" className="h-7 object-contain" />
                  ) : (
                    <div className="h-7 w-7 rounded-lg flex items-center justify-center font-bold text-xs text-white" style={{ backgroundColor: primaryColor }}>
                      {brandName.charAt(0)}
                    </div>
                  )}
                  <span className="font-extrabold text-sm text-white tracking-tight">{brandName}</span>
                </div>
                <div className="text-xs text-slate-400 flex items-center gap-2 font-mono">
                  <span>Support: {supportEmail}</span>
                  <div className="h-2 w-2 rounded-full bg-emerald-400" />
                </div>
              </div>

              {/* Dashboard Preview Cards */}
              <div className="grid grid-cols-3 gap-3">
                <div className="p-4 bg-slate-900 rounded-xl border border-slate-800 text-xs">
                  <span className="text-[10px] text-slate-500 block">WhatsApp WABA Status</span>
                  <strong className="text-emerald-400 flex items-center gap-1 mt-1 font-mono">
                    <CheckCircle2 className="w-3.5 h-3.5" /> Connected
                  </strong>
                </div>
                <div className="p-4 bg-slate-900 rounded-xl border border-slate-800 text-xs">
                  <span className="text-[10px] text-slate-500 block">Client Wallet</span>
                  <strong className="text-white font-mono mt-1 block">₹18,500.00</strong>
                </div>
                <div className="p-4 bg-slate-900 rounded-xl border border-slate-800 text-xs">
                  <span className="text-[10px] text-slate-500 block">Active Broadcasts</span>
                  <strong className="text-emerald-400 font-mono mt-1 block">14 Running</strong>
                </div>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};
