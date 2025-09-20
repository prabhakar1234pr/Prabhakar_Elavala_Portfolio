import fs from "node:fs";
import path from "node:path";
import Link from "next/link";
import type { Metadata } from "next";
import { ArrowLeft, Calendar, Clock, Tag } from "lucide-react";

interface BlogMetadata {
  title: string;
  summary: string;
  date: string;
  readTime: string;
  tags: string[];
}

function extractMetadata(content: string): BlogMetadata {
  const frontmatterMatch = content.match(/^---\n([\s\S]*?)\n---/);
  let title = "Blog Post";
  let summary = "A technical article";
  let date = "2025-01-01";
  let readTime = "5 min read";
  let tags: string[] = ["Tech"];
  
  if (frontmatterMatch) {
    const frontmatterText = frontmatterMatch[1];
    frontmatterText.split('\n').forEach(line => {
      const [key, ...valueParts] = line.split(':');
      if (key && valueParts.length > 0) {
        const value = valueParts.join(':').trim();
        const trimmedKey = key.trim();
        
        switch (trimmedKey) {
          case 'title':
            title = value;
            break;
          case 'summary':
            summary = value;
            break;
          case 'date':
            date = value;
            break;
          case 'readTime':
            readTime = value;
            break;
          case 'tags':
            tags = value.split(',').map(tag => tag.trim());
            break;
        }
      }
    });
  }
  
  return { title, summary, date, readTime, tags };
}

export async function generateStaticParams() {
  const dir = path.join(process.cwd(), "src", "content", "blog");
  if (!fs.existsSync(dir)) return [] as { slug: string }[];
  return fs
    .readdirSync(dir)
    .filter((f) => f.endsWith(".mdx"))
    .map((file) => ({ slug: file.replace(/\.mdx$/, "") }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const filePath = path.join(process.cwd(), "src", "content", "blog", `${slug}.mdx`);
  
  if (fs.existsSync(filePath)) {
    const content = fs.readFileSync(filePath, "utf-8");
    const metadata = extractMetadata(content);
    
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
  
  return { title: slug.replace(/-/g, " ") };
}

export default async function BlogPost({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const filePath = path.join(process.cwd(), "src", "content", "blog", `${slug}.mdx`);
  
  if (!fs.existsSync(filePath)) {
    return (
      <article className="mx-auto max-w-4xl px-6 py-12">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-red-400 mb-4">Article Not Found</h1>
          <p className="text-muted-foreground mb-6">Sorry, the requested blog post could not be found.</p>
          <Link 
            href="/blog"
            className="inline-flex items-center gap-2 bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600 text-white font-medium py-2 px-6 rounded-lg transition-all duration-200"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Blog
          </Link>
        </div>
      </article>
    );
  }

  const content = fs.readFileSync(filePath, "utf-8");
  const metadata = extractMetadata(content);
  const MDXModule = await import(`@/content/blog/${slug}.mdx`);
  const MDX = MDXModule.default;

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-purple-950/20">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-purple-900/20 to-blue-900/20 border-b border-white/10">
        <div className="mx-auto max-w-4xl px-6 py-12">
          {/* Back Navigation */}
          <Link 
            href="/blog"
            className="inline-flex items-center gap-2 text-purple-300 hover:text-purple-200 transition-colors mb-8 group"
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            Back to Blog
          </Link>

          {/* Article Header */}
          <header className="space-y-6">
            <h1 className="text-4xl md:text-5xl font-bold leading-tight bg-gradient-to-r from-purple-300 to-blue-300 bg-clip-text text-transparent">
              {metadata.title}
            </h1>
            
            <p className="text-xl text-muted-foreground leading-relaxed max-w-3xl">
              {metadata.summary}
            </p>

            {/* Article Meta */}
            <div className="flex flex-wrap items-center gap-6 text-sm text-muted-foreground">
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4 text-purple-400" />
                <time dateTime={metadata.date}>
                  {new Date(metadata.date).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                  })}
                </time>
              </div>
              
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-blue-400" />
                <span>{metadata.readTime}</span>
              </div>
              
              <div className="flex items-center gap-2">
                <Tag className="w-4 h-4 text-green-400" />
                <div className="flex gap-2">
                  {metadata.tags.slice(0, 3).map((tag) => (
                    <span 
                      key={tag}
                      className="bg-purple-500/20 text-purple-200 px-2 py-1 rounded-md text-xs font-medium"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </header>
        </div>
      </div>

      {/* Article Content */}
      <article className="mx-auto max-w-4xl px-6 py-12">
        <div className="prose prose-lg prose-invert max-w-none
          prose-headings:text-purple-300 prose-headings:font-semibold
          prose-h1:text-3xl prose-h1:mb-6 prose-h1:text-purple-200
          prose-h2:text-2xl prose-h2:mt-12 prose-h2:mb-6 prose-h2:border-b prose-h2:border-purple-500/30 prose-h2:pb-2
          prose-h3:text-xl prose-h3:mt-8 prose-h3:mb-4 prose-h3:text-purple-300
          prose-p:text-gray-300 prose-p:leading-relaxed prose-p:mb-6
          prose-a:text-blue-400 prose-a:no-underline hover:prose-a:text-blue-300 hover:prose-a:underline
          prose-strong:text-purple-200 prose-strong:font-semibold
          prose-em:text-blue-200
          prose-code:text-purple-300 prose-code:bg-purple-950/50 prose-code:px-2 prose-code:py-1 prose-code:rounded prose-code:text-sm prose-code:font-mono
          prose-pre:bg-slate-900 prose-pre:border prose-pre:border-purple-500/20 prose-pre:rounded-xl prose-pre:p-6 prose-pre:overflow-x-auto prose-pre:shadow-2xl
          prose-pre:ring-1 prose-pre:ring-purple-500/10
          prose-blockquote:border-l-4 prose-blockquote:border-purple-500 prose-blockquote:bg-purple-950/20 prose-blockquote:py-4 prose-blockquote:px-6 prose-blockquote:rounded-r-lg
          prose-ul:space-y-2 prose-ul:text-gray-300
          prose-ol:space-y-2 prose-ol:text-gray-300
          prose-li:text-gray-300 prose-li:leading-relaxed
          prose-img:rounded-lg prose-img:shadow-xl prose-img:mx-auto
          prose-hr:border-purple-500/30 prose-hr:my-12
          prose-table:border-collapse prose-table:w-full
          prose-th:bg-purple-900/30 prose-th:border prose-th:border-purple-500/30 prose-th:px-4 prose-th:py-2 prose-th:text-left prose-th:font-semibold prose-th:text-purple-200
          prose-td:border prose-td:border-purple-500/20 prose-td:px-4 prose-td:py-2 prose-td:text-gray-300"
        >
          <MDX />
        </div>

        {/* Article Footer */}
        <footer className="mt-16 pt-8 border-t border-purple-500/30">
          <div className="flex flex-col md:flex-row gap-6 items-start md:items-center justify-between">
            <div className="space-y-2">
              <p className="text-sm text-muted-foreground">
                Written by <span className="text-purple-300 font-medium">Prabhakar Elavala</span>
              </p>
              <p className="text-xs text-muted-foreground">
                AI/ML Engineer & MS Informatics Student at Northeastern University
              </p>
            </div>
            
            <div className="flex gap-3">
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600 text-white font-medium py-2 px-4 rounded-lg transition-all duration-200 text-sm"
              >
                💬 Discuss This Article
              </Link>
              <Link
                href="/blog"
                className="inline-flex items-center gap-2 bg-white/5 backdrop-blur-sm border border-white/20 hover:border-purple-300/30 text-purple-200 font-medium py-2 px-4 rounded-lg transition-all duration-200 text-sm"
              >
                📚 More Articles
              </Link>
            </div>
          </div>
        </footer>
      </article>
    </div>
  );
}


