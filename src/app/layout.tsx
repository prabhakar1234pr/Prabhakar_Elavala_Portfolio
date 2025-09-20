import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";
import { ClientProviders } from "@/app/providers/ClientProviders";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "Prabhakar Elavala — AI/ML Engineer",
    template: "%s | Prabhakar Elavala",
  },
  description: "AI/ML Engineer • LLMs • MLOps • Data Pipelines",
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"),
  openGraph: {
    title: "Prabhakar Elavala — AI/ML Engineer",
    description: "AI/ML Engineer • LLMs • MLOps • Data Pipelines",
    type: "website",
    url: process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000",
    images: [{ url: "/og.png", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Prabhakar Elavala — AI/ML Engineer",
    description: "AI/ML Engineer • LLMs • MLOps • Data Pipelines",
    images: ["/og.png"],
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <ClientProviders>
          <Header />
          <main className="min-h-[calc(100dvh-120px)]">{children}</main>
          <Footer />
        </ClientProviders>
      </body>
    </html>
  );
}
