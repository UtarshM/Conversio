import { Router } from "express";
import { prisma } from "../../prisma";
import { requireSession } from "../../middleware";
import {
  getRetentionDashboard,
  ingestAbandonedCart,
  executeRecoveryStep,
  markCartRecovered,
  ingestCodOrder,
  updateCodOrderStatus,
  updateRetentionConfig,
  ingestCourierNdr,
  resolveNdr,
  triggerD2cBroadcast,
  submitReviewNps,
} from "./recovery.service";

const router = Router();

// -------------------------------------------------------------
// 1. Merchant Dashboard & Analytics
// -------------------------------------------------------------
router.get("/dashboard", requireSession, async (req, res, next) => {
  try {
    const workspaceId = req.workspaceContext.workspaceId;
    const data = await getRetentionDashboard(workspaceId);
    res.json({ success: true, data });
  } catch (error) {
    next(error);
  }
});

// Update Retention Engine Settings
router.put("/config", requireSession, async (req, res, next) => {
  try {
    const workspaceId = req.workspaceContext.workspaceId;
    const updated = await updateRetentionConfig(workspaceId, req.body);
    res.json({ success: true, data: updated });
  } catch (error) {
    next(error);
  }
});

// -------------------------------------------------------------
// 2. Abandoned Cart Recovery Actions
// -------------------------------------------------------------
router.post("/cart/ingest", requireSession, async (req, res, next) => {
  try {
    const workspaceId = req.workspaceContext.workspaceId;
    const result = await ingestAbandonedCart(workspaceId, req.body);
    res.json({ success: true, data: result });
  } catch (error) {
    next(error);
  }
});

router.post("/cart/:checkoutId/step/:stepNumber", requireSession, async (req, res, next) => {
  try {
    const workspaceId = req.workspaceContext.workspaceId;
    const { checkoutId, stepNumber } = req.params;
    const result = await executeRecoveryStep(workspaceId, String(checkoutId), Number(stepNumber));
    res.json({ success: true, data: result });
  } catch (error) {
    next(error);
  }
});

router.post("/cart/:checkoutId/recover", requireSession, async (req, res, next) => {
  try {
    const workspaceId = req.workspaceContext.workspaceId;
    const { checkoutId } = req.params;
    const result = await markCartRecovered(workspaceId, String(checkoutId));
    res.json({ success: true, data: result });
  } catch (error) {
    next(error);
  }
});

// -------------------------------------------------------------
// 3. COD-to-Prepaid & RTO Reduction Actions
// -------------------------------------------------------------
router.post("/cod/order", requireSession, async (req, res, next) => {
  try {
    const workspaceId = req.workspaceContext.workspaceId;
    const result = await ingestCodOrder(workspaceId, req.body);
    res.json({ success: true, data: result });
  } catch (error) {
    next(error);
  }
});

router.post("/cod/:orderId/status", requireSession, async (req, res, next) => {
  try {
    const workspaceId = req.workspaceContext.workspaceId;
    const { orderId } = req.params;
    const { status, method, transcript } = req.body;
    const result = await updateCodOrderStatus(workspaceId, String(orderId), status, method, transcript);
    res.json({ success: true, data: result });
  } catch (error) {
    next(error);
  }
});

// AI Voice Call Verification simulator
router.post("/cod/:orderId/simulate-voice", requireSession, async (req, res, next) => {
  try {
    const workspaceId = req.workspaceContext.workspaceId;
    const { orderId } = req.params;
    const { outcome } = req.body; // "confirm" | "prepay" | "cancel"

    let status: "verified_cod" | "converted_to_prepaid" | "cancelled" = "verified_cod";
    let transcript = "";

    if (outcome === "prepay") {
      status = "converted_to_prepaid";
      transcript = `Conversio AI Voice: "Namaste! This is an automated call from your store regarding order #${orderId}. Would you like to prepay online via UPI right now and save ₹50 instantly?"\nCustomer: "Yes, sure! Please WhatsApp me the payment link."\nConversio AI Voice: "Great! Payment link sent to your WhatsApp. Saving ₹50 now. Thank you!"`;
    } else if (outcome === "cancel") {
      status = "cancelled";
      transcript = `Conversio AI Voice: "Namaste! Confirming Cash on Delivery order #${orderId} of item(s). Are you available to receive this order?"\nCustomer: "No, I actually bought it somewhere else, please cancel this order."\nConversio AI Voice: "Understood. Order #${orderId} has been cancelled. No shipment will be sent."`;
    } else {
      status = "verified_cod";
      transcript = `Conversio AI Voice: "Namaste! This is an automated call from your store. Confirming your COD order #${orderId} for delivery this week. Please press 1 or say 'Confirm' to verify."\nCustomer: "Confirm, please deliver after 2 PM."\nConversio AI Voice: "Thank you! Order verified and dispatched for packaging."`;
    }

    const result = await updateCodOrderStatus(workspaceId, String(orderId), status, "ai_voice_call", transcript);
    res.json({ success: true, data: { ...result, transcript } });
  } catch (error) {
    next(error);
  }
});

// -------------------------------------------------------------
// 4. Public E-Commerce Store Webhooks (Shopify & WooCommerce)
// -------------------------------------------------------------
router.post("/webhook/shopify/:workspaceId", async (req, res, next) => {
  try {
    const { workspaceId } = req.params;
    const topic = req.headers["x-shopify-topic"] || "checkouts/create";
    const body = req.body;

    if (topic === "checkouts/create" || topic === "checkouts/update") {
      const items = (body.line_items || []).map((li: any) => ({
        title: li.title || "Store Item",
        price: Number(li.price || 0),
        quantity: Number(li.quantity || 1),
      }));

      await ingestAbandonedCart(workspaceId, {
        checkoutId: String(body.id || `CHK-${Date.now().toString().slice(-4)}`),
        customerName: `${body.customer?.first_name || ""} ${body.customer?.last_name || ""}`.trim() || "Shopify Customer",
        customerPhone: body.customer?.phone || body.phone || "+91 98765 43210",
        cartTotal: Number(body.total_price || 1499),
        items: items.length > 0 ? items : [{ title: "Featured Product", price: 1499, quantity: 1 }],
        checkoutUrl: body.abandoned_checkout_url || `https://store.myshopify.com/checkout/${body.id}`,
      });
    } else if (topic === "orders/create") {
      const gateway = (body.gateway || body.payment_gateway_names?.[0] || "").toLowerCase();
      if (gateway.includes("cod") || gateway.includes("cash") || gateway.includes("manual")) {
        await ingestCodOrder(workspaceId, {
          orderId: String(body.order_number || body.id || `ORD-${Date.now().toString().slice(-4)}`),
          customerName: `${body.customer?.first_name || ""} ${body.customer?.last_name || ""}`.trim() || "Shopify Customer",
          customerPhone: body.customer?.phone || body.phone || "+91 98765 43210",
          totalAmount: Number(body.total_price || 1999),
          items: (body.line_items || []).map((li: any) => li.title || "Order Item"),
        });
      }
    }

    res.status(200).json({ received: true });
  } catch (error) {
    next(error);
  }
});

router.post("/webhook/woocommerce/:workspaceId", async (req, res, next) => {
  try {
    const { workspaceId } = req.params;
    const body = req.body;
    const paymentMethod = (body.payment_method || "").toLowerCase();

    if (paymentMethod.includes("cod") || paymentMethod.includes("cash")) {
      await ingestCodOrder(workspaceId, {
        orderId: String(body.id || `WOO-${Date.now().toString().slice(-4)}`),
        customerName: `${body.billing?.first_name || ""} ${body.billing?.last_name || ""}`.trim() || "WooCommerce Customer",
        customerPhone: body.billing?.phone || "+91 98765 43210",
        totalAmount: Number(body.total || 1499),
        items: (body.line_items || []).map((li: any) => li.name || "Product Item"),
      });
    }

    res.status(200).json({ received: true });
  } catch (error) {
    next(error);
  }
});

// -------------------------------------------------------------
// 5. NDR (Non-Delivery Report) Logistics Endpoints
// -------------------------------------------------------------
router.post("/ndr/webhook/:workspaceId", async (req, res, next) => {
  try {
    const { workspaceId } = req.params;
    const body = req.body;
    const result = await ingestCourierNdr(String(workspaceId), {
      waybillNumber: body.awb || body.waybill || `AWB-${Date.now().toString().slice(-6)}`,
      orderId: body.order_id || body.orderId || `ORD-${Date.now().toString().slice(-4)}`,
      courierName: body.courier || "Shiprocket",
      customerName: body.customer_name || "Valued Shopper",
      customerPhone: body.customer_phone || "+91 98765 43210",
      failureReason: body.failure_reason || "Customer unavailable / Door closed",
    });
    res.status(200).json({ success: true, data: result });
  } catch (error) {
    next(error);
  }
});

router.post("/ndr/:ndrId/resolve", requireSession, async (req, res, next) => {
  try {
    const workspaceId = req.workspaceContext.workspaceId;
    const { ndrId } = req.params;
    const { action, notes } = req.body;
    const result = await resolveNdr(workspaceId, String(ndrId), action, notes);
    res.json({ success: true, data: result });
  } catch (error) {
    next(error);
  }
});

// -------------------------------------------------------------
// 6. D2C Broadcast Campaigns & Reviews
// -------------------------------------------------------------
router.post("/broadcast/dispatch", requireSession, async (req, res, next) => {
  try {
    const workspaceId = req.workspaceContext.workspaceId;
    const { templateId } = req.body;
    const result = await triggerD2cBroadcast(workspaceId, String(templateId));
    res.json({ success: true, data: result });
  } catch (error) {
    next(error);
  }
});

router.post("/review/submit", requireSession, async (req, res, next) => {
  try {
    const workspaceId = req.workspaceContext.workspaceId;
    const { orderId, rating, feedback } = req.body;
    const result = await submitReviewNps(workspaceId, {
      orderId: String(orderId),
      rating: Number(rating),
      feedback: feedback ? String(feedback) : undefined,
    });
    res.json({ success: true, data: result });
  } catch (error) {
    next(error);
  }
});

// -------------------------------------------------------------
// 7. One-Click Event Simulator (Sandbox Demo for testing)
// -------------------------------------------------------------
router.post("/simulate-event", requireSession, async (req, res, next) => {
  try {
    const workspaceId = req.workspaceContext.workspaceId;
    const { eventType } = req.body; // "abandoned_cart" | "cod_order" | "ndr_failed_delivery"

    if (eventType === "ndr_failed_delivery") {
      const randomId = Math.floor(1000 + Math.random() * 9000);
      const names = ["Rohan Roy", "Kritika Sen", "Manish Malhotra", "Divya Pillai"];
      const couriers: Array<"Shiprocket" | "Delhivery" | "Bluedart"> = ["Shiprocket", "Delhivery", "Bluedart"];
      const reasons = [
        "Customer Unavailable / Premises Locked",
        "Incorrect House Number / Landmark Missing",
        "Customer Rescheduled for Next Working Day",
      ];
      const randomName = names[Math.floor(Math.random() * names.length)];
      const randomCourier = couriers[Math.floor(Math.random() * couriers.length)];
      const randomReason = reasons[Math.floor(Math.random() * reasons.length)];

      const result = await ingestCourierNdr(workspaceId, {
        waybillNumber: `AWB-${randomCourier.slice(0, 2).toUpperCase()}${randomId}99`,
        orderId: `ORD-${randomId}`,
        courierName: randomCourier,
        customerName: randomName,
        customerPhone: `+91 ${Math.floor(90000 + Math.random() * 9999)} ${Math.floor(10000 + Math.random() * 89999)}`,
        failureReason: randomReason,
      });

      return res.json({ success: true, simulated: "ndr_failed_delivery", data: result });
    } else if (eventType === "cod_order") {
      const randomId = Math.floor(1000 + Math.random() * 9000);
      const names = ["Karan Mehta", "Ananya Singhania", "Devendra Joshi", "Tanvi Verma"];
      const products = ["Organic Matcha Green Tea (250g)", "Noise Cancelling Headphones V3", "Cotton Oversized Streetwear Hoodie"];
      const randomName = names[Math.floor(Math.random() * names.length)];
      const randomProduct = products[Math.floor(Math.random() * products.length)];
      const randomAmount = [1299, 1899, 2450, 3199][Math.floor(Math.random() * 4)];

      const result = await ingestCodOrder(workspaceId, {
        orderId: `ORD-${randomId}`,
        customerName: randomName,
        customerPhone: `+91 ${Math.floor(90000 + Math.random() * 9999)} ${Math.floor(10000 + Math.random() * 89999)}`,
        totalAmount: randomAmount,
        items: [randomProduct],
      });

      return res.json({ success: true, simulated: "cod_order", data: result });
    } else {
      const randomId = Math.floor(1000 + Math.random() * 9000);
      const names = ["Riya Sen", "Deepak Verma", "Kavita Rao", "Sameer Chawla"];
      const products = [
        { title: "Glow Face Oil & Vitamin C Drops", price: 1250, quantity: 1 },
        { title: "Matte Clay Pomade & Beard Wash", price: 950, quantity: 1 },
        { title: "Ergonomic Aluminium Laptop Stand", price: 1799, quantity: 1 },
      ];
      const randomName = names[Math.floor(Math.random() * names.length)];
      const randomProd = products[Math.floor(Math.random() * products.length)];

      const result = await ingestAbandonedCart(workspaceId, {
        checkoutId: `CHK-${randomId}`,
        customerName: randomName,
        customerPhone: `+91 ${Math.floor(90000 + Math.random() * 9999)} ${Math.floor(10000 + Math.random() * 89999)}`,
        cartTotal: randomProd.price,
        items: [randomProd],
        checkoutUrl: `https://brand.myshopify.com/checkouts/c/${randomId}`,
      });

      return res.json({ success: true, simulated: "abandoned_cart", data: result });
    }
  } catch (error) {
    next(error);
  }
});

export default router;
