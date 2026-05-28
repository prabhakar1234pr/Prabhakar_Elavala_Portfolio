import fs from "node:fs";
import path from "node:path";
import Link from "next/link";
import type { Metadata } from "next";
import { ArrowLeft, Calendar, Clock, Tag } from "lucide-react";
import ReactMarkdown from "react-markdown";

interface BlogMetadata {
  title: string;
  summary: string;
  date: string;
  readTime: string;
  tags: string[];
}

// Robust frontmatter parser — handles colons in values and Windows line endings
function parseFrontmatter(raw: string): { metadata: BlogMetadata; body: string } {
  // Normalize line endings
  const content = raw.replace(/\r\n/g, "\n").replace(/\r/g, "\n");

  const match = content.match(/^---\n([\s\S]*?)\n---\n?([\s\S]*)$/);
  if (!match) {
    return {
      metadata: { title: "", summary: "", date: "", readTime: "5 min read", tags: ["Tech"] },
      body: content,
    };
  }

  const frontmatterText = match[1];
  const body = match[2].trim();
  const fm: Record<string, string> = {};

  for (const line of frontmatterText.split("\n")) {
    const colonIdx = line.indexOf(":");
    if (colonIdx === -1) continue;
    const key = line.slice(0, colonIdx).trim();
    const value = line.slice(colonIdx + 1).trim();
    if (key) fm[key] = value;
  }

  return {
    metadata: {
      title:    fm.title    ?? "",
      summary:  fm.summary  ?? "",
      date:     fm.date     ?? "",
      readTime: fm.readTime ?? "5 min read",
      tags:     fm.tags ? fm.tags.split(",").map((t) => t.trim()).filter(Boolean) : ["Tech"],
    },
    body,
  };
}

export async function generateStaticParams() {
  const dir = path.join(process.cwd(), "src", "content", "blog");
  if (!fs.existsSync(dir)) return [] as { slug: string }[];
  return fs
    .readdirSync(dir)
    .filter((f) => f.endsWith(".mdx"))
    .map((file) => ({ slug: file.replace(/\.mdx$/, "") }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const filePath = path.join(process.cwd(), "src", "content", "blog", `${slug}.mdx`);
  if (!fs.existsSync(filePath)) return { title: slug.replace(/-/g, " ") };

  const raw = fs.readFileSync(filePath, "utf-8");
  const { metadata } = parseFrontmatter(raw);
  return {
    title: `${metadata.title} | Prabhakar Elavala`,
    description: metadata.summary,
    keywords: metadata.tags.join(", "),
    openGraph: {
      title: metadata.title,
      description: metadata.summary,
      type: "article",
      publishedTime: metadata.date,
      tags: metadata.tags,
    },
  };
}

export default async function BlogPost({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const filePath = path.join(process.cwd(), "src", "content", "blog", `${slug}.mdx`);

  if (!fs.existsSync(filePath)) {
    return (
      <div className="mx-auto max-w-4xl px-6 py-24 text-center">
        <h1 className="text-2xl font-bold text-white mb-4">Article not found</h1>
        <Link href="/blog" className="text-white/76 transition-colors hover:text-white">
          ← Back to Blog
        </Link>
      </div>
    );
  }

  const raw = fs.readFileSync(filePath, "utf-8");
  const { metadata, body } = parseFrontmatter(raw);

  return (
    <div className="min-h-screen">

      {/* ── Hero ── */}
      <div className="border-b border-white/10 bg-white/[0.015]">
        <div className="mx-auto w-full max-w-[1400px] px-6 py-12 md:px-10">

          <Link
            href="/blog"
            className="group mb-8 inline-flex items-center gap-2 text-sm text-white/55 transition-colors hover:text-white"
          >
            <ArrowLeft className="w-3.5 h-3.5 group-hover:-translate-x-0.5 transition-transform" />
            Back
          </Link>

          <h1 className="text-3xl sm:text-4xl font-extrabold text-white leading-tight mb-4">
            {metadata.title}
          </h1>

          {metadata.summary && (
            <p className="mb-6 max-w-5xl text-lg leading-relaxed text-white/75">
              {metadata.summary}
            </p>
          )}

          <div className="flex flex-wrap items-center gap-5 text-xs text-white/50">
            {metadata.date && (
              <span className="flex items-center gap-1.5">
                <Calendar className="w-3.5 h-3.5" />
                {new Date(metadata.date).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </span>
            )}
            <span className="flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5" />
              {metadata.readTime}
            </span>
            {metadata.tags.length > 0 && (
              <span className="flex items-center gap-2">
                <Tag className="w-3.5 h-3.5" />
                {metadata.tags.slice(0, 3).map((tag) => (
                  <span
                    key={tag}
                    className="rounded-md border border-white/20 bg-white/8 px-2 py-0.5 font-medium text-white/78"
                  >
                    {tag}
                  </span>
                ))}
              </span>
            )}
          </div>
        </div>
      </div>

      {/* ── Body ── */}
      <article className="mx-auto w-full max-w-[1400px] px-6 py-14 pb-28 md:px-10">
        <div className="
          [&>p]:mb-7 [&>p]:max-w-none [&>p]:text-[18px] [&>p]:leading-[1.95] [&>p]:text-white/88
          [&>h1]:mt-14 [&>h1]:mb-5 [&>h1]:text-4xl [&>h1]:font-extrabold [&>h1]:leading-tight [&>h1]:tracking-tight [&>h1]:text-white
          [&>h2]:mt-12 [&>h2]:mb-4 [&>h2]:border-b [&>h2]:border-white/12 [&>h2]:pb-3 [&>h2]:text-3xl [&>h2]:font-bold [&>h2]:leading-snug [&>h2]:text-white
          [&>h3]:mt-10 [&>h3]:mb-3 [&>h3]:text-2xl [&>h3]:font-semibold [&>h3]:text-white/92
          [&>h4]:mt-8 [&>h4]:mb-2 [&>h4]:text-xl [&>h4]:font-semibold [&>h4]:text-white/90
          [&>ul]:my-6 [&>ul]:list-none [&>ul]:space-y-2 [&>ul]:pl-0
          [&>ol]:my-6 [&>ol]:list-decimal [&>ol]:space-y-2 [&>ol]:pl-6
          [&_li]:text-[17px] [&_li]:leading-[1.85] [&_li]:text-white/85
          [&>blockquote]:my-8 [&>blockquote]:pl-5 [&>blockquote]:py-4 [&>blockquote]:pr-4 [&>blockquote]:border-l-[3px] [&>blockquote]:border-white/50 [&>blockquote]:bg-white/7 [&>blockquote]:rounded-r-xl [&>blockquote]:text-white/72 [&>blockquote]:text-[16px] [&>blockquote]:leading-relaxed
          [&>hr]:my-12 [&>hr]:border-white/12
          [&_strong]:text-white [&_strong]:font-semibold
          [&_em]:text-white/88 [&_em]:italic
          [&_a]:text-white [&_a]:underline [&_a]:underline-offset-2 [&_a]:decoration-white/50 hover:[&_a]:text-white hover:[&_a]:decoration-white/70
          [&_table]:my-8 [&_table]:w-full [&_table]:border-collapse [&_table]:rounded-xl [&_table]:overflow-hidden
          [&_thead]:bg-white/8
          [&_th]:px-4 [&_th]:py-3 [&_th]:text-left [&_th]:text-xs [&_th]:font-semibold [&_th]:uppercase [&_th]:tracking-wider [&_th]:text-white/85 [&_th]:border-b [&_th]:border-white/12
          [&_td]:px-4 [&_td]:py-3 [&_td]:text-sm [&_td]:text-white/80 [&_td]:border-b [&_td]:border-white/8
          [&_tr:hover]:bg-white/[0.02]
        ">
          <ReactMarkdown
            components={{
              a: ({ href, children }) => (
                <a href={href} target="_blank" rel="noopener noreferrer"
                  className="text-white/84 underline underline-offset-2 decoration-white/40 transition-colors hover:text-white hover:decoration-white/60">
                  {children}
                </a>
              ),
              pre: ({ children }) => (
                <pre className="my-8 overflow-x-auto rounded-xl border border-white/12 bg-black/35 px-6 py-5 text-[13px] leading-relaxed">
                  {children}
                </pre>
              ),
              code: ({ className, children }) =>
                className
                  ? <code className="font-mono text-[13px] text-white/88">{children}</code>
                  : <code className="rounded border border-white/20 bg-white/10 px-1.5 py-0.5 font-mono text-[13px] text-white/88">{children}</code>,
              li: ({ children }) => (
                <li className="flex gap-3 text-[16px] leading-[1.75] text-white/72">
                  <span className="mt-[10px] h-1.5 w-1.5 flex-shrink-0 rounded-full bg-white/65" />
                  <span>{children}</span>
                </li>
              ),
              p: ({ children }) => (
                <p className="mb-7 text-[18px] leading-[1.95] text-white/88">{children}</p>
              ),
            }}
          >
            {body}
          </ReactMarkdown>
        </div>
      </article>

      {/* ── Footer ── */}
      <div className="mx-auto w-full max-w-[1400px] border-t border-white/10 px-6 pb-16 pt-8 md:px-10">
        <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
          <div>
            <p className="text-sm text-white font-medium">Prabhakar Elavala</p>
            <p className="mt-0.5 text-xs text-white/50">AI/ML Engineer · MS Informatics, Northeastern University</p>
          </div>
          <div className="flex gap-3">
            <Link href="/contact"
              className="rounded-lg border border-white/20 bg-white/8 px-4 py-2 text-xs font-semibold text-white/84 transition-colors hover:bg-white/16">
              Discuss This
            </Link>
            <Link href="/blog"
              className="rounded-lg border border-white/20 bg-white/8 px-4 py-2 text-xs font-semibold text-white/84 transition-colors hover:bg-white/16">
              More Articles
            </Link>
          </div>
        </div>
      </div>

    </div>
  );
}
