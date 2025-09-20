import Link from "next/link";
import { HeroCanvas } from "@/components/home/HeroCanvas";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export default function Home() {
  return (
    <section className="relative overflow-hidden">
      <HeroCanvas />
      <div className="mx-auto max-w-6xl px-6 pt-28 pb-20 sm:pt-36 sm:pb-28">
        <p className="text-sm text-muted-foreground">Prabhakar Elavala</p>
        <h1 className="mt-3 text-4xl font-bold tracking-tight sm:text-6xl">
          AI/ML Engineer • LLMs • MLOps • Data Pipelines
        </h1>
        <p className="mt-4 text-base text-muted-foreground max-w-2xl">
          I design and ship reliable AI systems end-to-end: data, training, evals, and production.
        </p>
        <div className="mt-8 flex gap-4">
          <Link href="/api/resume" className={cn(buttonVariants(), "shadow")}>
            Download Resume
          </Link>
          <Link href="/contact" className={cn(buttonVariants({ variant: "outline" }))}>
            Contact
          </Link>
        </div>
      </div>
    </section>
  );
}
