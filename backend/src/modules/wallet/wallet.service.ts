import { prisma } from "../../prisma";
import type { TopUpInput } from "./wallet.schemas";
import { buildAppState, getCurrentUser } from "../../state";

export async function topUpWallet(input: TopUpInput) {
  const user = await getCurrentUser(prisma);
  if (!user) {
    throw new Error("No active session. Sign in first.");
  }

  const currentState = await buildAppState(prisma, user);
  const nextBalance = currentState.walletBalance + input.amount;

  const tx = await prisma.walletTransaction.create({
    data: {
      workspaceId: user.workspaceId,
      type: "credit",
      amount: input.amount,
      description: input.source || "Wallet Recharge",
      referenceType: "manual_topup",
      balanceAfter: nextBalance,
    },
  });

  // Automatically credit referring partner commission
  try {
    const { recordPartnerCommission } = await import("../partners/partners.service");
    await recordPartnerCommission({
      workspaceId: user.workspaceId,
      amount: input.amount,
      sourceType: "wallet_topup",
      sourceReferenceId: tx.id,
    });
  } catch (e) {
    console.warn("Failed to record partner commission", e);
  }

  const freshUser = await prisma.user.findUniqueOrThrow({
    where: { id: user.id },
  });

  const data = await buildAppState(prisma, freshUser);
  return {
    data,
    ok: true,
    message: "Balance added successfully.",
  };
}
