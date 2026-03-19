"use client";
import { usePathname } from "next/navigation";
import { Footer } from "./Footer";

// Pages that manage their own footer (e.g. scroll-jacked pages)
const HIDDEN_ON = ["/projects"];

export function ConditionalFooter() {
  const pathname = usePathname();
  if (HIDDEN_ON.includes(pathname)) return null;
  return <Footer />;
}
