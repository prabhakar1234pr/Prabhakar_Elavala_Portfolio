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

      {/* Professional Certifications */}
      <section className="mx-auto max-w-6xl px-6 py-16 border-t border-white/10">
        <div className="text-center mb-12">
          <h2 className="text-2xl font-bold mb-4 bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
            🏅 Professional Certifications
          </h2>
          <p className="text-muted-foreground">
            Industry-recognized certifications in AI/ML and cloud technologies
          </p>
        </div>
        <div className="grid gap-6 md:grid-cols-2 max-w-4xl mx-auto">
          {/* Microsoft Azure AI Engineer Associate */}
          <div className="bg-gradient-to-br from-blue-500/10 to-blue-600/5 border border-blue-300/20 rounded-xl p-6 hover:border-blue-300/40 transition-all duration-300">
            <div className="flex items-center gap-4 mb-4">
              <div className="w-12 h-12 bg-blue-500/20 rounded-lg flex items-center justify-center">
                <span className="text-2xl">🔵</span>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-blue-300">Microsoft Certified</h3>
                <p className="text-sm text-muted-foreground">Azure AI Engineer Associate</p>
              </div>
            </div>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Issued:</span>
                <span className="text-blue-200">Mar 2025</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Expires:</span>
                <span className="text-blue-200">Mar 2026</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Credential ID:</span>
                <span className="text-blue-200 font-mono text-xs">41EE28B38B80F0D0</span>
              </div>
            </div>
            <div className="mt-4 pt-4 border-t border-blue-300/20">
              <a
                href="https://learn.microsoft.com/en-us/users/prabhakarelavala-8349/transcript/d5ylxuolzp2g314?tab=credentials-tab"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-blue-400 hover:text-blue-300 transition-colors text-sm font-medium"
              >
                🔗 Verify Credential
              </a>
            </div>
          </div>

          {/* Databricks Certified ML Engineer Associate */}
          <div className="bg-gradient-to-br from-orange-500/10 to-red-500/10 border border-orange-300/20 rounded-xl p-6 hover:border-orange-300/40 transition-all duration-300">
            <div className="flex items-center gap-4 mb-4">
              <div className="w-12 h-12 bg-orange-500/20 rounded-lg flex items-center justify-center">
                <span className="text-2xl">🧱</span>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-orange-300">Databricks Certified</h3>
                <p className="text-sm text-muted-foreground">Machine Learning Associate</p>
              </div>
            </div>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Issued:</span>
                <span className="text-orange-200">Jan 2025</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Expires:</span>
                <span className="text-orange-200">Jan 2027</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Credential ID:</span>
                <span className="text-orange-200 font-mono text-xs">130997553</span>
              </div>
            </div>
            <div className="mt-4 pt-4 border-t border-orange-300/20">
              <a
                href="https://credentials.databricks.com/e0e3e060-6be5-4cba-ad5e-f28b92b0dc3c#acc.5Ma7ZxPT"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-orange-400 hover:text-orange-300 transition-colors text-sm font-medium"
              >
                🔗 Verify Credential
              </a>
            </div>
          </div>
        </div>
        <div className="text-center mt-8">
          <p className="text-sm text-muted-foreground max-w-2xl mx-auto">
            These certifications validate expertise in cloud AI services, machine learning operations, 
            and production ML systems on industry-leading platforms.
          </p>
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
