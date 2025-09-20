import { NextResponse } from "next/server";
import { projects } from "@/data/projects";
import { experience } from "@/data/experience";
import fs from "node:fs";
import path from "node:path";

type Message = { role: "user" | "assistant" | "system"; content: string };

export async function POST(req: Request) {
  try {
    const { messages } = (await req.json()) as { messages: Message[] };
    console.log("API Request received:", { messagesCount: messages?.length, lastMessage: messages?.at(-1) });

    const contextText = buildContext();
    const last = messages?.at(-1)?.content || "";

    // Prefer Groq if configured
    const groqKey = process.env.GROQ_API_KEY;
    const groqModel = process.env.GROQ_MODEL || "llama-3.3-70b-versatile";
    console.log("Environment check:", { hasGroqKey: !!groqKey, groqModel });
    
    if (groqKey) {
      try {
        console.log("Attempting Groq API call...");
        const ai = await callGroq({ apiKey: groqKey, model: groqModel, messages, contextText });
        console.log("Groq API success:", { responseLength: ai?.length });
        return NextResponse.json({ ok: true, message: { role: "assistant", content: ai }, provider: "groq" });
      } catch (gErr) {
        console.error("Groq call failed:", gErr);
        console.warn("Groq call failed, trying Azure/mock:", gErr);
      }
    } else {
      console.log("No GROQ API key found, skipping Groq");
    }

    const endpoint = process.env.AZURE_OPENAI_ENDPOINT;
    const apiKey = process.env.AZURE_OPENAI_KEY;
    const apiVersion = process.env.AZURE_OPENAI_API_VERSION;
    const deployment = process.env.AZURE_OPENAI_DEPLOYMENT_GPT_4_1;

    if (endpoint && apiKey && apiVersion && deployment) {
      try {
        const ai = await callAzure({ endpoint, apiKey, apiVersion, deployment, messages, contextText });
        return NextResponse.json({ ok: true, message: { role: "assistant", content: ai } });
      } catch (azureErr) {
        console.warn("Azure call failed, falling back to mock:", azureErr);
        const reply = simpleMockReply(last, contextText);
        return NextResponse.json({ ok: true, message: { role: "assistant", content: reply }, mock: true });
      }
    }

    // Mock fallback
    console.log("Falling back to mock reply");
    const reply = simpleMockReply(last, contextText);
    console.log("Mock reply generated:", { replyLength: reply?.length });
    return NextResponse.json({ ok: true, message: { role: "assistant", content: reply }, mock: true });
  } catch (err) {
    console.error("/api/assistant error", err);
    return NextResponse.json({ ok: false, error: "Internal error" }, { status: 500 });
  }
}

function buildContext(): string {
  const proj = projects
    .map((p) => {
      const links = [];
      if (p.links.github) links.push(`GitHub: ${p.links.github}`);
      if (p.links.demo) links.push(`Demo: ${p.links.demo}`);
      const linkText = links.length > 0 ? ` | Links: ${links.join(", ")}` : "";
      const metrics = p.highlightMetrics ? ` | Metrics: ${p.highlightMetrics.join(", ")}` : "";
      return `- **${p.title}**: ${p.summary} | Tech: **${p.tech.join(", ")}**${linkText}${metrics}`;
    })
    .join("\n");
  
  const exp = experience
    .map((e) => `- **${e.role}** @ **${e.org}** (${e.dates}): ${e.bullets.join("; ")}`)
    .join("\n");
  
  const blogDir = path.join(process.cwd(), "src", "content", "blog");
  const posts = fs.existsSync(blogDir)
    ? fs
        .readdirSync(blogDir)
        .filter((f) => f.endsWith(".mdx"))
        .map((f) => `- ${f.replace(/\.mdx$/, "")}`)
        .join("\n")
    : "- hello-world";
  
  return `You are the portfolio assistant for Prabhakar Elavala, an AI/ML Engineer specializing in backend services, SaaS integrations, and LLM automation.

## Projects:
${proj}

## Experience:
${exp}

## Blog Posts:
${posts}

## Website Sections:
- **Projects Page**: /projects - View all projects with detailed descriptions
- **Experience Page**: /experience - Full work history and achievements  
- **Contact Page**: /contact - Get in touch with Prabhakar
- **Blog Page**: /blog - Technical articles and insights`;
}

function simpleMockReply(user: string, context: string): string {
  if (/project|portfolio/i.test(user)) {
    return `## 🚀 Featured Projects\n\n${projects.slice(0, 3).map((p) => {
      const links = [];
      if (p.links.github) links.push(`[GitHub](${p.links.github})`);
      if (p.links.demo) links.push(`[Demo](${p.links.demo})`);
      const linkText = links.length > 0 ? `\n   Links: ${links.join(" | ")}` : "";
      return `• **${p.title}** – ${p.summary}\n   Tech: **${p.tech.join(", ")}**${linkText}`;
    }).join("\n\n")}\n\n💡 *Visit the [Projects page](/projects) for more details!*`;
  }
  if (/experience|work/i.test(user)) {
    return `## 💼 Current Role\n\n**${experience[0].role}** @ **${experience[0].org}** (${experience[0].dates})\n\n• ${experience[0].bullets.join("\n• ")}\n\n💡 *Check out the [Experience page](/experience) for my full work history!*`;
  }
  return `## 👋 Hi there!\n\nI'm Prabhakar Elavala's AI assistant. I can help you learn about:\n\n• **Projects** – AI/ML projects and backend systems\n• **Experience** – Professional background in AI/ML engineering\n• **Skills** – Technical expertise and achievements\n• **Contact** – How to get in touch\n\n💡 *Try asking: "Tell me about your projects" or "What's your experience?"*`;
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
  // Prefer Chat Completions unless explicitly opting into Responses API
  // Some Azure regions/models don't support `responses` yet → 404.
  const useResponses = (process.env.AZURE_OPENAI_USE_RESPONSES === "1") || /4\.1/i.test(deployment);
  const system = `You are Prabhakar Elavala's AI assistant for his portfolio website. You are knowledgeable, professional, and engaging.

FORMATTING GUIDELINES:
- Use clear headings with "##" for sections
- Use bullet points with "•" for lists
- Include relevant links when mentioning projects or experiences
- Keep responses well-structured and easy to scan
- Use emojis sparingly but effectively (🚀, 💻, 🔧, etc.)
- Format technical skills and technologies in **bold**

RESPONSE STYLE:
- Be conversational but professional
- Highlight key achievements and metrics
- Include specific technologies and tools used
- Reference portfolio sections (Projects, Experience, Contact)
- Encourage exploration of the website

${contextText}`;

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
    if (!res.ok) {
      const errBody = await safeText(res);
      throw new Error(`Azure responses error ${res.status}: ${errBody}`);
    }
    const data: unknown = await res.json();
    const text = extractResponsesText(data);
    return text;
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
  if (!res.ok) {
    const errBody = await safeText(res);
    throw new Error(`Azure chat error ${res.status}: ${errBody}`);
  }
  const data: unknown = await res.json();
  const text = extractChatCompletionsText(data);
  return text;
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null;
}

function extractResponsesText(data: unknown): string {
  if (isRecord(data)) {
    const output = data["output_text"];
    if (typeof output === "string") return output;
    const content = data["content"];
    if (Array.isArray(content) && content.length > 0) {
      const first = content[0];
      if (isRecord(first) && typeof first["text"] === "string") {
        return first["text"] as string;
      }
    }
  }
  try {
    return JSON.stringify(data);
  } catch {
    return "";
  }
}

async function safeText(res: Response): Promise<string> {
  try {
    return await res.text();
  } catch {
    return "";
  }
}

async function callGroq({
  apiKey,
  model,
  messages,
  contextText,
}: {
  apiKey: string;
  model: string;
  messages: Message[];
  contextText: string;
}): Promise<string> {
  const system = `You are Prabhakar Elavala's AI assistant for his portfolio website. You are knowledgeable, professional, and engaging.

FORMATTING GUIDELINES:
- Use clear headings with "##" for sections
- Use bullet points with "•" for lists
- Include relevant links when mentioning projects or experiences
- Keep responses well-structured and easy to scan
- Use emojis sparingly but effectively (🚀, 💻, 🔧, etc.)
- Format technical skills and technologies in **bold**

RESPONSE STYLE:
- Be conversational but professional
- Highlight key achievements and metrics
- Include specific technologies and tools used
- Reference portfolio sections (Projects, Experience, Contact)
- Encourage exploration of the website

${contextText}`;
  const url = "https://api.groq.com/openai/v1/chat/completions";
  const res = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
      model,
      messages: [{ role: "system", content: system }, ...messages],
      temperature: 0.2,
      max_tokens: 512,
    }),
  });
  if (!res.ok) {
    const errBody = await safeText(res);
    throw new Error(`Groq error ${res.status}: ${errBody}`);
  }
  const data: unknown = await res.json();
  return extractChatCompletionsText(data);
}

function extractChatCompletionsText(data: unknown): string {
  if (isRecord(data)) {
    const choices = data["choices"];
    if (Array.isArray(choices) && choices.length > 0) {
      const first = choices[0];
      if (isRecord(first)) {
        const message = first["message"];
        if (isRecord(message) && typeof message["content"] === "string") {
          return message["content"] as string;
        }
      }
    }
  }
  try {
    return JSON.stringify(data);
  } catch {
    return "";
  }
}


