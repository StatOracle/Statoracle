/**
 * This script seeds initial email templates in Payload CMS
 * 
 * Run with: pnpm tsx src/scripts/seed-email-templates.ts
 */

import { getPayloadClient } from "@/payload/payload-client";

async function seedEmailTemplates() {
  try {
    console.log("Starting to seed email templates in Payload CMS...");

    // Get the Payload client
    const payload = await getPayloadClient();

    // Define the templates to create
    const templates = [
      {
        name: "Welcome Email",
        subject: "Welcome to StatOracle!",
        fromName: "StatOracle",
        fromEmail: "welcome@statoracle.com",
        templateType: "welcome",
        content: [
          {
            children: [
              {
                text: "Welcome to StatOracle!",
              },
            ],
            type: "h1",
          },
          {
            children: [
              {
                text: "Thank you for joining our platform. We're excited to have you as part of our community.",
              },
            ],
            type: "p",
          },
        ],
        jsonContent: {
          previewText: "Welcome to StatOracle - Your sports analytics revolution starts now!",
        },
        active: true,
        previewText: "Welcome to StatOracle - Your sports analytics revolution starts now!",
      },
      {
        name: "Waitlist Confirmation",
        subject: "You're on the StatOracle Waitlist!",
        fromName: "StatOracle",
        fromEmail: "waitlist@statoracle.com",
        templateType: "waitlist-confirmation",
        content: [
          {
            children: [
              {
                text: "You're on the roster!",
              },
            ],
            type: "h1",
          },
          {
            children: [
              {
                text: "Your spot on the StatOracle waitlist is confirmed.",
              },
            ],
            type: "p",
          },
        ],
        jsonContent: {
          previewText: "Thanks for joining the StatOracle waitlist! Game-changing sports analytics incoming.",
          waitlistPosition: "#238",
          referralCode: "COACH-ALEX-23",
        },
        active: true,
        previewText: "Thanks for joining the StatOracle waitlist! Game-changing sports analytics incoming.",
      },
      {
        name: "Monthly Newsletter",
        subject: "StatOracle News: Latest in Sports Analytics",
        fromName: "StatOracle",
        fromEmail: "news@statoracle.com",
        templateType: "newsletter",
        content: [
          {
            children: [
              {
                text: "This Month in Sports Analytics",
              },
            ],
            type: "h1",
          },
          {
            children: [
              {
                text: "Insights, updates, and tips to elevate your game.",
              },
            ],
            type: "p",
          },
        ],
        jsonContent: {
          previewText: "StatOracle News: Latest in sports analytics",
          mainHeading: "This Month in Sports Analytics",
          editionNumber: "01",
        },
        active: true,
        previewText: "StatOracle News: Latest in sports analytics",
      },
    ];

    // Create each template
    let successCount = 0;
    let errorCount = 0;

    for (const template of templates) {
      try {
        // Check if the template already exists
        const existingTemplates = await payload.find({
          collection: "email-templates",
          where: {
            name: {
              equals: template.name,
            },
          },
        });

        if (existingTemplates.docs.length > 0) {
          console.log(`Template "${template.name}" already exists, skipping`);
          continue;
        }

        // Create the template
        await payload.create({
          collection: "email-templates",
          data: template,
        });

        successCount++;
        console.log(`Created template: ${template.name}`);
      } catch (error) {
        errorCount++;
        console.error(`Error creating template "${template.name}":`, error);
      }
    }

    console.log(`Seeding complete. Successes: ${successCount}, Errors: ${errorCount}`);
  } catch (error) {
    console.error("Seeding failed:", error);
  }
}

// Run the seeding
seedEmailTemplates()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error("Unhandled error during seeding:", error);
    process.exit(1);
  });
