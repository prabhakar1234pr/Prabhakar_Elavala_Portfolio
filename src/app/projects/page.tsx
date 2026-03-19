"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { projects } from "@/data/projects";
import { projectReadmes } from "@/data/project-readmes";
import { Badge } from "@/components/ui/badge";
import { DeepDiveDialog } from "./DeepDiveDialog";
import { VideoDemoDialog } from "./VideoDemoDialog";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ExternalLink, Github } from "lucide-react";

const ACCENTS = [
  { primary: "#8b5cf6", secondary: "#06b6d4" },
  { primary: "#06b6d4", secondary: "#8b5cf6" },
  { primary: "#10b981", secondary: "#8b5cf6" },
  { primary: "#f59e0b", secondary: "#ef4444" },
  { primary: "#ef4444", secondary: "#f59e0b" },
  { primary: "#6366f1", secondary: "#06b6d4" },
  { primary: "#ec4899", secondary: "#8b5cf6" },
];

function ColdStartWarning({ demoUrl }: { demoUrl: string }) {
  const [open, setOpen] = useState(false);
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <button className="inline-flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-semibold border border-cyan-500/40 bg-cyan-500/10 text-cyan-300 hover:bg-cyan-500/20 transition-all">
          <ExternalLink className="w-4 h-4" /> Live Demo
        </button>
      </DialogTrigger>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>Cold Start Notice</DialogTitle>
        </DialogHeader>
        <div className="space-y-4 py-2">
          <p className="text-slate-400 text-sm">
            This demo uses free-tier backend servers, so there will be a{" "}
            <strong className="text-white">~2 minute cold start</strong> on first visit.
          </p>
          <p className="text-xs text-amber-400 bg-amber-500/10 border border-amber-500/20 rounded-lg p-3">
            Please be patient — the app will load after the initial startup.
          </p>
          <div className="flex gap-3 pt-1">
            <Button onClick={() => { window.open(demoUrl, "_blank"); setOpen(false); }} className="flex-1 bg-violet-600 hover:bg-violet-700 text-white border-0">
              Continue to Demo
            </Button>
            <Button variant="outline" onClick={() => setOpen(false)} className="flex-1">Cancel</Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

const HEADER_H = 57;

export default function ProjectsPage() {
  const [current, setCurrent]   = useState(0);
  const [visible, setVisible]   = useState(true);
  const [slideDir, setSlideDir] = useState<"up" | "down">("down");
  const [released, setReleased] = useState(false);

  const wrapperRef     = useRef<HTMLDivElement>(null);
  const lastScrollTime = useRef(0);
  const touchStartY    = useRef(0);
  const total          = projects.length;

  const goTo = useCallback(
    (next: number, dir: "up" | "down") => {
      const now = Date.now();
      if (now - lastScrollTime.current < 750) return;
      lastScrollTime.current = now;

      if (next >= total) {
        setReleased(true);
        requestAnimationFrame(() => {
          wrapperRef.current?.scrollTo({ top: wrapperRef.current.scrollHeight, behavior: "smooth" });
        });
        return;
      }

      if (next < 0) return;

      setSlideDir(dir);
      setVisible(false);
      setTimeout(() => {
        setCurrent(next);
        setVisible(true);
      }, 300);
    },
    [total]
  );

  useEffect(() => {
    const el = wrapperRef.current;
    if (!el) return;

    const onWheel = (e: WheelEvent) => {
      if (released) return;
      e.preventDefault();
      if (e.deltaY > 0) goTo(current + 1, "down");
      else              goTo(current - 1, "up");
    };

    const onKey = (e: KeyboardEvent) => {
      if (released) return;
      if (e.key === "ArrowDown" || e.key === "PageDown") { e.preventDefault(); goTo(current + 1, "down"); }
      if (e.key === "ArrowUp"   || e.key === "PageUp")   { e.preventDefault(); goTo(current - 1, "up");   }
    };

    const onTouchStart = (e: TouchEvent) => { touchStartY.current = e.touches[0].clientY; };
    const onTouchEnd   = (e: TouchEvent) => {
      if (released) return;
      const delta = touchStartY.current - e.changedTouches[0].clientY;
      if (Math.abs(delta) < 40) return;
      if (delta > 0) goTo(current + 1, "down");
      else           goTo(current - 1, "up");
    };

    const onScroll = () => {
      if (released && el.scrollTop === 0) {
        setReleased(false);
        setCurrent(total - 1);
      }
    };

    el.addEventListener("wheel",      onWheel,      { passive: false });
    el.addEventListener("touchstart", onTouchStart, { passive: true });
    el.addEventListener("touchend",   onTouchEnd,   { passive: true });
    el.addEventListener("scroll",     onScroll);
    window.addEventListener("keydown", onKey);

    return () => {
      el.removeEventListener("wheel",      onWheel);
      el.removeEventListener("touchstart", onTouchStart);
      el.removeEventListener("touchend",   onTouchEnd);
      el.removeEventListener("scroll",     onScroll);
      window.removeEventListener("keydown", onKey);
    };
  }, [current, goTo, released, total]);

  const project = projects[current];
  const readme  = projectReadmes[project.title];
  const accent  = ACCENTS[current % ACCENTS.length];

  return (
    <div
      ref={wrapperRef}
      style={{
        height:    `calc(100dvh - ${HEADER_H}px)`,
        overflowY: released ? "auto" : "hidden",
        overflowX: "hidden",
        position:  "relative",
      }}
    >
      {/* ══ PROJECTS ZONE ══ */}
      <div
        style={{
          height:    `calc(100dvh - ${HEADER_H}px)`,
          minHeight: `calc(100dvh - ${HEADER_H}px)`,
          flexShrink: 0,
          position:  "relative",
          overflow:  "hidden",
        }}
      >
        {/* Ambient glow */}
        <div
          style={{
            position: "absolute", inset: 0, pointerEvents: "none",
            transition: "background 0.7s ease",
            background: `radial-gradient(ellipse 70% 55% at 65% 50%, ${accent.primary}14 0%, transparent 70%)`,
          }}
        />

        {/* Right dot nav */}
        <nav
          style={{ position: "fixed", right: "20px", top: "50%", transform: "translateY(-50%)", zIndex: 30 }}
          className="flex flex-col gap-3"
        >
          {projects.map((p, i) => (
            <button
              key={i}
              onClick={() => { setReleased(false); goTo(i, i > current ? "down" : "up"); }}
              aria-label={p.title}
              title={p.title}
              className="group relative flex items-center justify-end gap-2"
            >
              <span className="pointer-events-none absolute right-6 whitespace-nowrap rounded-md border border-white/10 bg-[oklch(0.10_0.02_265)] px-2 py-1 text-[10px] font-medium text-slate-300 opacity-0 group-hover:opacity-100 transition-opacity">
                {p.title}
              </span>
              <span
                className="block rounded-full transition-all duration-300"
                style={{
                  width:      (!released && i === current) ? "8px"  : "6px",
                  height:     (!released && i === current) ? "24px" : "6px",
                  background: (!released && i === current) ? accent.primary : "#475569",
                  opacity:    (!released && i === current) ? 1 : 0.4,
                }}
              />
            </button>
          ))}
        </nav>

        {/* Progress bar */}
        <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, height: "2px", background: "rgba(255,255,255,0.04)", zIndex: 20 }}>
          <div
            style={{
              height: "100%",
              width: released ? "100%" : `${((current + 1) / total) * 100}%`,
              background: `linear-gradient(90deg, ${accent.primary}, ${accent.secondary})`,
              transition: "width 0.7s ease",
            }}
          />
        </div>

        {/* Counter bottom-left */}
        <div style={{ position: "absolute", bottom: "20px", left: "24px", zIndex: 20 }} className="flex items-baseline gap-1">
          <span className="text-2xl font-black text-white font-mono leading-none">
            {String(current + 1).padStart(2, "0")}
          </span>
          <span className="text-slate-600 text-sm font-mono">/ {String(total).padStart(2, "0")}</span>
        </div>

        {/* Scroll hint bottom-right */}
        <p style={{ position: "absolute", bottom: "20px", right: "40px", zIndex: 20 }}
           className="text-[10px] font-medium text-slate-600 tracking-widest uppercase">
          {!released && (current < total - 1 ? "Scroll to explore ↓" : "Scroll for more ↓")}
        </p>

        {/* Project content */}
        <div
          style={{
            position: "absolute", inset: 0,
            display: "flex", alignItems: "center", justifyContent: "center",
            padding: "40px 64px",
            transition: "opacity 0.3s ease, transform 0.3s ease",
            opacity:   visible ? 1 : 0,
            transform: visible ? "translateY(0)" : `translateY(${slideDir === "down" ? "-36px" : "36px"})`,
            pointerEvents: released ? "none" : "auto",
          }}
        >
          <div className="w-full max-w-4xl relative">

            {/* Ghost number */}
            <span
              className="pointer-events-none select-none hidden lg:block absolute"
              style={{
                top: "50%", right: "-40px", transform: "translateY(-50%)",
                fontSize: "18vw", fontWeight: 900, lineHeight: 1,
                color: `${accent.primary}08`,
              }}
            >
              {String(current + 1).padStart(2, "0")}
            </span>

            {/* Title */}
            <h1 className="text-5xl sm:text-7xl font-black text-white leading-[0.95] tracking-tight mb-6">
              {project.title}
            </h1>

            {/* Description */}
            <p className="text-slate-400 text-base sm:text-lg leading-relaxed max-w-2xl mb-7">
              {project.summary.replace(/^[\p{Emoji}\s]+/u, "")}
            </p>

            {/* Metrics */}
            {project.highlightMetrics && project.highlightMetrics.length > 0 && (
              <div className="flex flex-wrap gap-2 mb-7">
                {project.highlightMetrics.map((m) => (
                  <span
                    key={m}
                    className="rounded-full px-3 py-1 text-xs font-semibold border"
                    style={{ color: accent.secondary, borderColor: `${accent.secondary}35`, background: `${accent.secondary}10` }}
                  >
                    {m}
                  </span>
                ))}
              </div>
            )}

            {/* Tech badges */}
            <div className="flex flex-wrap gap-2 mb-8">
              {project.tech.map((tech) => (
                <Badge
                  key={tech}
                  variant="secondary"
                  className="text-xs border"
                  style={{ background: `${accent.primary}10`, borderColor: `${accent.primary}22`, color: "#cbd5e1" }}
                >
                  {tech}
                </Badge>
              ))}
            </div>

            {/* Buttons */}
            <div className="flex flex-wrap items-center gap-3">
              {project.links.github && (
                <Link
                  href={project.links.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-semibold border border-white/10 bg-white/5 text-slate-300 hover:bg-white/10 hover:text-white transition-all"
                >
                  <Github className="w-4 h-4" /> GitHub
                </Link>
              )}

              {project.links.demo && (
                project.title === "GitGuide"
                  ? <ColdStartWarning demoUrl={project.links.demo} />
                  : (
                    <Link
                      href={project.links.demo}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-semibold border transition-all"
                      style={{ color: accent.secondary, borderColor: `${accent.secondary}40`, background: `${accent.secondary}10` }}
                    >
                      <ExternalLink className="w-4 h-4" />
                      {project.title === "BrowserFriend" ? "PyPI" : "Live Demo"}
                    </Link>
                  )
              )}

              {project.title === "GitGuide" && (
                <VideoDemoDialog videoSrc="/gitguide-demo.mp4" title="GitGuide Video Demo" />
              )}

              {readme && (
                <DeepDiveDialog title={readme.projectTitle} content={readme.content} />
              )}
            </div>
          </div>
        </div>
      </div>

      {/* ══ FOOTER ZONE ══ */}
      <footer className="border-t border-white/[0.06] bg-background">
        <div className="mx-auto max-w-6xl px-6 py-10">
          <div className="grid gap-8 sm:grid-cols-3">

            <div className="space-y-3">
              <p className="font-semibold text-white text-sm">
                Prabhakar<span className="text-violet-400">.</span>
              </p>
              <p className="text-xs text-slate-500 leading-relaxed max-w-[200px]">
                AI / ML Engineer · San Francisco, CA<br />
                Open to full-time &amp; internship roles.
              </p>
              <div className="flex gap-2 pt-1">
                {[
                  { label: "GitHub",   href: "https://github.com/prabhakar1234pr",          icon: "GH" },
                  { label: "LinkedIn", href: "https://www.linkedin.com/in/prabhakarelavala", icon: "in" },
                  { label: "Email",    href: "mailto:prabhakarpr554@gmail.com",               icon: "@"  },
                ].map((s) => (
                  <a
                    key={s.label}
                    href={s.href}
                    target={s.href.startsWith("mailto") ? undefined : "_blank"}
                    rel="noopener noreferrer"
                    aria-label={s.label}
                    className="flex h-7 w-7 items-center justify-center rounded-md border border-white/[0.08] bg-white/[0.03] text-[10px] font-bold text-slate-400 hover:border-violet-500/40 hover:text-violet-300 transition-colors"
                  >
                    {s.icon}
                  </a>
                ))}
              </div>
            </div>

            <div className="space-y-3">
              <p className="text-[10px] font-semibold uppercase tracking-widest text-slate-500">Quick Links</p>
              <nav className="flex flex-col gap-2">
                {[
                  { href: "/projects",   label: "Projects"   },
                  { href: "/experience", label: "Experience" },
                  { href: "/blog",       label: "Blog"       },
                  { href: "/contact",    label: "Contact"    },
                ].map((l) => (
                  <Link key={l.href} href={l.href} className="text-xs text-slate-400 hover:text-white transition-colors w-fit">
                    {l.label}
                  </Link>
                ))}
              </nav>
            </div>

            <div className="space-y-3">
              <span className="inline-flex items-center gap-1.5 rounded-full border border-emerald-500/30 bg-emerald-500/8 px-3 py-1 text-xs font-medium text-emerald-400">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                Available for Opportunities
              </span>
              <p className="text-xs text-slate-500">
                Built with <span className="text-slate-400">Next.js</span> · <span className="text-slate-400">TypeScript</span> · <span className="text-slate-400">Tailwind CSS</span>
              </p>
              <p className="text-xs text-slate-500">
                Deployed on{" "}
                <a href="https://vercel.com" target="_blank" rel="noopener noreferrer" className="text-slate-400 hover:text-white transition-colors">
                  Vercel
                </a>
              </p>
            </div>
          </div>

          <div className="mt-8 border-t border-white/[0.06] pt-6 text-center text-xs text-slate-600">
            © {new Date().getFullYear()} Prabhakar Elavala. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
}
