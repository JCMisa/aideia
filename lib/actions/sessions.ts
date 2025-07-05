"use server";

import { db } from "@/config/db";
import { withErrorHandling } from "../utils";
import { SessionChat } from "@/config/schema";
import { eq } from "drizzle-orm";
import { getCurrentUser } from "./users";
import { revalidatePath } from "next/cache";

// --------------------------- Helper Functions ---------------------------
const revalidatePaths = (paths: string[]) => {
  paths.forEach((path) => revalidatePath(path));
};

// --------------------------- Server Actions ---------------------------
export const getAllSessions = withErrorHandling(async () => {
  // Authenticate user
  const user = await getCurrentUser();
  if (!user || !user.email) {
    throw new Error("Unauthorized");
  }

  // Query for getting all sessions
  const data = await db.select().from(SessionChat);

  if (!data || data.length === 0) {
    throw new Error("No Session Available");
  }

  return data;
});

export const getUserSessions = withErrorHandling(async () => {
  // Authenticate user
  const user = await getCurrentUser();
  if (!user || !user.email) {
    throw new Error("Unauthorized");
  }

  // Query for getting sessions only for the current logged in user
  const data = await db
    .select()
    .from(SessionChat)
    .where(eq(SessionChat.createdBy, user.email));

  if (!data || data.length === 0) {
    return [];
  }

  return data;
});

export const getSessionChatBySessionId = withErrorHandling(
  async (sessionId: string) => {
    // Validate sessionId
    if (!sessionId || typeof sessionId !== "string" || sessionId.length === 0) {
      throw new Error("Invalid or missing sessionId");
    }

    // Authenticate user
    const user = await getCurrentUser();
    if (!user || !user.email) {
      throw new Error("Unauthorized");
    }

    // Query for getting session based on passed sessionId
    const data = await db
      .select()
      .from(SessionChat)
      .where(eq(SessionChat.sessionChatId, sessionId));

    if (!data || data.length === 0) {
      throw new Error("Session not found");
    }

    const sessionChat = data[0];

    // Security: Only allow access if the user is the creator of the session
    if (!sessionChat.createdBy || sessionChat.createdBy !== user.email) {
      throw new Error("Forbidden: You do not have access to this session.");
    }

    return sessionChat;
  }
);

export const deleteSession = withErrorHandling(async (sessionId: string) => {
  // Authenticate user
  const user = await getCurrentUser();
  if (!user || !user.email) {
    throw new Error("Unauthorized");
  }

  // check if sessionId is there
  if (!sessionId || typeof sessionId !== "string") {
    throw new Error("Session ID could not be found");
  }

  // Query for getting all sessions
  const data = await db
    .delete(SessionChat)
    .where(eq(SessionChat.sessionChatId, sessionId));

  if (data) {
    revalidatePaths(["/dashboard", "/session/history"]);
    return { success: true, message: "Session deleted successfully" };
  } else {
    throw new Error("Session could not be deleted");
  }
});
