import { db } from "@/config/db";
import { Users } from "@/config/schema";
import { currentUser } from "@clerk/nextjs/server";
import { eq } from "drizzle-orm";
import { NextResponse } from "next/server";

export async function POST() {
  const user = await currentUser();
  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    // check if user already exist in the database
    const users = await db
      .select()
      .from(Users)
      .where(eq(Users.clerkId, user.id));

    // if not exist, add to database
    if (users.length === 0) {
      await db.insert(Users).values({
        clerkId: user.id,
        name: user.fullName || user.firstName || "Unknown",
        email: user.primaryEmailAddress?.emailAddress || "",
        image: user.imageUrl || null,
        credits: 0,
        role: "user",
        createdAt: new Date(),
        updatedAt: new Date(),
      });

      return NextResponse.json({ user: { clerkId: user.id } }, { status: 201 });
    }

    return NextResponse.json({ user: users[0] || null }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: error }, { status: 500 });
  }
}
