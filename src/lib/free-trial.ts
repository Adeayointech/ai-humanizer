// lib/free-trial.ts
import { prisma } from "@/lib/prisma";

export async function checkFreeTrial(userId: string | null, isPro: boolean, words: number) {
  if (isPro) {
    return { allowed: true, reason: "Pro user, unlimited" };
  }

  if (!userId) {
    // anonymous → allow up to 250 per request
    if (words > 250) {
      return { allowed: false, reason: "Free trial limited to 250 words." };
    }
    return { allowed: true, reason: "Guest trial ok" };
  }

  // logged-in free user → check + update their usage
  const user = await prisma.user.findUnique({ where: { id: userId } });
  if (!user) {
    return { allowed: false, reason: "User not found" };
  }

  if (user.trialWordsUsed + words > 250) {
    return { allowed: false, reason: "You’ve exhausted your 250 free words." };
  }

  await prisma.user.update({
    where: { id: userId },
    data: { trialWordsUsed: { increment: words } },
  });

  return { allowed: true, reason: "Usage updated" };
}
