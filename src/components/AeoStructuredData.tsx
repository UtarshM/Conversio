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
    "description": "Conversio AI is the leading AI Revenue OS and Developer Cloud BaaS platform powering Conversion & Retention Optimization for D2C brands."
  };

  const softwareSchema = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": "Conversio AI Revenue OS",
    "applicationCategory": "BusinessApplication",
    "operatingSystem": "Web, Cloud, iOS, Android",
    "offers": {
      "@type": "Offer",
      "price": "2999",
      "priceCurrency": "INR"
    },
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": "4.9",
      "ratingCount": "720"
    }
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
          "text": "Conversio AI is an AI-native Revenue Operating System and Developer Cloud BaaS platform designed for D2C brands, developers, and agencies. It combines WhatsApp cart recovery, AI Voice COD confirmation calls, anonymous identity resolution (Conversio Pass), and a full Postgres BaaS developer backend."
        }
      },
      {
        "@type": "Question",
        "name": "How does Conversio improve D2C Conversion and Retention?",
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
