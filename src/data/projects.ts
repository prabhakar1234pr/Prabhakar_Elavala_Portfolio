export type Project = {
  title: string;
  summary: string;
  tech: string[];
  links: { github?: string; demo?: string };
  highlightMetrics?: string[];
};

export const projects: Project[] = [
  {
    title: "Song Popularity ML",
    summary: "🎵 Feature-engineered Spotify tracks, trained gradient models, and shipped an inference API with impressive accuracy and performance metrics.",
    tech: ["Python", "XGBoost", "FastAPI", "Docker"],
    links: { github: "https://github.com/prabhakar1234pr/song-popularity-ml", demo: "https://song-popularity.vercel.app" },
    highlightMetrics: ["R² 0.72 accuracy", "p95 latency 120ms"],
  },
  {
    title: "CareEscapes AI",
    summary: "🏥 Clinical note triage system using LLM retrieval and structured outputs for healthcare automation.",
    tech: ["LangChain", "OpenAI", "Pinecone", "FastAPI"],
    links: { github: "https://github.com/prabhakar1234pr/careescapes-ai" },
    highlightMetrics: ["F1 0.83 on evaluation set"],
  },
  {
    title: "GitGuide",
    summary: "🔧 AI-powered code review helper providing actionable diffs and intelligent refactor suggestions.",
    tech: ["Next.js", "tRPC", "PostHog", "Prisma"],
    links: { demo: "https://gitguide.prabhakar.dev" },
  },
  {
    title: "Backend Integrations Playground",
    summary: "🔗 Comprehensive adapters for common SaaS APIs with fully typed SDK and mock server capabilities.",
    tech: ["TypeScript", "Zod", "Vitest"],
    links: { github: "https://github.com/prabhakar1234pr/integrations-playground" },
  },
];


