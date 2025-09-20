import { projects } from "@/data/projects";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import { DeepDiveDialog } from "./DeepDiveDialog";

export default function ProjectsPage() {
  return (
    <div className="mx-auto max-w-6xl px-6 py-12">
      <h1 className="text-3xl font-semibold">Projects</h1>
      <div className="mt-8 grid gap-6 sm:grid-cols-2">
        {projects.map((p) => (
          <Card key={p.title} className="glass hover:translate-y-[-2px] transition">
            <CardHeader>
              <CardTitle>{p.title}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <p className="text-sm text-muted-foreground">{p.summary}</p>
              <div className="flex flex-wrap gap-2">
                {p.tech.map((t) => (
                  <Badge key={t} variant="secondary">{t}</Badge>
                ))}
              </div>
              <div className="flex gap-4 text-sm items-center">
                {p.links.github && (
                  <Link className="underline" href={p.links.github} target="_blank">GitHub</Link>
                )}
                {p.links.demo && (
                  <Link className="underline" href={p.links.demo} target="_blank">Demo</Link>
                )}
                <DeepDiveDialog title={p.title}>
                  <p>{p.summary}</p>
                  {p.highlightMetrics?.length ? (
                    <ul>
                      {p.highlightMetrics.map((m) => (
                        <li key={m}>{m}</li>
                      ))}
                    </ul>
                  ) : null}
                </DeepDiveDialog>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}


