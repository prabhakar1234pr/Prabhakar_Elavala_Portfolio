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
    summary: "Feature-engineered Spotify tracks, trained gradient models, and shipped an inference API.",
    tech: ["Python", "XGBoost", "FastAPI", "Docker"],
    links: { github: "https://github.com/example/song-popularity", demo: "https://demo.example.com" },
    highlightMetrics: ["R^2 0.72", "p95 latency 120ms"],
  },
  {
    title: "CareEscapes AI",
    summary: "Clinical note triage with LLM retrieval and structured outputs.",
    tech: ["LangChain", "OpenAI", "Pinecone", "FastAPI"],
    links: { github: "https://github.com/example/careescapes-ai" },
    highlightMetrics: ["F1 0.83 on eval set"],
  },
  {
    title: "GitGuide",
    summary: "AI code review helper for actionable diffs and refactor suggestions.",
    tech: ["Next.js", "tRPC", "PostHog", "Prisma"],
    links: { demo: "https://gitguide.example.com" },
  },
  {
    title: "Backend Integrations Playground",
    summary: "Adapters for common SaaS APIs with typed SDK and mock server.",
    tech: ["TypeScript", "Zod", "Vitest"],
    links: { github: "https://github.com/example/integrations-playground" },
  },
];


