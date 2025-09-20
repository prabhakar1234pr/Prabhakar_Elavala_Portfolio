import { NextResponse } from "next/server";
import { Resend } from "resend";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { name, email, message } = body as {
      name?: string;
      email?: string;
      message?: string;
    };

    if (!name || !email || !message) {
      return NextResponse.json({ ok: false, error: "Missing fields" }, { status: 400 });
    }

    const apiKey = process.env.RESEND_API_KEY;
    if (apiKey) {
      const resend = new Resend(apiKey);
      await resend.emails.send({
        from: "Portfolio <onboarding@resend.dev>",
        to: ["test@example.com"],
        subject: `New contact from ${name}`,
        html: `<p><b>Name:</b> ${name}</p><p><b>Email:</b> ${email}</p><p>${message}</p>`,
      });
      return NextResponse.json({ ok: true });
    }

    // Mock fallback for dev
    console.log("[mock-email]", { name, email, message });
    return NextResponse.json({ ok: true, mock: true });
  } catch (err) {
    console.error("/api/contact error", err);
    return NextResponse.json({ ok: false, error: "Internal error" }, { status: 500 });
  }
}


