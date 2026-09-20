import { useState } from "react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import {
  Calendar as CalendarIcon,
  Clock,
  CheckCircle2,
  Sparkles,
  Phone,
  Mail,
  Building2,
  User,
  X,
  ArrowRight,
  ShieldCheck,
  CalendarCheck,
  Zap,
} from "lucide-react";

interface CalendarBookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  defaultPlan?: string;
}

const TIME_SLOTS = [
  "10:30 AM",
  "11:45 AM",
  "02:00 PM",
  "03:15 PM",
  "04:30 PM",
  "05:45 PM",
  "07:00 PM",
];

export function CalendarBookingModal({
  isOpen,
  onClose,
  defaultPlan,
}: CalendarBookingModalProps) {
  // Generate next 7 working days
  const today = new Date();
  const dates = Array.from({ length: 7 }, (_, i) => {
    const d = new Date();
    d.setDate(today.getDate() + i + 1);
    return {
      dateObj: d,
      dayName: d.toLocaleDateString("en-US", { weekday: "short" }),
      monthDay: d.toLocaleDateString("en-US", { month: "short", day: "numeric" }),
      formatted: d.toISOString().split("T")[0],
    };
  });

  const [selectedDate, setSelectedDate] = useState<string>(dates[0].formatted);
  const [selectedSlot, setSelectedSlot] = useState<string>(TIME_SLOTS[1]);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [companyType, setCompanyType] = useState("D2C E-Commerce Brand");
  const [booked, setBooked] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setBooked(true);
    }, 700);
  };

  const handleReset = () => {
    setBooked(false);
    onClose();
  };

  const selectedDateObj = dates.find((d) => d.formatted === selectedDate);

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="max-w-2xl w-[95vw] sm:w-full p-0 overflow-hidden rounded-3xl border border-white/10 bg-slate-950 text-white shadow-[0_25px_70px_rgba(0,0,0,0.8)] z-[100001]">
        {!booked ? (
          <div className="flex flex-col max-h-[90vh] overflow-y-auto [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">
            {/* Modal Header */}
            <div className="bg-gradient-to-r from-slate-950 via-slate-900 to-emerald-950/80 p-6 sm:p-7 text-white relative border-b border-white/10">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-400/30 text-emerald-400 text-xs font-mono font-semibold mb-2 shadow-xs">
                <Sparkles className="w-3.5 h-3.5 text-emerald-400 animate-pulse" /> 1-ON-1 DEMO WITH PRODUCT SPECIALIST
              </div>
              <h2 className="text-xl sm:text-2xl font-bold font-display text-white">
                Book a Live Product Tour &amp; ROI Demo
              </h2>
              <p className="text-xs sm:text-sm text-slate-300 mt-1">
                See how Conversio's D2C WhatsApp Retention &amp; Tri-Channel Sales Engine can 4x your conversion rate.
              </p>
              {defaultPlan && (
                <div className="mt-2.5 inline-flex items-center gap-1.5 text-xs text-emerald-300 font-mono bg-emerald-950/60 border border-emerald-500/30 px-2.5 py-0.5 rounded-lg">
                  <Zap className="w-3 h-3 text-emerald-400" /> Plan Selected: <strong className="text-white">{defaultPlan}</strong>
                </div>
              )}
            </div>

            {/* Form & Calendar Body */}
            <form onSubmit={handleSubmit} className="p-5 sm:p-6 space-y-5 text-white">
              {/* 1. Date Selector (Horizontally scrollable on mobile) */}
              <div>
                <label className="text-xs font-bold uppercase tracking-wider text-slate-300 block mb-2 flex items-center gap-1.5 font-mono">
                  <CalendarIcon className="w-3.5 h-3.5 text-emerald-400" /> 1. Select Date
                </label>
                <div className="flex items-center gap-2 overflow-x-auto pb-1 [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">
                  {dates.map((d) => {
                    const isSelected = selectedDate === d.formatted;
                    return (
                      <button
                        type="button"
                        key={d.formatted}
                        onClick={() => setSelectedDate(d.formatted)}
                        className={`shrink-0 py-2.5 px-3.5 rounded-2xl border text-center transition-all cursor-pointer ${
                          isSelected
                            ? "border-emerald-500 bg-emerald-600 text-white font-bold shadow-[0_0_15px_rgba(16,185,129,0.35)] ring-1 ring-emerald-400"
                            : "border-white/10 bg-slate-900/90 text-slate-300 hover:border-white/20 hover:text-white"
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
                <label className="text-xs font-bold uppercase tracking-wider text-slate-300 block mb-2 flex items-center gap-1.5 font-mono">
                  <Clock className="w-3.5 h-3.5 text-emerald-400" /> 2. Select Time (IST)
                </label>
                <div className="grid grid-cols-3 sm:grid-cols-4 gap-2">
                  {TIME_SLOTS.map((slot) => {
                    const isSelected = selectedSlot === slot;
                    return (
                      <button
                        type="button"
                        key={slot}
                        onClick={() => setSelectedSlot(slot)}
                        className={`py-2 px-2 rounded-xl border text-xs font-mono font-medium transition-all cursor-pointer text-center ${
                          isSelected
                            ? "border-emerald-500 bg-emerald-600 text-white font-bold shadow-[0_0_15px_rgba(16,185,129,0.35)]"
                            : "border-white/10 bg-slate-900 text-slate-300 hover:bg-slate-800 hover:text-white"
                        }`}
                      >
                        {slot}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* 3. Lead Contact Details */}
              <div className="pt-3 border-t border-white/10 space-y-3">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="text-xs font-semibold text-slate-300 block mb-1">
                      Your Name *
                    </label>
                    <div className="relative">
                      <User className="w-4 h-4 text-slate-500 absolute left-3 top-3" />
                      <input
                        required
                        type="text"
                        placeholder="e.g. Arjun Patel"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="h-10 w-full pl-9 pr-3 rounded-xl border border-white/10 bg-slate-900/90 text-xs text-white placeholder:text-slate-500 focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="text-xs font-semibold text-slate-300 block mb-1">
                      Work Email *
                    </label>
                    <div className="relative">
                      <Mail className="w-4 h-4 text-slate-500 absolute left-3 top-3" />
                      <input
                        required
                        type="email"
                        placeholder="name@company.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="h-10 w-full pl-9 pr-3 rounded-xl border border-white/10 bg-slate-900/90 text-xs text-white placeholder:text-slate-500 focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                      />
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="text-xs font-semibold text-slate-300 block mb-1">
                      WhatsApp Phone Number *
                    </label>
                    <div className="relative">
                      <Phone className="w-4 h-4 text-slate-500 absolute left-3 top-3" />
                      <input
                        required
                        type="tel"
                        placeholder="+91 98765 43210"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        className="h-10 w-full pl-9 pr-3 rounded-xl border border-white/10 bg-slate-900/90 text-xs text-white placeholder:text-slate-500 focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="text-xs font-semibold text-slate-300 block mb-1">
                      Business Type
                    </label>
                    <div className="relative">
                      <Building2 className="w-4 h-4 text-slate-500 absolute left-3 top-3" />
                      <select
                        value={companyType}
                        onChange={(e) => setCompanyType(e.target.value)}
                        className="h-10 w-full pl-9 pr-3 rounded-xl border border-white/10 bg-slate-900 text-xs text-white focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                      >
                        <option value="D2C E-Commerce Brand">D2C E-Commerce Brand (Shopify/Woo)</option>
                        <option value="B2B & Indian SME">B2B &amp; Indian SME</option>
                        <option value="Exporter & Global Sales">Exporter &amp; Global Sales</option>
                        <option value="Agency & Reseller">Digital Agency / Reseller</option>
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
                    "Confirming Calendar Slot..."
                  ) : (
                    <>
                      Confirm Demo on {selectedDateObj?.dayName}, {selectedDateObj?.monthDay} at {selectedSlot}
                      <ArrowRight className="w-4 h-4" />
                    </>
                  )}
                </Button>
                <p className="text-[11px] text-center text-slate-400 mt-2.5 flex items-center justify-center gap-1.5 font-mono">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                  Instant Google Meet link &amp; WhatsApp reminder dispatched upon booking.
                </p>
              </div>
            </form>
          </div>
        ) : (
          /* Confirmation State */
          <div className="p-8 sm:p-10 text-center space-y-5">
            <div className="w-16 h-16 rounded-full bg-emerald-500/20 border border-emerald-500/40 text-emerald-400 mx-auto flex items-center justify-center shadow-[0_0_30px_rgba(16,185,129,0.4)]">
              <CheckCircle2 className="w-10 h-10" />
            </div>

            <div className="space-y-1.5">
              <h3 className="text-2xl font-bold font-display text-white">
                Demo Session Confirmed! 🎉
              </h3>
              <p className="text-sm text-slate-300 max-w-md mx-auto">
                Thank you, <strong>{name || "Valued Merchant"}</strong>! We have reserved your 1-on-1 strategy call with our product specialist.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-slate-900 border border-white/10 text-left max-w-md mx-auto space-y-2 text-xs">
              <div className="flex items-center justify-between pb-2 border-b border-white/10">
                <span className="text-slate-400">Date &amp; Time:</span>
                <span className="font-bold font-mono text-emerald-400">
                  {selectedDateObj?.dayName}, {selectedDateObj?.monthDay} @ {selectedSlot} IST
                </span>
              </div>
              <div className="flex items-center justify-between pb-2 border-b border-white/10">
                <span className="text-slate-400">Meeting Channel:</span>
                <span className="font-semibold text-white">Google Meet (Link sent via Email)</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-slate-400">WhatsApp Alert:</span>
                <span className="font-mono text-white">{phone || "+91 (Your Phone)"}</span>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 justify-center pt-2">
              <a
                href="https://calendar.google.com"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs shadow-[0_0_20px_rgba(16,185,129,0.4)] transition-all cursor-pointer"
              >
                <CalendarCheck className="w-4 h-4" /> Open in Google Calendar
              </a>
              <Button
                variant="outline"
                onClick={handleReset}
                className="text-xs font-bold rounded-xl border-white/10 bg-slate-900 hover:bg-slate-800 text-white"
              >
                Close Window
              </Button>
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
