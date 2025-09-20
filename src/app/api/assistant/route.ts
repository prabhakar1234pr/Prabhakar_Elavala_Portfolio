import { NextResponse } from "next/server";
import { projects } from "@/data/projects";
import { experience } from "@/data/experience";
import fs from "node:fs";
import path from "node:path";

type Message = { role: "user" | "assistant" | "system"; content: string };

export async function POST(req: Request) {
  try {
    const { messages } = (await req.json()) as { messages: Message[] };

    const contextText = buildContext();

    const endpoint = process.env.AZURE_OPENAI_ENDPOINT;
    const apiKey = process.env.AZURE_OPENAI_KEY;
    const apiVersion = process.env.AZURE_OPENAI_API_VERSION;
    const deployment = process.env.AZURE_OPENAI_DEPLOYMENT_GPT_4_1;

    if (endpoint && apiKey && apiVersion && deployment) {
      const ai = await callAzure({ endpoint, apiKey, apiVersion, deployment, messages, contextText });
      return NextResponse.json({ ok: true, message: { role: "assistant", content: ai } });
    }

    // Mock fallback
    const last = messages?.at(-1)?.content || "";
    const reply = simpleMockReply(last, contextText);
    return NextResponse.json({ ok: true, message: { role: "assistant", content: reply }, mock: true });
  } catch (err) {
    console.error("/api/assistant error", err);
    return NextResponse.json({ ok: false, error: "Internal error" }, { status: 500 });
  }
}

function buildContext(): string {
  const proj = projects
    .map((p) => `- ${p.title}: ${p.summary} [tech: ${p.tech.join(", ")}]`)
    .join("\n");
  const exp = experience
    .map((e) => `- ${e.role} @ ${e.org} (${e.dates}): ${e.bullets.join("; ")}`)
    .join("\n");
  const blogDir = path.join(process.cwd(), "src", "content", "blog");
  const posts = fs.existsSync(blogDir)
    ? fs
        .readdirSync(blogDir)
        .filter((f) => f.endsWith(".mdx"))
        .map((f) => `- ${f.replace(/\.mdx$/, "")}`)
        .join("\n")
    : "";
  return `You are the portfolio assistant for Prabhakar Elavala. Projects:\n${proj}\n\nExperience:\n${exp}\n\nBlog posts:\n${posts}`;
}

function simpleMockReply(user: string, context: string): string {
  if (/project|portfolio/i.test(user)) {
    return `Here are a few highlighted projects:\n${projects.slice(0, 3).map((p) => `• ${p.title} – ${p.summary}`).join("\n")}`;
  }
  if (/experience|work/i.test(user)) {
    return `Recent experience includes ${experience[0].org} (${experience[0].role}).`;
  }
  return `Context summary:\n${context}\n\nAsk about projects, experience, or blog posts.`;
}

async function callAzure({
  endpoint,
  apiKey,
  apiVersion,
  deployment,
  messages,
  contextText,
}: {
  endpoint: string;
  apiKey: string;
  apiVersion: string;
  deployment: string;
  messages: Message[];
  contextText: string;
}): Promise<string> {
  // Prefer the Responses API for GPT-4.1 deployments
  const useResponses = /4\.1/i.test(deployment);
  const system = `You are an expert assistant for a personal portfolio website. Be concise, helpful, and reference site sections.\n${contextText}`;

  if (useResponses) {
    const url = `${endpoint}/openai/deployments/${deployment}/responses?api-version=${apiVersion}`;
    const res = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "api-key": apiKey,
      },
      body: JSON.stringify({
        input: [
          { role: "system", content: system },
          ...messages.map((m) => ({ role: m.role, content: m.content })),
        ],
        temperature: 0.2,
        max_output_tokens: 512,
      }),
    });
    const data = (await res.json()) as any;
    const text = data?.output_text || data?.content?.[0]?.text || JSON.stringify(data);
    return text as string;
  }

  // Fallback to Chat Completions for non-4.1 deployments
  const url = `${endpoint}/openai/deployments/${deployment}/chat/completions?api-version=${apiVersion}`;
  const res = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "api-key": apiKey,
    },
    body: JSON.stringify({
      messages: [{ role: "system", content: system }, ...messages],
      temperature: 0.2,
      max_tokens: 512,
    }),
  });
  const data = (await res.json()) as any;
  const text = data?.choices?.[0]?.message?.content || JSON.stringify(data);
  return text as string;
}


