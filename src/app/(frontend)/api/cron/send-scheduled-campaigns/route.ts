import { NextResponse } from "next/server";
import { getPayloadClient } from "@/payload/payload-client";
import { sendCampaign } from "@/services/email.service";

// This route is meant to be called by a cron job
// It checks for scheduled campaigns and sends them if it's time
export async function GET() {
  try {
    // Get the payload client
    const payload = await getPayloadClient();

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
      return NextResponse.json({
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

    return NextResponse.json({
      success: true,
      campaignsSent: results.length,
      results,
    });
  } catch (error) {
    console.error("Error sending scheduled campaigns:", error);
    return NextResponse.json(
      {
        error: "Failed to send scheduled campaigns",
        details: error instanceof Error ? error.message : String(error),
      },
      { status: 500 }
    );
  }
}

// Set the runtime to Edge for better performance
export const runtime = "edge";
