import Link from "next/link";
import {
  Activity,
  BookOpen,
  Bot,
  Braces,
  Brain,
  Cloud,
  Code2,
  Cpu,
  Database,
  GraduationCap,
  GitBranch,
  Globe,
  HeartHandshake,
  MapPin,
  Mic2,
  Sparkles,
  Server,
  Telescope,
  Terminal,
  Workflow,
  Wrench,
  type LucideIcon,
} from "lucide-react";

const skillGroups = [
  {
    label: "AI / ML",
    skills: ["LangChain","LangGraph","OpenAI API","Hugging Face","RAG Pipelines","FAISS","pgvector","Embeddings","Prompt Engineering","Tool Calling","MLflow","ZenML","scikit-learn","PyTorch","TensorFlow","XGBoost","LightGBM"],
    icon: Bot,
  },
  {
    label: "Backend & APIs",
    skills: ["Python","FastAPI","Node.js","Express.js","REST APIs","Webhooks","OAuth 2.0","GraphQL","SQL","Redis","PostgreSQL","MongoDB","BigQuery"],
    icon: Server,
  },
  {
    label: "Data & Analytics",
    skills: ["Pandas","NumPy","PySpark","dbt","ETL/ELT","Data Warehousing","Redshift","BigQuery"],
    icon: Database,
  },
  {
    label: "Cloud & DevOps",
    skills: ["AWS Lambda","S3","CloudWatch","Glue","Azure","Docker","Kubernetes","Vercel","CI/CD","GitHub Actions","OpenTelemetry","PostHog"],
    icon: Cloud,
  },
  {
    label: "Frontend & Tools",
    skills: ["TypeScript","JavaScript","React","Next.js","Tailwind CSS","Git","GitHub","Playwright","Postman"],
    icon: Code2,
  },
];

const skillIcons: Record<string, LucideIcon> = {
  LangChain: Workflow,
  LangGraph: Workflow,
  "OpenAI API": Bot,
  "Hugging Face": Bot,
  "RAG Pipelines": Bot,
  FAISS: Database,
  pgvector: Database,
  Embeddings: Cpu,
  "Prompt Engineering": Braces,
  "Tool Calling": Wrench,
  MLflow: Workflow,
  ZenML: Workflow,
  "scikit-learn": Cpu,
  PyTorch: Cpu,
  TensorFlow: Cpu,
  XGBoost: Cpu,
  LightGBM: Cpu,
  Python: Terminal,
  FastAPI: Server,
  "Node.js": Server,
  "Express.js": Server,
  "REST APIs": Globe,
  Webhooks: GitBranch,
  "OAuth 2.0": Braces,
  GraphQL: Braces,
  SQL: Database,
  Redis: Database,
  PostgreSQL: Database,
  MongoDB: Database,
  BigQuery: Database,
  Pandas: Database,
  NumPy: Cpu,
  PySpark: Database,
  dbt: Workflow,
  "ETL/ELT": Workflow,
  "Data Warehousing": Database,
  Redshift: Database,
  "AWS Lambda": Cloud,
  S3: Cloud,
  CloudWatch: Cloud,
  Glue: Cloud,
  Azure: Cloud,
  Docker: Cloud,
  Kubernetes: Cloud,
  Vercel: Cloud,
  "CI/CD": Workflow,
  "GitHub Actions": GitBranch,
  OpenTelemetry: Workflow,
  PostHog: Workflow,
  TypeScript: Braces,
  JavaScript: Braces,
  React: Code2,
  "Next.js": Code2,
  "Tailwind CSS": Code2,
  Git: GitBranch,
  GitHub: GitBranch,
  Playwright: Bot,
  Postman: Globe,
};

const quickFacts = [
  { label: "Location", value: "San Francisco · Open to relocation", icon: MapPin },
  { label: "Education", value: "MS Informatics, Northeastern", icon: GraduationCap },
  { label: "GPA", value: "3.8 / 4.0", icon: Activity },
  { label: "Status", value: "Open to Work", icon: HeartHandshake },
];

const interests = [
  { label: "Artificial Intelligence", icon: Brain },
  { label: "Data Science & Analytics", icon: Database },
  { label: "Full-Stack Development", icon: Code2 },
  { label: "Cloud Computing & MLOps", icon: Cloud },
  { label: "Computer Vision & NLP", icon: Bot },
  { label: "Predictive Analytics", icon: Telescope },
  { label: "Music & Technology", icon: Mic2 },
  { label: "Continuous Learning", icon: BookOpen },
];

export default function AboutPage() {
  return (
    <div className="mx-auto max-w-5xl px-6 py-14">

      {/* ── Header ───────────────────────────────────────── */}
      <div className="mb-14">
        <p className="mb-2 text-xs font-semibold uppercase tracking-widest text-white/60">
          About Me
        </p>
        <h1 className="text-4xl font-extrabold text-white mb-5">
          Who I Am
        </h1>
        <div className="max-w-3xl space-y-4 leading-relaxed text-white/65">
          <p>
            I&apos;m a software engineer focused on building practical AI products that scale. My core
            strengths are backend development, data engineering, and applied machine learning — from
            designing robust data models to shipping cloud-ready systems with reliable APIs and
            production monitoring.
          </p>
          <p>
            I work best in fast-moving teams where ownership matters. I learn quickly, adapt to changing
            priorities, and focus on shipping high-quality features end to end. Clear communication,
            collaboration, and accountability are central to how I build.
          </p>
        </div>

        {/* Quick facts */}
        <div className="mt-8 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {quickFacts.map((f) => (
            <div
              key={f.label}
              className="glass-panel group rounded-xl px-4 py-3 transition-all duration-300 hover:-translate-y-0.5"
            >
              <div className="mb-2 flex items-center gap-2">
                <span className="inline-flex h-6 w-6 items-center justify-center rounded-md border border-white/20 bg-white/10">
                  <f.icon className="h-3.5 w-3.5 text-white/75 transition-colors group-hover:text-white" />
                </span>
                <p className="text-[10px] uppercase tracking-wider text-white/55">{f.label}</p>
              </div>
              <p className="text-sm font-medium text-white">{f.value}</p>
            </div>
          ))}
        </div>
      </div>

      {/* ── Interests ────────────────────────────────────── */}
      <div className="mb-14">
        <h2 className="mb-5 flex items-center gap-2 text-lg font-semibold text-white">
          <Sparkles className="h-4 w-4 text-white/80" />
          What Drives Me
        </h2>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {interests.map((interest) => (
            <div
              key={interest.label}
              className="glass-panel group flex items-center justify-center gap-2 rounded-lg px-3 py-2.5 text-center text-xs font-medium text-white/82 transition-all duration-300 hover:-translate-y-0.5"
            >
              <interest.icon className="h-3.5 w-3.5 text-white/65 transition-colors group-hover:text-white/95" />
              <span>{interest.label}</span>
            </div>
          ))}
        </div>
      </div>

      {/* ── Skills ───────────────────────────────────────── */}
      <div className="mb-14">
        <h2 className="text-lg font-semibold text-white mb-6">Technical Skills</h2>
        <div className="space-y-5">
          {skillGroups.map((group) => (
            <div key={group.label} className="glass-panel rounded-2xl p-4 sm:p-5">
              <div className="mb-4 flex items-center gap-2.5">
                <span className="inline-flex h-7 w-7 items-center justify-center rounded-md border border-white/20 bg-white/10">
                  <group.icon className="h-3.5 w-3.5 text-white/85" />
                </span>
                <p className="text-xs font-semibold uppercase tracking-widest text-white/65">
                  {group.label}
                </p>
              </div>
              <div className="flex flex-wrap gap-2.5">
                {group.skills.map((skill) => (
                  <div
                    key={skill}
                    className="group inline-flex items-center gap-1.5 rounded-full border border-white/15 bg-white/7 px-3 py-1.5 text-xs text-white/76 transition-all hover:-translate-y-0.5 hover:border-white/30 hover:bg-white/14 hover:text-white"
                  >
                    {skillIcons[skill] ? (
                      (() => {
                        const SkillIcon = skillIcons[skill];
                        return <SkillIcon className="h-3.5 w-3.5 text-white/65 transition-colors group-hover:text-white/90" />;
                      })()
                    ) : (
                      <span className="h-1.5 w-1.5 rounded-full bg-white/50 transition-colors group-hover:bg-white/90" />
                    )}
                    <span>{skill}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ── CTA ──────────────────────────────────────────── */}
      <div className="glass-panel rounded-2xl px-8 py-10 text-center">
        <h3 className="text-lg font-semibold text-white mb-2">Let&apos;s Connect</h3>
        <p className="mx-auto mb-6 max-w-lg text-sm text-white/66">
          Always happy to discuss ideas, share insights, or explore what we could build together.
        </p>
        <div className="flex flex-wrap gap-3 justify-center">
          <Link
            href="/contact"
            className="rounded-lg border border-white/20 bg-white px-5 py-2 text-sm font-semibold text-black shadow-lg shadow-black/30 transition-colors hover:bg-white/85"
          >
            Get In Touch
          </Link>
          <Link
            href="/projects"
            className="rounded-lg border border-white/20 bg-white/6 px-5 py-2 text-sm font-semibold text-white/86 transition-colors hover:bg-white/14"
          >
            View Projects
          </Link>
          <Link
            href="/resume"
            className="rounded-lg border border-white/20 bg-white/8 px-5 py-2 text-sm font-semibold text-white/86 transition-colors hover:bg-white/16"
          >
            View Resume
          </Link>
        </div>
      </div>

    </div>
  );
}
