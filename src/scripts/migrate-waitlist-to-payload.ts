/**
 * This script migrates existing waitlist entries from the database to Payload CMS
 * 
 * Run with: pnpm tsx src/scripts/migrate-waitlist-to-payload.ts
 */

import { db } from "@/db";
import { waitlistEntries as waitlistEntriesTable, surveys as surveysTable } from "@/db/schema";
import { getPayloadClient } from "@/payload/payload-client";
import { v4 as uuidv4 } from "uuid";

async function migrateWaitlistEntries() {
  try {
    console.log("Starting migration of waitlist entries to Payload CMS...");

    // Get the Payload client
    const payload = await getPayloadClient();

    // Get all waitlist entries from the database
    const dbWaitlistEntries = await db.select().from(waitlistEntriesTable);
    console.log(`Found ${dbWaitlistEntries.length} waitlist entries in the database`);

    // Process each waitlist entry
    let successCount = 0;
    let errorCount = 0;

    for (const entry of dbWaitlistEntries) {
      try {
        // Check if the entry already exists in Payload
        const existingEntries = await payload.find({
          collection: "waitlist-entries",
          where: {
            email: {
              equals: entry.email,
            },
          },
        });

        if (existingEntries.docs.length > 0) {
          console.log(`Entry for ${entry.email} already exists in Payload, skipping`);
          continue;
        }

        // Get the survey data for this entry
        const surveyData = entry.id
          ? await db
              .select()
              .from(surveysTable)
              .where(surveysTable.waitlistEntryId.equals(entry.id))
              .then((results) => results[0])
          : null;

        // Generate a referral code if not present
        const referralCode = entry.referralCode || `REF-${uuidv4().substring(0, 8).toUpperCase()}`;

        // Create the entry in Payload
        await payload.create({
          collection: "waitlist-entries",
          data: {
            firstName: entry.firstName,
            lastName: entry.lastName,
            email: entry.email,
            phoneNumber: entry.phoneNumber || undefined,
            profession: entry.profession,
            welcomeEmailSent: !!entry.welcomeEmailSentAt,
            welcomeEmailSentAt: entry.welcomeEmailSentAt?.toISOString() || undefined,
            referralCode,
            // Add survey data if available
            survey: surveyData
              ? {
                  discoverySource: surveyData.discoverySource || undefined,
                  sport: surveyData.sport || undefined,
                  teamLevel: surveyData.teamLevel || undefined,
                  analyticsExperience: surveyData.analyticsExperience || undefined,
                  budgetRange: surveyData.budgetRange || undefined,
                  primaryGoal: surveyData.primaryGoal || undefined,
                  additionalFeedback: surveyData.additionalFeedback || undefined,
                }
              : undefined,
          },
        });

        successCount++;
        console.log(`Migrated entry for ${entry.email}`);
      } catch (error) {
        errorCount++;
        console.error(`Error migrating entry for ${entry.email}:`, error);
      }
    }

    console.log(`Migration complete. Successes: ${successCount}, Errors: ${errorCount}`);
  } catch (error) {
    console.error("Migration failed:", error);
  }
}

// Run the migration
migrateWaitlistEntries()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error("Unhandled error during migration:", error);
    process.exit(1);
  });
