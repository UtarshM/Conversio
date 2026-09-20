import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { DashboardLayout } from "@/components/DashboardLayout";
import { Button } from "@/components/ui/button";
import { toast } from "@/components/ui/use-toast";
import {
  CheckCircle2,
  ShieldCheck,
  Award,
  AlertCircle,
  ExternalLink,
  Plus,
  Trash2,
  Sparkles,
  Building2,
  Lock,
} from "lucide-react";
import { useAppContext } from "@/context/AppContext";

export default function GreenTickVerificationPage() {
  const navigate = useNavigate();
  const { whatsApp, connectWhatsApp } = useAppContext();
  const [pressLinks, setPressLinks] = useState<string[]>([]);
  const [newLink, setNewLink] = useState("");
  const [justification, setJustification] = useState("");
  const [website, setWebsite] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const hasMetaVerified = whatsApp.businessVerificationStatus === "verified";
  const has2FA = whatsApp.authorizationStatus === "active";
  const hasPhone = Boolean(whatsApp.displayPhoneNumber && whatsApp.phoneNumberId);
  const hasDomain = /^https:\/\/.+\..+/.test(website);
  const pressCount = pressLinks.length;
  
  const notabilityScore = Math.min(
    (hasMetaVerified ? 30 : 0) +
    (has2FA ? 15 : 0) +
    (hasPhone ? 10 : 0) +
    (hasDomain ? 10 : 0) +
    Math.min(pressCount * 10, 35),
    100
  );

  const handleAddLink = () => {
    if (!newLink.trim()) return;
    if (!newLink.startsWith("http://") && !newLink.startsWith("https://")) {
      toast({
        title: "Invalid URL",
        description: "Please provide a complete web URL starting with https://",
        variant: "destructive",
      });
      return;
    }
    setPressLinks([...pressLinks, newLink.trim()]);
    setNewLink("");
    toast({ title: "Press link added", description: "Notability score updated." });
  };

  const handleRemoveLink = (index: number) => {
    setPressLinks(pressLinks.filter((_, i) => i !== index));
  };

  const handleSubmitApplication = async () => {
    if (!hasPhone) {
      toast({
        title: "Connect a WhatsApp number first",
        description: "A Meta Business Account and phone number are required before you can start the verification process.",
        variant: "destructive",
      });
      navigate("/connect");
      return;
    }

    if (!hasDomain || justification.trim().length < 40) {
      toast({
        title: "Add your website and brand justification",
        description: "Include a public HTTPS website and a concise explanation of why your brand should be verified.",
        variant: "destructive",
      });
      return;
    }

    if (pressLinks.length < 2) {
      toast({
        title: "Notability links required",
        description: "Add at least two independent press or news links before recording a Meta verification application.",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);
    try {
      await connectWhatsApp({ ...whatsApp, obaStatus: "pending" });
      toast({
        title: "Verification tracking started",
        description: "Your workspace now records the application as under review. Complete the official request in Meta Business Manager; Conversio will show the status saved for this number.",
      });
    } catch (error) {
      toast({
        title: "Submission failed",
        description: "Could not submit application to Meta.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header Banner */}
        <div className="rounded-[1.5rem] border border-blue-500/30 bg-gradient-to-br from-slate-900 via-slate-950 to-blue-950/40 p-8 shadow-xl">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
            <div className="space-y-2 max-w-2xl">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/30 text-blue-400 text-xs font-mono font-bold">
                <ShieldCheck className="w-4 h-4 text-blue-400" /> META OFFICIAL BUSINESS ACCOUNT (OBA)
              </div>
              <h1 className="font-display text-2xl font-bold tracking-tight text-white md:text-3xl">
                WhatsApp Blue / Green Tick Verification
              </h1>
              <p className="text-sm text-slate-300 leading-relaxed">
                Display the official Meta verification badge alongside your WhatsApp display name. Protect your brand identity and build instant trust with every customer message.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-slate-900/90 border border-slate-800 text-center min-w-[200px]">
              <span className="text-xs text-slate-400 uppercase tracking-widest font-mono block mb-1">
                Readiness Score
              </span>
              <div className="text-3xl font-black font-display text-emerald-400">
                {notabilityScore}%
              </div>
              <span className={`text-[11px] font-mono font-semibold ${notabilityScore >= 70 ? "text-emerald-400" : "text-amber-400"}`}>
                {notabilityScore >= 70 ? "Ready for Meta Review" : "Requires Press Links"}
              </span>
            </div>
          </div>
        </div>

        {/* Live Status Card */}
        {whatsApp.obaStatus === "pending" && (
          <div className="rounded-2xl border border-amber-500/30 bg-amber-500/10 p-5 flex items-start gap-4 text-amber-200">
            <AlertCircle className="w-6 h-6 text-amber-400 shrink-0 mt-0.5" />
            <div>
              <h4 className="font-bold text-sm text-white">Blue Tick Application Under Meta Review</h4>
              <p className="text-xs text-amber-200/90 mt-1">
                Complete the request in Meta Business Manager, then keep the connected account status in sync here. Meta is the only authority that can approve or reject the badge.
              </p>
            </div>
          </div>
        )}

        <div className="grid gap-6 lg:grid-cols-3">
          {/* Readiness Checklist */}
          <div className="lg:col-span-1 space-y-4">
            <div className="rounded-2xl border border-border bg-card p-6 shadow-card space-y-4">
              <h3 className="font-display text-base font-semibold text-foreground flex items-center gap-2">
                <Award className="w-5 h-5 text-emerald-400" /> Meta Prerequisites Audit
              </h3>

              <div className="space-y-3 text-xs">
                <div className="flex items-center justify-between p-3 rounded-xl bg-muted/40 border border-border">
                  <div className="flex items-center gap-2.5">
                    <Building2 className="w-4 h-4 text-blue-400" />
                    <span>Meta Business Verified</span>
                  </div>
                  {hasMetaVerified ? <CheckCircle2 className="w-4 h-4 text-emerald-400" /> : <AlertCircle className="w-4 h-4 text-amber-400" />}
                </div>

                <div className="flex items-center justify-between p-3 rounded-xl bg-muted/40 border border-border">
                  <div className="flex items-center gap-2.5">
                    <Lock className="w-4 h-4 text-purple-400" />
                    <span>Active Meta Authorization</span>
                  </div>
                  {has2FA ? <CheckCircle2 className="w-4 h-4 text-emerald-400" /> : <AlertCircle className="w-4 h-4 text-amber-400" />}
                </div>

                <div className="flex items-center justify-between p-3 rounded-xl bg-muted/40 border border-border">
                  <div className="flex items-center gap-2.5">
                    <ShieldCheck className="w-4 h-4 text-emerald-400" />
                    <span>Connected Business Phone</span>
                  </div>
                  {hasPhone ? <CheckCircle2 className="w-4 h-4 text-emerald-400" /> : <AlertCircle className="w-4 h-4 text-amber-400" />}
                </div>

                <div className="flex items-center justify-between p-3 rounded-xl bg-muted/40 border border-border">
                  <div className="flex items-center gap-2.5">
                    <ExternalLink className="w-4 h-4 text-amber-400" />
                    <span>Press Notability (Min 2)</span>
                  </div>
                  <span className={`font-mono font-bold ${pressLinks.length >= 2 ? "text-emerald-400" : "text-amber-400"}`}>
                    {pressLinks.length} / 5
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Notability Press Links & Application Form */}
          <div className="lg:col-span-2 space-y-6">
            <div className="rounded-2xl border border-border bg-card p-6 shadow-card space-y-6">
              <div>
                <h3 className="font-display text-lg font-semibold text-foreground flex items-center gap-2">
                  <Sparkles className="w-5 h-5 text-amber-400" /> Press Coverage & Brand Notability Proof
                </h3>
                <p className="text-xs text-muted-foreground mt-1">
                  Add genuine independent coverage of your own brand. Do not add sample links, self-published content, or social posts—Meta makes the final notability decision.
                </p>
              </div>

              {/* Add Link Input */}
              <div className="flex gap-2">
                <input
                  type="url"
                  value={newLink}
                  onChange={(e) => setNewLink(e.target.value)}
                    placeholder="https://publication.com/article-about-your-brand"
                  className="h-10 flex-1 rounded-xl border border-input bg-background px-4 text-xs text-foreground focus:ring-1 focus:ring-primary"
                />
                <Button onClick={handleAddLink} size="sm" className="gap-1.5 rounded-xl">
                  <Plus className="w-4 h-4" /> Add Link
                </Button>
              </div>

              {/* Press Links List */}
              <div className="space-y-2">
                {pressLinks.map((link, idx) => (
                  <div key={idx} className="flex items-center justify-between p-3 rounded-xl border border-border bg-muted/20 text-xs">
                    <a href={link} target="_blank" rel="noreferrer" className="text-primary hover:underline flex items-center gap-1.5 truncate max-w-md">
                      <ExternalLink className="w-3.5 h-3.5 shrink-0" />
                      <span className="truncate">{link}</span>
                    </a>
                    <button onClick={() => handleRemoveLink(idx)} className="text-muted-foreground hover:text-destructive p-1">
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>

              {/* Justification & Submission */}
              <div className="space-y-4 pt-4 border-t border-border">
                <div>
                  <label className="text-xs font-semibold text-foreground uppercase tracking-wider block mb-1">
                    Official Website Domain
                  </label>
                  <input
                    type="url"
                    value={website}
                    onChange={(e) => setWebsite(e.target.value)}
                    placeholder="https://yourbrand.com"
                    className="h-10 w-full rounded-xl border border-input bg-background px-4 text-xs text-foreground"
                  />
                </div>

                <div>
                  <label className="text-xs font-semibold text-foreground uppercase tracking-wider block mb-1">
                    Brand Justification for Meta Reviewers
                  </label>
                  <textarea
                    rows={4}
                    value={justification}
                    onChange={(e) => setJustification(e.target.value)}
                    className="w-full rounded-xl border border-input bg-background p-3 text-xs text-foreground"
                  />
                </div>

                <Button
                  onClick={handleSubmitApplication}
                  disabled={isSubmitting || whatsApp.obaStatus === "pending" || whatsApp.obaStatus === "approved"}
                  className="w-full h-11 rounded-xl font-bold bg-emerald-600 hover:bg-emerald-500 text-white shadow-lg shadow-emerald-950/20"
                >
                  {isSubmitting
                    ? "Submitting to Meta..."
                    : whatsApp.obaStatus === "approved"
                    ? "Blue Tick Approved"
                    : whatsApp.obaStatus === "pending"
                    ? "Application Under Review"
                    : "Record Meta Application as Submitted"}
                </Button>
                <p className="text-center text-[11px] leading-relaxed text-muted-foreground">
                  Conversio tracks the request for this connected number. Official approval happens in Meta Business Manager, not inside Conversio.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
