import { Payload } from "payload";
import { notFound } from "next/navigation";
import { getPayloadClient } from "@/payload/payload-client";

// This is the main admin page for Payload CMS
// It renders the Payload admin UI
export default async function AdminPage({
  params,
}: {
  params: { path: string[] };
}) {
  const payload = await getPayloadClient();

  // If we're not in admin path, return 404
  if (!params.path?.includes("admin")) {
    return notFound();
  }

  // Get the Admin component from Payload
  const { AdminUI } = await import("payload/dist/admin");

  return <AdminUI payload={payload as Payload} />;
}

// Set metadata for the page
export const metadata = {
  title: "StatOracle Admin",
  description: "Admin dashboard for StatOracle",
};
