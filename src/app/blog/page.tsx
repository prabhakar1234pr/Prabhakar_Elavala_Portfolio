import fs from "node:fs";
import path from "node:path";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";

export const dynamic = "force-static";

interface BlogPost {
  slug: string;
  title: string;
  summary: string;
  date: string;
  readTime: string;
  tags: string[];
}

function getPosts(): BlogPost[] {
  const dir = path.join(process.cwd(), "src", "content", "blog");
  if (!fs.existsSync(dir)) return [];

  return fs
    .readdirSync(dir)
    .filter((f) => f.endsWith(".mdx"))
    .map((file) => {
      const slug = file.replace(/\.mdx$/, "");
      const content = fs.readFileSync(path.join(dir, file), "utf-8");
      const frontmatterMatch = content.match(/^---\n([\s\S]*?)\n---/);
      const fm: Record<string, string | string[]> = {};

      if (frontmatterMatch) {
        frontmatterMatch[1].split("\n").forEach((line) => {
          const [key, ...rest] = line.split(":");
          if (key && rest.length) {
            const val = rest.join(":").trim();
            fm[key.trim()] = key.trim() === "tags"
              ? val.split(",").map((t) => t.trim())
              : val;
          }
        });
      }

      const str = (v: string | string[] | undefined) =>
        Array.isArray(v) ? v[0] : v ?? "";

      return {
        slug,
        title: str(fm.title) || slug.split("-").map((w) => w[0]?.toUpperCase() + w.slice(1)).join(" "),
        summary: str(fm.summary) || "",
        date: str(fm.date) || "2025-01-20",
        readTime: str(fm.readTime) || "5 min read",
        tags: Array.isArray(fm.tags) ? fm.tags : fm.tags ? [fm.tags as string] : ["Tech"],
      };
    })
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}

export default function BlogIndex() {
  const posts = getPosts();

  return (
    <div className="mx-auto max-w-5xl px-6 py-14">

      <div className="mb-12">
        <p className="mb-2 text-xs font-semibold uppercase tracking-widest text-violet-400">
          Writing
        </p>
        <h1 className="text-4xl font-extrabold text-white mb-3">Technical Blog</h1>
        <p className="text-slate-400 max-w-xl">
          Insights and learnings from my work in AI/ML engineering, data science, and full-stack development.
        </p>
      </div>

      {posts.length === 0 ? (
        <div className="rounded-2xl border border-violet-500/20 bg-gradient-to-r from-violet-500/8 to-cyan-500/8 px-8 py-12 text-center">
          <h3 className="text-lg font-semibold text-white mb-2">Blog Coming Soon</h3>
          <p className="text-slate-400 text-sm max-w-md mx-auto">
            Working on articles about AI/ML, data science, and my experiences as a graduate student.
            Check back soon!
          </p>
        </div>
      ) : (
        <div className="grid gap-6 md:grid-cols-2">
          {posts.map((post) => (
            <Link
              key={post.slug}
              href={`/blog/${post.slug}`}
              className="group flex flex-col gap-4 rounded-xl border border-white/[0.08] bg-white/[0.03] p-6 hover:border-violet-500/30 hover:bg-violet-500/5 transition-all duration-300"
            >
              <div className="flex items-center gap-2 text-xs text-slate-500">
                <span>{new Date(post.date).toLocaleDateString()}</span>
                <span>·</span>
                <span>{post.readTime}</span>
              </div>

              <h2 className="text-lg font-semibold text-white group-hover:text-violet-300 transition-colors leading-snug">
                {post.title}
              </h2>

              <p className="text-sm text-slate-400 leading-relaxed flex-1">{post.summary}</p>

              <div className="flex flex-wrap gap-1.5">
                {post.tags.map((tag) => (
                  <Badge
                    key={tag}
                    variant="secondary"
                    className="bg-violet-500/10 text-violet-300 border-violet-500/20 text-[10px]"
                  >
                    {tag}
                  </Badge>
                ))}
              </div>

              <span className="text-xs font-medium text-violet-400 group-hover:text-violet-300 transition-colors">
                Read article →
              </span>
            </Link>
          ))}
        </div>
      )}

      <div className="mt-16 rounded-2xl border border-violet-500/20 bg-gradient-to-r from-violet-500/8 to-cyan-500/8 px-8 py-10 text-center">
        <h3 className="text-lg font-semibold text-white mb-2">Want to discuss these topics?</h3>
        <p className="text-sm text-slate-400 mb-5">
          Always happy to chat about AI/ML, data engineering, or anything tech.
        </p>
        <Link
          href="/contact"
          className="inline-flex rounded-lg bg-violet-600 hover:bg-violet-700 px-5 py-2 text-sm font-semibold text-white transition-colors shadow-lg shadow-violet-900/40"
        >
          Get In Touch
        </Link>
      </div>

    </div>
  );
}
