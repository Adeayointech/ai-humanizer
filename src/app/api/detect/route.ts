// app/api/detect/route.ts
import { NextResponse } from "next/server";
import OpenAI from "openai";

const groq = new OpenAI({ 
  apiKey: process.env.GROQ_API_KEY,
  baseURL: "https://api.groq.com/openai/v1"
});

export async function POST(req: Request) {
  try {
    const { text } = await req.json();

    if (!text || !text.trim()) {
      return NextResponse.json({ error: "No text provided" }, { status: 400 });
    }

    // Use Groq to detect AI-generated content
    const response = await groq.chat.completions.create({
      model: "llama-3.3-70b-versatile",
      messages: [
        { role: "system", content: "You are an AI content detector. Analyze the following text and estimate what percentage (0-100) was likely written by AI. Respond with ONLY a number between 0 and 100, nothing else." },
        { role: "user", content: text },
      ],
      temperature: 0.3,
    });

    const scoreText = response.choices[0]?.message?.content?.trim() || "50";
    const score = Math.min(100, Math.max(0, parseFloat(scoreText) || 50));

    return NextResponse.json({ result: score });
  } catch (err) {
    console.error("Detect error:", err);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}