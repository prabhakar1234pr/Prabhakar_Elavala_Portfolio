import fs from "node:fs";
import path from "node:path";
import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
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
      
      // Extract frontmatter
      const frontmatterMatch = content.match(/^---\n([\s\S]*?)\n---/);
      const frontmatter: Record<string, string | string[]> = {};
      
      if (frontmatterMatch) {
        const frontmatterText = frontmatterMatch[1];
        frontmatterText.split('\n').forEach(line => {
          const [key, ...valueParts] = line.split(':');
          if (key && valueParts.length > 0) {
            const value = valueParts.join(':').trim();
            if (key.trim() === 'tags') {
              frontmatter[key.trim()] = value.split(',').map(tag => tag.trim());
            } else {
              frontmatter[key.trim()] = value;
            }
          }
        });
      }
      
      return {
        slug,
        title: Array.isArray(frontmatter.title) ? frontmatter.title[0] : (frontmatter.title || slug.split("-").map((w) => w[0]?.toUpperCase() + w.slice(1)).join(" ")),
        summary: Array.isArray(frontmatter.summary) ? frontmatter.summary[0] : (frontmatter.summary || "No summary available"),
        date: Array.isArray(frontmatter.date) ? frontmatter.date[0] : (frontmatter.date || "2025-01-20"),
        readTime: Array.isArray(frontmatter.readTime) ? frontmatter.readTime[0] : (frontmatter.readTime || "5 min read"),
        tags: Array.isArray(frontmatter.tags) ? frontmatter.tags : (frontmatter.tags ? [frontmatter.tags] : ["Tech"])
      };
    })
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}

export default function BlogIndex() {
  const posts = getPosts();
  
  return (
    <div className="mx-auto max-w-6xl px-6 py-12">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
          Technical Blog
        </h1>
        <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
          Sharing insights, experiences, and learnings from my journey in AI/ML engineering, 
          data science, and full-stack development.
        </p>
      </div>

      {posts.length === 0 ? (
        <div className="text-center py-12">
          <div className="bg-gradient-to-r from-purple-500/10 to-blue-500/10 border border-purple-300/20 rounded-2xl p-8 max-w-2xl mx-auto">
            <h3 className="text-xl font-semibold mb-3 text-purple-200">
              📝 Blog Coming Soon!
            </h3>
            <p className="text-muted-foreground">
              I&apos;m working on some exciting technical articles about AI/ML, data science, 
              and my experiences as a graduate student. Check back soon!
            </p>
          </div>
        </div>
      ) : (
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-2">
          {posts.map((post) => (
            <Card
              key={post.slug}
              className="group bg-white/5 backdrop-blur-sm border border-white/10 hover:border-purple-300/30 transition-all duration-300 hover:translate-y-[-4px] hover:shadow-2xl hover:shadow-purple-500/10"
            >
              <CardHeader className="pb-4">
                <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
                  <span>📅 {new Date(post.date).toLocaleDateString()}</span>
                  <span>•</span>
                  <span>⏱️ {post.readTime}</span>
                </div>
                <CardTitle className="text-xl group-hover:text-purple-300 transition-colors">
                  {post.title}
                </CardTitle>
              </CardHeader>

              <CardContent className="space-y-4">
                <p className="text-muted-foreground leading-relaxed">
                  {post.summary}
                </p>

                <div className="flex flex-wrap gap-2">
                  {post.tags.map((tag) => (
                    <Badge
                      key={tag}
                      variant="secondary"
                      className="bg-purple-500/20 text-purple-100 border-purple-300/30 hover:bg-purple-500/30 transition-colors"
                    >
                      {tag}
                    </Badge>
                  ))}
                </div>

                <div className="pt-4 border-t border-white/10">
                  <Link
                    href={`/blog/${post.slug}`}
                    className="inline-flex items-center gap-2 text-blue-400 hover:text-blue-300 underline transition-colors font-medium"
                  >
                    📖 Read Full Article
                  </Link>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      <div className="mt-16 text-center">
        <div className="bg-gradient-to-r from-purple-500/10 to-blue-500/10 border border-purple-300/20 rounded-2xl p-8 max-w-2xl mx-auto">
          <h3 className="text-xl font-semibold mb-3 text-purple-200">
            💡 Want to discuss these topics?
          </h3>
          <p className="text-muted-foreground mb-4">
            I love connecting with fellow developers, researchers, and students. 
            Feel free to reach out if you want to discuss any of these articles!
          </p>
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600 text-white font-medium py-2 px-6 rounded-lg transition-all duration-200"
          >
            💬 Get In Touch
          </Link>
        </div>
      </div>
    </div>
  );
}


