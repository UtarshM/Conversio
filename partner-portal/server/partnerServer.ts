import express from "express";
import cors from "cors";

const app = express();
const PORT = process.env.PORT || 3002;

app.use(cors({ origin: true, credentials: true }));
app.use(express.json());

// In-Memory storage for standalone partner server
let partner = {
  id: "partner-scalezix-01",
  companyName: "Scalezix Growth Agency",
  contactName: "Rahul Sharma",
  email: "partner@scalezix.com",
  commissionRate: 25,
  tier: "gold",
  referralCode: "SCALEZIX25",
  customDomain: "chat.scalezixgrowth.com",
  isDomainVerified: true,
  brandName: "Scalezix WhatsApp OS",
  logoUrl: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=200&auto=format&fit=crop&q=80",
  primaryColor: "#10b981",
  supportEmail: "support@scalezixgrowth.com",
  conversationMarkup: 0.15,
  unpaidBalance: 56400,
  totalEarned: 248900,
  totalPaid: 192500,
  totalReferrals: 28,
  activeSubscriptions: 22,
};

let subWorkspaces: any[] = [
  {
    id: "ws-sub-01",
    name: "Snackdesi Foods",
    plan: "Growth Suite",
    walletBalance: 12500,
    adminEmail: "founders@snackdesi.in",
    adminName: "Amit Verma",
    whatsAppStatus: "connected",
    phoneNumber: "+91 91234 56780",
    createdAt: new Date().toISOString(),
  },
];

let referrals: any[] = [
  {
    id: "ref-101",
    referredEmail: "founders@snackdesi.in",
    clientName: "Snackdesi Foods",
    planName: "Growth Suite (₹6,499/mo)",
    status: "converted",
    commissionAmount: 1624,
    createdAt: new Date().toISOString(),
  },
];

let payouts: any[] = [
  {
    id: "po-801",
    amount: 50000,
    status: "completed",
    paymentMethod: "UPI (partner@okhdfcbank)",
    createdAt: new Date().toISOString(),
  },
];

let commissions: any[] = [
  {
    id: "com-01",
    workspaceName: "Snackdesi Foods",
    type: "subscription",
    baseAmount: 6499,
    commissionRate: 25,
    commissionEarned: 1624.75,
    description: "Monthly recurring subscription share",
    createdAt: new Date().toISOString(),
  },
];

// Routes
app.get("/health", (req, res) => {
  res.json({ status: "healthy", service: "Conversio Partner & White-Label Gateway" });
});

app.get("/partners/me", (req, res) => {
  res.json({ partner });
});

app.post("/partners/apply", (req, res) => {
  res.json({ ok: true, message: "Application received. Access granted." });
});

app.get("/partners/dashboard", (req, res) => {
  res.json({ partner, referrals, payouts, subWorkspaces, commissions });
});

app.patch("/partners/branding", (req, res) => {
  partner = { ...partner, ...req.body };
  res.json(partner);
});

app.post("/partners/verify-domain", (req, res) => {
  const { domain } = req.body;
  partner.customDomain = domain;
  partner.isDomainVerified = true;
  res.json({ domain, verified: true, targetCname: "app.conversio.ai", message: "Domain verified & SSL active." });
});

app.get("/partners/sub-workspaces", (req, res) => {
  res.json(subWorkspaces);
});

app.post("/partners/sub-workspaces", (req, res) => {
  const { name, adminName, adminEmail, plan, initialBalance } = req.body;
  const newWs = {
    id: `ws-${Date.now()}`,
    name,
    adminName,
    adminEmail,
    plan: plan || "growth",
    walletBalance: Number(initialBalance) || 2000,
    whatsAppStatus: "connected",
    phoneNumber: "+91 98000 " + Math.floor(10000 + Math.random() * 90000),
    createdAt: new Date().toISOString(),
  };
  subWorkspaces.unshift(newWs);
  res.json({ ok: true, workspace: newWs, tempPassword: "Pass@" + Math.floor(1000 + Math.random() * 9000) });
});

app.post("/partners/sub-workspaces/:id/topup", (req, res) => {
  const ws = subWorkspaces.find((w) => w.id === req.params.id);
  const amount = Number(req.body.amount) || 0;
  if (ws) ws.walletBalance += amount;
  res.json({ success: true, newBalance: ws ? ws.walletBalance : amount });
});

app.post("/partners/payouts", (req, res) => {
  const { amount, paymentMethod, paymentDetails } = req.body;
  const newPo = {
    id: `po-${Date.now()}`,
    amount: Number(amount),
    status: "processing",
    paymentMethod,
    paymentDetails,
    createdAt: new Date().toISOString(),
  };
  payouts.unshift(newPo);
  partner.unpaidBalance = Math.max(0, partner.unpaidBalance - Number(amount));
  res.json({ ok: true, message: "Payout queued." });
});

app.listen(PORT, () => {
  console.log(`Conversio Partner Gateway listening on port ${PORT}`);
});
