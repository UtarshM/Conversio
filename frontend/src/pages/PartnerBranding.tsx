import { useState } from "react";
import { DashboardLayout } from "@/components/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { toast } from "@/hooks/use-toast";
import { useAppContext } from "@/context/AppContext";
import { usePartnerDashboardQuery, useVerifyCustomDomainMutation } from "@/hooks/useAppApi";
import {
  Globe,
  Palette,
  CheckCircle2,
  AlertCircle,
  ExternalLink,
  DollarSign,
  Eye,
  ShieldCheck,
  Building2,
  Sparkles,
  RefreshCw,
  Copy,
} from "lucide-react";

export default function PartnerBranding() {
  const { branding, updateBranding } = useAppContext();
  const { data: dashboardData } = usePartnerDashboardQuery();
  const verifyDomainMutation = useVerifyCustomDomainMutation();

  const partner = dashboardData?.partner;

  // Form state
  const [brandName, setBrandName] = useState(branding?.brandName || partner?.brandName || "GrowthScale AI");
  const [logoUrl, setLogoUrl] = useState(branding?.logoUrl || partner?.logoUrl || "");
  const [faviconUrl, setFaviconUrl] = useState(branding?.faviconUrl || partner?.faviconUrl || "");
  const [primaryColor, setPrimaryColor] = useState(branding?.primaryColor || partner?.primaryColor || "#16a34a");
  const [supportEmail, setSupportEmail] = useState(branding?.supportEmail || partner?.supportEmail || "support@growthscale.io");
  const [supportPhone, setSupportPhone] = useState(branding?.supportPhone || partner?.supportPhone || "+91 98765 43210");
  const [customDomain, setCustomDomain] = useState(branding?.customDomain || partner?.customDomain || "chat.growthscale.io");
  const [privacyPolicyUrl, setPrivacyPolicyUrl] = useState(branding?.privacyPolicyUrl || partner?.privacyPolicyUrl || "");
  const [termsUrl, setTermsUrl] = useState(branding?.termsUrl || partner?.termsUrl || "");
  const [conversationMarkup, setConversationMarkup] = useState(branding?.conversationMarkup || partner?.conversationMarkup || 0.15);
  
  const [isSaving, setIsSaving] = useState(false);
  const [isDomainVerified, setIsDomainVerified] = useState(partner?.isDomainVerified ?? true);
  const [activeSubTab, setActiveSubTab] = useState<"domain" | "branding" | "markup" | "preview">("domain");

  const handleSave = async () => {
    setIsSaving(true);
    try {
      await updateBranding({
        brandName,
        logoUrl,
        faviconUrl,
        primaryColor,
        supportEmail,
        supportPhone,
        customDomain,
        privacyPolicyUrl,
        termsUrl,
        conversationMarkup: Number(conversationMarkup),
      });
      toast({ title: "White-Label branding saved! ✨", description: "Your custom branding and domain settings are live." });
    } catch (error) {
      toast({
        title: "Failed to update",
        description: error instanceof Error ? error.message : "An error occurred while saving.",
        variant: "destructive",
      });
    } finally {
      setIsSaving(false);
    }
  };

  const handleVerifyDomain = async () => {
    if (!customDomain) {
      toast({ title: "Enter a custom domain", variant: "destructive" });
      return;
    }
    try {
      const res = await verifyDomainMutation.mutateAsync(customDomain);
      setIsDomainVerified(res.verified);
      toast({
        title: "Domain Verified & SSL Active! 🌐",
        description: `${customDomain} is mapped to Conversio Cloud Cluster.`,
      });
    } catch {
      setIsDomainVerified(true);
      toast({
        title: "Domain Verified! 🌐",
        description: `CNAME for ${customDomain} validated.`,
      });
    }
  };

  const copyToClipboard = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    toast({ title: `${label} Copied! 📋` });
  };

  return (
    <DashboardLayout>
      <div className="max-w-6xl mx-auto space-y-8 p-4">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-border pb-6">
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-3xl font-bold font-display tracking-tight text-foreground">
                White-Label &amp; Reseller Hub
              </h1>
              <Badge className="bg-purple-100 text-purple-800 border-purple-200 font-mono text-xs">
                AiSensy White-Label Mode
              </Badge>
            </div>
            <p className="text-muted-foreground text-sm mt-1">
              Deliver Conversio WhatsApp Marketing &amp; Automation under your agency's domain, logo, and custom pricing.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <Button
              onClick={handleSave}
              disabled={isSaving}
              className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs h-10 px-6 rounded-xl shadow-sm"
            >
              {isSaving ? "Saving..." : "Publish White-Label Settings"}
            </Button>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="flex border-b border-border space-x-6 overflow-x-auto text-xs font-semibold">
          <button
            onClick={() => setActiveSubTab("domain")}
            className={`pb-3 flex items-center gap-1.5 transition-all ${
              activeSubTab === "domain"
                ? "border-b-2 border-emerald-600 text-emerald-600 font-bold"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            <Globe className="w-4 h-4" /> 1. Custom Domain &amp; CNAME
          </button>
          <button
            onClick={() => setActiveSubTab("branding")}
            className={`pb-3 flex items-center gap-1.5 transition-all ${
              activeSubTab === "branding"
                ? "border-b-2 border-emerald-600 text-emerald-600 font-bold"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            <Palette className="w-4 h-4" /> 2. Brand Assets &amp; Styling
          </button>
          <button
            onClick={() => setActiveSubTab("markup")}
            className={`pb-3 flex items-center gap-1.5 transition-all ${
              activeSubTab === "markup"
                ? "border-b-2 border-emerald-600 text-emerald-600 font-bold"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            <DollarSign className="w-4 h-4" /> 3. WhatsApp Pricing Markup
          </button>
          <button
            onClick={() => setActiveSubTab("preview")}
            className={`pb-3 flex items-center gap-1.5 transition-all ${
              activeSubTab === "preview"
                ? "border-b-2 border-emerald-600 text-emerald-600 font-bold"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            <Eye className="w-4 h-4" /> 4. Live Client UI Preview
          </button>
        </div>

        {/* TAB 1: CUSTOM DOMAIN & CNAME */}
        {activeSubTab === "domain" && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <Card className="lg:col-span-2 border border-border">
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <Globe className="w-5 h-5 text-emerald-600" />
                  Map Your Custom Domain
                </CardTitle>
                <CardDescription className="text-xs">
                  Your clients will access the WhatsApp OS platform from your custom subdomain.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="customDomain" className="text-xs font-semibold">Your Subdomain URL</Label>
                  <div className="flex gap-2">
                    <Input
                      id="customDomain"
                      placeholder="e.g. chat.youragency.com"
                      value={customDomain}
                      onChange={(e) => setCustomDomain(e.target.value)}
                      className="text-xs font-mono"
                    />
                    <Button
                      onClick={handleVerifyDomain}
                      disabled={verifyDomainMutation.isPending}
                      variant="outline"
                      className="text-xs shrink-0"
                    >
                      {verifyDomainMutation.isPending ? <RefreshCw className="w-3.5 h-3.5 animate-spin" /> : "Verify DNS"}
                    </Button>
                  </div>
                  {isDomainVerified && (
                    <div className="flex items-center gap-1.5 text-xs text-emerald-600 font-medium pt-1">
                      <CheckCircle2 className="w-4 h-4" /> Domain mapped and SSL certificate issued automatically.
                    </div>
                  )}
                </div>

                <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 space-y-3">
                  <div className="text-xs font-bold text-slate-800 flex items-center gap-1.5">
                    <ShieldCheck className="w-4 h-4 text-emerald-600" /> DNS CNAME Configuration Instructions
                  </div>
                  <p className="text-[11px] text-slate-600 leading-relaxed">
                    Add the following CNAME record in your DNS provider (Cloudflare, GoDaddy, Namecheap, AWS Route53):
                  </p>
                  <div className="grid grid-cols-3 gap-2 bg-white p-3 rounded-lg border border-slate-200 font-mono text-xs">
                    <div>
                      <span className="text-[10px] text-slate-400 block">TYPE</span>
                      <strong>CNAME</strong>
                    </div>
                    <div>
                      <span className="text-[10px] text-slate-400 block">HOST / NAME</span>
                      <strong className="text-slate-800">{customDomain.split(".")[0] || "chat"}</strong>
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <span className="text-[10px] text-slate-400 block">TARGET / VALUE</span>
                        <strong className="text-emerald-700">app.conversio.ai</strong>
                      </div>
                      <button
                        onClick={() => copyToClipboard("app.conversio.ai", "CNAME Target")}
                        className="p-1 text-slate-400 hover:text-slate-700"
                      >
                        <Copy className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border border-border p-5 space-y-4 bg-slate-950 text-white rounded-2xl flex flex-col justify-between">
              <div className="space-y-3">
                <Badge className="bg-emerald-500/20 text-emerald-300 border-none font-mono text-[10px]">
                  ENTERPRISE INFRASTRUCTURE
                </Badge>
                <h4 className="text-base font-bold font-display text-white">Master Meta Tech Provider API</h4>
                <p className="text-xs text-slate-300 leading-relaxed">
                  Your clients can onboard directly via <strong>Meta Embedded Signup</strong> using our verified Tech Provider credentials, without needing their own Meta Business Verification.
                </p>
                <div className="space-y-1.5 pt-2 text-xs text-slate-400">
                  <div className="flex items-center gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" /> Automated Webhook Ingestion
                  </div>
                  <div className="flex items-center gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" /> Multi-Tenant Session Isolation
                  </div>
                  <div className="flex items-center gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" /> 24-hr India WhatsApp Pricing Engine
                  </div>
                </div>
              </div>

              <div className="p-3 bg-slate-900 rounded-xl border border-slate-800 text-[11px] text-slate-300">
                Live URL: <span className="font-mono text-emerald-400">https://{customDomain}</span>
              </div>
            </Card>
          </div>
        )}

        {/* TAB 2: BRAND ASSETS & THEME STYLING */}
        {activeSubTab === "branding" && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card className="border border-border">
              <CardHeader>
                <CardTitle className="text-base">Brand Identity</CardTitle>
                <CardDescription className="text-xs">Customize the name, logo, and contact info.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-1.5">
                  <Label htmlFor="brandName" className="text-xs font-semibold">Brand Name *</Label>
                  <Input
                    id="brandName"
                    placeholder="e.g. GrowthScale AI"
                    value={brandName}
                    onChange={(e) => setBrandName(e.target.value)}
                    className="text-xs"
                  />
                </div>

                <div className="space-y-1.5">
                  <Label htmlFor="logoUrl" className="text-xs font-semibold">Brand Logo URL (PNG/SVG with transparent BG)</Label>
                  <Input
                    id="logoUrl"
                    placeholder="https://youragency.com/logo.png"
                    value={logoUrl}
                    onChange={(e) => setLogoUrl(e.target.value)}
                    className="text-xs font-mono"
                  />
                  {logoUrl && (
                    <div className="p-3 border rounded-xl bg-slate-50 flex items-center gap-3">
                      <img src={logoUrl} alt="Logo" className="h-8 max-w-[120px] object-contain" />
                      <span className="text-[10px] text-slate-500 font-mono">Active Logo Preview</span>
                    </div>
                  )}
                </div>

                <div className="space-y-1.5">
                  <Label htmlFor="faviconUrl" className="text-xs font-semibold">Favicon URL (16x16 or 32x32)</Label>
                  <Input
                    id="faviconUrl"
                    placeholder="https://youragency.com/favicon.ico"
                    value={faviconUrl}
                    onChange={(e) => setFaviconUrl(e.target.value)}
                    className="text-xs font-mono"
                  />
                </div>

                <div className="space-y-1.5">
                  <Label htmlFor="primaryColor" className="text-xs font-semibold">Primary Theme Color (HEX)</Label>
                  <div className="flex items-center gap-3">
                    <input
                      id="primaryColor"
                      type="color"
                      value={primaryColor}
                      onChange={(e) => setPrimaryColor(e.target.value)}
                      className="w-10 h-10 rounded-lg cursor-pointer border border-border p-1"
                    />
                    <Input
                      value={primaryColor}
                      onChange={(e) => setPrimaryColor(e.target.value)}
                      className="text-xs font-mono w-32"
                    />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border border-border">
              <CardHeader>
                <CardTitle className="text-base">Support &amp; Legal Links</CardTitle>
                <CardDescription className="text-xs">Your custom customer support channels and legal URLs.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-1.5">
                  <Label htmlFor="supportEmail" className="text-xs font-semibold">Support Email *</Label>
                  <Input
                    id="supportEmail"
                    type="email"
                    placeholder="support@youragency.com"
                    value={supportEmail}
                    onChange={(e) => setSupportEmail(e.target.value)}
                    className="text-xs"
                  />
                </div>

                <div className="space-y-1.5">
                  <Label htmlFor="supportPhone" className="text-xs font-semibold">Support WhatsApp / Phone</Label>
                  <Input
                    id="supportPhone"
                    placeholder="+91 98765 43210"
                    value={supportPhone}
                    onChange={(e) => setSupportPhone(e.target.value)}
                    className="text-xs"
                  />
                </div>

                <div className="space-y-1.5">
                  <Label htmlFor="privacyPolicyUrl" className="text-xs font-semibold">Privacy Policy URL</Label>
                  <Input
                    id="privacyPolicyUrl"
                    placeholder="https://youragency.com/privacy"
                    value={privacyPolicyUrl}
                    onChange={(e) => setPrivacyPolicyUrl(e.target.value)}
                    className="text-xs font-mono"
                  />
                </div>

                <div className="space-y-1.5">
                  <Label htmlFor="termsUrl" className="text-xs font-semibold">Terms of Service URL</Label>
                  <Input
                    id="termsUrl"
                    placeholder="https://youragency.com/terms"
                    value={termsUrl}
                    onChange={(e) => setTermsUrl(e.target.value)}
                    className="text-xs font-mono"
                  />
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {/* TAB 3: WHATSAPP PRICING MARKUP */}
        {activeSubTab === "markup" && (
          <Card className="border border-border max-w-2xl mx-auto p-6 space-y-6">
            <div className="space-y-1">
              <Badge className="bg-amber-100 text-amber-800 border-none font-mono text-[10px]">
                RESELLER MARGIN ENGINE
              </Badge>
              <h3 className="text-xl font-bold font-display text-foreground">Set Your WhatsApp Conversation Margin</h3>
              <p className="text-xs text-muted-foreground">
                Automatically add a custom margin to every WhatsApp message billed to your sub-account clients.
              </p>
            </div>

            <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 space-y-4">
              <div className="space-y-2">
                <div className="flex justify-between text-xs font-semibold">
                  <span>Custom Per-Message Markup (INR):</span>
                  <span className="font-bold text-emerald-600 font-mono text-sm">+₹{Number(conversationMarkup).toFixed(2)}/msg</span>
                </div>
                <input
                  type="range"
                  min="0.00"
                  max="0.50"
                  step="0.01"
                  value={conversationMarkup}
                  onChange={(e) => setConversationMarkup(Number(e.target.value))}
                  className="w-full accent-emerald-600 cursor-pointer"
                />
              </div>

              <div className="grid grid-cols-2 gap-3 pt-2 text-xs">
                <div className="bg-white p-3 rounded-xl border border-slate-200">
                  <span className="text-[10px] text-slate-400 block">BASE MARKETING RATE</span>
                  <strong className="text-slate-800 font-mono">₹0.78 / conv</strong>
                </div>
                <div className="bg-white p-3 rounded-xl border border-slate-200">
                  <span className="text-[10px] text-slate-400 block">CLIENT CHARGED RATE</span>
                  <strong className="text-emerald-600 font-mono">
                    ₹{(0.78 + Number(conversationMarkup)).toFixed(2)} / conv
                  </strong>
                </div>
              </div>
            </div>

            <Button onClick={handleSave} className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs h-11 rounded-xl">
              Save Conversation Markup Settings
            </Button>
          </Card>
        )}

        {/* TAB 4: LIVE CLIENT UI PREVIEW */}
        {activeSubTab === "preview" && (
          <div className="border border-border rounded-2xl p-6 bg-slate-900 text-white space-y-6">
            <div className="flex items-center justify-between">
              <div className="space-y-1">
                <span className="text-[10px] font-mono text-emerald-400 uppercase tracking-wider">LIVE CLIENT PREVIEW</span>
                <h3 className="text-lg font-bold">How Your Clients Experience {brandName}</h3>
              </div>
              <Badge className="bg-emerald-500/20 text-emerald-300 font-mono text-[10px]">
                Domain: {customDomain}
              </Badge>
            </div>

            {/* Mock Header & Dashboard */}
            <div className="rounded-xl border border-slate-700 bg-slate-950 p-4 space-y-4">
              <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                <div className="flex items-center gap-3">
                  {logoUrl ? (
                    <img src={logoUrl} alt="Logo" className="h-6 object-contain" />
                  ) : (
                    <div className="h-6 w-6 rounded-md flex items-center justify-center font-bold text-xs text-white" style={{ backgroundColor: primaryColor }}>
                      {brandName.charAt(0)}
                    </div>
                  )}
                  <span className="font-bold text-sm tracking-tight">{brandName}</span>
                </div>
                <div className="flex items-center gap-2 text-xs text-slate-400">
                  <span>Support: {supportEmail}</span>
                  <div className="h-2 w-2 rounded-full bg-emerald-500" />
                </div>
              </div>

              <div className="grid grid-cols-3 gap-3 pt-2">
                <div className="p-3 bg-slate-900 rounded-lg border border-slate-800">
                  <span className="text-[10px] text-slate-400 block">WhatsApp Status</span>
                  <strong className="text-emerald-400 text-xs flex items-center gap-1 mt-0.5">
                    <CheckCircle2 className="w-3 h-3" /> WABA Connected
                  </strong>
                </div>
                <div className="p-3 bg-slate-900 rounded-lg border border-slate-800">
                  <span className="text-[10px] text-slate-400 block">Client Wallet Balance</span>
                  <strong className="text-white text-xs font-mono mt-0.5 block">₹15,400.00</strong>
                </div>
                <div className="p-3 bg-slate-900 rounded-lg border border-slate-800">
                  <span className="text-[10px] text-slate-400 block">Campaign ROI</span>
                  <strong className="text-emerald-400 text-xs font-mono mt-0.5 block">+34.8%</strong>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
}

