// app/api/detect/route.ts
import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";


export async function POST(req: Request) {
  try {
    const { text } = await req.json();

    if (!text || !text.trim()) {
      return NextResponse.json({ error: "No text provided" }, { status: 400 });
    }

    // Simulate detection result (replace later with real AI)
    const score = parseFloat((Math.random() * 100).toFixed(1));

    return NextResponse.json({ result: score });
  } catch (err) {
    console.error("Detect error:", err);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}