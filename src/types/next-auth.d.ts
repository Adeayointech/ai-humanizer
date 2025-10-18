import NextAuth, { DefaultSession } from "next-auth";

// Extend the built-in session and user types
declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      isPro?: boolean;
      plan?: "FREE" | "PRO";
      trialWordsUsed?: number;
    } & DefaultSession["user"];
  }

  interface User {
    id: string;
    isPro?: boolean;
    plan?: "FREE" | "PRO";
    trialWordsUsed?: number;
  }
}
