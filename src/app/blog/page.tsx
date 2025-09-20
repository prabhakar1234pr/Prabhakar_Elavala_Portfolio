import fs from "node:fs";
import path from "node:path";

export const dynamic = "force-static";

function getPosts() {
  const dir = path.join(process.cwd(), "src", "content", "blog");
  if (!fs.existsSync(dir)) return [] as { slug: string; title: string }[];
  return fs
    .readdirSync(dir)
    .filter((f) => f.endsWith(".mdx"))
    .map((file) => {
      const slug = file.replace(/\.mdx$/, "");
      // naive title from slug; MDX frontmatter can be added later
      const title = slug
        .split("-")
        .map((w) => w[0]?.toUpperCase() + w.slice(1))
        .join(" ");
      return { slug, title };
    });
}

export default function BlogIndex() {
  const posts = getPosts();
  return (
    <div>
      <h1 className="text-3xl font-semibold">Blog</h1>
      <ul className="mt-6 space-y-3">
        {posts.map((p) => (
          <li key={p.slug}>
            <a className="underline" href={`/blog/${p.slug}`}>{p.title}</a>
          </li>
        ))}
        {posts.length === 0 && (
          <li className="text-muted-foreground">No posts yet.</li>
        )}
      </ul>
    </div>
  );
}


