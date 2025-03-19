import { db } from "@/db";
import { waitlistEntries, surveys } from "@/db/schema";
import { NextResponse } from "next/server";
import { z } from "zod";

const waitlistSchema = z.object({
  firstName: z.string().min(2),
  lastName: z.string().min(2),
  email: z.string().email(),
  phoneNumber: z.string().optional(),
  includeSurvey: z.boolean().default(false),
  discoverySource: z.string().optional(),
  age: z.string().optional(),
  profession: z.string().optional(),
  additionalFeedback: z.string().optional(),
});

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const {
      firstName,
      lastName,
      email,
      phoneNumber,
      includeSurvey,
      discoverySource,
      age,
      profession,
      additionalFeedback,
    } = waitlistSchema.parse(body);

    // Insert into waitlist
    const [waitlistEntry] = await db
      .insert(waitlistEntries)
      .values({
        firstName,
        lastName,
        email,
        phoneNumber,
      })
      .returning();

    // If survey included, insert survey data
    if (includeSurvey) {
      await db.insert(surveys).values({
        waitlistEntryId: waitlistEntry.id,
        discoverySource,
        age: age ? parseInt(age) : undefined,
        profession,
        additionalFeedback,
      });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error processing waitlist submission:", error);
    return NextResponse.json(
      { error: "Failed to process submission" },
      { status: 500 },
    );
  }
}
