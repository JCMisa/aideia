"use server";

import { db } from "@/config/db";
import { withErrorHandling } from "../utils";
import { SessionChat, Users } from "@/config/schema";
import { eq, sql } from "drizzle-orm";
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

const getSessionsWithUser = () =>
  db
    .select({
      sessionChat: SessionChat,
      user: {
        id: Users.clerkId,
        name: Users.name,
        email: Users.email,
        image: Users.image,
        credits: Users.credits,
      },
    })
    .from(SessionChat)
    .leftJoin(Users, eq(SessionChat.createdBy, Users.email));

export const getUserSessionsWithPagination = withErrorHandling(
  async (pageNumber: number = 1, pageSize: number = 8) => {
    const user = await getCurrentUser();
    const userEmail = user?.email;

    // Count total for pagination
    const [{ totalCount }] = await db
      .select({ totalCount: sql<number>`count(*)` })
      .from(SessionChat)
      .where(eq(SessionChat.createdBy, userEmail));
    const totalSessions = Number(totalCount || 0);
    const totalPages = Math.ceil(totalSessions / pageSize);

    // Fetch paginated, sorted results
    const sessionRecords = await getSessionsWithUser()
      .where(eq(SessionChat.createdBy, userEmail))
      .orderBy(sql`${SessionChat.createdAt} DESC`)
      .limit(pageSize)
      .offset((pageNumber - 1) * pageSize);

    return {
      sessions: sessionRecords,
      pagination: {
        currentPage: pageNumber,
        totalPages,
        totalSessions,
        pageSize,
      },
    };
  }
);

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

// --------------------------- Chart Data Actions ---------------------------
export const getSessionsByMonth = withErrorHandling(async (year: number) => {
  // Authenticate user
  const user = await getCurrentUser();
  if (!user || !user.email) {
    throw new Error("Unauthorized");
  }

  console.log("Fetching sessions for user:", user.email, "year:", year);

  // First, let's see what sessions exist for this user
  const allUserSessions = await db
    .select({
      id: SessionChat.id,
      createdAt: SessionChat.createdAt,
      createdBy: SessionChat.createdBy,
    })
    .from(SessionChat)
    .where(eq(SessionChat.createdBy, user.email));

  console.log("All user sessions:", allUserSessions);

  // Get sessions for the specified year, grouped by month
  const sessionsByMonth = await db
    .select({
      month: sql<number>`EXTRACT(MONTH FROM ${SessionChat.createdAt})`,
      year: sql<number>`EXTRACT(YEAR FROM ${SessionChat.createdAt})`,
      count: sql<number>`COUNT(*)`,
    })
    .from(SessionChat)
    .where(
      sql`${SessionChat.createdBy} = ${user.email} AND EXTRACT(YEAR FROM ${SessionChat.createdAt}) = ${year}`
    )
    .groupBy(
      sql`EXTRACT(MONTH FROM ${SessionChat.createdAt}), EXTRACT(YEAR FROM ${SessionChat.createdAt})`
    )
    .orderBy(sql`EXTRACT(MONTH FROM ${SessionChat.createdAt})`);

  console.log("Sessions by month with year:", sessionsByMonth);

  // Alternative approach: Get all sessions and filter in JavaScript
  const allSessionsForYear = await db
    .select({
      id: SessionChat.id,
      createdAt: SessionChat.createdAt,
    })
    .from(SessionChat)
    .where(eq(SessionChat.createdBy, user.email));

  console.log("All sessions for user:", allSessionsForYear);

  // Filter sessions for the specified year and group by month
  const sessionsInYear = allSessionsForYear.filter((session) => {
    const sessionYear = new Date(session.createdAt).getFullYear();
    return sessionYear === year;
  });

  console.log("Sessions in year", year, ":", sessionsInYear);

  // Group by month manually
  const manualGrouping = Array.from({ length: 12 }, (_, index) => {
    const monthNumber = index + 1;
    const monthSessions = sessionsInYear.filter((session) => {
      const sessionMonth = new Date(session.createdAt).getMonth() + 1; // getMonth() returns 0-11
      return sessionMonth === monthNumber;
    });

    return {
      month: monthNumber,
      count: monthSessions.length,
    };
  });

  console.log("Manual grouping result:", manualGrouping);

  // Create a complete year array with all months (1-12)
  const monthNames = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  // Use manual grouping instead of SQL grouping for more reliability
  const monthlyData = Array.from({ length: 12 }, (_, index) => {
    const monthNumber = index + 1;
    const monthData = manualGrouping.find((s) => s.month === monthNumber);

    return {
      month: monthNames[index],
      sessions: monthData ? monthData.count : 0,
    };
  });

  console.log("Final monthly data:", monthlyData);

  return monthlyData;
});

export const getAvailableYears = withErrorHandling(async () => {
  // Authenticate user
  const user = await getCurrentUser();
  if (!user || !user.email) {
    throw new Error("Unauthorized");
  }

  // Get all years that have sessions for the current user
  const years = await db
    .select({
      year: sql<number>`EXTRACT(YEAR FROM ${SessionChat.createdAt})`,
    })
    .from(SessionChat)
    .where(eq(SessionChat.createdBy, user.email))
    .groupBy(sql`EXTRACT(YEAR FROM ${SessionChat.createdAt})`)
    .orderBy(sql`EXTRACT(YEAR FROM ${SessionChat.createdAt}) DESC`);

  return years.map((y) => Number(y.year));
});
