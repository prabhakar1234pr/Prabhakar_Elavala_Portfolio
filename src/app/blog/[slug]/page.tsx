import fs from "node:fs";
import path from "node:path";
import type { Metadata } from "next";

export async function generateStaticParams() {
  const dir = path.join(process.cwd(), "src", "content", "blog");
  if (!fs.existsSync(dir)) return [] as { slug: string }[];
  return fs
    .readdirSync(dir)
    .filter((f) => f.endsWith(".mdx"))
    .map((file) => ({ slug: file.replace(/\.mdx$/, "") }));
}

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  return { title: params.slug.replace(/-/g, " ") };
}

export default async function BlogPost({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const filePath = path.join(process.cwd(), "src", "content", "blog", `${slug}.mdx`);
  if (!fs.existsSync(filePath)) return <article>Not found</article>;
  const MDXModule = await import(`@/content/blog/${slug}.mdx`);
  const MDX = MDXModule.default;
  return <MDX />;
}


