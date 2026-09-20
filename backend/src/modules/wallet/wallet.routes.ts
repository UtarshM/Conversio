import { Router } from "express";
import { requireSession } from "../../middleware";
import { topUpSchema } from "./wallet.schemas";
import { topUpWallet } from "./wallet.service";

const router = Router();

router.post("/top-up", requireSession, async (req, res, next) => {
  try {
    const payload = topUpSchema.parse(req.body);
    const result = await topUpWallet(payload);
    res.json(result);
  } catch (error) {
    next(error);
  }
});

// Razorpay Payment Gateway integration endpoints
router.post("/razorpay/create-order", requireSession, async (req, res, next) => {
  try {
    const { createRazorpayTopUpOrder } = await import("./razorpay.service");
    const workspaceId = (req as any).workspaceId || "default_workspace";
    const amountInRupees = Number(req.body.amount) || 1000;
    const order = await createRazorpayTopUpOrder({ workspaceId, amountInRupees });
    res.json({ data: order });
  } catch (error) {
    next(error);
  }
});

router.post("/razorpay/verify-payment", requireSession, async (req, res, next) => {
  try {
    const { verifyRazorpayPaymentAndTopUp } = await import("./razorpay.service");
    const workspaceId = (req as any).workspaceId || "default_workspace";
    const result = await verifyRazorpayPaymentAndTopUp({
      workspaceId,
      razorpayOrderId: req.body.razorpayOrderId,
      razorpayPaymentId: req.body.razorpayPaymentId,
      razorpaySignature: req.body.razorpaySignature,
      amountAdded: Number(req.body.amount) || 1000,
    });
    res.json({ data: result });
  } catch (error) {
    next(error);
  }
});

export default router;
