import { nextHandler } from "@payloadcms/next-payload";
import { NextRequest } from "next/server";
import { getPayloadClient } from "@/payload/payload-client";

// This is the main API route for Payload CMS
// It handles all CMS-related requests
export async function GET(req: NextRequest) {
  const payload = await getPayloadClient();
  return nextHandler({
    req,
    payload,
  });
}

export async function POST(req: NextRequest) {
  const payload = await getPayloadClient();
  return nextHandler({
    req,
    payload,
  });
}

export async function PUT(req: NextRequest) {
  const payload = await getPayloadClient();
  return nextHandler({
    req,
    payload,
  });
}

export async function PATCH(req: NextRequest) {
  const payload = await getPayloadClient();
  return nextHandler({
    req,
    payload,
  });
}

export async function DELETE(req: NextRequest) {
  const payload = await getPayloadClient();
  return nextHandler({
    req,
    payload,
  });
}

// Define the runtime to use Edge for better performance
export const runtime = "nodejs";
