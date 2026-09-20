import { useState } from "react";
import { ChevronDown, HelpCircle, Sparkles } from "lucide-react";

interface FaqItem {
  question: string;
  answer: string;
}

export function RapidFaqSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqs: FaqItem[] = [
    {
      question: "What is Conversio's Unified Autonomous Sales & Retention System?",
      answer:
        "Conversio is an autonomous AI execution engine that unifies multi-channel outreach (WhatsApp, Email, and AI Voice Calling) with D2C checkout retention. It engages prospects, qualifies incoming leads in under 60 seconds, and automatically hands over only high-intent, genuine buyers to your human sales team."
    },
    {
      question: "Does Conversio provide lead databases or cold B2B data?",
      answer:
        "No, Conversio is an execution engine, not a scraped lead database. You connect your own lead sources (Meta Lead Ads, Google Sheets, CSV uploads, or Shopify checkouts), and our platform handles the heavy lifting of contacting, following up, and qualifying those leads across multiple channels automatically."
    },
    {
      question: "How does the 'Stop-on-Reply' feature work?",
      answer:
        "Our system features cross-channel intent detection. The moment a prospect replies to an email, responds to a WhatsApp message, or expresses interest during an AI voice call, the automated sequence instantly halts. This prevents spamming, stops awkward follow-up drips, and immediately notifies your human sales reps."
    },
    {
      question: "Can my sales team see the complete history of a lead's interactions?",
      answer:
        "Yes. Conversio includes a Unified Timeline dashboard. Before your human closers jump on a call, they can review a complete chronological history of email opens, clicks, WhatsApp chat logs, and full audio recordings with text transcripts of the AI Voice call."
    },
    {
      question: "Do the AI Voice calling agents sound robotic?",
      answer:
        "Not at all. Conversio uses state-of-the-art human voice synthesis powered by ElevenLabs and Deepgram. The AI speaks with natural accents (Indian, US, UK), understands buyer intent, and even pauses naturally if the prospect interrupts them mid-sentence."
    },
    {
      question: "Which languages do the AI Voice agents support?",
      answer:
        "Our AI voice agents are multilingual and highly adaptable for Indian and global markets. They converse fluently in English, Hindi, Hinglish, and regional Indian languages as well as international accents."
    },
    {
      question: "Will my WhatsApp number get banned for outreach?",
      answer:
        "No. Conversio strictly uses the official Meta WhatsApp Business Cloud API with pre-approved Meta templates. This ensures your outreach is 100% compliant, verified, and safe, protecting your business phone number from spam flags."
    },
    {
      question: "How does Conversio help reduce Cash on Delivery (COD) RTO losses?",
      answer:
        "The moment a COD order is placed on Shopify or WooCommerce, Conversio's AI Voice agent instantly calls the buyer to verify intent and shipping address in their local dialect before dispatch. It also sends an automated WhatsApp prompt offering an instant ₹50 discount for paying via UPI, shifting 35%+ of COD orders to prepaid."
    },
    {
      question: "How does Conversio help Indian Exporters & Agencies close international deals?",
      answer:
        "Conversio solves the graveyard shift problem. It schedules and dials international buyers based on their local timezone (US, Europe, Gulf) during their normal business hours, delivering pre-qualified global leads to your morning pipeline."
    }
  ];

  return (
    <div className="rounded-[32px] bg-slate-950/80 border border-white/10 p-6 sm:p-10 shadow-2xl backdrop-blur-2xl relative overflow-hidden">
      <div className="text-center max-w-3xl mx-auto mb-12">
        <span className="text-xs font-mono font-bold uppercase tracking-widest text-emerald-400 bg-emerald-500/10 border border-emerald-500/30 px-3.5 py-1 rounded-full">
          FREQUENTLY ASKED QUESTIONS
        </span>
        <h3 className="text-2xl sm:text-4xl font-display font-extrabold text-white tracking-tight mt-4">
          Everything You Need to Know About Autonomous Multi-Channel Outreach
        </h3>
        <p className="text-xs sm:text-base text-slate-400 mt-2">
          Clear answers on compliance, AI voice quality, deliverability, and setup.
        </p>
      </div>

      <div className="max-w-4xl mx-auto space-y-3.5">
        {faqs.map((faq, index) => {
          const isOpen = openIndex === index;
          return (
            <div
              key={index}
              className={`rounded-2xl border transition-all ${
                isOpen
                  ? "bg-slate-900 border-emerald-500/40 shadow-[0_0_20px_rgba(16,185,129,0.15)]"
                  : "bg-slate-900/50 border-white/10 hover:border-white/20"
              }`}
            >
              <button
                type="button"
                onClick={() => setOpenIndex(isOpen ? null : index)}
                className="w-full p-5 sm:p-6 text-left flex items-center justify-between gap-4 cursor-pointer"
              >
                <span className="text-sm sm:text-base font-bold text-white font-display">
                  {faq.question}
                </span>
                <ChevronDown
                  className={`w-5 h-5 text-emerald-400 shrink-0 transition-transform duration-200 ${
                    isOpen ? "rotate-180" : ""
                  }`}
                />
              </button>

              {isOpen && (
                <div className="px-5 sm:px-6 pb-6 text-xs sm:text-sm text-slate-300 leading-relaxed border-t border-white/5 pt-4 animate-in fade-in duration-200">
                  {faq.answer}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
