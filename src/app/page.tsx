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
    label: "End-to-end AI systems",
    desc: "From data pipeline to deployed product",
  },
  {
    label: "LLM & RAG pipelines",
    desc: "LangChain, LangGraph, Vertex AI, Groq",
  },
  {
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
      <div className="liquid-orb left-[-12rem] top-[4rem] h-[24rem] w-[24rem] bg-white/35" />
      <div className="liquid-orb right-[-9rem] top-[18rem] h-[20rem] w-[20rem] bg-zinc-200/30" />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <HeroCanvas />

      {/* ── HERO ─────────────────────────────────────────── */}
      <section className="mx-auto max-w-6xl px-6 pb-24 pt-24 sm:pb-32 sm:pt-32">
        <div className="flex flex-col-reverse items-center gap-12 md:flex-row md:items-center md:gap-20">

          {/* Left — text */}
          <div className="motion-enter flex-1 text-center md:text-left">

            {/* Open to work pill */}
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-3.5 py-1.5">
              <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-white/85" />
              <span className="text-xs font-semibold text-white/80">
                Open to Work
              </span>
            </div>

            {/* Headline */}
            <h1 className="mb-5 whitespace-nowrap text-5xl font-extrabold leading-[0.95] tracking-tight text-white sm:text-7xl">
              Prabhakar Elavala
            </h1>

            {/* Value prop */}
            <p className="mb-8 max-w-lg text-lg leading-relaxed text-white/68">
              I build AI-powered products end-to-end —
              full-stack apps, LLM pipelines, and the ML systems
              that run{" "}
              <span className="font-medium text-white/94">reliably in production.</span>
            </p>

            {/* Strengths row */}
            <div className="mb-8 flex flex-wrap justify-center gap-3 border-b border-white/10 pb-8 sm:flex-row md:justify-start">
              {strengths.map((s) => (
                <div
                  key={s.label}
                  className="glass-panel flex items-center gap-2.5 rounded-lg px-3.5 py-2.5 transition-transform duration-300 hover:-translate-y-0.5"
                >
                  <div className="text-left">
                    <p className="text-xs font-semibold leading-tight text-white/90">{s.label}</p>
                    <p className="mt-0.5 text-[10px] text-white/55">{s.desc}</p>
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
                  "border border-white/20 bg-white text-black shadow-lg shadow-black/30 hover:bg-white/85"
                )}
              >
                View Projects
              </Link>
              <a
                href="/Prabhakar_Resume.pdf"
                download
                className={cn(
                  buttonVariants({ variant: "outline" }),
                  "border-white/25 bg-white/6 text-white/85 hover:bg-white/16 hover:text-white"
                )}
              >
                Download Resume
              </a>
              <Link
                href="/contact"
                className={cn(
                  buttonVariants({ variant: "ghost" }),
                  "text-white/65 hover:bg-white/8 hover:text-white"
                )}
              >
                Contact
              </Link>
            </div>
          </div>

          {/* Right — photo */}
          <div className="relative flex-shrink-0 motion-enter">
            <div className="glass-panel relative h-52 w-52 overflow-hidden rounded-2xl sm:h-64 sm:w-64">
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
            <div className="absolute -inset-4 -z-10 rounded-3xl bg-white/15 blur-3xl" />
          </div>

        </div>
      </section>

      {/* ── FEATURED PROJECTS ────────────────────────────── */}
      <section className="mx-auto max-w-6xl border-t border-white/10 px-6 py-16">
        <div className="mb-10 flex items-end justify-between">
          <div>
            <p className="mb-2 text-xs font-semibold uppercase tracking-widest text-white/60">
              Selected Work
            </p>
            <h2 className="text-2xl font-bold text-white">Featured Projects</h2>
          </div>
          <Link
            href="/projects"
            className="text-sm text-white/70 transition-colors hover:text-white"
          >
            View all →
          </Link>
        </div>

        <div className="grid gap-5 md:grid-cols-3">
          {featuredProjects.map((p) => (
            <Link
              key={p.title}
              href="/projects"
              className="glass-panel group flex flex-col gap-4 rounded-xl p-5 transition-all duration-300 hover:-translate-y-1"
            >
              <h3 className="font-semibold text-white transition-colors group-hover:text-white/80">
                {p.title}
              </h3>
              <p className="flex-1 text-sm leading-relaxed text-white/65">{p.desc}</p>
              <div className="flex flex-wrap gap-1.5">
                {p.tags.map((t) => (
                  <span
                    key={t}
                    className="rounded-md border border-white/20 bg-white/10 px-2 py-0.5 text-xs text-white/75"
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
      <section className="mx-auto max-w-6xl border-t border-white/10 px-6 py-14">
        <div className="glass-panel rounded-2xl px-8 py-10 text-center">
          <h2 className="text-xl font-bold text-white mb-2">
            Looking for an engineer who ships end-to-end?
          </h2>
          <p className="mx-auto mb-6 max-w-xl text-sm text-white/65">
            Based in San Francisco and open to full-time opportunities.
            Remote and relocation considered.
          </p>
          <div className="flex flex-wrap gap-3 justify-center">
            <Link
              href="/contact"
              className={cn(
                buttonVariants(),
                  "border border-white/20 bg-white text-black shadow-lg shadow-black/30 hover:bg-white/85"
              )}
            >
              Get in Touch
            </Link>
            <Link
              href="/experience"
              className={cn(
                buttonVariants({ variant: "outline" }),
                  "border-white/25 bg-white/6 text-white/85 hover:bg-white/16"
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
