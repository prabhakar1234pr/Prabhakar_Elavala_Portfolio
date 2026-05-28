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
    <div className="w-full px-5 py-14 md:px-10 xl:px-14">

      <div className="mb-12">
        <p className="mb-2 text-xs font-semibold uppercase tracking-widest text-white/60">
          Writing
        </p>
        <h1 className="text-4xl font-extrabold text-white mb-3">Technical Blog</h1>
        <p className="w-full max-w-5xl text-white/70">
          Insights and learnings from my work in AI/ML engineering, data science, and full-stack development.
        </p>
      </div>

      {posts.length === 0 ? (
        <div className="glass-panel rounded-2xl px-8 py-12 text-center">
          <h3 className="text-lg font-semibold text-white mb-2">Blog Coming Soon</h3>
          <p className="mx-auto max-w-md text-sm text-white/66">
            Working on articles about AI/ML, data science, and my experiences as a graduate student.
            Check back soon!
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">
          {posts.map((post) => (
            <Link
              key={post.slug}
              href={`/blog/${post.slug}`}
              className="glass-panel group flex min-h-[250px] flex-col gap-4 rounded-xl p-6 transition-all duration-300 hover:-translate-y-1"
            >
              <div className="flex items-center gap-2 text-xs text-white/50">
                <span>{new Date(post.date).toLocaleDateString()}</span>
                <span>·</span>
                <span>{post.readTime}</span>
              </div>

              <h2 className="text-xl font-semibold leading-snug text-white transition-colors group-hover:text-white/82">
                {post.title}
              </h2>

              <p className="flex-1 text-[15px] leading-relaxed text-white/75">{post.summary}</p>

              <div className="flex flex-wrap gap-1.5">
                {post.tags.map((tag) => (
                  <Badge
                    key={tag}
                    variant="secondary"
                    className="border-white/20 bg-white/8 text-[10px] text-white/78"
                  >
                    {tag}
                  </Badge>
                ))}
              </div>

              <span className="text-xs font-medium text-white/72 transition-colors group-hover:text-white">
                Read article →
              </span>
            </Link>
          ))}
        </div>
      )}

      <div className="glass-panel mt-16 flex w-full flex-col items-start justify-between gap-5 rounded-2xl px-8 py-8 md:flex-row md:items-center">
        <div>
          <h3 className="mb-2 text-lg font-semibold text-white">Want to discuss these topics?</h3>
          <p className="text-sm text-white/70">
          Always happy to chat about AI/ML, data engineering, or anything tech.
          </p>
        </div>
        <Link
          href="/contact"
          className="inline-flex whitespace-nowrap rounded-lg border border-white/20 bg-white px-5 py-2 text-sm font-semibold text-black shadow-lg shadow-black/30 transition-colors hover:bg-white/85"
        >
          Get In Touch
        </Link>
      </div>

    </div>
  );
}
