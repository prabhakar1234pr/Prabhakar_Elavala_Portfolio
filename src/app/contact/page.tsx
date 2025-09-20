"use client";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
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
    if (data.ok) toast.success("✅ Message sent successfully! I'll get back to you soon.");
    else toast.error(data.error || "❌ Failed to send message. Please try again.");
  }

  return (
    <div className="mx-auto max-w-4xl px-6 py-12">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
          Get In Touch
        </h1>
        <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
          Have a project in mind? Want to collaborate? Or just want to say hi? 
          I&apos;d love to hear from you! Drop me a message below or reach out directly.
        </p>
      </div>

      <div className="grid gap-8 md:grid-cols-2">
        {/* Contact Information */}
        <Card className="bg-white/5 backdrop-blur-sm border border-white/10">
          <CardHeader>
            <CardTitle className="text-2xl font-semibold text-purple-300">
              📞 Contact Information
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-4">
              <div className="flex items-center gap-4 p-4 bg-gradient-to-r from-purple-500/10 to-blue-500/10 rounded-lg border border-purple-300/20">
                <span className="text-2xl">📱</span>
                <div>
                  <p className="font-medium text-purple-200">Phone</p>
                  <Link 
                    href="tel:+18573980726" 
                    className="text-blue-400 hover:text-blue-300 transition-colors"
                  >
                    +1 (857) 398-0726
                  </Link>
                </div>
              </div>

              <div className="flex items-center gap-4 p-4 bg-gradient-to-r from-purple-500/10 to-blue-500/10 rounded-lg border border-purple-300/20">
                <span className="text-2xl">📧</span>
                <div>
                  <p className="font-medium text-purple-200">Email</p>
                  <Link 
                    href="mailto:prabhakarpr554@gmail.com" 
                    className="text-blue-400 hover:text-blue-300 transition-colors"
                  >
                    prabhakarpr554@gmail.com
                  </Link>
                </div>
              </div>

              <div className="flex items-center gap-4 p-4 bg-gradient-to-r from-purple-500/10 to-blue-500/10 rounded-lg border border-purple-300/20">
                <span className="text-2xl">💼</span>
                <div>
                  <p className="font-medium text-purple-200">LinkedIn</p>
                  <Link 
                    href="https://www.linkedin.com/in/prabhakarelavala" 
                    target="_blank"
                    className="text-blue-400 hover:text-blue-300 transition-colors"
                  >
                    linkedin.com/in/prabhakarelavala
                  </Link>
                </div>
              </div>

              <div className="flex items-center gap-4 p-4 bg-gradient-to-r from-purple-500/10 to-blue-500/10 rounded-lg border border-purple-300/20">
                <span className="text-2xl">🐙</span>
                <div>
                  <p className="font-medium text-purple-200">GitHub</p>
                  <Link 
                    href="https://github.com/prabhakar1234pr" 
                    target="_blank"
                    className="text-blue-400 hover:text-blue-300 transition-colors"
                  >
                    github.com/prabhakar1234pr
                  </Link>
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-white/10">
              <p className="text-sm text-muted-foreground text-center">
                🕒 <strong>Response Time:</strong> Usually within 24 hours
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Contact Form */}
        <Card className="bg-white/5 backdrop-blur-sm border border-white/10">
          <CardHeader>
            <CardTitle className="text-2xl font-semibold text-purple-300">
              💬 Send a Message
            </CardTitle>
          </CardHeader>
          <CardContent>
            <form
              className="space-y-6"
              action={async (fd) => onSubmit(fd)}
            >
              <div className="space-y-2">
                <Label htmlFor="name" className="text-purple-200 font-medium">
                  Name *
                </Label>
                <Input 
                  id="name" 
                  name="name" 
                  required 
                  placeholder="Your full name"
                  className="bg-white/5 border-white/20 focus:border-purple-400 text-white placeholder:text-gray-400"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="email" className="text-purple-200 font-medium">
                  Email *
                </Label>
                <Input 
                  id="email" 
                  name="email" 
                  type="email" 
                  required 
                  placeholder="your.email@example.com"
                  className="bg-white/5 border-white/20 focus:border-purple-400 text-white placeholder:text-gray-400"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="message" className="text-purple-200 font-medium">
                  Message *
                </Label>
                <Textarea 
                  id="message" 
                  name="message" 
                  required 
                  rows={6} 
                  placeholder="Tell me about your project, collaboration idea, or just say hello! I'd love to hear from you."
                  className="bg-white/5 border-white/20 focus:border-purple-400 text-white placeholder:text-gray-400 resize-none"
                />
              </div>

              <Button 
                disabled={loading} 
                type="submit"
                className="w-full bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600 text-white font-medium py-3 transition-all duration-200 disabled:opacity-50"
              >
                {loading ? (
                  <span className="flex items-center gap-2">
                    <span className="animate-spin w-4 h-4 border-2 border-white border-t-transparent rounded-full"></span>
                    Sending...
                  </span>
                ) : (
                  <span className="flex items-center gap-2">
                    📨 Send Message
                  </span>
                )}
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>

      {/* Additional Info */}
      <div className="mt-12 text-center">
        <div className="bg-gradient-to-r from-purple-500/10 to-blue-500/10 border border-purple-300/20 rounded-2xl p-8 max-w-2xl mx-auto">
          <h3 className="text-xl font-semibold mb-3 text-purple-200">
            🚀 Ready to collaborate?
          </h3>
          <p className="text-muted-foreground mb-4">
            I&apos;m currently pursuing my MS in Informatics (Data Analytics) at Northeastern University 
            and actively looking for exciting opportunities in AI/ML and full-stack development.
          </p>
          <p className="text-sm text-purple-300">
            💡 Open to: Full-time roles, internships, freelance projects, and collaboration opportunities
          </p>
        </div>
      </div>
    </div>
  );
}


