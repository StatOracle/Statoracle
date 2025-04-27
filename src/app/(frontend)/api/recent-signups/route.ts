// app/api/recent-signups/route.ts
import { NextResponse } from "next/server";
import { db } from "@/db";
import { waitlistEntries } from "@/db/schema";
import { desc } from "drizzle-orm";

export async function GET() {
  try {
    const recentSignups = await db
      .select({
        id: waitlistEntries.id,
        firstName: waitlistEntries.firstName,
        lastName: waitlistEntries.lastName,
        profession: waitlistEntries.profession,
        createdAt: waitlistEntries.createdAt,
      })
      .from(waitlistEntries)
      .orderBy(desc(waitlistEntries.createdAt))
      .limit(10);

    const users = recentSignups.map((user) => ({
      id: user.id,
      name: `${user.firstName} ${user.lastName}`,
      initials: `${user.firstName[0]}${user.lastName[0]}`.toUpperCase(),
      profession: user.profession,
      joinedAt: user.createdAt,
    }));

    return NextResponse.json({ users });
  } catch (error) {
    console.error("Error fetching recent signups:", error);
    return NextResponse.json(
      { error: "Failed to fetch recent signups" },
      { status: 500 },
    );
  }
}
