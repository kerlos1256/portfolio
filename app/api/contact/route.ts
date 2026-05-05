import { Resend } from "resend";
import { NextResponse } from "next/server";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: Request) {
  const { name, email, message } = await request.json();

  if (!name || !email || !message) {
    return NextResponse.json({ error: "All fields are required." }, { status: 400 });
  }

  const { error } = await resend.emails.send({
    from: "Portfolio Contact <onboarding@resend.dev>",
    to: process.env.CONTACT_EMAIL!,
    replyTo: email,
    subject: `New project inquiry from ${name}`,
    text: `Name: ${name}\nEmail: ${email}\n\n${message}`,
    html: `
      <div style="font-family:sans-serif;max-width:560px;margin:0 auto;color:#2A2A25;">
        <h2 style="font-size:18px;margin-bottom:4px;">New project inquiry</h2>
        <p style="color:#888880;font-size:13px;margin-bottom:24px;">via kerlosg.com</p>
        <table style="width:100%;border-collapse:collapse;font-size:14px;margin-bottom:24px;">
          <tr><td style="padding:8px 0;color:#888880;width:80px;">Name</td><td style="padding:8px 0;">${name}</td></tr>
          <tr><td style="padding:8px 0;color:#888880;">Email</td><td style="padding:8px 0;"><a href="mailto:${email}" style="color:#6B7C5C;">${email}</a></td></tr>
        </table>
        <div style="background:#F0EDE6;border-radius:8px;padding:20px;font-size:14px;line-height:1.7;white-space:pre-wrap;">${message}</div>
      </div>
    `,
  });

  if (error) {
    return NextResponse.json({ error: "Failed to send email. Please try again." }, { status: 500 });
  }

  return NextResponse.json({ success: true });
}
