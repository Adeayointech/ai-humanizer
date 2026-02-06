// app/api/humanize/route.ts
import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { checkFreeTrial } from "@/lib/free-trial";
import OpenAI from "openai";

const groq = new OpenAI({ 
  apiKey: process.env.GROQ_API_KEY,
  baseURL: "https://api.groq.com/openai/v1"
});

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

    // Call Groq to rewrite
    const response = await groq.chat.completions.create({
      model: "llama-3.3-70b-versatile",
      messages: [
        { role: "system", content: "Rewrite this text to sound more human-like and natural." },
        { role: "user", content: text },
      ],
    });

    const humanized = response.choices[0]?.message?.content || "";

    return NextResponse.json({ humanizedText: humanized });
  } catch (err) {
    console.error("Humanize error:", err);
    return NextResponse.json({ error: "Failed to humanize" }, { status: 500 });
  }
}
