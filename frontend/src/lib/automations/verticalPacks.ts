// Multi-Industry WhatsApp Automation & Vertical Template Packs

export interface IndustryPack {
  id: string;
  name: string;
  description: string;
  iconName: string;
  templates: {
    name: string;
    category: "MARKETING" | "UTILITY" | "AUTHENTICATION";
    body: string;
  }[];
  workflows: {
    trigger: string;
    action: string;
    description: string;
  }[];
}

export const VERTICAL_PACKS: Record<string, IndustryPack> = {
  d2c: {
    id: "d2c",
    name: "D2C & E-Commerce Pack",
    description: "Automate abandoned cart recovery, COD confirmation calls, and repeat orders.",
    iconName: "ShoppingCart",
    templates: [
      {
        name: "cart_recovery_v1",
        category: "MARKETING",
        body: "Hey {{1}}! You left items in your cart at {{2}}. Complete your order now and enjoy Flat 15% OFF using code RECOVER15. Tap below to buy!",
      },
      {
        name: "cod_verification_call",
        category: "UTILITY",
        body: "Hi {{1}}, please confirm your Cash-On-Delivery order #{{2}} of ₹{{3}}. Reply 1 to Confirm or 2 to Cancel.",
      },
    ],
    workflows: [
      { trigger: "cart_abandoned", action: "whatsapp_template_discount", description: "Send WhatsApp cart recovery message 30 mins after checkout abandonment." },
      { trigger: "cod_order_placed", action: "ai_voice_verification", description: "Trigger Hinglish AI Voice call to verify COD address and offer 10% prepaid discount." },
    ],
  },
  real_estate: {
    id: "real_estate",
    name: "Real Estate & Property Pack",
    description: "Lead capture, site-visit reminders, and property inventory broadcasts.",
    iconName: "Building2",
    templates: [
      {
        name: "site_visit_reminder",
        category: "UTILITY",
        body: "Hi {{1}}, your site visit for {{2}} is scheduled for {{3}} at {{4}}. Reply YES to confirm or RESCHEDULE to change time.",
      },
      {
        name: "new_property_launch",
        category: "MARKETING",
        body: "Exclusive Launch: Premium 3BHK Apartments at {{1}} starting @ ₹{{2}} Cr. Tap to request digital brochure and floor plans!",
      },
    ],
    workflows: [
      { trigger: "lead_form_submitted", action: "send_property_brochure", description: "Auto-send property PDF brochure via WhatsApp upon inquiry." },
      { trigger: "site_visit_24h_before", action: "whatsapp_reminder", description: "Dispatch site-visit directions and agent contact 24h prior." },
    ],
  },
  healthcare: {
    id: "healthcare",
    name: "Healthcare & Clinics Pack",
    description: "Appointment reminders, prescription follow-ups, and lab report notifications.",
    iconName: "Stethoscope",
    templates: [
      {
        name: "appointment_reminder_v1",
        category: "UTILITY",
        body: "Hello {{1}}, your appointment with Dr. {{2}} is confirmed for tomorrow {{3}} at {{4}}. Please arrive 10 mins prior.",
      },
      {
        name: "lab_report_ready",
        category: "UTILITY",
        body: "Hi {{1}}, your diagnostic lab test results (#{{2}}) are now ready. Download secure PDF report via the link below.",
      },
    ],
    workflows: [
      { trigger: "appointment_booked", action: "calendar_invite_whatsapp", description: "Send booking confirmation and clinic Google Maps location." },
    ],
  },
  education: {
    id: "education",
    name: "Education & Coaching Pack",
    description: "Admission inquiries, batch reminders, and fee notifications.",
    iconName: "GraduationCap",
    templates: [
      {
        name: "admission_inquiry_reply",
        category: "UTILITY",
        body: "Hi {{1}}, thank you for inquiring about {{2}} batch at {{3}}. Download course syllabus and scholarship info here: {{4}}",
      },
    ],
    workflows: [
      { trigger: "inquiry_submitted", action: "auto_counselor_assignment", description: "Assign lead to counselor and send WhatsApp intro." },
    ],
  },
};
