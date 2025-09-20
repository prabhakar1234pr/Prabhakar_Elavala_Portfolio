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
      
      // Send notification email to you
      await resend.emails.send({
        from: "Portfolio Contact <onboarding@resend.dev>",
        to: ["prabhakarpr554@gmail.com"],
        subject: `Portfolio Contact: Message from ${name}`,
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
            <h2 style="color: #333; border-bottom: 2px solid #7c3aed; padding-bottom: 10px;">
              New Contact Form Submission
            </h2>
            <div style="background: #f8f9fa; padding: 20px; border-radius: 8px; margin: 20px 0;">
              <p style="margin: 10px 0;"><strong>Name:</strong> ${name}</p>
              <p style="margin: 10px 0;"><strong>Email:</strong> ${email}</p>
              <p style="margin: 10px 0;"><strong>Message:</strong></p>
              <div style="background: white; padding: 15px; border-radius: 5px; border-left: 4px solid #7c3aed;">
                ${message.replace(/\n/g, '<br>')}
              </div>
            </div>
            <p style="color: #666; font-size: 12px; margin-top: 20px;">
              This message was sent from your portfolio contact form.
            </p>
          </div>
        `,
        replyTo: email,
      });

      // Send confirmation email to the sender
      await resend.emails.send({
        from: "Prabhakar Elavala <onboarding@resend.dev>",
        to: [email],
        subject: "✅ Message Received - Thank you for reaching out!",
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 2px; border-radius: 12px;">
            <div style="background: white; border-radius: 10px; padding: 30px;">
              <div style="text-align: center; margin-bottom: 30px;">
                <h1 style="color: #333; margin: 0; font-size: 28px;">
                  🎉 Message Received!
                </h1>
                <p style="color: #7c3aed; font-size: 18px; font-weight: 600; margin: 10px 0;">
                  Thank you for reaching out, ${name}!
                </p>
              </div>

              <div style="background: #f8f9fa; padding: 25px; border-radius: 8px; margin: 20px 0; border-left: 4px solid #7c3aed;">
                <p style="margin: 0 0 15px 0; color: #333; font-size: 16px; line-height: 1.6;">
                  Hi <strong>${name}</strong>,
                </p>
                <p style="margin: 0 0 15px 0; color: #333; font-size: 16px; line-height: 1.6;">
                  I've successfully received your message and wanted to personally thank you for taking the time to reach out through my portfolio.
                </p>
                <p style="margin: 0 0 15px 0; color: #333; font-size: 16px; line-height: 1.6;">
                  <strong>⏱️ Response Time:</strong> I typically respond within 24 hours, but often much sooner! I'll get back to you with a thoughtful reply as soon as possible.
                </p>
                <p style="margin: 0; color: #333; font-size: 16px; line-height: 1.6;">
                  In the meantime, feel free to explore my projects and experience on the website!
                </p>
              </div>

              <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 20px; border-radius: 8px; margin: 25px 0;">
                <h3 style="color: white; margin: 0 0 15px 0; font-size: 18px;">
                  🔗 Quick Links:
                </h3>
                <div style="display: flex; flex-wrap: wrap; gap: 15px;">
                  <a href="https://prabhakar-elavala-portfolio.vercel.app/projects" style="color: white; text-decoration: none; background: rgba(255,255,255,0.2); padding: 8px 15px; border-radius: 20px; font-size: 14px; font-weight: 500;">
                    🚀 View Projects
                  </a>
                  <a href="https://prabhakar-elavala-portfolio.vercel.app/experience" style="color: white; text-decoration: none; background: rgba(255,255,255,0.2); padding: 8px 15px; border-radius: 20px; font-size: 14px; font-weight: 500;">
                    💼 My Experience
                  </a>
                  <a href="https://github.com/prabhakar1234pr" style="color: white; text-decoration: none; background: rgba(255,255,255,0.2); padding: 8px 15px; border-radius: 20px; font-size: 14px; font-weight: 500;">
                    🐙 GitHub Profile
                  </a>
                </div>
              </div>

              <div style="text-align: center; padding-top: 20px; border-top: 1px solid #eee; margin-top: 30px;">
                <p style="color: #666; font-size: 14px; margin: 0 0 10px 0;">
                  Best regards,<br>
                  <strong style="color: #7c3aed;">Prabhakar Elavala</strong><br>
                  AI/ML Engineer & MS Informatics Student
                </p>
                <p style="color: #999; font-size: 12px; margin: 0;">
                  📱 +1 (857) 398-0726 | 📧 prabhakarpr554@gmail.com
                </p>
              </div>
            </div>
          </div>
        `,
        replyTo: "prabhakarpr554@gmail.com",
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


