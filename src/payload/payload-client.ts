import { getPayload } from "@payloadcms/next-payload";
import config from "./payload.config";

// This is a singleton to ensure we only instantiate Payload once
export const getPayloadClient = async () => {
  return getPayload({
    // Pass the config object
    config,
    // Configure options for the Payload client
    options: {
      // The CMS secret is used to generate secure tokens
      secret: process.env.PAYLOAD_SECRET || "a-secret-key-that-should-be-changed",
      // Enable local mode to run Payload without a database connection
      // (We're not using this, but it's required by the client)
      local: false,
    },
  });
};
