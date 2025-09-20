const skills = [
  "LLMs", "MLOps", "Python/SQL", "AWS", "Azure", "Databricks",
  "LangChain", "FastAPI", "PyTorch"
];

export default function AboutPage() {
  return (
    <div className="mx-auto max-w-6xl px-6 py-12">
      <h1 className="text-3xl font-semibold">About</h1>
      <p className="mt-4 text-muted-foreground max-w-3xl">
        I build production-grade AI/ML systems with a focus on reliability and developer experience.
        My work spans data engineering, modeling, inference services, and product integrations.
      </p>
      <p className="mt-2 text-muted-foreground max-w-3xl">
        Focus areas: LLMs, RAG, evaluations, observability, scalable serving, and MLOps.
      </p>
      <h2 className="mt-8 text-xl font-medium">Skills</h2>
      <div className="mt-4 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2">
        {skills.map((s) => (
          <div key={s} className="glass rounded-md px-3 py-2 text-sm">{s}</div>
        ))}
      </div>
    </div>
  );
}


