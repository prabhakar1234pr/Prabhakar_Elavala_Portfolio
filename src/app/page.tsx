import Link from "next/link";
import Image from "next/image";
import { HeroCanvas } from "@/components/home/HeroCanvas";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  "name": "Prabhakar Elavala",
  "jobTitle": "AI/ML Engineer",
  "description": "AI/ML Engineer specializing in backend development, data engineering, and machine learning systems. MS Informatics, Northeastern University.",
  "url": "https://prabhakar-elavala-portfolio.vercel.app",
  "sameAs": [
    "https://www.linkedin.com/in/prabhakarelavala",
    "https://github.com/prabhakar1234pr"
  ],
  "alumniOf": { "@type": "Organization", "name": "Northeastern University" },
  "knowsAbout": ["Artificial Intelligence","Machine Learning","Data Science","Python","Next.js","FastAPI","AWS","Azure","LangChain","MLOps"],
  "hasCredential": [
    {
      "@type": "EducationalOccupationalCredential",
      "credentialCategory": "certification",
      "name": "Microsoft Certified: Azure AI Engineer Associate",
      "recognizedBy": { "@type": "Organization", "name": "Microsoft" }
    },
    {
      "@type": "EducationalOccupationalCredential",
      "credentialCategory": "certification",
      "name": "Databricks Certified Machine Learning Associate",
      "recognizedBy": { "@type": "Organization", "name": "Databricks" }
    }
  ]
};

export default function Home() {
  return (
    <div className="relative overflow-hidden">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <HeroCanvas />

      {/* ── HERO ─────────────────────────────────────────── */}
      <section className="mx-auto max-w-6xl px-6 pt-24 pb-20 sm:pt-32 sm:pb-28">
        <div className="flex flex-col-reverse items-center gap-10 md:flex-row md:items-center md:gap-16">

          {/* Left — text */}
          <div className="flex-1 text-center md:text-left">
            <p className="mb-3 text-sm font-semibold uppercase tracking-widest text-violet-400">
              AI Engineer &amp; Full-Stack Developer
            </p>

            <h1 className="text-4xl font-extrabold tracking-tight sm:text-6xl text-white">
              Prabhakar<br />Elavala
            </h1>

            <p className="mt-5 text-base text-slate-400 max-w-lg leading-relaxed">
              I build AI-powered products end-to-end —{" "}
              <span className="text-slate-300">full-stack apps, LLM pipelines,</span>{" "}
              and the ML systems that run reliably in production.
            </p>

            {/* Skill chips */}
            <div className="mt-6 flex flex-wrap justify-center md:justify-start gap-2">
              {["Python","Next.js","FastAPI","LangChain","PyTorch","Docker"].map((s) => (
                <span
                  key={s}
                  className="rounded-full border border-violet-500/30 bg-violet-500/10 px-3 py-1 text-xs font-medium text-violet-300"
                >
                  {s}
                </span>
              ))}
            </div>

            {/* CTAs */}
            <div className="mt-8 flex flex-wrap justify-center md:justify-start gap-3">
              <Link
                href="/projects"
                className={cn(
                  buttonVariants(),
                  "bg-violet-600 hover:bg-violet-700 text-white shadow-lg shadow-violet-900/40 border-0"
                )}
              >
                View Projects
              </Link>
              <a
                href="/Prabhakar_Resume.pdf"
                download
                className={cn(
                  buttonVariants({ variant: "outline" }),
                  "border-violet-500/40 text-violet-300 hover:bg-violet-500/10 hover:text-violet-200"
                )}
              >
                Download Resume
              </a>
              <Link
                href="/contact"
                className={cn(
                  buttonVariants({ variant: "ghost" }),
                  "text-slate-400 hover:text-white"
                )}
              >
                Contact
              </Link>
            </div>
          </div>

          {/* Right — photo */}
          <div className="relative flex-shrink-0">
            {/* Glow ring */}
            <div className="absolute inset-0 rounded-full bg-violet-500/20 blur-2xl scale-110" />
            {/* Outer ring */}
            <div className="relative rounded-full p-[3px] bg-gradient-to-br from-violet-500 via-cyan-400 to-violet-600 shadow-2xl shadow-violet-900/50">
              <div className="rounded-full overflow-hidden w-52 h-52 sm:w-64 sm:h-64 bg-background">
                <Image
                  src="/WhatsApp Image 2025-07-12 at 18.14.40_c5d80c46.jpg"
                  alt="Prabhakar Elavala"
                  width={256}
                  height={256}
                  className="w-full h-full object-cover"
                  priority
                />
              </div>
            </div>
            {/* Open-to-work badge */}
            <span className="absolute -bottom-10 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-full border border-emerald-500/40 bg-emerald-500/10 px-3 py-1 text-xs font-medium text-emerald-400">
              ● Open to Work
            </span>
          </div>

        </div>
      </section>

      {/* ── FEATURED PROJECTS ────────────────────────────── */}
      <section className="mx-auto max-w-6xl px-6 py-16 border-t border-white/[0.06]">
        <div className="mb-10 flex items-end justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-widest text-violet-400 mb-2">
              Selected Work
            </p>
            <h2 className="text-2xl font-bold text-white">Featured Projects</h2>
          </div>
          <Link href="/projects" className="text-sm text-cyan-400 hover:text-cyan-300 transition-colors">
            View all →
          </Link>
        </div>

        <div className="grid gap-5 md:grid-cols-3">
          {[
            {
              title: "GitGuide",
              desc: "Paste any GitHub repo and get a structured roadmap, a repo-aware RAG chatbot, and a real cloud IDE with Monaco editor and Docker terminal — all generated from the actual codebase.",
              tags: ["Next.js","FastAPI","Google Vertex AI"],
              href: "https://gitguide.dev/",
            },
            {
              title: "Song Popularity ML Pipeline",
              desc: "Upload an MP3 and get a popularity score. 13-step ZenML pipeline, Optuna search across 5 algorithms, 80% compute reduction via smart sampling, tracked with MLflow.",
              tags: ["MLOps","ZenML","MLflow"],
              href: "https://huggingface.co/spaces/Prabhakar554/song-popularity-predictor",
            },
            {
              title: "SubsGen",
              desc: "Instagram-style subtitles with AI reel pipeline: CrewAI Flows orchestration, Groq Whisper/Llama, and agent-driven editing.",
              tags: ["Visual Language Models","FastAPI","CrewAI Flows"],
              href: "https://subsgen-frontend-qk75e3hl0-prabhakar-elavalas-projects.vercel.app/",
            },
          ].map((p) => (
            <a
              key={p.title}
              href={p.href}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex flex-col gap-4 rounded-xl border border-white/[0.08] bg-white/[0.03] p-5 hover:border-violet-500/30 hover:bg-violet-500/5 transition-all duration-300"
            >
              <h3 className="font-semibold text-white group-hover:text-violet-300 transition-colors">
                {p.title}
              </h3>
              <p className="text-sm text-slate-400 leading-relaxed flex-1">{p.desc}</p>
              <div className="flex flex-wrap gap-1.5">
                {p.tags.map((t) => (
                  <span
                    key={t}
                    className="rounded-md bg-violet-500/10 border border-violet-500/20 px-2 py-0.5 text-xs text-violet-300"
                  >
                    {t}
                  </span>
                ))}
              </div>
            </a>
          ))}
        </div>
      </section>

      {/* ── CTA STRIP ────────────────────────────────────── */}
      <section className="mx-auto max-w-6xl px-6 py-14 border-t border-white/[0.06]">
        <div className="rounded-2xl border border-violet-500/20 bg-gradient-to-r from-violet-500/8 to-cyan-500/8 px-8 py-10 text-center">
          <h2 className="text-xl font-bold text-white mb-2">
            Ready to build something great together?
          </h2>
          <p className="text-slate-400 text-sm mb-6 max-w-xl mx-auto">
            Open to full-time roles in AI engineering, backend systems, and applied ML.
            Based in San Francisco &mdash; open to remote and relocation.
          </p>
          <div className="flex flex-wrap gap-3 justify-center">
            <Link
              href="/contact"
              className={cn(
                buttonVariants(),
                "bg-violet-600 hover:bg-violet-700 text-white shadow-lg shadow-violet-900/40 border-0"
              )}
            >
              Get in Touch
            </Link>
            <Link
              href="/experience"
              className={cn(
                buttonVariants({ variant: "outline" }),
                "border-white/15 text-slate-300 hover:bg-white/5"
              )}
            >
              View Experience
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
