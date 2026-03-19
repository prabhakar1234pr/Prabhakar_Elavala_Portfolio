"use client";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import Link from "next/link";

export default function ContactPage() {
  const [loading, setLoading] = useState(false);

  async function onSubmit(formData: FormData) {
    setLoading(true);
    const res = await fetch("/api/contact", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: formData.get("name"),
        email: formData.get("email"),
        message: formData.get("message"),
      }),
    });
    const data = await res.json();
    setLoading(false);
    if (data.ok) toast.success("Message sent! I'll get back to you soon.");
    else toast.error(data.error || "Failed to send. Please try again.");
  }

  return (
    <div className="mx-auto max-w-4xl px-6 py-14">

      {/* Header */}
      <div className="mb-12">
        <p className="mb-2 text-xs font-semibold uppercase tracking-widest text-violet-400">
          Contact
        </p>
        <h1 className="text-4xl font-extrabold text-white mb-3">Get In Touch</h1>
        <p className="text-slate-400 max-w-xl">
          I love building things that work and working with teams that care.
          Whether you have an opportunity, a project, or just want to connect —
          my inbox is open.
        </p>
      </div>

      <div className="grid gap-8 md:grid-cols-2">

        {/* Contact info */}
        <div className="space-y-4">
          <p className="text-xs font-semibold uppercase tracking-widest text-slate-500 mb-5">
            Reach Out Directly
          </p>

          {[
            { label: "Email", value: "prabhakarpr554@gmail.com", href: "mailto:prabhakarpr554@gmail.com" },
            { label: "Phone", value: "+1 (857) 398-0726", href: "tel:+18573980726" },
            { label: "LinkedIn", value: "linkedin.com/in/prabhakarelavala", href: "https://www.linkedin.com/in/prabhakarelavala" },
            { label: "GitHub", value: "github.com/prabhakar1234pr", href: "https://github.com/prabhakar1234pr" },
          ].map((item) => (
            <div
              key={item.label}
              className="flex flex-col gap-0.5 rounded-xl border border-white/[0.08] bg-white/[0.03] px-5 py-4"
            >
              <span className="text-[10px] uppercase tracking-wider font-semibold text-slate-500">
                {item.label}
              </span>
              <Link
                href={item.href}
                target={item.href.startsWith("http") ? "_blank" : undefined}
                rel="noopener noreferrer"
                className="text-sm text-violet-300 hover:text-violet-200 transition-colors"
              >
                {item.value}
              </Link>
            </div>
          ))}

          <p className="text-xs text-slate-500 pt-2">
            Typically responds within 24 hours.
          </p>
        </div>

        {/* Form */}
        <div className="rounded-xl border border-white/[0.08] bg-white/[0.03] p-6">
          <p className="text-sm font-semibold text-white mb-5">Send a Message</p>

          <form
            className="space-y-4"
            action={async (fd) => onSubmit(fd)}
          >
            <div className="space-y-1.5">
              <Label htmlFor="name" className="text-xs font-medium text-slate-400 uppercase tracking-wider">
                Name
              </Label>
              <Input
                id="name" name="name" required placeholder="Your name"
                className="bg-white/[0.04] border-white/[0.08] focus:border-violet-500/50 text-white placeholder:text-slate-600 h-10"
              />
            </div>

            <div className="space-y-1.5">
              <Label htmlFor="email" className="text-xs font-medium text-slate-400 uppercase tracking-wider">
                Email
              </Label>
              <Input
                id="email" name="email" type="email" required placeholder="your@email.com"
                className="bg-white/[0.04] border-white/[0.08] focus:border-violet-500/50 text-white placeholder:text-slate-600 h-10"
              />
            </div>

            <div className="space-y-1.5">
              <Label htmlFor="message" className="text-xs font-medium text-slate-400 uppercase tracking-wider">
                Message
              </Label>
              <Textarea
                id="message" name="message" required rows={5}
                placeholder="Tell me about your project or opportunity..."
                className="bg-white/[0.04] border-white/[0.08] focus:border-violet-500/50 text-white placeholder:text-slate-600 resize-none"
              />
            </div>

            <Button
              disabled={loading}
              type="submit"
              className="w-full bg-violet-600 hover:bg-violet-700 text-white border-0 shadow-lg shadow-violet-900/40 h-10"
            >
              {loading ? (
                <span className="flex items-center gap-2">
                  <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  Sending...
                </span>
              ) : "Send Message"}
            </Button>
          </form>
        </div>

      </div>
    </div>
  );
}
