"use client";

import { useState } from "react";
import { experience, education } from "@/data/experience";
import { MapPin, Calendar, ExternalLink } from "lucide-react";

// ── Certifications ─────────────────────────────────────
const certifications = [
  {
    name: "Azure AI Engineer Associate",
    issuer: "Microsoft",
    link: "https://learn.microsoft.com/en-us/users/prabhakarelavala-8349/transcript/d5ylxuolzp2g314?tab=credentials-tab",
  },
  {
    name: "Machine Learning Associate",
    issuer: "Databricks",
    link: "https://credentials.databricks.com/e0e3e060-6be5-4cba-ad5e-f28b92b0dc3c#acc.mFQUXin8",
  },
  { name: "AWS Cloud Architect", issuer: "AICTE" },
  { name: "ML Engineer",         issuer: "Startup India" },
];

// ── Type helpers ───────────────────────────────────────
type Section = "experience" | "education";

const TYPE_BADGE: Record<string, string> = {
  work:       "border-emerald-500/30 bg-emerald-500/10 text-emerald-300",
  internship: "border-violet-500/30 bg-violet-500/10 text-violet-300",
  "part-time":"border-slate-500/30  bg-slate-500/10  text-slate-400",
  education:  "border-cyan-500/30   bg-cyan-500/10   text-cyan-300",
};
const TYPE_LABEL: Record<string, string> = {
  work:       "Full-time",
  internship: "Internship",
  "part-time":"Part-time",
  education:  "Education",
};
const TYPE_DOT: Record<string, string> = {
  work:       "bg-emerald-400",
  internship: "bg-violet-400",
  "part-time":"bg-slate-400",
  education:  "bg-cyan-400",
};

export default function ExperiencePage() {
  const [section, setSection]     = useState<Section>("experience");
  const [activeIdx, setActiveIdx] = useState(0);

  const items = section === "experience" ? experience : education;
  const active = items[activeIdx] ?? items[0];

  const handleSection = (s: Section) => {
    setSection(s);
    setActiveIdx(0);
  };

  return (
    <div className="mx-auto max-w-6xl px-6 py-14">

      {/* ── Page header ── */}
      <div className="mb-10">
        <p className="mb-2 text-xs font-semibold uppercase tracking-widest text-violet-400">
          My Journey
        </p>
        <h1 className="text-4xl font-extrabold text-white mb-3">
          Experience &amp; Education
        </h1>
        <p className="text-slate-400 text-sm max-w-lg">
          Professional roles, academic background, and certifications in AI/ML engineering.
        </p>
      </div>

      {/* ── Section tabs ── */}
      <div className="flex gap-1 mb-8 p-1 rounded-xl border border-white/[0.07] bg-white/[0.02] w-fit">
        {(["experience", "education"] as Section[]).map((s) => (
          <button
            key={s}
            onClick={() => handleSection(s)}
            className={`px-5 py-2 rounded-lg text-sm font-semibold transition-all capitalize ${
              section === s
                ? "bg-violet-600 text-white shadow-lg shadow-violet-900/40"
                : "text-slate-400 hover:text-white"
            }`}
          >
            {s}
          </button>
        ))}
      </div>

      {/* ── Two-column layout ── */}
      <div className="grid grid-cols-1 lg:grid-cols-[300px_1fr] gap-6 items-start">

        {/* ── LEFT: role list ── */}
        <div className="flex flex-col gap-1.5">
          {items.map((item, i) => (
            <button
              key={item.org + item.role}
              onClick={() => setActiveIdx(i)}
              className={`group w-full text-left rounded-xl px-4 py-3.5 border transition-all duration-200 ${
                activeIdx === i
                  ? "border-violet-500/40 bg-violet-500/10"
                  : "border-white/[0.06] bg-white/[0.02] hover:border-white/[0.12] hover:bg-white/[0.05]"
              }`}
            >
              {/* Active indicator bar */}
              <div className="flex items-start gap-3">
                <span
                  className={`mt-1.5 h-2 w-2 flex-shrink-0 rounded-full transition-colors ${
                    activeIdx === i
                      ? (TYPE_DOT[item.type ?? "work"])
                      : "bg-slate-600 group-hover:bg-slate-500"
                  }`}
                />
                <div className="min-w-0">
                  <p className={`text-sm font-semibold leading-tight truncate transition-colors ${
                    activeIdx === i ? "text-white" : "text-slate-300 group-hover:text-white"
                  }`}>
                    {item.org}
                  </p>
                  <p className="text-xs text-slate-500 truncate mt-0.5">{item.role}</p>
                  <p className="text-[10px] text-slate-600 mt-1">{item.dates}</p>
                </div>
              </div>
            </button>
          ))}

          {/* Certifications card — only on education tab */}
          {section === "education" && (
            <div className="mt-4 rounded-xl border border-emerald-500/20 bg-emerald-500/5 px-4 py-4">
              <p className="text-[10px] font-bold uppercase tracking-widest text-emerald-400 mb-3">
                Certifications
              </p>
              <div className="space-y-2.5">
                {certifications.map((c) => (
                  <div key={c.name} className="flex items-start gap-2">
                    <span className="mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-emerald-400" />
                    <div>
                      <p className="text-xs font-medium text-white leading-snug">{c.name}</p>
                      <div className="flex items-center gap-2 mt-0.5">
                        <span className="text-[10px] text-slate-500">{c.issuer}</span>
                        {c.link && (
                          <a
                            href={c.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-0.5 text-[10px] text-emerald-400 hover:text-emerald-300 transition-colors"
                          >
                            Verify <ExternalLink className="w-2.5 h-2.5" />
                          </a>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* ── RIGHT: detail panel ── */}
        <div className="rounded-2xl border border-white/[0.07] bg-white/[0.02] p-8 lg:p-10 min-h-[420px]">

          {/* Top accent */}
          <div className="h-px w-full bg-gradient-to-r from-violet-500/60 via-cyan-400/40 to-transparent mb-8" />

          {/* Role + badge */}
          <div className="flex flex-wrap items-start justify-between gap-3 mb-1">
            <h2 className="text-2xl font-extrabold text-white leading-tight">
              {active.role}
            </h2>
            <span className={`flex-shrink-0 rounded-full border px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider ${TYPE_BADGE[active.type ?? "work"]}`}>
              {TYPE_LABEL[active.type ?? "work"]}
            </span>
          </div>

          {/* Org + meta */}
          <p className="text-lg font-semibold text-violet-300 mb-3">{active.org}</p>

          <div className="flex flex-wrap gap-4 text-xs text-slate-500 mb-8">
            <span className="flex items-center gap-1.5">
              <Calendar className="w-3.5 h-3.5" />
              {active.dates}
            </span>
            {active.location && (
              <span className="flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5" />
                {active.location}
              </span>
            )}
            {active.gpa && (
              <span className="flex items-center gap-1.5">
                <span className="text-emerald-400 font-semibold">GPA {active.gpa} / 4.0</span>
              </span>
            )}
          </div>

          {/* Bullets */}
          <ul className="space-y-4">
            {active.bullets.map((b, i) => (
              <li key={i} className="flex gap-3 group">
                <span className="mt-[7px] h-1.5 w-1.5 flex-shrink-0 rounded-full bg-violet-500/50 group-hover:bg-violet-400 transition-colors" />
                <p className="text-sm text-slate-400 leading-relaxed group-hover:text-slate-300 transition-colors">
                  {b}
                </p>
              </li>
            ))}
          </ul>

          {/* Bottom accent */}
          <div className="mt-10 pt-6 border-t border-white/[0.05] flex items-center justify-between">
            <span className="text-[10px] font-bold uppercase tracking-widest text-slate-600">
              {activeIdx + 1} of {items.length}
            </span>
            <div className="flex gap-1.5">
              {items.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setActiveIdx(i)}
                  className={`rounded-full transition-all duration-300 ${
                    i === activeIdx
                      ? "w-5 h-1.5 bg-violet-400"
                      : "w-1.5 h-1.5 bg-white/20 hover:bg-white/40"
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
