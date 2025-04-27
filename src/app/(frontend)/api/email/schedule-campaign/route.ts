import { NextRequest, NextResponse } from "next/server";
import { getPayloadClient } from "@/payload/payload-client";

export async function POST(req: NextRequest) {
  try {
    // Get the campaign ID and scheduled time from the request
    const { campaignId, scheduledFor } = await req.json();

    if (!campaignId || !scheduledFor) {
      return NextResponse.json(
        { error: "Campaign ID and scheduled time are required" },
        { status: 400 }
      );
    }

    // Get the payload client
    const payload = await getPayloadClient();

    // Check if the campaign exists
    const campaign = await payload.findByID({
      collection: "email-campaigns",
      id: campaignId,
    });

    if (!campaign) {
      return NextResponse.json(
        { error: "Campaign not found" },
        { status: 404 }
      );
    }

    // Check if the campaign is already sent
    if (campaign.status === "sent") {
      return NextResponse.json(
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

    return NextResponse.json({
      success: true,
      campaign: updatedCampaign,
    });
  } catch (error) {
    console.error("Error scheduling campaign:", error);
    return NextResponse.json(
      { error: "Failed to schedule campaign", details: error instanceof Error ? error.message : String(error) },
      { status: 500 }
    );
  }
}
