import { useState } from "react";
import {
  Building2,
  GraduationCap,
  ShoppingBag,
  Briefcase,
  Globe,
  CheckCircle2,
  ArrowRight,
  TrendingUp,
  Sparkles
} from "lucide-react";
import { Button } from "@/components/ui/button";

interface IndustryItem {
  id: string;
  name: string;
  icon: any;
  headline: string;
  subheadline: string;
  kpis: { label: string; value: string }[];
  features: string[];
}

export function IndustrySolutions({
  onOpenDemo
}: {
  onOpenDemo: (plan: string) => void;
}) {
  const [selectedIndustry, setSelectedIndustry] = useState<string>("real-estate");

  const industries: IndustryItem[] = [
    {
      id: "real-estate",
      name: "Real Estate & Developers",
      icon: Building2,
      headline: "Instant <60s Call When Buyers Inquire on Properties",
      subheadline: "Real estate buyers contact 4 builders at once. The first one to call books the site visit. Conversio's AI Voice agent dials property inquiries immediately, qualifies budget, and books visits on the spot.",
      kpis: [
        { label: "Speed to Lead", value: "< 42s" },
        { label: "Site Visits Booked", value: "+34%" },
        { label: "No-Show Drop", value: "-45%" }
      ],
      features: [
        "Instant outbound AI Voice call upon Meta 99acres / MagicBricks lead submission",
        "Qualifies buyer budget, BHK preference, and possession timeline",
        "Books site visits directly and sends WhatsApp location pin + brochure PDF",
        "Follows up automatically 2 hours prior to scheduled site visit"
      ]
    },
    {
      id: "education",
      name: "Education & Coaching",
      icon: GraduationCap,
      headline: "Automate Course Inquiries & Demo Class Registrations",
      subheadline: "Never lose prospective students due to delayed counselors. Conversio answers curriculum questions, sends the syllabus on WhatsApp, and reserves seats for upcoming webinar batches.",
      kpis: [
        { label: "Lead Qualification", value: "3.8x" },
        { label: "Webinar Attendance", value: "+58%" },
        { label: "Counselor Time Saved", value: "65%" }
      ],
      features: [
        "Immediate WhatsApp brochure dispatch with fee breakdown & curriculum",
        "AI Voice counseling call to assess student background and target batch",
        "Automated Zoom / Google Meet classroom seat reservation",
        "Multi-touch WhatsApp reminder cadence before batch start date"
      ]
    },
    {
      id: "d2c",
      name: "D2C Brands & E-Commerce",
      icon: ShoppingBag,
      headline: "Recover Carts & Eliminate COD Return (RTO) Losses",
      subheadline: "For high-volume Shopify & WooCommerce brands. Turn abandoned checkouts into completed transactions and confirm COD addresses with an AI Voice call before shipping.",
      kpis: [
        { label: "Cart Recovery", value: "22.4%" },
        { label: "RTO Reduction", value: "-42%" },
        { label: "Prepaid Shift", value: "+38%" }
      ],
      features: [
        "3-step WhatsApp abandoned checkout recovery with pre-filled payment links",
        "AI Voice Agent calls COD customers to confirm delivery address & intent",
        "Offers instant ₹50-₹100 UPI discount to convert COD orders into prepaid",
        "NDR courier rescue integrated with Shiprocket & Delhivery"
      ]
    },
    {
      id: "b2b",
      name: "B2B SaaS & Tech",
      icon: Briefcase,
      headline: "High-Volume Lead Qualification & SDR Prospecting",
      subheadline: "Scale pipeline without hiring an army of tele-callers. Conversio executes tri-channel cadences across WhatsApp, Email, and AI Voice to warm up executive decision-makers.",
      kpis: [
        { label: "Meeting Pipeline", value: "4.2x" },
        { label: "Cost Per Qualified Demo", value: "-68%" },
        { label: "Sequence Stop Rate", value: "100%" }
      ],
      features: [
        "Cross-channel cold email + WhatsApp executive introduction sequences",
        "Stop-on-Reply ensures reps never send robotic follow-ups after client replies",
        "Conversational AI dialer books demos directly onto account executive calendars",
        "Two-way CRM integration with HubSpot, Salesforce, and Zoho"
      ]
    },
    {
      id: "agency",
      name: "Exporters & Global Agencies",
      icon: Globe,
      headline: "Solve the Graveyard Shift with Timezone AI Calling",
      subheadline: "Indian exporters and global agencies no longer need reps working 2:00 AM shifts. Conversio automatically schedules and dials international buyers in the US, Europe, and Middle East according to their local business hours.",
      kpis: [
        { label: "Global Coverage", value: "24/7" },
        { label: "Overseas Conversions", value: "+44%" },
        { label: "Graveyard Shift Cost", value: "₹0" }
      ],
      features: [
        "Timezone-aware dispatch based on prospect country code & area code",
        "Multilingual voice capabilities with native international accents",
        "Instant executive WhatsApp summary dispatched to Indian management",
        "Automated compliance with international telemarketing standards"
      ]
    }
  ];

  const current = industries.find((i) => i.id === selectedIndustry) || industries[0];
  const IconComponent = current.icon;

  return (
    <div className="rounded-[32px] bg-slate-950/80 border border-white/10 p-6 sm:p-10 shadow-2xl backdrop-blur-2xl relative overflow-hidden">
      <div className="text-center max-w-3xl mx-auto mb-10">
        <span className="text-xs font-mono font-bold uppercase tracking-widest text-emerald-400 bg-emerald-500/10 border border-emerald-500/30 px-3.5 py-1 rounded-full">
          TAILORED INDUSTRY BLUEPRINTS
        </span>
        <h3 className="text-2xl sm:text-4xl font-display font-extrabold text-white tracking-tight mt-4">
          Built for Teams That Need Faster Follow-Up &amp; More Outbound Reach
        </h3>
        <p className="text-xs sm:text-base text-slate-400 mt-2">
          Select your industry to see pre-configured blueprints designed for high-velocity revenue.
        </p>

        {/* Industry Tabs */}
        <div className="mt-8 flex flex-wrap justify-center gap-2 p-1.5 rounded-2xl bg-slate-900 border border-white/10 max-w-4xl mx-auto">
          {industries.map((ind) => {
            const TabIcon = ind.icon;
            const isSelected = selectedIndustry === ind.id;
            return (
              <button
                key={ind.id}
                type="button"
                onClick={() => setSelectedIndustry(ind.id)}
                className={`px-4 py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-2 ${
                  isSelected
                    ? "bg-emerald-600 text-white shadow-[0_0_15px_rgba(16,185,129,0.4)]"
                    : "text-slate-400 hover:text-white"
                }`}
              >
                <TabIcon className="w-3.5 h-3.5" />
                <span>{ind.name}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Main Selected Industry Content */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center pt-4">
        <div className="lg:col-span-7 space-y-5">
          <div className="inline-flex items-center gap-2 text-emerald-400 text-xs font-mono font-bold">
            <IconComponent className="w-4 h-4" /> PRE-CONFIGURED BLUEPRINT FOR {current.name.toUpperCase()}
          </div>
          <h4 className="text-xl sm:text-3xl font-bold text-white font-display">
            {current.headline}
          </h4>
          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
            {current.subheadline}
          </p>

          <div className="space-y-3 pt-2">
            {current.features.map((feat, idx) => (
              <div key={idx} className="flex items-start gap-3 text-xs text-slate-200">
                <div className="w-5 h-5 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center shrink-0 mt-0.5">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                </div>
                <span>{feat}</span>
              </div>
            ))}
          </div>

          <div className="pt-4">
            <Button
              onClick={() => onOpenDemo("Growth Tri-Channel")}
              className="bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs h-11 px-8 rounded-xl cursor-pointer shadow-[0_0_15px_rgba(16,185,129,0.4)]"
            >
              Deploy {current.name} Blueprint
            </Button>
          </div>
        </div>

        {/* Right Column: Verified KPI Stats */}
        <div className="lg:col-span-5 rounded-3xl bg-slate-900 border border-white/10 p-7 shadow-2xl space-y-6">
          <span className="text-[11px] font-mono uppercase tracking-widest text-slate-400 font-bold block">
            VERIFIED INDUSTRY IMPACT
          </span>

          <div className="space-y-4">
            {current.kpis.map((kpi, idx) => (
              <div key={idx} className="p-4 rounded-2xl bg-slate-950 border border-white/10 flex items-center justify-between">
                <span className="text-xs font-medium text-slate-300">{kpi.label}</span>
                <span className="text-2xl font-mono font-extrabold text-emerald-400">{kpi.value}</span>
              </div>
            ))}
          </div>

          <div className="p-4 rounded-2xl bg-emerald-950/40 border border-emerald-500/30 text-xs font-mono text-emerald-300 flex items-center gap-3">
            <TrendingUp className="w-5 h-5 text-emerald-400 shrink-0" />
            <span>Out-of-the-box templates &amp; workflows ready to deploy on Day 1.</span>
          </div>
        </div>
      </div>
    </div>
  );
}
