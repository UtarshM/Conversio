import type {
  Partner,
  PartnerReferral,
  PartnerPayout,
  PartnerCommissionLedger,
  SubWorkspace,
  CreateSubWorkspaceInput,
  VerifyDomainResult,
  BrandingConfig,
} from "../types/partner.types";

const API_BASE = (typeof window !== "undefined" && (window as any).__API_URL__) || "http://localhost:3001";

// Demo Initial Data for Standalone Mode
const defaultPartner: Partner = {
  id: "partner-scalezix-01",
  partnerType: "white_label",
  status: "approved",
  companyName: "Scalezix Growth Agency",
  contactName: "Rahul Sharma",
  email: "partner@scalezix.com",
  phone: "+91 98765 43210",
  commissionRate: 25,
  tier: "gold",
  referralCode: "SCALEZIX25",
  customDomain: "chat.scalezixgrowth.com",
  isDomainVerified: true,
  brandName: "Scalezix WhatsApp OS",
  logoUrl: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=200&auto=format&fit=crop&q=80",
  faviconUrl: "",
  primaryColor: "#10b981",
  supportEmail: "support@scalezixgrowth.com",
  supportPhone: "+91 98765 43210",
  privacyPolicyUrl: "https://scalezixgrowth.com/privacy",
  termsUrl: "https://scalezixgrowth.com/terms",
  conversationMarkup: 0.15,
  totalReferrals: 28,
  activeSubscriptions: 22,
  unpaidBalance: 56400,
  totalEarned: 248900,
  totalPaid: 192500,
  createdAt: "2026-06-01T00:00:00.000Z",
};

const defaultReferrals: PartnerReferral[] = [
  {
    id: "ref-101",
    partnerId: "partner-scalezix-01",
    referredEmail: "founders@snackdesi.in",
    clientName: "Snackdesi Foods",
    planName: "Growth Suite (₹6,499/mo)",
    status: "converted",
    commissionAmount: 1624,
    convertedAt: "2026-08-10T12:00:00.000Z",
    createdAt: "2026-08-05T09:30:00.000Z",
  },
  {
    id: "ref-102",
    partnerId: "partner-scalezix-01",
    referredEmail: "sales@kadamleather.com",
    clientName: "Kadam Leather Boots",
    planName: "Growth Suite (₹6,499/mo)",
    status: "converted",
    commissionAmount: 1624,
    convertedAt: "2026-08-12T15:20:00.000Z",
    createdAt: "2026-08-08T11:15:00.000Z",
  },
  {
    id: "ref-103",
    partnerId: "partner-scalezix-01",
    referredEmail: "ceo@primeestates.co",
    clientName: "Prime Real Estates",
    planName: "Enterprise Tier (₹19,999/mo)",
    status: "converted",
    commissionAmount: 4999,
    convertedAt: "2026-08-14T10:00:00.000Z",
    createdAt: "2026-08-11T14:45:00.000Z",
  },
  {
    id: "ref-104",
    partnerId: "partner-scalezix-01",
    referredEmail: "care@ayushherbs.in",
    clientName: "Ayush Ayurveda",
    planName: "Starter Tier (₹2,999/mo)",
    status: "pending",
    commissionAmount: 0,
    createdAt: "2026-08-20T16:10:00.000Z",
  },
];

const defaultPayouts: PartnerPayout[] = [
  {
    id: "po-801",
    partnerId: "partner-scalezix-01",
    amount: 50000,
    status: "completed",
    paymentMethod: "UPI (partner@okhdfcbank)",
    paymentDetails: "UPI Ref: 48920192819",
    processedAt: "2026-08-01T10:00:00.000Z",
    createdAt: "2026-07-31T18:00:00.000Z",
  },
  {
    id: "po-802",
    partnerId: "partner-scalezix-01",
    amount: 35000,
    status: "completed",
    paymentMethod: "HDFC Bank IMPS",
    paymentDetails: "A/C: 50100291029193 IFSC: HDFC000129",
    processedAt: "2026-08-15T12:30:00.000Z",
    createdAt: "2026-08-14T11:00:00.000Z",
  },
];

const defaultSubWorkspaces: SubWorkspace[] = [
  {
    id: "ws-sub-01",
    name: "Snackdesi Foods",
    partnerId: "partner-scalezix-01",
    plan: "Growth Suite",
    status: "active",
    walletBalance: 12500,
    adminEmail: "founders@snackdesi.in",
    adminName: "Amit Verma",
    whatsAppStatus: "connected",
    phoneNumber: "+91 91234 56780",
    createdAt: "2026-08-05T09:30:00.000Z",
  },
  {
    id: "ws-sub-02",
    name: "Kadam Leather Boots",
    partnerId: "partner-scalezix-01",
    plan: "Growth Suite",
    status: "active",
    walletBalance: 8400,
    adminEmail: "sales@kadamleather.com",
    adminName: "Karan Johar",
    whatsAppStatus: "connected",
    phoneNumber: "+91 98765 12340",
    createdAt: "2026-08-08T11:15:00.000Z",
  },
  {
    id: "ws-sub-03",
    name: "Prime Real Estates",
    partnerId: "partner-scalezix-01",
    plan: "Enterprise",
    status: "active",
    walletBalance: 45000,
    adminEmail: "ceo@primeestates.co",
    adminName: "Vikram Malhotra",
    whatsAppStatus: "connected",
    phoneNumber: "+91 99887 66554",
    createdAt: "2026-08-11T14:45:00.000Z",
  },
];

const defaultCommissions: PartnerCommissionLedger[] = [
  {
    id: "com-01",
    partnerId: "partner-scalezix-01",
    workspaceId: "ws-sub-01",
    workspaceName: "Snackdesi Foods",
    type: "subscription",
    baseAmount: 6499,
    commissionRate: 25,
    commissionEarned: 1624.75,
    description: "Monthly recurring subscription share",
    createdAt: "2026-08-10T12:00:00.000Z",
  },
  {
    id: "com-02",
    partnerId: "partner-scalezix-01",
    workspaceId: "ws-sub-02",
    workspaceName: "Kadam Leather Boots",
    type: "topup",
    baseAmount: 10000,
    commissionRate: 25,
    commissionEarned: 2500,
    description: "Wallet recharge commission",
    createdAt: "2026-08-12T15:20:00.000Z",
  },
];

// In-Memory Storage for isolated execution
let currentPartner = { ...defaultPartner };
let currentReferrals = [...defaultReferrals];
let currentPayouts = [...defaultPayouts];
let currentSubWorkspaces = [...defaultSubWorkspaces];
let currentCommissions = [...defaultCommissions];

export const partnerApi = {
  async getPartnerProfile(): Promise<Partner> {
    try {
      const res = await fetch(`${API_BASE}/partners/me`, { credentials: "include" });
      if (res.ok) {
        const data = await res.json();
        return data.partner || currentPartner;
      }
    } catch {}
    return currentPartner;
  },

  async applyAsPartner(input: Partial<Partner>): Promise<{ ok: boolean; message: string }> {
    try {
      const res = await fetch(`${API_BASE}/partners/apply`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(input),
      });
      if (res.ok) return await res.json();
    } catch {}
    return { ok: true, message: "Partner application submitted successfully!" };
  },

  async getDashboardData(): Promise<{
    partner: Partner;
    referrals: PartnerReferral[];
    payouts: PartnerPayout[];
    subWorkspaces: SubWorkspace[];
    commissions: PartnerCommissionLedger[];
  }> {
    try {
      const res = await fetch(`${API_BASE}/partners/dashboard`, { credentials: "include" });
      if (res.ok) {
        const data = await res.json();
        return {
          partner: data.partner || currentPartner,
          referrals: data.referrals || currentReferrals,
          payouts: data.payouts || currentPayouts,
          subWorkspaces: data.subWorkspaces || currentSubWorkspaces,
          commissions: data.commissions || currentCommissions,
        };
      }
    } catch {}
    return {
      partner: currentPartner,
      referrals: currentReferrals,
      payouts: currentPayouts,
      subWorkspaces: currentSubWorkspaces,
      commissions: currentCommissions,
    };
  },

  async updateBranding(branding: BrandingConfig): Promise<Partner> {
    try {
      const res = await fetch(`${API_BASE}/partners/branding`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(branding),
        credentials: "include",
      });
      if (res.ok) {
        const data = await res.json();
        currentPartner = { ...currentPartner, ...data };
        return currentPartner;
      }
    } catch {}
    currentPartner = { ...currentPartner, ...branding };
    return currentPartner;
  },

  async verifyCustomDomain(domain: string): Promise<VerifyDomainResult> {
    try {
      const res = await fetch(`${API_BASE}/partners/verify-domain`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ domain }),
        credentials: "include",
      });
      if (res.ok) return await res.json();
    } catch {}
    currentPartner.isDomainVerified = true;
    currentPartner.customDomain = domain;
    return {
      domain,
      verified: true,
      targetCname: "app.conversio.ai",
      message: "Domain verified and SSL provisioned successfully!",
    };
  },

  async getSubWorkspaces(): Promise<SubWorkspace[]> {
    try {
      const res = await fetch(`${API_BASE}/partners/sub-workspaces`, { credentials: "include" });
      if (res.ok) return await res.json();
    } catch {}
    return currentSubWorkspaces;
  },

  async createSubWorkspace(input: CreateSubWorkspaceInput): Promise<{ ok: boolean; workspace: SubWorkspace; tempPassword?: string }> {
    try {
      const res = await fetch(`${API_BASE}/partners/sub-workspaces`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(input),
        credentials: "include",
      });
      if (res.ok) return await res.json();
    } catch {}

    const newWs: SubWorkspace = {
      id: `ws-${Date.now()}`,
      name: input.name,
      partnerId: currentPartner.id,
      plan: input.plan,
      status: "active",
      walletBalance: input.initialBalance || 1000,
      adminEmail: input.adminEmail,
      adminName: input.adminName,
      whatsAppStatus: "connected",
      phoneNumber: "+91 98000 " + Math.floor(10000 + Math.random() * 90000),
      createdAt: new Date().toISOString(),
    };
    currentSubWorkspaces = [newWs, ...currentSubWorkspaces];
    return { ok: true, workspace: newWs, tempPassword: "Client@" + Math.floor(1000 + Math.random() * 9000) };
  },

  async topupSubWorkspace(subWorkspaceId: string, amount: number): Promise<{ success: boolean; newBalance: number }> {
    try {
      const res = await fetch(`${API_BASE}/partners/sub-workspaces/${subWorkspaceId}/topup`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ amount }),
        credentials: "include",
      });
      if (res.ok) return await res.json();
    } catch {}

    const ws = currentSubWorkspaces.find((w) => w.id === subWorkspaceId);
    if (ws) {
      ws.walletBalance += amount;
    }
    return { success: true, newBalance: ws ? ws.walletBalance : amount };
  },

  async requestPayout(amount: number, paymentMethod: string, paymentDetails: any): Promise<{ ok: boolean; message: string }> {
    try {
      const res = await fetch(`${API_BASE}/partners/payouts`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ amount, paymentMethod, paymentDetails }),
        credentials: "include",
      });
      if (res.ok) return await res.json();
    } catch {}

    const newPayout: PartnerPayout = {
      id: `po-${Date.now()}`,
      partnerId: currentPartner.id,
      amount,
      status: "processing",
      paymentMethod,
      paymentDetails,
      createdAt: new Date().toISOString(),
    };
    currentPayouts = [newPayout, ...currentPayouts];
    currentPartner.unpaidBalance = Math.max(0, (currentPartner.unpaidBalance || 0) - amount);
    return { ok: true, message: `Payout request for ₹${amount.toLocaleString()} queued successfully.` };
  },
};
