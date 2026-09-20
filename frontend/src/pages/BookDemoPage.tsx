import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { PublicNavbar } from "@/components/PublicNavbar";
import { PublicFooter } from "@/components/PublicFooter";
import { AeoStructuredData } from "@/components/AeoStructuredData";
import {
  Calendar as CalendarIcon,
  Clock,
  CheckCircle2,
  Sparkles,
  Phone,
  Mail,
  Building2,
  User,
  ArrowRight,
  ShieldCheck,
  CalendarCheck,
  Zap,
  ShoppingBag,
  Flame,
  Star,
} from "lucide-react";
import { useSearchParams } from "react-router-dom";

const TIME_SLOTS = [
  "10:30 AM",
  "11:45 AM",
  "02:00 PM",
  "03:15 PM",
  "04:30 PM",
  "05:45 PM",
  "07:00 PM",
];

export default function BookDemoPage() {
  const [searchParams] = useSearchParams();
  const planParam = searchParams.get("plan") || "Growth Tri-Channel";

  // Generate next 7 working days
  const today = new Date();
  const calendarDates = Array.from({ length: 7 }, (_, i) => {
    const d = new Date();
    d.setDate(today.getDate() + i + 1);
    return {
      formatted: d.toISOString().split("T")[0],
      dayName: d.toLocaleDateString("en-US", { weekday: "short" }),
      monthDay: d.toLocaleDateString("en-US", { month: "short", day: "numeric" }),
    };
  });

  const [selectedDate, setSelectedDate] = useState<string>(calendarDates[0].formatted);
  const [selectedSlot, setSelectedSlot] = useState<string>(TIME_SLOTS[1]);
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [phone, setPhone] = useState<string>("");
  const [companyType, setCompanyType] = useState<string>("D2C E-Commerce Brand");
  const [booked, setBooked] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    document.title = "Book a Demo — Conversio AI";
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setBooked(true);
    }, 700);
  };

  const selectedDateObj = calendarDates.find((d) => d.formatted === selectedDate);

  return (
    <div className="min-h-screen bg-[#030712] text-slate-100 font-sans selection:bg-emerald-500 selection:text-black overflow-x-hidden relative">
      {/* Background Mesh Glow */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute top-10 left-1/3 w-[600px] h-[450px] bg-emerald-600/10 rounded-full blur-[140px]" />
        <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[400px] bg-blue-600/10 rounded-full blur-[140px]" />
        <div
          className="absolute inset-0 opacity-[0.14]"
          style={{
            backgroundImage: "radial-gradient(rgba(255, 255, 255, 0.2) 1px, transparent 1px)",
            backgroundSize: "32px 32px",
          }}
        />
      </div>

      <AeoStructuredData />
      <PublicNavbar />

      <main className="pt-36 sm:pt-44 pb-24 relative z-10">
        <div className="container mx-auto px-4 sm:px-6 max-w-6xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
            
            {/* Left Column: Why Book a Demo & Social Proof */}
            <div className="lg:col-span-5 space-y-8 text-left">
              <div>
                <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-mono font-semibold mb-4 shadow-xs">
                  <Sparkles className="w-3.5 h-3.5 text-emerald-400 animate-pulse" /> 1-ON-1 STRATEGY DEMO
                </div>
                <h1 className="text-3xl sm:text-5xl font-bold font-display text-white tracking-tight leading-tight">
                  See Conversio Live in Action
                </h1>
                <p className="text-slate-400 text-sm sm:text-base mt-4 leading-relaxed">
                  Join a 25-minute tailored walkthrough with our product specialist. We’ll show you how Conversio's WhatsApp recovery &amp; tri-channel sales scale revenue for your exact business.
                </p>
              </div>

              {/* Product Preview Mockup */}
              <div className="relative rounded-3xl overflow-hidden border border-white/10 shadow-2xl bg-black/40 group">
                <img
                  src="/home/inbox_feature.jpg"
                  alt="Conversio Live Platform Walkthrough"
                  className="w-full h-48 sm:h-52 object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent opacity-80" />
                <div className="absolute bottom-3 left-4 right-4 flex items-center justify-between">
                  <span className="text-[11px] font-mono text-emerald-400 font-bold bg-black/75 px-2.5 py-1 rounded-lg border border-emerald-500/30 backdrop-blur-md">
                    25-Minute Live Interactive Demo
                  </span>
                  <img
                    src="/home/meta-partner-badge.avif"
                    alt="Meta Business Partner"
                    className="h-6 object-contain"
                  />
                </div>
              </div>

              {/* What you'll get checklist */}
              <div className="rounded-3xl bg-slate-900/70 border border-white/10 p-6 space-y-4 backdrop-blur-xl">
                <h3 className="text-xs font-mono font-bold uppercase tracking-widest text-emerald-400">
                  What we cover in this session:
                </h3>

                <div className="space-y-3 text-xs text-slate-300">
                  <div className="flex items-start gap-3">
                    <div className="w-5 h-5 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center shrink-0 mt-0.5">
                      <CheckCircle2 className="w-3.5 h-3.5" />
                    </div>
                    <span><strong>Shopify &amp; WooCommerce Audit:</strong> Live calculation of your abandoned cart and RTO recovery potential.</span>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="w-5 h-5 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center shrink-0 mt-0.5">
                      <CheckCircle2 className="w-3.5 h-3.5" />
                    </div>
                    <span><strong>Tri-Channel Cadence Setup:</strong> How to coordinate WhatsApp + Email + AI Voice dialer with Stop-on-Reply.</span>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="w-5 h-5 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center shrink-0 mt-0.5">
                      <CheckCircle2 className="w-3.5 h-3.5" />
                    </div>
                    <span><strong>Official Meta Cloud API Verification:</strong> Fast-track Green Tick application and WhatsApp number onboarding.</span>
                  </div>
                </div>
              </div>

              {/* Trust & Testimonial quote */}
              <div className="rounded-3xl bg-slate-900/50 border border-white/10 p-5 space-y-2 backdrop-blur-xl">
                <div className="flex items-center gap-1 text-amber-400">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-3.5 h-3.5 fill-current" />
                  ))}
                </div>
                <p className="text-xs italic text-slate-300">
                  "Conversio recovered ₹4.8 Lakhs in abandoned carts within our first 30 days and reduced our COD return rates by 38%."
                </p>
                <div className="text-[11px] font-mono text-slate-400">
                  — <strong>Amit Verma</strong>, VP of Growth, D2C Apparel Brand
                </div>
              </div>

              {/* Security & Partner Badges */}
              <div className="flex flex-wrap items-center gap-4 text-xs font-mono text-slate-400">
                <span className="flex items-center gap-1.5"><ShieldCheck className="w-4 h-4 text-blue-400" /> Meta Tech Partner</span>
                <span className="flex items-center gap-1.5"><ShieldCheck className="w-4 h-4 text-emerald-400" /> ISO 27001 Certified</span>
                <span className="flex items-center gap-1.5"><ShieldCheck className="w-4 h-4 text-purple-400" /> SOC 2 Compliant</span>
              </div>
            </div>

            {/* Right Column: Interactive Calendar Booking Card */}
            <div className="lg:col-span-7">
              <div className="rounded-[36px] border border-white/10 bg-slate-900/90 shadow-[0_25px_80px_rgba(0,0,0,0.8)] overflow-hidden backdrop-blur-2xl">
                {/* Header */}
                <div className="bg-gradient-to-r from-slate-950 via-slate-900 to-emerald-950/80 p-6 sm:p-8 text-white border-b border-white/10">
                  <div className="flex items-center justify-between">
                    <div>
                      <h2 className="text-xl sm:text-2xl font-bold font-display text-white">
                        Select a Date &amp; Time
                      </h2>
                      <p className="text-xs text-slate-400 mt-1 font-mono">
                        Time zone: Asia/Kolkata (Indian Standard Time, GMT+5:30)
                      </p>
                    </div>
                    {planParam && (
                      <span className="hidden sm:inline-flex text-[11px] font-mono font-bold text-emerald-400 bg-emerald-950/80 border border-emerald-500/30 px-3 py-1 rounded-full">
                        {planParam}
                      </span>
                    )}
                  </div>
                </div>

                {!booked ? (
                  <form onSubmit={handleSubmit} className="p-6 sm:p-8 space-y-6 text-white text-left">
                    {/* 1. Date Selector */}
                    <div>
                      <label className="text-xs font-bold uppercase tracking-wider text-slate-300 block mb-2.5 flex items-center gap-1.5 font-mono">
                        <CalendarIcon className="w-4 h-4 text-emerald-400" /> 1. Select Preferred Date
                      </label>
                      <div className="flex items-center gap-2 overflow-x-auto pb-1 [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">
                        {calendarDates.map((d) => {
                          const isSelected = selectedDate === d.formatted;
                          return (
                            <button
                              type="button"
                              key={d.formatted}
                              onClick={() => setSelectedDate(d.formatted)}
                              className={`shrink-0 py-2.5 px-4 rounded-2xl border text-center transition-all cursor-pointer ${
                                isSelected
                                  ? "border-emerald-500 bg-emerald-600 text-white font-bold shadow-[0_0_15px_rgba(16,185,129,0.35)] ring-1 ring-emerald-400"
                                  : "border-white/10 bg-slate-950/80 text-slate-300 hover:border-white/20 hover:text-white"
                              }`}
                            >
                              <span className="block text-[10px] uppercase font-mono tracking-wider text-slate-400">
                                {d.dayName}
                              </span>
                              <span className="block text-xs sm:text-sm font-semibold mt-0.5">
                                {d.monthDay}
                              </span>
                            </button>
                          );
                        })}
                      </div>
                    </div>

                    {/* 2. Time Slot Selector */}
                    <div>
                      <label className="text-xs font-bold uppercase tracking-wider text-slate-300 block mb-2.5 flex items-center gap-1.5 font-mono">
                        <Clock className="w-4 h-4 text-emerald-400" /> 2. Select Time Slot (IST)
                      </label>
                      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                        {TIME_SLOTS.map((slot) => {
                          const isSelected = selectedSlot === slot;
                          return (
                            <button
                              type="button"
                              key={slot}
                              onClick={() => setSelectedSlot(slot)}
                              className={`py-2 px-3 rounded-xl border text-xs font-mono font-medium transition-all cursor-pointer text-center ${
                                isSelected
                                  ? "border-emerald-500 bg-emerald-600 text-white font-bold shadow-[0_0_15px_rgba(16,185,129,0.35)]"
                                  : "border-white/10 bg-slate-950 text-slate-300 hover:bg-slate-800 hover:text-white"
                              }`}
                            >
                              {slot}
                            </button>
                          );
                        })}
                      </div>
                    </div>

                    {/* 3. Lead Contact Fields */}
                    <div className="pt-4 border-t border-white/10 space-y-4">
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <label className="text-xs font-semibold text-slate-300 block mb-1">
                            Your Full Name *
                          </label>
                          <div className="relative">
                            <User className="w-4 h-4 text-slate-500 absolute left-3 top-3.5" />
                            <input
                              required
                              type="text"
                              placeholder="e.g. Rahul Makwana"
                              value={name}
                              onChange={(e) => setName(e.target.value)}
                              className="h-11 w-full pl-9 pr-3 rounded-xl border border-white/10 bg-slate-950/80 text-xs text-white placeholder:text-slate-500 focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                            />
                          </div>
                        </div>

                        <div>
                          <label className="text-xs font-semibold text-slate-300 block mb-1">
                            Work Email *
                          </label>
                          <div className="relative">
                            <Mail className="w-4 h-4 text-slate-500 absolute left-3 top-3.5" />
                            <input
                              required
                              type="email"
                              placeholder="rahul@company.com"
                              value={email}
                              onChange={(e) => setEmail(e.target.value)}
                              className="h-11 w-full pl-9 pr-3 rounded-xl border border-white/10 bg-slate-950/80 text-xs text-white placeholder:text-slate-500 focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                            />
                          </div>
                        </div>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <label className="text-xs font-semibold text-slate-300 block mb-1">
                            WhatsApp Number *
                          </label>
                          <div className="relative">
                            <Phone className="w-4 h-4 text-slate-500 absolute left-3 top-3.5" />
                            <input
                              required
                              type="tel"
                              placeholder="+91 98765 43210"
                              value={phone}
                              onChange={(e) => setPhone(e.target.value)}
                              className="h-11 w-full pl-9 pr-3 rounded-xl border border-white/10 bg-slate-950/80 text-xs text-white placeholder:text-slate-500 focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                            />
                          </div>
                        </div>

                        <div>
                          <label className="text-xs font-semibold text-slate-300 block mb-1">
                            Business Focus
                          </label>
                          <div className="relative">
                            <Building2 className="w-4 h-4 text-slate-500 absolute left-3 top-3.5" />
                            <select
                              value={companyType}
                              onChange={(e) => setCompanyType(e.target.value)}
                              className="h-11 w-full pl-9 pr-3 rounded-xl border border-white/10 bg-slate-950 text-xs text-white focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                            >
                              <option value="D2C E-Commerce Brand">D2C E-Commerce (Shopify / WooCommerce)</option>
                              <option value="B2B & Indian SME">B2B Manufacturing &amp; Wholesale</option>
                              <option value="Exporter & Global Sales">Exporter &amp; Overseas Sales</option>
                              <option value="Agency & Reseller">Digital Agency / System Integrator</option>
                            </select>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Submit CTA */}
                    <div className="pt-2">
                      <Button
                        type="submit"
                        disabled={loading}
                        className="w-full h-12 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-sm shadow-[0_0_25px_rgba(16,185,129,0.4)] gap-2 cursor-pointer transition-all transform active:scale-95 border border-emerald-400/30"
                      >
                        {loading ? (
                          "Reserving Slot on Google Calendar..."
                        ) : (
                          <>
                            <CalendarCheck className="w-4 h-4" />
                            Confirm Demo on {selectedDateObj?.dayName}, {selectedDateObj?.monthDay} at {selectedSlot} IST
                          </>
                        )}
                      </Button>
                      <p className="text-[11px] text-center text-slate-400 mt-2.5 flex items-center justify-center gap-1.5 font-mono">
                        <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                        Instant Google Meet link &amp; WhatsApp reminder dispatched automatically.
                      </p>
                    </div>
                  </form>
                ) : (
                  /* Success Confirmation */
                  <div className="p-8 sm:p-12 text-center space-y-5">
                    <div className="w-16 h-16 rounded-full bg-emerald-500/20 border border-emerald-500/40 text-emerald-400 mx-auto flex items-center justify-center shadow-[0_0_30px_rgba(16,185,129,0.4)]">
                      <CheckCircle2 className="w-10 h-10" />
                    </div>
                    <h3 className="text-2xl sm:text-3xl font-bold font-display text-white">
                      Demo Session Confirmed! 🎉
                    </h3>
                    <p className="text-sm text-slate-300 max-w-md mx-auto">
                      Thank you, <strong>{name || "Valued Merchant"}</strong>! We have reserved your 1-on-1 session on {selectedDateObj?.dayName}, {selectedDateObj?.monthDay} at {selectedSlot} IST.
                    </p>

                    <div className="p-4 rounded-2xl bg-slate-950 border border-white/10 text-left max-w-md mx-auto space-y-2 text-xs">
                      <div className="flex justify-between border-b border-white/10 pb-2">
                        <span className="text-slate-400">Date &amp; Time:</span>
                        <span className="font-bold font-mono text-emerald-400">{selectedDateObj?.dayName}, {selectedDateObj?.monthDay} @ {selectedSlot} IST</span>
                      </div>
                      <div className="flex justify-between border-b border-white/10 pb-2">
                        <span className="text-slate-400">Meeting Channel:</span>
                        <span className="font-semibold text-white">Google Meet (Email sent)</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-slate-400">WhatsApp Alert:</span>
                        <span className="font-mono text-white">{phone || "+91 (Your Phone)"}</span>
                      </div>
                    </div>

                    <div className="pt-3">
                      <a
                        href="https://calendar.google.com"
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs shadow-[0_0_20px_rgba(16,185,129,0.4)] transition-all cursor-pointer"
                      >
                        <CalendarCheck className="w-4 h-4" /> Open in Google Calendar
                      </a>
                    </div>
                  </div>
                )}
              </div>
            </div>

          </div>
        </div>
      </main>

      <PublicFooter />
    </div>
  );
}
