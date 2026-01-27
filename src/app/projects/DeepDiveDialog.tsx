"use client";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import ReactMarkdown from "react-markdown";
import rehypeRaw from "rehype-raw";

interface DeepDiveDialogProps {
  title: string;
  content: string;
}

export function DeepDiveDialog({ title, content }: DeepDiveDialogProps) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button 
          variant="outline" 
          size="sm"
          className="bg-gradient-to-r from-purple-500/20 to-blue-500/20 hover:from-purple-500/30 hover:to-blue-500/30 border-purple-300/30 hover:border-purple-300/50 text-purple-100 hover:text-white transition-all duration-200"
        >
          🔍 Deep Dive
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-4xl max-h-[90vh] w-[95vw] sm:w-full">
        <DialogHeader className="pb-4 border-b border-white/10">
          <DialogTitle className="text-xl font-bold bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
            {title}
          </DialogTitle>
        </DialogHeader>
        <div className="max-h-[70vh] overflow-y-auto pr-4 -mr-4">
          <div className="prose prose-sm dark:prose-invert max-w-none prose-headings:text-purple-300 prose-links:text-blue-400 prose-code:text-purple-200 prose-pre:bg-black/50 prose-pre:border prose-pre:border-white/10">
            <ReactMarkdown 
              rehypePlugins={[rehypeRaw]}
              components={{
                // Custom link component that opens in new tab
                a: ({ href, children }) => (
                  <a 
                    href={href} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-blue-400 hover:text-blue-300 underline transition-colors"
                  >
                    {children}
                  </a>
                ),
                // Custom styling for headers
                h1: ({ children }) => (
                  <h1 className="text-2xl font-bold mt-6 mb-4 first:mt-0 bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
                    {children}
                  </h1>
                ),
                h2: ({ children }) => (
                  <h2 className="text-xl font-semibold mt-5 mb-3 text-purple-300">
                    {children}
                  </h2>
                ),
                h3: ({ children }) => (
                  <h3 className="text-lg font-medium mt-4 mb-2 text-purple-200">
                    {children}
                  </h3>
                ),
                // Custom styling for code blocks
                pre: ({ children }) => (
                  <pre className="bg-black/50 border border-white/10 rounded-lg p-4 overflow-x-auto my-4">
                    {children}
                  </pre>
                ),
                code: ({ className, children }) => {
                  const isInline = !className;
                  return isInline ? (
                    <code className="bg-purple-500/20 text-purple-200 px-1.5 py-0.5 rounded text-sm">
                      {children}
                    </code>
                  ) : (
                    <code className={className}>{children}</code>
                  );
                },
                // Custom styling for lists
                ul: ({ children }) => (
                  <ul className="list-disc pl-6 my-4 space-y-1">{children}</ul>
                ),
                ol: ({ children }) => (
                  <ol className="list-decimal pl-6 my-4 space-y-1">{children}</ol>
                ),
                li: ({ children }) => (
                  <li className="text-gray-300">{children}</li>
                ),
                // Custom styling for paragraphs
                p: ({ children }) => (
                  <p className="mb-3 text-gray-300 leading-relaxed">{children}</p>
                ),
                // Custom styling for blockquotes
                blockquote: ({ children }) => (
                  <blockquote className="border-l-4 border-purple-400 pl-4 my-4 italic text-purple-200 bg-purple-500/10 py-2 rounded-r-lg">
                    {children}
                  </blockquote>
                ),
                // Support for iframe embeds (videos)
                iframe: ({ src, title, ...props }) => (
                  <div className="my-6 rounded-lg overflow-hidden border border-white/10">
                    <iframe
                      src={src}
                      title={title}
                      className="w-full aspect-video"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                      {...props}
                    />
                  </div>
                ),
              }}
            >
              {content}
            </ReactMarkdown>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}


