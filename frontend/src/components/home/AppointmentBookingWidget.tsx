import { useState } from "react";
import {
  Calendar,
  CalendarCheck,
  Clock,
  CheckCircle2,
  Bot,
  MessageSquare,
  Mail,
  Video,
  Sparkles,
  ArrowRight
} from "lucide-react";
import { Button } from "@/components/ui/button";

export function AppointmentBookingWidget({
  onOpenDemo
}: {
  onOpenDemo: (plan: string) => void;
}) {
  const [selectedDate, setSelectedDate] = useState<string>("Tomorrow");
  const [selectedSlot, setSelectedSlot] = useState<string>("11:30 AM");
  const [bookingConfirmed, setBookingConfirmed] = useState<boolean>(false);

  const availableDates = ["Today", "Tomorrow", "Wednesday", "Thursday"];
  const availableSlots = ["10:00 AM", "11:30 AM", "02:30 PM", "04:15 PM", "06:00 PM"];

  return (
    <div className="rounded-[32px] bg-slate-950/80 border border-white/10 p-6 sm:p-10 shadow-2xl backdrop-blur-2xl relative overflow-hidden">
      <div className="absolute top-0 right-10 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
        {/* Left Column: Feature Highlights */}
        <div className="lg:col-span-6 space-y-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-mono font-bold">
            <CalendarCheck className="w-3.5 h-3.5" /> 24x7 AI APPOINTMENT BOOKING
          </div>

          <h3 className="text-2xl sm:text-4xl font-display font-extrabold text-white tracking-tight leading-tight">
            Let AI Handle Your Meeting Bookings on Autopilot
          </h3>

          <p className="text-xs sm:text-base text-slate-400 leading-relaxed">
            Your conversational AI Voice Agent automatically qualifies prospects on phone calls, checks live sales rep calendar availability, and locks in high-intent meetings with zero back-and-forth friction.
          </p>

          {/* 6 Capability Checkmarks from RapidSales */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 pt-2">
            {[
              { title: "AI Qualifies Leads", desc: "Filters low-intent and spam inquiries instantly" },
              { title: "Books Calendar Slots", desc: "Syncs directly with Google Meet & Outlook" },
              { title: "Instant Meeting Confirm", desc: "Dispatches calendar invite & meeting link" },
              { title: "WhatsApp Reminders", desc: "Sends 1-click reschedule prompt to cut no-shows" },
              { title: "Executive Email Alert", desc: "Notifies human closer with call audio & summary" },
              { title: "24×7 Availability", desc: "Never loses a late-night or weekend prospect" }
            ].map((item, idx) => (
              <div
                key={idx}
                className="p-3.5 rounded-2xl bg-slate-900/70 border border-white/10 flex items-start gap-3 hover:border-emerald-500/30 transition-all"
              >
                <div className="w-6 h-6 rounded-lg bg-emerald-500/20 text-emerald-400 flex items-center justify-center shrink-0 mt-0.5">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-white">{item.title}</h4>
                  <p className="text-[10px] text-slate-400 mt-0.5">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="pt-2">
            <Button
              onClick={() => onOpenDemo("Growth Tri-Channel")}
              className="bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs h-12 px-8 rounded-full cursor-pointer shadow-[0_0_20px_rgba(16,185,129,0.4)] transition-all"
            >
              Test AI Booking for Your Team
            </Button>
          </div>
        </div>

        {/* Right Column: Live Calendar & Confirmation Simulator */}
        <div className="lg:col-span-6 rounded-3xl bg-slate-900 border border-white/10 p-6 sm:p-7 shadow-2xl relative">
          <div className="flex items-center justify-between pb-4 border-b border-white/10">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center">
                <Bot className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-sm font-bold text-white">Conversio AI Voice Scheduler</h4>
                <p className="text-[10px] font-mono text-emerald-400">● Live Calendar Sync Active</p>
              </div>
            </div>

            <span className="text-[10px] font-mono px-2.5 py-1 rounded bg-white/5 border border-white/10 text-slate-300">
              Duration: 20 Mins
            </span>
          </div>

          {/* Date Picker */}
          <div className="my-5">
            <label className="text-[11px] font-mono uppercase tracking-wider text-slate-400 block mb-2">
              Select Demo Date
            </label>
            <div className="grid grid-cols-4 gap-2">
              {availableDates.map((date) => (
                <button
                  key={date}
                  type="button"
                  onClick={() => setSelectedDate(date)}
                  className={`py-2 px-3 rounded-xl text-xs font-bold transition-all cursor-pointer border text-center ${
                    selectedDate === date
                      ? "bg-emerald-600 border-emerald-500 text-white shadow-[0_0_15px_rgba(16,185,129,0.3)]"
                      : "bg-slate-950 border-white/10 text-slate-400 hover:text-white"
                  }`}
                >
                  {date}
                </button>
              ))}
            </div>
          </div>

          {/* Slot Picker */}
          <div className="mb-6">
            <label className="text-[11px] font-mono uppercase tracking-wider text-slate-400 block mb-2">
              Available AI Host Slots
            </label>
            <div className="grid grid-cols-3 sm:grid-cols-5 gap-2">
              {availableSlots.map((slot) => (
                <button
                  key={slot}
                  type="button"
                  onClick={() => setSelectedSlot(slot)}
                  className={`py-2 px-2.5 rounded-xl text-xs font-mono transition-all cursor-pointer border text-center ${
                    selectedSlot === slot
                      ? "bg-blue-600 border-blue-500 text-white shadow-[0_0_15px_rgba(59,130,246,0.3)] font-bold"
                      : "bg-slate-950 border-white/10 text-slate-400 hover:text-white"
                  }`}
                >
                  {slot}
                </button>
              ))}
            </div>
          </div>

          {/* Action Button */}
          <Button
            onClick={() => setBookingConfirmed(true)}
            className="w-full bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs h-11 rounded-xl cursor-pointer shadow-[0_0_20px_rgba(16,185,129,0.4)] transition-all mb-4"
          >
            {bookingConfirmed ? "✓ Slot Secured!" : `Simulate AI Booking for ${selectedDate} at ${selectedSlot}`}
          </Button>

          {/* Instant Multi-Channel Reminder Receipt Preview */}
          {bookingConfirmed && (
            <div className="p-4 rounded-2xl bg-slate-950 border border-emerald-500/40 space-y-3 animate-in fade-in duration-300">
              <div className="flex items-center justify-between text-xs border-b border-white/10 pb-2">
                <span className="font-bold text-emerald-400 font-mono text-[11px] flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5" /> CALENDAR DISPATCH TRIGGERED
                </span>
                <span className="text-[9px] font-mono text-slate-400">00:01s Latency</span>
              </div>

              <div className="text-xs text-slate-200 space-y-1.5 font-mono text-[11px]">
                <div className="flex items-center gap-2 text-emerald-300">
                  <MessageSquare className="w-3.5 h-3.5 shrink-0" />
                  <span><strong>WhatsApp Sent:</strong> "Confirmed for {selectedDate} {selectedSlot} with Arya. Need to reschedule? Reply RESCHEDULE"</span>
                </div>
                <div className="flex items-center gap-2 text-blue-300">
                  <Mail className="w-3.5 h-3.5 shrink-0" />
                  <span><strong>Email Calendar Invite:</strong> Google Meet URL dispatched with .ics calendar attachment</span>
                </div>
                <div className="flex items-center gap-2 text-purple-300">
                  <Video className="w-3.5 h-3.5 shrink-0" />
                  <span><strong>Meeting Room:</strong> Google Meet encrypted link ready</span>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
