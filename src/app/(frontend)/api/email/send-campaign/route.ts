import { NextRequest, NextResponse } from "next/server";
import { getPayloadClient } from "@/payload/payload-client";
import { sendCampaign } from "@/services/email.service";

export async function POST(req: NextRequest) {
  try {
    // Get the campaign ID from the request
    const { campaignId } = await req.json();

    if (!campaignId) {
      return NextResponse.json(
        { error: "Campaign ID is required" },
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

    // Send the campaign
    const result = await sendCampaign(campaignId);

    if (!result.success) {
      return NextResponse.json(
        { error: "Failed to send campaign", details: result.error },
        { status: 500 }
      );
    }

    return NextResponse.json(result);
  } catch (error) {
    console.error("Error sending campaign:", error);
    return NextResponse.json(
      { error: "Failed to send campaign", details: error instanceof Error ? error.message : String(error) },
      { status: 500 }
    );
  }
}
