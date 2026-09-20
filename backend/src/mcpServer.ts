import { prisma } from "./prisma";

export interface McpToolDefinition {
  name: string;
  description: string;
  parameters: Record<string, any>;
}

/**
 * List available Model Context Protocol (MCP) tools exposed by Conversio for AI Agents.
 */
export function getMcpTools(): McpToolDefinition[] {
  return [
    {
      name: "search_contacts",
      description: "Search contacts by name, phone, or workspace ID in Conversio CRM",
      parameters: {
        type: "object",
        properties: {
          workspaceId: { type: "string" },
          query: { type: "string" },
        },
        required: ["workspaceId", "query"],
      },
    },
    {
      name: "get_conversation_history",
      description: "Retrieve recent chat messages for a specific conversation ID",
      parameters: {
        type: "object",
        properties: {
          workspaceId: { type: "string" },
          conversationId: { type: "string" },
          limit: { type: "number", default: 20 },
        },
        required: ["workspaceId", "conversationId"],
      },
    },
    {
      name: "send_whatsapp_message",
      description: "Queue or send an outbound text reply to a customer conversation",
      parameters: {
        type: "object",
        properties: {
          workspaceId: { type: "string" },
          conversationId: { type: "string" },
          to: { type: "string" },
          message: { type: "string" },
        },
        required: ["workspaceId", "conversationId", "to", "message"],
      },
    },
  ];
}

/**
 * Execute an MCP Tool call requested by an AI Agent.
 */
export async function executeMcpTool(
  toolName: string,
  args: Record<string, any>
): Promise<unknown> {
  if (toolName === "search_contacts") {
    const { workspaceId, query } = args;
    return await prisma.contact.findMany({
      where: {
        workspaceId,
        OR: [
          { name: { contains: query, mode: "insensitive" } },
          { phone: { contains: query } },
        ],
      },
      take: 10,
    });
  }

  if (toolName === "get_conversation_history") {
    const { workspaceId, conversationId, limit = 20 } = args;
    return await prisma.conversationMessage.findMany({
      where: {
        workspaceId,
        conversationId,
      },
      orderBy: { createdAt: "desc" },
      take: Number(limit),
    });
  }

  if (toolName === "send_whatsapp_message") {
    const { workspaceId, conversationId, body } = args;
    const sentAt = new Date();

    return await prisma.conversationMessage.create({
      data: {
        workspaceId,
        conversationId,
        direction: "outbound",
        messageType: "text",
        body,
        status: "queued",
        sentAt,
      },
    });
  }

  throw new Error(`Unknown MCP Tool: ${toolName}`);
}
