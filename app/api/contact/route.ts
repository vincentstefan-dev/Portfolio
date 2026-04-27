import { Resend } from "resend";
import { NextResponse } from "next/server";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const { name, email, message, type } = body;

    // Basic validation
    if (!email || !message) {
      return NextResponse.json(
        { error: "Email and message are required." },
        { status: 400 }
      );
    }

    // Ensure CONTACT_EMAIL exists
    if (!process.env.CONTACT_EMAIL) {
      console.error("Missing CONTACT_EMAIL env variable");
      return NextResponse.json(
        { error: "Server misconfiguration" },
        { status: 500 }
      );
    }

    const data = await resend.emails.send({
      from: "Koyote Contact <onboarding@resend.dev>", // update after domain verification
      to: process.env.CONTACT_EMAIL,
      subject: `New ${type || "contact"} inquiry`,
      replyTo: email,

      text: `
Name: ${name || "Not provided"}
Email: ${email}
Type: ${type || "General"}

Message:
${message}
      `,
    });

    return NextResponse.json({ success: true, data });

  } catch (error) {
    console.error("EMAIL ERROR:", error);

    return NextResponse.json(
      { error: "Failed to send email" },
      { status: 500 }
    );
  }
}