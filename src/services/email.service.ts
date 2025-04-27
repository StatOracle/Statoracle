import { Resend } from "resend";
import { WelcomeEmail } from "@/emails/welcome";
import { WaitlistConfirmationTemplate } from "@/emails/waitlist-confirmation";
import { NewsletterTemplate } from "@/emails/newsletter";
import { FeatureAnnouncementTemplate } from "@/emails/feature-announcement";
import { OpenBetaInviteTemplate } from "@/emails/open-beta-invite";
import { ClosedAlphaInviteTemplate } from "@/emails/closed-alpha-invite";
import { DevLogTemplate } from "@/emails/dev-log";
import { getPayloadClient } from "@/payload/payload-client";
import { EmailTemplate } from "@/types/email";

// Initialize Resend with API key
const resend = new Resend(process.env.RESEND_API_KEY);

// Define email template types
type TemplateType =
  | "welcome"
  | "waitlist-confirmation"
  | "newsletter"
  | "feature-announcement"
  | "open-beta-invite"
  | "closed-alpha-invite"
  | "dev-log"
  | "custom";

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
 * Send an email using Resend and React Email
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
    // Get the appropriate React component based on template type
    const emailComponent = getEmailComponent(templateType, templateData);

    // Send the email using Resend
    const { data, error } = await resend.emails.send({
      from,
      to,
      subject,
      reply_to: replyTo,
      react: emailComponent,
    });

    if (error) {
      console.error("Error sending email:", error);
      
      // Log the error in the database if we have a campaign ID
      if (campaignId) {
        await logEmailSend({
          campaignId,
          recipient: to,
          recipientName,
          subject,
          status: "failed",
          errorDetails: error.message,
        });
      }
      
      return { success: false, error };
    }

    // Log the successful email send if we have a campaign ID
    if (campaignId) {
      await logEmailSend({
        campaignId,
        recipient: to,
        recipientName,
        subject,
        status: "sent",
        resendId: data?.id,
      });
    }

    return { success: true, data };
  } catch (error) {
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

/**
 * Get the appropriate React component for the email template
 */
function getEmailComponent(templateType: TemplateType, data: Record<string, any>) {
  switch (templateType) {
    case "welcome":
      return <WelcomeEmail {...data} />;
    case "waitlist-confirmation":
      return <WaitlistConfirmationTemplate {...data} />;
    case "newsletter":
      return <NewsletterTemplate {...data} />;
    case "feature-announcement":
      return <FeatureAnnouncementTemplate {...data} />;
    case "open-beta-invite":
      return <OpenBetaInviteTemplate {...data} />;
    case "closed-alpha-invite":
      return <ClosedAlphaInviteTemplate {...data} />;
    case "dev-log":
      return <DevLogTemplate {...data} />;
    case "custom":
      // For custom templates, we'd need to handle differently
      // This is a placeholder
      return <div dangerouslySetInnerHTML={{ __html: data.html }} />;
    default:
      throw new Error(`Unsupported template type: ${templateType}`);
  }
}

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
    const payload = await getPayloadClient();
    
    // Create a record in the sent-emails collection
    await payload.create({
      collection: "sent-emails",
      data: {
        campaign: campaignId,
        recipient,
        recipientName,
        subject,
        status,
        sentAt: new Date(),
        resendId,
        errorDetails,
      },
    });

    // Update the campaign's sent count
    const campaign = await payload.findByID({
      collection: "email-campaigns",
      id: campaignId,
    });

    if (campaign) {
      await payload.update({
        collection: "email-campaigns",
        id: campaignId,
        data: {
          sentCount: (campaign.sentCount || 0) + 1,
          status: "sending",
        },
      });
    }

    return true;
  } catch (error) {
    console.error("Error logging email send:", error);
    return false;
  }
}

/**
 * Send a campaign to all recipients
 */
export async function sendCampaign(campaignId: string) {
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

    // Update campaign status to sending
    await payload.update({
      collection: "email-campaigns",
      id: campaignId,
      data: {
        status: "sending",
        sentAt: new Date(),
      },
    });

    // Get the template
    const template = campaign.template as EmailTemplate;

    if (!template) {
      throw new Error("Template not found for campaign");
    }

    // Get the recipients based on audience type
    let recipients: { email: string; firstName?: string; lastName?: string }[] = [];

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
            typeof user === "string" ? user : user.id
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

    // Send emails to all recipients
    let successCount = 0;
    let failureCount = 0;

    for (const recipient of recipients) {
      // Merge campaign template variables with recipient data
      const templateData = {
        ...campaign.templateVariables,
        firstName: recipient.firstName,
        lastName: recipient.lastName,
      };

      // Send the email
      const result = await sendEmail({
        to: recipient.email,
        subject: template.subject,
        from: `${template.fromName} <${template.fromEmail}>`,
        replyTo: template.replyToEmail,
        templateType: template.templateType as TemplateType,
        templateData,
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
    const finalStatus = failureCount === recipients.length ? "failed" : 
                        failureCount > 0 ? "partial" : "sent";
    
    await payload.update({
      collection: "email-campaigns",
      id: campaignId,
      data: {
        status: finalStatus,
        sentCount: successCount,
      },
    });

    return {
      success: true,
      totalRecipients: recipients.length,
      successCount,
      failureCount,
    };
  } catch (error) {
    console.error("Error sending campaign:", error);
    
    // Update campaign status to failed
    const payload = await getPayloadClient();
    await payload.update({
      collection: "email-campaigns",
      id: campaignId,
      data: {
        status: "failed",
        errorDetails: error instanceof Error ? error.message : String(error),
      },
    });
    
    return { success: false, error };
  }
}
