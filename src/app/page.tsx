import Link from "next/link";
import { HeroCanvas } from "@/components/home/HeroCanvas";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export default function Home() {
  return (
    <div className="relative overflow-hidden">
      <HeroCanvas />
      
      {/* Hero Section */}
      <section className="mx-auto max-w-6xl px-6 pt-28 pb-20 sm:pt-36 sm:pb-28">
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
      </section>

      {/* Current Status Section */}
      <section className="mx-auto max-w-6xl px-6 py-16 border-t border-white/10">
        <div className="text-center mb-12">
          <h2 className="text-2xl font-bold mb-4 bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
            🎓 Currently
          </h2>
        </div>
        <div className="grid gap-6 md:grid-cols-2">
          <div className="bg-gradient-to-r from-purple-500/10 to-blue-500/10 border border-purple-300/20 rounded-2xl p-6">
            <h3 className="text-lg font-semibold text-purple-300 mb-3">🎯 MS in Informatics (Analytics)</h3>
            <p className="text-muted-foreground mb-2">Northeastern University • Boston, MA</p>
            <p className="text-sm text-purple-200">Expected Dec 2025 • Current GPA: 3.8</p>
            <p className="text-sm text-muted-foreground mt-3">
              Specializing in data analytics, machine learning, and AI systems with hands-on experience in real-world projects.
            </p>
          </div>
          <div className="bg-gradient-to-r from-green-500/10 to-blue-500/10 border border-green-300/20 rounded-2xl p-6">
            <h3 className="text-lg font-semibold text-green-300 mb-3">💼 Data Science Intern</h3>
            <p className="text-muted-foreground mb-2">CommandL • San Francisco, CA (Remote)</p>
            <p className="text-sm text-green-200">Apr 2025 - Jul 2025</p>
            <p className="text-sm text-muted-foreground mt-3">
              Analyzing learner interactions, improving AI-generated content quality, and optimizing LLM performance monitoring.
            </p>
          </div>
        </div>
      </section>

      {/* Featured Projects Preview */}
      <section className="mx-auto max-w-6xl px-6 py-16 border-t border-white/10">
        <div className="text-center mb-12">
          <h2 className="text-2xl font-bold mb-4 bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
            🚀 Featured Projects
          </h2>
          <p className="text-muted-foreground">
            Building AI-powered solutions that solve real-world problems
          </p>
        </div>
        <div className="grid gap-6 md:grid-cols-3">
          <div className="bg-white/5 backdrop-blur-sm border border-white/10 hover:border-purple-300/30 transition-all duration-300 rounded-xl p-6 group">
            <h3 className="text-lg font-semibold text-purple-300 mb-2 group-hover:text-purple-200 transition-colors">
              🤖 GitGuide
            </h3>
            <p className="text-sm text-muted-foreground mb-4">
              AI-powered platform transforming GitHub repos into personalized learning journeys with context-aware chat assistance.
            </p>
            <div className="flex flex-wrap gap-1 mb-4">
              <span className="text-xs bg-purple-500/20 text-purple-200 px-2 py-1 rounded">Next.js</span>
              <span className="text-xs bg-blue-500/20 text-blue-200 px-2 py-1 rounded">FastAPI</span>
              <span className="text-xs bg-green-500/20 text-green-200 px-2 py-1 rounded">Azure OpenAI</span>
            </div>
          </div>
          
          <div className="bg-white/5 backdrop-blur-sm border border-white/10 hover:border-purple-300/30 transition-all duration-300 rounded-xl p-6 group">
            <h3 className="text-lg font-semibold text-purple-300 mb-2 group-hover:text-purple-200 transition-colors">
              🎵 Song Popularity ML Pipeline
            </h3>
            <p className="text-sm text-muted-foreground mb-4">
              Production ML pipeline predicting song popularity using 600K+ Spotify tracks with MLOps best practices.
            </p>
            <div className="flex flex-wrap gap-1 mb-4">
              <span className="text-xs bg-purple-500/20 text-purple-200 px-2 py-1 rounded">XGBoost</span>
              <span className="text-xs bg-blue-500/20 text-blue-200 px-2 py-1 rounded">ZenML</span>
              <span className="text-xs bg-green-500/20 text-green-200 px-2 py-1 rounded">MLflow</span>
            </div>
          </div>

          <div className="bg-white/5 backdrop-blur-sm border border-white/10 hover:border-purple-300/30 transition-all duration-300 rounded-xl p-6 group">
            <h3 className="text-lg font-semibold text-purple-300 mb-2 group-hover:text-purple-200 transition-colors">
              🏥 AI Healthcare Chatbot
            </h3>
            <p className="text-sm text-muted-foreground mb-4">
              Healthcare AI chatbot with Azure OpenAI, LangGraph for complex workflows, and comprehensive testing.
            </p>
            <div className="flex flex-wrap gap-1 mb-4">
              <span className="text-xs bg-purple-500/20 text-purple-200 px-2 py-1 rounded">LangGraph</span>
              <span className="text-xs bg-blue-500/20 text-blue-200 px-2 py-1 rounded">Azure OpenAI</span>
              <span className="text-xs bg-green-500/20 text-green-200 px-2 py-1 rounded">React</span>
            </div>
          </div>
        </div>
        <div className="text-center mt-8">
          <Link 
            href="/projects" 
            className="inline-flex items-center gap-2 text-purple-300 hover:text-purple-200 transition-colors font-medium"
          >
            View All Projects →
          </Link>
        </div>
      </section>

      {/* Skills & Expertise */}
      <section className="mx-auto max-w-6xl px-6 py-16 border-t border-white/10">
        <div className="text-center mb-12">
          <h2 className="text-2xl font-bold mb-4 bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
            💻 Core Expertise
          </h2>
          <p className="text-muted-foreground">
            Full-stack AI/ML engineering with production experience
          </p>
        </div>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          <div className="bg-gradient-to-br from-purple-500/10 to-purple-600/5 border border-purple-300/20 rounded-xl p-6">
            <h3 className="text-lg font-semibold text-purple-300 mb-4">🤖 AI/ML Engineering</h3>
            <ul className="text-sm text-muted-foreground space-y-2">
              <li>• LangChain & LangGraph for complex workflows</li>
              <li>• RAG pipelines & embeddings (FAISS/pgvector)</li>
              <li>• Model deployment & monitoring (MLflow/ZenML)</li>
              <li>• Production ML pipelines with 95%+ accuracy</li>
            </ul>
          </div>
          
          <div className="bg-gradient-to-br from-blue-500/10 to-blue-600/5 border border-blue-300/20 rounded-xl p-6">
            <h3 className="text-lg font-semibold text-blue-300 mb-4">⚡ Backend Development</h3>
            <ul className="text-sm text-muted-foreground space-y-2">
              <li>• FastAPI & Node.js for high-performance APIs</li>
              <li>• OAuth 2.0 & webhook integrations</li>
              <li>• PostgreSQL, MongoDB & Redis optimization</li>
              <li>• Rate limiting & retry handling for SaaS APIs</li>
            </ul>
          </div>
          
          <div className="bg-gradient-to-br from-green-500/10 to-green-600/5 border border-green-300/20 rounded-xl p-6">
            <h3 className="text-lg font-semibold text-green-300 mb-4">☁️ Cloud & DevOps</h3>
            <ul className="text-sm text-muted-foreground space-y-2">
              <li>• AWS (Lambda, S3, CloudWatch, Redshift)</li>
              <li>• Docker containerization & Kubernetes</li>
              <li>• CI/CD with GitHub Actions & testing</li>
              <li>• Monitoring with PostHog & OpenTelemetry</li>
            </ul>
          </div>
        </div>
      </section>

      {/* Recent Achievements */}
      <section className="mx-auto max-w-6xl px-6 py-16 border-t border-white/10">
        <div className="text-center mb-12">
          <h2 className="text-2xl font-bold mb-4 bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
            🏆 Recent Achievements
          </h2>
        </div>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-lg p-4 text-center">
            <div className="text-2xl font-bold text-purple-300">3.8</div>
            <div className="text-sm text-muted-foreground">Current GPA</div>
          </div>
          <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-lg p-4 text-center">
            <div className="text-2xl font-bold text-blue-300">600K+</div>
            <div className="text-sm text-muted-foreground">Data Points Processed</div>
          </div>
          <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-lg p-4 text-center">
            <div className="text-2xl font-bold text-green-300">7</div>
            <div className="text-sm text-muted-foreground">Production Projects</div>
          </div>
          <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-lg p-4 text-center">
            <div className="text-2xl font-bold text-yellow-300">R² 0.51</div>
            <div className="text-sm text-muted-foreground">ML Model Accuracy</div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="mx-auto max-w-6xl px-6 py-16 border-t border-white/10">
        <div className="bg-gradient-to-r from-purple-500/10 to-blue-500/10 border border-purple-300/20 rounded-2xl p-8 text-center">
          <h2 className="text-2xl font-bold mb-4 text-purple-200">
            Ready to Build Something Amazing?
          </h2>
          <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
            I&apos;m actively seeking full-time opportunities in AI/ML engineering, backend development, and data science. 
            Let&apos;s discuss how I can contribute to your team&apos;s success.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link 
              href="/contact" 
              className={cn(
                buttonVariants(), 
                "bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600 text-white shadow-lg"
              )}
            >
              💬 Let&apos;s Connect
            </Link>
            <Link 
              href="/experience" 
              className={cn(buttonVariants({ variant: "outline" }), "border-purple-300/30 text-purple-200 hover:bg-purple-500/10")}
            >
              📄 View Experience
            </Link>
            <Link 
              href="/blog" 
              className={cn(buttonVariants({ variant: "outline" }), "border-blue-300/30 text-blue-200 hover:bg-blue-500/10")}
            >
              📝 Read Blog
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
