import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";

export async function POST(req: NextRequest) {
  const { sendTo, message } = await req.json();

  if (!sendTo || !message) {
    return NextResponse.json(
      { error: "Missing required fields" },
      { status: 400 }
    );
  }

  try {
    const messageBody = {
      from: `Aidea Team - ${process.env.EMAIL_FROM}`,
      to: sendTo,
      subject: "Using NodeMailer With Next.js API",
      html: `
        <h1>Hello, this is a test email</h1>
        <p>${message}</p>
        `,
      headers: {
        "X-Entity-Ref-ID": "newmail",
      },
    };

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_FROM,
        pass: process.env.EMAIL_PASSWORD,
      },
      tls: {
        rejectUnauthorized: false,
      },
    });

    console.log(JSON.stringify(messageBody, null, 2));

    try {
      await transporter.sendMail(messageBody);
      return NextResponse.json(
        { message: "Email sent successfully" },
        { status: 200 }
      );
    } catch (error) {
      console.error("Send Email API Error:", error);
      return NextResponse.json(
        {
          error: "Failed to send email",
          details: error instanceof Error ? error.message : "Unknown error",
        },
        {
          status: 500,
        }
      );
    }
  } catch (error) {
    console.error("Send Email API Internal Error:", error);
    return NextResponse.json(
      {
        error: "Failed to process request",
        details: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}
