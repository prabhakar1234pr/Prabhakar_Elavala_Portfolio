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
  work:       "border-white/25 bg-white/10 text-white/85",
  internship: "border-white/25 bg-white/10 text-white/85",
  "part-time":"border-white/25 bg-white/10 text-white/75",
  education:  "border-white/25 bg-white/10 text-white/85",
};
const TYPE_LABEL: Record<string, string> = {
  work:       "Full-time",
  internship: "Internship",
  "part-time":"Part-time",
  education:  "Education",
};
const TYPE_DOT: Record<string, string> = {
  work:       "bg-white/80",
  internship: "bg-white/80",
  "part-time":"bg-white/65",
  education:  "bg-white/80",
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
        <p className="mb-2 text-xs font-semibold uppercase tracking-widest text-white/60">
          My Journey
        </p>
        <h1 className="text-4xl font-extrabold text-white mb-3">
          Experience &amp; Education
        </h1>
        <p className="max-w-lg text-sm text-white/66">
          Professional roles, academic background, and certifications in AI/ML engineering.
        </p>
      </div>

      {/* ── Section tabs ── */}
      <div className="mb-8 flex w-fit gap-1 rounded-xl border border-white/15 bg-white/5 p-1 backdrop-blur-xl">
        {(["experience", "education"] as Section[]).map((s) => (
          <button
            key={s}
            onClick={() => handleSection(s)}
            className={`px-5 py-2 rounded-lg text-sm font-semibold transition-all capitalize ${
              section === s
                ? "bg-white text-black shadow-lg shadow-black/35"
                : "text-white/62 hover:text-white"
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
                  ? "glass-panel border-white/25 bg-white/12"
                  : "border-white/[0.10] bg-white/[0.04] hover:border-white/[0.20] hover:bg-white/[0.08]"
              }`}
            >
              {/* Active indicator bar */}
              <div className="flex items-start gap-3">
                <span
                  className={`mt-1.5 h-2 w-2 flex-shrink-0 rounded-full transition-colors ${
                    activeIdx === i
                      ? (TYPE_DOT[item.type ?? "work"])
                      : "bg-white/35 group-hover:bg-white/55"
                  }`}
                />
                <div className="min-w-0">
                  <p className={`text-sm font-semibold leading-tight truncate transition-colors ${
                    activeIdx === i ? "text-white" : "text-white/78 group-hover:text-white"
                  }`}>
                    {item.org}
                  </p>
                  <p className="mt-0.5 truncate text-xs text-white/55">{item.role}</p>
                  <p className="mt-1 text-[10px] text-white/40">{item.dates}</p>
                </div>
              </div>
            </button>
          ))}

          {/* Certifications card — only on education tab */}
          {section === "education" && (
            <div className="glass-panel mt-4 rounded-xl px-4 py-4">
              <p className="mb-3 text-[10px] font-bold uppercase tracking-widest text-white/72">
                Certifications
              </p>
              <div className="space-y-2.5">
                {certifications.map((c) => (
                  <div key={c.name} className="flex items-start gap-2">
                    <span className="mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-white/75" />
                    <div>
                      <p className="text-xs font-medium text-white leading-snug">{c.name}</p>
                      <div className="flex items-center gap-2 mt-0.5">
                        <span className="text-[10px] text-white/55">{c.issuer}</span>
                        {c.link && (
                          <a
                            href={c.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-0.5 text-[10px] text-white/80 transition-colors hover:text-white"
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
        <div className="glass-panel min-h-[420px] rounded-2xl p-8 lg:p-10">

          {/* Top accent */}
          <div className="mb-8 h-px w-full bg-gradient-to-r from-white/55 via-white/25 to-transparent" />

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
          <p className="mb-3 text-lg font-semibold text-white/84">{active.org}</p>

          <div className="mb-8 flex flex-wrap gap-4 text-xs text-white/55">
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
                <span className="font-semibold text-white/84">GPA {active.gpa} / 4.0</span>
              </span>
            )}
          </div>

          {/* Bullets */}
          <ul className="space-y-4">
            {active.bullets.map((b, i) => (
              <li key={i} className="flex gap-3 group">
                <span className="mt-[7px] h-1.5 w-1.5 flex-shrink-0 rounded-full bg-white/55 transition-colors group-hover:bg-white/78" />
                <p className="text-sm leading-relaxed text-white/68 transition-colors group-hover:text-white/80">
                  {b}
                </p>
              </li>
            ))}
          </ul>

          {/* Bottom accent */}
          <div className="mt-10 flex items-center justify-between border-t border-white/10 pt-6">
            <span className="text-[10px] font-bold uppercase tracking-widest text-white/45">
              {activeIdx + 1} of {items.length}
            </span>
            <div className="flex gap-1.5">
              {items.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setActiveIdx(i)}
                  className={`rounded-full transition-all duration-300 ${
                    i === activeIdx
                      ? "h-1.5 w-5 bg-white/80"
                      : "h-1.5 w-1.5 bg-white/25 hover:bg-white/45"
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
