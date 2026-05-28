"use client";
import { useState, useEffect, useRef, useCallback } from "react";
import * as DialogPrimitive from "@radix-ui/react-dialog";
import * as VisuallyHidden from "@radix-ui/react-visually-hidden";
import { Button } from "@/components/ui/button";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeRaw from "rehype-raw";
import { BookOpen, X, ChevronUp } from "lucide-react";

interface DeepDiveDialogProps {
  title: string;
  content: string;
}

function extractHeadings(md: string) {
  const lines = md.split("\n");
  const headings: { level: number; text: string; id: string }[] = [];
  for (const line of lines) {
    const m = line.match(/^(#{1,3})\s+(.+)/);
    if (m) {
      const text = m[2].replace(/[*_`]/g, "").trim();
      const id = text.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
      headings.push({ level: m[1].length, text, id });
    }
  }
  return headings;
}

export function DeepDiveDialog({ title, content }: DeepDiveDialogProps) {
  const [open, setOpen]         = useState(false);
  const [activeId, setActiveId] = useState("");
  const [showTop, setShowTop]   = useState(false);
  const scrollRef               = useRef<HTMLDivElement>(null);
  const headings                = extractHeadings(content);

  const onScroll = useCallback(() => {
    const el = scrollRef.current;
    if (!el) return;
    setShowTop(el.scrollTop > 300);
    const all = el.querySelectorAll("h1,h2,h3");
    let current = "";
    all.forEach((h) => {
      if ((h as HTMLElement).offsetTop - el.scrollTop - 80 <= 0) current = h.id;
    });
    setActiveId(current);
  }, []);

  useEffect(() => {
    const el = scrollRef.current;
    if (!el || !open) return;
    el.addEventListener("scroll", onScroll, { passive: true });
    return () => el.removeEventListener("scroll", onScroll);
  }, [onScroll, open]);

  const scrollToId = (id: string) => {
    const el = scrollRef.current;
    if (!el) return;
    const target = el.querySelector(`#${id}`) as HTMLElement;
    if (target) el.scrollTo({ top: target.offsetTop - 60, behavior: "smooth" });
  };

  const toId = (text: string) =>
    text.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");

  return (
    <DialogPrimitive.Root open={open} onOpenChange={setOpen}>
      <DialogPrimitive.Trigger asChild>
        <Button
          variant="outline"
          size="sm"
          className="inline-flex items-center gap-1.5 border-white/20 bg-white/8 text-white/84 transition-all duration-200 hover:border-white/35 hover:bg-white/16 hover:text-white"
        >
          <BookOpen className="w-3.5 h-3.5" />
          Deep Dive
        </Button>
      </DialogPrimitive.Trigger>

      <DialogPrimitive.Portal>
        {/* Backdrop */}
        <DialogPrimitive.Overlay
          className="fixed inset-0 z-[100] bg-black/75 backdrop-blur-sm data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0"
        />

        {/* Full-screen panel */}
        <DialogPrimitive.Content
          className="fixed inset-0 z-[101] flex flex-col bg-[oklch(0.11_0_0)] data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:slide-out-to-bottom-4 data-[state=open]:slide-in-from-bottom-4 duration-300"
        >
          <VisuallyHidden.Root>
            <DialogPrimitive.Title>{title}</DialogPrimitive.Title>
          </VisuallyHidden.Root>

          {/* ── Top bar ── */}
          <div className="flex-shrink-0 flex items-center justify-between border-b border-white/12 bg-black/35 px-6 py-4 backdrop-blur-xl">
            <div className="flex items-center gap-3 min-w-0">
              <BookOpen className="h-4 w-4 flex-shrink-0 text-white/78" />
              <span className="text-sm font-semibold text-white truncate">{title}</span>
            </div>
            <DialogPrimitive.Close
              className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-lg border border-white/20 bg-white/8 text-white/60 transition-all hover:bg-white/16 hover:text-white"
              aria-label="Close"
            >
              <X className="w-4 h-4" />
            </DialogPrimitive.Close>
          </div>

          {/* ── Body ── */}
          <div className="flex flex-1 overflow-hidden">

            {/* TOC sidebar */}
            {headings.length > 0 && (
              <aside className="hidden w-64 flex-shrink-0 flex-col overflow-y-auto border-r border-white/10 lg:flex xl:w-72">
                <div className="px-5 pt-5 pb-3">
                  <p className="text-[10px] font-bold uppercase tracking-widest text-white/52">
                    Contents
                  </p>
                </div>
                <nav className="px-3 pb-6 space-y-0.5">
                  {headings.map((h) => (
                    <button
                      key={h.id + h.text}
                      onClick={() => scrollToId(h.id)}
                      className={`w-full text-left rounded-md py-1.5 text-xs transition-all leading-snug ${
                        activeId === h.id
                          ? "bg-white/15 font-medium text-white"
                          : "text-white/55 hover:bg-white/8 hover:text-white/82"
                      }`}
                      style={{ paddingLeft: `${(h.level - 1) * 12 + 12}px` }}
                    >
                      {h.text}
                    </button>
                  ))}
                </nav>
              </aside>
            )}

            {/* Content */}
            <div ref={scrollRef} className="flex-1 overflow-y-auto relative">
              <div className="max-w-3xl mx-auto px-6 sm:px-10 py-10 pb-24">
                <ReactMarkdown
                  remarkPlugins={[remarkGfm]}
                  rehypePlugins={[rehypeRaw]}
                  components={{
                    h1: ({ children }) => {
                      const text = String(children).replace(/[*_`]/g, "");
                      return <h1 id={toId(text)} className="mb-4 mt-10 border-b border-white/12 pb-3 text-2xl font-extrabold text-white first:mt-0 scroll-mt-16">{children}</h1>;
                    },
                    h2: ({ children }) => {
                      const text = String(children).replace(/[*_`]/g, "");
                      return <h2 id={toId(text)} className="mb-3 mt-8 text-lg font-bold text-white/86 scroll-mt-16">{children}</h2>;
                    },
                    h3: ({ children }) => {
                      const text = String(children).replace(/[*_`]/g, "");
                      return <h3 id={toId(text)} className="mb-2 mt-6 text-base font-semibold text-white/78 scroll-mt-16">{children}</h3>;
                    },
                    p: ({ children }) => <p className="mb-4 text-sm leading-relaxed text-white/66">{children}</p>,
                    a: ({ href, children }) => (
                      <a href={href} target="_blank" rel="noopener noreferrer" className="text-white/84 underline underline-offset-2 transition-colors hover:text-white">
                        {children}
                      </a>
                    ),
                    pre: ({ children }) => (
                      <pre className="my-4 overflow-x-auto rounded-xl border border-white/14 bg-black/35 p-4 text-xs leading-relaxed">
                        {children}
                      </pre>
                    ),
                    code: ({ className, children }) =>
                      className
                        ? <code className="font-mono text-white/86">{children}</code>
                        : <code className="rounded bg-white/12 px-1.5 py-0.5 font-mono text-xs text-white/88">{children}</code>,
                    ul: ({ children }) => <ul className="my-3 space-y-1.5 pl-1">{children}</ul>,
                    ol: ({ children }) => <ol className="my-3 space-y-1.5 pl-1 list-decimal list-inside">{children}</ol>,
                    li: ({ children }) => (
                      <li className="flex gap-2.5 text-sm leading-relaxed text-white/66">
                        <span className="mt-[7px] h-1 w-1 flex-shrink-0 rounded-full bg-white/65" />
                        <span>{children}</span>
                      </li>
                    ),
                    blockquote: ({ children }) => (
                      <blockquote className="my-4 rounded-r-lg border-l-2 border-white/45 bg-white/7 py-3 pl-4 pr-4 text-sm italic text-white/68">
                        {children}
                      </blockquote>
                    ),
                    table: ({ children }) => (
                      <div className="my-5 overflow-x-auto rounded-xl border border-white/12">
                        <table className="w-full text-sm border-collapse">{children}</table>
                      </div>
                    ),
                    thead: ({ children }) => <thead className="bg-white/8">{children}</thead>,
                    th: ({ children }) => (
                      <th className="border-b border-white/12 px-4 py-2.5 text-left text-xs font-semibold uppercase tracking-wider text-white/76">
                        {children}
                      </th>
                    ),
                    td: ({ children }) => (
                      <td className="border-b border-white/8 px-4 py-2.5 text-sm text-white/66">{children}</td>
                    ),
                    tr: ({ children }) => <tr className="hover:bg-white/[0.02] transition-colors">{children}</tr>,
                    hr: () => <hr className="my-8 border-white/12" />,
                    strong: ({ children }) => <strong className="font-semibold text-white/88">{children}</strong>,
                    em: ({ children }) => <em className="italic text-white/76">{children}</em>,
                    iframe: ({ src, title, ...props }) => (
                      <div className="my-6 overflow-hidden rounded-xl border border-white/12">
                        <iframe src={src} title={title} className="w-full aspect-video"
                          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                          allowFullScreen {...props} />
                      </div>
                    ),
                  }}
                >
                  {content}
                </ReactMarkdown>
              </div>

              {/* Back to top */}
              {showTop && (
                <button
                  onClick={() => scrollRef.current?.scrollTo({ top: 0, behavior: "smooth" })}
                  className="fixed bottom-6 right-6 z-[102] flex items-center gap-1.5 rounded-full border border-white/20 bg-black/62 px-3 py-2 text-xs font-medium text-white/66 shadow-xl transition-all hover:border-white/35 hover:text-white"
                >
                  <ChevronUp className="w-3.5 h-3.5" />
                  Top
                </button>
              )}
            </div>
          </div>
        </DialogPrimitive.Content>
      </DialogPrimitive.Portal>
    </DialogPrimitive.Root>
  );
}
