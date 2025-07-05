import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";

export async function POST(req: NextRequest) {
  const { sendTo, message, subject, htmlContent } = await req.json();

  if (!sendTo || !message) {
    return NextResponse.json(
      { error: "Missing required fields" },
      { status: 400 }
    );
  }

  // Handle both single email string and array of emails
  const emailRecipients = Array.isArray(sendTo) ? sendTo : [sendTo];

  // Validate email format for all recipients
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const invalidEmails = emailRecipients.filter(
    (email) => !emailRegex.test(email)
  );

  if (invalidEmails.length > 0) {
    return NextResponse.json(
      { error: `Invalid email format: ${invalidEmails.join(", ")}` },
      { status: 400 }
    );
  }

  try {
    // Use provided subject or default
    const emailSubject = subject || "Aidea - Important Update";

    // Use provided HTML content or create default template
    const emailHtml =
      htmlContent ||
      `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>${emailSubject}</title>
        <style>
          body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
          .container { max-width: 600px; margin: 0 auto; padding: 20px; }
          .header { background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 30px; text-align: center; border-radius: 10px 10px 0 0; }
          .content { background: #f9f9f9; padding: 30px; border-radius: 0 0 10px 10px; }
          .message { background: white; padding: 20px; border-radius: 8px; margin: 20px 0; box-shadow: 0 2px 4px rgba(0,0,0,0.1); }
          .footer { text-align: center; margin-top: 30px; color: #666; font-size: 14px; }
          .logo { font-size: 24px; font-weight: bold; margin-bottom: 10px; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <div class="logo">Aidea</div>
            <p>Your AI-Powered Healthcare Assistant</p>
          </div>
          <div class="content">
            <div class="message">
              ${message}
            </div>
            <div class="footer">
              <p>Thank you for using Aidea!</p>
              <p>If you have any questions, please don't hesitate to contact our support team.</p>
            </div>
          </div>
        </div>
      </body>
      </html>
    `;

    const messageBody = {
      from: `Aidea Team <${process.env.EMAIL_FROM}>`,
      to: emailRecipients.join(", "),
      subject: emailSubject,
      html: emailHtml,
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
