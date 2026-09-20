import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  ChevronDown,
  ArrowRight,
  ShoppingBag,
  Zap,
  Sparkles,
  Menu,
  X,
  Calendar,
  PhoneCall,
  ShieldCheck,
  Flame,
  Truck,
} from "lucide-react";
import { CalendarBookingModal } from "@/components/CalendarBookingModal";

export function PublicNavbar() {
  const location = useLocation();
  const [featuresOpen, setFeaturesOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [calendarModalOpen, setCalendarModalOpen] = useState(false);

  const isActive = (path: string) => location.pathname === path;

  return (
    <>
      <header className="fixed top-3 sm:top-4 left-0 right-0 z-[9999] px-3 sm:px-4 w-full flex justify-center pointer-events-none font-sans">
        <div className="w-full max-w-[1240px] pointer-events-auto relative">
          <div className="bg-slate-950/85 backdrop-blur-2xl h-[60px] sm:h-[66px] shadow-[0_15px_40px_-10px_rgba(0,0,0,0.8)] border border-white/10 rounded-full flex items-center justify-between px-4 sm:px-7 transition-all duration-300">
            {/* Brand Logo */}
            <Link to="/" className="flex items-center gap-2.5 sm:gap-3 group">
              <div className="relative">
                <img
                  src="/home/logo.jpg"
                  alt="Conversio AI"
                  className="h-8 w-8 sm:h-9 sm:w-9 rounded-xl object-cover border border-white/20 shadow-md group-hover:scale-105 transition-transform"
                />
                <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-emerald-400 rounded-full border-2 border-slate-950 animate-pulse" />
              </div>
              <div className="flex flex-col text-left">
                <span className="font-display text-lg sm:text-xl font-extrabold tracking-tight text-white group-hover:text-emerald-400 transition-colors leading-none">
                  Conversio
                </span>
                <span className="text-[8px] sm:text-[9px] font-mono font-bold tracking-widest text-emerald-400 uppercase mt-0.5">
                  RETENTION &amp; SALES AI
                </span>
              </div>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center justify-center gap-7">
              <Link
                to="/"
                className={`text-xs font-semibold uppercase tracking-wider transition-colors ${
                  isActive("/home") || isActive("/")
                    ? "text-emerald-400 font-bold"
                    : "text-slate-300 hover:text-emerald-400"
                }`}
              >
                Home
              </Link>

              {/* Features Mega Menu Dropdown */}
              <div
                className="relative"
                onMouseEnter={() => setFeaturesOpen(true)}
                onMouseLeave={() => setFeaturesOpen(false)}
              >
                <button
                  onClick={() => setFeaturesOpen(!featuresOpen)}
                  className={`text-xs font-semibold uppercase tracking-wider transition-colors flex items-center gap-1 py-4 cursor-pointer ${
                    featuresOpen ? "text-emerald-400 font-bold" : "text-slate-300 hover:text-emerald-400"
                  }`}
                >
                  Features{" "}
                  <ChevronDown
                    className={`w-3.5 h-3.5 transition-transform duration-200 ${
                      featuresOpen ? "rotate-180 text-emerald-400" : ""
                    }`}
                  />
                </button>

                {/* Dropdown Menu */}
                {featuresOpen && (
                  <div className="absolute top-14 left-1/2 -translate-x-1/2 w-[760px] bg-slate-950/95 border border-white/10 rounded-3xl shadow-[0_25px_60px_-15px_rgba(0,0,0,0.8)] backdrop-blur-3xl p-6 grid grid-cols-2 gap-6 text-left font-sans animate-in fade-in zoom-in-95 duration-200 z-[10000]">
                    {/* D2C Retention Column */}
                    <div className="space-y-2 border-r border-white/10 pr-4">
                      <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-[10px] font-mono font-bold">
                        <ShoppingBag className="w-3 h-3" /> CONVERSIO D2C RETENTION
                      </div>
                      <Link
                        to="/d2c-retention"
                        onClick={() => setFeaturesOpen(false)}
                        className="p-3 rounded-2xl hover:bg-white/5 flex items-start gap-3 transition-colors block border border-transparent hover:border-white/5"
                      >
                        <div className="w-8 h-8 rounded-xl bg-emerald-500/10 text-emerald-400 flex items-center justify-center shrink-0">
                          <ShoppingBag className="w-4 h-4" />
                        </div>
                        <div>
                          <h4 className="text-xs font-bold text-white">3-Step Cart Recovery Drip</h4>
                          <p className="text-[11px] text-slate-400 mt-0.5">Automated WhatsApp checkouts</p>
                        </div>
                      </Link>
                      <Link
                        to="/d2c-retention"
                        onClick={() => setFeaturesOpen(false)}
                        className="p-3 rounded-2xl hover:bg-white/5 flex items-start gap-3 transition-colors block border border-transparent hover:border-white/5"
                      >
                        <div className="w-8 h-8 rounded-xl bg-amber-500/10 text-amber-400 flex items-center justify-center shrink-0">
                          <ShieldCheck className="w-4 h-4" />
                        </div>
                        <div>
                          <h4 className="text-xs font-bold text-white">COD-to-Prepaid RTO Shield</h4>
                          <p className="text-[11px] text-slate-400 mt-0.5">Instant ₹50 UPI discount prompt</p>
                        </div>
                      </Link>
                      <Link
                        to="/d2c-retention"
                        onClick={() => setFeaturesOpen(false)}
                        className="p-3 rounded-2xl hover:bg-white/5 flex items-start gap-3 transition-colors block border border-transparent hover:border-white/5"
                      >
                        <div className="w-8 h-8 rounded-xl bg-purple-500/10 text-purple-400 flex items-center justify-center shrink-0">
                          <Truck className="w-4 h-4" />
                        </div>
                        <div>
                          <h4 className="text-xs font-bold text-white">NDR Delivery Rescue</h4>
                          <p className="text-[11px] text-slate-400 mt-0.5">Shiprocket &amp; Delhivery alerts</p>
                        </div>
                      </Link>
                    </div>

                    {/* Outbound Sales Column */}
                    <div className="space-y-2">
                      <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-blue-500/10 border border-blue-500/30 text-blue-400 text-[10px] font-mono font-bold">
                        <Flame className="w-3 h-3" /> CONVERSIO OUTBOUND SALES
                      </div>
                      <Link
                        to="/tri-channel-sales"
                        onClick={() => setFeaturesOpen(false)}
                        className="p-3 rounded-2xl hover:bg-white/5 flex items-start gap-3 transition-colors block border border-transparent hover:border-white/5"
                      >
                        <div className="w-8 h-8 rounded-xl bg-blue-500/10 text-blue-400 flex items-center justify-center shrink-0">
                          <PhoneCall className="w-4 h-4" />
                        </div>
                        <div>
                          <h4 className="text-xs font-bold text-white">Tri-Channel Outreach</h4>
                          <p className="text-[11px] text-slate-400 mt-0.5">WhatsApp + Email + AI Voice</p>
                        </div>
                      </Link>
                      <Link
                        to="/tri-channel-sales"
                        onClick={() => setFeaturesOpen(false)}
                        className="p-3 rounded-2xl hover:bg-white/5 flex items-start gap-3 transition-colors block border border-transparent hover:border-white/5"
                      >
                        <div className="w-8 h-8 rounded-xl bg-orange-500/10 text-orange-400 flex items-center justify-center shrink-0">
                          <Zap className="w-4 h-4" />
                        </div>
                        <div>
                          <h4 className="text-xs font-bold text-white">Stop-on-Reply Engine</h4>
                          <p className="text-[11px] text-slate-400 mt-0.5">Auto-pause drips on prospect reply</p>
                        </div>
                      </Link>
                      <Link
                        to="/tri-channel-sales"
                        onClick={() => setFeaturesOpen(false)}
                        className="p-3 rounded-2xl hover:bg-white/5 flex items-start gap-3 transition-colors block border border-transparent hover:border-white/5"
                      >
                        <div className="w-8 h-8 rounded-xl bg-emerald-500/10 text-emerald-400 flex items-center justify-center shrink-0">
                          <Calendar className="w-4 h-4" />
                        </div>
                        <div>
                          <h4 className="text-xs font-bold text-white">AI Appointment Booking</h4>
                          <p className="text-[11px] text-slate-400 mt-0.5">Outbound voice auto-dialer</p>
                        </div>
                      </Link>
                    </div>
                  </div>
                )}
              </div>

              <Link
                to="/d2c-retention"
                className={`text-xs font-semibold uppercase tracking-wider transition-colors ${
                  isActive("/d2c-retention") || isActive("/retner")
                    ? "text-emerald-400 font-bold"
                    : "text-slate-300 hover:text-emerald-400"
                }`}
              >
                D2C Retention
              </Link>

              <Link
                to="/tri-channel-sales"
                className={`text-xs font-semibold uppercase tracking-wider transition-colors ${
                  isActive("/tri-channel-sales") || isActive("/rapidsales")
                    ? "text-emerald-400 font-bold"
                    : "text-slate-300 hover:text-emerald-400"
                }`}
              >
                Outbound Sales
              </Link>

              <Link
                to="/pricing"
                className={`text-xs font-semibold uppercase tracking-wider transition-colors ${
                  isActive("/pricing")
                    ? "text-emerald-400 font-bold"
                    : "text-slate-300 hover:text-emerald-400"
                }`}
              >
                Pricing
              </Link>

              <Link
                to="/playground"
                className="text-xs font-semibold uppercase tracking-wider text-slate-300 hover:text-emerald-400 transition-colors flex items-center gap-1"
              >
                <Sparkles className="w-3.5 h-3.5 text-emerald-400" /> Playground
              </Link>
            </nav>

            {/* Primary Action Button — GLOWING "BOOK A DEMO" */}
            <div className="flex items-center gap-2.5">
              <Button
                onClick={() => {
                  setMobileMenuOpen(false);
                  setCalendarModalOpen(true);
                }}
                className="bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs h-9 sm:h-10 px-4 sm:px-6 rounded-full shadow-[0_0_20px_rgba(16,185,129,0.35)] hover:shadow-[0_0_28px_rgba(16,185,129,0.55)] flex items-center gap-2 transition-all transform active:scale-95 cursor-pointer border border-emerald-400/30"
              >
                <Calendar className="w-3.5 h-3.5 text-white" />
                <span>Book a Demo</span>
                <ArrowRight className="w-3.5 h-3.5 text-emerald-200" />
              </Button>

              {/* Mobile Hamburger Menu Toggle */}
              <Button
                type="button"
                variant="ghost"
                size="icon"
                aria-label={mobileMenuOpen ? "Close navigation menu" : "Open navigation menu"}
                className="lg:hidden rounded-full text-white hover:bg-white/10 h-9 w-9"
                onClick={() => setMobileMenuOpen((open) => !open)}
              >
                {mobileMenuOpen ? <X className="h-5 w-5 text-white" /> : <Menu className="h-5 w-5 text-white" />}
              </Button>
            </div>
          </div>

          {/* Mobile Drawer Menu */}
          {mobileMenuOpen && (
            <nav
              aria-label="Mobile navigation"
              className="lg:hidden absolute top-[70px] inset-x-0 rounded-3xl border border-white/10 bg-slate-950/95 p-4 shadow-[0_25px_60px_-15px_rgba(0,0,0,0.9)] backdrop-blur-3xl space-y-1 z-[99999]"
            >
              <Link
                to="/"
                onClick={() => setMobileMenuOpen(false)}
                className="block rounded-2xl px-4 py-3 text-sm font-semibold text-slate-200 hover:bg-white/5 hover:text-emerald-400 transition-colors"
              >
                Home
              </Link>
              <Link
                to="/d2c-retention"
                onClick={() => setMobileMenuOpen(false)}
                className="block rounded-2xl px-4 py-3 text-sm font-semibold text-slate-200 hover:bg-white/5 hover:text-emerald-400 transition-colors"
              >
                Conversio D2C WhatsApp Retention
              </Link>
              <Link
                to="/tri-channel-sales"
                onClick={() => setMobileMenuOpen(false)}
                className="block rounded-2xl px-4 py-3 text-sm font-semibold text-slate-200 hover:bg-white/5 hover:text-emerald-400 transition-colors"
              >
                Conversio Tri-Channel Outbound Sales
              </Link>
              <Link
                to="/pricing"
                onClick={() => setMobileMenuOpen(false)}
                className="block rounded-2xl px-4 py-3 text-sm font-semibold text-slate-200 hover:bg-white/5 hover:text-emerald-400 transition-colors"
              >
                Transparent Pricing
              </Link>
              <Link
                to="/playground"
                onClick={() => setMobileMenuOpen(false)}
                className="block rounded-2xl px-4 py-3 text-sm font-semibold text-slate-200 hover:bg-white/5 hover:text-emerald-400 transition-colors"
              >
                Interactive Playground
              </Link>

              <div className="pt-3 border-t border-white/10">
                <Button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    setCalendarModalOpen(true);
                  }}
                  className="w-full bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs h-11 rounded-2xl flex items-center justify-center gap-2 cursor-pointer shadow-[0_0_20px_rgba(16,185,129,0.35)]"
                >
                  <Calendar className="w-4 h-4" /> Book a Demo with Specialist
                </Button>
              </div>
            </nav>
          )}
        </div>
      </header>

      {/* Reusable Calendar Booking Modal */}
      <CalendarBookingModal
        isOpen={calendarModalOpen}
        onClose={() => setCalendarModalOpen(false)}
      />
    </>
  );
}
