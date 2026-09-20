import { prisma } from "../../prisma";
import { hashPassword, verifyPassword } from "../../auth";
import { createWorkspaceForUser, setCurrentUser, buildAppState, getCurrentUser, ensureSession } from "../../state";
import type { SignUpInput, SignInInput } from "./auth.schemas";

export async function signUpUser(input: SignUpInput) {
  const existing = await prisma.user.findUnique({ where: { email: input.email } });
  const passwordHash = await hashPassword(input.password);

  if (existing?.passwordHash) {
    throw new Error("User already registered.");
  }

  const user = existing
    ? await prisma.user.update({
        where: { id: existing.id },
        data: {
          name: input.name,
          passwordHash,
        },
      })
    : await createWorkspaceForUser(prisma, { name: input.name, email: input.email, passwordHash });

  // Handle affiliate referral attribution if code provided
  if (input.referralCode?.trim()) {
    try {
      const partner = await prisma.partner.findFirst({
        where: { referralCode: input.referralCode.trim(), status: "approved" },
      });

      if (partner) {
        await prisma.workspace.update({
          where: { id: user.workspaceId },
          data: { partnerId: partner.id },
        });

        await prisma.partnerReferral.create({
          data: {
            partnerId: partner.id,
            workspaceId: partner.workspaceId,
            referredEmail: user.email,
            referredWorkspaceId: user.workspaceId,
            status: "converted",
            convertedAt: new Date(),
          },
        });

        await prisma.partner.update({
          where: { id: partner.id },
          data: {
            totalReferrals: { increment: 1 },
            activeSubscriptions: { increment: 1 },
          },
        });
      }
    } catch (e) {
      console.warn("Failed to attribute partner referral", e);
    }
  }

  await setCurrentUser(prisma, user.id);
  const data = await buildAppState(prisma, user);
  return data;
}

export async function signInUser(input: SignInInput) {
  const user = await prisma.user.findUnique({ where: { email: input.email } });
  const isValidPassword = user?.passwordHash ? await verifyPassword(input.password, user.passwordHash) : false;

  if (!user || !isValidPassword) {
    throw new Error("Invalid login credentials.");
  }

  await setCurrentUser(prisma, user.id);
  const data = await buildAppState(prisma, user);
  return data;
}

export async function signOutUser() {
  await setCurrentUser(prisma, null);
  const data = await buildAppState(prisma, null);
  return data;
}

export async function getAppState() {
  await ensureSession(prisma);
  const user = await getCurrentUser(prisma);
  const data = await buildAppState(prisma, user);
  return data;
}

export async function completeOnboarding() {
  const user = await getCurrentUser(prisma);
  if (!user) {
    throw new Error("No active session");
  }

  await prisma.user.update({
    where: { id: user.id },
    data: { onboardingComplete: true },
  });

  const freshUser = await prisma.user.findUniqueOrThrow({ where: { id: user.id } });
  const data = await buildAppState(prisma, freshUser);
  return data;
}
