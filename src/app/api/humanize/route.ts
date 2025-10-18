// app/api/humanize/route.ts
import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { checkFreeTrial } from "@/lib/free-trial";
import OpenAI from "openai";

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    const { text } = await req.json();

    if (!text || !text.trim()) {
      return NextResponse.json({ error: "No text provided" }, { status: 400 });
    }

    const words = text.trim().split(/\s+/).length;
    const userId = session?.user?.id ?? null;
    const isPro = session?.user?.isPro ?? false;

    const { allowed, reason } = await checkFreeTrial(userId, isPro, words);
    if (!allowed) {
      return NextResponse.json({ error: reason }, { status: 403 });
    }

    // Call OpenAI to rewrite
    const response = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        { role: "system", content: "Rewrite this text to sound more human-like and natural." },
        { role: "user", content: text },
      ],
    });

    const humanized = response.choices[0]?.message?.content || "";

    return NextResponse.json({ humanized });
  } catch (err) {
    console.error("Humanize error:", err);
    return NextResponse.json({ error: "Failed to humanize" }, { status: 500 });
  }
}
