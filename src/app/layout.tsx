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
    default: "Prabhakar Elavala - Portfolio | AI/ML Engineer",
    template: "%s | Prabhakar Elavala Portfolio",
  },
  description: "Prabhakar Elavala's portfolio showcasing AI/ML engineering projects, data science work, and full-stack development. MS Informatics at Northeastern University, Azure AI Certified, building scalable systems with Python, Next.js, and cloud technologies.",
  keywords: [
    "Prabhakar Elavala",
    "Prabhakar Elavala portfolio", 
    "AI/ML Engineer",
    "Data Science",
    "Machine Learning",
    "Northeastern University",
    "Azure AI Engineer",
    "Python developer",
    "Next.js developer",
    "Portfolio",
    "GitGuide",
    "LangChain",
    "MLOps"
  ],
  authors: [{ name: "Prabhakar Elavala" }],
  creator: "Prabhakar Elavala",
  metadataBase: new URL("https://prabhakar-elavala-portfolio.vercel.app"),
  alternates: {
    canonical: "https://prabhakar-elavala-portfolio.vercel.app",
  },
  openGraph: {
    title: "Prabhakar Elavala - Portfolio | AI/ML Engineer",
    description: "Prabhakar Elavala's portfolio showcasing AI/ML engineering projects, data science work, and full-stack development. MS Informatics at Northeastern University.",
    type: "website",
    siteName: "Prabhakar Elavala Portfolio",
    url: "https://prabhakar-elavala-portfolio.vercel.app",
    images: [{ 
      url: "/og.png", 
      width: 1200, 
      height: 630,
      alt: "Prabhakar Elavala - AI/ML Engineer Portfolio"
    }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Prabhakar Elavala - Portfolio | AI/ML Engineer", 
    description: "AI/ML Engineer portfolio featuring data science projects, machine learning systems, and full-stack development work.",
    images: ["/og.png"],
    creator: "@prabhakarelavala",
  },
  robots: { 
    index: true, 
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    google: "your-google-verification-code", // You'll get this from Google Search Console
  },
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
