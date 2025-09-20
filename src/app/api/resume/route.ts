import { NextResponse } from "next/server";

export async function GET() {
  const url = new URL("/Prabhakar_Resume.pdf", process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000");
  return NextResponse.redirect(url.toString());
}


