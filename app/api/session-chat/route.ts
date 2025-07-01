import { db } from "@/config/db";
import { SessionChat } from "@/config/schema";
import { getCurrentUser } from "@/lib/actions/users";
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

    const result = await db
      .insert(SessionChat)
      .values({
        sessionChatId: sessionId,
        createdBy: user.email,
        notes: notes,
        selectedDoctor: selectedDoctor,
        createdAt: new Date(),
      })
      .returning();

    if (result) {
      return NextResponse.json(result[0], { status: 200 });
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
