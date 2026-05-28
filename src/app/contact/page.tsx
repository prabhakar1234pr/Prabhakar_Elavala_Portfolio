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
        <p className="mb-2 text-xs font-semibold uppercase tracking-widest text-white/60">
          Contact
        </p>
        <h1 className="text-4xl font-extrabold text-white mb-3">Get In Touch</h1>
        <p className="max-w-xl text-white/66">
          I love building things that work and working with teams that care.
          Whether you have an opportunity, a project, or just want to connect —
          my inbox is open.
        </p>
      </div>

      <div className="grid gap-8 md:grid-cols-2">

        {/* Contact info */}
        <div className="space-y-4">
          <p className="mb-5 text-xs font-semibold uppercase tracking-widest text-white/50">
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
              className="glass-panel flex flex-col gap-0.5 rounded-xl px-5 py-4"
            >
              <span className="text-[10px] font-semibold uppercase tracking-wider text-white/50">
                {item.label}
              </span>
              <Link
                href={item.href}
                target={item.href.startsWith("http") ? "_blank" : undefined}
                rel="noopener noreferrer"
                className="text-sm text-white/80 transition-colors hover:text-white"
              >
                {item.value}
              </Link>
            </div>
          ))}

          <p className="pt-2 text-xs text-white/50">
            Typically responds within 24 hours.
          </p>
        </div>

        {/* Form */}
        <div className="glass-panel rounded-xl p-6">
          <p className="text-sm font-semibold text-white mb-5">Send a Message</p>

          <form
            className="space-y-4"
            action={async (fd) => onSubmit(fd)}
          >
            <div className="space-y-1.5">
              <Label htmlFor="name" className="text-xs font-medium uppercase tracking-wider text-white/60">
                Name
              </Label>
              <Input
                id="name" name="name" required placeholder="Your name"
                className="h-10 border-white/15 bg-black/20 text-white placeholder:text-white/35 focus:border-white/45"
              />
            </div>

            <div className="space-y-1.5">
              <Label htmlFor="email" className="text-xs font-medium uppercase tracking-wider text-white/60">
                Email
              </Label>
              <Input
                id="email" name="email" type="email" required placeholder="your@email.com"
                className="h-10 border-white/15 bg-black/20 text-white placeholder:text-white/35 focus:border-white/45"
              />
            </div>

            <div className="space-y-1.5">
              <Label htmlFor="message" className="text-xs font-medium uppercase tracking-wider text-white/60">
                Message
              </Label>
              <Textarea
                id="message" name="message" required rows={5}
                placeholder="Tell me about your project or opportunity..."
                className="resize-none border-white/15 bg-black/20 text-white placeholder:text-white/35 focus:border-white/45"
              />
            </div>

            <Button
              disabled={loading}
              type="submit"
              className="h-10 w-full border border-white/20 bg-white text-black shadow-lg shadow-black/30 hover:bg-white/85"
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
