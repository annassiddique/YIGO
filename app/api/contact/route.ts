import { NextResponse } from "next/server";
import nodemailer from "nodemailer";
import { contactFormSchema } from "@/lib/utils/validation";
import { saveLeadToGoogleSheets } from "@/lib/utils/googleSheets";

export async function POST(request: Request) {
  try {
    const json = await request.json();
    const parseResult = contactFormSchema.safeParse(json);
    if (!parseResult.success) {
      return NextResponse.json(
        { error: "Invalid input", details: parseResult.error.flatten() },
        { status: 400 }
      );
    }

    const { name, company, email, phone, message } = parseResult.data;

    const host = process.env.SMTP_HOST;
    const port = process.env.SMTP_PORT ? Number(process.env.SMTP_PORT) : undefined;
    const user = process.env.SMTP_USER;
    const pass = process.env.SMTP_PASS;
    const secure = String(process.env.SMTP_SECURE || "false").toLowerCase() === "true";
    const from = process.env.EMAIL_FROM || user;
    const to = process.env.EMAIL_TO || user;

    if (!host || !port || !user || !pass || !from || !to) {
      return NextResponse.json(
        { error: "Email transport is not configured on the server" },
        { status: 500 }
      );
    }

    const transporter = nodemailer.createTransport({
      host,
      port,
      secure,
      auth: { user, pass },
    });

    const subject = `New contact form submission from ${name}`;
    const text = [
      `Name: ${name}`,
      `Company: ${company}`,
      `Email: ${email}`,
      `Phone: ${phone}`,
      "",
      "Message:",
      message,
    ].join("\n");

    await transporter.sendMail({
      from,
      to,
      subject,
      text,
      replyTo: email,
    });

    // Save lead to Google Sheets (non-blocking - don't fail request if this fails)
    try {
      await saveLeadToGoogleSheets({ name, company, email, phone, message });
    } catch (error) {
      // Log error but don't fail the request
      console.error("Failed to save lead to Google Sheets:", error);
    }

    return NextResponse.json({ ok: true });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : String(error);
    return NextResponse.json(
      { error: "Failed to send message. " + message },
      { status: 500 }
    );
  }
}


