import { z } from "zod";

export const applyPartnerSchema = z.object({
  contactName: z.string().min(1, "Contact name required"),
  email: z.string().email("Invalid email"),
  phone: z.string().optional(),
  companyName: z.string().optional(),
  partnerType: z.enum([
    "affiliate",
    "reseller",
    "white_label",
    "api_integration",
  ]),
  message: z.string().optional(),
  referralCode: z.string().optional(),
});

export const publicApplySchema = z.object({
  contactName: z.string().min(1, "Contact name required"),
  email: z.string().email("Invalid email"),
  phone: z.string().optional(),
  companyName: z.string().optional(),
  partnerType: z.enum([
    "affiliate",
    "reseller",
    "white_label",
    "api_integration",
  ]),
  message: z.string().optional(),
  referralCode: z.string().optional(),
  password: z.string().min(8, "Password must be at least 8 characters long."),
});

export const commissionSchema = z.object({
  commissionRate: z.number().min(0).max(100),
  tier: z.enum(["standard", "silver", "gold", "platinum"]).optional(),
  conversationMarkup: z.number().min(0).optional(),
});

export const payoutRequestSchema = z.object({
  amount: z.number().positive("Amount must be positive"),
  paymentMethod: z.string().min(1),
  paymentDetails: z.record(z.unknown()),
  notes: z.string().optional(),
});

export const brandingSchema = z.object({
  brandName: z.string().optional(),
  logoUrl: z.string().optional(),
  faviconUrl: z.string().optional(),
  primaryColor: z.string().optional(),
  supportEmail: z.string().optional(),
  supportPhone: z.string().optional(),
  customDomain: z.string().optional(),
  privacyPolicyUrl: z.string().optional(),
  termsUrl: z.string().optional(),
  conversationMarkup: z.number().min(0).optional(),
});

export const verifyDomainSchema = z.object({
  domain: z.string().min(3, "Domain name required"),
});

export const createSubWorkspaceSchema = z.object({
  name: z.string().min(2, "Workspace name required"),
  adminEmail: z.string().email("Valid admin email required"),
  adminName: z.string().min(2, "Admin name required"),
  initialWalletBalance: z.number().min(0).default(0),
  plan: z.enum(["starter", "growth", "enterprise"]).default("starter"),
});

export const topupSubWorkspaceSchema = z.object({
  amount: z.number().positive("Top-up amount must be positive"),
  description: z.string().optional(),
});

export type ApplyPartnerInput = z.infer<typeof applyPartnerSchema>;
export type PublicApplyInput = z.infer<typeof publicApplySchema>;
export type CommissionInput = z.infer<typeof commissionSchema>;
export type PayoutRequestInput = z.infer<typeof payoutRequestSchema>;
export type BrandingInput = z.infer<typeof brandingSchema>;
export type VerifyDomainInput = z.infer<typeof verifyDomainSchema>;
export type CreateSubWorkspaceInput = z.infer<typeof createSubWorkspaceSchema>;
export type TopupSubWorkspaceInput = z.infer<typeof topupSubWorkspaceSchema>;
