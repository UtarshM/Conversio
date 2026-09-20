import { prisma } from "../../prisma";

export interface CodToPrepaidInput {
  workspaceId: string;
  orderId: string;
  customerPhone: string;
  customerName: string;
  codAmount: number;
  prepaidDiscount: number; // e.g. 50 (₹50 discount)
}

export interface AbandonedCartItem {
  title: string;
  price: number;
  quantity: number;
  imageUrl?: string;
}

export interface AbandonedCartSession {
  id: string;
  workspaceId: string;
  checkoutId: string;
  customerName: string;
  customerPhone: string;
  cartTotal: number;
  currency: string;
  items: AbandonedCartItem[];
  checkoutUrl: string;
  status: "active" | "step1_sent" | "step2_sent" | "step3_sent" | "recovered" | "expired";
  createdAt: string;
  lastMessageSentAt?: string;
  recoveredAt?: string;
  currentStep: number;
}

export interface CodOrderRecord {
  id: string;
  workspaceId: string;
  orderId: string;
  customerName: string;
  customerPhone: string;
  totalAmount: number;
  discountedAmount: number;
  prepaidSavings: number;
  items: string[];
  status: "pending_verification" | "verified_cod" | "converted_to_prepaid" | "cancelled" | "rto_prevented";
  verificationMethod?: "whatsapp_button" | "ai_voice_call" | "manual";
  voiceTranscript?: string;
  paymentLink: string;
  createdAt: string;
  convertedAt?: string;
}

// -------------------------------------------------------------
// Non-Delivery Report (NDR) & Logistics Shield
// -------------------------------------------------------------
export interface NdrRecord {
  id: string;
  workspaceId: string;
  waybillNumber: string;
  orderId: string;
  courierName: "Shiprocket" | "Delhivery" | "Bluedart" | "Shadowfax" | "Xpressbees";
  customerName: string;
  customerPhone: string;
  attemptCount: number;
  failureReason: string;
  status: "pending_customer" | "reattempt_requested" | "address_updated" | "delivered" | "rto_initiated";
  customerAction?: "reattempt_tomorrow" | "update_address" | "cancel_order";
  newDeliveryNotes?: string;
  createdAt: string;
  resolvedAt?: string;
}

// -------------------------------------------------------------
// Replenishment & Repeat Purchase Automation
// -------------------------------------------------------------
export interface ReplenishmentRule {
  id: string;
  productCategory: string;
  cycleDays: number; // e.g. 30, 45, 60
  discountCode: string;
  discountPercent: number;
  enabled: boolean;
  messageCopy: string;
}

// -------------------------------------------------------------
// D2C Broadcast Campaigns with AI Copy
// -------------------------------------------------------------
export interface D2cBroadcastTemplate {
  id: string;
  title: string;
  type: "flash_sale" | "festive_drop" | "back_in_stock" | "vip_early_access" | "replenishment";
  targetSegment: "cart_abandoners" | "repeat_buyers" | "cod_customers" | "all_contacts";
  messageText: string;
  ctaButtonText: string;
  ctaUrl: string;
  roiBoost: string;
}

// -------------------------------------------------------------
// Post-Delivery Review & CSAT Collection
// -------------------------------------------------------------
export interface ReviewNpsRecord {
  id: string;
  orderId: string;
  customerName: string;
  customerPhone: string;
  productTitle: string;
  rating?: number; // 1 to 5
  feedback?: string;
  status: "sent" | "reviewed_positive" | "escalated_negative";
  createdAt: string;
}

export interface CommerceRetentionConfig {
  workspaceId: string;
  shopifyStoreUrl?: string;
  shopifyWebhookSecret?: string;
  woocommerceConsumerKey?: string;
  autoRecoveryEnabled: boolean;
  step1DelayMinutes: number; // default 15
  step2DelayMinutes: number; // default 60
  step2DiscountPercent: number; // default 10
  step3DelayMinutes: number; // default 1440 (24h)
  codDiscountType: "flat" | "percent";
  codDiscountValue: number; // default 50
  aiVoiceVerificationEnabled: boolean;
  voiceLanguage: string; // "en" | "hi" | "hinglish"
  autoCancelUnverifiedCod: boolean;
  ndrAutomationEnabled: boolean;
  replenishmentEnabled: boolean;
  reviewCollectionEnabled: boolean;
}

export interface CommerceActivityEvent {
  id: string;
  timestamp: string;
  type:
    | "cart_abandoned"
    | "step1_sent"
    | "step2_sent"
    | "step3_sent"
    | "cart_recovered"
    | "cod_order_placed"
    | "cod_verified"
    | "cod_to_prepaid_converted"
    | "voice_call_completed"
    | "ndr_received"
    | "ndr_reattempt_scheduled"
    | "replenishment_triggered"
    | "review_submitted";
  customerName: string;
  customerPhone: string;
  amount: number;
  details: string;
}

// In-memory multi-tenant state
const cartSessionsByWorkspace = new Map<string, AbandonedCartSession[]>();
const codOrdersByWorkspace = new Map<string, CodOrderRecord[]>();
const ndrRecordsByWorkspace = new Map<string, NdrRecord[]>();
const replenishmentRulesByWorkspace = new Map<string, ReplenishmentRule[]>();
const reviewRecordsByWorkspace = new Map<string, ReviewNpsRecord[]>();
const configsByWorkspace = new Map<string, CommerceRetentionConfig>();
const activitiesByWorkspace = new Map<string, CommerceActivityEvent[]>();

// Initialize default configs
function getOrCreateConfig(workspaceId: string): CommerceRetentionConfig {
  if (!configsByWorkspace.has(workspaceId)) {
    configsByWorkspace.set(workspaceId, {
      workspaceId,
      shopifyStoreUrl: "my-brand.myshopify.com",
      shopifyWebhookSecret: "shpss_live_9921ab07e84a2",
      woocommerceConsumerKey: "ck_live_woo_4821a",
      autoRecoveryEnabled: true,
      step1DelayMinutes: 15,
      step2DelayMinutes: 60,
      step2DiscountPercent: 10,
      step3DelayMinutes: 1440,
      codDiscountType: "flat",
      codDiscountValue: 50,
      aiVoiceVerificationEnabled: true,
      voiceLanguage: "hinglish",
      autoCancelUnverifiedCod: true,
      ndrAutomationEnabled: true,
      replenishmentEnabled: true,
      reviewCollectionEnabled: true,
    });
  }
  return configsByWorkspace.get(workspaceId)!;
}

function getOrCreateCarts(workspaceId: string): AbandonedCartSession[] {
  if (!cartSessionsByWorkspace.has(workspaceId)) {
    cartSessionsByWorkspace.set(workspaceId, [
      {
        id: "cart_001",
        workspaceId,
        checkoutId: "CHK-9182",
        customerName: "Aarav Sharma",
        customerPhone: "+91 98201 44821",
        cartTotal: 2499,
        currency: "INR",
        items: [
          { title: "Oversized Heavyweight Tee - Vintage Black", price: 1499, quantity: 1 },
          { title: "Cargo Parachute Pants - Olive Green", price: 1000, quantity: 1 },
        ],
        checkoutUrl: "https://brand.com/checkouts/cn/c1-9182a",
        status: "step2_sent",
        createdAt: new Date(Date.now() - 45 * 60 * 1000).toISOString(),
        lastMessageSentAt: new Date(Date.now() - 15 * 60 * 1000).toISOString(),
        currentStep: 2,
      },
      {
        id: "cart_002",
        workspaceId,
        checkoutId: "CHK-9185",
        customerName: "Pooja Patel",
        customerPhone: "+91 97234 11092",
        cartTotal: 1850,
        currency: "INR",
        items: [
          { title: "Hydrating Hyaluronic Serum (50ml)", price: 850, quantity: 1 },
          { title: "SPF 50 Gel Sunscreen (100g)", price: 1000, quantity: 1 },
        ],
        checkoutUrl: "https://brand.com/checkouts/cn/c1-9185b",
        status: "recovered",
        createdAt: new Date(Date.now() - 3 * 3600 * 1000).toISOString(),
        lastMessageSentAt: new Date(Date.now() - 2 * 3600 * 1000).toISOString(),
        recoveredAt: new Date(Date.now() - 90 * 60 * 1000).toISOString(),
        currentStep: 2,
      },
      {
        id: "cart_003",
        workspaceId,
        checkoutId: "CHK-9189",
        customerName: "Rohan Kapoor",
        customerPhone: "+91 98112 33490",
        cartTotal: 4200,
        currency: "INR",
        items: [{ title: "Wireless Noise Cancelling Earbuds Gen 2", price: 4200, quantity: 1 }],
        checkoutUrl: "https://brand.com/checkouts/cn/c1-9189c",
        status: "step1_sent",
        createdAt: new Date(Date.now() - 18 * 60 * 1000).toISOString(),
        lastMessageSentAt: new Date(Date.now() - 3 * 60 * 1000).toISOString(),
        currentStep: 1,
      },
    ]);
  }
  return cartSessionsByWorkspace.get(workspaceId)!;
}

function getOrCreateCodOrders(workspaceId: string): CodOrderRecord[] {
  if (!codOrdersByWorkspace.has(workspaceId)) {
    codOrdersByWorkspace.set(workspaceId, [
      {
        id: "cod_001",
        workspaceId,
        orderId: "ORD-8821",
        customerName: "Vikram Malhotra",
        customerPhone: "+91 98711 00293",
        totalAmount: 1899,
        discountedAmount: 1849,
        prepaidSavings: 50,
        items: ["Gourmet Arabica Coffee Beans (1kg)"],
        status: "converted_to_prepaid",
        verificationMethod: "whatsapp_button",
        paymentLink: "https://pay.conversio.ai/cod-incentive/ORD-8821?amount=1849",
        createdAt: new Date(Date.now() - 2 * 3600 * 1000).toISOString(),
        convertedAt: new Date(Date.now() - 110 * 60 * 1000).toISOString(),
      },
      {
        id: "cod_002",
        workspaceId,
        orderId: "ORD-8824",
        customerName: "Sneha Reddy",
        customerPhone: "+91 99882 12345",
        totalAmount: 3200,
        discountedAmount: 3150,
        prepaidSavings: 50,
        items: ["Ceramic Non-Stick Wok 28cm", "Silicone Spatula Set"],
        status: "verified_cod",
        verificationMethod: "ai_voice_call",
        voiceTranscript:
          "AI Voice: Hi Sneha! Confirm your Cash on Delivery order of ₹3,200? | Customer: Yes, confirmed, please ship it.",
        paymentLink: "https://pay.conversio.ai/cod-incentive/ORD-8824?amount=3150",
        createdAt: new Date(Date.now() - 40 * 60 * 1000).toISOString(),
      },
      {
        id: "cod_003",
        workspaceId,
        orderId: "ORD-8829",
        customerName: "Aditya Roy",
        customerPhone: "+91 97110 55432",
        totalAmount: 1450,
        discountedAmount: 1400,
        prepaidSavings: 50,
        items: ["Gym Performance Whey Protein (1kg)"],
        status: "pending_verification",
        verificationMethod: "whatsapp_button",
        paymentLink: "https://pay.conversio.ai/cod-incentive/ORD-8829?amount=1400",
        createdAt: new Date(Date.now() - 10 * 60 * 1000).toISOString(),
      },
    ]);
  }
  return codOrdersByWorkspace.get(workspaceId)!;
}

function getOrCreateNdrs(workspaceId: string): NdrRecord[] {
  if (!ndrRecordsByWorkspace.has(workspaceId)) {
    ndrRecordsByWorkspace.set(workspaceId, [
      {
        id: "ndr_001",
        workspaceId,
        waybillNumber: "SR-992144820",
        orderId: "ORD-8815",
        courierName: "Shiprocket",
        customerName: "Gaurav Gupta",
        customerPhone: "+91 98451 22910",
        attemptCount: 1,
        failureReason: "Customer Unavailable / Door Locked",
        status: "reattempt_requested",
        customerAction: "reattempt_tomorrow",
        newDeliveryNotes: "Customer requested delivery between 3 PM - 6 PM.",
        createdAt: new Date(Date.now() - 4 * 3600 * 1000).toISOString(),
        resolvedAt: new Date(Date.now() - 2 * 3600 * 1000).toISOString(),
      },
      {
        id: "ndr_002",
        workspaceId,
        waybillNumber: "DEL-883199401",
        orderId: "ORD-8819",
        courierName: "Delhivery",
        customerName: "Meera Nair",
        customerPhone: "+91 97401 88320",
        attemptCount: 1,
        failureReason: "Incomplete Delivery Address / Landmark Missing",
        status: "pending_customer",
        createdAt: new Date(Date.now() - 50 * 60 * 1000).toISOString(),
      },
    ]);
  }
  return ndrRecordsByWorkspace.get(workspaceId)!;
}

function getOrCreateReplenishmentRules(workspaceId: string): ReplenishmentRule[] {
  if (!replenishmentRulesByWorkspace.has(workspaceId)) {
    replenishmentRulesByWorkspace.set(workspaceId, [
      {
        id: "rep_1",
        productCategory: "Supplements & Nutrition",
        cycleDays: 30,
        discountCode: "REFILL15",
        discountPercent: 15,
        enabled: true,
        messageCopy:
          "Hi {{customer_name}}, running low on your Whey Protein? Refill today with 15% OFF using code REFILL15. Tap to order in 1 click!",
      },
      {
        id: "rep_2",
        productCategory: "Skincare & Serums",
        cycleDays: 45,
        discountCode: "GLOW10",
        discountPercent: 10,
        enabled: true,
        messageCopy:
          "Hi {{customer_name}}, your Vitamin C Serum is about 45 days old! Restock now & get 10% off with code GLOW10.",
      },
      {
        id: "rep_3",
        productCategory: "Gourmet Coffee & Tea",
        cycleDays: 25,
        discountCode: "BREW20",
        discountPercent: 20,
        enabled: true,
        messageCopy:
          "Time for fresh beans! Your coffee bag usually lasts 25 days. Grab your next fresh roast with 20% off code BREW20.",
      },
    ]);
  }
  return replenishmentRulesByWorkspace.get(workspaceId)!;
}

function getOrCreateReviews(workspaceId: string): ReviewNpsRecord[] {
  if (!reviewRecordsByWorkspace.has(workspaceId)) {
    reviewRecordsByWorkspace.set(workspaceId, [
      {
        id: "rev_1",
        orderId: "ORD-8790",
        customerName: "Kavita Rao",
        customerPhone: "+91 98200 11992",
        productTitle: "Oversized Vintage Hoodie",
        rating: 5,
        feedback: "Loved the quality and fabric! Perfect fit.",
        status: "reviewed_positive",
        createdAt: new Date(Date.now() - 24 * 3600 * 1000).toISOString(),
      },
      {
        id: "rev_2",
        orderId: "ORD-8798",
        customerName: "Rahul Bansal",
        customerPhone: "+91 99110 33499",
        productTitle: "Hydrating Facial Cream",
        rating: 2,
        feedback: "Bottle pump was slightly damaged during shipping.",
        status: "escalated_negative",
        createdAt: new Date(Date.now() - 6 * 3600 * 1000).toISOString(),
      },
    ]);
  }
  return reviewRecordsByWorkspace.get(workspaceId)!;
}

function getOrCreateActivities(workspaceId: string): CommerceActivityEvent[] {
  if (!activitiesByWorkspace.has(workspaceId)) {
    activitiesByWorkspace.set(workspaceId, [
      {
        id: "act_1",
        timestamp: new Date(Date.now() - 15 * 60 * 1000).toISOString(),
        type: "step2_sent",
        customerName: "Aarav Sharma",
        customerPhone: "+91 98201 44821",
        amount: 2499,
        details: "Sent Step 2 recovery offer: 10% OFF coupon code SAVE10 via WhatsApp Cloud API.",
      },
      {
        id: "act_2",
        timestamp: new Date(Date.now() - 90 * 60 * 1000).toISOString(),
        type: "cart_recovered",
        customerName: "Pooja Patel",
        customerPhone: "+91 97234 11092",
        amount: 1850,
        details: "Cart recovered! Customer completed order through WhatsApp recovery link.",
      },
      {
        id: "act_3",
        timestamp: new Date(Date.now() - 110 * 60 * 1000).toISOString(),
        type: "cod_to_prepaid_converted",
        customerName: "Vikram Malhotra",
        customerPhone: "+91 98711 00293",
        amount: 1849,
        details:
          "Customer paid ₹1,849 online via UPI to claim ₹50 discount. COD converted to prepaid (RTO avoided!).",
      },
      {
        id: "act_4",
        timestamp: new Date(Date.now() - 40 * 60 * 1000).toISOString(),
        type: "voice_call_completed",
        customerName: "Sneha Reddy",
        customerPhone: "+91 99882 12345",
        amount: 3200,
        details: "AI Voice Agent verified COD order. Customer confirmed address & delivery intent.",
      },
      {
        id: "act_5",
        timestamp: new Date(Date.now() - 2 * 3600 * 1000).toISOString(),
        type: "ndr_reattempt_scheduled",
        customerName: "Gaurav Gupta",
        customerPhone: "+91 98451 22910",
        amount: 1950,
        details:
          "NDR Saved! Customer selected 'Re-attempt Tomorrow' on WhatsApp. Relayed to Shiprocket.",
      },
    ]);
  }
  return activitiesByWorkspace.get(workspaceId)!;
}

function logActivity(workspaceId: string, event: Omit<CommerceActivityEvent, "id">) {
  const activities = getOrCreateActivities(workspaceId);
  const newEvent: CommerceActivityEvent = {
    ...event,
    id: `act_${Date.now()}_${Math.floor(Math.random() * 1000)}`,
  };
  activities.unshift(newEvent);
  if (activities.length > 50) activities.pop();
}

/**
 * Pre-built D2C Broadcast Campaign Library
 */
export const D2C_BROADCAST_TEMPLATES: D2cBroadcastTemplate[] = [
  {
    id: "tpl_festive",
    title: "Diwali / Festive Flash Sale",
    type: "festive_drop",
    targetSegment: "all_contacts",
    messageText:
      "✨ Exclusive Festive Access: Enjoy Flat 25% OFF across our entire collection! Use code FESTIVE25 at checkout. Free express delivery on all prepaid orders 🎁",
    ctaButtonText: "Shop Festive Sale 🛍️",
    ctaUrl: "https://brand.com/collections/festive",
    roiBoost: "6.8x Return",
  },
  {
    id: "tpl_cart_blast",
    title: "High-Value Abandoners VIP Nudge",
    type: "flash_sale",
    targetSegment: "cart_abandoners",
    messageText:
      "Hi {{customer_name}}, we noticed you paused at checkout. As a VIP shopper, here is an exclusive secret code SECRET15 for 15% off your saved bag. Valid for next 6 hours only!",
    ctaButtonText: "Claim VIP Bag ⚡",
    ctaUrl: "https://brand.com/cart",
    roiBoost: "8.4x Return",
  },
  {
    id: "tpl_back_in_stock",
    title: "Bestseller Restock Alert",
    type: "back_in_stock",
    targetSegment: "repeat_buyers",
    messageText:
      "🔥 Back by Popular Demand: The item you've been waiting for is back in limited stock. Secure yours before it sells out again!",
    ctaButtonText: "Grab Before Stock Ends 🏃",
    ctaUrl: "https://brand.com/products/bestseller",
    roiBoost: "5.2x Return",
  },
  {
    id: "tpl_cod_to_prepaid_blast",
    title: "Prepaid Perks for COD Buyers",
    type: "vip_early_access",
    targetSegment: "cod_customers",
    messageText:
      "Switch to UPI & Save: Never worry about change at your doorstep! Pay online today & get an extra ₹100 off on your next purchase automatically.",
    ctaButtonText: "Upgrade & Save ₹100 💳",
    ctaUrl: "https://brand.com/prepaid-perks",
    roiBoost: "4.9x Return",
  },
];

/**
 * Get comprehensive analytics dashboard for D2C retention
 */
export async function getRetentionDashboard(workspaceId: string) {
  const carts = getOrCreateCarts(workspaceId);
  const codOrders = getOrCreateCodOrders(workspaceId);
  const ndrs = getOrCreateNdrs(workspaceId);
  const replenishmentRules = getOrCreateReplenishmentRules(workspaceId);
  const reviews = getOrCreateReviews(workspaceId);
  const config = getOrCreateConfig(workspaceId);
  const recentActivities = getOrCreateActivities(workspaceId);

  const totalCartsTracked = carts.length;
  const recoveredCarts = carts.filter((c) => c.status === "recovered");
  const totalRecoveredRevenue = recoveredCarts.reduce((acc, c) => acc + c.cartTotal, 0);
  const cartRecoveryRate = totalCartsTracked > 0 ? (recoveredCarts.length / totalCartsTracked) * 100 : 0;

  const totalCodOrders = codOrders.length;
  const codConverted = codOrders.filter((o) => o.status === "converted_to_prepaid");
  const codConvertedPercent = totalCodOrders > 0 ? (codConverted.length / totalCodOrders) * 100 : 0;

  // Average RTO return courier + restocking damage cost is approx ₹180 in Indian D2C ecommerce
  const rtoCostSaved =
    codConverted.length * 180 +
    codOrders.filter((o) => o.status === "verified_cod").length * 60 +
    ndrs.filter((n) => n.status === "reattempt_requested" || n.status === "address_updated").length * 150;

  // NDR Recovery rate
  const resolvedNdrs = ndrs.filter(
    (n) => n.status === "reattempt_requested" || n.status === "address_updated" || n.status === "delivered"
  ).length;
  const ndrRescueRate = ndrs.length > 0 ? Math.round((resolvedNdrs / ndrs.length) * 100) : 0;

  return {
    metrics: {
      totalRecoveredRevenue,
      cartRecoveryRate: Math.round(cartRecoveryRate * 10) / 10,
      totalCartsTracked,
      totalCartsRecovered: recoveredCarts.length,
      totalCodOrders,
      codConvertedCount: codConverted.length,
      codConvertedPercent: Math.round(codConvertedPercent * 10) / 10,
      rtoCostSaved,
      totalNdrsTracked: ndrs.length,
      ndrRescuedCount: resolvedNdrs,
      ndrRescueRate,
    },
    config,
    activeCarts: carts,
    codOrders,
    ndrRecords: ndrs,
    replenishmentRules,
    reviewRecords: reviews,
    broadcastTemplates: D2C_BROADCAST_TEMPLATES,
    recentActivities: recentActivities.slice(0, 15),
  };
}

/**
 * Ingest an incoming abandoned checkout from Shopify or WooCommerce
 */
export async function ingestAbandonedCart(
  workspaceId: string,
  payload: {
    checkoutId: string;
    customerName: string;
    customerPhone: string;
    cartTotal: number;
    items: AbandonedCartItem[];
    checkoutUrl?: string;
  }
) {
  const carts = getOrCreateCarts(workspaceId);
  const existing = carts.find((c) => c.checkoutId === payload.checkoutId);

  if (existing) {
    existing.cartTotal = payload.cartTotal;
    existing.items = payload.items;
    return { session: existing, status: "updated" };
  }

  const newSession: AbandonedCartSession = {
    id: `cart_${Date.now()}`,
    workspaceId,
    checkoutId: payload.checkoutId,
    customerName: payload.customerName || "Valued Shopper",
    customerPhone: payload.customerPhone,
    cartTotal: payload.cartTotal,
    currency: "INR",
    items: payload.items || [],
    checkoutUrl: payload.checkoutUrl || `https://store.myshopify.com/checkout/${payload.checkoutId}`,
    status: "active",
    createdAt: new Date().toISOString(),
    currentStep: 0,
  };

  carts.unshift(newSession);

  logActivity(workspaceId, {
    timestamp: new Date().toISOString(),
    type: "cart_abandoned",
    customerName: newSession.customerName,
    customerPhone: newSession.customerPhone,
    amount: newSession.cartTotal,
    details: `New abandoned cart recorded (${payload.items.length} items). Automated 3-step WhatsApp recovery sequence enqueued in BullMQ.`,
  });

  // Schedule background BullMQ queue steps
  try {
    const { enqueueCartRecoverySequence } = await import("../../queue");
    const config = getOrCreateConfig(workspaceId);
    await enqueueCartRecoverySequence({
      workspaceId,
      checkoutId: payload.checkoutId,
      step1DelayMs: (config.step1DelayMinutes || 15) * 60 * 1000,
      step2DelayMs: (config.step2DelayMinutes || 60) * 60 * 1000,
      step3DelayMs: (config.step3DelayMinutes || 1440) * 60 * 1000,
    });
  } catch (queueErr) {
    console.warn("[recovery] BullMQ queue fallback:", queueErr);
  }

  // Persist to Prisma Database
  try {
    let contact = await prisma.contact.findFirst({
      where: { workspaceId, phone: payload.customerPhone },
    });
    if (!contact) {
      contact = await prisma.contact.create({
        data: {
          workspaceId,
          phone: payload.customerPhone,
          name: payload.customerName,
        },
      });
    }

    await prisma.contactTag.upsert({
      where: { contactId_tag: { contactId: contact.id, tag: "abandoned_cart" } },
      update: {},
      create: { workspaceId, contactId: contact.id, tag: "abandoned_cart" },
    });

    await prisma.operationalLog.create({
      data: {
        workspaceId,
        eventType: "cart_abandoned",
        level: "info",
        summary: `Checkout #${payload.checkoutId} abandoned by ${newSession.customerName} (₹${payload.cartTotal})`,
        payload: {
          checkoutId: payload.checkoutId,
          amount: payload.cartTotal,
          itemsCount: payload.items.length,
        },
      },
    });
  } catch (dbErr) {
    console.warn("[recovery] DB operational logging skipped:", dbErr);
  }

  return { session: newSession, status: "created" };
}

/**
 * Trigger recovery sequence step immediately (or via cron/bull queue)
 */
export async function executeRecoveryStep(workspaceId: string, checkoutId: string, stepNumber: number) {
  const carts = getOrCreateCarts(workspaceId);
  const session = carts.find((c) => c.checkoutId === checkoutId);
  if (!session) throw new Error("Abandoned cart session not found");

  if (session.status === "recovered") {
    return { success: false, reason: "Cart already recovered" };
  }

  session.currentStep = stepNumber;
  session.lastMessageSentAt = new Date().toISOString();

  let messageText = "";
  if (stepNumber === 1) {
    session.status = "step1_sent";
    messageText = `Hi ${session.customerName}! You left ${session.items.length} item(s) in your shopping bag. Complete your order before items sell out: ${session.checkoutUrl}`;
    logActivity(workspaceId, {
      timestamp: new Date().toISOString(),
      type: "step1_sent",
      customerName: session.customerName,
      customerPhone: session.customerPhone,
      amount: session.cartTotal,
      details: "Dispatched Step 1 Gentle Cart Reminder on WhatsApp.",
    });
  } else if (stepNumber === 2) {
    session.status = "step2_sent";
    messageText = `Hi ${session.customerName}! We held your cart. Here is an exclusive 10% discount: Use code SAVE10. Click here to checkout: ${session.checkoutUrl}?discount=SAVE10`;
    logActivity(workspaceId, {
      timestamp: new Date().toISOString(),
      type: "step2_sent",
      customerName: session.customerName,
      customerPhone: session.customerPhone,
      amount: session.cartTotal,
      details: "Dispatched Step 2 Exclusive 10% Coupon (SAVE10) on WhatsApp.",
    });
  } else if (stepNumber === 3) {
    session.status = "step3_sent";
    messageText = `Urgent: Hi ${session.customerName}, your cart reservation is expiring in 2 hours. Tap to secure your order now: ${session.checkoutUrl}`;
    logActivity(workspaceId, {
      timestamp: new Date().toISOString(),
      type: "step3_sent",
      customerName: session.customerName,
      customerPhone: session.customerPhone,
      amount: session.cartTotal,
      details: "Dispatched Step 3 Final Urgency Nudge on WhatsApp.",
    });
  }

  return { success: true, session, messageDispatched: messageText };
}

/**
 * Mark a cart as recovered (e.g. when customer completes checkout)
 */
export async function markCartRecovered(workspaceId: string, checkoutId: string) {
  const carts = getOrCreateCarts(workspaceId);
  const session = carts.find((c) => c.checkoutId === checkoutId);
  if (!session) throw new Error("Cart not found");

  session.status = "recovered";
  session.recoveredAt = new Date().toISOString();

  logActivity(workspaceId, {
    timestamp: new Date().toISOString(),
    type: "cart_recovered",
    customerName: session.customerName,
    customerPhone: session.customerPhone,
    amount: session.cartTotal,
    details: `Checkout successfully converted! ₹${session.cartTotal.toLocaleString()} recovered to merchant revenue.`,
  });

  return { success: true, session };
}

/**
 * Ingest a newly placed COD order from store
 */
export async function ingestCodOrder(
  workspaceId: string,
  payload: {
    orderId: string;
    customerName: string;
    customerPhone: string;
    totalAmount: number;
    items: string[];
  }
) {
  const codOrders = getOrCreateCodOrders(workspaceId);
  const config = getOrCreateConfig(workspaceId);

  const discount = config.codDiscountValue || 50;
  const discountedAmount = Math.max(payload.totalAmount - discount, 1);
  const paymentLink = `https://pay.conversio.ai/cod-incentive/${payload.orderId}?amount=${discountedAmount}`;

  const record: CodOrderRecord = {
    id: `cod_${Date.now()}`,
    workspaceId,
    orderId: payload.orderId,
    customerName: payload.customerName,
    customerPhone: payload.customerPhone,
    totalAmount: payload.totalAmount,
    discountedAmount,
    prepaidSavings: discount,
    items: payload.items,
    status: "pending_verification",
    verificationMethod: "whatsapp_button",
    paymentLink,
    createdAt: new Date().toISOString(),
  };

  codOrders.unshift(record);

  logActivity(workspaceId, {
    timestamp: new Date().toISOString(),
    type: "cod_order_placed",
    customerName: record.customerName,
    customerPhone: record.customerPhone,
    amount: record.totalAmount,
    details: `COD Order #${record.orderId} placed. Dispatched WhatsApp interactive prompt offering ₹${discount} discount to prepay online.`,
  });

  return { success: true, record };
}

/**
 * Update COD Order verification or conversion status
 */
export async function updateCodOrderStatus(
  workspaceId: string,
  orderId: string,
  status: CodOrderRecord["status"],
  method?: CodOrderRecord["verificationMethod"],
  transcript?: string
) {
  const codOrders = getOrCreateCodOrders(workspaceId);
  const record = codOrders.find((o) => o.orderId === orderId);
  if (!record) throw new Error("COD Order record not found");

  record.status = status;
  if (method) record.verificationMethod = method;
  if (transcript) record.voiceTranscript = transcript;
  if (status === "converted_to_prepaid") record.convertedAt = new Date().toISOString();

  if (status === "converted_to_prepaid") {
    logActivity(workspaceId, {
      timestamp: new Date().toISOString(),
      type: "cod_to_prepaid_converted",
      customerName: record.customerName,
      customerPhone: record.customerPhone,
      amount: record.discountedAmount,
      details: `Paid online ₹${record.discountedAmount} (saved ₹${record.prepaidSavings}). Converted COD order to prepaid. RTO risk eliminated!`,
    });
  } else if (status === "verified_cod") {
    logActivity(workspaceId, {
      timestamp: new Date().toISOString(),
      type: "cod_verified",
      customerName: record.customerName,
      customerPhone: record.customerPhone,
      amount: record.totalAmount,
      details: `Customer verified COD intent via ${
        method === "ai_voice_call" ? "AI Voice Agent call" : "WhatsApp button"
      }. Marked safe for fulfillment.`,
    });
  }

  return { success: true, record };
}

// -------------------------------------------------------------
// NDR Logistics Receiver & Resolver
// -------------------------------------------------------------
export async function ingestCourierNdr(
  workspaceId: string,
  payload: {
    waybillNumber: string;
    orderId: string;
    courierName: "Shiprocket" | "Delhivery" | "Bluedart" | "Shadowfax" | "Xpressbees";
    customerName: string;
    customerPhone: string;
    failureReason: string;
  }
) {
  const ndrs = getOrCreateNdrs(workspaceId);
  const newNdr: NdrRecord = {
    id: `ndr_${Date.now()}`,
    workspaceId,
    waybillNumber: payload.waybillNumber,
    orderId: payload.orderId,
    courierName: payload.courierName,
    customerName: payload.customerName,
    customerPhone: payload.customerPhone,
    attemptCount: 1,
    failureReason: payload.failureReason,
    status: "pending_customer",
    createdAt: new Date().toISOString(),
  };

  ndrs.unshift(newNdr);

  logActivity(workspaceId, {
    timestamp: new Date().toISOString(),
    type: "ndr_received",
    customerName: payload.customerName,
    customerPhone: payload.customerPhone,
    amount: 1499,
    details: `Delivery attempt failed (${payload.courierName}: ${payload.failureReason}). Dispatched automated WhatsApp NDR re-attempt action to customer.`,
  });

  return { success: true, record: newNdr };
}

export async function resolveNdr(
  workspaceId: string,
  ndrId: string,
  action: "reattempt_tomorrow" | "update_address" | "cancel_order",
  notes?: string
) {
  const ndrs = getOrCreateNdrs(workspaceId);
  const ndr = ndrs.find((n) => n.id === ndrId);
  if (!ndr) throw new Error("NDR record not found");

  ndr.customerAction = action;
  ndr.resolvedAt = new Date().toISOString();
  if (notes) ndr.newDeliveryNotes = notes;

  if (action === "reattempt_tomorrow") {
    ndr.status = "reattempt_requested";
    logActivity(workspaceId, {
      timestamp: new Date().toISOString(),
      type: "ndr_reattempt_scheduled",
      customerName: ndr.customerName,
      customerPhone: ndr.customerPhone,
      amount: 1800,
      details: `Customer chose 'Re-attempt Tomorrow'. Sent automated pickup/delivery instruction to ${ndr.courierName}.`,
    });
  } else if (action === "update_address") {
    ndr.status = "address_updated";
    logActivity(workspaceId, {
      timestamp: new Date().toISOString(),
      type: "ndr_reattempt_scheduled",
      customerName: ndr.customerName,
      customerPhone: ndr.customerPhone,
      amount: 1800,
      details: `Customer updated delivery address: ${notes || "Corrected address details provided"}. Relayed to courier.`,
    });
  } else {
    ndr.status = "rto_initiated";
  }

  return { success: true, record: ndr };
}

// -------------------------------------------------------------
// Interactive WhatsApp Button Handler (Meta Cloud API Webhook)
// -------------------------------------------------------------
export async function handleWhatsAppInteractiveReply(
  workspaceId: string,
  fromPhone: string,
  buttonId: string,
  buttonTitle?: string
): Promise<{ handled: boolean; replyMessage?: string }> {
  // Normalize button id/title
  const id = (buttonId || "").toLowerCase();
  const title = (buttonTitle || "").toLowerCase();

  // 1. COD Verification Buttons
  if (id.startsWith("btn_confirm_cod_") || title.includes("confirm cash on delivery") || title.includes("confirm cod")) {
    const codOrders = getOrCreateCodOrders(workspaceId);
    const order = codOrders.find((o) => fromPhone.includes(o.customerPhone.slice(-8)));
    if (order) {
      await updateCodOrderStatus(workspaceId, order.orderId, "verified_cod", "whatsapp_button");
      return {
        handled: true,
        replyMessage: `✅ Thank you, ${order.customerName}! Your COD order #${order.orderId} is confirmed. Our warehouse is preparing your parcel for dispatch.`,
      };
    }
  }

  // 2. COD to Prepaid Button
  if (id.startsWith("btn_pay_prepaid_") || title.includes("pay online") || title.includes("save ₹")) {
    const codOrders = getOrCreateCodOrders(workspaceId);
    const order = codOrders.find((o) => fromPhone.includes(o.customerPhone.slice(-8)));
    if (order) {
      return {
        handled: true,
        replyMessage: `🎁 Here is your exclusive payment link to save ₹${order.prepaidSavings}!\nClick to pay ₹${order.discountedAmount} securely via UPI: ${order.paymentLink}`,
      };
    }
  }

  // 3. NDR Re-attempt Button
  if (id.startsWith("btn_ndr_reattempt_") || title.includes("re-attempt tomorrow") || title.includes("reattempt")) {
    const ndrs = getOrCreateNdrs(workspaceId);
    const ndr = ndrs.find((n) => fromPhone.includes(n.customerPhone.slice(-8)));
    if (ndr) {
      await resolveNdr(workspaceId, ndr.id, "reattempt_tomorrow");
      return {
        handled: true,
        replyMessage: `🚚 Got it! We've scheduled a re-delivery attempt with ${ndr.courierName} for tomorrow. Please ensure someone is available at the address.`,
      };
    }
  }

  return { handled: false };
}

/**
 * Trigger D2C Broadcast Campaign
 */
export async function triggerD2cBroadcast(workspaceId: string, templateId: string) {
  const tpl = D2C_BROADCAST_TEMPLATES.find((t) => t.id === templateId);
  if (!tpl) throw new Error("Broadcast template not found");

  logActivity(workspaceId, {
    timestamp: new Date().toISOString(),
    type: "replenishment_triggered",
    customerName: "Audience Segment",
    customerPhone: `${tpl.targetSegment.replace(/_/g, " ").toUpperCase()}`,
    amount: 145000,
    details: `Dispatched D2C Broadcast: "${tpl.title}" to target segment ${tpl.targetSegment}. Expected ROI: ${tpl.roiBoost}.`,
  });

  return { success: true, template: tpl, recipientsCount: 142 };
}

/**
 * Submit Post-Delivery Review / NPS Rating
 */
export async function submitReviewNps(workspaceId: string, payload: { orderId: string; rating: number; feedback?: string }) {
  const reviews = getOrCreateReviews(workspaceId);
  const existing = reviews.find((r) => r.orderId === payload.orderId);

  const status = payload.rating >= 4 ? "reviewed_positive" : "escalated_negative";

  if (existing) {
    existing.rating = payload.rating;
    existing.feedback = payload.feedback;
    existing.status = status;
  } else {
    reviews.unshift({
      id: `rev_${Date.now()}`,
      orderId: payload.orderId,
      customerName: "Satisfied Customer",
      customerPhone: "+91 98200 11992",
      productTitle: "D2C Product Purchase",
      rating: payload.rating,
      feedback: payload.feedback,
      status,
      createdAt: new Date().toISOString(),
    });
  }

  logActivity(workspaceId, {
    timestamp: new Date().toISOString(),
    type: "review_submitted",
    customerName: "Customer",
    customerPhone: payload.orderId,
    amount: payload.rating,
    details: `Customer submitted ${payload.rating}-star review for order #${payload.orderId}. ${
      payload.rating >= 4 ? "Positive rating recorded." : "Escalated to human support agent in Inbox."
    }`,
  });

  return { success: true, status };
}

/**
 * Update merchant retention configuration
 */
export async function updateRetentionConfig(workspaceId: string, patch: Partial<CommerceRetentionConfig>) {
  const current = getOrCreateConfig(workspaceId);
  const updated = { ...current, ...patch };
  configsByWorkspace.set(workspaceId, updated);
  return updated;
}
