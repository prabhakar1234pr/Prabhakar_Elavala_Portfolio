import { NextResponse } from "next/server";

type Message = { role: "user" | "assistant" | "system"; content: string };

export async function POST(req: Request) {
  const { messages, context } = (await req.json()) as {
    messages: Message[];
    context?: { suggest?: string };
  };

  const last = messages?.at(-1)?.content || "";
  let reply = "I am a simple portfolio assistant. Ask me about projects or experience.";
  if (/suggest.*project/i.test(last)) {
    reply = "Try exploring 'Song Popularity ML' for feature engineering insights.";
  } else if (/song popularity/i.test(last)) {
    reply = "The Song Popularity pipeline extracts audio features, trains gradient models, and serves inference via FastAPI.";
  } else if (context?.suggest) {
    reply = context.suggest;
  }

  return NextResponse.json({ ok: true, message: { role: "assistant", content: reply } });
}


