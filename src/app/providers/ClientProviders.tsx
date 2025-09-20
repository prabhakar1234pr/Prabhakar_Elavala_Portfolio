"use client";
import { PostHogProvider } from "posthog-js/react";
import posthog from "posthog-js";
import { useEffect } from "react";
import { ChatWidget } from "@/components/assistant/ChatWidget";
import { ThemeProvider } from "next-themes";
import { Toaster } from "@/components/ui/sonner";
import { Analytics } from "@vercel/analytics/react";

export function ClientProviders({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    if (process.env.NEXT_PUBLIC_POSTHOG_KEY) {
      posthog.init(process.env.NEXT_PUBLIC_POSTHOG_KEY, {
        api_host: process.env.NEXT_PUBLIC_POSTHOG_HOST || "https://us.i.posthog.com",
        capture_pageview: true,
      });
    }
  }, []);

  const hasPosthog = Boolean(process.env.NEXT_PUBLIC_POSTHOG_KEY);

  const content = (
    <ThemeProvider attribute="class" defaultTheme="dark" enableSystem={false} forcedTheme="dark">
      {children}
      <ChatWidget />
      <Toaster richColors position="top-right" />
      {process.env.NEXT_PUBLIC_VERCEL_ANALYTICS === "1" ? <Analytics /> : null}
    </ThemeProvider>
  );

  if (!hasPosthog) return content;

  return <PostHogProvider client={posthog}>{content}</PostHogProvider>;
}


