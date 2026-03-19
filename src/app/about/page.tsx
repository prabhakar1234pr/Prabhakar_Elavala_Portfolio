import Link from "next/link";

const skillGroups = [
  {
    label: "AI / ML",
    skills: ["LangChain","LangGraph","OpenAI API","Hugging Face","RAG Pipelines","FAISS","pgvector","Embeddings","Prompt Engineering","Tool Calling","MLflow","ZenML","scikit-learn","PyTorch","TensorFlow","XGBoost","LightGBM"],
  },
  {
    label: "Backend & APIs",
    skills: ["Python","FastAPI","Node.js","Express.js","REST APIs","Webhooks","OAuth 2.0","GraphQL","SQL","Redis","PostgreSQL","MongoDB","BigQuery"],
  },
  {
    label: "Data & Analytics",
    skills: ["Pandas","NumPy","PySpark","dbt","ETL/ELT","Data Warehousing","Redshift","BigQuery"],
  },
  {
    label: "Cloud & DevOps",
    skills: ["AWS Lambda","S3","CloudWatch","Glue","Azure","Docker","Kubernetes","Vercel","CI/CD","GitHub Actions","OpenTelemetry","PostHog"],
  },
  {
    label: "Frontend & Tools",
    skills: ["TypeScript","JavaScript","React","Next.js","Tailwind CSS","Git","GitHub","Playwright","Postman"],
  },
];

export default function AboutPage() {
  return (
    <div className="mx-auto max-w-5xl px-6 py-14">

      {/* ── Header ───────────────────────────────────────── */}
      <div className="mb-14">
        <p className="mb-2 text-xs font-semibold uppercase tracking-widest text-violet-400">
          About Me
        </p>
        <h1 className="text-4xl font-extrabold text-white mb-5">
          Who I Am
        </h1>
        <div className="space-y-4 text-slate-400 max-w-3xl leading-relaxed">
          <p>
            I&apos;m a software engineer with a strong foundation in backend development, data engineering,
            and applied machine learning. I build scalable APIs, ship full-stack products, and design
            systems that run reliably in production — comfortable across the stack from data modeling
            to cloud deployments.
          </p>
          <p>
            Beyond technical skills, I bring a startup-ready mindset: fast learning, adaptability in
            dynamic environments, and a bias for shipping reliable features quickly. I value clear
            communication, collaboration, and ownership.
          </p>
        </div>

        {/* Quick facts */}
        <div className="mt-8 flex flex-wrap gap-4">
          {[
            { label: "Location", value: "San Francisco · Open to relocation" },
            { label: "Education", value: "MS Informatics, Northeastern" },
            { label: "GPA", value: "3.8 / 4.0" },
            { label: "Status", value: "Open to Work" },
          ].map((f) => (
            <div
              key={f.label}
              className="rounded-lg border border-white/[0.08] bg-white/[0.03] px-4 py-3"
            >
              <p className="text-[10px] uppercase tracking-wider text-slate-500 mb-0.5">{f.label}</p>
              <p className="text-sm font-medium text-white">{f.value}</p>
            </div>
          ))}
        </div>
      </div>

      {/* ── Interests ────────────────────────────────────── */}
      <div className="mb-14">
        <h2 className="text-lg font-semibold text-white mb-5">What Drives Me</h2>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {[
            "Artificial Intelligence",
            "Data Science & Analytics",
            "Full-Stack Development",
            "Cloud Computing & MLOps",
            "Computer Vision & NLP",
            "Predictive Analytics",
            "Music & Technology",
            "Continuous Learning",
          ].map((interest) => (
            <div
              key={interest}
              className="rounded-lg border border-violet-500/20 bg-violet-500/5 px-3 py-2.5 text-xs font-medium text-violet-300 text-center"
            >
              {interest}
            </div>
          ))}
        </div>
      </div>

      {/* ── Skills ───────────────────────────────────────── */}
      <div className="mb-14">
        <h2 className="text-lg font-semibold text-white mb-6">Technical Skills</h2>
        <div className="space-y-6">
          {skillGroups.map((group) => (
            <div key={group.label}>
              <p className="text-xs font-semibold uppercase tracking-widest text-violet-400 mb-3">
                {group.label}
              </p>
              <div className="flex flex-wrap gap-2">
                {group.skills.map((skill) => (
                  <span
                    key={skill}
                    className="rounded-md border border-white/[0.08] bg-white/[0.04] px-2.5 py-1 text-xs text-slate-300 hover:border-violet-500/30 hover:text-violet-200 transition-colors"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ── CTA ──────────────────────────────────────────── */}
      <div className="rounded-2xl border border-violet-500/20 bg-gradient-to-r from-violet-500/8 to-cyan-500/8 px-8 py-10 text-center">
        <h3 className="text-lg font-semibold text-white mb-2">Let&apos;s Connect</h3>
        <p className="text-sm text-slate-400 mb-6 max-w-lg mx-auto">
          Always happy to discuss ideas, share insights, or explore what we could build together.
        </p>
        <div className="flex flex-wrap gap-3 justify-center">
          <Link
            href="/contact"
            className="rounded-lg bg-violet-600 hover:bg-violet-700 px-5 py-2 text-sm font-semibold text-white transition-colors shadow-lg shadow-violet-900/40"
          >
            Get In Touch
          </Link>
          <Link
            href="/projects"
            className="rounded-lg border border-white/15 bg-white/5 hover:bg-white/10 px-5 py-2 text-sm font-semibold text-slate-300 transition-colors"
          >
            View Projects
          </Link>
        </div>
      </div>

    </div>
  );
}
