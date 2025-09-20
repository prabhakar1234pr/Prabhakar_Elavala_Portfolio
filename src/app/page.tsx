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
          AI/ML Engineer for Backend, Integrations & LLM Automation
        </h1>
        <p className="mt-4 text-base text-muted-foreground max-w-3xl">
          I build reliable backend services, SaaS integrations, and LLM agents that automate B2B workflows—shipping fast with tests, metrics, and clean APIs.
        </p>
        <div className="mt-6 grid gap-2 text-sm text-muted-foreground">
          <div>• Backend APIs (FastAPI/Node) • Webhooks • OAuth • Rate-limit safe clients</div>
          <div>• LLM apps (LangChain/LangGraph) • RAG • tool-calling • evals & telemetry</div>
          <div>• Cloud deploys (Vercel/AWS) • CI/CD • unit/integration/E2E tests</div>
        </div>
        <div className="mt-8 flex flex-wrap gap-3">
          <Link href="/projects" className={cn(buttonVariants(), "shadow")}>
            View Projects
          </Link>
          <a
            href="/Prabhakar_Resume.pdf"
            className={cn(buttonVariants({ variant: "secondary" }))}
            download
          >
            Download Resume
          </a>
          <Link href="/contact" className={cn(buttonVariants({ variant: "outline" }))}>
            Contact
          </Link>
        </div>
      </div>
    </section>
  );
}
