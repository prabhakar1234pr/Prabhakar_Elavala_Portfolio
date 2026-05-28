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
      <div className="mx-auto flex max-w-6xl items-center justify-between px-5 py-3.5">

        {/* Logo */}
        <Link href="/" className="text-sm font-semibold tracking-tight text-white/95 transition-opacity hover:opacity-90">
          Prabhakar Elavala<span className="text-white/70">.</span>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden items-center gap-1 md:flex">
          {nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`relative rounded-md px-3 py-1.5 text-sm transition-all duration-300 ${
                isActive(item.href)
                  ? "glass-panel text-white"
                  : "text-white/60 hover:text-white"
              }`}
            >
              {item.label}
              {isActive(item.href) && (
                <span className="absolute -bottom-1 left-1/2 h-0.5 w-4 -translate-x-1/2 rounded-full bg-white/70" />
              )}
            </Link>
          ))}
          <Link
            href="/resume"
            className="ml-3 rounded-md border border-white/25 bg-white/10 px-3 py-1.5 text-xs font-semibold text-white/85 transition-all hover:bg-white/20 hover:text-white"
          >
            Resume
          </Link>
        </nav>

        {/* Mobile toggle */}
        <button
          onClick={() => setOpen(!open)}
          className="rounded-md p-2 text-white/70 transition-colors hover:text-white md:hidden"
          aria-label="Toggle menu"
        >
          {open ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {/* Mobile drawer */}
      {open && (
        <div className="fixed inset-0 z-50 md:hidden">
          <div className="fixed inset-0 bg-black/65 backdrop-blur-md" onClick={() => setOpen(false)} />
          <div className="fixed inset-x-0 top-0 border-b border-white/15 bg-black/80 shadow-2xl backdrop-blur-2xl">
            <div className="flex items-center justify-between border-b border-white/10 px-5 py-3.5">
              <Link href="/" className="font-semibold text-white text-sm" onClick={() => setOpen(false)}>
                Prabhakar Elavala<span className="text-white/70">.</span>
              </Link>
              <button onClick={() => setOpen(false)} className="p-2 text-white/70 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>
            <nav className="px-4 py-4 space-y-0.5">
              {nav.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className={`flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm transition-colors ${
                    isActive(item.href)
                      ? "bg-white/12 text-white font-medium"
                      : "text-white/65 hover:bg-white/6 hover:text-white"
                  }`}
                >
                  {item.label}
                </Link>
              ))}
              <div className="pt-3 px-3">
                <Link
                  href="/resume"
                  className="block w-full rounded-lg border border-white/20 bg-white/8 py-2 text-center text-sm font-semibold text-white/85 transition-colors hover:bg-white/16"
                >
                  Download Resume
                </Link>
              </div>
            </nav>
          </div>
        </div>
      )}
    </header>
  );
}
