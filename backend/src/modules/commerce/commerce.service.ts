import { PrismaClient } from "@prisma/client";

export async function handleAbandonedCartEvent(
  workspaceId: string,
  data: { phone: string; productName: string; productUrl: string; cartValue: number },
  prisma: PrismaClient
) {
  const contact = await prisma.contact.findFirst({ where: { workspaceId, phone: data.phone } });

  if (contact) {
    await prisma.contactTag.upsert({
      where: { contactId_tag: { contactId: contact.id, tag: "abandoned_cart" } },
      update: {},
      create: { workspaceId, contactId: contact.id, tag: "abandoned_cart" },
    });

    await prisma.contactAttributeValue.upsert({
      where: { contactId_attributeId: { contactId: contact.id, attributeId: "cart_value" } },
      update: { value: String(data.cartValue) },
      create: {
        contactId: contact.id,
        attributeId: "cart_value",
        value: String(data.cartValue),
      },
    }).catch(() => {});
  }

  return { tracked: true, contactId: contact?.id ?? null };
}

export async function getAbandonedCartStats(workspaceId: string, prisma: PrismaClient) {
  const cartContacts = await prisma.contactTag.findMany({
    where: { workspaceId, tag: "abandoned_cart" },
    include: { contact: { select: { id: true, name: true, phone: true } } },
  });

  return {
    total: cartContacts.length,
    contacts: cartContacts.map((ct) => ct.contact),
  };
}

export async function handleCodOrderCreated(
  workspaceId: string,
  data: { orderId: string; phone: string; customerName: string; totalAmount: number; items: string[] },
  prisma: PrismaClient
) {
  // 1. Ensure contact exists or create/update contact
  let contact = await prisma.contact.findFirst({ where: { workspaceId, phone: data.phone } });
  if (!contact) {
    contact = await prisma.contact.create({
      data: {
        workspaceId,
        phone: data.phone,
        name: data.customerName,
      }
    });
  }

  // 2. Add tag indicating COD order verification status
  await prisma.contactTag.upsert({
    where: { contactId_tag: { contactId: contact.id, tag: `cod_order_${data.orderId}` } },
    update: {},
    create: { workspaceId, contactId: contact.id, tag: `cod_order_${data.orderId}` },
  });

  // Save metadata like order details under PaymentLink model
  const paymentLink = await prisma.paymentLink.create({
    data: {
      workspaceId,
      amount: data.totalAmount,
      currency: "INR",
      description: `COD Order #${data.orderId} conversion`,
      contactId: contact.id,
      status: "pending"
    }
  });

  return { success: true, orderId: data.orderId, paymentLinkId: paymentLink.id };
}

export async function simulateAiVoiceCall(
  workspaceId: string,
  data: { orderId: string; paymentLinkId: string; simulationInput?: string },
  prisma: PrismaClient
) {
  const paymentLink = await prisma.paymentLink.findUnique({
    where: { id: data.paymentLinkId }
  });
  if (!paymentLink) {
    throw new Error("Payment link / Order reference not found");
  }

  const input = data.simulationInput?.toLowerCase() || "confirm";
  let status = "pending_verification";
  let transcript = "";

  if (input.includes("confirm") || input.includes("yes")) {
    status = "verified_cod";
    transcript = "AI Voice: Hello! Confirm order? | Customer: Yes, please ship it.";
  } else if (input.includes("cancel") || input.includes("no")) {
    status = "cancelled";
    transcript = "AI Voice: Confirm order? | Customer: No, I changed my mind.";
    await prisma.paymentLink.update({
      where: { id: paymentLink.id },
      data: { status: "expired" }
    });
  } else if (input.includes("prepay") || input.includes("discount") || input.includes("pay")) {
    status = "awaiting_prepayment";
    transcript = "AI Voice: Prepay now for a 5% discount? | Customer: Yes, send me the payment link.";
  }

  await prisma.paymentLink.update({
    where: { id: paymentLink.id },
    data: {
      description: `COD Order Verification. Status: ${status}. Transcript: ${transcript}`
    }
  });

  return { success: true, status, transcript };
}

export async function generatePrepaidIncentiveLink(
  workspaceId: string,
  paymentLinkId: string,
  prisma: PrismaClient
) {
  const paymentLink = await prisma.paymentLink.findUnique({
    where: { id: paymentLinkId }
  });
  if (!paymentLink) {
    throw new Error("Order reference not found");
  }

  // Calculate 5% discount
  const discountedAmount = paymentLink.amount * 0.95;
  const shortUrl = `https://conversio.ai/pay/sim_${paymentLink.id}`;
  
  const updated = await prisma.paymentLink.update({
    where: { id: paymentLinkId },
    data: {
      amount: discountedAmount,
      shortUrl,
      razorpayLinkId: `rzp_link_${paymentLinkId}`,
      description: `${paymentLink.description || ""} | 5% Prepay discount applied.`
    }
  });

  return { success: true, paymentLinkId: updated.id, amount: discountedAmount, shortUrl };
}

export async function handlePrepaymentWebhook(
  workspaceId: string,
  razorpayLinkId: string,
  prisma: PrismaClient
) {
  const paymentLink = await prisma.paymentLink.findFirst({
    where: { workspaceId, razorpayLinkId }
  });
  if (!paymentLink) {
    throw new Error("Associated payment link not found");
  }

  const updated = await prisma.paymentLink.update({
    where: { id: paymentLink.id },
    data: {
      status: "paid",
      description: `${paymentLink.description || ""} | Paid via prepaid incentive link.`
    }
  });

  await prisma.paymentTransaction.create({
    data: {
      workspaceId,
      razorpayPaymentId: `pay_capture_${paymentLink.id}`,
      amount: paymentLink.amount,
      currency: paymentLink.currency,
      status: "completed",
      method: "upi"
    }
  });

  return { success: true, paymentLinkId: updated.id, status: "paid" };
}
