import nodemailer from "nodemailer";
import { NextResponse } from "next/server";

// Ensure this route runs in the Node runtime (nodemailer requires Node)
export const runtime = "nodejs";

// --------------------
// Types
// --------------------
interface ContactRequestBody {
  name: string;
  email: string;
  contactnumber: string;
  company?: string;
  interest: string;
  message: string;
}

// --------------------
// Helpers
// --------------------
const validateEmail = (email: string): boolean => {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(email);
};

// --------------------
// Handler
// --------------------
export async function POST(request: Request) {
  try {
    let body: ContactRequestBody;

    try {
      body = (await request.json()) as ContactRequestBody;
    } catch (parseErr) {
      console.error("Invalid JSON body:", parseErr);
      return NextResponse.json(
        { error: "Invalid JSON body" },
        { status: 400 }
      );
    }

    const { name, email, contactnumber, company, interest, message } = body;

    // Validate required fields
    if (!name || !contactnumber || !interest || !message) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    // Validate email format
    if (!email || !validateEmail(email)) {
      return NextResponse.json(
        { error: "Invalid email format" },
        { status: 400 }
      );
    }

    // Environment variables
    const EMAIL_USER = process.env.EMAIL_USER;
    const EMAIL_PASSWORD = process.env.EMAIL_PASSWORD;
    const ADMIN_EMAIL = process.env.ADMIN_EMAIL;

    if (!EMAIL_USER || !EMAIL_PASSWORD || !ADMIN_EMAIL) {
      console.error("Email not configured", {
        EMAIL_USER: Boolean(EMAIL_USER),
        ADMIN_EMAIL: Boolean(ADMIN_EMAIL),
      });

      return NextResponse.json(
        { error: "Email service not configured" },
        { status: 500 }
      );
    }

    // Transporter
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: EMAIL_USER,
        pass: EMAIL_PASSWORD,
      },
    });

    // Email to admin
    await transporter.sendMail({
      from: EMAIL_USER,
      to: ADMIN_EMAIL,
      subject: `New Contact Form Submission from ${name}`,
      replyTo: email,
      html: `
        <h2>New Contact Form Submission</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Contact Number:</strong> ${contactnumber}</p>
        <p><strong>Company:</strong> ${company ?? "-"}</p>
        <p><strong>Interest:</strong> ${interest}</p>
        <h3>Message:</h3>
        <p>${message.replace(/\n/g, "<br>")}</p>
      `,
    });

    // Auto-reply (non-blocking)
    try {
      await transporter.sendMail({
        from: EMAIL_USER,
        to: email,
        subject: "We Received Your Message - Bigtop Social",
        html: `
          <h2>Thank You for Reaching Out!</h2>
          <p>Hi ${name},</p>
          <p>We've received your message and we're excited to work with you!</p>
          <p>Our team will get back to you within 24 hours.</p>
          <hr />
          <p><strong>Your Submission:</strong></p>
          <p><strong>Service:</strong> ${interest}</p>
          <p><strong>Message:</strong></p>
          <p>${message.replace(/\n/g, "<br>")}</p>
          <hr />
          <p>Best regards,<br />BigTopSocial Team</p>
        `,
      });
    } catch (replyErr: unknown) {
      console.warn("Auto-reply failed:", replyErr);
    }

    return NextResponse.json(
      { message: "Email sent successfully" },
      { status: 200 }
    );
  } catch (error: unknown) {
    console.error("Error sending email:", error);

    const payload: { error: string; details?: string } = {
      error: "Failed to send email",
    };

    if (process.env.NODE_ENV !== "production" && error instanceof Error) {
      payload.details = error.message;
    }

    return NextResponse.json(payload, { status: 500 });
  }
}
