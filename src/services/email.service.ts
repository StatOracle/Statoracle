import { getPayloadClient } from "@/payload/payload-client";
import { EmailTemplate, TemplateType } from "@/types/email";
import * as Sentry from "@sentry/nextjs";
import superjson from "superjson";
import {
  getEmailComponent,
  validateTemplateParams,
} from "@/utils/email-template-adapter";
import { initSentry } from "@/utils/sentry";

// Initialize Sentry
initSentry();

// Interface for email sending options
interface SendEmailOptions {
  to: string;
  subject: string;
  from?: string;
  replyTo?: string;
  templateType: TemplateType;
  templateData: Record<string, any>;
  campaignId?: string;
  recipientName?: string;
}

/**
 * Send an email using Payload's email adapter
 */
export async function sendEmail({
  to,
  subject,
  from = "StatOracle <noreply@statoracle.com>",
  replyTo,
  templateType,
  templateData,
  campaignId,
  recipientName,
}: SendEmailOptions) {
  try {
    // Get the Payload client
    const payload = await getPayloadClient();

    // Validate template parameters
    if (!validateTemplateParams(templateType, templateData)) {
      throw new Error(
        `Invalid template parameters for template type: ${templateType}`,
      );
    }

    // Get the appropriate React component based on template type
    const emailComponent = getEmailComponent(templateType, templateData);

    // Create a transaction to track this in Sentry
    const transaction = Sentry.startTransaction({
      name: "sendEmail",
      data: {
        templateType,
        to,
        subject,
        campaignId,
      },
    });

    try {
      // Send the email using Payload's email adapter
      const result = await payload.sendEmail({
        from: from,
        to: to,
        subject: subject,
        replyTo: replyTo,
        html: emailComponent,
      });

      // Log the successful email send if we have a campaign ID
      if (campaignId) {
        await logEmailSend({
          campaignId,
          recipient: to,
          recipientName,
          subject,
          status: "sent",
          resendId: result?.id, // Resend adapter returns an ID
        });
      }

      transaction.setStatus("ok");
      return { success: true, data: result };
    } catch (error) {
      // Log the error in Sentry
      Sentry.captureException(error, {
        tags: {
          emailType: templateType,
          campaignId,
        },
        extra: {
          recipient: to,
          subject,
        },
      });

      console.error("Error sending email:", error);

      // Log the error in the database if we have a campaign ID
      if (campaignId) {
        await logEmailSend({
          campaignId,
          recipient: to,
          recipientName,
          subject,
          status: "failed",
          errorDetails: error instanceof Error ? error.message : String(error),
        });
      }

      transaction.setStatus("error");
      return { success: false, error };
    } finally {
      transaction.finish();
    }
  } catch (error) {
    // Capture the error in Sentry
    Sentry.captureException(error, {
      tags: {
        emailType: templateType,
        campaignId,
      },
      extra: {
        recipient: to,
        subject,
      },
    });

    console.error("Error in sendEmail:", error);

    // Log the error in the database if we have a campaign ID
    if (campaignId) {
      await logEmailSend({
        campaignId,
        recipient: to,
        recipientName,
        subject,
        status: "failed",
        errorDetails: error instanceof Error ? error.message : String(error),
      });
    }

    return { success: false, error };
  }
}

// The getEmailComponent function is now imported from utils/email-template-adapter

/**
 * Log an email send in the database
 */
interface LogEmailOptions {
  campaignId: string;
  recipient: string;
  recipientName?: string;
  subject: string;
  status: "sent" | "delivered" | "opened" | "clicked" | "bounced" | "failed";
  resendId?: string;
  errorDetails?: string;
}

async function logEmailSend({
  campaignId,
  recipient,
  recipientName,
  subject,
  status,
  resendId,
  errorDetails,
}: LogEmailOptions) {
  try {
    // Create a transaction to track this in Sentry
    const transaction = Sentry.startTransaction({
      name: "logEmailSend",
      data: {
        campaignId,
        recipient,
        status,
      },
    });

    try {
      const payload = await getPayloadClient();

      // Serialize the data with SuperJSON for type safety
      const emailData = superjson.stringify({
        campaign: campaignId,
        recipient,
        recipientName,
        subject,
        status,
        sentAt: new Date(),
        resendId,
        errorDetails,
      });

      const parsedData = superjson.parse(emailData);

      // Create a record in the sent-emails collection
      await payload.create({
        collection: "sent-emails",
        data: parsedData,
      });

      // Update the campaign's sent count
      const campaign = await payload.findByID({
        collection: "email-campaigns",
        id: campaignId,
      });

      if (campaign) {
        // Serialize the update data with SuperJSON for type safety
        const updateData = superjson.stringify({
          sentCount: (campaign.sentCount || 0) + 1,
          status: "sending",
        });

        const parsedUpdateData = superjson.parse(updateData);

        await payload.update({
          collection: "email-campaigns",
          id: campaignId,
          data: parsedUpdateData,
        });
      }

      transaction.setStatus("ok");
      return true;
    } catch (error) {
      // Log the error in Sentry
      Sentry.captureException(error, {
        tags: {
          operation: "logEmailSend",
          campaignId,
        },
        extra: {
          recipient,
          subject,
          status,
        },
      });

      console.error("Error logging email send:", error);
      transaction.setStatus("error");
      return false;
    } finally {
      transaction.finish();
    }
  } catch (error) {
    // Capture the error in Sentry
    Sentry.captureException(error, {
      tags: {
        operation: "logEmailSend",
        campaignId,
      },
      extra: {
        recipient,
        subject,
        status,
      },
    });

    console.error("Error in logEmailSend:", error);
    return false;
  }
}

/**
 * Send a campaign to all recipients
 */
export async function sendCampaign(campaignId: string) {
  // Create a transaction to track this in Sentry
  const transaction = Sentry.startTransaction({
    name: "sendCampaign",
    data: {
      campaignId,
    },
  });

  try {
    const payload = await getPayloadClient();

    // Get the campaign
    const campaign = await payload.findByID({
      collection: "email-campaigns",
      id: campaignId,
      depth: 2, // To get the template data
    });

    if (!campaign) {
      throw new Error(`Campaign not found: ${campaignId}`);
    }

    // Update campaign status to sending using SuperJSON for type safety
    const updateData = superjson.stringify({
      status: "sending",
      sentAt: new Date(),
    });

    await payload.update({
      collection: "email-campaigns",
      id: campaignId,
      data: superjson.parse(updateData),
    });

    // Get the template
    const template = campaign.template as EmailTemplate;

    if (!template) {
      throw new Error("Template not found for campaign");
    }

    // Get the recipients based on audience type
    let recipients: { email: string; firstName?: string; lastName?: string }[] =
      [];

    switch (campaign.audience) {
      case "all-waitlist":
        // Get all waitlist entries
        const waitlistEntries = await payload.find({
          collection: "waitlist-entries",
          limit: 1000, // Adjust as needed
        });

        recipients = waitlistEntries.docs.map((entry) => ({
          email: entry.email,
          firstName: entry.firstName,
          lastName: entry.lastName,
        }));
        break;

      case "specific-users":
        // Get specific users from the campaign
        if (Array.isArray(campaign.specificUsers)) {
          const userIds = campaign.specificUsers.map((user) =>
            typeof user === "string" ? user : user.id,
          );

          for (const userId of userIds) {
            const user = await payload.findByID({
              collection: "waitlist-entries",
              id: userId,
            });

            if (user) {
              recipients.push({
                email: user.email,
                firstName: user.firstName,
                lastName: user.lastName,
              });
            }
          }
        }
        break;

      case "custom-list":
        // Use the custom recipients list
        if (Array.isArray(campaign.customRecipients)) {
          recipients = campaign.customRecipients.map((recipient) => ({
            email: recipient.email,
            firstName: recipient.firstName,
            lastName: recipient.lastName,
          }));
        }
        break;

      default:
        throw new Error(`Unsupported audience type: ${campaign.audience}`);
    }

    // Add recipient count to Sentry transaction
    transaction.setData("recipientCount", recipients.length);

    // Send emails to all recipients
    let successCount = 0;
    let failureCount = 0;

    for (const recipient of recipients) {
      // Merge campaign template variables with recipient data
      const templateData = superjson.stringify({
        ...campaign.templateVariables,
        firstName: recipient.firstName,
        lastName: recipient.lastName,
      });

      // Send the email
      const result = await sendEmail({
        to: recipient.email,
        subject: template.subject,
        from: `${template.fromName} <${template.fromEmail}>`,
        replyTo: template.replyToEmail,
        templateType: template.templateType as TemplateType,
        templateData: superjson.parse(templateData),
        campaignId,
        recipientName: recipient.firstName
          ? `${recipient.firstName} ${recipient.lastName || ""}`.trim()
          : undefined,
      });

      if (result.success) {
        successCount++;
      } else {
        failureCount++;
      }

      // Add a small delay to avoid rate limiting
      await new Promise((resolve) => setTimeout(resolve, 100));
    }

    // Update campaign status
    const finalStatus =
      failureCount === recipients.length
        ? "failed"
        : failureCount > 0
          ? "partial"
          : "sent";

    const finalUpdateData = superjson.stringify({
      status: finalStatus,
      sentCount: successCount,
    });

    await payload.update({
      collection: "email-campaigns",
      id: campaignId,
      data: superjson.parse(finalUpdateData),
    });

    transaction.setStatus("ok");
    transaction.setData("successCount", successCount);
    transaction.setData("failureCount", failureCount);

    return {
      success: true,
      totalRecipients: recipients.length,
      successCount,
      failureCount,
    };
  } catch (error) {
    // Log the error in Sentry
    Sentry.captureException(error, {
      tags: {
        operation: "sendCampaign",
        campaignId,
      },
    });

    console.error("Error sending campaign:", error);

    // Update campaign status to failed
    try {
      const payload = await getPayloadClient();

      const errorUpdateData = superjson.stringify({
        status: "failed",
        errorDetails: error instanceof Error ? error.message : String(error),
      });

      await payload.update({
        collection: "email-campaigns",
        id: campaignId,
        data: superjson.parse(errorUpdateData),
      });
    } catch (updateError) {
      console.error("Error updating campaign status:", updateError);
      Sentry.captureException(updateError);
    }

    transaction.setStatus("error");
    return { success: false, error };
  } finally {
    transaction.finish();
  }
}
