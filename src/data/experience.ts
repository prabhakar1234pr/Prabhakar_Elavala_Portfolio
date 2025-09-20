export type ExperienceItem = {
  role: string;
  org: string;
  dates: string;
  bullets: string[];
};

export const experience: ExperienceItem[] = [
  {
    role: "Engineer, AI Assistant",
    org: "CommandL",
    dates: "2024 — Present",
    bullets: [
      "Shipped LLM tools with retrieval, functions, and eval harness.",
      "Improved latency and hit rates via caching and model routing.",
    ],
  },
  {
    role: "ML Engineer",
    org: "CareEscapes AI",
    dates: "2023 — 2024",
    bullets: [
      "Clinical NLP with prompt engineering and RAG pipelines.",
      "HIPAA-aware deployment and observability.",
    ],
  },
  {
    role: "Data Science Project",
    org: "Song Popularity ML",
    dates: "2023",
    bullets: [
      "Feature engineering and model selection to predict track popularity.",
      "Packaged model and deployed inference service.",
    ],
  },
  {
    role: "Open Source",
    org: "GitGuide",
    dates: "2022 — 2023",
    bullets: [
      "Automated code review and improvement suggestions via AI.",
      "Telemetry and user insights with PostHog.",
    ],
  },
];


