import { Router } from "express";
import { requireSession } from "../../middleware";
import { connectWhatsAppSchema, obaApplySchema, testSendSchema } from "./whatsapp.schemas";
import {
  connectWhatsApp,
  disconnectWhatsApp,
  getConnectionHealth,
  sendTestMessage,
} from "./whatsapp.service";

const router = Router();

router.get("/health", requireSession, async (req, res, next) => {
  try {
    const health = await getConnectionHealth();
    res.json({ data: health });
  } catch (error) {
    next(error);
  }
});

router.post("/test-send", requireSession, async (req, res, next) => {
  try {
    const payload = testSendSchema.parse(req.body);
    const result = await sendTestMessage(payload);
    res.json({ data: result });
  } catch (error) {
    next(error);
  }
});

router.post("/connect", requireSession, async (req, res, next) => {
  try {
    const payload = connectWhatsAppSchema.parse(req.body);
    const result = await connectWhatsApp(payload);
    res.json({ data: result });
  } catch (error) {
    next(error);
  }
});

router.post("/disconnect", requireSession, async (req, res, next) => {
  try {
    const result = await disconnectWhatsApp();
    res.json({ data: result });
  } catch (error) {
    next(error);
  }
});

// Official Business Account (OBA / Blue Tick) verification endpoints
router.get("/oba/audit", requireSession, async (req, res, next) => {
  try {
    const { auditWorkspaceObaEligibility } = await import("./oba.service");
    const workspaceId = req.workspaceContext?.workspaceId;
    if (!workspaceId) throw new Error("Workspace context is missing");
    const audit = await auditWorkspaceObaEligibility(workspaceId);
    res.json({ data: audit });
  } catch (error) {
    next(error);
  }
});

router.post("/oba/apply", requireSession, async (req, res, next) => {
  try {
    const { submitObaApplication } = await import("./oba.service");
    const workspaceId = req.workspaceContext?.workspaceId;
    if (!workspaceId) throw new Error("Workspace context is missing");
    const payload = obaApplySchema.parse(req.body);
    const result = await submitObaApplication(workspaceId, payload);
    res.json({ data: result });
  } catch (error) {
    next(error);
  }
});

export default router;
