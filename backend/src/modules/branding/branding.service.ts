import { prisma } from "../../prisma";
import { resolveTrackedLink } from "../links/links.service";

// Legacy static short links kept for backward compatibility. New links live in
// the TrackedLink table and are workspace-scoped (resolved by ?wid=).
const SHORT_LINKS: Record<string, string> = {
  "join-group": "https://chat.whatsapp.com/example-group-id",
};

export async function resolveShortLink(
  code: string,
  ipAddress: string | undefined,
  userAgent: string | undefined,
  contactId?: string,
  workspaceId?: string,
) {
  // Workspace-scoped tracked link takes precedence: it logs the click and bumps
  // the link's clickCount in one place (links.service).
  if (workspaceId) {
    const tracked = await resolveTrackedLink(
      workspaceId,
      code,
      { ipAddress, userAgent, contactId },
      prisma,
    );
    if (tracked) return tracked;
  }

  const targetUrl = SHORT_LINKS[code];
  if (!targetUrl) {
    throw new Error("Link not found.");
  }

  if (workspaceId) {
    prisma.linkClick
      .create({
        data: {
          workspaceId,
          contactId: contactId || null,
          linkCode: code,
          originalUrl: targetUrl,
          ipAddress,
          userAgent,
        },
      })
      .catch((err) => console.error("Failed to log link click", err));
  }

  return targetUrl;
}

export async function getBrandingByRef(ref: string) {
  const partner = await prisma.partner.findFirst({
    where: {
      OR: [{ referralCode: ref }, { id: ref }],
      status: "approved",
    },
    select: {
      brandName: true,
      logoUrl: true,
      faviconUrl: true,
      primaryColor: true,
      supportEmail: true,
      supportPhone: true,
      customDomain: true,
    },
  });

  if (!partner) {
    throw new Error("Branding not found.");
  }

  return partner;
}

export async function getBrandingForHost(host: string) {
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
      customDomain: true,
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
    customDomain: partner.customDomain,
  };
}
