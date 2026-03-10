import { experience, education } from "@/data/experience";

export default function ExperiencePage() {
  return (
    <div className="mx-auto max-w-4xl px-6 py-14">

      <div className="mb-12">
        <p className="mb-2 text-xs font-semibold uppercase tracking-widest text-violet-400">
          My Journey
        </p>
        <h1 className="text-4xl font-extrabold text-white mb-3">Education &amp; Experience</h1>
        <p className="text-slate-400">Academic background and professional milestones in AI/ML engineering.</p>
      </div>

      {/* Education */}
      <section className="mb-16">
        <p className="mb-6 text-xs font-semibold uppercase tracking-widest text-cyan-400">Education</p>
        <ol className="relative border-l border-white/[0.08] space-y-8 pl-6">
          {education.map((e) => (
            <li key={e.org + e.role} className="relative">
              <span className="absolute -left-[26px] top-1.5 flex h-3 w-3 items-center justify-center rounded-full bg-cyan-400/20 ring-2 ring-cyan-400/40">
                <span className="h-1.5 w-1.5 rounded-full bg-cyan-400" />
              </span>
              <time className="text-[11px] text-slate-500 font-medium">{e.dates}</time>
              <h3 className="mt-0.5 text-base font-semibold text-white">{e.role}</h3>
              <p className="text-sm text-slate-400">
                {e.org}{e.location ? ` · ${e.location}` : ""}{e.gpa ? ` · GPA ${e.gpa}` : ""}
              </p>
              <ul className="mt-3 space-y-1.5">
                {e.bullets.map((b) => (
                  <li key={b} className="flex gap-2 text-sm text-slate-500">
                    <span className="mt-1 h-1 w-1 flex-shrink-0 rounded-full bg-slate-600" />
                    {b}
                  </li>
                ))}
              </ul>
            </li>
          ))}
        </ol>
      </section>

      {/* Experience */}
      <section>
        <p className="mb-6 text-xs font-semibold uppercase tracking-widest text-violet-400">
          Professional Experience
        </p>
        <ol className="relative border-l border-white/[0.08] space-y-8 pl-6">
          {experience.map((e) => {
            const dotColor =
              e.type === "internship" ? "bg-violet-400" :
              e.type === "volunteer"  ? "bg-cyan-400"   :
              e.type === "part-time"  ? "bg-slate-400"  : "bg-white";
            const badgeColor =
              e.type === "internship" ? "border-violet-500/30 bg-violet-500/10 text-violet-300" :
              e.type === "volunteer"  ? "border-cyan-500/30 bg-cyan-500/10 text-cyan-300"       :
              e.type === "part-time"  ? "border-slate-500/30 bg-slate-500/10 text-slate-400"    :
                                        "border-white/15 bg-white/5 text-white";
            const badgeLabel =
              e.type === "internship" ? "Internship" :
              e.type === "volunteer"  ? "Volunteer"  :
              e.type === "part-time"  ? "Part-time"  : "Full-time";

            return (
              <li key={e.org + e.role} className="relative">
                <span className={`absolute -left-[26px] top-1.5 flex h-3 w-3 items-center justify-center rounded-full bg-white/5 ring-2 ring-white/10`}>
                  <span className={`h-1.5 w-1.5 rounded-full ${dotColor}`} />
                </span>
                <div className="flex items-center gap-2 mb-0.5">
                  <time className="text-[11px] text-slate-500 font-medium">{e.dates}</time>
                  <span className={`rounded-full border px-2 py-0.5 text-[10px] font-semibold ${badgeColor}`}>
                    {badgeLabel}
                  </span>
                </div>
                <h3 className="text-base font-semibold text-white">{e.role}</h3>
                <p className="text-sm text-slate-400">
                  {e.org}{e.location ? ` · ${e.location}` : ""}
                </p>
                <ul className="mt-3 space-y-1.5">
                  {e.bullets.map((b) => (
                    <li key={b} className="flex gap-2 text-sm text-slate-500">
                      <span className="mt-1 h-1 w-1 flex-shrink-0 rounded-full bg-slate-600" />
                      {b}
                    </li>
                  ))}
                </ul>
              </li>
            );
          })}
        </ol>
      </section>

    </div>
  );
}
