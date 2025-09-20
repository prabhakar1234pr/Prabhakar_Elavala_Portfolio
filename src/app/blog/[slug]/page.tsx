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
      <article className="w-full px-4 py-16 bg-gradient-to-b from-slate-900/50 to-background">
        <div className="mx-auto max-w-6xl">
          <div className="grid gap-16 lg:grid-cols-12">
            {/* Main Content */}
            <div className="lg:col-span-8 lg:col-start-3">
              <div className="prose prose-xl prose-invert max-w-none
                prose-headings:text-purple-300 prose-headings:font-bold prose-headings:tracking-tight
                prose-h1:text-5xl prose-h1:leading-tight prose-h1:mb-12 prose-h1:mt-0 prose-h1:text-transparent prose-h1:bg-gradient-to-r prose-h1:from-purple-400 prose-h1:to-blue-400 prose-h1:bg-clip-text prose-h1:hidden
                prose-h2:text-4xl prose-h2:leading-tight prose-h2:mt-20 prose-h2:mb-10 prose-h2:text-purple-200 prose-h2:relative prose-h2:before:absolute prose-h2:before:left-0 prose-h2:before:top-0 prose-h2:before:w-16 prose-h2:before:h-1 prose-h2:before:bg-gradient-to-r prose-h2:before:from-purple-500 prose-h2:before:to-blue-500 prose-h2:before:-mt-2
                prose-h3:text-2xl prose-h3:leading-tight prose-h3:mt-16 prose-h3:mb-8 prose-h3:text-purple-300 prose-h3:font-semibold
                prose-h4:text-xl prose-h4:leading-tight prose-h4:mt-12 prose-h4:mb-6 prose-h4:text-purple-400 prose-h4:font-semibold
                prose-p:text-gray-100 prose-p:leading-loose prose-p:mb-8 prose-p:text-lg prose-p:font-normal
                prose-a:text-blue-400 prose-a:no-underline prose-a:font-medium prose-a:transition-all prose-a:duration-200 hover:prose-a:text-blue-300 hover:prose-a:underline hover:prose-a:underline-offset-4
                prose-strong:text-purple-100 prose-strong:font-bold prose-strong:bg-purple-950/30 prose-strong:px-1 prose-strong:rounded
                prose-em:text-blue-300 prose-em:font-medium prose-em:italic
                prose-code:text-purple-300 prose-code:bg-purple-950/60 prose-code:px-3 prose-code:py-1.5 prose-code:rounded-lg prose-code:text-base prose-code:font-mono prose-code:font-medium prose-code:border prose-code:border-purple-500/30
                prose-pre:bg-slate-900 prose-pre:border prose-pre:border-purple-500/30 prose-pre:rounded-2xl prose-pre:p-8 prose-pre:overflow-x-auto prose-pre:shadow-2xl prose-pre:ring-2 prose-pre:ring-purple-500/20 prose-pre:my-12 prose-pre:text-sm prose-pre:leading-relaxed prose-pre:relative
                prose-blockquote:border-l-4 prose-blockquote:border-purple-500 prose-blockquote:bg-gradient-to-r prose-blockquote:from-purple-950/30 prose-blockquote:to-transparent prose-blockquote:py-8 prose-blockquote:px-10 prose-blockquote:rounded-r-2xl prose-blockquote:my-12 prose-blockquote:text-purple-100 prose-blockquote:italic prose-blockquote:text-lg prose-blockquote:shadow-xl
                prose-ul:space-y-4 prose-ul:text-gray-100 prose-ul:my-10 prose-ul:text-lg prose-ul:pl-6
                prose-ol:space-y-4 prose-ol:text-gray-100 prose-ol:my-10 prose-ol:text-lg prose-ol:pl-6
                prose-li:text-gray-100 prose-li:leading-loose prose-li:pl-2 prose-li:relative
                prose-li:marker:text-purple-400 prose-li:marker:font-bold
                prose-img:rounded-2xl prose-img:shadow-2xl prose-img:mx-auto prose-img:my-16 prose-img:border prose-img:border-purple-500/20 prose-img:ring-4 prose-img:ring-purple-500/10
                prose-hr:border-purple-500/40 prose-hr:my-20 prose-hr:border-t-2 prose-hr:bg-gradient-to-r prose-hr:from-transparent prose-hr:via-purple-500/50 prose-hr:to-transparent
                prose-table:border-collapse prose-table:w-full prose-table:my-12 prose-table:rounded-xl prose-table:overflow-hidden prose-table:shadow-2xl prose-table:ring-1 prose-table:ring-purple-500/20
                prose-th:bg-purple-900/50 prose-th:border prose-th:border-purple-500/30 prose-th:px-8 prose-th:py-5 prose-th:text-left prose-th:font-bold prose-th:text-purple-200 prose-th:text-lg prose-th:uppercase prose-th:tracking-wider
                prose-td:border prose-td:border-purple-500/20 prose-td:px-8 prose-td:py-5 prose-td:text-gray-100 prose-td:text-lg prose-td:leading-relaxed prose-td:bg-slate-900/30"
              >
                <MDX />
              </div>
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-2 lg:col-start-11">
              <div className="sticky top-24 space-y-8">
                {/* Table of Contents */}
                <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6">
                  <h3 className="text-lg font-semibold text-purple-300 mb-4">📖 In This Article</h3>
                  <nav className="space-y-2 text-sm">
                    <a href="#problem-space" className="block text-gray-400 hover:text-purple-300 transition-colors py-1">The Problem Space</a>
                    <a href="#data-collection" className="block text-gray-400 hover:text-purple-300 transition-colors py-1">Data Collection</a>
                    <a href="#modeling" className="block text-gray-400 hover:text-purple-300 transition-colors py-1">Model Development</a>
                    <a href="#results" className="block text-gray-400 hover:text-purple-300 transition-colors py-1">Results & Impact</a>
                    <a href="#lessons" className="block text-gray-400 hover:text-purple-300 transition-colors py-1">Lessons Learned</a>
                  </nav>
                </div>

                {/* Article Info */}
                <div className="bg-gradient-to-br from-purple-500/10 to-blue-500/10 border border-purple-300/20 rounded-2xl p-6">
                  <h3 className="text-lg font-semibold text-purple-300 mb-4">💡 Quick Info</h3>
                  <div className="space-y-3 text-sm">
                    <div className="flex items-center gap-3">
                      <span className="w-2 h-2 bg-purple-400 rounded-full"></span>
                      <span className="text-gray-300">Technical deep-dive</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="w-2 h-2 bg-blue-400 rounded-full"></span>
                      <span className="text-gray-300">Code examples included</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="w-2 h-2 bg-green-400 rounded-full"></span>
                      <span className="text-gray-300">Real-world application</span>
                    </div>
                  </div>
                </div>

                {/* Share Article */}
                <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6">
                  <h3 className="text-lg font-semibold text-purple-300 mb-4">📢 Share</h3>
                  <div className="flex gap-3">
                    <button className="flex-1 bg-blue-600 hover:bg-blue-700 text-white text-xs py-2 px-3 rounded-lg transition-colors">
                      LinkedIn
                    </button>
                    <button className="flex-1 bg-slate-600 hover:bg-slate-700 text-white text-xs py-2 px-3 rounded-lg transition-colors">
                      Copy Link
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </article>

      {/* Article Footer */}
      <footer className="mx-auto max-w-6xl px-4 mt-16 pt-8 border-t border-purple-500/30">
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
    </div>
  );
}


