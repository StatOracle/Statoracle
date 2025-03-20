// app/api/send-welcome-emails/route.ts
import { NextResponse } from "next/server";
import { Resend } from "resend";
import { db } from "@/db";
import { waitlistEntries } from "@/db/schema";
import * as React from "react";
import { WelcomeEmail } from "@react-email/welcome";

const resend = new Resend(process.env.RESEND_API_KEY!);

export async function POST() {
  try {
    // Select all waitlist entries that haven’t been sent a welcome email yet.
    // (Assume that welcomeEmailSentAt is null if not sent.)
    const unsentUsers = await db
      .select()
      .from(waitlistEntries)
      .where(waitlistEntries.welcomeEmailSentAt.isNull());

    // Loop over those users
    for (const user of unsentUsers) {
      const emailElement = <WelcomeEmail name={user.firstName} />;
      await resend.emails.send({
        from: "you@example.com",
        to: user.email,
        subject: "Welcome to StatOracle!",
        react: emailElement,
      });

      // Update the user entry with a timestamp noting the email was sent.
      await db
        .update(waitlistEntries)
        .set({ welcomeEmailSentAt: new Date() })
        .where(waitlistEntries.id.equals(user.id));
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error sending welcome emails", error);
    return NextResponse.json({ success: false }, { status: 500 });
  }
}
