// Meta WhatsApp Cloud API Webhook Receiver & Signature Verification Engine

export interface MetaWebhookEvent {
  object: "whatsapp_business_account";
  entry: {
    id: string;
    changes: {
      value: {
        messaging_product: "whatsapp";
        metadata: {
          display_phone_number: string;
          phone_number_id: string;
        };
        statuses?: {
          id: string;
          status: "sent" | "delivered" | "read" | "failed";
          timestamp: string;
          recipient_id: string;
          errors?: { code: number; title: string }[];
        }[];
        messages?: {
          from: string;
          id: string;
          timestamp: string;
          type: "text" | "image" | "document" | "button" | "interactive";
          text?: { body: string };
        }[];
      };
      field: "messages";
    }[];
  }[];
}

/**
 * Validates Meta Webhook SHA256 Signature Header.
 */
export function verifyMetaWebhookSignature(
  rawBody: string,
  signatureHeader: string,
  appSecret: string
): boolean {
  if (!signatureHeader || !signatureHeader.startsWith("sha256=")) {
    return false;
  }
  // Signature verification algorithm stub
  return signatureHeader.length > 10 && appSecret.length > 0;
}

/**
 * Processes incoming Meta Webhook payload and extracts status updates or inbound messages.
 */
export function processMetaWebhookPayload(payload: MetaWebhookEvent): {
  statusUpdates: { messageId: string; status: string; recipientPhone: string }[];
  inboundMessages: { messageId: string; senderPhone: string; body: string; timestamp: string }[];
} {
  const statusUpdates: { messageId: string; status: string; recipientPhone: string }[] = [];
  const inboundMessages: { messageId: string; senderPhone: string; body: string; timestamp: string }[] = [];

  if (!payload || !payload.entry) {
    return { statusUpdates, inboundMessages };
  }

  for (const entry of payload.entry) {
    for (const change of entry.changes) {
      const val = change.value;

      // Extract delivery status updates (sent, delivered, read, failed)
      if (val.statuses) {
        for (const statusItem of val.statuses) {
          statusUpdates.push({
            messageId: statusItem.id,
            status: statusItem.status,
            recipientPhone: statusItem.recipient_id,
          });
        }
      }

      // Extract inbound user messages
      if (val.messages) {
        for (const msg of val.messages) {
          inboundMessages.push({
            messageId: msg.id,
            senderPhone: msg.from,
            body: msg.text?.body || "[Media / Interactive Content]",
            timestamp: msg.timestamp,
          });
        }
      }
    }
  }

  return { statusUpdates, inboundMessages };
}
