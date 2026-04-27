import { Resend } from "resend";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const resendApiKey = process.env.RESEND_API_KEY;
    const contactEmail = process.env.CONTACT_EMAIL;

    if (!resendApiKey) {
      console.error("Missing RESEND_API_KEY env variable");

      return NextResponse.json(
        { error: "Server misconfiguration: missing email API key" },
        { status: 500 }
      );
    }

    if (!contactEmail) {
      console.error("Missing CONTACT_EMAIL env variable");

      return NextResponse.json(
        { error: "Server misconfiguration: missing contact email" },
        { status: 500 }
      );
    }

    const body = await req.json();
    const { name, email, message, type } = body;

    if (!email || !message) {
      return NextResponse.json(
        { error: "Email and message are required." },
        { status: 400 }
      );
    }

    const resend = new Resend(resendApiKey);

    const data = await resend.emails.send({
      from: "Koyote Contact <onboarding@resend.dev>",
      to: contactEmail,
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