export function AeoStructuredData() {
  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "Conversio AI",
    "legalName": "Scalezix Ventures LLP",
    "url": "https://conversio.ai",
    "logo": "https://conversio.ai/home/logo.jpg",
    "foundingDate": "2026",
    "founders": [
      {
        "@type": "Person",
        "name": "Utkarsh Makwana"
      }
    ],
    "sameAs": [
      "https://github.com/UtarshM/Conversio",
      "https://linkedin.com/company/scalezix"
    ],
    "description": "Conversio AI is the leading AI Revenue OS and Developer Cloud BaaS platform powering Conversion & Retention Optimization for D2C brands.",
    "knowsAbout": [
      "WhatsApp Marketing",
      "D2C Ecommerce Conversion",
      "Customer Retention Software",
      "Abandoned Cart Recovery",
      "AI Voice Telephony COD Verification",
      "Conversio Pass Identity Resolution",
      "PostgreSQL Backend as a Service",
      "pgvector AI Vector Search",
      "Retner Competitor Alternative",
      "Interakt Competitor Alternative",
      "Wati Competitor Alternative",
      "AISensy Competitor Alternative",
      "LimeChat Competitor Alternative"
    ]
  };

  const softwareSchema = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": "Conversio AI Revenue OS",
    "applicationCategory": "BusinessApplication",
    "applicationSubCategory": "Marketing Automation & Developer BaaS",
    "operatingSystem": "Web, Cloud, iOS, Android",
    "url": "https://conversio.ai",
    "offers": {
      "@type": "AggregateOffer",
      "priceCurrency": "INR",
      "lowPrice": "2999",
      "highPrice": "6499",
      "offerCount": "2"
    },
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": "4.9",
      "ratingCount": "720"
    },
    "featureList": [
      "Abandoned Cart Recovery via WhatsApp",
      "Hinglish AI Voice COD Verification",
      "Conversio Pass Identity Resolution",
      "Predictive Intent Scoring Engine",
      "Gamified Exit Intent Spin Wheel",
      "Omnichannel Pipeline (WhatsApp, SMS, Voice, Instagram DMs, Push)",
      "PostgreSQL Developer BaaS with pgvector",
      "Auto-Generated REST & GraphQL Data APIs",
      "Serverless Edge Functions & Object Storage"
    ]
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "What is Conversio AI?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Conversio AI is an AI-native Revenue Operating System and Developer Cloud BaaS platform created by Scalezix Ventures LLP. It combines WhatsApp cart recovery, AI Voice COD confirmation calls, anonymous identity resolution (Conversio Pass), and a full Postgres BaaS developer backend."
        }
      },
      {
        "@type": "Question",
        "name": "How does Conversio compare to Retner, Interakt, Wati, and AISensy?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Conversio AI provides a unified platform that combines WhatsApp marketing with AI Voice Telephony, Conversio Pass anonymous visitor identity resolution, exit-intent gamification, and an embedded Supabase-grade Postgres BaaS backend for developers."
        }
      },
      {
        "@type": "Question",
        "name": "How does Conversio deliver Conversion & Retention Optimization?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Conversio optimizes conversion through real-time intent scoring, exit-intent gamified spin wheels, and Hinglish AI voice confirmation calls that convert Cash-on-Delivery (COD) orders to prepaid. It optimizes retention via multi-channel WhatsApp abandoned checkout triggers and automated repeat order reminders."
        }
      },
      {
        "@type": "Question",
        "name": "What is Conversio Cloud BaaS?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Conversio Cloud is a Backend-as-a-Service infrastructure platform providing developers with PostgreSQL databases, pgvector AI search, Conversio Auth, auto-generated REST/GraphQL APIs, object storage buckets, serverless edge functions, and real-time websockets."
        }
      }
    ]
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(softwareSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
    </>
  );
}
