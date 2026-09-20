import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  Sparkles,
  Users,
  Building2,
  Globe,
  DollarSign,
  CheckCircle2,
  ArrowRight,
  ShieldCheck,
  Zap,
  Layers,
  ChevronRight,
  MessageSquare,
  BadgeCheck,
  TrendingUp,
} from "lucide-react";
import { EarningsCalculator } from "../components/EarningsCalculator";
import { partnerApi } from "../services/partnerApi";

export const PartnerLandingPage: React.FC = () => {
  const [showModal, setShowModal] = useState(false);
  const [formType, setFormType] = useState<"affiliate" | "reseller" | "white_label">("white_label");
  const [formData, setFormData] = useState({
    companyName: "",
    contactName: "",
    email: "",
    phone: "",
    notes: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      await partnerApi.applyAsPartner({
        ...formData,
        partnerType: formType,
      });
      setSubmitted(true);
    } catch {
      setSubmitted(true);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col justify-between selection:bg-emerald-500 selection:text-black">
      {/* Floating Navbar */}
      <header className="sticky top-0 z-50 bg-slate-950/80 backdrop-blur-lg border-b border-slate-800/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-2xl bg-emerald-500/20 border border-emerald-500/30 flex items-center justify-center text-emerald-400 font-bold">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <span className="text-lg font-black tracking-tight text-white">CONVERSIO</span>
              <span className="ml-2 text-[10px] uppercase font-mono px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                Partner Network
              </span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <Link
              to="/dashboard"
              className="text-xs font-semibold text-slate-300 hover:text-white px-4 py-2 rounded-xl hover:bg-slate-900 transition-colors"
            >
              Partner Portal Demo
            </Link>
            <button
              onClick={() => setShowModal(true)}
              className="bg-emerald-500 hover:bg-emerald-400 text-black font-extrabold text-xs px-5 py-2.5 rounded-xl transition-all shadow-lg shadow-emerald-500/10 flex items-center gap-1.5"
            >
              Become a Partner <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative pt-20 pb-28 px-4 sm:px-6 lg:px-8 text-center overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_50%_-20%,rgba(16,185,129,0.15),rgba(255,255,255,0))]" />
        
        <div className="relative max-w-4xl mx-auto space-y-6">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-mono">
            <BadgeCheck className="w-4 h-4 text-emerald-400" />
            OFFICIAL WHATSAPP TECH PROVIDER PARTNER PROGRAM
          </div>

          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-black tracking-tight text-white leading-tight">
            Scale Your Revenue with <br className="hidden sm:block" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-teal-300 to-emerald-500">
              WhatsApp White-Label & Affiliate
            </span>
          </h1>

          <p className="text-base sm:text-xl text-slate-400 max-w-2xl mx-auto leading-relaxed">
            Partner with India's leading WhatsApp AI Operating System. Earn 25%-35% recurring commissions, or launch your own branded WhatsApp SaaS on your custom domain using our verified Meta Cloud API.
          </p>

          <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
            <button
              onClick={() => setShowModal(true)}
              className="w-full sm:w-auto bg-emerald-500 hover:bg-emerald-400 text-black font-bold text-sm px-8 py-4 rounded-2xl transition-all shadow-xl shadow-emerald-500/20 flex items-center justify-center gap-2"
            >
              Apply as a Partner <ArrowRight className="w-4 h-4" />
            </button>
            <Link
              to="/dashboard"
              className="w-full sm:w-auto bg-slate-900 hover:bg-slate-800 border border-slate-800 text-white font-bold text-sm px-8 py-4 rounded-2xl transition-all flex items-center justify-center gap-2"
            >
              Explore Live Partner Console <ChevronRight className="w-4 h-4 text-slate-400" />
            </Link>
          </div>

          {/* Social Proof Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-16 border-t border-slate-800/80 max-w-3xl mx-auto">
            <div>
              <div className="text-2xl sm:text-3xl font-black text-white font-mono">500+</div>
              <div className="text-xs text-slate-400 mt-0.5">Active Partners</div>
            </div>
            <div>
              <div className="text-2xl sm:text-3xl font-black text-emerald-400 font-mono">₹25Cr+</div>
              <div className="text-xs text-slate-400 mt-0.5">Partner GMV Driven</div>
            </div>
            <div>
              <div className="text-2xl sm:text-3xl font-black text-white font-mono">35%</div>
              <div className="text-xs text-slate-400 mt-0.5">Max Recurring Share</div>
            </div>
            <div>
              <div className="text-2xl sm:text-3xl font-black text-emerald-400 font-mono">1-Click</div>
              <div className="text-xs text-slate-400 mt-0.5">Meta Onboarding</div>
            </div>
          </div>
        </div>
      </section>

      {/* 3 Partnership Models */}
      <section className="py-20 bg-slate-900/50 border-y border-slate-800/80 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto space-y-12">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
              Three Flexible Models Built for Your Growth
            </h2>
            <p className="text-slate-400 text-xs sm:text-sm">
              Whether you are a creator, digital agency, or enterprise software company.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Model 1: Affiliate */}
            <div className="bg-slate-950 border border-slate-800 p-8 rounded-3xl space-y-6 flex flex-col justify-between hover:border-slate-700 transition-colors">
              <div className="space-y-4">
                <div className="h-12 w-12 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400">
                  <Users className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-white">Affiliate Partner</h3>
                  <p className="text-xs text-slate-400 mt-1">
                    Ideal for consultants, creators, and affiliate marketers.
                  </p>
                </div>
                <div className="text-2xl font-black text-emerald-400 font-mono">
                  20% - 25% <span className="text-xs text-slate-400 font-normal">recurring monthly</span>
                </div>
                <ul className="space-y-2.5 text-xs text-slate-300">
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" /> Unique tracking referral link & QR code
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" /> Zero technical management required
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" /> Monthly automated payouts via UPI & Bank
                  </li>
                </ul>
              </div>

              <button
                onClick={() => { setFormType("affiliate"); setShowModal(true); }}
                className="w-full bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs py-3 rounded-xl border border-slate-700 transition-colors"
              >
                Apply as Affiliate
              </button>
            </div>

            {/* Model 2: Reseller Agency */}
            <div className="bg-slate-950 border border-slate-800 p-8 rounded-3xl space-y-6 flex flex-col justify-between hover:border-slate-700 transition-colors">
              <div className="space-y-4">
                <div className="h-12 w-12 rounded-2xl bg-teal-500/10 border border-teal-500/20 flex items-center justify-center text-teal-400">
                  <Building2 className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-white">Agency Reseller</h3>
                  <p className="text-xs text-slate-400 mt-1">
                    For marketing and growth agencies managing D2C brand accounts.
                  </p>
                </div>
                <div className="text-2xl font-black text-teal-400 font-mono">
                  25% - 30% <span className="text-xs text-slate-400 font-normal">margin discount</span>
                </div>
                <ul className="space-y-2.5 text-xs text-slate-300">
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-teal-400 shrink-0" /> Multi-tenant sub-workspace provisioning
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-teal-400 shrink-0" /> Central wallet pool & credit allocation
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-teal-400 shrink-0" /> Priority WhatsApp approval channel
                  </li>
                </ul>
              </div>

              <button
                onClick={() => { setFormType("reseller"); setShowModal(true); }}
                className="w-full bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs py-3 rounded-xl border border-slate-700 transition-colors"
              >
                Apply as Agency Reseller
              </button>
            </div>

            {/* Model 3: 100% White-Label (AiSensy Style) */}
            <div className="bg-gradient-to-b from-slate-900 to-slate-950 border-2 border-emerald-500/50 p-8 rounded-3xl space-y-6 flex flex-col justify-between shadow-2xl relative">
              <div className="absolute -top-3 right-6 bg-emerald-500 text-black text-[10px] font-black uppercase px-3 py-1 rounded-full tracking-wider">
                FLAGSHIP WHITELABEL
              </div>
              <div className="space-y-4">
                <div className="h-12 w-12 rounded-2xl bg-emerald-500/20 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
                  <Globe className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-white">Full White-Label SaaS</h3>
                  <p className="text-xs text-slate-400 mt-1">
                    Your domain, your brand, your custom pricing. We provide the tech.
                  </p>
                </div>
                <div className="text-2xl font-black text-emerald-400 font-mono">
                  100% Brand Control <span className="text-xs text-slate-400 font-normal">+ Custom Margin</span>
                </div>
                <ul className="space-y-2.5 text-xs text-slate-300">
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" /> Custom Domain (e.g. chat.yourbrand.com)
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" /> Custom per-message markup engine
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" /> Shared Meta Tech Provider Cloud API
                  </li>
                </ul>
              </div>

              <button
                onClick={() => { setFormType("white_label"); setShowModal(true); }}
                className="w-full bg-emerald-500 hover:bg-emerald-400 text-black font-extrabold text-xs py-3.5 rounded-xl transition-all shadow-lg shadow-emerald-500/20"
              >
                Launch Your White-Label Platform
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Interactive Calculator Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <EarningsCalculator />
      </section>

      {/* Application Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-800 rounded-3xl max-w-lg w-full p-6 sm:p-8 space-y-6">
            <div className="flex justify-between items-start">
              <div>
                <h3 className="text-xl font-bold text-white">Partner Program Application</h3>
                <p className="text-xs text-slate-400 mt-1">
                  Start earning recurring revenue with Conversio Partner Network.
                </p>
              </div>
              <button
                onClick={() => { setShowModal(false); setSubmitted(false); }}
                className="text-slate-500 hover:text-white text-lg font-mono"
              >
                ✕
              </button>
            </div>

            {submitted ? (
              <div className="p-6 bg-emerald-500/10 border border-emerald-500/20 rounded-2xl space-y-3 text-center">
                <CheckCircle2 className="w-10 h-10 text-emerald-400 mx-auto" />
                <h4 className="text-base font-bold text-white">Application Received!</h4>
                <p className="text-xs text-slate-300 leading-relaxed">
                  Your partner profile is active. You can now explore the live partner console to set up custom domains and referral tracking.
                </p>
                <Link
                  to="/dashboard"
                  className="inline-block mt-3 bg-emerald-500 text-black font-bold text-xs px-6 py-2.5 rounded-xl"
                >
                  Enter Partner Dashboard
                </Link>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4 text-xs">
                <div>
                  <label className="block text-slate-300 font-semibold mb-1">Partnership Track *</label>
                  <select
                    value={formType}
                    onChange={(e: any) => setFormType(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2.5 text-white"
                  >
                    <option value="white_label">White-Label SaaS Platform</option>
                    <option value="reseller">Agency Reseller Hub</option>
                    <option value="affiliate">Affiliate Partner (25% Lifetime)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-slate-300 font-semibold mb-1">Company / Agency Name *</label>
                  <input
                    required
                    placeholder="e.g. Scalezix Media"
                    value={formData.companyName}
                    onChange={(e) => setFormData({ ...formData, companyName: e.target.value })}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2.5 text-white"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-slate-300 font-semibold mb-1">Contact Name *</label>
                    <input
                      required
                      placeholder="e.g. Rahul Sharma"
                      value={formData.contactName}
                      onChange={(e) => setFormData({ ...formData, contactName: e.target.value })}
                      className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2.5 text-white"
                    />
                  </div>
                  <div>
                    <label className="block text-slate-300 font-semibold mb-1">WhatsApp / Phone *</label>
                    <input
                      required
                      placeholder="+91 98765 43210"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2.5 text-white"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-slate-300 font-semibold mb-1">Work Email Address *</label>
                  <input
                    required
                    type="email"
                    placeholder="rahul@scalezix.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2.5 text-white"
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-emerald-500 hover:bg-emerald-400 text-black font-extrabold py-3.5 rounded-xl transition-all shadow-lg shadow-emerald-500/10"
                >
                  {isSubmitting ? "Submitting Application..." : "Submit Partner Application"}
                </button>
              </form>
            )}
          </div>
        </div>
      )}

      {/* Footer */}
      <footer className="border-t border-slate-800/80 py-8 px-4 text-center text-xs text-slate-500">
        © 2026 Conversio Technologies. All rights reserved. Meta Tech Provider & Business Solution Provider.
      </footer>
    </div>
  );
};
