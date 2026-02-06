// lib/free-trial.ts
import { prisma } from "@/lib/prisma";

export async function checkFreeTrial(userId: string | null, isPro: boolean, words: number) {
  if (isPro) {
    return { allowed: true, reason: "Pro user, unlimited" };
  }

  // For free users, allow up to 250 words per request
  if (words > 250) {
    return { allowed: false, reason: "Free trial limited to 250 words per request." };
  }

  return { allowed: true, reason: "Within free limit" };
}
