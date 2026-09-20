import { z } from "zod";

export const getConnectionHealthSchema = z.object({});

export const testSendSchema = z.object({
  to: z.string().min(1, "Phone number required"),
  messageType: z.enum(["text", "template"]),
  body: z.string().optional(),
  templateName: z.string().optional(),
  language: z.string().optional().default("en"),
});

export const connectWhatsAppSchema = z.object({
  businessPortfolio: z.string().min(1),
  wabaName: z.string().min(4),
  phoneNumber: z.string().min(10).max(15),
  businessName: z.string().min(1),
});

export const obaApplySchema = z.object({
  phoneNumberId: z.string().min(1, "A WhatsApp phone number ID is required"),
  businessJustification: z.string().min(40, "Provide a more detailed brand justification"),
  pressLinks: z.array(z.string().url("Each press link must be a valid URL")).min(2, "At least two independent press links are required"),
  wikipediaUrl: z.string().url().optional(),
  brandWebsite: z.string().url("A valid public brand website is required"),
});

export type ConnectWhatsAppInput = z.infer<typeof connectWhatsAppSchema>;

export type TestSendInput = z.infer<typeof testSendSchema>;
