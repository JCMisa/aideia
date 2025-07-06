"use server";

import { db } from "@/config/db";
import { withErrorHandling } from "../utils";
import { Users, SessionChat } from "@/config/schema";
import { eq, sql, desc, count } from "drizzle-orm";
import { auth } from "@clerk/nextjs/server";

// --------------------------- Helper Functions ---------------------------
const getSessionUserId = async (): Promise<string> => {
  const { userId } = await auth();
  if (!userId) throw new Error("Unauthenticated");

  return userId;
};

// --------------------------- Server Actions ---------------------------
export const getCurrentUser = withErrorHandling(async () => {
  const data = await db
    .select()
    .from(Users)
    .where(eq(Users.clerkId, await getSessionUserId()));

  if (data.length === 0) {
    throw new Error("User not found");
  }

  return data[0];
});

export const getUserByEmail = withErrorHandling(async (email: string) => {
  const data = await db.select().from(Users).where(eq(Users.email, email));

  if (data.length === 0) {
    throw new Error("User not found");
  }

  return data[0];
});

// --------------------------- Dashboard Statistics ---------------------------
export const getUserDashboardStats = withErrorHandling(async () => {
  const user = await getCurrentUser();
  if (!user?.email) {
    throw new Error("Unauthorized");
  }

  // Get user's remaining credits
  const remainingCredits = user.credits;

  // Get sessions from last 7 days
  const sevenDaysAgo = new Date();
  sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);

  const recentSessions = await db
    .select()
    .from(SessionChat)
    .where(
      sql`${SessionChat.createdBy} = ${user.email} AND ${SessionChat.createdAt} >= ${sevenDaysAgo}`
    );

  // Get most consulted specialists (top 3)
  const specialistStats = await db
    .select({
      name: sql<string>`${SessionChat.selectedDoctor}->>'name'`,
      count: count(),
    })
    .from(SessionChat)
    .where(eq(SessionChat.createdBy, user.email))
    .groupBy(sql`${SessionChat.selectedDoctor}->>'name'`)
    .orderBy(desc(count()))
    .limit(3);

  // Get last consultation date
  const lastConsultation = await db
    .select({ createdAt: SessionChat.createdAt })
    .from(SessionChat)
    .where(eq(SessionChat.createdBy, user.email))
    .orderBy(desc(SessionChat.createdAt))
    .limit(1);

  return {
    remainingCredits,
    recentSessionsCount: recentSessions.length,
    topSpecialists: specialistStats.map((stat) => ({
      name: stat.name || "Unknown",
      count: Number(stat.count),
    })),
    lastConsultationDate: lastConsultation[0]?.createdAt || null,
  };
});
