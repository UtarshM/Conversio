export type PartnerType = "affiliate" | "reseller" | "white_label" | "api_integration";
export type PartnerTier = "standard" | "silver" | "gold" | "platinum";
export type PartnerStatus = "pending" | "approved" | "rejected" | "suspended";
export type ReferralStatus = "pending" | "converted" | "expired";
export type PayoutStatus = "pending" | "processing" | "completed" | "failed";

export interface Partner {
  id: string;
  userId?: string;
  partnerType: PartnerType;
  status: PartnerStatus;
  companyName: string;
  contactName: string;
  email: string;
  phone?: string;
  commissionRate: number; // e.g. 20 for 20%
  tier: PartnerTier;
  referralCode: string;
  customDomain?: string | null;
  isDomainVerified?: boolean;
  brandName?: string | null;
  logoUrl?: string | null;
  faviconUrl?: string | null;
  primaryColor?: string | null;
  supportEmail?: string | null;
  supportPhone?: string | null;
  privacyPolicyUrl?: string | null;
  termsUrl?: string | null;
  conversationMarkup?: number;
  totalReferrals?: number;
  activeSubscriptions?: number;
  unpaidBalance?: number;
  totalEarned: number;
  totalPaid: number;
  createdAt: string;
}

export interface PartnerReferral {
  id: string;
  partnerId: string;
  referredEmail: string;
  referredWorkspaceId?: string;
  clientName?: string;
  planName?: string;
  status: ReferralStatus;
  commissionAmount: number;
  convertedAt?: string;
  createdAt: string;
}

export interface PartnerPayout {
  id: string;
  partnerId: string;
  amount: number;
  status: PayoutStatus;
  paymentMethod: string;
  paymentDetails: Record<string, unknown> | string;
  notes?: string;
  processedAt?: string;
  createdAt: string;
}

export interface PartnerCommissionLedger {
  id: string;
  partnerId: string;
  workspaceId: string;
  workspaceName?: string;
  type: "topup" | "subscription" | "conversation_margin";
  baseAmount: number;
  commissionRate: number;
  commissionEarned: number;
  description?: string;
  createdAt: string;
}

export interface SubWorkspace {
  id: string;
  name: string;
  partnerId: string;
  plan: string;
  status: string;
  walletBalance: number;
  adminEmail: string;
  adminName: string;
  whatsAppStatus: "connected" | "disconnected" | "pending";
  phoneNumber?: string;
  createdAt: string;
}

export interface CreateSubWorkspaceInput {
  name: string;
  adminName: string;
  adminEmail: string;
  plan: "starter" | "growth" | "enterprise";
  initialBalance?: number;
}

export interface VerifyDomainResult {
  domain: string;
  verified: boolean;
  targetCname: string;
  message?: string;
}

export interface BrandingConfig {
  brandName?: string;
  logoUrl?: string;
  faviconUrl?: string;
  primaryColor?: string;
  supportEmail?: string;
  supportPhone?: string;
  customDomain?: string;
  privacyPolicyUrl?: string;
  termsUrl?: string;
  conversationMarkup?: number;
}
