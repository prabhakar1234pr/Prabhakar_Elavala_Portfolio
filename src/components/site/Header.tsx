"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Menu, X } from "lucide-react";

const nav = [
  { href: "/", label: "Home" },
  { href: "/projects", label: "Projects" },
  { href: "/experience", label: "Experience" },
  { href: "/blog", label: "Blog" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

export function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  return (
    <header className="sticky top-0 z-40 w-full glass">
      <div className="mx-auto max-w-6xl px-5 py-3.5 flex items-center justify-between">

        {/* Logo */}
        <Link href="/" className="font-semibold text-white text-sm tracking-tight">
          Prabhakar Elavala<span className="text-violet-400">.</span>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-1">
          {nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`relative px-3 py-1.5 text-sm rounded-md transition-colors ${
                isActive(item.href)
                  ? "text-white font-medium"
                  : "text-slate-400 hover:text-white"
              }`}
            >
              {item.label}
              {isActive(item.href) && (
                <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-4 h-0.5 rounded-full bg-violet-400" />
              )}
            </Link>
          ))}
          <a
            href="/Prabhakar_Resume.pdf"
            download
            className="ml-3 rounded-md border border-violet-500/40 bg-violet-500/10 px-3 py-1.5 text-xs font-semibold text-violet-300 hover:bg-violet-500/20 hover:text-violet-200 transition-colors"
          >
            Resume
          </a>
        </nav>

        {/* Mobile toggle */}
        <button
          onClick={() => setOpen(!open)}
          className="md:hidden p-2 rounded-md text-slate-400 hover:text-white transition-colors"
          aria-label="Toggle menu"
        >
          {open ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {/* Mobile drawer */}
      {open && (
        <div className="fixed inset-0 z-50 md:hidden">
          <div className="fixed inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setOpen(false)} />
          <div className="fixed inset-x-0 top-0 bg-[oklch(0.10_0.02_265)] border-b border-white/[0.08] shadow-2xl">
            <div className="flex items-center justify-between px-5 py-3.5 border-b border-white/[0.06]">
              <Link href="/" className="font-semibold text-white text-sm" onClick={() => setOpen(false)}>
                Prabhakar Elavala<span className="text-violet-400">.</span>
              </Link>
              <button onClick={() => setOpen(false)} className="p-2 text-slate-400 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>
            <nav className="px-4 py-4 space-y-0.5">
              {nav.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className={`flex items-center gap-3 px-3 py-2.5 text-sm rounded-lg transition-colors ${
                    isActive(item.href)
                      ? "bg-violet-500/10 text-white font-medium border-l-2 border-violet-400"
                      : "text-slate-400 hover:text-white hover:bg-white/5"
                  }`}
                >
                  {item.label}
                </Link>
              ))}
              <div className="pt-3 px-3">
                <a
                  href="/Prabhakar_Resume.pdf"
                  download
                  className="block w-full text-center rounded-lg border border-violet-500/40 bg-violet-500/10 py-2 text-sm font-semibold text-violet-300 hover:bg-violet-500/20 transition-colors"
                >
                  Download Resume
                </a>
              </div>
            </nav>
          </div>
        </div>
      )}
    </header>
  );
}
