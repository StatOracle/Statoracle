import { buildConfig } from "payload/config";
import { postgresAdapter } from "@payloadcms/db-postgres";
import { slateEditor } from "@payloadcms/richtext-slate";
import path from "path";

// Import collections
import { Users } from "./collections/Users";
import { EmailTemplates } from "./collections/EmailTemplates";
import { EmailCampaigns } from "./collections/EmailCampaigns";
import { WaitlistEntries } from "./collections/WaitlistEntries";
import { SentEmails } from "./collections/SentEmails";

export default buildConfig({
  serverURL: process.env.NEXT_PUBLIC_SERVER_URL || "http://localhost:3000",
  admin: {
    user: "users",
    meta: {
      titleSuffix: "- StatOracle Admin",
      ogImage: "/images/og-image.jpg",
      favicon: "/favicon.ico",
    },
  },
  editor: slateEditor({}),
  db: postgresAdapter({
    pool: {
      connectionString: process.env.DATABASE_URL as string,
    },
  }),
  collections: [
    Users,
    EmailTemplates,
    EmailCampaigns,
    WaitlistEntries,
    SentEmails,
  ],
  typescript: {
    outputFile: path.resolve(__dirname, "payload-types.ts"),
  },
  graphQL: {
    schemaOutputFile: path.resolve(__dirname, "generated-schema.graphql"),
  },
  // This is for Next.js integration
  cors: [
    process.env.NEXT_PUBLIC_SERVER_URL || "http://localhost:3000",
    "https://statoracle.com",
  ].filter(Boolean),
  csrf: [
    process.env.NEXT_PUBLIC_SERVER_URL || "http://localhost:3000",
    "https://statoracle.com",
  ].filter(Boolean),
});
