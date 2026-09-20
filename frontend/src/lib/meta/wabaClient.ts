// Meta WhatsApp Cloud API Client & 24-Hour Session Window Engine

export interface MetaConversationPricing {
  category: "MARKETING" | "UTILITY" | "AUTHENTICATION" | "SERVICE";
  country: string;
  costPerConversation: number;
}

export const META_PRICING_IN: Record<string, number> = {
  MARKETING: 0.78,
  UTILITY: 0.15,
  AUTHENTICATION: 0.15,
  SERVICE: 0.00,
};

/**
 * Checks if a contact is within the WhatsApp 24-hour messaging window.
 * Free-text replies are only allowed within 24h of the last user inbound message.
 */
export function isWithin24HourWindow(lastUserMessageAt: string | Date | null): boolean {
  if (!lastUserMessageAt) return false;
  const lastMsgTime = new Date(lastUserMessageAt).getTime();
  const now = new Date().getTime();
  const diffInHours = (now - lastMsgTime) / (1000 * 60 * 60);
  return diffInHours <= 24;
}

/**
 * Calculates Meta conversation cost based on category and target country.
 */
export function calculateConversationCost(
  category: "MARKETING" | "UTILITY" | "AUTHENTICATION" | "SERVICE",
  country: string = "IN"
): number {
  if (country === "IN") {
    return META_PRICING_IN[category] ?? 0.78;
  }
  return 0.85; // International default
}

/**
 * Validates whether a message can be sent to a target contact.
 */
export function validateSendEligibility(
  optIn: boolean,
  category: "MARKETING" | "UTILITY" | "AUTHENTICATION" | "SERVICE",
  lastUserMessageAt: string | null
): { eligible: boolean; reason?: string } {
  if (!optIn && category === "MARKETING") {
    return { eligible: false, reason: "Contact has not opted in to receive marketing broadcasts." };
  }

  const inWindow = isWithin24HourWindow(lastUserMessageAt);
  if (!inWindow && category === "SERVICE") {
    return { eligible: false, reason: "Outside 24-hour session window. Must use an approved WhatsApp Template." };
  }

  return { eligible: true };
}
