import { Endpoint } from "payload/config";
import { sendCampaign } from "@/services/email.service";
import { getPayloadClient } from "../payload-client";

/**
 * Custom endpoints for email functionality
 */

// Endpoint to send a campaign
export const sendCampaignEndpoint: Endpoint = {
  path: "/send-campaign",
  method: "post",
  handler: async (req) => {
    try {
      // Get the campaign ID from the request
      const data = await req.json();
      const { campaignId } = data;

      if (!campaignId) {
        return Response.json(
          { error: "Campaign ID is required" },
          { status: 400 }
        );
      }

      // Get the payload client
      const payload = req.payload;

      // Check if the campaign exists
      const campaign = await payload.findByID({
        collection: "email-campaigns",
        id: campaignId,
      });

      if (!campaign) {
        return Response.json(
          { error: "Campaign not found" },
          { status: 404 }
        );
      }

      // Check if the campaign is already sent
      if (campaign.status === "sent") {
        return Response.json(
          { error: "Campaign has already been sent" },
          { status: 400 }
        );
      }

      // Send the campaign
      const result = await sendCampaign(campaignId);

      if (!result.success) {
        return Response.json(
          { error: "Failed to send campaign", details: result.error },
          { status: 500 }
        );
      }

      return Response.json(result);
    } catch (error) {
      console.error("Error sending campaign:", error);
      return Response.json(
        { 
          error: "Failed to send campaign", 
          details: error instanceof Error ? error.message : String(error) 
        },
        { status: 500 }
      );
    }
  },
};

// Endpoint to schedule a campaign
export const scheduleCampaignEndpoint: Endpoint = {
  path: "/schedule-campaign",
  method: "post",
  handler: async (req) => {
    try {
      // Get the campaign ID and scheduled time from the request
      const data = await req.json();
      const { campaignId, scheduledFor } = data;

      if (!campaignId || !scheduledFor) {
        return Response.json(
          { error: "Campaign ID and scheduled time are required" },
          { status: 400 }
        );
      }

      // Get the payload client
      const payload = req.payload;

      // Check if the campaign exists
      const campaign = await payload.findByID({
        collection: "email-campaigns",
        id: campaignId,
      });

      if (!campaign) {
        return Response.json(
          { error: "Campaign not found" },
          { status: 404 }
        );
      }

      // Check if the campaign is already sent
      if (campaign.status === "sent") {
        return Response.json(
          { error: "Campaign has already been sent" },
          { status: 400 }
        );
      }

      // Update the campaign with the scheduled time
      const updatedCampaign = await payload.update({
        collection: "email-campaigns",
        id: campaignId,
        data: {
          status: "scheduled",
          scheduledFor,
        },
      });

      return Response.json({
        success: true,
        campaign: updatedCampaign,
      });
    } catch (error) {
      console.error("Error scheduling campaign:", error);
      return Response.json(
        { 
          error: "Failed to schedule campaign", 
          details: error instanceof Error ? error.message : String(error) 
        },
        { status: 500 }
      );
    }
  },
};

// Endpoint to send scheduled campaigns (for cron job)
export const sendScheduledCampaignsEndpoint: Endpoint = {
  path: "/send-scheduled-campaigns",
  method: "get",
  handler: async (req) => {
    try {
      // Get the payload client
      const payload = req.payload;

      // Get all scheduled campaigns
      const scheduledCampaigns = await payload.find({
        collection: "email-campaigns",
        where: {
          status: {
            equals: "scheduled",
          },
          scheduledFor: {
            less_than_equal: new Date().toISOString(),
          },
        },
      });

      if (scheduledCampaigns.docs.length === 0) {
        return Response.json({
          success: true,
          message: "No scheduled campaigns to send",
        });
      }

      // Send each scheduled campaign
      const results = [];
      for (const campaign of scheduledCampaigns.docs) {
        const result = await sendCampaign(campaign.id);
        results.push({
          campaignId: campaign.id,
          campaignName: campaign.name,
          result,
        });
      }

      return Response.json({
        success: true,
        campaignsSent: results.length,
        results,
      });
    } catch (error) {
      console.error("Error sending scheduled campaigns:", error);
      return Response.json(
        {
          error: "Failed to send scheduled campaigns",
          details: error instanceof Error ? error.message : String(error),
        },
        { status: 500 }
      );
    }
  },
};

// Endpoint to handle Resend webhooks
export const resendWebhookEndpoint: Endpoint = {
  path: "/webhooks/resend",
  method: "post",
  handler: async (req) => {
    try {
      // Get the webhook payload
      const data = await req.json();

      // Verify the webhook signature (in a production environment)
      // This is a simplified version
      // const signature = req.headers.get("resend-signature");
      // if (!verifySignature(signature, JSON.stringify(payload), process.env.RESEND_WEBHOOK_SECRET)) {
      //   return Response.json({ error: "Invalid signature" }, { status: 401 });
      // }

      // Process the webhook event
      const { type, data: eventData } = data;

      if (!type || !eventData || !eventData.email_id) {
        return Response.json(
          { error: "Invalid webhook payload" },
          { status: 400 }
        );
      }

      // Get the payload client
      const payload = req.payload;

      // Find the sent email by Resend ID
      const sentEmails = await payload.find({
        collection: "sent-emails",
        where: {
          resendId: {
            equals: eventData.email_id,
          },
        },
      });

      if (sentEmails.docs.length === 0) {
        return Response.json(
          { error: "Sent email not found" },
          { status: 404 }
        );
      }

      const sentEmail = sentEmails.docs[0];

      // Update the sent email status based on the event type
      let status;
      let updateData: Record<string, any> = {};

      switch (type) {
        case "email.delivered":
          status = "delivered";
          break;
        case "email.opened":
          status = "opened";
          updateData.openedAt = new Date();
          break;
        case "email.clicked":
          status = "clicked";
          updateData.clickedAt = new Date();
          break;
        case "email.bounced":
          status = "bounced";
          updateData.errorDetails = eventData.reason || "Email bounced";
          break;
        case "email.failed":
          status = "failed";
          updateData.errorDetails = eventData.reason || "Email failed to send";
          break;
        default:
          // Ignore other event types
          return Response.json({ success: true });
      }

      // Update the sent email
      await payload.update({
        collection: "sent-emails",
        id: sentEmail.id,
        data: {
          status,
          ...updateData,
        },
      });

      // If this is an open or click event, update the campaign stats
      if (sentEmail.campaign && (type === "email.opened" || type === "email.clicked")) {
        const campaignId = typeof sentEmail.campaign === "string" 
          ? sentEmail.campaign 
          : sentEmail.campaign.id;

        const campaign = await payload.findByID({
          collection: "email-campaigns",
          id: campaignId,
        });

        if (campaign) {
          const updateFields: Record<string, any> = {};
          
          if (type === "email.opened") {
            updateFields.openCount = (campaign.openCount || 0) + 1;
          }
          
          if (type === "email.clicked") {
            updateFields.clickCount = (campaign.clickCount || 0) + 1;
          }

          await payload.update({
            collection: "email-campaigns",
            id: campaignId,
            data: updateFields,
          });
        }
      }

      return Response.json({ success: true });
    } catch (error) {
      console.error("Error processing Resend webhook:", error);
      return Response.json(
        {
          error: "Failed to process webhook",
          details: error instanceof Error ? error.message : String(error),
        },
        { status: 500 }
      );
    }
  },
};

// Export all email endpoints
export const emailEndpoints = [
  sendCampaignEndpoint,
  scheduleCampaignEndpoint,
  sendScheduledCampaignsEndpoint,
  resendWebhookEndpoint,
];
