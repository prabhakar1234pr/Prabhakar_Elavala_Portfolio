"use client";

import { projects } from "@/data/projects";
import { projectReadmes } from "@/data/project-readmes";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { DeepDiveDialog } from "./DeepDiveDialog";
import { VideoDemoDialog } from "./VideoDemoDialog";
import { useState, useCallback } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

// Cold Start Warning
function ColdStartWarning({ demoUrl }: { demoUrl: string }) {
  const [open, setOpen] = useState(false);
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <button className="inline-flex items-center gap-1.5 text-sm font-medium text-cyan-400 hover:text-cyan-300 transition-colors">
          Live Demo ↗
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
            Please be patient — the app will load normally after the initial startup.
          </p>
          <div className="flex gap-3 pt-1">
            <Button
              onClick={() => { window.open(demoUrl, "_blank"); setOpen(false); }}
              className="flex-1 bg-violet-600 hover:bg-violet-700 text-white border-0"
            >
              Continue to Demo
            </Button>
            <Button variant="outline" onClick={() => setOpen(false)} className="flex-1">
              Cancel
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

export default function ProjectsPage() {
  const [index, setIndex] = useState(0);
  const total = projects.length;

  const prev = useCallback(() => setIndex((i) => (i - 1 + total) % total), [total]);
  const next = useCallback(() => setIndex((i) => (i + 1) % total), [total]);

  const project = projects[index];
  const readmeData = projectReadmes[project.title];

  return (
    <div className="mx-auto max-w-5xl px-6 py-14">

      {/* Header */}
      <div className="mb-12">
        <p className="mb-2 text-xs font-semibold uppercase tracking-widest text-violet-400">
          My Work
        </p>
        <h1 className="text-4xl font-extrabold text-white">Featured Projects</h1>
        <p className="mt-3 text-slate-400 max-w-xl">
          AI/ML systems, full-stack apps, and innovative tools. Click the arrows to browse.
        </p>
      </div>

      {/* Carousel wrapper */}
      <div className="relative">

        {/* Project card */}
        <div className="rounded-2xl border border-white/[0.08] bg-white/[0.03] overflow-hidden min-h-[440px] flex flex-col">

          {/* Top accent bar */}
          <div className="h-1 w-full bg-gradient-to-r from-violet-600 via-cyan-400 to-violet-600" />

          <div className="flex flex-col gap-6 p-8 sm:p-10 flex-1">

            {/* Counter + Title */}
            <div className="flex items-start justify-between gap-4">
              <div className="flex-1">
                <span className="text-xs font-mono text-slate-500 mb-2 block">
                  {String(index + 1).padStart(2, "0")} / {String(total).padStart(2, "0")}
                </span>
                <h2 className="text-2xl sm:text-3xl font-bold text-white leading-tight">
                  {project.title}
                </h2>
              </div>

              {/* Nav arrows — desktop top-right */}
              <div className="hidden sm:flex items-center gap-2 flex-shrink-0 mt-1">
                <button
                  onClick={prev}
                  aria-label="Previous project"
                  className="flex h-9 w-9 items-center justify-center rounded-full border border-white/10 bg-white/5 text-slate-400 hover:border-violet-500/40 hover:text-violet-300 transition-all"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>
                <button
                  onClick={next}
                  aria-label="Next project"
                  className="flex h-9 w-9 items-center justify-center rounded-full border border-white/10 bg-white/5 text-slate-400 hover:border-violet-500/40 hover:text-violet-300 transition-all"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Description */}
            <p className="text-slate-400 leading-relaxed text-base max-w-2xl">
              {project.summary.replace(/^[\p{Emoji}\s]+/u, "")}
            </p>

            {/* Metrics */}
            {project.highlightMetrics && project.highlightMetrics.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {project.highlightMetrics.map((m) => (
                  <span
                    key={m}
                    className="rounded-md border border-cyan-500/25 bg-cyan-500/8 px-3 py-1 text-xs font-medium text-cyan-300"
                  >
                    {m}
                  </span>
                ))}
              </div>
            )}

            {/* Tech stack */}
            <div>
              <p className="text-xs font-semibold uppercase tracking-wider text-slate-500 mb-2">
                Tech Stack
              </p>
              <div className="flex flex-wrap gap-2">
                {project.tech.map((tech) => (
                  <Badge
                    key={tech}
                    variant="secondary"
                    className="bg-violet-500/10 text-violet-200 border-violet-500/20 hover:bg-violet-500/20 transition-colors"
                  >
                    {tech}
                  </Badge>
                ))}
              </div>
            </div>

            {/* Action links */}
            <div className="flex flex-wrap items-center gap-4 pt-2 border-t border-white/[0.06] mt-auto">
              {project.links.github && (
                <Link
                  href={project.links.github}
                  target="_blank"
                  className="text-sm font-medium text-violet-400 hover:text-violet-300 transition-colors"
                >
                  GitHub →
                </Link>
              )}
              {project.links.demo && (
                project.title === "GitGuide" ? (
                  <ColdStartWarning demoUrl={project.links.demo} />
                ) : (
                  <Link
                    href={project.links.demo}
                    target="_blank"
                    className="text-sm font-medium text-cyan-400 hover:text-cyan-300 transition-colors"
                  >
                    {project.title === "BrowserFriend" ? "PyPI ↗" : "Live Demo ↗"}
                  </Link>
                )
              )}
              {project.title === "GitGuide" && (
                <VideoDemoDialog videoSrc="/gitguide-demo.mp4" title="GitGuide Video Demo" />
              )}
              {readmeData && (
                <DeepDiveDialog title={readmeData.projectTitle} content={readmeData.content} />
              )}
            </div>

          </div>
        </div>

        {/* Mobile nav arrows */}
        <div className="sm:hidden flex justify-center gap-4 mt-5">
          <button
            onClick={prev}
            aria-label="Previous project"
            className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/5 text-slate-400 hover:border-violet-500/40 hover:text-violet-300 transition-all"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <button
            onClick={next}
            aria-label="Next project"
            className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/5 text-slate-400 hover:border-violet-500/40 hover:text-violet-300 transition-all"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>

        {/* Dot indicators */}
        <div className="flex justify-center gap-1.5 mt-5">
          {projects.map((_, i) => (
            <button
              key={i}
              onClick={() => setIndex(i)}
              aria-label={`Go to project ${i + 1}`}
              className={`h-1.5 rounded-full transition-all duration-300 ${
                i === index
                  ? "w-6 bg-violet-400"
                  : "w-1.5 bg-white/20 hover:bg-white/40"
              }`}
            />
          ))}
        </div>
      </div>

      {/* Footer CTA */}
      <div className="mt-16 rounded-2xl border border-violet-500/20 bg-gradient-to-r from-violet-500/8 to-cyan-500/8 px-8 py-10 text-center">
        <h3 className="text-lg font-semibold text-white mb-2">See everything on GitHub</h3>
        <p className="text-sm text-slate-400 mb-5">
          More projects, contributions, and experiments live on my GitHub profile.
        </p>
        <Link
          href="https://github.com/prabhakar1234pr"
          target="_blank"
          className="inline-flex items-center gap-2 rounded-lg bg-violet-600 hover:bg-violet-700 px-5 py-2 text-sm font-semibold text-white transition-colors shadow-lg shadow-violet-900/40"
        >
          View GitHub Profile
        </Link>
      </div>
    </div>
  );
}
