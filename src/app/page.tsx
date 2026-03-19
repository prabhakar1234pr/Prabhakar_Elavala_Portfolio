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

// Three focused strengths — replaces the generic KPI stats
const strengths = [
  {
    icon: "⚡",
    label: "End-to-end AI systems",
    desc: "From data pipeline to deployed product",
  },
  {
    icon: "🔗",
    label: "LLM & RAG pipelines",
    desc: "LangChain, LangGraph, Vertex AI, Groq",
  },
  {
    icon: "🛠",
    label: "Production-ready engineering",
    desc: "FastAPI, Docker, AWS, Azure, MLflow",
  },
];

const featuredProjects = [
  {
    title: "GitGuide",
    desc: "Paste any GitHub repo and get a structured roadmap, a repo-aware RAG chatbot, and a real cloud IDE with Monaco editor and Docker terminal.",
    tags: ["Next.js", "FastAPI", "Vertex AI"],
  },
  {
    title: "Song Popularity ML Pipeline",
    desc: "Upload an MP3 and get a popularity score. 13-step ZenML pipeline, Optuna search across 5 algorithms, 80% compute reduction via smart sampling.",
    tags: ["MLOps", "ZenML", "MLflow"],
  },
  {
    title: "SubsGen",
    desc: "Instagram-style subtitles with AI reel pipeline: CrewAI Flows orchestration, Groq Whisper/Llama, and agent-driven editing.",
    tags: ["CrewAI Flows", "FastAPI", "FFmpeg"],
  },
];

export default function Home() {
  return (
    <div className="relative overflow-hidden">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <HeroCanvas />

      {/* ── HERO ─────────────────────────────────────────── */}
      <section className="mx-auto max-w-6xl px-6 pt-24 pb-24 sm:pt-32 sm:pb-32">
        <div className="flex flex-col-reverse items-center gap-12 md:flex-row md:items-center md:gap-20">

          {/* Left — text */}
          <div className="flex-1 text-center md:text-left">

            {/* Open to work pill */}
            <div className="inline-flex items-center gap-2 rounded-full border border-emerald-500/30 bg-emerald-500/8 px-3.5 py-1.5 mb-6">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
              <span className="text-xs font-semibold text-emerald-300">
                Open to Work
              </span>
            </div>

            {/* Headline */}
            <h1 className="text-5xl font-extrabold tracking-tight sm:text-7xl text-white leading-[0.95] mb-5 whitespace-nowrap">
              Prabhakar Elavala
            </h1>

            {/* Value prop */}
            <p className="text-lg text-slate-400 max-w-lg leading-relaxed mb-8">
              I build AI-powered products end-to-end —
              full-stack apps, LLM pipelines, and the ML systems
              that run{" "}
              <span className="text-slate-200 font-medium">reliably in production.</span>
            </p>

            {/* Strengths row */}
            <div className="flex flex-col sm:flex-row flex-wrap justify-center md:justify-start gap-3 mb-8 pb-8 border-b border-white/[0.06]">
              {strengths.map((s) => (
                <div
                  key={s.label}
                  className="flex items-center gap-2.5 rounded-lg border border-white/[0.07] bg-white/[0.03] px-3.5 py-2.5"
                >
                  <span className="text-base leading-none">{s.icon}</span>
                  <div className="text-left">
                    <p className="text-xs font-semibold text-slate-200 leading-tight">{s.label}</p>
                    <p className="text-[10px] text-slate-500 mt-0.5">{s.desc}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* CTAs */}
            <div className="flex flex-wrap justify-center md:justify-start gap-3">
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
            <div className="relative rounded-2xl overflow-hidden w-52 h-52 sm:w-64 sm:h-64 ring-1 ring-white/10">
              <Image
                src="/prabhakar.jpg"
                alt="Prabhakar Elavala"
                width={256}
                height={256}
                className="w-full h-full object-cover"
                priority
              />
              <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-background/60 to-transparent" />
            </div>
            <div className="absolute -inset-4 rounded-3xl bg-violet-500/10 blur-2xl -z-10" />
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
          <Link
            href="/projects"
            className="text-sm text-cyan-400 hover:text-cyan-300 transition-colors"
          >
            View all →
          </Link>
        </div>

        <div className="grid gap-5 md:grid-cols-3">
          {featuredProjects.map((p) => (
            <Link
              key={p.title}
              href="/projects"
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
            </Link>
          ))}
        </div>
      </section>

      {/* ── CTA STRIP ────────────────────────────────────── */}
      <section className="mx-auto max-w-6xl px-6 py-14 border-t border-white/[0.06]">
        <div className="rounded-2xl border border-violet-500/20 bg-gradient-to-r from-violet-500/8 to-cyan-500/8 px-8 py-10 text-center">
          <h2 className="text-xl font-bold text-white mb-2">
            Looking for an engineer who ships end-to-end?
          </h2>
          <p className="text-slate-400 text-sm mb-6 max-w-xl mx-auto">
            Based in San Francisco and open to full-time opportunities.
            Remote and relocation considered.
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
