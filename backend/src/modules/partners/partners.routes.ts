import { Router } from "express";
import { requireSession, requireRole } from "../../middleware";
import { UserRole } from "@prisma/client";
import {
  applyPartnerSchema,
  publicApplySchema,
  commissionSchema,
  payoutRequestSchema,
  brandingSchema,
  verifyDomainSchema,
  createSubWorkspaceSchema,
  topupSubWorkspaceSchema,
} from "./partners.schemas";
import {
  applyPartner,
  publicApplyPartner,
  getPartners,
  getPartnerDashboard,
  getPartner,
  approvePartner,
  rejectPartner,
  updateCommission,
  getReferrals,
  getCommissions,
  getPayouts,
  requestPayout,
  processPayout,
  updateBranding,
  verifyCustomDomain,
  createPartnerSubWorkspace,
  getPartnerSubWorkspaces,
  topupSubWorkspace,
  resolveDomainBranding,
} from "./partners.service";

const router = Router();
const adminOnly = requireRole([UserRole.OWNER, UserRole.ADMIN]);

// Public: Resolve domain branding for white-label custom domains
// GET /partners/resolve-domain
router.get("/resolve-domain", async (req, res, next) => {
  try {
    const host = String(req.query.host || req.hostname || "app.conversio.ai");
    const branding = await resolveDomainBranding(host);
    res.json({ data: branding });
  } catch (error) {
    next(error);
  }
});

// POST /partners/apply
router.post("/apply", requireSession, async (req, res, next) => {
  try {
    const payload = applyPartnerSchema.parse(req.body);
    const result = await applyPartner(payload);
    res.status(201).json({ data: result });
  } catch (error) {
    next(error);
  }
});

// POST /partners/public-apply
router.post("/public-apply", async (req, res, next) => {
  try {
    const payload = publicApplySchema.parse(req.body);
    const result = await publicApplyPartner(payload);
    res.status(201).json({ data: result });
  } catch (error) {
    next(error);
  }
});

// GET /partners
router.get("/", requireSession, async (req, res, next) => {
  try {
    const partners = await getPartners();
    res.json({ data: partners });
  } catch (error) {
    next(error);
  }
});

// GET /partners/dashboard
router.get("/dashboard", requireSession, async (req, res, next) => {
  try {
    const dashboard = await getPartnerDashboard();
    res.json({ data: dashboard });
  } catch (error) {
    next(error);
  }
});

// GET /partners/referrals
router.get("/referrals", requireSession, async (req, res, next) => {
  try {
    const referrals = await getReferrals();
    res.json({ data: referrals });
  } catch (error) {
    next(error);
  }
});

// GET /partners/commissions
router.get("/commissions", requireSession, async (req, res, next) => {
  try {
    const commissions = await getCommissions();
    res.json({ data: commissions });
  } catch (error) {
    next(error);
  }
});

// GET /partners/payouts
router.get("/payouts", requireSession, async (req, res, next) => {
  try {
    const payouts = await getPayouts();
    res.json({ data: payouts });
  } catch (error) {
    next(error);
  }
});

// POST /partners/payouts/request
router.post("/payouts/request", requireSession, async (req, res, next) => {
  try {
    const payload = payoutRequestSchema.parse(req.body);
    const result = await requestPayout(payload);
    res.status(201).json({ data: result });
  } catch (error) {
    next(error);
  }
});

// PATCH /partners/branding
router.patch("/branding", requireSession, async (req, res, next) => {
  try {
    const payload = brandingSchema.parse(req.body);
    const result = await updateBranding(payload);
    res.json({ data: result });
  } catch (error) {
    next(error);
  }
});

// POST /partners/verify-domain
router.post("/verify-domain", requireSession, async (req, res, next) => {
  try {
    const payload = verifyDomainSchema.parse(req.body);
    const result = await verifyCustomDomain(payload);
    res.json({ data: result });
  } catch (error) {
    next(error);
  }
});

// GET /partners/sub-workspaces
router.get("/sub-workspaces", requireSession, async (req, res, next) => {
  try {
    const subWorkspaces = await getPartnerSubWorkspaces();
    res.json({ data: subWorkspaces });
  } catch (error) {
    next(error);
  }
});

// POST /partners/sub-workspaces
router.post("/sub-workspaces", requireSession, async (req, res, next) => {
  try {
    const payload = createSubWorkspaceSchema.parse(req.body);
    const result = await createPartnerSubWorkspace(payload);
    res.status(201).json({ data: result });
  } catch (error) {
    next(error);
  }
});

// POST /partners/sub-workspaces/:id/topup
router.post("/sub-workspaces/:id/topup", requireSession, async (req, res, next) => {
  try {
    const payload = topupSubWorkspaceSchema.parse(req.body);
    const result = await topupSubWorkspace(String(req.params.id), payload);
    res.json({ data: result });
  } catch (error) {
    next(error);
  }
});

// Admin routes
// GET /partners/:id
router.get("/:id", requireSession, async (req, res, next) => {
  try {
    const partner = await getPartner(String(req.params.id));
    res.json({ data: partner });
  } catch (error) {
    next(error);
  }
});

// POST /partners/:id/approve
router.post("/:id/approve", requireSession, adminOnly, async (req, res, next) => {
  try {
    const result = await approvePartner(String(req.params.id));
    res.json({ data: result });
  } catch (error) {
    next(error);
  }
});

// POST /partners/:id/reject
router.post("/:id/reject", requireSession, adminOnly, async (req, res, next) => {
  try {
    const result = await rejectPartner(String(req.params.id));
    res.json({ data: result });
  } catch (error) {
    next(error);
  }
});

// PATCH /partners/:id/commission
router.patch("/:id/commission", requireSession, adminOnly, async (req, res, next) => {
  try {
    const payload = commissionSchema.parse(req.body);
    const result = await updateCommission(String(req.params.id), payload);
    res.json({ data: result });
  } catch (error) {
    next(error);
  }
});

// POST /partners/payouts/:id/process
router.post("/payouts/:id/process", requireSession, adminOnly, async (req, res, next) => {
  try {
    const result = await processPayout(String(req.params.id));
    res.json({ data: result });
  } catch (error) {
    next(error);
  }
});

export default router;
