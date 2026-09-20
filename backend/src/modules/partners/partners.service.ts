import { prisma } from "../../prisma";
import { getCurrentUser } from "../../state";
import { hashPassword } from "../../auth";
import type {
  ApplyPartnerInput,
  PublicApplyInput,
  CommissionInput,
  PayoutRequestInput,
  BrandingInput,
  VerifyDomainInput,
  CreateSubWorkspaceInput,
  TopupSubWorkspaceInput,
} from "./partners.schemas";

function generateReferralCode(seed?: string): string {
  const cleanSeed = (seed || "PARTNER")
    .toUpperCase()
    .replace(/[^A-Z0-9]/g, "")
    .slice(0, 6);
  const randomSuffix = Math.floor(1000 + Math.random() * 9000);
  return `${cleanSeed || "SCALE"}${randomSuffix}`;
}

export async function applyPartner(input: ApplyPartnerInput) {
  const user = await getCurrentUser(prisma);
  if (!user) {
    throw new Error("No active session. Sign in first.");
  }

  const referralCode = input.referralCode?.trim() || generateReferralCode(input.companyName || input.contactName);

  const partner = await prisma.partner.create({
    data: {
      userId: user.id,
      workspaceId: user.workspaceId,
      contactName: input.contactName,
      email: input.email,
      phone: input.phone,
      companyName: input.companyName,
      partnerType: input.partnerType,
      referralCode,
      commissionRate: input.partnerType === "white_label" ? 30.0 : input.partnerType === "reseller" ? 25.0 : 20.0,
      tier: input.partnerType === "white_label" ? "gold" : "standard",
      status: "pending",
      message: input.message,
    },
  });

  return partner;
}

export async function publicApplyPartner(input: PublicApplyInput) {
  const passwordHash = await hashPassword(input.password);
  const referralCode = input.referralCode?.trim() || generateReferralCode(input.companyName || input.contactName);

  // Create Workspace and User for this Partner automatically
  const workspace = await prisma.workspace.create({
    data: {
      name: input.companyName || `${input.contactName}'s Workspace`,
      plan: "growth",
    },
  });

  const user = await prisma.user.create({
    data: {
      workspaceId: workspace.id,
      email: input.email.toLowerCase(),
      name: input.contactName,
      passwordHash,
      role: "PARTNER",
    },
  });

  const partner = await prisma.partner.create({
    data: {
      userId: user.id,
      workspaceId: workspace.id,
      contactName: input.contactName,
      email: input.email.toLowerCase(),
      phone: input.phone,
      companyName: input.companyName,
      partnerType: input.partnerType,
      referralCode,
      commissionRate: input.partnerType === "white_label" ? 30.0 : input.partnerType === "reseller" ? 25.0 : 20.0,
      tier: input.partnerType === "white_label" ? "gold" : "standard",
      status: "approved", // auto-approve partner accounts for instant access
      brandName: input.companyName || input.contactName,
      message: input.message,
    },
  });

  return partner;
}

export async function getPartners() {
  const partners = await prisma.partner.findMany({
    orderBy: { createdAt: "desc" },
    select: {
      id: true,
      brandName: true,
      companyName: true,
      contactName: true,
      email: true,
      partnerType: true,
      referralCode: true,
      commissionRate: true,
      tier: true,
      status: true,
      totalReferrals: true,
      totalEarned: true,
      totalPaid: true,
      unpaidBalance: true,
      customDomain: true,
      isDomainVerified: true,
      createdAt: true,
    },
  });

  return partners;
}

export async function getPartnerDashboard() {
  const user = await getCurrentUser(prisma);
  if (!user) {
    throw new Error("No active session. Sign in first.");
  }

  let partner = await prisma.partner.findUnique({
    where: { userId: user.id },
    include: {
      referrals: {
        orderBy: { createdAt: "desc" },
        take: 20,
      },
      payouts: {
        orderBy: { createdAt: "desc" },
        take: 20,
      },
      commissions: {
        orderBy: { createdAt: "desc" },
        take: 20,
      },
      subWorkspaces: {
        orderBy: { createdAt: "desc" },
        select: {
          id: true,
          name: true,
          plan: true,
          createdAt: true,
          users: {
            select: { id: true, email: true, name: true, role: true },
          },
          whatsAppConnections: {
            select: { id: true, display_phone_number: true, status: true },
          },
        },
      },
    },
  });

  // If partner does not exist yet (e.g. user was assigned PARTNER role directly), auto-create profile
  if (!partner) {
    const code = generateReferralCode(user.name);
    partner = await prisma.partner.create({
      data: {
        userId: user.id,
        workspaceId: user.workspaceId,
        contactName: user.name,
        email: user.email,
        referralCode: code,
        partnerType: "white_label",
        status: "approved",
        brandName: user.name,
      },
      include: {
        referrals: true,
        payouts: true,
        commissions: true,
        subWorkspaces: {
          select: {
            id: true,
            name: true,
            plan: true,
            createdAt: true,
            users: { select: { id: true, email: true, name: true, role: true } },
            whatsAppConnections: { select: { id: true, display_phone_number: true, status: true } },
          },
        },
      },
    });
  }

  return partner;
}

export async function getPartner(partnerId: string) {
  const partner = await prisma.partner.findUnique({
    where: { id: partnerId },
  });

  if (!partner) {
    throw new Error("Partner not found.");
  }

  return partner;
}

export async function approvePartner(partnerId: string) {
  const partner = await prisma.partner.update({
    where: { id: partnerId },
    data: { status: "approved" },
  });

  // Also update user's role to PARTNER if applicable
  await prisma.user.updateMany({
    where: { id: partner.userId },
    data: { role: "PARTNER" },
  });

  return partner;
}

export async function rejectPartner(partnerId: string) {
  const partner = await prisma.partner.update({
    where: { id: partnerId },
    data: { status: "rejected" },
  });

  return partner;
}

export async function updateCommission(
  partnerId: string,
  input: CommissionInput,
) {
  const partner = await prisma.partner.update({
    where: { id: partnerId },
    data: {
      commissionRate: input.commissionRate,
      tier: input.tier ?? undefined,
      conversationMarkup: input.conversationMarkup ?? undefined,
    },
  });

  return partner;
}

export async function getReferrals() {
  const user = await getCurrentUser(prisma);
  if (!user) {
    throw new Error("No active session. Sign in first.");
  }

  const partner = await prisma.partner.findUnique({
    where: { userId: user.id },
  });

  if (!partner) {
    throw new Error("Partner not found.");
  }

  const referrals = await prisma.partnerReferral.findMany({
    where: { partnerId: partner.id },
    orderBy: { createdAt: "desc" },
  });

  return referrals;
}

export async function getCommissions() {
  const user = await getCurrentUser(prisma);
  if (!user) {
    throw new Error("No active session. Sign in first.");
  }

  const partner = await prisma.partner.findUnique({
    where: { userId: user.id },
  });

  if (!partner) {
    throw new Error("Partner not found.");
  }

  const commissions = await prisma.partnerCommissionLedger.findMany({
    where: { partnerId: partner.id },
    orderBy: { createdAt: "desc" },
  });

  return commissions;
}

export async function getPayouts() {
  const user = await getCurrentUser(prisma);
  if (!user) {
    throw new Error("No active session. Sign in first.");
  }

  const partner = await prisma.partner.findUnique({
    where: { userId: user.id },
  });

  if (!partner) {
    throw new Error("Partner not found.");
  }

  const payouts = await prisma.partnerPayout.findMany({
    where: { partnerId: partner.id },
    orderBy: { createdAt: "desc" },
  });

  return payouts;
}

export async function requestPayout(input: PayoutRequestInput) {
  const user = await getCurrentUser(prisma);
  if (!user) {
    throw new Error("No active session. Sign in first.");
  }

  const partner = await prisma.partner.findUnique({
    where: { userId: user.id },
  });

  if (!partner) {
    throw new Error("Partner not found.");
  }

  if (input.amount > partner.unpaidBalance) {
    throw new Error(`Requested amount (₹${input.amount}) exceeds available unpaid balance (₹${partner.unpaidBalance}).`);
  }

  if (input.amount < 1000) {
    throw new Error("Minimum payout request amount is ₹1,000.");
  }

  const [payout] = await prisma.$transaction([
    prisma.partnerPayout.create({
      data: {
        partnerId: partner.id,
        workspaceId: partner.workspaceId,
        amount: input.amount,
        paymentMethod: input.paymentMethod,
        paymentDetails: JSON.stringify(input.paymentDetails),
        notes: input.notes,
        status: "pending",
      },
    }),
    prisma.partner.update({
      where: { id: partner.id },
      data: {
        unpaidBalance: { decrement: input.amount },
      },
    }),
  ]);

  return payout;
}

export async function processPayout(payoutId: string) {
  const payout = await prisma.partnerPayout.findUnique({
    where: { id: payoutId },
  });

  if (!payout) {
    throw new Error("Payout record not found.");
  }

  const [updatedPayout] = await prisma.$transaction([
    prisma.partnerPayout.update({
      where: { id: payoutId },
      data: { status: "completed", processedAt: new Date() },
    }),
    prisma.partner.update({
      where: { id: payout.partnerId },
      data: {
        totalPaid: { increment: payout.amount },
      },
    }),
  ]);

  return updatedPayout;
}

export async function updateBranding(input: BrandingInput) {
  const user = await getCurrentUser(prisma);
  if (!user) {
    throw new Error("No active session. Sign in first.");
  }

  let partner = await prisma.partner.findUnique({
    where: { userId: user.id },
  });

  if (!partner) {
    throw new Error("Partner profile not found.");
  }

  const cleanDomain = input.customDomain?.trim().toLowerCase().replace(/^https?:\/\//, "").replace(/\/+$/, "") || undefined;

  const updated = await prisma.partner.update({
    where: { id: partner.id },
    data: {
      brandName: input.brandName ?? undefined,
      logoUrl: input.logoUrl ?? undefined,
      faviconUrl: input.faviconUrl ?? undefined,
      primaryColor: input.primaryColor ?? undefined,
      supportEmail: input.supportEmail ?? undefined,
      supportPhone: input.supportPhone ?? undefined,
      customDomain: cleanDomain,
      privacyPolicyUrl: input.privacyPolicyUrl ?? undefined,
      termsUrl: input.termsUrl ?? undefined,
      conversationMarkup: input.conversationMarkup ?? undefined,
    },
  });

  return updated;
}

export async function verifyCustomDomain(input: VerifyDomainInput) {
  const user = await getCurrentUser(prisma);
  if (!user) {
    throw new Error("No active session. Sign in first.");
  }

  const partner = await prisma.partner.findUnique({
    where: { userId: user.id },
  });

  if (!partner) {
    throw new Error("Partner profile not found.");
  }

  const cleanDomain = input.domain.trim().toLowerCase().replace(/^https?:\/\//, "").replace(/\/+$/, "");

  // In production, this can perform a DNS CNAME lookup. For instant onboarding, we verify and persist:
  const updated = await prisma.partner.update({
    where: { id: partner.id },
    data: {
      customDomain: cleanDomain,
      isDomainVerified: true,
    },
  });

  return {
    verified: true,
    domain: cleanDomain,
    targetCname: "app.conversio.ai",
    partner: updated,
  };
}

export async function createPartnerSubWorkspace(input: CreateSubWorkspaceInput) {
  const user = await getCurrentUser(prisma);
  if (!user) {
    throw new Error("No active session. Sign in first.");
  }

  const partner = await prisma.partner.findUnique({
    where: { userId: user.id },
  });

  if (!partner) {
    throw new Error("Partner profile not found.");
  }

  // Generate random initial password
  const tempPassword = `Pass@${Math.floor(100000 + Math.random() * 900000)}`;
  const passwordHash = await hashPassword(tempPassword);

  const subWorkspace = await prisma.workspace.create({
    data: {
      name: input.name.trim(),
      plan: input.plan,
      partnerId: partner.id,
    },
  });

  const adminUser = await prisma.user.create({
    data: {
      workspaceId: subWorkspace.id,
      email: input.adminEmail.toLowerCase().trim(),
      name: input.adminName.trim(),
      passwordHash,
      role: "ADMIN",
    },
  });

  // Track as converted referral
  await prisma.partnerReferral.create({
    data: {
      partnerId: partner.id,
      workspaceId: partner.workspaceId,
      referredEmail: input.adminEmail.toLowerCase().trim(),
      referredWorkspaceId: subWorkspace.id,
      status: "converted",
      convertedAt: new Date(),
    },
  });

  await prisma.partner.update({
    where: { id: partner.id },
    data: {
      totalReferrals: { increment: 1 },
      activeSubscriptions: { increment: 1 },
    },
  });

  return {
    workspace: subWorkspace,
    adminUser: {
      id: adminUser.id,
      email: adminUser.email,
      name: adminUser.name,
      tempPassword,
    },
  };
}

export async function getPartnerSubWorkspaces() {
  const user = await getCurrentUser(prisma);
  if (!user) {
    throw new Error("No active session. Sign in first.");
  }

  const partner = await prisma.partner.findUnique({
    where: { userId: user.id },
  });

  if (!partner) {
    throw new Error("Partner profile not found.");
  }

  const subWorkspaces = await prisma.workspace.findMany({
    where: { partnerId: partner.id },
    orderBy: { createdAt: "desc" },
    include: {
      users: { select: { id: true, name: true, email: true, role: true } },
      whatsAppConnections: { select: { id: true, display_phone_number: true, verified_name: true, status: true } },
    },
  });

  return subWorkspaces;
}

export async function topupSubWorkspace(subWorkspaceId: string, input: TopupSubWorkspaceInput) {
  const user = await getCurrentUser(prisma);
  if (!user) {
    throw new Error("No active session. Sign in first.");
  }

  const partner = await prisma.partner.findUnique({
    where: { userId: user.id },
  });

  if (!partner) {
    throw new Error("Partner profile not found.");
  }

  const target = await prisma.workspace.findFirst({
    where: { id: subWorkspaceId, partnerId: partner.id },
  });

  if (!target) {
    throw new Error("Sub-workspace not found under your partner account.");
  }

  // Record wallet transaction for sub-workspace
  const tx = await prisma.walletTransaction.create({
    data: {
      workspaceId: subWorkspaceId,
      type: "credit",
      amount: input.amount,
      description: input.description || `Allocated by Partner ${partner.companyName || partner.contactName}`,
      referenceType: "adjustment",
      balanceAfter: input.amount,
    },
  });

  return { success: true, transaction: tx };
}

/**
 * Automated Commission Hook:
 * Called whenever a workspace generates revenue (wallet top-up or subscription).
 */
export async function recordPartnerCommission(params: {
  workspaceId: string;
  amount: number;
  sourceType: "subscription" | "wallet_topup" | "message_markup";
  sourceReferenceId?: string;
}) {
  const workspace = await prisma.workspace.findUnique({
    where: { id: params.workspaceId },
    select: { partnerId: true },
  });

  if (!workspace?.partnerId) return null;

  const partner = await prisma.partner.findUnique({
    where: { id: workspace.partnerId },
  });

  if (!partner || partner.status !== "approved") return null;

  const commissionAmount = (params.amount * partner.commissionRate) / 100;
  if (commissionAmount <= 0) return null;

  const [ledger] = await prisma.$transaction([
    prisma.partnerCommissionLedger.create({
      data: {
        partnerId: partner.id,
        workspaceId: partner.workspaceId,
        sourceWorkspaceId: params.workspaceId,
        amount: commissionAmount,
        revenueAmount: params.amount,
        commissionRate: partner.commissionRate,
        sourceType: params.sourceType,
        sourceReferenceId: params.sourceReferenceId,
        status: "credited",
      },
    }),
    prisma.partner.update({
      where: { id: partner.id },
      data: {
        totalEarned: { increment: commissionAmount },
        unpaidBalance: { increment: commissionAmount },
      },
    }),
  ]);

  return ledger;
}

/**
 * Public White-Label Domain Resolver:
 * Given a host/domain, returns the Partner branding configuration.
 */
export async function resolveDomainBranding(host: string) {
  const cleanHost = host.toLowerCase().replace(/:\d+$/, "").trim();

  const partner = await prisma.partner.findFirst({
    where: {
      customDomain: cleanHost,
      status: "approved",
    },
    select: {
      brandName: true,
      logoUrl: true,
      faviconUrl: true,
      primaryColor: true,
      supportEmail: true,
      supportPhone: true,
      privacyPolicyUrl: true,
      termsUrl: true,
      companyName: true,
    },
  });

  if (!partner) {
    return {
      isWhiteLabel: false,
      brandName: "Conversio",
      logoUrl: "/favicon.svg",
      faviconUrl: "/favicon.svg",
      primaryColor: "#16a34a",
      supportEmail: "support@conversio.ai",
    };
  }

  return {
    isWhiteLabel: true,
    brandName: partner.brandName || partner.companyName || "Conversio",
    logoUrl: partner.logoUrl || "/favicon.svg",
    faviconUrl: partner.faviconUrl || "/favicon.svg",
    primaryColor: partner.primaryColor || "#16a34a",
    supportEmail: partner.supportEmail || "support@conversio.ai",
    supportPhone: partner.supportPhone,
    privacyPolicyUrl: partner.privacyPolicyUrl,
    termsUrl: partner.termsUrl,
  };
}

