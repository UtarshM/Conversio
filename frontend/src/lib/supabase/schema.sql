-- Conversio Multi-Tenant & Multi-Industry WhatsApp Platform Schema
-- PostgreSQL + Supabase RLS Multi-Tenant Architecture

-- 1. WORKSPACES (Tenants)
CREATE TABLE IF NOT EXISTS public.workspaces (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  industry TEXT NOT NULL DEFAULT 'd2c', -- d2c, real_estate, healthcare, education, services
  country TEXT NOT NULL DEFAULT 'IN',
  currency TEXT NOT NULL DEFAULT 'INR',
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- 2. WORKSPACE MEMBERS (Users & Roles)
CREATE TABLE IF NOT EXISTS public.workspace_members (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  workspace_id UUID NOT NULL REFERENCES public.workspaces(id) ON DELETE CASCADE,
  user_id UUID NOT NULL,
  email TEXT NOT NULL,
  role TEXT NOT NULL DEFAULT 'agent', -- owner, admin, agent, partner
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  UNIQUE(workspace_id, user_id)
);

-- 3. WABA CONNECTIONS (WhatsApp Business Accounts & Tokens)
CREATE TABLE IF NOT EXISTS public.waba_connections (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  workspace_id UUID NOT NULL REFERENCES public.workspaces(id) ON DELETE CASCADE,
  waba_id TEXT NOT NULL,
  phone_number_id TEXT NOT NULL,
  display_phone_number TEXT NOT NULL,
  display_name TEXT NOT NULL,
  quality_rating TEXT NOT NULL DEFAULT 'GREEN',
  messaging_tier TEXT NOT NULL DEFAULT 'TIER_250', -- TIER_250, TIER_1K, TIER_10K, UNLIMITED
  encrypted_access_token TEXT NOT NULL,
  business_verification_status TEXT NOT NULL DEFAULT 'VERIFIED',
  oba_status TEXT NOT NULL DEFAULT 'NONE', -- green tick status
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- 4. CONTACTS & AUDIENCE SEGMENTS (Multi-Industry Contacts & Consent)
CREATE TABLE IF NOT EXISTS public.contacts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  workspace_id UUID NOT NULL REFERENCES public.workspaces(id) ON DELETE CASCADE,
  phone TEXT NOT NULL,
  name TEXT,
  email TEXT,
  opt_in BOOLEAN NOT NULL DEFAULT true,
  opt_in_source TEXT DEFAULT 'website_checkout',
  tags TEXT[] DEFAULT '{}',
  industry_metadata JSONB DEFAULT '{}', -- D2C cart data, Real Estate property preferences, Clinic appointments
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- 5. TEMPLATES (Meta WhatsApp Approved Templates)
CREATE TABLE IF NOT EXISTS public.templates (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  workspace_id UUID NOT NULL REFERENCES public.workspaces(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  category TEXT NOT NULL DEFAULT 'MARKETING', -- MARKETING, UTILITY, AUTHENTICATION
  language TEXT NOT NULL DEFAULT 'en_US',
  header_type TEXT DEFAULT 'NONE',
  body_text TEXT NOT NULL,
  footer_text TEXT,
  buttons JSONB DEFAULT '[]',
  meta_status TEXT NOT NULL DEFAULT 'APPROVED', -- PENDING, APPROVED, REJECTED
  rejection_reason TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- 6. CAMPAIGNS & BROADCASTS
CREATE TABLE IF NOT EXISTS public.campaigns (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  workspace_id UUID NOT NULL REFERENCES public.workspaces(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  template_id UUID REFERENCES public.templates(id),
  industry TEXT NOT NULL DEFAULT 'd2c',
  status TEXT NOT NULL DEFAULT 'DRAFT', -- DRAFT, SCHEDULED, SENDING, DELIVERED, FAILED
  recipients_count INT NOT NULL DEFAULT 0,
  delivered_count INT NOT NULL DEFAULT 0,
  read_count INT NOT NULL DEFAULT 0,
  estimated_cost NUMERIC(10,2) NOT NULL DEFAULT 0.00,
  scheduled_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- 7. CONVERSATIONS & INBOX MESSAGES
CREATE TABLE IF NOT EXISTS public.conversations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  workspace_id UUID NOT NULL REFERENCES public.workspaces(id) ON DELETE CASCADE,
  contact_phone TEXT NOT NULL,
  contact_name TEXT,
  status TEXT NOT NULL DEFAULT 'open', -- open, pending, resolved
  assigned_agent_id UUID,
  last_user_message_at TIMESTAMPTZ NOT NULL DEFAULT now(), -- for 24h session window rule
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS public.messages (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  conversation_id UUID NOT NULL REFERENCES public.conversations(id) ON DELETE CASCADE,
  direction TEXT NOT NULL DEFAULT 'outbound', -- inbound, outbound
  sender_type TEXT NOT NULL DEFAULT 'agent', -- agent, system, bot, user
  message_type TEXT NOT NULL DEFAULT 'text', -- text, template, image, document, interactive
  body TEXT NOT NULL,
  delivery_status TEXT NOT NULL DEFAULT 'sent', -- sent, delivered, read, failed
  cost NUMERIC(6,2) DEFAULT 0.00,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- 8. WALLET LEDGER & BILLING
CREATE TABLE IF NOT EXISTS public.wallet_ledger (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  workspace_id UUID NOT NULL REFERENCES public.workspaces(id) ON DELETE CASCADE,
  amount NUMERIC(10,2) NOT NULL,
  type TEXT NOT NULL, -- TOPUP, DEDUCTION, REFUND, COMMISSION
  description TEXT NOT NULL,
  reference_id TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- ROW LEVEL SECURITY (RLS) POLICIES
ALTER TABLE public.workspaces ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.waba_connections ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.contacts ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.templates ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.campaigns ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.conversations ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.messages ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.wallet_ledger ENABLE ROW LEVEL SECURITY;
