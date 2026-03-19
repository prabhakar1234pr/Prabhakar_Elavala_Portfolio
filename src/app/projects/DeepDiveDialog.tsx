"use client";
import { useState, useEffect, useRef, useCallback } from "react";
import * as DialogPrimitive from "@radix-ui/react-dialog";
import * as VisuallyHidden from "@radix-ui/react-visually-hidden";
import { Button } from "@/components/ui/button";
import ReactMarkdown from "react-markdown";
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
          className="inline-flex items-center gap-1.5 bg-violet-500/10 hover:bg-violet-500/20 border-violet-500/30 hover:border-violet-400/50 text-violet-200 hover:text-white transition-all duration-200"
        >
          <BookOpen className="w-3.5 h-3.5" />
          Deep Dive
        </Button>
      </DialogPrimitive.Trigger>

      <DialogPrimitive.Portal>
        {/* Backdrop */}
        <DialogPrimitive.Overlay
          className="fixed inset-0 z-[100] bg-black/70 backdrop-blur-sm data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0"
        />

        {/* Full-screen panel */}
        <DialogPrimitive.Content
          className="fixed inset-0 z-[101] flex flex-col bg-[oklch(0.08_0.02_265)] data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:slide-out-to-bottom-4 data-[state=open]:slide-in-from-bottom-4 duration-300"
        >
          <VisuallyHidden.Root>
            <DialogPrimitive.Title>{title}</DialogPrimitive.Title>
          </VisuallyHidden.Root>

          {/* ── Top bar ── */}
          <div className="flex-shrink-0 flex items-center justify-between px-6 py-4 border-b border-white/[0.07] bg-[oklch(0.10_0.02_265)]">
            <div className="flex items-center gap-3 min-w-0">
              <BookOpen className="w-4 h-4 text-violet-400 flex-shrink-0" />
              <span className="text-sm font-semibold text-white truncate">{title}</span>
            </div>
            <DialogPrimitive.Close
              className="flex-shrink-0 flex items-center justify-center w-8 h-8 rounded-lg border border-white/10 bg-white/5 text-slate-400 hover:text-white hover:bg-white/10 transition-all"
              aria-label="Close"
            >
              <X className="w-4 h-4" />
            </DialogPrimitive.Close>
          </div>

          {/* ── Body ── */}
          <div className="flex flex-1 overflow-hidden">

            {/* TOC sidebar */}
            {headings.length > 0 && (
              <aside className="hidden lg:flex flex-col w-64 xl:w-72 flex-shrink-0 border-r border-white/[0.06] overflow-y-auto">
                <div className="px-5 pt-5 pb-3">
                  <p className="text-[10px] font-bold uppercase tracking-widest text-slate-500">
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
                          ? "bg-violet-500/15 text-violet-300 font-medium"
                          : "text-slate-500 hover:text-slate-300 hover:bg-white/5"
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
                  rehypePlugins={[rehypeRaw]}
                  components={{
                    h1: ({ children }) => {
                      const text = String(children).replace(/[*_`]/g, "");
                      return <h1 id={toId(text)} className="text-2xl font-extrabold text-white mt-10 mb-4 first:mt-0 pb-3 border-b border-white/[0.07] scroll-mt-16">{children}</h1>;
                    },
                    h2: ({ children }) => {
                      const text = String(children).replace(/[*_`]/g, "");
                      return <h2 id={toId(text)} className="text-lg font-bold text-violet-300 mt-8 mb-3 scroll-mt-16">{children}</h2>;
                    },
                    h3: ({ children }) => {
                      const text = String(children).replace(/[*_`]/g, "");
                      return <h3 id={toId(text)} className="text-base font-semibold text-slate-200 mt-6 mb-2 scroll-mt-16">{children}</h3>;
                    },
                    p: ({ children }) => <p className="text-slate-400 leading-relaxed mb-4 text-sm">{children}</p>,
                    a: ({ href, children }) => (
                      <a href={href} target="_blank" rel="noopener noreferrer" className="text-violet-400 hover:text-violet-300 underline underline-offset-2 transition-colors">
                        {children}
                      </a>
                    ),
                    pre: ({ children }) => (
                      <pre className="bg-black/40 border border-white/[0.08] rounded-xl p-4 overflow-x-auto my-4 text-xs leading-relaxed">
                        {children}
                      </pre>
                    ),
                    code: ({ className, children }) =>
                      className
                        ? <code className="text-emerald-300 font-mono">{children}</code>
                        : <code className="bg-violet-500/15 text-violet-300 px-1.5 py-0.5 rounded text-xs font-mono">{children}</code>,
                    ul: ({ children }) => <ul className="my-3 space-y-1.5 pl-1">{children}</ul>,
                    ol: ({ children }) => <ol className="my-3 space-y-1.5 pl-1 list-decimal list-inside">{children}</ol>,
                    li: ({ children }) => (
                      <li className="flex gap-2.5 text-sm text-slate-400 leading-relaxed">
                        <span className="mt-[7px] h-1 w-1 flex-shrink-0 rounded-full bg-violet-500/60" />
                        <span>{children}</span>
                      </li>
                    ),
                    blockquote: ({ children }) => (
                      <blockquote className="border-l-2 border-violet-500/50 pl-4 my-4 text-slate-400 italic bg-violet-500/5 py-3 pr-4 rounded-r-lg text-sm">
                        {children}
                      </blockquote>
                    ),
                    table: ({ children }) => (
                      <div className="my-5 overflow-x-auto rounded-xl border border-white/[0.07]">
                        <table className="w-full text-sm border-collapse">{children}</table>
                      </div>
                    ),
                    thead: ({ children }) => <thead className="bg-white/[0.04]">{children}</thead>,
                    th: ({ children }) => (
                      <th className="px-4 py-2.5 text-left text-xs font-semibold text-slate-300 uppercase tracking-wider border-b border-white/[0.07]">
                        {children}
                      </th>
                    ),
                    td: ({ children }) => (
                      <td className="px-4 py-2.5 text-slate-400 border-b border-white/[0.04] text-sm">{children}</td>
                    ),
                    tr: ({ children }) => <tr className="hover:bg-white/[0.02] transition-colors">{children}</tr>,
                    hr: () => <hr className="my-8 border-white/[0.07]" />,
                    strong: ({ children }) => <strong className="font-semibold text-slate-200">{children}</strong>,
                    em: ({ children }) => <em className="italic text-slate-300">{children}</em>,
                    iframe: ({ src, title, ...props }) => (
                      <div className="my-6 rounded-xl overflow-hidden border border-white/[0.08]">
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
                  className="fixed bottom-6 right-6 z-[102] flex items-center gap-1.5 rounded-full border border-white/10 bg-[oklch(0.12_0.02_265)] px-3 py-2 text-xs font-medium text-slate-400 hover:text-white hover:border-violet-500/40 shadow-xl transition-all"
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
