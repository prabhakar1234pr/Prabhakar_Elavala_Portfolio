import { experience } from "@/data/experience";

export default function ExperiencePage() {
  return (
    <div className="mx-auto max-w-4xl px-6 py-12">
      <h1 className="text-3xl font-semibold">Experience</h1>
      <ol className="mt-8 relative border-s pl-6">
        {experience.map((e) => (
          <li key={e.org + e.role} className="mb-8 ms-4">
            <div className="absolute w-3 h-3 bg-foreground rounded-full mt-2 -start-1.5 border border-background" />
            <time className="text-xs text-muted-foreground">{e.dates}</time>
            <h3 className="text-lg font-medium mt-1">
              {e.role} — <span className="text-muted-foreground">{e.org}</span>
            </h3>
            <ul className="mt-2 list-disc pl-4 text-sm text-muted-foreground space-y-1">
              {e.bullets.map((b) => (
                <li key={b}>{b}</li>
              ))}
            </ul>
          </li>
        ))}
      </ol>
    </div>
  );
}


