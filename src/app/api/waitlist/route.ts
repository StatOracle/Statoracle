// app/api/waitlist/route.ts
import { NextResponse } from "next/server";
import { db } from "@/db";
import { waitlistEntries, surveys } from "@/db/schema";
import { v4 as uuidv4 } from "uuid";
import { Resend } from "resend";
import { WaitlistEntry, SurveyData } from "@/types/waitlist";
import { eq } from "drizzle-orm";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: Request) {
  try {
    const data = await request.json();

    // Generate UUIDs
    const waitlistEntryId = uuidv4();
    const surveyId = data.includeSurvey ? uuidv4() : null;

    // Insert into waitlist_entries
    await db.insert(waitlistEntries).values({
      id: waitlistEntryId,
      firstName: data.firstName,
      lastName: data.lastName,
      email: data.email,
      phoneNumber: data.phoneNumber || null,
      profession: data.profession,
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    // Insert survey data if included
    if (data.includeSurvey && data.survey) {
      await db.insert(surveys).values({
        id: surveyId,
        waitlistEntryId: waitlistEntryId,
        discoverySource: data.survey.discoverySource || null,
        sport: data.survey.sport || null,
        teamLevel: data.survey.teamLevel || null,
        analyticsExperience: data.survey.analyticsExperience || null,
        budgetRange: data.survey.budgetRange || null,
        primaryGoal: data.survey.primaryGoal || null,
        additionalFeedback: data.survey.additionalFeedback || null,
        createdAt: new Date(),
      });
    }

    // Send welcome email
    await sendWelcomeEmail({
      id: waitlistEntryId,
      firstName: data.firstName,
      lastName: data.lastName,
      email: data.email,
      profession: data.profession,
    });
    // Update the entry to mark welcome email as sent
    await db
      .update(waitlistEntries)
      .set({ welcomeEmailSentAt: new Date() })
      .where(eq(waitlistEntries.id, waitlistEntryId));

    // Emit SSE event for real-time updates
    const eventEmitter = global.waitlistEventEmitter;
    if (eventEmitter) {
      eventEmitter.emit("new-signup", {
        id: waitlistEntryId,
        name: `${data.firstName} ${data.lastName}`,
        initials: `${data.firstName[0]}${data.lastName[0]}`.toUpperCase(),
        profession: data.profession,
        joinedAt: new Date(),
      });
    }

    return NextResponse.json({ success: true, id: waitlistEntryId });
  } catch (error) {
    console.error("Error adding to waitlist:", error);
    return NextResponse.json(
      { error: "Failed to join waitlist" },
      { status: 500 },
    );
  }
}

async function sendWelcomeEmail(user: Partial<WaitlistEntry>) {
  try {
    await resend.emails.send({
      from: "welcome@statoracle.com",
      to: user.email!,
      subject: "Welcome to StatOracle's Waitlist!",
      html: `
        <div>
          <h1>Welcome to StatOracle, ${user.firstName}!</h1>
          <p>Thank you for joining our waitlist. We're excited to have you as part of our community.</p>
          <p>You've also been added to our newsletter where we'll share the latest in sports analytics trends and insights.</p>
          <p>We'll notify you as soon as we're ready to welcome you to the platform.</p>
          <p>Best regards,<br />The StatOracle Team</p>
        </div>
      `,
    });

    return true;
  } catch (error) {
    console.error("Error sending welcome email:", error);
    return false;
  }
}
