import { db } from "@/config/db";
import { SessionChat, Users } from "@/config/schema";
import { sendEmail } from "@/lib/actions/notification";
import { getCurrentUser } from "@/lib/actions/users";
import { eq, sql } from "drizzle-orm";
import { NextRequest, NextResponse } from "next/server";
import { v4 as uuidv4 } from "uuid";

export async function POST(req: NextRequest) {
  const { notes, selectedDoctor } = await req.json();

  if (!notes || typeof notes !== "string" || !selectedDoctor) {
    return NextResponse.json(
      { error: "Notes and doctor are required" },
      { status: 400 }
    );
  }

  try {
    const sessionId = uuidv4();
    const user: UserType = await getCurrentUser();

    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const batchResponse = await db.batch([
      db
        .insert(SessionChat)
        .values({
          sessionChatId: sessionId,
          createdBy: user.email,
          notes: notes,
          selectedDoctor: selectedDoctor,
          createdAt: new Date(),
        })
        .returning(),
      db
        .update(Users)
        .set({
          credits: sql`${Users.credits} - 1`,
        })
        .where(eq(Users.clerkId, user.clerkId)),
    ]);

    if (batchResponse && batchResponse.length === 2) {
      const insertResult = batchResponse[0];
      const updateResult = batchResponse[1];

      if (insertResult && updateResult) {
        // generate nodemailer email notification - created a server function since calling a route from another route is not possible
        await sendEmail(
          user.email,
          `
            <h2>🎉 Great news! Your consultation session has been created.</h2>
            <p><strong>Doctor:</strong> ${selectedDoctor?.name}</p>
            <p><strong>Session ID:</strong> <code style="background: #f0f0f0; padding: 4px 8px; border-radius: 4px;">${sessionId}</code></p>
            <p><strong>Created:</strong> ${new Date().toLocaleString()}</p>
            <br>
            <p>You can now access your consultation session and start your AI-powered healthcare experience.</p>
            <p>Your session is ready and waiting for you!</p>
          `,
          "Consultation Session Created Successfully!"
        );

        // if both session creation and update user credits are successful
        return NextResponse.json(insertResult[0], { status: 200 });
      } else {
        return NextResponse.json(
          { error: "Failed to create session or update credits" },
          { status: 500 }
        );
      }
    }

    return NextResponse.json(
      { error: "Failed to save chat session." },
      { status: 500 }
    );
  } catch (error) {
    console.error("Session Chat API Error:", error);
    return NextResponse.json(
      {
        error: "Failed to process request",
        details: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}
