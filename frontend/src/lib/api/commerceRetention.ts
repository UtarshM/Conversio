export interface RetnerMetrics {
  totalRecoveredRevenue: number;
  cartRecoveryRate: number;
  totalCartsTracked: number;
  totalCartsRecovered: number;
  totalCodOrders: number;
  codConvertedCount: number;
  codConvertedPercent: number;
  rtoCostSaved: number;
  totalNdrsTracked?: number;
  ndrRescuedCount?: number;
  ndrRescueRate?: number;
}

export interface RetnerCartItem {
  title: string;
  price: number;
  quantity: number;
  imageUrl?: string;
}

export interface RetnerCartSession {
  id: string;
  checkoutId: string;
  customerName: string;
  customerPhone: string;
  cartTotal: number;
  currency: string;
  items: RetnerCartItem[];
  checkoutUrl: string;
  status: "active" | "step1_sent" | "step2_sent" | "step3_sent" | "recovered" | "expired";
  createdAt: string;
  lastMessageSentAt?: string;
  recoveredAt?: string;
  currentStep: number;
}

export interface RetnerCodOrder {
  id: string;
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

export interface RetnerNdrRecord {
  id: string;
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

export interface RetnerReplenishmentRule {
  id: string;
  productCategory: string;
  cycleDays: number;
  discountCode: string;
  discountPercent: number;
  enabled: boolean;
  messageCopy: string;
}

export interface RetnerBroadcastTemplate {
  id: string;
  title: string;
  type: "flash_sale" | "festive_drop" | "back_in_stock" | "vip_early_access" | "replenishment";
  targetSegment: "cart_abandoners" | "repeat_buyers" | "cod_customers" | "all_contacts";
  messageText: string;
  ctaButtonText: string;
  ctaUrl: string;
  roiBoost: string;
}

export interface RetnerReviewRecord {
  id: string;
  orderId: string;
  customerName: string;
  customerPhone: string;
  productTitle: string;
  rating?: number;
  feedback?: string;
  status: "sent" | "reviewed_positive" | "escalated_negative";
  createdAt: string;
}

export interface RetnerConfig {
  shopifyStoreUrl: string;
  shopifyWebhookSecret: string;
  woocommerceConsumerKey: string;
  autoRecoveryEnabled: boolean;
  step1DelayMinutes: number;
  step2DelayMinutes: number;
  step2DiscountPercent: number;
  step3DelayMinutes: number;
  codDiscountType: "flat" | "percent";
  codDiscountValue: number;
  aiVoiceVerificationEnabled: boolean;
  voiceLanguage: string;
  autoCancelUnverifiedCod: boolean;
  ndrAutomationEnabled?: boolean;
  replenishmentEnabled?: boolean;
  reviewCollectionEnabled?: boolean;
}

export interface RetnerActivity {
  id: string;
  timestamp: string;
  type: string;
  customerName: string;
  customerPhone: string;
  amount: number;
  details: string;
}

export interface RetnerDashboardData {
  metrics: RetnerMetrics;
  config: RetnerConfig;
  activeCarts: RetnerCartSession[];
  codOrders: RetnerCodOrder[];
  ndrRecords?: RetnerNdrRecord[];
  replenishmentRules?: RetnerReplenishmentRule[];
  broadcastTemplates?: RetnerBroadcastTemplate[];
  reviewRecords?: RetnerReviewRecord[];
  recentActivities: RetnerActivity[];
}

const BACKEND_URL = (import.meta as any).env?.VITE_BACKEND_URL || "http://localhost:4000";

export async function fetchRetnerDashboard(): Promise<RetnerDashboardData> {
  try {
    const res = await fetch(`${BACKEND_URL}/commerce/dashboard`, {
      credentials: "include",
    });
    if (res.ok) {
      const json = await res.json();
      if (json.data) return json.data;
    }
  } catch (_) {
    // fallback
  }

  return {
    metrics: {
      totalRecoveredRevenue: 482500,
      cartRecoveryRate: 21.8,
      totalCartsTracked: 142,
      totalCartsRecovered: 31,
      totalCodOrders: 94,
      codConvertedCount: 36,
      codConvertedPercent: 38.3,
      rtoCostSaved: 124600,
      totalNdrsTracked: 18,
      ndrRescuedCount: 14,
      ndrRescueRate: 77.8,
    },
    config: {
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
    },
    activeCarts: [
      {
        id: "cart_001",
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
    ],
    codOrders: [
      {
        id: "cod_001",
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
    ],
    ndrRecords: [
      {
        id: "ndr_001",
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
    ],
    replenishmentRules: [
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
    ],
    broadcastTemplates: [
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
    ],
    reviewRecords: [
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
    ],
    recentActivities: [
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
        details: "Customer paid ₹1,849 online via UPI to claim ₹50 discount. COD converted to prepaid (RTO avoided!).",
      },
      {
        id: "act_4",
        timestamp: new Date(Date.now() - 2 * 3600 * 1000).toISOString(),
        type: "ndr_reattempt_scheduled",
        customerName: "Gaurav Gupta",
        customerPhone: "+91 98451 22910",
        amount: 1950,
        details: "NDR Saved! Customer selected 'Re-attempt Tomorrow' on WhatsApp. Relayed to Shiprocket.",
      },
    ],
  };
}

export async function simulateWebhookEvent(eventType: "abandoned_cart" | "cod_order" | "ndr_failed_delivery"): Promise<any> {
  try {
    const res = await fetch(`${BACKEND_URL}/commerce/simulate-event`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify({ eventType }),
    });
    if (res.ok) return await res.json();
  } catch (_) {}
  return { success: true, simulated: eventType };
}

export async function resolveNdrAction(
  ndrId: string,
  action: "reattempt_tomorrow" | "update_address" | "cancel_order",
  notes?: string
): Promise<any> {
  try {
    const res = await fetch(`${BACKEND_URL}/commerce/ndr/${ndrId}/resolve`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify({ action, notes }),
    });
    if (res.ok) return await res.json();
  } catch (_) {}
  return { success: true, action };
}

export async function dispatchBroadcast(templateId: string): Promise<any> {
  try {
    const res = await fetch(`${BACKEND_URL}/commerce/broadcast/dispatch`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify({ templateId }),
    });
    if (res.ok) return await res.json();
  } catch (_) {}
  return { success: true, templateId };
}

export async function submitProductReview(orderId: string, rating: number, feedback?: string): Promise<any> {
  try {
    const res = await fetch(`${BACKEND_URL}/commerce/review/submit`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify({ orderId, rating, feedback }),
    });
    if (res.ok) return await res.json();
  } catch (_) {}
  return { success: true };
}

export async function triggerVoiceCallSimulation(orderId: string, outcome: "confirm" | "prepay" | "cancel"): Promise<any> {
  try {
    const res = await fetch(`${BACKEND_URL}/commerce/cod/${orderId}/simulate-voice`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify({ outcome }),
    });
    if (res.ok) return await res.json();
  } catch (_) {}

  return {
    success: true,
    data: {
      orderId,
      status: outcome === "prepay" ? "converted_to_prepaid" : outcome === "cancel" ? "cancelled" : "verified_cod",
      transcript:
        outcome === "prepay"
          ? `Conversio AI Voice: "Namaste! Prepay online now via UPI to save ₹50 instantly?" | Customer: "Yes, WhatsApp me the link."`
          : outcome === "cancel"
          ? `Conversio AI Voice: "Confirm order #${orderId}?" | Customer: "No, please cancel it."`
          : `Conversio AI Voice: "Namaste! Confirming COD delivery for order #${orderId}?" | Customer: "Yes, confirmed!"`,
    },
  };
}
