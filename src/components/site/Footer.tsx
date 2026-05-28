import Link from "next/link";

const quickLinks = [
  { href: "/projects", label: "Projects" },
  { href: "/experience", label: "Experience" },
  { href: "/blog", label: "Blog" },
  { href: "/contact", label: "Contact" },
];

export function Footer() {
  return (
    <footer className="mt-6 border-t border-white/10">
      <div className="mx-auto max-w-6xl px-6 py-10">
        <div className="grid gap-8 sm:grid-cols-3">

          {/* Brand col */}
          <div className="space-y-3">
            <p className="font-semibold text-white text-sm">
              Prabhakar<span className="text-white/70">.</span>
            </p>
            <p className="max-w-[200px] text-xs leading-relaxed text-white/55">
              AI / ML Engineer · San Francisco, CA<br />
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
                  className="flex h-7 w-7 items-center justify-center rounded-md border border-white/15 bg-white/5 text-[10px] font-bold text-white/60 transition-colors hover:border-white/30 hover:text-white"
                >
                  {s.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Quick links */}
          <div className="space-y-3">
            <p className="text-[10px] font-semibold uppercase tracking-widest text-white/50">
              Quick Links
            </p>
            <nav className="flex flex-col gap-2">
              {quickLinks.map((l) => (
                <Link
                  key={l.href}
                  href={l.href}
                  className="w-fit text-xs text-white/65 transition-colors hover:text-white"
                >
                  {l.label}
                </Link>
              ))}
            </nav>
          </div>

          {/* Status + built-with */}
          <div className="space-y-3">
            <span className="inline-flex items-center gap-1.5 rounded-full border border-white/20 bg-white/8 px-3 py-1 text-xs font-medium text-white/80">
              <span className="w-1.5 h-1.5 rounded-full bg-white/80 animate-pulse" />
              Available for Opportunities
            </span>
            <p className="text-xs text-white/55">
              Built with <span className="text-white/72">Next.js</span> · <span className="text-white/72">TypeScript</span> · <span className="text-white/72">Tailwind CSS</span>
            </p>
            <p className="text-xs text-white/55">
              Deployed on{" "}
              <a
                href="https://vercel.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white/75 transition-colors hover:text-white"
              >
                Vercel
              </a>
            </p>
          </div>

        </div>

        <div className="mt-8 border-t border-white/10 pt-6 text-center text-xs text-white/45">
          © {new Date().getFullYear()} Prabhakar Elavala. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
