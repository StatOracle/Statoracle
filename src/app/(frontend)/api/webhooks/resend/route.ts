import { NextRequest, NextResponse } from "next/server";
import { getPayloadClient } from "@/payload/payload-client";

// This route handles webhooks from Resend
// It updates the status of sent emails based on events
export async function POST(req: NextRequest) {
  try {
    // Get the webhook payload
    const payload = await req.json();

    // Verify the webhook signature (in a production environment)
    // This is a simplified version
    // const signature = req.headers.get("resend-signature");
    // if (!verifySignature(signature, JSON.stringify(payload), process.env.RESEND_WEBHOOK_SECRET)) {
    //   return NextResponse.json({ error: "Invalid signature" }, { status: 401 });
    // }

    // Process the webhook event
    const { type, data } = payload;

    if (!type || !data || !data.email_id) {
      return NextResponse.json(
        { error: "Invalid webhook payload" },
        { status: 400 }
      );
    }

    // Get the payload client
    const payloadClient = await getPayloadClient();

    // Find the sent email by Resend ID
    const sentEmails = await payloadClient.find({
      collection: "sent-emails",
      where: {
        resendId: {
          equals: data.email_id,
        },
      },
    });

    if (sentEmails.docs.length === 0) {
      return NextResponse.json(
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
        updateData.errorDetails = data.reason || "Email bounced";
        break;
      case "email.failed":
        status = "failed";
        updateData.errorDetails = data.reason || "Email failed to send";
        break;
      default:
        // Ignore other event types
        return NextResponse.json({ success: true });
    }

    // Update the sent email
    await payloadClient.update({
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

      const campaign = await payloadClient.findByID({
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

        await payloadClient.update({
          collection: "email-campaigns",
          id: campaignId,
          data: updateFields,
        });
      }
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error processing Resend webhook:", error);
    return NextResponse.json(
      {
        error: "Failed to process webhook",
        details: error instanceof Error ? error.message : String(error),
      },
      { status: 500 }
    );
  }
}
