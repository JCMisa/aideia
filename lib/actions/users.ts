"use server";

import { db } from "@/config/db";
import { withErrorHandling } from "../utils";
import { Users, SessionChat } from "@/config/schema";
import { eq, count } from "drizzle-orm";
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

export const getAvgConsultationsPerWeek = withErrorHandling(async () => {
  const user = await getCurrentUser();
  if (!user?.email) throw new Error("Unauthorized");

  // first consultation ever
  const [first] = await db
    .select({ createdAt: SessionChat.createdAt })
    .from(SessionChat)
    .where(eq(SessionChat.createdBy, user.email))
    .orderBy(SessionChat.createdAt)
    .limit(1);

  if (!first) return 0; // no consultations yet

  const daysSinceFirst = Math.max(
    1,
    Math.ceil((Date.now() - first.createdAt.getTime()) / (1000 * 60 * 60 * 24))
  );
  const weeksSinceFirst = daysSinceFirst / 7;

  const [{ total }] = await db
    .select({ total: count() })
    .from(SessionChat)
    .where(eq(SessionChat.createdBy, user.email));

  return Number((Number(total) / weeksSinceFirst).toFixed(1));
});

export const getCurrentStreakWeeks = withErrorHandling(async () => {
  const user = await getCurrentUser();
  if (!user?.email) throw new Error("Unauthorized");

  const allSessions = await db
    .select({ createdAt: SessionChat.createdAt })
    .from(SessionChat)
    .where(eq(SessionChat.createdBy, user.email))
    .orderBy(SessionChat.createdAt);

  if (!allSessions.length) return 0;

  // ISO week-number helper
  const getWeek = (d: Date) => {
    const clone = new Date(d);
    clone.setHours(0, 0, 0, 0);
    clone.setDate(clone.getDate() + 4 - (clone.getDay() || 7));
    const yearStart = new Date(clone.getFullYear(), 0, 1);
    return Math.ceil(
      ((clone.getTime() - yearStart.getTime()) / 86400000 + 1) / 7
    );
  };

  const weeks = new Set<number>();
  allSessions.forEach(({ createdAt }) => weeks.add(getWeek(createdAt)));

  // most recent Sunday (inclusive cut-off)
  const today = new Date();
  const lastSunday = new Date(today);
  lastSunday.setDate(today.getDate() - today.getDay());
  const currentWeek = getWeek(lastSunday);

  let streak = 0;
  let check = currentWeek;
  while (weeks.has(check)) {
    streak++;
    check--;
  }
  return streak;
});
