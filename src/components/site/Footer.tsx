import Link from "next/link";

const quickLinks = [
  { href: "/projects", label: "Projects" },
  { href: "/experience", label: "Experience" },
  { href: "/blog", label: "Blog" },
  { href: "/contact", label: "Contact" },
];

export function Footer() {
  return (
    <footer className="border-t border-white/[0.06] mt-6">
      <div className="mx-auto max-w-6xl px-6 py-10">
        <div className="grid gap-8 sm:grid-cols-3">

          {/* Brand col */}
          <div className="space-y-3">
            <p className="font-semibold text-white text-sm">
              Prabhakar<span className="text-violet-400">.</span>
            </p>
            <p className="text-xs text-slate-500 leading-relaxed max-w-[200px]">
              AI / ML Engineer · Boston, MA<br />
              Open to full-time &amp; internship roles.
            </p>
            {/* Social icons */}
            <div className="flex gap-2 pt-1">
              {[
                { label: "GitHub", href: "https://github.com/prabhakar1234pr", icon: "GH" },
                { label: "LinkedIn", href: "https://www.linkedin.com/in/prabhakarelavala", icon: "in" },
                { label: "Email", href: "mailto:prabhakarpr554@gmail.com", icon: "@" },
              ].map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target={s.href.startsWith("mailto") ? undefined : "_blank"}
                  rel="noopener noreferrer"
                  aria-label={s.label}
                  className="flex h-7 w-7 items-center justify-center rounded-md border border-white/[0.08] bg-white/[0.03] text-[10px] font-bold text-slate-400 hover:border-violet-500/40 hover:text-violet-300 transition-colors"
                >
                  {s.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Quick links */}
          <div className="space-y-3">
            <p className="text-[10px] font-semibold uppercase tracking-widest text-slate-500">
              Quick Links
            </p>
            <nav className="flex flex-col gap-2">
              {quickLinks.map((l) => (
                <Link
                  key={l.href}
                  href={l.href}
                  className="text-xs text-slate-400 hover:text-white transition-colors w-fit"
                >
                  {l.label}
                </Link>
              ))}
            </nav>
          </div>

          {/* Status + built-with */}
          <div className="space-y-3">
            <span className="inline-flex items-center gap-1.5 rounded-full border border-emerald-500/30 bg-emerald-500/8 px-3 py-1 text-xs font-medium text-emerald-400">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              Available for Opportunities
            </span>
            <p className="text-xs text-slate-500">
              Built with{" "}
              <span className="text-slate-400">Next.js</span> ·{" "}
              <span className="text-slate-400">TypeScript</span> ·{" "}
              <span className="text-slate-400">Tailwind CSS</span>
            </p>
            <p className="text-xs text-slate-500">
              Deployed on{" "}
              <a
                href="https://vercel.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-slate-400 hover:text-white transition-colors"
              >
                Vercel
              </a>
            </p>
          </div>

        </div>

        <div className="mt-8 border-t border-white/[0.06] pt-6 text-center text-xs text-slate-600">
          © {new Date().getFullYear()} Prabhakar Elavala. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
